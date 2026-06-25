'use client'

import { useEffect, useState } from 'react'
import { supabaseAdmin } from '@/lib/supabase'

type Vote = {
  id: string
  status: string
  visit_date: string
  voted_dive: boolean
  voted_food: boolean
  voted_stay: boolean
  submitted_at: string
  admin_notes: string | null
  voters: { full_name: string; email: string; voter_role: string; logged_dives: number; cert_agency: string } | null
  listings: { name: string; country: string } | null
}

type Listing = {
  id: string
  name: string
  country: string
  ranking_position: number | null
  overall_score: number | null
  total_votes: number
  panel_votes: number
  green_diver_approved: boolean
  badge_type: string
}

type NavItem = 'overview' | 'votes' | 'rankings' | 'panel' | 'mtv'

export default function AdminDashboard() {
  const [page, setPage] = useState<NavItem>('overview')
  const [pendingVotes, setPendingVotes] = useState<Vote[]>([])
  const [listings, setListings] = useState<Listing[]>([])
  const [stats, setStats] = useState({ total: 0, pending: 0, published: 0, greenBadges: 0 })
  const [loading, setLoading] = useState(true)
  const [actionNote, setActionNote] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    setLoading(true)
    const [votesRes, listingsRes] = await Promise.all([
      supabaseAdmin
        .from('votes')
        .select('*, voters(full_name,email,voter_role,logged_dives,cert_agency), listings(name,country)')
        .eq('status', 'pending')
        .order('submitted_at', { ascending: false })
        .limit(20),
      supabaseAdmin
        .from('listings')
        .select('id, name, country, is_published, ranking_scores(ranking_position, overall_score, total_votes, panel_votes, green_diver_approved, badge_type)')
        .eq('is_published', true)
        .order('name')
    ])

    if (votesRes.data) setPendingVotes(votesRes.data as any)

    if (listingsRes.data) {
      const flat = listingsRes.data.map((l: any) => ({
        ...l,
        ...(l.ranking_scores?.[0] ?? {}),
      }))
      setListings(flat)
    }

    const [totalVotes, greenCount] = await Promise.all([
      supabaseAdmin.from('votes').select('id', { count: 'exact' }).eq('status', 'approved'),
      supabaseAdmin.from('ranking_scores').select('id', { count: 'exact' }).eq('green_diver_approved', true)
    ])

    setStats({
      total: totalVotes.count ?? 0,
      pending: votesRes.data?.length ?? 0,
      published: listingsRes.data?.length ?? 0,
      greenBadges: greenCount.count ?? 0,
    })

    setLoading(false)
  }

  async function approveVote(id: string) {
    await supabaseAdmin.from('votes').update({ status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: 'admin' }).eq('id', id)
    setPendingVotes(v => v.filter(x => x.id !== id))
    setStats(s => ({ ...s, pending: s.pending - 1, total: s.total + 1 }))
  }

  async function rejectVote(id: string, reason: string) {
    await supabaseAdmin.from('votes').update({ status: 'rejected', rejection_reason: reason, reviewed_at: new Date().toISOString() }).eq('id', id)
    setPendingVotes(v => v.filter(x => x.id !== id))
    setStats(s => ({ ...s, pending: s.pending - 1 }))
  }

  const navItems: { key: NavItem; label: string; icon: string; badge?: number }[] = [
    { key: 'overview', label: 'Dashboard', icon: '⊞' },
    { key: 'votes', label: 'Pending review', icon: '⏱', badge: stats.pending },
    { key: 'rankings', label: 'Rankings', icon: '🏆' },
    { key: 'panel', label: 'Professional Panel', icon: '👥' },
    { key: 'mtv', label: 'Most Travelled Voter', icon: '✈️' },
  ]

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-50 text-yellow-800',
    approved: 'bg-green-50 text-green-800',
    rejected: 'bg-red-50 text-red-700',
    flagged: 'bg-red-100 text-red-900',
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2F4F6] flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F2F4F6]">
      {/* Admin nav */}
      <nav className="bg-[#0A2342] h-12 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm">Best<span className="text-[#E8723A]">Dive</span>Guide</span>
          <span className="bg-[#E8723A]/20 border border-[#E8723A]/40 text-[#E8723A] text-[10px] font-bold px-2 py-0.5 rounded tracking-wide">ADMIN</span>
        </div>
        <div className="flex items-center gap-3">
          {stats.pending > 0 && (
            <span className="text-white/70 text-xs">{stats.pending} pending</span>
          )}
          <a href="/" className="text-white/50 text-xs">View site ↗</a>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="w-48 bg-white border-r border-gray-200 py-4">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setPage(item.key)}
              className={`w-full flex items-center gap-2.5 px-4 py-2 text-left text-[12px] border-l-2 transition-all ${
                page === item.key
                  ? 'border-[#1B6CA8] bg-blue-50 text-[#1B6CA8] font-semibold'
                  : 'border-transparent text-gray-500 hover:bg-[#F5F0E8] hover:text-[#0A2342]'
              }`}
            >
              <span>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span className="bg-[#E8723A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">{item.badge}</span>
              ) : null}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Overview */}
          {page === 'overview' && (
            <div>
              <div className="grid grid-cols-4 gap-3 mb-6">
                {[
                  { num: stats.total, label: 'Verified votes', sub: '' },
                  { num: stats.pending, label: 'Pending review', sub: 'Needs attention', warn: true },
                  { num: stats.published, label: 'Published listings', sub: '' },
                  { num: stats.greenBadges, label: 'Green Diver badges', sub: '', green: true },
                ].map((s, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                    <div className={`text-2xl font-bold ${s.warn ? 'text-yellow-700' : s.green ? 'text-green-700' : 'text-[#0A2342]'}`}>{s.num}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{s.label}</div>
                    {s.sub && <div className={`text-[10px] mt-0.5 ${s.warn ? 'text-[#E8723A]' : 'text-green-600'}`}>{s.sub}</div>}
                  </div>
                ))}
              </div>

              <h2 className="text-[14px] font-bold text-[#0A2342] mb-3">Top published listings</h2>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-300">Rank</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-300">Listing</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-300">Score</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-300">Votes</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-gray-300">Green</th>
                      <th className="px-4 py-2.5"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.slice(0, 8).map(l => (
                      <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-2.5 font-bold text-[#0A2342]">
                          {l.ranking_position ? `#${l.ranking_position}` : <span className="text-[#E8723A]">R</span>}
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="font-semibold text-[#0A2342]">{l.name}</div>
                          <div className="text-[10px] text-gray-400">{l.country}</div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded text-[11px]">
                            {l.overall_score?.toFixed(1) ?? '—'}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-gray-500">{l.total_votes ?? 0}</td>
                        <td className="px-4 py-2.5">
                          {l.green_diver_approved
                            ? <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                            : <span className="w-2 h-2 rounded-full bg-gray-200 inline-block" />}
                        </td>
                        <td className="px-4 py-2.5 text-right">
                          <a href={`/listing/${l.id}`} className="text-[#1B6CA8] font-semibold text-[11px]">Edit</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Votes */}
          {page === 'votes' && (
            <div>
              <h2 className="text-[14px] font-bold text-[#0A2342] mb-4">
                Pending vote review
                <span className="ml-2 text-[11px] font-normal text-gray-400">{stats.pending} votes awaiting verification</span>
              </h2>

              {pendingVotes.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-400 text-sm">
                  All caught up — no pending votes.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingVotes.map(vote => (
                    <div key={vote.id} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <span className="font-semibold text-[13px] text-[#0A2342]">{vote.voters?.full_name ?? 'Unknown'}</span>
                          <span className="text-[11px] text-gray-400 ml-2">
                            {vote.voters?.voter_role?.replace(/_/g, ' ')} · {vote.voters?.logged_dives} dives · {vote.voters?.cert_agency}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${statusColor[vote.status] ?? ''}`}>
                          {vote.status}
                        </span>
                      </div>
                      <div className="text-[12px] text-gray-500 mb-2">
                        Voting for: <strong className="text-[#0A2342]">{vote.listings?.name}</strong> · {vote.listings?.country} · Visit: {vote.visit_date}
                      </div>
                      <div className="flex gap-1.5 mb-3">
                        {vote.voted_dive && <span className="text-[9px] font-bold bg-[#E1F5F8] text-[#006D78] px-1.5 py-0.5 rounded">Dive</span>}
                        {vote.voted_food && <span className="text-[9px] font-bold bg-[#FEF0E8] text-[#A84B1A] px-1.5 py-0.5 rounded">Food</span>}
                        {vote.voted_stay && <span className="text-[9px] font-bold bg-[#E8EFF8] text-[#144F8C] px-1.5 py-0.5 rounded">Stay</span>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveVote(vote.id)}
                          className="text-[11px] font-bold bg-green-50 text-green-800 px-3 py-1.5 rounded-md border-none cursor-pointer"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => rejectVote(vote.id, 'Insufficient proof')}
                          className="text-[11px] font-bold bg-red-50 text-red-700 px-3 py-1.5 rounded-md border-none cursor-pointer"
                        >
                          ✕ Reject
                        </button>
                        <button className="text-[11px] text-gray-500 bg-gray-100 px-3 py-1.5 rounded-md border-none cursor-pointer">
                          📎 View proof
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Rankings override */}
          {page === 'rankings' && (
            <div>
              <h2 className="text-[14px] font-bold text-[#0A2342] mb-4">Ranking management</h2>
              <div className="bg-[#F5F0E8] border border-[#E0D8CC] rounded-lg px-4 py-3 text-[12px] text-gray-600 mb-4">
                <strong className="text-[#0A2342]">Committee override mode.</strong> Set manual positions below. All overrides are logged. Calculated scores are preserved.
              </div>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold uppercase text-gray-300 tracking-wide">Calc.</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold uppercase text-gray-300 tracking-wide">Override</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold uppercase text-gray-300 tracking-wide">Listing</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold uppercase text-gray-300 tracking-wide">Score</th>
                      <th className="text-left px-4 py-2.5 text-[10px] font-bold uppercase text-gray-300 tracking-wide">Green badge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.filter(l => l.ranking_position).slice(0, 8).map(l => (
                      <tr key={l.id} className="border-b border-gray-50 hover:bg-gray-50">
                        <td className="px-4 py-2.5 text-gray-400 font-semibold">#{l.ranking_position}</td>
                        <td className="px-4 py-2.5">
                          <input
                            type="number"
                            defaultValue={l.ranking_position ?? undefined}
                            className="w-14 border border-gray-200 rounded px-2 py-1 text-[11px] focus:border-[#E8723A] outline-none"
                          />
                        </td>
                        <td className="px-4 py-2.5">
                          <div className="font-semibold text-[#0A2342]">{l.name}</div>
                          <div className="text-[10px] text-gray-400">{l.country}</div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className="bg-blue-50 text-blue-800 font-bold text-[11px] px-2 py-0.5 rounded">
                            {l.overall_score?.toFixed(1)}
                          </span>
                        </td>
                        <td className="px-4 py-2.5">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" defaultChecked={l.green_diver_approved} className="accent-green-600" />
                            <span className={`text-[11px] ${l.green_diver_approved ? 'text-green-600' : 'text-gray-300'}`}>
                              {l.green_diver_approved ? 'Approved' : 'Not eligible'}
                            </span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-[#0A2342] text-white text-[12px] font-bold px-4 py-2 rounded-lg border-none cursor-pointer">
                  Save overrides
                </button>
                <button className="bg-white border border-gray-200 text-gray-500 text-[12px] px-4 py-2 rounded-lg cursor-pointer">
                  Export to CSV
                </button>
              </div>
            </div>
          )}

          {/* Panel */}
          {page === 'panel' && (
            <div>
              <h2 className="text-[14px] font-bold text-[#0A2342] mb-4">Professional Panel — Layer 1</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-[12px] text-gray-500 text-center py-8">
                Panel members will appear here once loaded from the database.
                <div className="mt-3">
                  <button className="bg-[#0A2342] text-white text-[12px] font-bold px-4 py-2 rounded-lg border-none cursor-pointer">
                    + Invite panel member
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Most Travelled Voter */}
          {page === 'mtv' && (
            <div>
              <h2 className="text-[14px] font-bold text-[#0A2342] mb-4">Most Travelled Voter — 2026</h2>
              <div className="bg-white border border-gray-200 rounded-xl p-4 text-[12px] text-gray-500 text-center py-8">
                The leaderboard populates automatically as votes are approved. Requires minimum 5 verified votes across 3+ destinations to appear.
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
