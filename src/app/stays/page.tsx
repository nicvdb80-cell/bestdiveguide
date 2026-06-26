import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BADGE_R = { background:'#0A2342', color:'#fff', fontSize:'10px', fontWeight:700, padding:'2px 7px', borderRadius:'4px', letterSpacing:'0.5px' }
const TAG = (color:string,tc:string) => ({ fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase' as const,padding:'2px 8px',borderRadius:'3px',background:color,color:tc })

const entries = [
  {rank:1,name:'Emperor Harmony',type:'Liveaboard',loc:'Raja Ampat, Indonesia',score:'9.8',badges:['R','Liveaboard'],desc:'Flagship liveaboard with 20 dive spots, butler service, and a wellness deck above the coral triangle.',highlight:'Exceptional'},
  {rank:2,name:'CoralEye Boutique Resort',type:'Boutique Resort',loc:'Bunaken, North Sulawesi',score:'9.6',badges:['R'],desc:'12-room over-water property with house reef access, marine biologist on staff, and outstanding cuisine.'},
  {rank:3,name:'Palau Aggressor III',type:'Liveaboard',loc:'Palau, Micronesia',score:'9.5',badges:['Liveaboard'],desc:'Iconic liveaboard exploring Jellyfish Lake, Blue Corner, and the German Channel with expert guides.'},
  {rank:4,name:'Wakatobi Dive Resort',type:'Island Resort',loc:'Wakatobi, Indonesia',score:'9.4',badges:['R'],desc:'Private island resort with a chartered supply boat and the longest house reef in the region.'},
  {rank:5,name:'Scuba Lodge Curaçao',type:'Boutique Hotel',loc:'Willemstad, Curaçao',score:'9.3',badges:[],desc:'Urban dive hotel steps from the waterfront, ideal for Caribbean wall diving with eco credentials.'},
  {rank:6,name:'Tubbataha Explorer',type:'Liveaboard',loc:'Tubbataha Reef, Philippines',score:'9.3',badges:['Liveaboard'],desc:'UNESCO Reef access liveaboard with seasonal berths. The only legal way to dive Tubbataha overnight.'},
  {rank:7,name:'Gangga Island Resort',type:'Island Lodge',loc:'North Sulawesi, Indonesia',score:'9.1',badges:[],desc:'Remote island lodge with seven dive sites accessible in under five minutes from the jetty.'},
  {rank:8,name:'Kuredu Island Resort',type:'Island Resort',loc:'Lhaviyani Atoll, Maldives',score:'9.0',badges:[],desc:'Maldivian resort famous for nurse shark and manta ray encounters on the outer atoll.'},
  {rank:9,name:'Manta Ray Bay Resort',type:'Boutique Resort',loc:'Yap, Micronesia',score:'8.9',badges:['R'],desc:'The global capital of manta ray diving, with guided channel dives and dedicated photographic briefings.'},
  {rank:10,name:'Coco Bodu Hithi',type:'Luxury Resort',loc:'North Malé Atoll, Maldives',score:'8.8',badges:[],desc:'Ultra-luxury five-star with a full PADI Gold Palm dive centre and overwater villa suites.'},
  {rank:11,name:'Secret Paradise Resort',type:'Boutique Resort',loc:'Myanmar',score:'8.7',badges:['R'],desc:'Intimate 10-room eco-lodge gateway to the pristine Mergui Archipelago.'},
  {rank:12,name:'Papua Explorers Dive Resort',type:'Dive Lodge',loc:'Raja Ampat, Indonesia',score:'8.6',badges:[],desc:'Jetty bungalows over the water, five-star guiding, and prolific biodiversity at the doorstep.'},
  {rank:13,name:'Aggressor Fleet – Cayman Islands',type:'Liveaboard',loc:'Grand Cayman, Caribbean',score:'8.5',badges:['Liveaboard'],desc:'Classic Caribbean liveaboard with wall dives, stingray city, and night diving on the ledge.'},
  {rank:14,name:'Atlantis Dive Resorts Dumaguete',type:'Dive Resort',loc:'Dauin, Philippines',score:'8.4',badges:[],desc:'Legendary muck diving resort with dedicated macro photography guides and night dive programs.'},
  {rank:15,name:'Lembeh Resort',type:'Dive Lodge',loc:'Lembeh Strait, Indonesia',score:'8.3',badges:['R'],desc:'Muck diving mecca — private rooms overlooking the strait, Critters@Lembeh dive guides.'},
  {rank:16,name:'Blue Season Bali',type:'Dive Resort',loc:'Sanur, Bali',score:'8.2',badges:[],desc:'Modern dive resort with transfers to Nusa Penida, Padangbai, and Tulamben on request.'},
  {rank:17,name:'Deep Blue Hotel',type:'Boutique Hotel',loc:'Utila, Honduras',score:'8.1',badges:[],desc:'Whale shark season hotspot on this Caribbean island, with affordable diver-friendly packages.'},
  {rank:18,name:'The Barefoot Eco Hotel',type:'Eco Hotel',loc:'Hanifaru Bay, Maldives',score:'8.0',badges:['R'],desc:'Eco-certified resort within reach of Hanifaru UNESCO manta aggregation site.'},
  {rank:19,name:'Misool Eco Resort',type:'Eco Resort',loc:'Raja Ampat, Indonesia',score:'7.9',badges:[],desc:'Marine protected area resort with a 50,000 hectare no-take zone funded by guest fees.'},
  {rank:20,name:'Siladen Island Resort',type:'Island Resort',loc:'North Sulawesi, Indonesia',score:'7.8',badges:[],desc:'Beachfront island resort 20 minutes from Bunaken and its wall diving system.'},
]

function typeTag(t:string) {
  const map:Record<string,[string,string]> = {
    'Liveaboard':['#E1F5F8','#006D78'],
    'Boutique Resort':['#FEF0E8','#C85A20'],
    'Island Resort':['#E8F5E9','#2E7D32'],
    'Island Lodge':['#E8F5E9','#2E7D32'],
    'Luxury Resort':['#EDE7F6','#5E35B1'],
    'Dive Resort':['#E8EFF8','#1B6CA8'],
    'Dive Lodge':['#E8EFF8','#1B6CA8'],
    'Boutique Hotel':['#FEF0E8','#C85A20'],
    'Eco Hotel':['#E8F5E9','#2E7D32'],
    'Eco Resort':['#E8F5E9','#2E7D32'],
  }
  const [bg,tc] = map[t] ?? ['#F5F5F5','#555']
  return <span style={{...TAG(bg,tc)}}>{t}</span>
}

export default function Stays() {
  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh',background:'#F8F9FA'}}>
      <Nav active="/stays" />

      {/* Hero */}
      <div style={{background:'linear-gradient(135deg,#0A2342 0%,#0D3060 100%)',padding:'4rem 2rem 3rem',textAlign:'center'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#0097A7',marginBottom:'12px'}}>Best Dive Stays 2025</div>
        <h1 style={{color:'#fff',fontSize:'42px',fontWeight:700,lineHeight:1.15,maxWidth:'680px',margin:'0 auto 1rem'}}>
          Top 100 Dive <span style={{color:'#E8723A'}}>Accommodations</span>
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',maxWidth:'520px',margin:'0 auto',lineHeight:1.7}}>
          Resorts, boutique hotels, island lodges &amp; liveaboards — ranked by divers who have actually stayed there.
        </p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',marginTop:'1.5rem',flexWrap:'wrap'}}>
          {[{label:'Resorts',n:64},{label:'Liveaboards',n:21},{label:'Boutique Hotels',n:15}].map(s=>(
            <div key={s.label} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',textAlign:'center'}}>
              <div style={{color:'#fff',fontWeight:700,fontSize:'22px'}}>{s.n}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{background:'#fff',borderBottom:'1px solid #E8E8E8',padding:'12px 2rem',display:'flex',gap:'1.5rem',alignItems:'center',flexWrap:'wrap'}}>
        <span style={{fontSize:'12px',color:'#888',fontWeight:600}}>Key:</span>
        <span style={{...BADGE_R}}>R</span><span style={{fontSize:'12px',color:'#555'}}>Recommended — exceptional in category</span>
        <span style={{...TAG('#E1F5F8','#006D78')}}>Liveaboard</span><span style={{fontSize:'12px',color:'#555'}}>eligible for Stays, Food &amp; Liveaboard awards</span>
      </div>

      {/* List */}
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {entries.map(e => (
            <div key={e.rank} style={{background:'#fff',border:'1px solid #E8E8E8',borderRadius:'12px',padding:'1.25rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1.25rem',boxShadow:'0 1px 4px rgba(0,0,0,0.04)',transition:'box-shadow .2s'}}>
              {/* Rank */}
              <div style={{minWidth:'48px',textAlign:'center',paddingTop:'2px'}}>
                <div style={{fontSize:'22px',fontWeight:700,color: e.rank<=3?'#E8723A':'#0A2342',lineHeight:1}}>#{e.rank}</div>
              </div>
              {/* Body */}
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'5px'}}>
                  <span style={{fontWeight:700,fontSize:'15px',color:'#0A2342'}}>{e.name}</span>
                  {e.badges.includes('R') && <span style={{...BADGE_R}}>R</span>}
                  {typeTag(e.type)}
                  {e.badges.includes('Liveaboard') && !e.type.includes('Liveaboard') && <span style={{...TAG('#E1F5F8','#006D78')}}>Liveaboard</span>}
                </div>
                <div style={{fontSize:'12px',color:'#0097A7',fontWeight:600,marginBottom:'6px'}}>📍 {e.loc}</div>
                <p style={{fontSize:'13px',color:'#666',lineHeight:1.6,margin:0}}>{e.desc}</p>
                {e.highlight && <span style={{display:'inline-block',marginTop:'6px',fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase',color:'#2E7D32',background:'#E8F5E9',padding:'2px 8px',borderRadius:'3px'}}>{e.highlight}</span>}
              </div>
              {/* Score */}
              <div style={{minWidth:'64px',textAlign:'center',flexShrink:0}}>
                <div style={{background:'#EFF4FB',borderRadius:'8px',padding:'10px 12px'}}>
                  <div style={{fontSize:'22px',fontWeight:700,color:'#0A2342',lineHeight:1}}>{e.score}</div>
                  <div style={{fontSize:'9px',color:'#888',marginTop:'2px',fontWeight:600}}>SCORE</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder notice */}
        <div style={{background:'#FEF0E8',border:'1px solid #FBCBA9',borderRadius:'10px',padding:'1.25rem 1.5rem',marginTop:'2rem',textAlign:'center'}}>
          <p style={{fontSize:'13px',color:'#C85A20',margin:0,lineHeight:1.6}}>
            <strong>Entries 21–100 coming soon.</strong> Real rankings launching once voting opens. <a href="mailto:nic.vdb80@gmail.com" style={{color:'#E8723A',fontWeight:600}}>Submit your property →</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
