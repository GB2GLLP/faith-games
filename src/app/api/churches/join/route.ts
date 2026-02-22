import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { code } = body

  const normalizedCode = typeof code === 'string' ? code.toUpperCase().trim() : ''
  if (!normalizedCode || normalizedCode.length !== 8) {
    return NextResponse.json({ error: 'Invalid church code' }, { status: 400 })
  }

  const { data: church } = await supabase
    .from('churches')
    .select('id, name, current_seats, max_seats')
    .eq('code', normalizedCode)
    .single()

  if (!church) {
    return NextResponse.json({ error: 'Church not found' }, { status: 404 })
  }

  // Early check (actual enforcement is via DB CHECK constraint)
  if (church.current_seats >= church.max_seats) {
    return NextResponse.json({ error: 'Church is full' }, { status: 400 })
  }

  // Insert membership — unique(church_id, user_id) prevents duplicates,
  // CHECK constraint on churches prevents seat overflow
  const { error } = await supabase
    .from('church_memberships')
    .insert({ church_id: church.id, user_id: user.id })

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Already a member' }, { status: 400 })
    }
    if (error.code === '23514') {
      return NextResponse.json({ error: 'Church is full' }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, churchName: church.name })
}
