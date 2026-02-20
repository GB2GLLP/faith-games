import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { gameType, players, winner, finalScores, durationSeconds } = body

  // Get user's church
  const { data: profile } = await supabase
    .from('users')
    .select('church_id')
    .eq('id', user.id)
    .single()

  // Save game session
  const { data: session, error } = await supabase
    .from('game_sessions')
    .insert({
      game_type: gameType,
      host_user_id: user.id,
      church_id: profile?.church_id,
      players,
      winner,
      final_scores: finalScores,
      duration_seconds: durationSeconds,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update game stats for host
  const { data: existingStats } = await supabase
    .from('game_stats')
    .select('*')
    .eq('user_id', user.id)
    .eq('game_type', gameType)
    .single()

  const hostScore = finalScores?.[players?.[0]?.name] || 0
  const didWin = winner === players?.[0]?.name

  if (existingStats) {
    await supabase.from('game_stats')
      .update({
        games_played: existingStats.games_played + 1,
        games_won: existingStats.games_won + (didWin ? 1 : 0),
        total_score: existingStats.total_score + hostScore,
        best_score: Math.max(existingStats.best_score, hostScore),
        current_streak: didWin ? existingStats.current_streak + 1 : 0,
        best_streak: didWin
          ? Math.max(existingStats.best_streak, existingStats.current_streak + 1)
          : existingStats.best_streak,
      })
      .eq('id', existingStats.id)
  } else {
    await supabase.from('game_stats').insert({
      user_id: user.id,
      game_type: gameType,
      games_played: 1,
      games_won: didWin ? 1 : 0,
      total_score: hostScore,
      best_score: hostScore,
    })
  }

  return NextResponse.json({ session })
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10')

  const { data: sessions, error } = await supabase
    .from('game_sessions')
    .select('*')
    .eq('host_user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ sessions })
}
