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

  if (!code || code.length !== 8) {
    return NextResponse.json({ error: 'Invalid church code' }, { status: 400 })
  }

  const { data: church } = await supabase
    .from('churches')
    .select('id, name, current_seats, max_seats')
    .eq('code', code.toUpperCase())
    .single()

  if (!church) {
    return NextResponse.json({ error: 'Church not found' }, { status: 404 })
  }

  if (church.current_seats >= church.max_seats) {
    return NextResponse.json({ error: 'Church is full' }, { status: 400 })
  }

  // Check if already a member
  const { data: existing } = await supabase
    .from('church_memberships')
    .select('id')
    .eq('church_id', church.id)
    .eq('user_id', user.id)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Already a member' }, { status: 400 })
  }

  const { error } = await supabase
    .from('church_memberships')
    .insert({ church_id: church.id, user_id: user.id })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, churchName: church.name })
}
