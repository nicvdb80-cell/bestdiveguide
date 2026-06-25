import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const { data } = await supabase.from('listings').select('slug').eq('is_published', true)
  return (data ?? []).map(l => ({ slug: l.slug }))
}

async function getListing(slug: string) {
  const { data: listing } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!listing) return null

  const { data: score } = await supabase
    .from('ranking_scores')
    .select('*')
    .eq('listing_id', listing.id)
    .single()

  return { listing, score }
}

function ScoreBar({ label, value, color = '#1B6CA8' }: { label: string, value: number, color?: string }) {
  return (
    <div className="flex items-center mb-2">
      <span className="text-[12px] text-gray-500 w-28 flex-shrink-0">{label}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-1.5 mx-3">
        <div className="h-1.5 rounded-full transition-all" style={{ width: `${(value / 10) * 100}%`, background: color }} />
      </div>
      <span className="text-[12px] font-bold text-[#0A2342] w-6 text-right">{value.toFixed(1)}</span>
    </div>
  )
}

function CategoryTag({ cat }: { cat: string }) {
  const styles: Record<string, string> = {
    dive: 'bg-[#E1F5F8] text-[#006D78]',
    food: 'bg-[#FEF0E8] text-[#A84B1A]',
    stay: 'bg-[#E8EFF8] text-[#144F8C]',
    liveaboard: 'bg-[#EEE8F8] text-[#5A2EA0]',
  }
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded ${styles[cat] ?? 'bg-gray-100 text-gray-600'}`}>
      {cat}
    </span>
  )
}

export default async function ListingPage({ params }: { params: { slug: string } }) {
  const result = await getListing(params.slug)
  if (!result) notFound()

  const { listing, score } = result

  const cats = [
    listing.has_dive && 'dive',
    listing.has_food && 'food',
    listing.has_stay && 'stay',
    listing.has_liveaboard && 'liveaboard',
  ].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-[#0A2342] h-14 flex items-center px-8 sticky top-0 z-50">
        <a href="/" className="text-white font-bold text-lg no-underline">
          Best<span className="text-[#E8723A]">Dive</span>Guide
        </a>
        <a href="/top100" className="ml-6 text-white/60 text-sm no-underline hover:text-white">← Back to Top 100</a>
      </nav>

      {/* Hero */}
      <div className="bg-[#0A2342] h-52 relative flex items-end">
        {listing.hero_image_url && (
          <img src={listing.hero_image_url} alt={listing.name} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 bg-[#0A2342]/50" />
        {score?.green_diver_approved && (
          <div className="absolute top-4 right-5 z-10 bg-[#2E7D32] text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            🌿 Green Diver Approved
          </div>
        )}
        <div className="relative z-10 px-8 pb-6 w-full">
          {score?.ranking_position && (
            <div className="inline-flex items-center gap-1.5 bg-[#E8723A] text-white text-[12px] font-bold px-3 py-1 rounded-md mb-2">
              🏆 #{score.ranking_position} Overall
            </div>
          )}
          {score?.badge_type === 'recommended' && !score.ranking_position && (
            <div className="inline-flex items-center gap-1.5 bg-[#E8723A] text-white text-[12px] font-bold px-3 py-1 rounded-md mb-2">
              R Recommended
            </div>
          )}
          <h1 className="text-white text-2xl font-bold mb-1">{listing.name}</h1>
          <div className="text-white/60 text-sm">
            📍 {[listing.island, listing.region, listing.country].filter(Boolean).join(', ')}
          </div>
        </div>
      </div>

      {/* Category tags */}
      <div className="px-8 py-4 border-b border-gray-100 flex gap-2">
        {cats.map(c => <CategoryTag key={c} cat={c} />)}
      </div>

      <div className="px-8 py-6 grid grid-cols-[1fr_280px] gap-8 max-w-5xl">
        {/* Main column */}
        <div>
          {/* Gallery placeholder */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[0,1,2,3].map(i => (
              <div key={i} className="h-20 bg-[#0A2342] rounded-lg opacity-[0.15]" />
            ))}
          </div>

          <p className="text-[14px] leading-relaxed text-gray-500 mb-5">{listing.description}</p>

          {listing.editorial_note && (
            <div className="border-l-4 border-[#E8723A] pl-4 mb-6">
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#E8723A] mb-1">Editorial note</div>
              <p className="text-[13px] text-gray-500 italic leading-relaxed">{listing.editorial_note}</p>
            </div>
          )}

          {listing.best_for && listing.best_for.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[13px] font-bold text-[#0A2342] mb-3">Best for</h3>
              <div className="flex flex-wrap gap-2">
                {listing.best_for.map((b: string) => (
                  <span key={b} className="text-[11px] bg-[#F5F0E8] text-gray-600 px-2.5 py-1 rounded">{b}</span>
                ))}
              </div>
            </div>
          )}

          {score?.green_diver_approved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wide mb-1">🌿 Green Diver Approved</div>
              <p className="text-[13px] text-green-800 leading-relaxed">
                This place meets our sustainability standards across reef protection, responsible diving practices, 
                ethical sourcing, and genuine conservation commitment. Sustainability score: {score.sustainability_score?.toFixed(1)}/10
              </p>
            </div>
          )}

          <div className="border-t border-gray-100 pt-5">
            <a href={`/vote?place=${listing.slug}`} className="inline-block bg-[#E8723A] text-white font-bold text-sm px-6 py-3 rounded-lg no-underline">
              Vote for {listing.name}
            </a>
            {listing.website_url && (
              <a href={listing.website_url} target="_blank" rel="noopener noreferrer" className="ml-3 inline-block border border-[#0A2342] text-[#0A2342] font-bold text-sm px-5 py-3 rounded-lg no-underline">
                Visit website ↗
              </a>
            )}
            <a href="#" className="ml-3 inline-block text-gray-400 text-sm underline">Claim this listing</a>
          </div>
        </div>

        {/* Side column */}
        <div>
          {score && (
            <>
              <div className="bg-[#0A2342] rounded-xl p-5 text-center mb-4">
                <div className="text-4xl font-bold text-white">{score.overall_score?.toFixed(1)}</div>
                <div className="text-[11px] text-white/50 tracking-widest uppercase mt-1">Overall Score</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#0A2342]">{score.total_votes}</div>
                  <div className="text-[10px] text-gray-400">Verified votes</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-[#0A2342]">{score.panel_votes}</div>
                  <div className="text-[10px] text-gray-400">Panel votes</div>
                </div>
              </div>

              <div className="bg-[#F5F0E8] rounded-xl p-4 mb-4">
                <div className="text-[11px] font-bold text-[#0A2342] mb-3">Category scores</div>
                {score.dive_score && <ScoreBar label="Dive" value={score.dive_score} />}
                {score.food_score && <ScoreBar label="Food" value={score.food_score} color="#E8723A" />}
                {score.stay_score && <ScoreBar label="Stay" value={score.stay_score} color="#1B6CA8" />}
                {score.sustainability_score && (
                  <div className="border-t border-[#E0D8CC] pt-2 mt-2">
                    <ScoreBar label="Sustainability" value={score.sustainability_score} color="#2E7D32" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
