import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const TAG = (color:string,tc:string) => ({ fontSize:'10px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase' as const,padding:'2px 8px',borderRadius:'3px',background:color,color:tc })

const entries = [
  {rank:1,name:'Misool Eco Resort',loc:'Raja Ampat, Indonesia',type:'Island Resort',cert:'Green Fins',score:'9.8',badge:true,desc:'Operates a 50,000 hectare no-take zone. All solar powered, zero single-use plastic, coral restoration nursery on-site.',pillars:['No-take Zone','Solar','Coral Restoration','Zero Plastic'],url:'https://www.misoolresort.com/'},
  {rank:2,name:'Barefoot Eco Hotel',loc:'Hanifaru Bay, Maldives',type:'Eco Hotel',cert:'EarthCheck Gold',score:'9.6',badge:true,desc:'Certified carbon-neutral. Works directly with UNESCO biosphere management authority to limit diver impact at Hanifaru.',pillars:['Carbon Neutral','UNESCO Partner','Waste Recycling'],url:'https://www.barefoothotel.com/'},
  {rank:3,name:'Gangga Divers',loc:'North Sulawesi, Indonesia',type:'Dive Operator',cert:'Green Fins',score:'9.5',badge:false,desc:'Green Fins certified operator running reef-check surveys monthly. Mangrove planting programme, no-feed dive policy.',pillars:['Reef Monitoring','Mangrove Planting','Green Fins'],url:'https://www.ganggaisland.com/'},
  {rank:4,name:'Emperor Fleet',loc:'Red Sea & Maldives',type:'Liveaboard Fleet',cert:'Blue Flag',score:'9.4',badge:true,desc:'Fleet-wide prohibition on single-use plastics. Onboard marine biologists, underwater litter collection on every dive.',pillars:['Marine Biologist','Zero Plastic','Litter Dives'],url:'https://www.emperordivers.com/'},
  {rank:5,name:'Wakatobi Resort',loc:'Wakatobi, Indonesia',type:'Island Resort',cert:'Green Fins',score:'9.3',badge:false,desc:'Coral sponsorship programme (guest-fund corals on the house reef), 100% renewable energy on the main island.',pillars:['Coral Sponsorship','Renewable Energy'],url:'https://www.wakatobi.com/'},
  {rank:6,name:'Secret Paradise Resort',loc:'Myanmar',type:'Boutique Resort',cert:'Travelife Gold',score:'9.2',badge:false,desc:'Wildlife spotting protocols, local supply chain (90%+ food from local fishermen), plastic-free campus.',pillars:['Local Supply Chain','Plastic-Free','Wildlife Protocols'],url:'https://www.secretparadise-myanmar.com/'},
  {rank:7,name:'Tubbataha Conservation Partners',loc:'Palawan, Philippines',type:'Conservation Org',cert:'IUCN Partner',score:'9.1',badge:true,desc:'Manages the UNESCO World Heritage Tubbataha Reef. Operator fee revenues fund ranger patrols and mooring maintenance.',pillars:['UNESCO Heritage','Ranger Support','Mooring Conservation'],url:'https://www.tubbatahareef.org/'},
  {rank:8,name:'CoralEye Marine Research',loc:'Bunaken, North Sulawesi',type:'Boutique Resort',cert:'Green Fins',score:'9.0',badge:false,desc:'Partners with Wageningen University on manta and whale shark tracking. Station data openly published for research use.',pillars:['Academic Research','Marine Tracking','Open Data'],url:'https://www.coraleye.com/'},
  {rank:9,name:'Aggressor Adventures',loc:'Global Fleet',type:'Liveaboard Fleet',cert:'Green Fins',score:'8.8',badge:false,desc:'The global Aggressor fleet has adopted fleet-wide dive briefings aligned to Green Fins code of conduct.',pillars:['Green Fins Fleet','Dive Codes','Diver Education'],url:'https://www.aggressor.com/'},
  {rank:10,name:'Papua Explorers',loc:'Raja Ampat, Indonesia',type:'Dive Lodge',cert:'Green Fins',score:'8.7',badge:true,desc:'100% locally owned and staffed. All profits invested back into the local village and marine patrol programme.',pillars:['Local Ownership','Marine Patrol','Community Investment'],url:'https://www.papuaexplorers.com/'},
  {rank:11,name:'Lembeh Resort',loc:'Lembeh Strait, Indonesia',type:'Dive Lodge',cert:'Green Fins',score:'8.6',badge:false,desc:'No gloves policy, buoyancy-first guiding, weekly macro counts shared with IUCN Muck Dive Database.',pillars:['Buoyancy Standards','Citizen Science','Marine Census'],url:'https://www.lembehresort.com/'},
  {rank:12,name:'Blue Season Bali',loc:'Sanur, Bali',type:'Dive Resort',cert:'PADI Eco',score:'8.4',badge:false,desc:'PADI Eco-certified operator with open-water litter collection, plastic removal certificates for guests.',pillars:['PADI Eco','Litter Collection','Guest Certificates'],url:'https://www.baliinternationaldiving.com/'},
]

function PillarTag({p}:{p:string}) {
  return <span style={{...TAG('#E8F5E9','#2E7D32'),marginRight:'4px',marginBottom:'4px',display:'inline-block'}}>{p}</span>
}

export default function Sustainable() {
  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh',background:'#F8F9FA'}}>
      <Nav active="/sustainable" />

      <div style={{background:'linear-gradient(135deg,#0A2E0A 0%,#1B5E20 100%)',padding:'4rem 2rem 3rem',textAlign:'center'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#81C784',marginBottom:'12px'}}>Sustainable Operators 2025</div>
        <h1 style={{color:'#fff',fontSize:'42px',fontWeight:700,lineHeight:1.15,maxWidth:'700px',margin:'0 auto 1rem'}}>
          Most <span style={{color:'#81C784'}}>Sustainable</span> Dive Operators
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',maxWidth:'540px',margin:'0 auto',lineHeight:1.7}}>
          Operators leading on ocean health, carbon footprint, marine protection, and community impact — verified by Green Fins, EarthCheck, and independent assessment.
        </p>
        <div style={{display:'flex',gap:'16px',justifyContent:'center',marginTop:'1.5rem',flexWrap:'wrap'}}>
          {[{label:'Green Fins Certified',n:8},{label:'Carbon Neutral',n:3},{label:'UNESCO Partners',n:2}].map(s=>(
            <div key={s.label} style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.2)',borderRadius:'8px',padding:'10px 20px',textAlign:'center'}}>
              <div style={{color:'#81C784',fontWeight:700,fontSize:'22px'}}>{s.n}</div>
              <div style={{color:'rgba(255,255,255,0.5)',fontSize:'11px',marginTop:'2px'}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{background:'#E8F5E9',borderBottom:'1px solid #C8E6C9',padding:'12px 2rem',display:'flex',gap:'1.5rem',alignItems:'center',flexWrap:'wrap'}}>
        <span style={{fontSize:'12px',color:'#2E7D32',fontWeight:700}}>🌊 What we measure:</span>
        {['Marine Protection','Carbon Footprint','Plastic Reduction','Community Impact','Reef Education','Local Employment'].map(p=>(
          <span key={p} style={{fontSize:'12px',color:'#388E3C'}}>{p}</span>
        ))}
      </div>

      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'2rem'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {entries.map(e => (
            <div key={e.rank} style={{background:'#fff',border:'1px solid #E8E8E8',borderRadius:'12px',padding:'1.25rem 1.5rem',display:'flex',alignItems:'flex-start',gap:'1.25rem',boxShadow:'0 1px 4px rgba(0,0,0,0.04)'}}>
              <div style={{minWidth:'48px',textAlign:'center',paddingTop:'2px'}}>
                <div style={{fontSize:'22px',fontWeight:700,color: e.rank<=3?'#2E7D32':'#0A2342',lineHeight:1}}>#{e.rank}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'5px'}}>
                  <span style={{fontWeight:700,fontSize:'15px',color:'#0A2342'}}>{e.name}</span>
                  {e.badge && <span style={{background:'#2E7D32',color:'#fff',fontSize:'10px',fontWeight:700,padding:'2px 7px',borderRadius:'4px'}}>R</span>}
                  <span style={{...TAG('#E8F5E9','#2E7D32')}}>{e.type}</span>
                  <span style={{...TAG('#C8E6C9','#1B5E20')}}>{e.cert}</span>
                </div>
                <div style={{fontSize:'12px',color:'#0097A7',fontWeight:600,marginBottom:'6px'}}>📍 {e.loc}</div>
                <p style={{fontSize:'13px',color:'#666',lineHeight:1.6,margin:'0 0 8px'}}>{e.desc}</p>
                  {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"12px",fontWeight:700,color:"#0A2342",background:"#F0F2F5",padding:"6px 14px",borderRadius:"6px",textDecoration:"none",marginTop:"8px"}}>Visit website ↗</a>}
                <div style={{display:'flex',flexWrap:'wrap'}}>
                  {e.pillars.map(p=><PillarTag key={p} p={p}/>)}
                </div>
              </div>
              <div style={{minWidth:'64px',textAlign:'center',flexShrink:0}}>
                <div style={{background:'#E8F5E9',borderRadius:'8px',padding:'10px 12px'}}>
                  <div style={{fontSize:'22px',fontWeight:700,color:'#2E7D32',lineHeight:1}}>{e.score}</div>
                  <div style={{fontSize:'9px',color:'#888',marginTop:'2px',fontWeight:600}}>SCORE</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'#E8F5E9',border:'1px solid #C8E6C9',borderRadius:'10px',padding:'1.25rem 1.5rem',marginTop:'2rem',textAlign:'center'}}>
          <p style={{fontSize:'13px',color:'#2E7D32',margin:0,lineHeight:1.6}}>
            <strong>Full 100 operators coming soon.</strong> Is your operation leading on sustainability? <a href="mailto:nic.vdb80@gmail.com" style={{color:'#2E7D32',fontWeight:600}}>Apply for assessment →</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}
