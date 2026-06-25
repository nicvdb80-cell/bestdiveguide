import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { calculateTrustMultiplier } from '@/lib/scoring'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      // Voter profile
      full_name, email, country, daily_profession,
      cert_agency, cert_level, logged_dives, voter_role,
      is_panel_member,
      // Visit
      listing_id, visit_date,
      voted_dive, voted_food, voted_stay, voted_liveaboard,
      // Scores (1-10 each)
      ...scores
    } = body

    // Validate required fields
    if (!full_name || !email || !listing_id || !visit_date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate visit date within allowed window
    const visitDate = new Date(visit_date)
    const now = new Date()
    const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2))
    if (visitDate < twoYearsAgo) {
      return NextResponse.json({ error: 'Visit date is outside the allowed 2-year window' }, { status: 400 })
    }

    // Upsert voter
    const trustMultiplier = calculateTrustMultiplier(voter_role, logged_dives ?? 0)
    const { data: voter, error: voterError } = await supabaseAdmin
      .from('voters')
      .upsert({
        full_name, email, country, daily_profession,
        cert_agency, cert_level, logged_dives,
        voter_role, trust_multiplier: trustMultiplier,
        is_panel_member: is_panel_member ?? false
      }, { onConflict: 'email' })
      .select('id, is_panel_member')
      .single()

    if (voterError || !voter) {
      return NextResponse.json({ error: 'Failed to register voter' }, { status: 500 })
    }

    // Check for duplicate vote on this listing
    const { data: existing } = await supabaseAdmin
      .from('votes')
      .select('id, status')
      .eq('listing_id', listing_id)
      .eq('voter_id', voter.id)
      .single()

    if (existing) {
      return NextResponse.json({ error: 'You have already voted for this place' }, { status: 409 })
    }

    // Insert vote as pending
    const { data: vote, error: voteError } = await supabaseAdmin
      .from('votes')
      .insert({
        listing_id,
        voter_id: voter.id,
        voting_layer: voter.is_panel_member ? 1 : 2,
        visit_date,
        voted_dive: voted_dive ?? false,
        voted_food: voted_food ?? false,
        voted_stay: voted_stay ?? false,
        voted_liveaboard: voted_liveaboard ?? false,
        // Spread all score fields
        ...scores,
        status: 'pending'
      })
      .select('id')
      .single()

    if (voteError || !vote) {
      return NextResponse.json({ error: 'Failed to submit vote' }, { status: 500 })
    }

    // Send thank-you email
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: email,
        subject: 'Thank you for voting with Best Dive Guide',
        html: getThankYouEmailHtml(full_name)
      })
    } catch (emailError) {
      console.error('Email send failed:', emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      vote_id: vote.id,
      message: 'Your vote has been received and is pending verification.'
    })

  } catch (error) {
    console.error('Vote submission error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function getThankYouEmailHtml(firstName: string): string {
  const name = firstName.split(' ')[0]
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Calibri, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1A1A;">
  <div style="background: #0A2342; padding: 32px; text-align: center;">
    <h1 style="color: #fff; margin: 0; font-size: 24px;">BestDiveGuide</h1>
    <p style="color: rgba(255,255,255,0.6); margin: 8px 0 0; font-style: italic;">Dive. Eat. Sleep. Repeat.</p>
  </div>
  <div style="padding: 40px 32px;">
    <p style="font-size: 17px;">Hi ${name},</p>
    <p style="line-height: 1.7; color: #444;">
      Thank you for sharing your experience with Best Dive Guide. Your vote helps other divers discover 
      where to dive better, eat better, and sleep better. It also helps us recognise the places that are 
      doing the right thing for the ocean.
    </p>
    <p style="line-height: 1.7; color: #444;">
      Our team will review your submission and proof of visit. Once verified, your vote will be counted 
      in the ranking system.
    </p>
    <div style="background: #F5F0E8; border-radius: 8px; padding: 20px; margin: 28px 0;">
      <p style="margin: 0; color: #0A2342; font-weight: bold;">
        Remember — every verified vote you submit counts toward the Most Travelled Voter recognition.
      </p>
      <p style="margin: 8px 0 0; color: #555; font-size: 14px;">Keep exploring. Keep voting.</p>
    </div>
    <p style="line-height: 1.7; color: #444;">
      We wish you many more beautiful dives, unforgettable meals, and comfortable stays.
    </p>
    <p style="color: #1B6CA8; font-weight: bold;">The Best Dive Guide Team</p>
    <p style="color: #888; font-size: 13px;">bestdiveguide.com</p>
  </div>
  <div style="background: #F2F4F6; padding: 20px 32px; text-align: center;">
    <p style="color: #888; font-size: 12px; margin: 0;">
      © ${new Date().getFullYear()} Best Dive Guide. All rights reserved.
    </p>
  </div>
</body>
</html>
  `
}
export const dynamic = 'force-dynamic'
