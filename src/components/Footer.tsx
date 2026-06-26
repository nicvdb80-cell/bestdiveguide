import Link from 'next/link'
export default function Footer() {
  return (
    <footer style={{background:'#0A2342',padding:'2.5rem 2rem',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'1rem'}}>
      <div>
        <div style={{color:'#fff',fontWeight:700,fontSize:'16px'}}>Best<span style={{color:'#E8723A'}}>Dive</span>Guide</div>
        <div style={{color:'rgba(255,255,255,0.4)',fontSize:'12px',fontStyle:'italic',marginTop:'4px'}}>Dive. Eat. Sleep. Repeat.</div>
      </div>
      <div style={{display:'flex',gap:'1.5rem',flexWrap:'wrap'}}>
        {[{h:'/top100',l:'Top 100 Asia'},{h:'/top100-world',l:'Top 100 World'},{h:'/stays',l:'Stays'},{h:'/food',l:'Food'},{h:'/sites',l:'Sites'},{h:'/sustainable',l:'Sustainable'},{h:'/vote',l:'Vote'}].map(i=>(
          <Link key={i.h} href={i.h} style={{color:'rgba(255,255,255,0.45)',fontSize:'12px',textDecoration:'none'}}>{i.l}</Link>
        ))}
        <a href="mailto:nic.vdb80@gmail.com" style={{color:'rgba(255,255,255,0.45)',fontSize:'12px',textDecoration:'none'}}>Contact</a>
      </div>
    </footer>
  )
}
