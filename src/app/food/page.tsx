import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const BADGE_R = { background:'#E8723A', color:'#fff', fontSize:'10px', fontWeight:700, padding:'2px 7px', borderRadius:'4px', letterSpacing:'0.5px' }
const TAG = (color:string,tc:string) => ({ fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase' as const,padding:'2px 8px',borderRadius:'3px',background:color,color:tc })

type FoodEntry = {
  rank: number
  name: string
  type: string
  loc: string
  score: string
  badge: boolean
  cuisine: string
  desc: string
  highlight?: string
}

const entries: FoodEntry[] = [
  { rank:1, name:"Emperor Harmony — Galley Kitchen", type:"Liveaboard", loc:"Raja Ampat, Indonesia", score:"9.7", badge:true, cuisine:"Pan-Asian",
    highlight:"Best in Category",
    desc:"Five-course dinners with market-fresh ingredients sourced at each port stop. Guest chefs rotate seasonally." },
  { rank:2, name:"Wakatobi — Norma Restaurant", type:"Island Resort", loc:"Wakatobi, Indonesia", score:"9.5", badge:true, cuisine:"Local Fusion",
    desc:"Celebrated for its whole-grilled barramundi and multi-course Indonesian tasting menus." },
  { rank:3, name:"CoralEye — The Jetty Table", type:"Boutique Resort", loc:"Bunaken, North Sulawesi", score:"9.4", badge:false, cuisine:"Indonesian",
    desc:"Barefoot dining under mangroves with catch-of-the-day menus designed by a Michelin-trained chef." },
  { rank:4, name:"Misool Eco Resort Kitchen", type:"Eco Resort", loc:"Raja Ampat, Indonesia", score:"9.2", badge:true, cuisine:"Local & Organic",
    desc:"100% sustainable menu. Every ingredient either grown on-site or sourced from local fishermen." },
  { rank:5, name:"Lembeh Resort — Dive & Dine", type:"Dive Lodge", loc:"Lembeh Strait, Indonesia", score:"9.1", badge:false, cuisine:"Fusion",
    desc:"A rotating menu of 12 dishes inspired by the surrounding biodiversity — known for its smoked tuna starter." },
  { rank:6, name:"Gangga Island — Spice Kitchen", type:"Island Lodge", loc:"North Sulawesi, Indonesia", score:"8.9", badge:true, cuisine:"North Sulawesi",
    desc:"Named best resort dining in Sulawesi three years running. Try the woku-woku fish preparation." },
  { rank:7, name:"Coco Bodu Hithi — Latitude", type:"Luxury Resort", loc:"North Male Atoll, Maldives", score:"8.8", badge:false, cuisine:"Modern Asian",
    desc:"Overwater restaurant with glass floor panels — seafood from the lagoon, presented with hotel-level finesse." },
  { rank:8, name:"Palau Aggressor III Kitchen", type:"Liveaboard", loc:"Palau, Micronesia", score:"8.7", badge:false, cuisine:"American & Pacific",
    desc:"Full galley producing three full meals plus afternoon snacks — known for its Pacific barbecue nights." },
  { rank:9, name:"Kuredu — Sangu Restaurant", type:"Island Resort", loc:"Lhaviyani Atoll, Maldives", score:"8.6", badge:true, cuisine:"Maldivian",
    desc:"Traditional Maldivian flavours including rihaakuru fish paste, garudhiya broth, and coconut rice." },
  { rank:10, name:"Atlantis Dumaguete — Chill Out", type:"Dive Resort", loc:"Dauin, Philippines", score:"8.4", badge:false, cuisine:"Filipino & BBQ",
    desc:"Sunset-facing restaurant with grilled seafood platters and Cebuano-style crispy pata to restore post-dive." },
  { rank:11, name:"Papua Explorers — Dock Kitchen", type:"Dive Lodge", loc:"Raja Ampat, Indonesia", score:"8.3", badge:true, cuisine:"Indonesian",
    desc:"Family-style dining with traditional Papuan spice pastes. The smoked fish breakfast is legendary." },
  { rank:12, name:"Manta Ray Bay — Mnuw Restaurant", type:"Boutique Resort", loc:"Yap, Micronesia", score:"8.2", badge:false, cuisine:"Pacific Fusion",
    desc:"Local taro, breadfruit, and fresh tuna feature across a menu that changes with the fishing season." },
  { rank:13, name:"Secret Paradise — Deck Dining", type:"Boutique Resort", loc:"Myanmar", score:"8.1", badge:false, cuisine:"Burmese",
    desc:"Authentic Burmese curries served beachside — the turmeric prawn and mohinga soup are must-orders." },
  { rank:14, name:"Blue Season Bali — Warung Segara", type:"Dive Resort", loc:"Sanur, Bali", score:"7.9", badge:false, cuisine:"Balinese",
    desc:"Traditional Balinese warung inside the resort — babi guling on Sundays and fresh coconuts all day." },
  { rank:15, name:"Siladen Island — Sirih Dining", type:"Island Resort", loc:"North Sulawesi, Indonesia", score:"7.8", badge:true, cuisine:"North Sulawesi",
    desc:"Signature rica-rica grilled fish and sago porridge — a true celebration of North Sulawesi spice heritage." },
]

export default function Food() {
  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh',background:'#F8F9FA'}}>
      <Nav active="/food" />

      <div style={{background:'linear-gradient(135deg,#1A0A05 0%,#3D1500 100%)',padding:'4rem 2rem 3rem',textAlign:'center'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#E8723A',marginBottom:'12px'}}>Best Dive Food 2025</div>
        <h1 style={{color:'#fff',fontSize:'42px',fontWeight:700,lineHeight:1.15,maxWidth:'680px',margin:'0 auto 1rem'}}>
          Top 100 Dive <span style={{color:'#E8723A'}}>Food Experiences</span>
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',maxWidth:'520px',margin:'0 auto',lineHeight:1.7}}>
          Where divers eat the best — resort restaurants, liveaboard galleys, and dive-day dining ranked on quality, provenance, and experience.
        </p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',marginTop:'1.5rem',flexWrap:'wrap'}}>
          {[{label:'Resorts',n:72},{label:'Liveaboards',n:18},{label:'Standalone',n:10}].map(s=>(
            <div key={s.label} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'8px',padding:'10px 20px',textAlign:'center'}}>
              <div style={{color:'#fff',fontWeight:700,fontSize:'22px'}}>{s.n}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#fff',borderBottom:'1px solid #E8E8E8',padding:'12px 2rem',display:'flex',gap:'1.5rem',alignItems:'center',flexWrap:'wrap'}}>
        <span style={{fontSize:'12px',color:'#888',fontWeight:600}}>Key:</span>
        <span style={{...BADGE_R}}>R</span>
        <span style={{fontSize:'12px',color:'#555'}}>Recommended — exceptional dining experience</span>
        <span style={{...TAG('#E1F5F8','#006D78')}}>Liveaboard</span>
        <span style={{fontSize:'12px',color:'#555'}}>eligible for Food, Stays &amp; Liveaboard awards</span>
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {entries.map(e => (
            <div key={e.rank} style={{background:'#fff',border:'1px solid #E8E8E8',borderRadius:'12px',padding:'1.25rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1.25rem',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
              <div style={{minWidth:'48px',textAlign:'center',paddingTop:'2px'}}>
                <div style={{fontSize:'22px',fontWeight:700,color: e.rank<=3?'#E8723A':'#0A2342',lineHeight:1}}>#{e.rank}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'5px'}}>
                  <span style={{fontWeight:700,fontSize:'15px',color:'#0A2342'}}>{e.name}</span>
                  {e.badge && <span style={{...BADGE_R}}>R</span>}
                  <span style={{...TAG('#FEF0E8','#C85A20')}}>{e.cuisine}</span>
                  {e.type === 'Liveaboard' && <span style={{...TAG('#E1F5F8','#006D78')}}>Liveaboard</span>}
                </div>
                <div style={{fontSize:'12px',color:'#0097A7',fontWeight:600,marginBottom:'6px'}}>📍 {e.loc}</div>
                <p style={{fontSize:'13px',color:'#666',lineHeight:1.6,margin:0}}>{e.desc}</p>
                {e.highlight && (
                  <span style={{display:'inline-block',marginTop:'6px',fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase',color:'#E8723A',background:'#FEF0E8',padding:'2px 8px',borderRadius:'3px'}}>
                    {e.highlight}
                  </span>
                )}
              </div>
              <div style={{minWidth:'64px',textAlign:'center',flexShrink:0}}>
                <div style={{background:'#FEF0E8',borderRadius:'8px',padding:'10px 12px'}}>
                  <div style={{fontSize:'22px',fontWeight:700,color:'#E8723A',lineHeight:1}}>{e.score}</div>
                  <div style={{fontSize:'9px',color:'#888',marginTop:'2px',fontWeight:600}}>SCORE</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'#FEF0E8',border:'1px solid #FBCBA9',borderRadius:'10px',padding:'1.25rem 1.5rem',marginTop:'2rem',textAlign:'center'}}>
          <p style={{fontSize:'13px',color:'#C85A20',margin:0,lineHeight:1.6}}>
            <strong>Entries 16–100 coming soon.</strong>{' '}
            <a href="mailto:nic.vdb80@gmail.com" style={{color:'#E8723A',fontWeight:600}}>Nominate a dining experience →</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
