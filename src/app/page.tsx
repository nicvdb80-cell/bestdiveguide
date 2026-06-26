import React from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh',background:'#fff'}}>

      <Nav />

      <div style={{background:'#0A2342',padding:'5rem 2rem 4rem',textAlign:'center'}}>
        <h1 style={{color:'#fff',fontSize:'46px',fontWeight:700,lineHeight:1.15,maxWidth:'680px',margin:'0 auto 1rem'}}>
          Discover where to go for the world&apos;s best <span style={{color:'#0097A7'}}>dives</span>, dining &amp; sleep.
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'18px',maxWidth:'500px',margin:'0 auto 2.5rem',lineHeight:1.6}}>
          Ranked by experienced divers, food lovers, and real guests who have actually been there.
        </p>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/top100" style={{background:'#E8723A',color:'#fff',padding:'14px 28px',borderRadius:'9px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>
            Explore Top 99 Asia
          </Link>
          <Link href="/top100-world" style={{background:'transparent',color:'#fff',border:'1.5px solid rgba(255,255,255,0.4)',padding:'13px 24px',borderRadius:'9px',textDecoration:'none',fontWeight:500,fontSize:'15px'}}>
            Top 99 World
          </Link>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'1px',background:'#e8e8e8'}}>
        {[
          {href:'/stays',title:'Best Dive Stays',desc:'Where divers sleep the best. Resorts, liveaboards, boutique stays.',color:'#E1F5F8',tc:'#0097A7'},
          {href:'/food',title:'Best Dive Food',desc:'Where divers eat the best. Resort restaurants and liveaboard galleys.',color:'#FEF0E8',tc:'#E8723A'},
          {href:'/sites',title:'Best Dive Sites',desc:'Where divers dive the best. Reefs, walls, shark dives, wrecks.',color:'#E8EFF8',tc:'#1B6CA8'},
          {href:'/sustainable',title:'Most Sustainable',desc:'Operators doing the right thing for the ocean and reef.',color:'#E8F5E9',tc:'#2E7D32'},
        ].map(c => (
          <Link key={c.title} href={c.href} style={{background:'#fff',padding:'2rem',textAlign:'center',textDecoration:'none',display:'block'}}>
            <div style={{width:'48px',height:'48px',borderRadius:'50%',background:c.color,margin:'0 auto 1rem'}} />
            <h3 style={{fontSize:'15px',fontWeight:700,color:'#0A2342',marginBottom:'8px'}}>{c.title}</h3>
            <p style={{fontSize:'13px',color:'#666',lineHeight:1.6}}>{c.desc}</p>
            <span style={{display:'inline-block',marginTop:'12px',fontSize:'12px',fontWeight:600,color:c.tc}}>View rankings →</span>
          </Link>
        ))}
      </div>

      <div style={{padding:'4rem 2rem',maxWidth:'1100px',margin:'0 auto'}}>
        <div style={{fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'#0097A7',marginBottom:'12px'}}>Top 99 Ranking</div>
        <h2 style={{fontSize:'30px',fontWeight:700,color:'#0A2342',marginBottom:'8px'}}>The world&apos;s best dive experiences</h2>
        <p style={{fontSize:'15px',color:'#666',marginBottom:'2.5rem',maxWidth:'520px'}}>Every place ranked only on what it actually offers. Quality — not size or budget — determines position.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}}>
          {[
            {rank:1,name:'Emperor Harmony Liveaboard',loc:'Raja Ampat, Indonesia',cats:['Liveaboard','Dive','Food','Stay'],green:true,score:'9.4',discount:'BDG10-EMPEROR'},
            {rank:2,name:'CoralEye Boutique Resort',loc:'Bunaken, North Sulawesi',cats:['Dive','Food','Stay'],green:true,score:'9.3',discount:'BDG10-CORALEYE'},
            {rank:3,name:'Palau Aggressor III',loc:'Palau, Micronesia',cats:['Liveaboard','Dive'],green:true,score:'9.2',discount:null},
          ].map(l => (
            <div key={l.rank} style={{border:'1px solid #E8E8E8',borderRadius:'12px',overflow:'hidden',background:'#fff'}}>
              <div style={{height:'130px',background:'#0A2342',display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
                <span style={{position:'absolute',top:'10px',left:'11px',background:l.rank<=2?'#E8723A':'rgba(255,255,255,0.9)',color:l.rank<=2?'#fff':'#0A2342',fontSize:'13px',fontWeight:700,padding:'3px 9px',borderRadius:'5px'}}>#{l.rank}</span>
                {l.green && <span style={{position:'absolute',top:'10px',right:'10px',background:'#2E7D32',color:'#fff',fontSize:'10px',fontWeight:700,padding:'3px 7px',borderRadius:'4px'}}>Green Diver</span>}
              </div>
              <div style={{padding:'14px'}}>
                <div style={{fontWeight:700,fontSize:'13px',color:'#0A2342',marginBottom:'2px'}}>{l.name}</div>
                <div style={{fontSize:'11px',color:'#999',marginBottom:'8px'}}>{l.loc}</div>
                <div style={{display:'flex',gap:'4px',flexWrap:'wrap',marginBottom:'10px'}}>
                  {l.cats.map(c => <span key={c} style={{fontSize:'9px',fontWeight:700,letterSpacing:'0.5px',textTransform:'uppercase',padding:'2px 7px',borderRadius:'3px',background:'#E1F5F8',color:'#006D78'}}>{c}</span>)}
                </div>
                <div style={{display:'flex',gap:'6px',alignItems:'center'}}>
                  <span style={{background:'#EFF4FB',color:'#1B5CA0',fontWeight:700,fontSize:'12px',padding:'3px 8px',borderRadius:'5px'}}>{l.score} score</span>
                  {l.discount && <span style={{background:'#FEF0E8',color:'#C85A20',fontWeight:700,fontSize:'10px',padding:'3px 8px',borderRadius:'5px'}}>10% off</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:'2rem'}}>
          <Link href="/top100" style={{background:'#0A2342',color:'#fff',padding:'13px 28px',borderRadius:'9px',textDecoration:'none',fontWeight:700,fontSize:'14px'}}>View Full Top 99 →</Link>
        </div>
      </div>

      <div style={{background:'#0A2342',padding:'3.5rem 2rem'}}>
        <h2 style={{color:'#fff',fontSize:'24px',fontWeight:700,textAlign:'center',marginBottom:'6px'}}>Built on trust. Three layers deep.</h2>
        <p style={{color:'rgba(255,255,255,0.5)',textAlign:'center',fontSize:'14px',marginBottom:'2rem'}}>Every ranking verified by three independent sources — not just user reviews.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px',maxWidth:'900px',margin:'0 auto'}}>
          {[
            {n:'01',title:'Professional Panel',desc:'A curated group of dive professionals, photographers, culinary directors, and hospitality experts.',weight:'3× weight'},
            {n:'02',title:'Verified Public Votes',desc:'Any guest with proof of visit can vote. Weight adjusted by dive experience and expertise.',weight:'1.0–1.4× weight'},
            {n:'03',title:'Annual Review Committee',desc:'Once a year, 10 experts convene to verify consistency and confirm final rankings.',weight:'Override authority'},
          ].map(l => (
            <div key={l.n} style={{background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.12)',borderRadius:'10px',padding:'1.5rem'}}>
              <div style={{fontSize:'32px',fontWeight:700,color:'rgba(255,255,255,0.12)',marginBottom:'0.75rem'}}>{l.n}</div>
              <h4 style={{fontSize:'14px',fontWeight:700,color:'#fff',marginBottom:'8px'}}>{l.title}</h4>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,0.55)',lineHeight:1.6,marginBottom:'10px'}}>{l.desc}</p>
              <span style={{background:'rgba(232,114,58,0.2)',color:'#E8723A',fontSize:'11px',fontWeight:600,padding:'3px 10px',borderRadius:'4px'}}>{l.weight}</span>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
