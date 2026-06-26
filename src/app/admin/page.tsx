"use client"

import { useState, useEffect } from "react"
import Nav from "@/components/Nav"

type Vote = {
  id: string
  created_at: string
  full_name: string
  email: string
  country: string
  profession: string
  voter_role: string
  cert_agency: string
  cert_level: string
  logged_dives: number
  is_panel_member: boolean
  best_dive_resort: string
  best_dive_food: string
  best_liveaboard: string
  best_dive_site: string
  best_sustainable: string
  dive_rating: number
  food_rating: number
  stay_rating: number
  comments: string
  place_name: string
  place_country: string
  visit_date: string
  visit_proof: string
  raw_scores: Record<string, any> | null
  raw_feedback: Record<string, any> | null
  raw_sustainability: Record<string, any> | null
}

const API = "https://flhsqerpikhihtirfutu.supabase.co/functions/v1/export-votes?key=BDG2025admin"

const ADMIN_PIN = "BDG2025admin"

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState("")
  const [pinError, setPinError] = useState(false)
  const [votes, setVotes] = useState<Vote[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<Vote | null>(null)

  useEffect(() => {
    const saved = sessionStorage.getItem("bdg_admin")
    if (saved === ADMIN_PIN) setAuthed(true)
  }, [])

  useEffect(() => {
    if (!authed) return
    fetch(API)
      .then(r => r.json())
      .then(d => { setVotes(d.votes || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [authed])

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem("bdg_admin", pin)
      setAuthed(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  if (!authed) return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#0A2342",display:"flex",alignItems:"center",justifyContent:"center",padding:"2rem"}}>
      <div style={{background:"#fff",borderRadius:16,padding:"3rem",maxWidth:380,width:"100%",textAlign:"center",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
        <div style={{fontSize:40,marginBottom:16}}>🔒</div>
        <h1 style={{fontSize:22,fontWeight:700,color:"#0A2342",marginBottom:6}}>Admin Access</h1>
        <p style={{fontSize:13,color:"#888",marginBottom:24}}>Enter your admin PIN to view the vote dashboard</p>
        <input
          type="password"
          value={pin}
          onChange={e => { setPin(e.target.value); setPinError(false) }}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Enter PIN"
          style={{width:"100%",padding:"12px 16px",borderRadius:8,border:pinError?"2px solid #E53935":"1.5px solid #ddd",fontSize:15,textAlign:"center",letterSpacing:4,outline:"none",marginBottom:12}}
        />
        {pinError && <p style={{fontSize:12,color:"#E53935",margin:"0 0 12px"}}>Wrong PIN. Try again.</p>}
        <button onClick={handleLogin} style={{width:"100%",background:"#0A2342",color:"#fff",border:"none",padding:"12px",borderRadius:8,fontSize:14,fontWeight:700,cursor:"pointer"}}>Unlock Dashboard</button>
      </div>
    </div>
  )

  const filtered = votes.filter(v =>
    !search || v.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    v.email?.toLowerCase().includes(search.toLowerCase()) ||
    v.country?.toLowerCase().includes(search.toLowerCase()) ||
    v.best_dive_resort?.toLowerCase().includes(search.toLowerCase()) ||
    v.place_name?.toLowerCase().includes(search.toLowerCase())
  )

  // Stats
  const totalVotes = votes.length
  const countries = votes.reduce((acc, v) => {
    if (v.country) acc[v.country] = (acc[v.country] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topResorts = votes.reduce((acc, v) => {
    const rn = v.place_name || v.best_dive_resort; if (rn) acc[rn] = (acc[v.best_dive_resort] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topFood = votes.reduce((acc, v) => {
    const fn = v.place_name || v.best_dive_food; if (fn) acc[fn] = (acc[v.best_dive_food] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const topLB = votes.reduce((acc, v) => {
    if (v.best_liveaboard) acc[v.best_liveaboard] = (acc[v.best_liveaboard] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const sortedPicks = (obj: Record<string, number>) =>
    Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const downloadCSV = () => {
    window.open(API + "&format=csv", "_blank")
  }

  const refresh = () => {
    setLoading(true)
    fetch(API)
      .then(r => r.json())
      .then(d => { setVotes(d.votes || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  const fmt = (d: string) => {
    if (!d) return ""
    const dt = new Date(d)
    return dt.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + " " + dt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  }

  const s = {
    card: {background:"#fff",borderRadius:12,border:"1px solid #E8E8E8",padding:"1.25rem",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"} as React.CSSProperties,
    label: {fontSize:10,fontWeight:700,letterSpacing:1,textTransform:"uppercase" as const,color:"#aaa",marginBottom:4},
    big: {fontSize:28,fontWeight:700,color:"#0A2342"} as React.CSSProperties,
  }

  if (loading) return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#F3F4F6"}}>
      <Nav />
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"60vh"}}>
        <div style={{textAlign:"center",color:"#999"}}>
          <div style={{fontSize:36,marginBottom:12}}>Loading votes...</div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#F3F4F6"}}>
      <Nav />

      <div style={{background:"#0A2342",padding:"2rem clamp(1rem,3vw,2rem)"}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
          <div>
            <h1 style={{color:"#fff",fontSize:24,fontWeight:700,margin:0}}>Vote Dashboard</h1>
            <p style={{color:"rgba(255,255,255,0.5)",fontSize:13,margin:"4px 0 0"}}>BestDiveGuide admin panel</p>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={refresh} style={{background:"rgba(255,255,255,0.1)",color:"#fff",border:"1px solid rgba(255,255,255,0.2)",padding:"8px 16px",borderRadius:7,cursor:"pointer",fontSize:13,fontWeight:600}}>Refresh</button>
            <button onClick={downloadCSV} style={{background:"#E8723A",color:"#fff",border:"none",padding:"8px 16px",borderRadius:7,cursor:"pointer",fontSize:13,fontWeight:600}}>Download CSV</button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"clamp(1rem,3vw,2rem)"}}>

        {/* Stats row */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))",gap:12,marginBottom:"1.5rem"}}>
          <div style={s.card}>
            <div style={s.label}>Total Votes</div>
            <div style={s.big}>{totalVotes}</div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Countries</div>
            <div style={s.big}>{Object.keys(countries).length}</div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Panel Members</div>
            <div style={s.big}>{votes.filter(v => v.is_panel_member).length}</div>
          </div>
          <div style={s.card}>
            <div style={s.label}>Avg Dives Logged</div>
            <div style={s.big}>{votes.length ? Math.round(votes.reduce((a, v) => a + (v.logged_dives || 0), 0) / votes.length) : 0}</div>
          </div>
        </div>

        {/* Top picks */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:12,marginBottom:"1.5rem"}}>
          {[
            {title:"Top Resort Picks",data:sortedPicks(topResorts)},
            {title:"Top Food Picks",data:sortedPicks(topFood)},
            {title:"Top Liveaboard Picks",data:sortedPicks(topLB)},
            {title:"Voters by Country",data:sortedPicks(countries)},
          ].map(sec => (
            <div key={sec.title} style={s.card}>
              <div style={{...s.label,marginBottom:10}}>{sec.title}</div>
              {sec.data.length === 0 ? <div style={{fontSize:12,color:"#ccc"}}>No data yet</div> :
                sec.data.map(([name, count], i) => (
                  <div key={name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:i < sec.data.length - 1 ? "1px solid #f0f0f0" : "none"}}>
                    <span style={{fontSize:13,color:"#333",fontWeight:i === 0 ? 700 : 400}}>{name}</span>
                    <span style={{fontSize:12,fontWeight:700,color:"#0097A7",background:"#E1F5F8",padding:"2px 8px",borderRadius:10}}>{count}</span>
                  </div>
                ))
              }
            </div>
          ))}
        </div>

        {/* Search + table */}
        <div style={{...s.card,padding:0,overflow:"hidden"}}>
          <div style={{padding:"1rem 1.25rem",borderBottom:"1px solid #E8E8E8",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:15,fontWeight:700,color:"#0A2342"}}>All Votes ({filtered.length})</div>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, email, country, pick..."
              style={{padding:"8px 14px",borderRadius:8,border:"1.5px solid #ddd",fontSize:13,width:280,outline:"none"}}
            />
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
              <thead>
                <tr style={{background:"#F8F9FA",textAlign:"left"}}>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11,letterSpacing:0.5}}>Date</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Name</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Email</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Country</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Role</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Dives</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Place Voted For</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}>Ratings</th>
                  <th style={{padding:"10px 14px",fontWeight:700,color:"#666",fontSize:11}}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => (
                  <tr key={v.id} style={{borderBottom:"1px solid #f0f0f0"}}>
                    <td style={{padding:"10px 14px",color:"#888",whiteSpace:"nowrap"}}>{fmt(v.created_at)}</td>
                    <td style={{padding:"10px 14px",fontWeight:600,color:"#0A2342"}}>{v.full_name}</td>
                    <td style={{padding:"10px 14px",color:"#555"}}>{v.email}</td>
                    <td style={{padding:"10px 14px"}}><span style={{background:"#E1F5F8",color:"#006D78",fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:4}}>{v.country || "-"}</span></td>
                    <td style={{padding:"10px 14px",color:"#555",fontSize:12}}>{v.voter_role?.replace(/_/g," ") || "-"}</td>
                    <td style={{padding:"10px 14px",color:"#555"}}>{v.logged_dives || "-"}</td>
                    <td style={{padding:"10px 14px",color:"#333",fontSize:12,fontWeight:600}}>{v.place_name || v.best_dive_resort || "-"}</td>
                    <td style={{padding:"10px 14px",fontSize:12}}>{v.dive_rating || v.food_rating || v.stay_rating ? <span style={{color:"#0097A7",fontWeight:600}}>D:{v.dive_rating||"-"} F:{v.food_rating||"-"} S:{v.stay_rating||"-"}</span> : <span style={{color:"#ccc"}}>-</span>}</td>
                    <td style={{padding:"10px 14px"}}>
                      <button onClick={() => setSelected(v)} style={{background:"#0A2342",color:"#fff",border:"none",padding:"4px 10px",borderRadius:5,cursor:"pointer",fontSize:11,fontWeight:600}}>View</button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={9} style={{padding:40,textAlign:"center",color:"#ccc"}}>No votes yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div onClick={() => setSelected(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:"1rem"}}>
          <div onClick={e => e.stopPropagation()} style={{background:"#fff",borderRadius:16,padding:"2rem",maxWidth:520,width:"100%",maxHeight:"80vh",overflow:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
              <h2 style={{fontSize:20,fontWeight:700,color:"#0A2342",margin:0}}>{selected.full_name}</h2>
              <button onClick={() => setSelected(null)} style={{background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#999"}}>x</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:13}}>
              {[
                ["Email", selected.email],
                ["Country", selected.country],
                ["Role", selected.voter_role?.replace(/_/g, " ")],
                ["Profession", selected.profession],
                ["Cert", (selected.cert_agency || "") + " " + (selected.cert_level || "")],
                ["Logged Dives", selected.logged_dives],
                ["Panel Member", selected.is_panel_member ? "Yes" : "No"],
                ["Voted", fmt(selected.created_at)],
              ].map(([label, val]) => (
                <div key={String(label)}>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:"#aaa",marginBottom:2}}>{label}</div>
                  <div style={{color:"#333",fontWeight:500}}>{String(val || "-")}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #eee"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:"#aaa",marginBottom:8}}>Picks</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,fontSize:13}}>
                {[
                  ["Place Voted For", selected.place_name || selected.best_dive_resort],
                  ["Place Country", selected.place_country],
                  ["Visit Date", selected.visit_date],
                  ["Proof", selected.visit_proof],
                ].map(([label, val]) => (
                  <div key={String(label)}>
                    <div style={{fontSize:10,fontWeight:700,color:"#aaa",marginBottom:2}}>{label}</div>
                    <div style={{color:"#0A2342",fontWeight:600}}>{String(val || "-")}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #eee"}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:"#aaa",marginBottom:8}}>Ratings</div>
              <div style={{display:"flex",gap:16}}>
                {[["Dive", selected.dive_rating],["Food", selected.food_rating],["Stay", selected.stay_rating]].map(([l,v]) => (
                  <div key={String(l)} style={{textAlign:"center"}}>
                    <div style={{fontSize:24,fontWeight:700,color:Number(v) >= 8 ? "#2E7D32" : Number(v) >= 5 ? "#F57F17" : "#C62828"}}>{String(v || "-")}</div>
                    <div style={{fontSize:10,color:"#aaa",fontWeight:600}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            {selected.raw_scores && Object.keys(selected.raw_scores).length > 0 && (
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #eee"}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:"#aaa",marginBottom:8}}>Detailed Scores</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
                  {Object.entries(selected.raw_scores).filter(([,v])=>v).map(([k,v])=>(
                    <div key={k} style={{display:"flex",justifyContent:"space-between",fontSize:12}}>
                      <span style={{color:"#666"}}>{k.replace(/_/g," ")}</span>
                      <span style={{fontWeight:700,color:Number(v)>=8?"#2E7D32":Number(v)>=5?"#F57F17":"#C62828"}}>{String(v)}/10</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {selected.raw_feedback && (
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #eee"}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:"#aaa",marginBottom:6}}>Feedback</div>
                {Object.entries(selected.raw_feedback).filter(([,v])=>v).map(([k,v])=>(
                  <div key={k} style={{marginBottom:8}}>
                    <div style={{fontSize:11,fontWeight:600,color:"#888",textTransform:"capitalize"}}>{k.replace(/_/g," ")}</div>
                    <p style={{fontSize:13,color:"#333",margin:"2px 0 0",lineHeight:1.5}}>{String(v)}</p>
                  </div>
                ))}
              </div>
            )}
            {selected.comments && (
              <div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #eee"}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:"#aaa",marginBottom:6}}>Comments</div>
                <p style={{fontSize:13,color:"#555",lineHeight:1.6,margin:0}}>{selected.comments}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
