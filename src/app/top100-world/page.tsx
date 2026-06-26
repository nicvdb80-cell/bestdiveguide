import Link from 'next/link'

export default function Top100World() {
  return (
    <div style={{fontFamily:'Inter,system-ui,sans-serif',minHeight:'100vh',background:'#fff'}}>
      <nav style={{background:'#0A2342',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 2rem',position:'sticky',top:0,zIndex:100}}>
        <Link href="/" style={{color:'#fff',fontWeight:700,fontSize:'18px',textDecoration:'none'}}>Best<span style={{color:'#E8723A'}}>Dive</span>Guide</Link>
        <div style={{display:'flex',gap:'1.5rem',alignItems:'center'}}>
          <Link href="/top100" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'14px'}}>Top 100 Asia</Link>
          <Link href="/top100-world" style={{color:'#fff',textDecoration:'none',fontSize:'14px',fontWeight:600}}>Top 100 World</Link>
          <Link href="/vote" style={{background:'#E8723A',color:'#fff',padding:'8px 18px',borderRadius:'7px',textDecoration:'none',fontSize:'13px',fontWeight:600}}>Vote</Link>
        </div>
      </nav>

      <div style={{background:'#0A2342',padding:'6rem 2rem',textAlign:'center'}}>
        <div style={{display:'inline-block',background:'rgba(232,114,58,0.15)',border:'1px solid rgba(232,114,58,0.4)',color:'#E8723A',fontSize:'11px',fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',padding:'6px 16px',borderRadius:'20px',marginBottom:'1.5rem'}}>
          Coming Soon
        </div>
        <h1 style={{color:'#fff',fontSize:'46px',fontWeight:700,lineHeight:1.15,maxWidth:'680px',margin:'0 auto 1rem'}}>
          Top 100 World
        </h1>
        <p style={{color:'rgba(255,255,255,0.6)',fontSize:'18px',maxWidth:'500px',margin:'0 auto 2.5rem',lineHeight:1.6}}>
          The global ranking is currently in progress. We are expanding beyond Asia to rank the world&apos;s best dive experiences.
        </p>
        <div style={{display:'inline-block',background:'rgba(255,255,255,0.07)',border:'1px solid rgba(255,255,255,0.15)',borderRadius:'12px',padding:'2rem 3rem',marginBottom:'2.5rem'}}>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',letterSpacing:'1px',textTransform:'uppercase',marginBottom:'8px'}}>Status</div>
          <div style={{color:'#fff',fontSize:'24px',fontWeight:700}}>TBA</div>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:'13px',marginTop:'8px'}}>To be announced</div>
        </div>
        <div>
          <Link href="/top100" style={{background:'#E8723A',color:'#fff',padding:'14px 28px',borderRadius:'9px',textDecoration:'none',fontWeight:700,fontSize:'15px'}}>
            View Top 100 Asia →
          </Link>
        </div>
      </div>

      <footer style={{background:'#0A2342',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'auto'}}>
        <div>
          <div style={{color:'#fff',fontWeight:700,fontSize:'16px'}}>Best<span style={{color:'#E8723A'}}>Dive</span>Guide</div>
          <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',fontStyle:'italic',marginTop:'4px'}}>Dive. Eat. Sleep. Repeat.</div>
        </div>
        <div style={{display:'flex',gap:'1.5rem'}}>
          {['Top 100 Asia','Top 100 World','Vote','About','Contact'].map(l => (
            <a key={l} href="#" style={{color:'rgba(255,255,255,0.45)',fontSize:'12px',textDecoration:'none'}}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
