import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateChurchCode } from '@/lib/utils'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { name } = body

  if (!name || name.length < 3) {
    return NextResponse.json({ error: 'Church name must be at least 3 characters' }, { status: 400 })
  }

  // Generate unique code
  let code = generateChurchCode()
  let attempts = 0
  while (attempts < 10) {
    const { data: existing } = await supabase
      .from('churches')
      .select('id')
      .eq('code', code)
      .single()
    if (!existing) break
    code = generateChurchCode()
    attempts++
  }

  const { data: church, error } = await supabase
    .from('churches')
    .insert({ name, code, admin_id: user.id })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update user role to church_admin
  await supabase.from('users')
    .update({ role: 'church_admin', church_id: church.id })
    .eq('id', user.id)

  // Add admin as member
  await supabase
    .from('church_memberships')
    .insert({ church_id: church.id, user_id: user.id })

  return NextResponse.json({ church })
}
