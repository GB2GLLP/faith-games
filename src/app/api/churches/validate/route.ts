import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code || code.length !== 8) {
    return NextResponse.json({ valid: false })
  }

  const supabase = await createClient()
  const { data: church } = await supabase
    .from('churches')
    .select('id, name, current_seats, max_seats')
    .eq('code', code.toUpperCase())
    .single()

  if (!church) {
    return NextResponse.json({ valid: false })
  }

  if (church.current_seats >= church.max_seats) {
    return NextResponse.json({ valid: false, reason: 'Church is full' })
  }

  return NextResponse.json({ valid: true, churchName: church.name, churchId: church.id })
}
