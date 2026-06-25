import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// GET /api/book/[code] — redirect to booking URL after logging the click
export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code.toUpperCase()

  // Fetch the affiliate link
  const { data: link, error } = await supabase
    .from('affiliate_links')
    .select('id, listing_id, booking_url, discount_pct, is_active')
    .eq('discount_code', code)
    .eq('is_active', true)
    .single()

  if (error || !link) {
    return NextResponse.json({ error: 'Booking link not found or inactive' }, { status: 404 })
  }

  // Log the click (fire-and-forget, don't block the redirect)
  const country = request.headers.get('cf-ipcountry') ?? request.headers.get('x-vercel-ip-country') ?? null
  const referrer = request.headers.get('referer') ?? null
  const userAgent = request.headers.get('user-agent') ?? null
  const sessionId = request.cookies.get('bdg_session')?.value ?? null

  supabaseAdmin.from('affiliate_clicks').insert({
    affiliate_link_id: link.id,
    listing_id: link.listing_id,
    session_id: sessionId,
    referrer,
    user_agent: userAgent,
    country_code: country,
  }).then(() => {
    // also increment counter
    supabaseAdmin.rpc('increment_click_count', { link_id: link.id }).then(() => {})
  })

  // Redirect to the booking URL
  return NextResponse.redirect(link.booking_url, { status: 302 })
}

// POST /api/book — fetch booking info for a listing (for the UI)
export async function POST(request: NextRequest) {
  const { listing_id, slug } = await request.json()

  let query = supabase
    .from('affiliate_links')
    .select('booking_url, discount_pct, discount_code, discount_description, booking_platform, valid_until')
    .eq('is_active', true)

  if (listing_id) query = query.eq('listing_id', listing_id)
  else if (slug) {
    const { data: listing } = await supabase.from('listings').select('id').eq('slug', slug).single()
    if (listing) query = query.eq('listing_id', listing.id)
  }

  const { data, error } = await query.single()

  if (error || !data) {
    return NextResponse.json({ has_booking: false })
  }

  return NextResponse.json({
    has_booking: true,
    booking_url: `/api/book/${data.discount_code}`,
    direct_url: data.booking_url,
    discount_pct: data.discount_pct,
    discount_code: data.discount_code,
    discount_description: data.discount_description,
    platform: data.booking_platform,
    valid_until: data.valid_until,
  })
}
export const dynamic = 'force-dynamic'
