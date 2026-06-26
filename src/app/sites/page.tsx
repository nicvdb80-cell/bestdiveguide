import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const TAG = (color:string,tc:string) => ({ fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase' as const,padding:'2px 8px',borderRadius:'3px',background:color,color:tc })

type SiteType = {
  rank:number
  name:string
  loc:string
  region:string
  type:string
  depth:string
  score:string
  badge:boolean
  desc:string
  highlight?:string
}

const entries: SiteType[] = [
  {rank:1, name:"Blue Corner Wall", loc:"Palau, Micronesia", region:"Pacific", type:"Wall & Current", depth:"5-40m", score:"9.9", badge:true, highlight:"#1 in the World",
    desc:"Pinnacle of big animal diving. Napoleon wrasse, grey reef sharks, barracuda tornadoes, and eagle rays on every dive."},
  {rank:2, name:"Komodo Batu Bolong", loc:"Komodo NP, Indonesia", region:"Coral Triangle", type:"Seamount", depth:"5-30m", score:"9.7", badge:true,
    desc:"Nutrient-rich upwellings attract giant trevally, white-tip sharks, and macro invertebrates across a single pinnacle."},
  {rank:3, name:"Tubbataha Reef North", loc:"Palawan, Philippines", region:"Coral Triangle", type:"Atoll Reef", depth:"10-50m", score:"9.6", badge:false,
    desc:"UNESCO World Heritage reef closed most of the year. Hammerheads, whale sharks, and pristine coral gardens."},
  {rank:4, name:"Richelieu Rock", loc:"Surin Islands, Thailand", region:"Andaman Sea", type:"Pinnacle", depth:"5-35m", score:"9.5", badge:true,
    desc:"Jacques Cousteau favourite site. Whale shark aggregation point during the right season, with incredible macro life."},
  {rank:5, name:"Manta Point, Nusa Penida", loc:"Bali, Indonesia", region:"Coral Triangle", type:"Cleaning Station", depth:"8-28m", score:"9.4", badge:false,
    desc:"Reliable oceanic manta ray cleaning station — multiple mantas in a single dive is common here."},
  {rank:6, name:"SS Thistlegorm", loc:"Red Sea, Egypt", region:"Red Sea", type:"Wreck", depth:"16-32m", score:"9.3", badge:false,
    desc:"WWII British cargo ship with motorbikes, trucks, and ammunition still in the hold. Quintessential wreck dive."},
  {rank:7, name:"Hanifaru Bay", loc:"Baa Atoll, Maldives", region:"Indian Ocean", type:"Aggregation", depth:"3-12m", score:"9.3", badge:true,
    desc:"UNESCO biosphere manta and whale shark feeding aggregation. Snorkel or free-dive only — preserving the experience."},
  {rank:8, name:"Banda Sea — Banda Neira", loc:"Maluku, Indonesia", region:"Coral Triangle", type:"Volcanic Wall", depth:"5-50m+", score:"9.2", badge:true,
    desc:"Remote volcanic archipelago with walls dropping into the abyss, schooling hammerheads, and untouched reefs."},
  {rank:9, name:"Ningaloo Reef", loc:"Western Australia", region:"Australia Pacific", type:"Reef", depth:"5-30m", score:"9.1", badge:false,
    desc:"The largest fringing reef accessible from shore. Whale shark season draws divers from every continent."},
  {rank:10, name:"Darwin Arch", loc:"Galapagos, Ecuador", region:"Pacific Americas", type:"Seamount", depth:"10-40m", score:"9.0", badge:true,
    desc:"Below the collapsed arch: whale shark aggregations, schools of hammerheads, and Galapagos sharks."},
  {rank:11, name:"The Cauldron, Fakarava", loc:"French Polynesia", region:"Pacific", type:"Channel Pass", depth:"10-25m", score:"8.9", badge:false,
    desc:"700 grey reef sharks and thousands of fish in a UNESCO biosphere pass. A drift dive of a lifetime."},
  {rank:12, name:"Shark and Yolanda Reefs", loc:"Ras Mohammed, Egypt", region:"Red Sea", type:"Reef & Wreck", depth:"5-30m", score:"8.8", badge:false,
    desc:"Classic Red Sea double: reef sharks on Shark Reef, ceramic tiles from the sunken Yolanda wreck next door."},
  {rank:13, name:"Monad Shoal", loc:"Malapascua, Philippines", region:"Coral Triangle", type:"Seamount", depth:"20-35m", score:"8.7", badge:true,
    desc:"Only reliable dive site in the world for thresher shark sightings — best at dawn as they ascend to the cleaning station."},
  {rank:14, name:"Navy Pier, Exmouth", loc:"Western Australia", region:"Australia Pacific", type:"Pier", depth:"5-12m", score:"8.6", badge:false,
    desc:"World-class muck diving under a military pier — tasselled wobbegong, nudibranchs, and weedy sea dragons."},
  {rank:15, name:"Lembeh Strait", loc:"North Sulawesi, Indonesia", region:"Coral Triangle", type:"Muck", depth:"5-25m", score:"8.5", badge:true,
    desc:"Global capital of muck diving. Mimic octopus, frogfish, flamboyant cuttlefish — biodiversity density unlike anywhere else."},
]

function typePill(t:string) {
  const map:Record<string,[string,string]> = {
    'Wall & Current':['#E8EFF8','#1B6CA8'],
    'Seamount':['#EDE7F6','#5E35B1'],
    'Atoll Reef':['#E8F5E9','#2E7D32'],
    'Pinnacle':['#EDE7F6','#5E35B1'],
    'Cleaning Station':['#E1F5F8','#006D78'],
    'Wreck':['#F5F5F5','#555'],
    'Aggregation':['#FEF0E8','#C85A20'],
    'Volcanic Wall':['#FCE4EC','#C62828'],
    'Reef':['#E8F5E9','#2E7D32'],
    'Channel Pass':['#E1F5F8','#006D78'],
    'Reef & Wreck':['#F5F5F5','#555'],
    'Pier':['#F5F5F5','#555'],
    'Muck':['#FFF8E1','#F57F17'],
  }
  const [bg,tc] = map[t] ?? ['#F5F5F5','#555']
  return <span style={{...TAG(bg,tc)}}>{t}</span>
}

export default function Sites() {
  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh',background:'#F8F9FA'}}>
      <Nav />

      <div style={{background:'linear-gradient(135deg,#002233 0%,#003D57 100%)',padding:'4rem 2rem 3rem',textAlign:'center'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#0097A7',marginBottom:'12px'}}>Best Dive Sites 2025</div>
        <h1 style={{color:'#fff',fontSize:'42px',fontWeight:700,lineHeight:1.15,maxWidth:'680px',margin:'0 auto 1rem'}}>
          Top 99 <span style={{color:'#0097A7'}}>Dive Sites</span> in the World
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',maxWidth:'520px',margin:'0 auto',lineHeight:1.7}}>
          Walls, wrecks, muck, seamounts, and passes — ranked by experienced divers on marine life density, visibility, and accessibility.
        </p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',marginTop:'1.5rem',flexWrap:'wrap'}}>
          {[{label:'Reef & Wall',n:38},{label:'Wrecks',n:14},{label:'Pelagic',n:28},{label:'Muck',n:12},{label:'Other',n:8}].map(s=>(
            <div key={s.label} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 16px',textAlign:'center'}}>
              <div style={{color:'#fff',fontWeight:700,fontSize:'20px'}}>{s.n}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {entries.map(e => (
            <div key={e.rank} style={{background:'#fff',border:'1px solid #E8E8E8',borderRadius:'12px',padding:'1.25rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1.25rem',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
              <div style={{minWidth:'48px',textAlign:'center',paddingTop:'2px'}}>
                <div style={{fontSize:'22px',fontWeight:700,color: e.rank<=3?'#0097A7':'#0A2342',lineHeight:1}}>#{e.rank}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'5px'}}>
                  <span style={{fontWeight:700,fontSize:'15px',color:'#0A2342'}}>{e.name}</span>
                  {e.badge && <span style={{background:'#0097A7',color:'#fff',fontSize:'10px',fontWeight:700,padding:'2px 7px',borderRadius:'4px'}}>R</span>}
                  {typePill(e.type)}
                  <span style={{...TAG('#E8F5E9','#2E7D32')}}>{e.region}</span>
                </div>
                <div style={{display:'flex',gap:'16px',marginBottom:'6px',alignItems:'center',flexWrap:'wrap'}}>
                  <span style={{fontSize:'12px',color:'#0097A7',fontWeight:600}}>📍 {e.loc}</span>
                  <span style={{fontSize:'11px',color:'#888'}}>⬇ Depth: {e.depth}</span>
                </div>
                <p style={{fontSize:'13px',color:'#666',lineHeight:1.6,margin:0}}>{e.desc}</p>
                {e.highlight && <span style={{display:'inline-block',marginTop:'6px',fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase',color:'#0097A7',background:'#E1F5F8',padding:'2px 8px',borderRadius:'3px'}}>{e.highlight}</span>}
              </div>
              <div style={{minWidth:'64px',textAlign:'center',flexShrink:0}}>
                <div style={{background:'#E1F5F8',borderRadius:'8px',padding:'10px 12px'}}>
                  <div style={{fontSize:'22px',fontWeight:700,color:'#0097A7',lineHeight:1}}>{e.score}</div>
                  <div style={{fontSize:'9px',color:'#888',marginTop:'2px',fontWeight:600}}>SCORE</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'#E1F5F8',border:'1px solid #B2EBF2',borderRadius:'10px',padding:'1.25rem 1.5rem',marginTop:'2rem',textAlign:'center'}}>
          <p style={{fontSize:'13px',color:'#006D78',margin:0,lineHeight:1.6}}>
            <strong>Sites 16–99 coming soon.</strong>{' '}
            <a href="mailto:nic.vdb80@gmail.com" style={{color:'#0097A7',fontWeight:600}}>Nominate a dive site →</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
