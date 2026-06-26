import Link from 'next/link'

const navLinks = [
  { href: '/top100', label: 'Top 100 Asia' },
  { href: '/top100-world', label: 'Top 100 World' },
  { href: '/stays', label: 'Best Stays' },
  { href: '/food', label: 'Best Food' },
  { href: '/sites', label: 'Dive Sites' },
  { href: '/sustainable', label: 'Sustainable' },
]

export default function Nav({ active }: { active?: string }) {
  return (
    <nav style={{background:'#0A2342',height:'60px',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 2rem',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.18)'}}>
      <Link href="/" style={{color:'#fff',fontWeight:700,fontSize:'18px',textDecoration:'none',flexShrink:0}}>
        Best<span style={{color:'#E8723A'}}>Dive</span>Guide
      </Link>
      <div style={{display:'flex',gap:'1.5rem',alignItems:'center'}}>
        {navLinks.map(l => (
          <Link key={l.href} href={l.href} style={{
            color: active===l.href ? '#fff' : 'rgba(255,255,255,0.65)',
            textDecoration:'none',fontSize:'13.5px',fontWeight: active===l.href ? 700 : 400,
            borderBottom: active===l.href ? '2px solid #E8723A' : '2px solid transparent',
            paddingBottom:'2px',transition:'color .15s'
          }}>{l.label}</Link>
        ))}
        <Link href="/vote" style={{background:'#E8723A',color:'#fff',padding:'8px 18px',borderRadius:'7px',textDecoration:'none',fontSize:'13px',fontWeight:600}}>Vote</Link>
      </div>
    </nav>
  )
}
