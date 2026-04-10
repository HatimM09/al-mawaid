// src/App.jsx — Al-Mawaid, connected to Supabase
// ✨ Multi-theme | Supabase Auth | Survey on Home | Vercel-ready
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, Info, X, Sun, Moon, User,
  Star, Send, Bell, Camera, Palette, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars.')
}
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── THEMES ──────────────────────────────────────────────────
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
    loginCard:'rgba(13,26,48,0.85)', loginText:'#fff',
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
    loginCard:'rgba(255,240,220,0.92)', loginText:'#2d1200',
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
    loginCard:'rgba(220,255,234,0.92)', loginText:'#052210',
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
    loginCard:'rgba(220,245,255,0.92)', loginText:'#012240',
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
    loginCard:'rgba(240,230,255,0.92)', loginText:'#2e1065',
  },
}

// ─── Theme persistence helpers ────────────────────────────────
function getSavedThemeId() { try { return localStorage.getItem('al-mawaid-theme') || 'night' } catch { return 'night' } }
function saveThemeId(id)   { try { localStorage.setItem('al-mawaid-theme', id) } catch {} }

const ThemeCtx = createContext(null)
const useTheme = () => useContext(ThemeCtx)
const AuthCtx  = createContext(null)
const useAuth  = () => useContext(AuthCtx)

/* ─── Shared helpers ─────────────────────────────────────────── */
const GeoBg = ({ t: tProp }) => {
  const ctx = useTheme()
  const t = tProp || ctx
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

const Divider = () => {
  const t = useTheme()
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, margin:'10px 0' }}>
      <div style={{ flex:1, height:1, background:`linear-gradient(90deg,transparent,${t.accentBorder})` }}/>
      <span style={{ fontSize:13 }}>🍽️</span>
      <div style={{ flex:1, height:1, background:`linear-gradient(270deg,transparent,${t.accentBorder})` }}/>
    </div>
  )
}

const Spinner = ({ fullPage = true }) => {
  const t = useTheme()
  const inner = (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      <div className="spin" style={{ width:36, height:36, border:`3px solid ${t.spinnerBorder}`, borderTop:`3px solid ${t.spinnerTop}`, borderRadius:'50%' }}/>
      {fullPage && <p style={{ margin:0, fontSize:13, color:t.textSub, opacity:0.5 }}>Loading…</p>}
    </div>
  )
  return fullPage
    ? <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 20px' }}>{inner}</div>
    : inner
}

const ErrorBanner = ({ msg }) => (
  <div style={{ margin:'8px 0', padding:'12px 14px', borderRadius:12,
    background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.3)',
    color:'#ef4444', fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
    <AlertCircle size={14} style={{ flexShrink:0 }}/>{msg}
  </div>
)

/* ─── Star Rating ──────────────────────────────────────────── */
function StarRating({ value, onChange, size = 34 }) {
  const t = useTheme()
  const [hov, setHov] = useState(null)
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(s => {
        const on = s <= (hov ?? value ?? 0)
        return (
          <button key={s} onClick={() => onChange(s)}
            onMouseEnter={() => setHov(s)} onMouseLeave={() => setHov(null)}
            style={{ background:'none', border:'none', cursor:'pointer', padding:3,
              transform: on ? 'scale(1.18)' : 'scale(1)', transition:'all 0.15s' }}>
            <Star size={size} fill={on ? t.accent : 'none'} color={on ? t.accent : t.border} strokeWidth={1.5}/>
          </button>
        )
      })}
    </div>
  )
}

/* ─── Theme Switcher (floating pill, bottom-right always) ─── */
function ThemeSwitcher({ themeId, setThemeId, theme: t }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position:'fixed', bottom:82, right:14, zIndex:200 }}>
      <button onClick={() => setOpen(o => !o)} title="Switch Theme"
        style={{ width:42, height:42, borderRadius:'50%', border:`2px solid ${t.accentBorder}`,
          background:t.accentBg, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
          backdropFilter:'blur(10px)', boxShadow:`0 4px 18px ${t.accentBg}` }}>
        <Palette size={18} color={t.accent}/>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position:'fixed', inset:0, zIndex:-1 }}/>
          <div style={{ position:'absolute', bottom:52, right:0, background:t.bg,
            border:`1px solid ${t.accentBorder}`, borderRadius:18, padding:10,
            display:'flex', flexDirection:'column', gap:5, minWidth:145,
            boxShadow:'0 12px 40px rgba(0,0,0,0.22)', backdropFilter:'blur(16px)',
            animation:'fadeInDown 0.2s ease', zIndex:300 }}>
            <p style={{ margin:'0 4px 4px', fontSize:9, fontWeight:800,
              textTransform:'uppercase', letterSpacing:'0.18em', color:t.textSub, opacity:0.6 }}>THEMES</p>
            {Object.values(THEMES).map(th => (
              <button key={th.id} onClick={() => { setThemeId(th.id); saveThemeId(th.id); setOpen(false) }}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px',
                  borderRadius:12, border:'none', cursor:'pointer',
                  background: themeId === th.id ? t.accentBg : 'transparent', width:'100%', textAlign:'left' }}>
                <span style={{ fontSize:16 }}>{th.emoji}</span>
                <span style={{ fontSize:13, fontWeight:700, color:t.text, flex:1 }}>{th.label}</span>
                {themeId === th.id && <Check size={13} color={t.accent}/>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Logout Button (top-left, always accessible) ─────────── */
function LogoutButton() {
  const t = useTheme()
  const { signOut } = useAuth()
  const [conf, setConf] = useState(false)
  return (
    <div style={{ position:'fixed', top:14, left:14, zIndex:150 }}>
      {!conf
        ? <button onClick={() => setConf(true)} title="Sign out"
            style={{ width:38, height:38, borderRadius:'50%', border:'2px solid rgba(239,68,68,0.3)',
              background:'rgba(239,68,68,0.08)', cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center',
              backdropFilter:'blur(10px)', transition:'all 0.25s' }}>
            <LogOut size={16} color="#ef4444"/>
          </button>
        : <div style={{ background:t.card, border:'1px solid rgba(239,68,68,0.4)',
            borderRadius:16, padding:'12px 14px', display:'flex', flexDirection:'column', gap:8,
            boxShadow:'0 8px 30px rgba(0,0,0,0.2)', backdropFilter:'blur(16px)', minWidth:150,
            animation:'fadeInDown 0.2s ease' }}>
            <p style={{ margin:0, fontSize:12, fontWeight:700, color:t.text }}>Sign out?</p>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={signOut}
                style={{ flex:1, padding:'7px', borderRadius:8, border:'none', cursor:'pointer',
                  background:'rgba(239,68,68,0.85)', color:'#fff', fontSize:12, fontWeight:700 }}>Yes</button>
              <button onClick={() => setConf(false)}
                style={{ flex:1, padding:'7px', borderRadius:8, border:`1px solid ${t.border}`,
                  background:'transparent', color:t.textSub, fontSize:12, fontWeight:700, cursor:'pointer' }}>No</button>
            </div>
          </div>
      }
    </div>
  )
}

/* ═══════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════ */
function LoginPage({ themeId, setThemeId }) {
  const t = THEMES[themeId] || THEMES.night
  const [email,    setEmail]    = useState(() => { try { return localStorage.getItem('al-mawaid-email') || '' } catch { return '' } })
  const [password, setPassword] = useState(() => { try { return localStorage.getItem('al-mawaid-pass') || '' } catch { return '' } })
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(() => { try { return !!localStorage.getItem('al-mawaid-email') } catch { return false } })
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter both email and password.'); return }
    setLoading(true); setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setLoading(false)
    if (err) { setError(err.message); return }
    if (remember) {
      try { localStorage.setItem('al-mawaid-email', email.trim()); localStorage.setItem('al-mawaid-pass', password) } catch {}
    } else {
      try { localStorage.removeItem('al-mawaid-email'); localStorage.removeItem('al-mawaid-pass') } catch {}
    }
  }

  const inp = {
    width:'100%', boxSizing:'border-box',
    background: t.inputBg, border:`1px solid ${t.inputBorder}`,
    borderRadius:14, color: t.loginText, fontSize:15, padding:'14px 16px',
    outline:'none', fontFamily:'inherit', transition:'border-color 0.2s',
  }

  return (
    <div style={{ minHeight:'100vh', background:t.bgGrad,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'24px', fontFamily:"'Segoe UI',-apple-system,sans-serif", position:'relative', overflow:'hidden' }}>

      <GeoBg t={t}/>

      {/* Glow blob */}
      <div style={{ position:'absolute', top:-80, left:'50%', transform:'translateX(-50%)',
        width:380, height:380, borderRadius:'50%',
        background:`radial-gradient(circle,${t.accentBg} 0%,transparent 70%)`, pointerEvents:'none' }}/>

      {/* Theme switcher on login page — bottom right */}
      <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={t}/>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:380 }}>

        {/* Brand */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
            width:68, height:68, borderRadius:'50%', marginBottom:16,
            background:t.accentBg, border:`2px solid ${t.accentBorder}`,
            boxShadow:`0 0 40px ${t.accentBg}`, fontSize:32 }}>🍽️</div>
          <p style={{ margin:'0 0 3px', fontSize:11, color:t.textSub,
            letterSpacing:'0.3em', textTransform:'uppercase', opacity:0.7 }}>Welcome to</p>
          <h1 style={{ margin:'0 0 4px', fontSize:30, fontWeight:900, color:t.accent,
            letterSpacing:'0.06em', textTransform:'uppercase',
            textShadow:`0 0 28px ${t.accentBg}` }}>Al-Mawaid</h1>
          <p style={{ margin:0, fontFamily:'serif', fontSize:14, color:t.accent, opacity:0.65 }}>
            المَوَائِد · Daily Tiffin
          </p>
        </div>

        {/* Card */}
        <div style={{ background:t.loginCard, backdropFilter:'blur(20px)',
          border:`1px solid ${t.accentBorder}`, borderRadius:24, padding:'28px 24px',
          boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }}>

          <h2 style={{ margin:'0 0 20px', fontSize:20, fontWeight:800, color:t.text, textAlign:'center' }}>Sign In</h2>

          <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {/* Email */}
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.accent,
                letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:7, opacity:0.85 }}>
                Email Address
              </label>
              <div style={{ position:'relative' }}>
                <Mail size={15} color={t.accent} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', opacity:0.65 }}/>
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(null) }}
                  placeholder="you@example.com" autoComplete="email"
                  style={{ ...inp, paddingLeft:42 }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder}/>
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.accent,
                letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:7, opacity:0.85 }}>
                Password
              </label>
              <div style={{ position:'relative' }}>
                <Lock size={15} color={t.accent} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', pointerEvents:'none', opacity:0.65 }}/>
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setError(null) }}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ ...inp, paddingLeft:42, paddingRight:44 }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder}/>
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position:'absolute', right:13, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', padding:0, color:t.accent, opacity:0.65, display:'flex' }}>
                  {showPass ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <button type="button" onClick={() => setRemember(r => !r)}
                style={{ width:20, height:20, borderRadius:6, border:`2px solid ${t.accentBorder}`,
                  background: remember ? t.accent : 'transparent', cursor:'pointer', flexShrink:0,
                  display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s' }}>
                {remember && <Check size={12} color={t.id === 'night' ? '#060d1a' : '#fff'} strokeWidth={3}/>}
              </button>
              <span onClick={() => setRemember(r => !r)}
                style={{ fontSize:13, color:t.textSub, cursor:'pointer', userSelect:'none' }}>
                Remember me
              </span>
            </div>

            {error && (
              <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 13px',
                borderRadius:12, background:'rgba(239,68,68,0.12)', border:'1px solid rgba(239,68,68,0.3)',
                color:'#fca5a5', fontSize:13 }}>
                <AlertCircle size={14} style={{ flexShrink:0 }}/>{error}
              </div>
            )}

            <button type="submit" disabled={loading}
              style={{ marginTop:4, padding:'14px', borderRadius:16, border:'none', cursor: loading ? 'wait' : 'pointer',
                background: loading ? t.accentBg : t.accentGrad,
                color: loading ? t.accent : '#fff',
                fontWeight:900, fontSize:14, textTransform:'uppercase', letterSpacing:'0.12em',
                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                boxShadow: loading ? 'none' : `0 8px 28px ${t.accentBg}`, transition:'all 0.2s' }}>
              {loading
                ? <><div className="spin" style={{ width:17, height:17, border:'2px solid rgba(255,255,255,0.3)', borderTop:`2px solid ${t.accent}`, borderRadius:'50%' }}/> Signing in…</>
                : 'Sign In'
              }
            </button>
          </form>
        </div>

        <p style={{ textAlign:'center', marginTop:20, fontSize:11, color:t.textSub, letterSpacing:'0.05em', opacity:0.4 }}>
          Al-Mawaid Daily Tiffin Service
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-8px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 1 — HOME / SURVEY
   Daily menu + inline rate buttons + survey modal
═══════════════════════════════════════ */
function HomePage() {
  const t = useTheme()
  const { user } = useAuth()
  const [menuData,   setMenuData]   = useState([])
  const [memberNo,   setMemberNo]   = useState(null)
  const [memberName, setMemberName] = useState(null)
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)
  const [activeDay,  setActiveDay]  = useState(null)
  const [showInfo,   setShowInfo]   = useState(false)
  // Survey modal
  const [modal,      setModal]      = useState(null)
  const [stars,      setStars]      = useState(null)
  const [notes,      setNotes]      = useState('')
  const [saving,     setSaving]     = useState(false)
  const [saveErr,    setSaveErr]    = useState(null)
  const [toast,      setToast]      = useState(null)

  const todayName = new Date().toLocaleDateString('en-US', { weekday:'long' })

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [{ data:menu, error:mErr }, { data:mem }] = await Promise.all([
        supabase.from('menu').select('*').order('id'),
        user
          ? supabase.from('members').select('member_no,name_en').eq('user_id', user.id).maybeSingle()
          : Promise.resolve({ data:null }),
      ])
      if (cancelled) return
      if (mErr) setError(mErr.message); else setMenuData(menu || [])
      if (mem?.member_no) { setMemberNo(mem.member_no); setMemberName(mem.name_en) }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [user])

  function joinItems(arr) {
    if (!arr) return ''
    return Array.isArray(arr) ? arr.filter(Boolean).join(', ') : String(arr)
  }

  function openSurvey(day, mealType) {
    setModal({ day, mealType, menuText: mealType === 'Lunch' ? joinItems(day.lunch_items) : joinItems(day.dinner_items) })
    setStars(null); setNotes(''); setSaveErr(null)
  }

  async function handleSubmit() {
    if (!modal || stars === null || !memberNo) return
    setSaving(true); setSaveErr(null)
    const { error: err } = await supabase.from('feedback').insert({
      member_no: memberNo,
      menu_id:   modal.day.id || null,
      meal_type: modal.mealType.toLowerCase(),
      percent:   Math.round((stars / 5) * 100),
      notes:     notes || null,
    })
    setSaving(false)
    if (err) { setSaveErr(err.message); return }
    setToast(`✅ ${modal.day.day_name} ${modal.mealType} — ${'⭐'.repeat(stars)} saved!`)
    setModal(null)
    setTimeout(() => setToast(null), 3500)
  }

  if (loading) return <Spinner/>
  if (error)   return <ErrorBanner msg={error}/>

  const STAR_LABELS = ['','Poor 😞','Fair 😐','Good 🙂','Great 😊','Excellent! 🤩']

  return (
    <div style={{ flex:1, padding:'8px 14px 110px', display:'flex', flexDirection:'column', gap:10 }}>

      {/* Member greeting — profile name & member number */}
      {memberName && (
        <div style={{ borderRadius:16, padding:'13px 16px', background:t.cardActive,
          border:`1px solid ${t.accentBorder}`, display:'flex', alignItems:'center', justifyContent:'space-between',
          boxShadow:`0 4px 18px ${t.accentBg}` }}>
          <div>
            <p style={{ margin:0, fontSize:10, color:t.textSub, opacity:0.6, textTransform:'uppercase', letterSpacing:'0.16em' }}>Welcome back</p>
            <p style={{ margin:'2px 0 0', fontSize:16, fontWeight:800, color:t.text }}>{memberName}</p>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ margin:0, fontSize:10, color:t.textSub, opacity:0.5 }}>Member ID</p>
            <p style={{ margin:0, fontSize:22, fontWeight:900, color:t.accent, lineHeight:1.1 }}>{memberNo}</p>
          </div>
        </div>
      )}

      {/* Info button */}
      <div style={{ display:'flex', justifyContent:'center' }}>
        <button onClick={() => setShowInfo(true)}
          style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer',
            background:t.accentBg, border:`1px solid ${t.accentBorder}`,
            color:t.accent, borderRadius:999, padding:'7px 16px',
            fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em' }}>
          <Info size={12}/> Menu Information
        </button>
      </div>

      {/* Menu day cards */}
      {menuData.map((item, index) => {
        const open    = activeDay === index
        const isToday = item.day_name?.toLowerCase() === todayName.toLowerCase()
        const lunch   = Array.isArray(item.lunch_items)  ? item.lunch_items.filter(Boolean)  : [item.lunch_items].filter(Boolean)
        const dinner  = Array.isArray(item.dinner_items) ? item.dinner_items.filter(Boolean) : [item.dinner_items].filter(Boolean)

        return (
          <div key={item.id} style={{ borderRadius:18, overflow:'hidden',
            background: open ? t.cardActive : t.card,
            border:`1px solid ${open ? t.borderActive : isToday ? t.accentBorder : t.border}`,
            transition:'all 0.3s ease',
            boxShadow: isToday ? `0 0 0 2px ${t.accentBorder}` : open ? `0 4px 18px ${t.accentBg}` : 'none' }}>

            {/* Header row */}
            <button onClick={() => setActiveDay(open ? null : index)}
              style={{ width:'100%', background:'none', border:'none', cursor:'pointer',
                display:'flex', alignItems:'center', justifyContent:'space-between',
                padding:'13px 15px', color:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                {/* Tiffin stack icon */}
                <div style={{ position:'relative', width:46, height:46, flexShrink:0 }}>
                  <div style={{ position:'absolute', bottom:0, left:0, right:0, height:8,
                    background:t.accentBg, borderRadius:'0 0 8px 8px', border:`1px solid ${t.accentBorder}` }}/>
                  <div style={{ position:'absolute', bottom:6, left:2, right:2, height:10,
                    background:t.accentBg, borderRadius:5, border:`1px solid ${t.accentBorder}` }}/>
                  <div style={{ position:'absolute', bottom:14, left:4, right:4, height:10,
                    background:t.accentBg, borderRadius:5, border:`1px solid ${t.accentBorder}`, opacity:0.6 }}/>
                  <div style={{ position:'absolute', top:1, left:'50%', transform:'translateX(-50%)',
                    width:14, height:4, background:t.accent, borderRadius:6 }}/>
                  <div style={{ position:'absolute', inset:0, display:'flex',
                    alignItems:'center', justifyContent:'center', fontSize:17, paddingBottom:4 }}>🍽️</div>
                </div>

                <div style={{ textAlign:'left' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7, flexWrap:'wrap' }}>
                    <span style={{ fontWeight:800, fontSize:16, color:t.text }}>{item.day_name}</span>
                    <span style={{ fontSize:12, color:t.accent, opacity:0.65, fontFamily:'serif' }}>{item.day_name_ar}</span>
                    {isToday && (
                      <span style={{ fontSize:9, fontWeight:800, padding:'2px 8px', borderRadius:20,
                        background:t.accent, color: t.id === 'night' ? '#060d1a' : '#fff',
                        textTransform:'uppercase', letterSpacing:'0.1em' }}>Today</span>
                    )}
                  </div>
                  {!open && (
                    <span style={{ fontSize:11, color:t.textSub, opacity:0.55, display:'block',
                      maxWidth:195, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {lunch.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0,
                background: open ? t.accent : t.accentBg,
                display:'flex', alignItems:'center', justifyContent:'center',
                transform: open ? 'rotate(180deg)' : 'none', transition:'all 0.3s' }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 4.5L6 8L9.5 4.5" stroke={open ? t.bg : t.textSub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </button>

            {/* Expanded: full menu + rate buttons */}
            {open && (
              <div style={{ padding:'0 14px 16px' }}>
                <Divider/>

                {/* Lunch */}
                <div style={{ borderRadius:14, padding:'14px', background:t.accentBg,
                  border:`1px solid ${t.accentBorder}`, marginBottom:10 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <Sun size={13} color={t.accent}/>
                      <span style={{ fontSize:11, fontWeight:800, color:t.accent, textTransform:'uppercase', letterSpacing:'0.15em' }}>Lunch</span>
                    </div>
                    <button onClick={() => { if (isToday) openSurvey(item, 'Lunch') }} disabled={!isToday}
                      style={{ fontSize:11, fontWeight:800, padding:'5px 13px', borderRadius:20,
                        border:`1px solid ${isToday ? t.accent : t.border}`,
                        background: isToday ? t.accent : 'transparent',
                        color: isToday ? (t.id === 'night' ? '#060d1a' : '#fff') : t.textSub,
                        cursor: isToday ? 'pointer' : 'not-allowed', opacity: isToday ? 1 : 0.5,
                        transition:'all 0.2s' }}>
                      {isToday ? '⭐ Rate Meal' : '🔒 Locked'}
                    </button>
                  </div>
                  <ul style={{ margin:0, padding:'0 0 0 16px' }}>
                    {lunch.map((d,i) => <li key={i} style={{ fontSize:13, color:t.textBody, lineHeight:1.75 }}>{d}</li>)}
                  </ul>
                </div>

                {/* Dinner */}
                <div style={{ borderRadius:14, padding:'14px', background:t.card, border:`1px solid ${t.border}` }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                      <Moon size={13} color={t.textSub}/>
                      <span style={{ fontSize:11, fontWeight:800, color:t.textSub, textTransform:'uppercase', letterSpacing:'0.15em' }}>Dinner</span>
                    </div>
                    <button onClick={() => { if (isToday) openSurvey(item, 'Dinner') }} disabled={!isToday}
                      style={{ fontSize:11, fontWeight:800, padding:'5px 13px', borderRadius:20,
                        border:`1px solid ${isToday ? t.accent : t.border}`,
                        background: isToday ? t.accentBg : 'transparent',
                        color: isToday ? t.accent : t.textSub,
                        cursor: isToday ? 'pointer' : 'not-allowed', opacity: isToday ? 1 : 0.5,
                        transition:'all 0.2s' }}>
                      {isToday ? '⭐ Rate Meal' : '🔒 Locked'}
                    </button>
                  </div>
                  <ul style={{ margin:0, padding:'0 0 0 16px' }}>
                    {dinner.map((d,i) => <li key={i} style={{ fontSize:13, color:t.textBody, lineHeight:1.75 }}>{d}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {/* Info popup */}
      {showInfo && (
        <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center',
          justifyContent:'center', padding:24, background:t.popupBg, backdropFilter:'blur(12px)' }}>
          <div style={{ width:'100%', maxWidth:360, borderRadius:26, padding:'28px 24px',
            position:'relative', background:t.cardActive, border:`1px solid ${t.accentBorder}`,
            boxShadow:'0 24px 80px rgba(0,0,0,0.25)' }}>
            <button onClick={() => setShowInfo(false)}
              style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:t.textSub }}>
              <X size={20}/>
            </button>
            <h2 style={{ margin:'0 0 10px', fontSize:22, fontWeight:900, color:t.text }}>Notice</h2>
            <p style={{ margin:0, fontSize:14, color:t.textBody, lineHeight:1.65 }}>
              Menu may change based on availability. Tap any day to expand and rate today's meal using the ⭐ Rate button.
              Rating is only available for today — other days are locked automatically. JazakAllah Khair!
            </p>
            <button onClick={() => setShowInfo(false)}
              style={{ marginTop:22, width:'100%', padding:'13px', borderRadius:16, border:'none', cursor:'pointer',
                background:t.accentGrad, color:'#fff', fontWeight:900, fontSize:13,
                textTransform:'uppercase', letterSpacing:'0.1em' }}>
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Survey modal */}
      {modal && (
        <div style={{ position:'fixed', inset:0, zIndex:100, background:t.popupBg, backdropFilter:'blur(10px)',
          display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
          <div style={{ width:'100%', maxWidth:400, borderRadius:22, background:t.cardActive,
            border:`1px solid ${t.accentBorder}`, padding:'20px 20px 18px',
            boxShadow:'0 20px 60px rgba(0,0,0,0.35)', position:'relative',
            maxHeight:'90vh', overflowY:'auto' }}>

            <button onClick={() => setModal(null)}
              style={{ position:'absolute', top:14, right:14, background:'none', border:'none', cursor:'pointer', color:t.textSub }}>
              <X size={18}/>
            </button>

            <p style={{ margin:'0 0 2px', fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:t.textSub, opacity:0.6 }}>Daily Survey</p>
            <h3 style={{ margin:'0 0 14px', fontSize:20, fontWeight:900, color:t.text }}>
              {modal.day.day_name} · {modal.mealType}
            </h3>

            {/* Show menu items FIRST */}
            <div style={{ borderRadius:14, padding:'14px', background:t.accentBg,
              border:`1px solid ${t.accentBorder}`, marginBottom:16 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                {modal.mealType === 'Lunch' ? <Sun size={13} color={t.accent}/> : <Moon size={13} color={t.textSub}/>}
                <span style={{ fontSize:11, fontWeight:800, textTransform:'uppercase', letterSpacing:'0.15em',
                  color: modal.mealType === 'Lunch' ? t.accent : t.textSub }}>
                  {modal.mealType} Menu
                </span>
              </div>
              <ul style={{ margin:0, padding:'0 0 0 16px' }}>
                {modal.menuText.split(', ').filter(Boolean).map((d,i) => (
                  <li key={i} style={{ fontSize:13, color:t.textBody, lineHeight:1.75 }}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Star rating (1–5) */}
            <div style={{ marginBottom:16 }}>
              <p style={{ margin:'0 0 10px', fontSize:13, fontWeight:800, color:t.text }}>How was your experience?</p>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                <StarRating value={stars} onChange={setStars} size={36}/>
                <p style={{ margin:0, fontSize:13, color:t.accent, fontWeight:700, minHeight:18 }}>
                  {stars ? STAR_LABELS[stars] : ''}
                </p>
              </div>
            </div>

            {/* Notes */}
            <div style={{ marginBottom:14 }}>
              <p style={{ margin:'0 0 7px', fontSize:12, fontWeight:700, color:t.text }}>Notes <span style={{ opacity:0.5, fontWeight:400 }}>(optional)</span></p>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                placeholder="What worked? What can improve?"
                style={{ width:'100%', boxSizing:'border-box', background:t.accentBg,
                  border:`1px solid ${t.accentBorder}`, borderRadius:10, color:t.textBody,
                  fontSize:13, padding:'10px 12px', resize:'none', outline:'none', fontFamily:'inherit' }}/>
            </div>

            {saveErr && <ErrorBanner msg={saveErr}/>}

            {!memberNo && (
              <p style={{ margin:'0 0 10px', fontSize:11, textAlign:'center', color:'#ef4444' }}>
                Your account is not linked to a member. Contact admin.
              </p>
            )}

            <button onClick={handleSubmit} disabled={stars === null || saving || !memberNo}
              style={{ width:'100%', padding:'13px', borderRadius:14, border:'none',
                cursor: (stars !== null && !saving && memberNo) ? 'pointer' : 'not-allowed',
                background: (stars !== null && !saving && memberNo) ? t.accentGrad : t.accentBg,
                color: (stars !== null && !saving && memberNo) ? '#fff' : t.accent,
                fontWeight:900, fontSize:13, textTransform:'uppercase', letterSpacing:'0.12em',
                display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                transition:'all 0.2s' }}>
              {saving
                ? <><div className="spin" style={{ width:15, height:15, border:'2px solid rgba(255,255,255,0.25)', borderTop:'2px solid #fff', borderRadius:'50%' }}/> Saving…</>
                : <><Send size={14}/> Submit Feedback</>
              }
            </button>
            {stars === null && (
              <p style={{ margin:'6px 0 0', fontSize:11, textAlign:'center', color:t.textSub, opacity:0.55 }}>
                Select a star rating to submit
              </p>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', bottom:90, left:'50%', transform:'translateX(-50%)',
          background:t.accent, color: t.id === 'night' ? '#060d1a' : '#fff',
          padding:'10px 18px', borderRadius:12, fontSize:12, fontWeight:700,
          boxShadow:'0 8px 20px rgba(0,0,0,0.18)', zIndex:120, whiteSpace:'nowrap' }}>
          {toast}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 2 — PROFILE
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
    async function load() {
      if (!user) { setError('No user session'); setLoading(false); return }
      const { data:m, error:e } = await supabase.from('members').select('*').eq('user_id', user.id).single()
      if (cancelled) return
      if (e) { setError('Profile not linked to this account'); setLoading(false); return }
      setMember(m)
      const { data:p } = await supabase.from('member_profile_pics').select('pic_url').eq('member_no', m.member_no).maybeSingle()
      if (p?.pic_url) setProfilePic(p.pic_url)
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [user])

  async function handlePicUpload(e) {
    if (!member) return
    const file = e.target.files[0]; if (!file) return
    setUploading(true); setUploadError(null)
    const ext = file.name.split('.').pop()
    const path = `profile-pics/${member.member_no}_${Date.now()}.${ext}`
    const { error:upErr } = await supabase.storage.from('profile-pics').upload(path, file, { upsert:true })
    if (upErr) { setUploadError(upErr.message); setUploading(false); return }
    const { data:{ publicUrl } } = supabase.storage.from('profile-pics').getPublicUrl(path)
    const { error:dbErr } = await supabase.from('member_profile_pics')
      .upsert({ member_no:member.member_no, pic_url:publicUrl }, { onConflict:'member_no' })
    if (dbErr) setUploadError(dbErr.message); else setProfilePic(publicUrl)
    setUploading(false)
  }

  if (loading) return <Spinner/>
  if (error)   return <ErrorBanner msg={error}/>
  if (!member) return <ErrorBanner msg="Member not found"/>

  const stats = [
    { label:'Member Since', value: new Date(member.joined_date).toLocaleDateString('en-GB', { month:'short', year:'numeric' }) },
    { label:'Status',       value: member.is_active ? '✅ Active' : '❌ Inactive' },
  ]

  return (
    <div style={{ flex:1, padding:'16px 16px 110px', display:'flex', flexDirection:'column', gap:14 }}>
      {/* Profile hero */}
      <div style={{ borderRadius:22, padding:'22px 20px',
        background:`linear-gradient(135deg,${t.cardActive},${t.accentBg})`,
        border:`1px solid ${t.accentBorder}`, display:'flex', alignItems:'center', gap:16,
        boxShadow:`0 10px 32px ${t.accentBg}` }}>
        <div style={{ position:'relative', flexShrink:0 }}>
          <div style={{ width:68, height:68, borderRadius:'50%', background:t.accentBg,
            border:`2px solid ${t.accentBorder}`, display:'flex', alignItems:'center',
            justifyContent:'center', overflow:'hidden', fontSize:26, fontWeight:900, color:t.accent }}>
            {profilePic
              ? <img src={profilePic} alt="profile" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
              : (member.name_ar?.[0] || member.name_en?.[0] || '?')
            }
          </div>
          <button onClick={() => fileRef.current.click()} disabled={uploading}
            style={{ position:'absolute', bottom:-2, right:-2, width:24, height:24,
              background:t.accentGrad, border:`2px solid ${t.bg}`, borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
            {uploading
              ? <div className="spin" style={{ width:10, height:10, border:'2px solid rgba(255,255,255,0.3)', borderTop:'2px solid #fff', borderRadius:'50%' }}/>
              : <Camera size={12} color="#fff"/>
            }
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display:'none' }} onChange={handlePicUpload}/>
        </div>
        <div style={{ flex:1 }}>
          <p style={{ margin:'0 0 2px', fontSize:10, color:t.accent, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.2em' }}>Active Member</p>
          <p style={{ margin:'0 0 2px', fontSize:15, fontWeight:800, color:t.text }}>{member.name_en}</p>
          {user?.email && <p style={{ margin:0, fontSize:11, color:t.textSub, opacity:0.5 }}>{user.email}</p>}
          {uploadError && <p style={{ margin:'4px 0 0', fontSize:10, color:'#ef4444' }}>{uploadError}</p>}
        </div>
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <p style={{ margin:0, fontSize:11, color:t.textSub, opacity:0.5 }}>Member ID</p>
          <p style={{ margin:0, fontSize:28, fontWeight:900, color:t.accent, lineHeight:1 }}>{member.member_no}</p>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {stats.map(s => (
          <div key={s.label} style={{ borderRadius:16, padding:'16px', background:t.card, border:`1px solid ${t.border}` }}>
            <p style={{ margin:'0 0 4px', fontSize:10, color:t.textSub, opacity:0.55, textTransform:'uppercase', letterSpacing:'0.1em' }}>{s.label}</p>
            <p style={{ margin:0, fontSize:16, fontWeight:900, color:t.accent }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Account */}
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
   PAGE 3 — POSTS
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
      <div style={{ borderRadius:18, padding:'16px 18px', background:t.cardActive,
        border:`1px solid ${t.accentBorder}`, display:'flex', alignItems:'center', gap:12 }}>
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
  const [themeId,   setThemeId]   = useState(getSavedThemeId)
  const theme = THEMES[themeId] || THEMES.night

  useEffect(() => { saveThemeId(themeId) }, [themeId])

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setSession(session))
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_evt, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => { await supabase.auth.signOut() }, [])

  // 3 tabs: Survey (home), Profile, Posts
  const tabs = [
    { id:'home',    label:'Survey',  Icon: Home     },
    { id:'profile', label:'Profile', Icon: User     },
    { id:'post',    label:'Posts',   Icon: FileText },
  ]

  const pageTitles = {
    home:    { en:'Al-Mawaid', sub:'Daily Menu & Survey' },
    profile: { en:'My Profile', sub:'Member details'      },
    post:    { en:'Announcements', sub:'Latest updates'   },
  }
  const title = pageTitles[activeTab]

  // Session loading
  if (session === undefined) {
    return (
      <div style={{ minHeight:'100vh', background:theme.bgGrad,
        display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Segoe UI',sans-serif" }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
          <div className="spin" style={{ width:40, height:40,
            border:`3px solid ${theme.spinnerBorder}`, borderTop:`3px solid ${theme.spinnerTop}`, borderRadius:'50%' }}/>
          <p style={{ margin:0, fontSize:13, color:theme.textSub, opacity:0.5 }}>Loading…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
      </div>
    )
  }

  if (!session) return <LoginPage themeId={themeId} setThemeId={setThemeId}/>

  return (
    <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
      <AuthCtx.Provider value={{ user:session.user, signOut }}>
        <div style={{ fontFamily:"'Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
          minHeight:'100vh', background:theme.bg, color:theme.text,
          display:'flex', flexDirection:'column', transition:'background 0.35s ease, color 0.35s ease' }}>

          {/* Floating theme switcher — bottom right, above nav bar */}
          <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={theme}/>
          {/* Logout — top left */}
          <LogoutButton/>

          {/* HEADER */}
          <header style={{ position:'relative', overflow:'hidden',
            background:theme.bgGrad, padding:'20px 20px 0', transition:'background 0.35s ease' }}>
            <GeoBg t={theme}/>

            {/* Top bar */}
            <div style={{ position:'relative', zIndex:1, display:'flex',
              justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10,
                letterSpacing:'0.2em', textTransform:'uppercase', color:theme.textSub, opacity:0.6, paddingLeft:46 }}>
                🍽️ Al-Mawaid
              </div>
              <span style={{ fontSize:10, color:theme.textSub, opacity:0.4 }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>

            {/* Bismillah (home only) */}
            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:8 }}>
                <p style={{ fontFamily:'serif', fontSize:18, letterSpacing:'0.1em', color:theme.accent, margin:0 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {/* Page title */}
            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:12 }}>
              <p style={{ fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase',
                color:theme.textSub, opacity:0.45, margin:'0 0 3px' }}>
                {activeTab === 'home' ? 'Welcome to' : ''}
              </p>
              <h1 style={{ margin:0, fontSize: activeTab === 'home' ? 34 : 26,
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

            {/* Wave separator — NO crescent divider */}
            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 48" preserveAspectRatio="none">
              <path d="M0,16 C200,48 400,0 600,24 C800,48 1000,6 1200,28 C1320,42 1400,16 1440,22 L1440,48 L0,48 Z"
                fill={theme.bg}/>
            </svg>
          </header>

          {activeTab === 'home'    && <HomePage/>}
          {activeTab === 'profile' && <ProfilePage/>}
          {activeTab === 'post'    && <PostPage/>}

          {/* Bottom nav — 3 tabs */}
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
                    padding:'2px 24px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
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
