
// src/App.jsx — Al-Mawaid, connected to Supabase
// ✨ Multi-theme | Supabase Auth | Logout | Vercel-ready
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, BarChart2, FileText, Info, X, Sun, Moon, User,
  Star, Send, Bell, Camera, Palette, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ───────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ─── THEMES ────────────────────────────────────────────────────
const THEMES = {
  night: {
    id:'night', label:'Night', emoji:'🌙',
    bg:'#060d1a', bgGrad:'linear-gradient(180deg,#060d1a 0%,#0d1f3c 60%,#0a1828 100%)',
    card:'#0d1a30', cardActive:'linear-gradient(135deg,#0d2044,#0a1828)',
    border:'rgba(59,130,246,0.14)', borderActive:'rgba(201,168,76,0.45)',
    accent:'#c9a84c', accentGrad:'linear-gradient(135deg,#c9a84c,#a8883a)',
    accentBg:'rgba(201,168,76,0.10)', accentBorder:'rgba(201,168,76,0.35)',
    text:'#fff', textSub:'#93c5fd', textBody:'#bfdbfe',
    navBg:'linear-gradient(180deg,#0a1828,#060d1a)', navBorder:'rgba(201,168,76,0.22)',
    geo:'rgba(255,255,255,0.06)', popupBg:'rgba(6,13,26,0.92)',
    spinnerBorder:'rgba(201,168,76,0.2)', spinnerTop:'#c9a84c',
    inputBg:'rgba(255,255,255,0.05)', inputBorder:'rgba(201,168,76,0.25)',
  },
  sunrise: {
    id:'sunrise', label:'Sunrise', emoji:'🌅',
    bg:'#fff8f0', bgGrad:'linear-gradient(180deg,#fff4e8 0%,#ffe8cc 60%,#ffd9b0 100%)',
    card:'#fff3e4', cardActive:'linear-gradient(135deg,#fff0da,#ffe8c8)',
    border:'rgba(234,123,30,0.18)', borderActive:'rgba(220,80,10,0.5)',
    accent:'#d4520a', accentGrad:'linear-gradient(135deg,#e86a1a,#c94d08)',
    accentBg:'rgba(232,106,26,0.10)', accentBorder:'rgba(232,106,26,0.4)',
    text:'#2d1200', textSub:'#b84a0a', textBody:'#5a2c10',
    navBg:'linear-gradient(180deg,#ffe8cc,#fff4e8)', navBorder:'rgba(220,100,20,0.25)',
    geo:'rgba(220,100,20,0.06)', popupBg:'rgba(255,240,220,0.94)',
    spinnerBorder:'rgba(220,80,10,0.2)', spinnerTop:'#d4520a',
    inputBg:'rgba(0,0,0,0.04)', inputBorder:'rgba(220,80,10,0.25)',
  },
  forest: {
    id:'forest', label:'Forest', emoji:'🌿',
    bg:'#f0fff4', bgGrad:'linear-gradient(180deg,#edfff3 0%,#d4f9e2 60%,#bbf0d0 100%)',
    card:'#e8fff0', cardActive:'linear-gradient(135deg,#ddfcea,#c5f5d8)',
    border:'rgba(22,163,74,0.18)', borderActive:'rgba(16,130,58,0.5)',
    accent:'#0f7d3c', accentGrad:'linear-gradient(135deg,#16a34a,#0d6632)',
    accentBg:'rgba(22,163,74,0.10)', accentBorder:'rgba(22,163,74,0.4)',
    text:'#052210', textSub:'#166534', textBody:'#1a4a28',
    navBg:'linear-gradient(180deg,#c5f5d8,#edfff3)', navBorder:'rgba(22,163,74,0.25)',
    geo:'rgba(22,163,74,0.06)', popupBg:'rgba(220,255,234,0.94)',
    spinnerBorder:'rgba(22,163,74,0.2)', spinnerTop:'#16a34a',
    inputBg:'rgba(0,0,0,0.04)', inputBorder:'rgba(22,163,74,0.25)',
  },
  ocean: {
    id:'ocean', label:'Ocean', emoji:'🌊',
    bg:'#f0f8ff', bgGrad:'linear-gradient(180deg,#e8f6ff 0%,#cceeff 60%,#b0e4ff 100%)',
    card:'#e0f4ff', cardActive:'linear-gradient(135deg,#d0eeff,#b8e6ff)',
    border:'rgba(2,132,199,0.18)', borderActive:'rgba(2,100,170,0.5)',
    accent:'#0369a1', accentGrad:'linear-gradient(135deg,#0284c7,#015fa1)',
    accentBg:'rgba(2,132,199,0.10)', accentBorder:'rgba(2,132,199,0.4)',
    text:'#012240', textSub:'#0369a1', textBody:'#0c4a6e',
    navBg:'linear-gradient(180deg,#b8e6ff,#e8f6ff)', navBorder:'rgba(2,132,199,0.25)',
    geo:'rgba(2,132,199,0.06)', popupBg:'rgba(220,245,255,0.94)',
    spinnerBorder:'rgba(2,132,199,0.2)', spinnerTop:'#0284c7',
    inputBg:'rgba(0,0,0,0.04)', inputBorder:'rgba(2,132,199,0.25)',
  },
  lavender: {
    id:'lavender', label:'Lavender', emoji:'💜',
    bg:'#faf5ff', bgGrad:'linear-gradient(180deg,#f8f0ff 0%,#ede9fe 60%,#ddd6fe 100%)',
    card:'#f3eeff', cardActive:'linear-gradient(135deg,#ede4ff,#ddd0ff)',
    border:'rgba(124,58,237,0.18)', borderActive:'rgba(109,40,217,0.5)',
    accent:'#7c3aed', accentGrad:'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    accentBg:'rgba(124,58,237,0.10)', accentBorder:'rgba(124,58,237,0.4)',
    text:'#2e1065', textSub:'#6d28d9', textBody:'#4c1d95',
    navBg:'linear-gradient(180deg,#ddd6fe,#f8f0ff)', navBorder:'rgba(124,58,237,0.25)',
    geo:'rgba(124,58,237,0.06)', popupBg:'rgba(240,230,255,0.94)',
    spinnerBorder:'rgba(124,58,237,0.2)', spinnerTop:'#8b5cf6',
    inputBg:'rgba(0,0,0,0.04)', inputBorder:'rgba(124,58,237,0.25)',
  },
}

const ThemeCtx = createContext(null)
const useTheme  = () => useContext(ThemeCtx)
const AuthCtx   = createContext(null)
const useAuth   = () => useContext(AuthCtx)

/* ─── Shared UI helpers ─── */
const Crescent = ({ size = 18 }) => {
  const t = useTheme()
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
        stroke={t.accent} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 5l.5 1.5L18 7l-1.5.5L16 9l-.5-1.5L14 7l1.5-.5z" fill={t.accent}/>
    </svg>
  )
}

const Divider = () => {
  const t = useTheme()
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, margin:'12px 0' }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${t.accentBorder})` }}/>
      <Crescent size={11}/>
      <div style={{ flex:1, height:1, background:`linear-gradient(270deg,transparent,${t.accentBorder})` }}/>
    </div>
  )
}

const GeoBg = () => {
  const t = useTheme()
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
      <defs>
        <pattern id="geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke={t.geo} strokeWidth="0.7"/>
          <circle cx="20" cy="20" r="5" fill="none" stroke={t.geo} strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)"/>
    </svg>
  )
}

const Spinner = ({ fullPage = true }) => {
  const t = useTheme()
  const inner = (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      <div className="spin" style={{ width:36, height:36,
        border:`3px solid ${t.spinnerBorder}`, borderTop:`3px solid ${t.spinnerTop}`, borderRadius:'50%' }}/>
      {fullPage && <p style={{ margin:0, fontSize:13, color:t.textSub, opacity:0.5 }}>Loading…</p>}
    </div>
  )
  return fullPage
    ? <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 20px' }}>{inner}</div>
    : inner
}

const ErrorBanner = ({ msg }) => (
  <div style={{ margin:'12px 16px', padding:'12px 16px', borderRadius:12,
    background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.3)',
    color:'#ef4444', fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
    <AlertCircle size={15} style={{ flexShrink:0 }}/>
    {msg}
  </div>
)

/* ─── THEME SWITCHER ─── */
function ThemeSwitcher() {
  const { theme, setThemeId } = useContext(ThemeCtx)
  const [open, setOpen] = useState(false)
  const t = theme
  return (
    <div style={{ position:'fixed', top:16, right:16, zIndex:100 }}>
      <button onClick={() => setOpen(o => !o)} title="Switch Theme"
        style={{ width:40, height:40, borderRadius:'50%', border:`2px solid ${t.accentBorder}`,
          background:t.accentBg, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(10px)', boxShadow:`0 4px 20px ${t.accentBg}`, transition:'all 0.25s ease' }}>
        <Palette size={17} color={t.accent}/>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:-1 }}/>
          <div style={{ position:'absolute', top:48, right:0, background:t.bg,
            border:`1px solid ${t.accentBorder}`, borderRadius:18, padding:10,
            display:'flex', flexDirection:'column', gap:6, minWidth:130,
            boxShadow:'0 12px 40px rgba(0,0,0,0.18)', backdropFilter:'blur(16px)',
            animation:'fadeInDown 0.2s ease', zIndex:200 }}>
            <p style={{ margin:'0 4px 4px', fontSize:9, fontWeight:800,
              textTransform:'uppercase', letterSpacing:'0.18em', color:t.textSub, opacity:0.6 }}>THEMES</p>
            {Object.values(THEMES).map(th => (
              <button key={th.id} onClick={() => { setThemeId(th.id); setOpen(false) }}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px',
                  borderRadius:12, border:'none', cursor:'pointer',
                  background:theme.id === th.id ? t.accentBg : 'transparent',
                  width:'100%', textAlign:'left' }}>
                <span style={{ fontSize:16 }}>{th.emoji}</span>
                <span style={{ fontSize:13, fontWeight:700, color:t.text, flex:1 }}>{th.label}</span>
                {theme.id === th.id && <Check size={13} color={t.accent}/>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── LOGOUT BUTTON ─── */
function LogoutButton() {
  const t = useTheme()
  const { signOut } = useAuth()
  const [confirming, setConfirming] = useState(false)
  return (
    <div style={{ position:'fixed', top:16, left:16, zIndex:100 }}>
      {!confirming ? (
        <button onClick={() => setConfirming(true)} title="Sign out"
          style={{ width:40, height:40, borderRadius:'50%', border:'2px solid rgba(239,68,68,0.3)',
            background:'rgba(239,68,68,0.08)', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            backdropFilter:'blur(10px)', transition:'all 0.25s ease' }}>
          <LogOut size={17} color="#ef4444"/>
        </button>
      ) : (
        <div style={{ background:t.card, border:'1px solid rgba(239,68,68,0.4)',
          borderRadius:16, padding:'12px 14px', display:'flex', flexDirection:'column', gap:8,
          boxShadow:'0 8px 30px rgba(0,0,0,0.15)', backdropFilter:'blur(16px)', minWidth:150,
          animation:'fadeInDown 0.2s ease' }}>
          <p style={{ margin:0, fontSize:12, fontWeight:700, color:t.text }}>Sign out?</p>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={signOut}
              style={{ flex:1, padding:'7px', borderRadius:8, border:'none', cursor:'pointer',
                background:'rgba(239,68,68,0.85)', color:'#fff', fontSize:12, fontWeight:700 }}>
              Yes
            </button>
            <button onClick={() => setConfirming(false)}
              style={{ flex:1, padding:'7px', borderRadius:8, border:`1px solid ${t.border}`,
                background:'transparent', color:t.textSub, fontSize:12, fontWeight:700, cursor:'pointer' }}>
              No
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════ */
function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter both email and password.'); return }
    setLoading(true); setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setLoading(false)
    if (error) setError(error.message)
  }

  const inp = {
    width:'100%', boxSizing:'border-box',
    background:'rgba(255,255,255,0.06)', border:'1px solid rgba(201,168,76,0.25)',
    borderRadius:14, color:'#fff', fontSize:15, padding:'14px 16px',
    outline:'none', fontFamily:'inherit',
  }

  return (
    <div style={{ minHeight:'100vh', background:'linear-gradient(180deg,#060d1a 0%,#0d1f3c 60%,#0a1828 100%)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'24px', fontFamily:"'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif", position:'relative', overflow:'hidden' }}>

      {/* Geo bg */}
      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
        <defs>
          <pattern id="lgeo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.7"/>
            <circle cx="20" cy="20" r="5" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lgeo)"/>
      </svg>

      {/* Glow */}
      <div style={{ position:'absolute', top:-100, left:'50%', transform:'translateX(-50%)',
        width:400, height:400, borderRadius:'50%',
        background:'radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)', pointerEvents:'none' }}/>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:380 }}>
        {/* Brand */}
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
            width:64, height:64, borderRadius:'50%', marginBottom:20,
            background:'rgba(201,168,76,0.12)', border:'1.5px solid rgba(201,168,76,0.35)',
            boxShadow:'0 0 40px rgba(201,168,76,0.12)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 5l.5 1.5L18 7l-1.5.5L16 9l-.5-1.5L14 7l1.5-.5z" fill="#c9a84c"/>
            </svg>
          </div>
          <p style={{ margin:'0 0 4px', fontSize:11, color:'rgba(147,197,253,0.6)',
            letterSpacing:'0.3em', textTransform:'uppercase' }}>Welcome to</p>
          <h1 style={{ margin:'0 0 6px', fontSize:30, fontWeight:900, color:'#c9a84c',
            letterSpacing:'0.06em', textTransform:'uppercase',
            textShadow:'0 0 30px rgba(201,168,76,0.3)' }}>Al-Mawaid</h1>
          <p style={{ margin:0, fontFamily:'serif', fontSize:15, color:'rgba(201,168,76,0.6)' }}>
            المَوَائِد
          </p>
        </div>

        {/* Card */}
        <div style={{ background:'rgba(13,26,48,0.8)', backdropFilter:'blur(20px)',
          border:'1px solid rgba(201,168,76,0.2)', borderRadius:24, padding:'32px 28px',
          boxShadow:'0 24px 80px rgba(0,0,0,0.4)' }}>

          <h2 style={{ margin:'0 0 6px', fontSize:20, fontWeight:800, color:'#fff' }}>Sign In</h2>
          <p style={{ margin:'0 0 28px', fontSize:13, color:'rgba(147,197,253,0.55)' }}>
            Enter your credentials to continue
          </p>

          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:24 }}>
            <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(201,168,76,0.3))' }}/>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
                stroke="#c9a84c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div style={{ flex:1, height:1, background:'linear-gradient(270deg,transparent,rgba(201,168,76,0.3))' }}/>
          </div>

          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {/* Email */}
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(201,168,76,0.7)',
                letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8 }}>
                Email Address
              </label>
              <div style={{ position:'relative' }}>
                <Mail size={16} color="rgba(201,168,76,0.5)"
                  style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(null) }}
                  placeholder="you@example.com" autoComplete="email"
                  style={{ ...inp, paddingLeft:44 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}/>
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:'rgba(201,168,76,0.7)',
                letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:8 }}>
                Password
              </label>
              <div style={{ position:'relative' }}>
                <Lock size={16} color="rgba(201,168,76,0.5)"
                  style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}/>
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setError(null) }}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ ...inp, paddingLeft:44, paddingRight:44 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,168,76,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.25)'}/>
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', padding:0, color:'rgba(201,168,76,0.5)', display:'flex' }}>
                  {showPass ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>

            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 14px',
                borderRadius:12, background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)',
                color:'#fca5a5', fontSize:13 }}>
                <AlertCircle size={15} style={{ flexShrink:0 }}/>{error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ marginTop:4, padding:'15px', borderRadius:16, border:'none', cursor:'pointer',
                background: loading ? 'rgba(201,168,76,0.3)' : 'linear-gradient(135deg,#c9a84c,#a8883a)',
                color: loading ? 'rgba(255,255,255,0.5)' : '#fff',
                fontWeight:900, fontSize:14, textTransform:'uppercase', letterSpacing:'0.12em',
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                boxShadow: loading ? 'none' : '0 8px 30px rgba(201,168,76,0.3)', transition:'all 0.2s ease' }}>
              {loading
                ? <><div className="spin" style={{ width:18, height:18, border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid rgba(255,255,255,0.8)', borderRadius:'50%' }}/> Signing in…</>
                : 'Sign In'
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign:'center', marginTop:24, fontSize:11, color:'rgba(147,197,253,0.35)', letterSpacing:'0.05em' }}>
          Al-Mawaid Daily Tiffin Service
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 1 — HOME
═══════════════════════════════════════ */
function HomePage() {
  const t = useTheme()
  const [menuData, setMenuData] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [error,    setError]    = useState(null)
  const [activeDay,setActiveDay]= useState(null)
  const [showPopup,setShowPopup]= useState(false)

  useEffect(() => {
    let cancelled = false
    supabase.from('menu').select('*').order('id').then(({ data, error }) => {
      if (cancelled) return
      if (error) setError(error.message); else setMenuData(data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading) return <Spinner/>
  if (error)   return <ErrorBanner msg={error}/>

  return (
    <div style={{ flex:1, padding:'8px 14px 110px', display:'flex', flexDirection:'column', gap:10 }}>
      <div style={{ display:'flex', justifyContent:'center', marginBottom:4 }}>
        <button onClick={() => setShowPopup(true)}
          style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer',
            background:t.accentBg, border:`1px solid ${t.accentBorder}`,
            color:t.accent, borderRadius:999, padding:'7px 16px',
            fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em' }}>
          <Info size={12}/> Menu Information
        </button>
      </div>

      {menuData.map((item, index) => {
        const open = activeDay === index
        return (
          <div key={item.id} style={{ borderRadius:18, overflow:'hidden',
            background: open ? t.cardActive : t.card,
            border:`1px solid ${open ? t.borderActive : t.border}`,
            transition:'all 0.3s ease', boxShadow: open ? `0 4px 20px ${t.accentBg}` : 'none' }}>

            <button onClick={() => setActiveDay(open ? null : index)}
              style={{ width:'100%', background:'none', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'13px 15px', color:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ position:'relative', width:50, height:50, flexShrink:0 }}>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:9,
                    background:t.accentBg, borderRadius:'0 0 9px 9px', border:`1px solid ${t.accentBorder}` }}/>
                  <div style={{ position:'absolute', bottom:7, left:2, right:2, height:11,
                    background:t.accentBg, borderRadius:6, border:`1px solid ${t.accentBorder}` }}/>
                  <div style={{ position:'absolute', bottom:16, left:4, right:4, height:11,
                    background:t.accentBg, borderRadius:6, border:`1px solid ${t.accentBorder}`, opacity:0.6 }}/>
                  <div style={{ position:'absolute', top:1, left:'50%', transform:'translateX(-50%)',
                    width:16, height:4, background:t.accent, borderRadius:8 }}/>
                  <div style={{ position:'absolute', inset:0, display:'flex',
                    alignItems:'center', justifyContent:'center', fontSize:18, paddingBottom:4 }}>
                    {item.emoji}
                  </div>
                </div>
                <div style={{ textAlign:'left' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <span style={{ fontWeight:800, fontSize:17, color:t.text }}>{item.day_name}</span>
                    <span style={{ fontSize:12, color:t.accent, opacity:0.65, fontFamily:'serif' }}>{item.day_ar}</span>
                  </div>
                  {!open && (
                    <span style={{ fontSize:11, color:t.textSub, opacity:0.55, display:'block',
                      maxWidth:180, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {item.lunch}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ width:30, height:30, borderRadius:'50%', flexShrink:0,
                background: open ? t.accent : t.accentBg,
                display:'flex', alignItems:'center', justifyContent:'center',
                transform: open ? 'rotate(180deg)' : 'none', transition:'all 0.3s' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke={open ? t.bg : t.textSub}
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            {open && (
              <div style={{ padding:'0 14px 14px' }}>
                <Divider/>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                  <div style={{ borderRadius:14, padding:'12px', background:t.accentBg, border:`1px solid ${t.accentBorder}` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <Sun size={11} color={t.accent}/>
                      <span style={{ fontSize:10, fontWeight:800, color:t.accent, textTransform:'uppercase', letterSpacing:'0.15em' }}>Lunch</span>
                    </div>
                    <p style={{ margin:0, fontSize:13, color:t.textBody, lineHeight:1.4 }}>{item.lunch}</p>
                  </div>
                  <div style={{ borderRadius:14, padding:'12px', background:t.border, border:`1px solid ${t.border}` }}>
                    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:6 }}>
                      <Moon size={11} color={t.textSub}/>
                      <span style={{ fontSize:10, fontWeight:800, color:t.textSub, textTransform:'uppercase', letterSpacing:'0.15em' }}>Dinner</span>
                    </div>
                    <p style={{ margin:0, fontSize:13, color:t.textBody, lineHeight:1.4 }}>{item.dinner}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {showPopup && (
        <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center',
          justifyContent:'center', padding:24, background:t.popupBg, backdropFilter:'blur(12px)' }}>
          <div style={{ width:'100%', maxWidth:360, borderRadius:28, padding:'28px 24px',
            position:'relative', background:t.cardActive, border:`1px solid ${t.accentBorder}`,
            boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }}>
            <Divider/>
            <button onClick={() => setShowPopup(false)}
              style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:t.textSub }}>
              <X size={22}/>
            </button>
            <h2 style={{ margin:'0 0 4px', fontSize:22, fontWeight:900, color:t.text }}>Notice</h2>
            <p style={{ margin:0, fontSize:15, color:t.textBody, lineHeight:1.65 }}>
              Menu is subject to change based on availability. JazakAllah Khair for your patience.
            </p>
            <button onClick={() => setShowPopup(false)}
              style={{ marginTop:24, width:'100%', padding:'13px', borderRadius:16, border:'none', cursor:'pointer',
                background:t.accentGrad, color:'#fff', fontWeight:900, fontSize:13,
                textTransform:'uppercase', letterSpacing:'0.1em', boxShadow:`0 6px 20px ${t.accentBg}` }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 2 — SURVEY
═══════════════════════════════════════ */
function SurveyPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [ratings,   setRatings]   = useState({ taste:0, quantity:0, time:0, variety:0 })
  const [feedback,  setFeedback]  = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState(null)

  const questions = [
    { id:'taste',    label:'Food Taste' },
    { id:'quantity', label:'Portion Size' },
    { id:'time',     label:'Delivery on Time' },
    { id:'variety',  label:'Menu Variety' },
  ]

  async function handleSubmit() {
    setSaving(true); setError(null)
    const { error } = await supabase.from('survey_responses').insert({
      member_no:'501', user_id: user?.id || null,
      rating_taste:ratings.taste, rating_qty:ratings.quantity,
      rating_time:ratings.time, rating_variety:ratings.variety,
      comments: feedback || null,
    })
    setSaving(false)
    if (error) setError(error.message); else setSubmitted(true)
  }

  if (submitted) return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'40px 24px 110px', textAlign:'center' }}>
      <div style={{ width:72, height:72, borderRadius:'50%', background:t.accentBg, border:`2px solid ${t.accentBorder}`,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, marginBottom:20,
        boxShadow:`0 0 30px ${t.accentBg}` }}>🌙</div>
      <h2 style={{ margin:'0 0 8px', fontSize:22, fontWeight:900, color:t.text }}>JazakAllah Khair!</h2>
      <p style={{ margin:0, fontSize:15, color:t.textSub, opacity:0.7, lineHeight:1.6 }}>Your feedback has been saved.</p>
      <p style={{ margin:'8px 0 0', fontSize:13, color:t.accent, fontFamily:'serif', opacity:0.6 }}>شكراً على ملاحظاتك</p>
      <button onClick={() => { setSubmitted(false); setRatings({ taste:0, quantity:0, time:0, variety:0 }); setFeedback('') }}
        style={{ marginTop:28, padding:'12px 28px', borderRadius:14, border:`1px solid ${t.accentBorder}`,
          background:'transparent', color:t.accent, fontWeight:700, fontSize:13, cursor:'pointer', textTransform:'uppercase' }}>
        Submit Again
      </button>
    </div>
  )

  const allRated = Object.values(ratings).every(v => v > 0)

  return (
    <div style={{ flex:1, padding:'16px 16px 110px', display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ borderRadius:18, padding:'18px 18px 14px', background:t.cardActive, border:`1px solid ${t.accentBorder}` }}>
        <p style={{ margin:'0 0 4px', fontSize:10, color:t.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em' }}>Weekly</p>
        <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:900, color:t.text }}>Food Survey</h2>
        <p style={{ margin:0, fontSize:12, color:t.textSub, opacity:0.6, fontFamily:'serif' }}>Help us improve our food offerings!</p>
      </div>

      {questions.map(q => (
        <div key={q.id} style={{ borderRadius:16, padding:'14px 16px', background:t.card, border:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
            <p style={{ margin:0, fontSize:14, fontWeight:700, color:t.text }}>{q.label}</p>
            <span style={{ fontSize:12, color:t.textSub, opacity:0.5 }}>
              {ratings[q.id] > 0 ? `${ratings[q.id]}/5` : 'Tap to rate'}
            </span>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setRatings(r => ({ ...r, [q.id]:star }))}
                style={{ background:'none', border:'none', cursor:'pointer', padding:2 }}>
                <Star size={26} fill={star <= ratings[q.id] ? t.accent : 'transparent'}
                  color={star <= ratings[q.id] ? t.accent : t.border} strokeWidth={1.5}/>
              </button>
            ))}
          </div>
        </div>
      ))}

      <div style={{ borderRadius:16, padding:'14px 16px', background:t.card, border:`1px solid ${t.border}` }}>
        <p style={{ margin:'0 0 10px', fontSize:14, fontWeight:700, color:t.text }}>Additional Comments</p>
        <textarea value={feedback} onChange={e => setFeedback(e.target.value)}
          placeholder="Share your thoughts… (optional)" rows={3}
          style={{ width:'100%', boxSizing:'border-box', background:'rgba(0,0,0,0.04)',
            border:`1px solid ${t.accentBorder}`, borderRadius:10, color:t.textBody,
            fontSize:13, padding:'10px 12px', resize:'none', outline:'none', fontFamily:'inherit' }}/>
      </div>

      {error && <ErrorBanner msg={error}/>}

      <button onClick={handleSubmit} disabled={!allRated || saving}
        style={{ padding:'15px', borderRadius:16, border:'none', cursor: allRated ? 'pointer' : 'not-allowed',
          background: allRated ? t.accentGrad : t.accentBg, color: allRated ? '#fff' : t.accent,
          fontWeight:900, fontSize:13, textTransform:'uppercase', letterSpacing:'0.12em',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          boxShadow: allRated ? `0 6px 20px ${t.accentBg}` : 'none', transition:'all 0.2s ease' }}>
        {saving
          ? <><div className="spin" style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid #fff', borderRadius:'50%' }}/> Saving…</>
          : <><Send size={15}/> Submit Survey</>
        }
      </button>
      {!allRated && (
        <p style={{ margin:'-8px 0 0', fontSize:11, textAlign:'center', color:t.textSub, opacity:0.5 }}>
          Please rate all categories to submit
        </p>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 3 — PROFILE
═══════════════════════════════════════ */
function ProfilePage() {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [member,      setMember]      = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [profilePic,  setProfilePic]  = useState(null)
  const [uploading,   setUploading]   = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const fileRef = useRef()

  useEffect(() => {
    let cancelled = false
    Promise.all([
      supabase.from('members').select('*').eq('member_no','501').single(),
      supabase.from('member_profile_pics').select('pic_url').eq('member_no','501').maybeSingle(),
    ]).then(([{ data:m, error:e }, { data:p }]) => {
      if (cancelled) return
      if (e) setError(e.message); else setMember(m)
      if (p?.pic_url) setProfilePic(p.pic_url)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  async function handlePicUpload(e) {
    const file = e.target.files[0]; if (!file) return
    setUploading(true); setUploadError(null)
    const ext = file.name.split('.').pop()
    const path = `profile-pics/501_${Date.now()}.${ext}`
    const { error:upErr } = await supabase.storage.from('profile-pics').upload(path, file, { upsert:true })
    if (upErr) { setUploadError(upErr.message); setUploading(false); return }
    const { data:{ publicUrl } } = supabase.storage.from('profile-pics').getPublicUrl(path)
    const { error:dbErr } = await supabase.from('member_profile_pics')
      .upsert({ member_no:'501', pic_url:publicUrl }, { onConflict:'member_no' })
    if (dbErr) setUploadError(dbErr.message); else setProfilePic(publicUrl)
    setUploading(false)
  }

  if (loading) return <Spinner/>
  if (error)   return <ErrorBanner msg={error}/>
  if (!member) return <ErrorBanner msg="Member not found"/>

  const stats = [
    { label:'Member Since', value: new Date(member.joined_date).getFullYear().toString() },
    { label:'Total Meals',  value: member.total_meals.toString() },
    { label:'This Month',   value:'24' },
    { label:'Status',       value: member.is_active ? 'Active' : 'Inactive' },
  ]

  const mealHistory = [
    { day:'Saturday',  meal:'Keema Curry & Paratha', type:'dinner' },
    { day:'Friday',    meal:'Fish Curry & Red Rice',  type:'lunch'  },
    { day:'Thursday',  meal:'Chicken Tikka & Salad',  type:'dinner' },
    { day:'Wednesday', meal:'Veg Khichdi & Papad',    type:'lunch'  },
  ]

  return (
    <div style={{ flex:1, padding:'16px 16px 110px', display:'flex', flexDirection:'column', gap:14 }}>
      <div style={{ borderRadius:20, padding:'22px 20px', background:t.cardActive,
        border:`1px solid ${t.accentBorder}`, display:'flex', alignItems:'center', gap:16,
        boxShadow:`0 4px 24px ${t.accentBg}` }}>
        <div style={{ position:'relative', flexShrink:0 }}>
          <div style={{ width:68, height:68, borderRadius:'50%', background:t.accentBg,
            border:`2px solid ${t.accentBorder}`, display:'flex', alignItems:'center',
            justifyContent:'center', overflow:'hidden', fontSize:26, fontWeight:900, color:t.accent, fontFamily:'serif' }}>
            {profilePic
              ? <img src={profilePic} alt="profile" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              : (member.name_ar || member.name_en?.[0] || '?')
            }
          </div>
          <button onClick={() => fileRef.current.click()} disabled={uploading}
            style={{ position:'absolute', bottom:-2, right:-2, width:24, height:24,
              background:t.accentGrad, border:`2px solid ${t.bg}`, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.18)' }}>
            {uploading
              ? <div className="spin" style={{ width:10, height:10, border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid #fff', borderRadius:'50%' }}/>
              : <Camera size={12} color="#fff"/>
            }
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handlePicUpload}/>
        </div>
        <div style={{ flex:1 }}>
          <p style={{ margin:'0 0 2px', fontSize:10, color:t.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em' }}>Active Member</p>
          <p style={{ margin:'0 0 2px', fontSize:15, fontWeight:800, color:t.text, lineHeight:1.2 }}>{member.name_en}</p>
          {user?.email && <p style={{ margin:0, fontSize:11, color:t.textSub, opacity:0.5 }}>{user.email}</p>}
          {uploadError && <p style={{ margin:'4px 0 0', fontSize:10, color:'#ef4444' }}>{uploadError}</p>}
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <p style={{ margin:0, fontSize:11, color:t.textSub, opacity:0.5 }}>Member ID</p>
          <p style={{ margin:0, fontSize:28, fontWeight:900, color:t.accent, lineHeight:1 }}>{member.member_no}</p>
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {stats.map(s => (
          <div key={s.label} style={{ borderRadius:16, padding:'14px', background:t.card, border:`1px solid ${t.border}` }}>
            <p style={{ margin:'0 0 4px', fontSize:10, color:t.textSub, opacity:0.55, textTransform:'uppercase', letterSpacing:'0.1em' }}>{s.label}</p>
            <p style={{ margin:0, fontSize:18, fontWeight:900, color:t.accent }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ borderRadius:18, overflow:'hidden', background:t.card, border:`1px solid ${t.border}` }}>
        <div style={{ padding:'14px 16px 10px', borderBottom:`1px solid ${t.border}` }}>
          <p style={{ margin:0, fontSize:14, fontWeight:800, color:t.text }}>Recent Meals</p>
        </div>
        {mealHistory.map((m, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'11px 16px', borderBottom: i < mealHistory.length-1 ? `1px solid ${t.border}` : 'none' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', flexShrink:0, background: m.type==='lunch' ? t.accent : t.textSub }}/>
              <div>
                <p style={{ margin:0, fontSize:13, color:t.textBody, fontWeight:600 }}>{m.meal}</p>
                <p style={{ margin:0, fontSize:11, color:t.textSub, opacity:0.5 }}>{m.day}</p>
              </div>
            </div>
            <span style={{ fontSize:10, fontWeight:700, textTransform:'uppercase', padding:'3px 8px', borderRadius:20,
              background: m.type==='lunch' ? t.accentBg : t.border, color: m.type==='lunch' ? t.accent : t.textSub }}>
              {m.type}
            </span>
          </div>
        ))}
      </div>

      <div style={{ borderRadius:18, padding:'18px', background:t.card, border:`1px solid ${t.border}` }}>
        <p style={{ margin:'0 0 4px', fontSize:14, fontWeight:800, color:t.text }}>Account</p>
        <p style={{ margin:'0 0 16px', fontSize:12, color:t.textSub, opacity:0.5 }}>{user?.email}</p>
        <button onClick={signOut}
          style={{ width:'100%', padding:'13px', borderRadius:14, border:'1px solid rgba(239,68,68,0.3)',
            background:'rgba(239,68,68,0.08)', color:'#ef4444', fontWeight:700, fontSize:13,
            cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <LogOut size={15}/> Sign Out
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 4 — POSTS
═══════════════════════════════════════ */
function PostPage() {
  const t = useTheme()
  const [posts,   setPosts]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('posts').select('*').order('created_at', { ascending:false }).then(({ data, error }) => {
      if (cancelled) return
      if (error) setError(error.message); else setPosts(data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading) return <Spinner/>
  if (error)   return <ErrorBanner msg={error}/>

  const typeColor = { announcement:t.accent, notice:t.textSub, reminder:'#a78bfa', info:'#34d399' }

  return (
    <div style={{ flex:1, padding:'16px 16px 110px', display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{ borderRadius:18, padding:'16px 18px', background:t.cardActive, border:`1px solid ${t.accentBorder}`,
        display:'flex', alignItems:'center', gap:12 }}>
        <Bell size={20} color={t.accent}/>
        <p style={{ margin:0, fontSize:16, fontWeight:900, color:t.text }}>Announcements</p>
        <div style={{ marginLeft:'auto', background:t.accentBg, color:t.accent, fontSize:12, fontWeight:800, padding:'4px 10px', borderRadius:20 }}>
          {posts.length} Posts
        </div>
      </div>

      {posts.length === 0 && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px', gap:12 }}>
          <Bell size={32} color={t.accentBorder}/>
          <p style={{ margin:0, fontSize:14, color:t.textSub, opacity:0.5 }}>No announcements yet.</p>
        </div>
      )}

      {posts.map(post => (
        <div key={post.id} style={{ borderRadius:18, padding:'16px', background:t.card,
          border:`1px solid ${post.is_urgent ? t.borderActive : t.border}` }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
            <div style={{ fontSize:24, lineHeight:1, flexShrink:0, marginTop:2 }}>{post.emoji}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4, flexWrap:'wrap' }}>
                <span style={{ fontSize:14, fontWeight:800, color:t.text }}>{post.title_en}</span>
                {post.is_urgent && (
                  <span style={{ fontSize:10, fontWeight:800, padding:'2px 8px', borderRadius:20,
                    background:t.accentBg, color:t.accent, textTransform:'uppercase', letterSpacing:'0.1em' }}>New</span>
                )}
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                <span style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.1em',
                  color: typeColor[post.type] || t.textSub }}>{post.type}</span>
                <span style={{ fontSize:11, color:t.textSub, opacity:0.4 }}>•</span>
                <span style={{ fontSize:11, color:t.textSub, opacity:0.4 }}>
                  {new Date(post.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
                </span>
              </div>
              <p style={{ margin:'0 0 6px', fontSize:13, color:t.textBody, lineHeight:1.55 }}>{post.body}</p>
              <p style={{ margin:0, fontSize:11, color:t.accent, opacity:0.5, fontFamily:'serif' }}>{post.title_ar}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
export default function App() {
  const [session,   setSession]   = useState(undefined)
  const [activeTab, setActiveTab] = useState('home')
  const [themeId,   setThemeId]   = useState(() => {
    try { return localStorage.getItem('al-mawaid-theme') || 'night' } catch { return 'night' }
  })

  const theme = THEMES[themeId] || THEMES.night

  useEffect(() => {
    try { localStorage.setItem('al-mawaid-theme', themeId) } catch {}
  }, [themeId])

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setSession(session))
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => { await supabase.auth.signOut() }, [])

  const tabs = [
    { id:'home',    label:'Home',    Icon: Home     },
    { id:'survey',  label:'Survey',  Icon: BarChart2 },
    { id:'profile', label:'Profile', Icon: User      },
    { id:'post',    label:'Posts',   Icon: FileText  },
  ]

  const pageTitles = {
    home:    { en:'Al-Mawaid',     sub:'Daily Tiffin Menu'  },
    survey:  { en:'Survey',        sub:'Share your feedback' },
    profile: { en:'My Profile',    sub:'Member details'      },
    post:    { en:'Announcements', sub:'Latest updates'      },
  }
  const title = pageTitles[activeTab]

  // Loading
  if (session === undefined) {
    return (
      <div style={{ minHeight:'100vh', background:theme.bgGrad,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:"'Segoe UI',sans-serif" }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <div className="spin" style={{ width:40, height:40,
            border:`3px solid ${theme.spinnerBorder}`, borderTop:`3px solid ${theme.spinnerTop}`, borderRadius:'50%' }}/>
          <p style={{ margin:0, fontSize:13, color:theme.textSub, opacity:0.5 }}>Loading…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
      </div>
    )
  }

  if (!session) return <LoginPage/>

  return (
    <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
      <AuthCtx.Provider value={{ user:session.user, signOut }}>
        <div style={{ fontFamily:"'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
          minHeight:'100vh', background:theme.bg, color:theme.text,
          display:'flex', flexDirection:'column', transition:'background 0.35s ease, color 0.35s ease' }}>

          <ThemeSwitcher/>
          <LogoutButton/>

          {/* HEADER */}
          <header style={{ position:'relative', overflow:'hidden',
            background:theme.bgGrad, padding:'20px 20px 0', transition:'background 0.35s ease' }}>
            <GeoBg/>

            <div style={{ position:'relative', zIndex:1, display:'flex',
              justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10,
                letterSpacing:'0.2em', textTransform:'uppercase', color:theme.textSub, opacity:0.6 }}>
                <Crescent size={14}/> Al-Mawaid
              </div>
              <span style={{ fontSize:10, color:theme.textSub, opacity:0.4 }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>

            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:8 }}>
                <p style={{ fontFamily:'serif', fontSize:18, letterSpacing:'0.1em', color:theme.accent, margin:0 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}

            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:12 }}>
              <p style={{ fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase',
                color:theme.textSub, opacity:0.45, margin:'0 0 3px' }}>
                {activeTab === 'home' ? 'Welcome to' : ''}
              </p>
              <h1 style={{ margin:0, fontSize: activeTab==='home' ? 34 : 26,
                fontWeight:900, textTransform:'uppercase', letterSpacing:'0.05em', lineHeight:1.1 }}>
                {activeTab === 'home'
                  ? title.en.split('').map((ch, i) => (
                      <span key={i} className="wl" style={{ display:'inline-block', animationDelay:`${i*0.09}s`,
                        color:theme.accent, textShadow:`0 0 18px ${theme.accentBg}` }}>{ch}</span>
                    ))
                  : <span style={{ color:theme.accent }}>{title.en}</span>
                }
              </h1>
              <p style={{ margin:'3px 0 0', fontSize:11, letterSpacing:'0.2em',
                textTransform:'uppercase', color:theme.textSub, opacity:0.45 }}>{title.sub}</p>
            </div>

            <div style={{ position:'relative', zIndex:1, display:'flex',
              alignItems:'center', gap:10, marginBottom:14, padding:'0 8px' }}>
              <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${theme.accentBorder})` }}/>
              <Crescent size={13}/>
              <div style={{ flex:1, height:1, background:`linear-gradient(270deg,transparent,${theme.accentBorder})` }}/>
            </div>

            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 48" preserveAspectRatio="none">
              <path d="M0,16 C200,48 400,0 600,24 C800,48 1000,6 1200,28 C1320,42 1400,16 1440,22 L1440,48 L0,48 Z"
                fill={theme.bg}/>
            </svg>
          </header>

          {activeTab === 'home'    && <HomePage/>}
          {activeTab === 'survey'  && <SurveyPage/>}
          {activeTab === 'profile' && <ProfilePage/>}
          {activeTab === 'post'    && <PostPage/>}

          <nav style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:30,
            display:'flex', justifyContent:'space-around', alignItems:'center',
            padding:'10px 8px 14px', background:theme.navBg,
            borderTop:`1px solid ${theme.navBorder}`, boxShadow:'0 -6px 30px rgba(0,0,0,0.1)',
            transition:'background 0.35s ease' }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ background:'none', border:'none', cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                    padding:'2px 14px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
                  {active && (
                    <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
                      width:32, height:3, borderRadius:6, background:theme.accent,
                      boxShadow:`0 0 10px ${theme.accentBg}` }}/>
                  )}
                  <Icon size={22} color={active ? theme.accent : theme.border} strokeWidth={active ? 2.2 : 1.5}/>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.05em',
                    color: active ? theme.accent : theme.textSub, opacity: active ? 1 : 0.5 }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </nav>

          <style>{`
            @keyframes waveFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
            .wl { animation: waveFloat 1.9s ease-in-out infinite; }
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.8s linear infinite; }
            @keyframes fadeInDown {
              from { opacity:0; transform:translateY(-8px) }
              to   { opacity:1; transform:translateY(0) }
            }
            * { -webkit-tap-highlight-color: transparent; }
            body { margin: 0; }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
