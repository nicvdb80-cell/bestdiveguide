import { VoterRole } from './supabase'

/**
 * Calculate voter trust multiplier based on role and dive experience.
 * Panel members receive an additional 3x multiplier applied separately.
 */
export function calculateTrustMultiplier(role: VoterRole, loggedDives: number): number {
  // Base multiplier from role
  const roleMultipliers: Record<VoterRole, number> = {
    guest: 1.0,
    recreational_diver: 1.0,
    professional_diver: 1.4,
    dive_instructor: 1.4,
    underwater_photographer: 1.3,
    chef: 1.4,
    travel_professional: 1.3,
  }

  let multiplier = roleMultipliers[role] ?? 1.0

  // Boost from dive experience (only for dive-related roles)
  if (['recreational_diver', 'professional_diver', 'dive_instructor', 'underwater_photographer'].includes(role)) {
    if (loggedDives >= 100) multiplier = Math.max(multiplier, 1.2)
    else if (loggedDives >= 50) multiplier = Math.max(multiplier, 1.1)
  }

  return multiplier
}

/**
 * Calculate the weighted score for a vote.
 * Questions are rated 1-10, 7 per category = max 70 raw points per category.
 */
export function calculateVoteScore(answers: Record<string, number>): {
  stayScore: number | null
  foodScore: number | null
  diveScore: number | null
  sustainabilityScore: number | null
} {
  const avg = (keys: string[]) => {
    const vals = keys.map(k => answers[k]).filter(v => v != null && v >= 1 && v <= 10)
    return vals.length === keys.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null
  }

  const stayKeys = ['stay_comfort','stay_service','stay_diver_friendly','stay_facilities','stay_atmosphere','stay_would_return','stay_recommend']
  const foodKeys = ['food_quality','food_freshness','food_diver_adapted','food_memorable','food_variety','food_full_offering','food_recommend']
  const diveKeys = ['dive_marine_life','dive_uniqueness','dive_conditions','dive_operation','dive_safety','dive_memorable','dive_would_return']
  const susKeys = [
    'sus_stay_env_policy','sus_stay_plastic','sus_stay_conservation','sus_stay_local_food','sus_stay_energy',
    'sus_food_local','sus_food_waste','sus_food_seafood','sus_food_plastic','sus_food_community',
    'sus_dive_brief','sus_dive_no_touch','sus_dive_mooring','sus_dive_conservation','sus_dive_mpa'
  ]

  return {
    stayScore: avg(stayKeys),
    foodScore: avg(foodKeys),
    diveScore: avg(diveKeys),
    sustainabilityScore: avg(susKeys.filter(k => answers[k] != null)),
  }
}

/**
 * Determine Green Diver Approved badge status from sustainability score and vote count.
 */
export function getSustainabilityLevel(score: number | null, voteCount: number): string {
  if (voteCount < 3 || score == null) return 'insufficient'
  if (score >= 8.0) return 'approved'
  if (score >= 6.0) return 'recognised'
  return 'none'
}
