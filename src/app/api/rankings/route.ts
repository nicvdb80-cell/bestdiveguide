import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const badge = searchParams.get('badge') // 'top100' | 'recommended' | null (all)
  const country = searchParams.get('country')
  const hasDive = searchParams.get('dive')
  const hasFood = searchParams.get('food')
  const hasStay = searchParams.get('stay')
  const hasLiveaboard = searchParams.get('liveaboard')
  const greenOnly = searchParams.get('green') === 'true'
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '100'), 100)
  const offset = parseInt(searchParams.get('offset') ?? '0')

  let query = supabase
    .from('public_rankings')
    .select('*')
    .order('ranking_position', { ascending: true, nullsFirst: false })
    .range(offset, offset + limit - 1)

  if (badge) query = query.eq('badge_type', badge)
  if (country) query = query.eq('country', country)
  if (hasDive === 'true') query = query.eq('has_dive', true)
  if (hasFood === 'true') query = query.eq('has_food', true)
  if (hasStay === 'true') query = query.eq('has_stay', true)
  if (hasLiveaboard === 'true') query = query.eq('has_liveaboard', true)
  if (greenOnly) query = query.eq('green_diver_approved', true)

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    rankings: data,
    total: count,
    limit,
    offset
  })
}
export const dynamic = 'force-dynamic'
