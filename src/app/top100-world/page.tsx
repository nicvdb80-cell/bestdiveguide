import Nav from "@/components/Nav"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Top100World() {
  return (
    <div style={{fontFamily:"Inter,system-ui,sans-serif",minHeight:"100vh",background:"#fff"}}>
      <Nav active="/top100-world" />

      <div style={{background:"#0A2342",padding:"6rem 2rem",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(232,114,58,0.15)",border:"1px solid rgba(232,114,58,0.4)",color:"#E8723A",fontSize:"11px",fontWeight:700,letterSpacing:"2px",textTransform:"uppercase",padding:"6px 16px",borderRadius:"20px",marginBottom:"1.5rem"}}>
          Coming Soon
        </div>
        <h1 style={{color:"#fff",fontSize:"46px",fontWeight:700,lineHeight:1.15,maxWidth:"680px",margin:"0 auto 1rem"}}>
          Top 100 World
        </h1>
        <p style={{color:"rgba(255,255,255,0.6)",fontSize:"18px",maxWidth:"500px",margin:"0 auto 2.5rem",lineHeight:1.6}}>
          The global ranking is currently in progress. We are expanding beyond Asia to rank the best dive experiences worldwide.
        </p>
        <div style={{display:"inline-block",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:"12px",padding:"2rem 3rem",marginBottom:"2.5rem"}}>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:"13px",letterSpacing:"1px",textTransform:"uppercase",marginBottom:"8px"}}>Status</div>
          <div style={{color:"#fff",fontSize:"24px",fontWeight:700}}>TBA</div>
          <div style={{color:"rgba(255,255,255,0.4)",fontSize:"13px",marginTop:"8px"}}>To be announced</div>
        </div>
        <div>
          <Link href="/top100" style={{background:"#E8723A",color:"#fff",padding:"14px 28px",borderRadius:"9px",textDecoration:"none",fontWeight:700,fontSize:"15px"}}>
            View Top 100 Asia →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
