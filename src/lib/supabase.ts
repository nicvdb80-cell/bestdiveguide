import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role (for admin operations)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Types matching the database schema
export type ListingType = 'dive_center' | 'dive_resort' | 'liveaboard' | 'boutique_stay' | 'restaurant' | 'island_lodge'
export type BadgeType = 'top100' | 'recommended' | 'none'
export type SustainabilityLevel = 'approved' | 'recognised' | 'none' | 'insufficient'
export type VoteStatus = 'pending' | 'approved' | 'rejected' | 'flagged'
export type VoterRole = 'recreational_diver' | 'professional_diver' | 'dive_instructor' | 'underwater_photographer' | 'chef' | 'travel_professional' | 'guest'

export interface Listing {
  id: string
  name: string
  slug: string
  country: string
  region?: string
  island?: string
  website_url?: string
  description?: string
  editorial_note?: string
  best_for?: string[]
  has_dive: boolean
  has_food: boolean
  has_stay: boolean
  has_liveaboard: boolean
  listing_type: ListingType
  hero_image_url?: string
  gallery_urls?: string[]
  is_published: boolean
}

export interface RankingScore {
  listing_id: string
  ranking_position?: number
  badge_type: BadgeType
  overall_score?: number
  dive_score?: number
  food_score?: number
  stay_score?: number
  sustainability_score?: number
  green_diver_approved: boolean
  sustainability_level: SustainabilityLevel
  total_votes: number
  panel_votes: number
  public_votes: number
}

export interface PublicRanking extends Listing, RankingScore {}
