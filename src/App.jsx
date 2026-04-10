// src/App.jsx — Al-Mawaid Food Survey System
// ✨ Supabase Auth | Weekly Menu Survey | Gamification | Arabic Support
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, User, X,
  Star, Camera, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ChevronUp,
  Trophy, ClipboardList, Edit3, MessageCircle
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
}
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── 5 PREMIUM THEMES ────────────────────────────────────────
const THEMES = {
  ivory: {
    id: 'ivory', label: 'Ivory Gold', emoji: '✨',
    bg: '#faf8f5', bgGrad: 'linear-gradient(180deg,#faf8f5 0%,#f5f0e8 60%,#ede4d4 100%)',
    card: '#f5f0e8', cardActive: 'linear-gradient(135deg,#f5f0e8,#ede4d4)',
    border: 'rgba(180,140,60,0.18)', borderActive: 'rgba(180,140,60,0.45)',
    accent: '#b48c3c', accentGrad: 'linear-gradient(135deg,#d4a84b,#b48c3c)',
    accentBg: 'rgba(180,140,60,0.1)', accentBorder: 'rgba(180,140,60,0.35)',
    text: '#3d3426', textSub: '#7a6b52', textBody: '#5c4f3a',
    navBg: 'linear-gradient(180deg,#ede4d4,#faf8f5)', navBorder: 'rgba(180,140,60,0.25)',
    geo: 'rgba(180,140,60,0.06)', popupBg: 'rgba(250,248,245,0.96)',
    spinnerBorder: 'rgba(180,140,60,0.2)', spinnerTop: '#b48c3c',
    inputBg: 'rgba(255,255,255,0.7)', inputBorder: 'rgba(180,140,60,0.25)',
    loginCard: 'rgba(245,240,232,0.92)', loginText: '#3d3426',
    surveyBg: '#faf8f5', surveyCard: '#f5f0e8',
  },
  obsidian: {
    id: 'obsidian', label: 'Obsidian Night', emoji: '🌑',
    bg: '#111111', bgGrad: 'linear-gradient(180deg,#111111 0%,#1a1a1a 60%,#111111 100%)',
    card: '#1e1e1e', cardActive: 'linear-gradient(135deg,#1e1e1e,#2a2a2a)',
    border: 'rgba(255,255,255,0.08)', borderActive: 'rgba(255,255,255,0.2)',
    accent: '#e8c547', accentGrad: 'linear-gradient(135deg,#f0d264,#e8c547)',
    accentBg: 'rgba(232,197,71,0.1)', accentBorder: 'rgba(232,197,71,0.3)',
    text: '#f0ece4', textSub: '#9a9488', textBody: '#c8c2b6',
    navBg: 'linear-gradient(180deg,#1a1a1a,#111111)', navBorder: 'rgba(232,197,71,0.2)',
    geo: 'rgba(255,255,255,0.03)', popupBg: 'rgba(17,17,17,0.96)',
    spinnerBorder: 'rgba(232,197,71,0.2)', spinnerTop: '#e8c547',
    inputBg: 'rgba(255,255,255,0.05)', inputBorder: 'rgba(232,197,71,0.25)',
    loginCard: 'rgba(30,30,30,0.94)', loginText: '#f0ece4',
    surveyBg: '#161616', surveyCard: '#222222',
  },
  ocean: {
    id: 'ocean', label: 'Ocean Teal', emoji: '🌊',
    bg: '#f0fafa', bgGrad: 'linear-gradient(180deg,#f0fafa 0%,#d5f0ee 60%,#b2e4e0 100%)',
    card: '#d5f0ee', cardActive: 'linear-gradient(135deg,#d5f0ee,#b2e4e0)',
    border: 'rgba(14,116,120,0.18)', borderActive: 'rgba(14,116,120,0.45)',
    accent: '#0e7478', accentGrad: 'linear-gradient(135deg,#14919b,#0e7478)',
    accentBg: 'rgba(14,116,120,0.1)', accentBorder: 'rgba(14,116,120,0.35)',
    text: '#0a3d3f', textSub: '#1a6567', textBody: '#155e60',
    navBg: 'linear-gradient(180deg,#b2e4e0,#f0fafa)', navBorder: 'rgba(14,116,120,0.25)',
    geo: 'rgba(14,116,120,0.06)', popupBg: 'rgba(240,250,250,0.96)',
    spinnerBorder: 'rgba(14,116,120,0.2)', spinnerTop: '#14919b',
    inputBg: 'rgba(255,255,255,0.6)', inputBorder: 'rgba(14,116,120,0.25)',
    loginCard: 'rgba(213,240,238,0.92)', loginText: '#0a3d3f',
    surveyBg: '#f0fafa', surveyCard: '#d5f0ee',
  },
  burgundy: {
    id: 'burgundy', label: 'Rich Burgundy', emoji: '🍷',
    bg: '#faf2f2', bgGrad: 'linear-gradient(180deg,#faf2f2 0%,#f0dada 60%,#e4c4c4 100%)',
    card: '#f0dada', cardActive: 'linear-gradient(135deg,#f0dada,#e4c4c4)',
    border: 'rgba(128,30,40,0.18)', borderActive: 'rgba(128,30,40,0.45)',
    accent: '#801e28', accentGrad: 'linear-gradient(135deg,#a52834,#801e28)',
    accentBg: 'rgba(128,30,40,0.1)', accentBorder: 'rgba(128,30,40,0.3)',
    text: '#3d1015', textSub: '#8c3a42', textBody: '#6b2630',
    navBg: 'linear-gradient(180deg,#e4c4c4,#faf2f2)', navBorder: 'rgba(128,30,40,0.25)',
    geo: 'rgba(128,30,40,0.06)', popupBg: 'rgba(250,242,242,0.96)',
    spinnerBorder: 'rgba(128,30,40,0.2)', spinnerTop: '#a52834',
    inputBg: 'rgba(255,255,255,0.6)', inputBorder: 'rgba(128,30,40,0.25)',
    loginCard: 'rgba(240,218,218,0.92)', loginText: '#3d1015',
    surveyBg: '#faf2f2', surveyCard: '#f0dada',
  },
  sage: {
    id: 'sage', label: 'Slate Sage', emoji: '🌿',
    bg: '#f4f7f4', bgGrad: 'linear-gradient(180deg,#f4f7f4 0%,#dce8dc 60%,#c2d8c2 100%)',
    card: '#dce8dc', cardActive: 'linear-gradient(135deg,#dce8dc,#c2d8c2)',
    border: 'rgba(70,110,70,0.18)', borderActive: 'rgba(70,110,70,0.45)',
    accent: '#466e46', accentGrad: 'linear-gradient(135deg,#5a8a5a,#466e46)',
    accentBg: 'rgba(70,110,70,0.1)', accentBorder: 'rgba(70,110,70,0.35)',
    text: '#1e3320', textSub: '#4a6f4c', textBody: '#355838',
    navBg: 'linear-gradient(180deg,#c2d8c2,#f4f7f4)', navBorder: 'rgba(70,110,70,0.25)',
    geo: 'rgba(70,110,70,0.06)', popupBg: 'rgba(244,247,244,0.96)',
    spinnerBorder: 'rgba(70,110,70,0.2)', spinnerTop: '#5a8a5a',
    inputBg: 'rgba(255,255,255,0.6)', inputBorder: 'rgba(70,110,70,0.25)',
    loginCard: 'rgba(220,232,220,0.92)', loginText: '#1e3320',
    surveyBg: '#f4f7f4', surveyCard: '#dce8dc',
  },
}

/* ─── Theme Switcher ─── */
function ThemeSwitcher({ themeId, setThemeId, theme: t }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', bottom: 90, right: 16, zIndex: 200 }}>
      <button onClick={() => setOpen(o => !o)} title="Switch Theme"
        style={{
          width: 50, height: 50, borderRadius: '50%', border: `2px solid ${t.accentBorder}`,
          background: t.accentBg, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', boxShadow: `0 6px 24px ${t.accentBg}`,
          transition: 'all 0.3s ease'
        }}>
        <Palette size={22} color={t.accent} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: -1 }} />
          <div style={{
            position: 'absolute', bottom: 60, right: 0, background: t.card,
            border: `1px solid ${t.accentBorder}`, borderRadius: 20, padding: 12,
            display: 'flex', flexDirection: 'column', gap: 6, minWidth: 170,
            boxShadow: '0 16px 48px rgba(0,0,0,0.25)', backdropFilter: 'blur(20px)',
            animation: 'fadeInUp 0.25s ease', zIndex: 300
          }}>
            <p style={{
              margin: '0 6px 6px', fontSize: 10, fontWeight: 900,
              textTransform: 'uppercase', letterSpacing: '0.2em', color: t.textSub, opacity: 0.7
            }}>THEMES</p>
            {Object.values(THEMES).map(th => (
              <button key={th.id} onClick={() => { setThemeId(th.id); saveThemeId(th.id); setOpen(false) }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: themeId === th.id ? t.accentBg : 'transparent',
                  width: '100%', textAlign: 'left', transition: 'all 0.2s'
                }}>
                <span style={{ fontSize: 18 }}>{th.emoji}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.text, flex: 1 }}>{th.label}</span>
                {themeId === th.id && <Check size={16} color={t.accent} strokeWidth={3} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}


// ─── Menu Data ────────────────────────────────────────────────
const WEEKLY_MENU = {
  monday:    { en:'Monday',    ar:'الاثنين',  lunch:['Chicken Biryani','Dal Makhani','Naan','Raita','Salad'],              dinner:['Grilled Fish','Vegetable Curry','Rice','Chapati','Pickle'] },
  tuesday:   { en:'Tuesday',   ar:'الثلاثاء', lunch:['Mutton Rogan Josh','Paneer Butter Masala','Roti','Raita','Papadam'], dinner:['Chicken Tikka','Mixed Vegetables','Jeera Rice','Naan','Chutney'] },
  wednesday: { en:'Wednesday', ar:'الأربعاء', lunch:['Fish Curry','Aloo Gobi','Paratha','Yogurt','Pickle'],               dinner:['Beef Kebab','Palak Paneer','Pulao','Roti','Salad'] },
  thursday:  { en:'Thursday',  ar:'الخميس',  lunch:['Chicken Korma','Chana Masala','Rice','Naan','Raita'],               dinner:['Prawn Masala','Egg Curry','Jeera Rice','Chapati','Pickle'] },
  friday:    { en:'Friday',    ar:'الجمعة',  lunch:['Lamb Biryani','Vegetable Jalfrezi','Naan','Raita','Salad'],          dinner:['Tandoori Chicken','Dal Tadka','Rice','Roti','Chutney'] },
  saturday:  { en:'Saturday',  ar:'السبت',   lunch:['Fish Tikka','Mixed Dal','Paratha','Yogurt','Pickle'],               dinner:['Mutton Curry','Aloo Matar','Pulao','Naan','Salad'] },
}
const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday']

const ThemeCtx = createContext(THEME)
const useTheme = () => useContext(ThemeCtx)
const AuthCtx  = createContext(null)
const useAuth  = () => useContext(AuthCtx)

/* ─── Geo Background ─────────────────────────────────────────── */
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

/* ─── Spinner ─────────────────────────────────────────────────── */
const Spinner = ({ fullPage = true }) => {
  const t = useTheme() || THEME
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

/* ─── Error Banner ───────────────────────────────────────────── */
const ErrorBanner = ({ msg }) => (
  <div style={{ margin:'8px 0', padding:'12px 14px', borderRadius:12,
    background:'rgba(239,68,68,0.10)', border:'1px solid rgba(239,68,68,0.3)',
    color:'#ef4444', fontSize:13, display:'flex', alignItems:'center', gap:8 }}>
    <AlertCircle size={14} style={{ flexShrink:0 }}/>{msg}
  </div>
)

/* ─── Circle Icon Wrapper ────────────────────────────────────── */
const CircleIcon = ({ children, size = 44, bg, style: extraStyle = {} }) => {
  const t = useTheme()
  return (
    <div style={{ width:size, height:size, borderRadius:'50%',
      background: bg || t.accentGrad, display:'flex', alignItems:'center',
      justifyContent:'center', flexShrink:0, ...extraStyle }}>
      {children}
    </div>
  )
}

/* ─── Login Page ─────────────────────────────────────────────── */
function LoginPage() {
  const t = THEME
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [mode, setMode]         = useState('login')

  const handleAuth = async (e) => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setError('Check your email for a verification link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  return (
    <div style={{ minHeight:'100vh', background:t.bgGrad, display:'flex',
      alignItems:'center', justifyContent:'center', padding:20,
      position:'relative', overflow:'hidden', fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
      <GeoBg t={t}/>
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:420,
        background:t.loginCard, backdropFilter:'blur(20px)', borderRadius:24,
        padding:'40px 30px', border:`1px solid ${t.borderActive}`, boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>

        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:88, height:88, margin:'0 auto 16px', borderRadius:'50%',
            background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 8px 24px ${t.accentBg}` }}>
            <img src="/al-mawaid.png" alt="Al-Mawaid" style={{ width:58, height:58, objectFit:'contain' }}/>
          </div>
          <h1 style={{ margin:'0 0 6px', fontSize:30, fontWeight:900, color:t.accent,
            textTransform:'uppercase', letterSpacing:'0.05em' }}>Al-Mawaid</h1>
          <p style={{ margin:0, fontSize:13, color:t.textSub, opacity:0.7,
            fontFamily:"'Amiri','Georgia',serif", letterSpacing:'0.1em' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          {['login','signup'].map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ flex:1, padding:'10px 20px', borderRadius:12,
                border:`1px solid ${mode===m ? t.accent : t.border}`,
                background: mode===m ? t.accentBg : 'transparent',
                color: mode===m ? t.accent : t.text,
                fontWeight:700, cursor:'pointer', transition:'all 0.3s', fontSize:14 }}>
              {m === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleAuth}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:t.textSub, marginBottom:6 }}>Email</label>
            <div style={{ position:'relative' }}>
              <Mail size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width:'100%', padding:'12px 12px 12px 42px', borderRadius:12, boxSizing:'border-box',
                  background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                  fontSize:14, outline:'none', transition:'all 0.3s' }}
                placeholder="Enter your email"/>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:t.textSub, marginBottom:6 }}>Password</label>
            <div style={{ position:'relative' }}>
              <Lock size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width:'100%', padding:'12px 44px 12px 42px', borderRadius:12, boxSizing:'border-box',
                  background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                  fontSize:14, outline:'none', transition:'all 0.3s' }}
                placeholder="Enter your password"/>
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                {showPass ? <EyeOff size={16} color={t.accent}/> : <Eye size={16} color={t.accent}/>}
              </button>
            </div>
          </div>
          {error && <ErrorBanner msg={error}/>}
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:14, borderRadius:12, border:'none',
              background:t.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              boxShadow:`0 4px 16px ${t.accentBg}`, transition:'all 0.3s', marginTop:4 }}>
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
    </div>
  )
}

/* ─── Home Page ──────────────────────────────────────────────── */
function HomePage() {
  const t = useTheme()
  const { user } = useAuth()
  const [expandedDay, setExpandedDay]   = useState(null)
  const [showSurvey, setShowSurvey]     = useState(false)
  const [stats, setStats]               = useState({ points:0, level:1, total_surveys:0 })
  const [thaliName, setThaliName]       = useState('My Thali')
  const [editingName, setEditingName]   = useState(false)
  const [nameInput, setNameInput]       = useState('My Thali')
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => { loadStats() }, [user])

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stats').select('*').eq('user_id', user.id).single()
      if (data) {
        setStats(data)
        setThaliName(data.thali_name || 'My Thali')
        setNameInput(data.thali_name || 'My Thali')
      } else if (!error || error.code === 'PGRST116') {
        const { data: ns } = await supabase
          .from('user_stats')
          .insert([{ user_id:user.id, points:0, level:1, streak:0, total_surveys:0, thali_name:'My Thali' }])
          .select().single()
        if (ns) { setStats(ns); setThaliName(ns.thali_name || 'My Thali') }
      }
    } catch (err) { console.error(err) }
    finally { setStatsLoading(false) }
  }

  const saveThaliName = async () => {
    if (!nameInput.trim()) return
    const name = nameInput.trim()
    setThaliName(name); setEditingName(false)
    await supabase.from('user_stats')
      .upsert([{ user_id:user.id, thali_name:name }], { onConflict:'user_id' })
  }

  const initials = (user.email || 'U').charAt(0).toUpperCase()

  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:800, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* ── Profile Card ── */}
      <div style={{ marginBottom:20, padding:18, borderRadius:18,
        background:t.cardActive, border:`1px solid ${t.borderActive}`,
        boxShadow:'0 8px 32px rgba(0,0,0,0.3)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          {/* Golden initial circle */}
          <div style={{ width:58, height:58, borderRadius:'50%', background:t.accentGrad,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            fontSize:24, fontWeight:900, color:'#fff',
            boxShadow:`0 4px 14px ${t.accentBg}`, border:`2px solid ${t.accent}` }}>
            {initials}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:11, color:t.textSub, marginBottom:3, opacity:0.8 }}>{user.email}</div>
            {editingName ? (
              <div style={{ display:'flex', gap:6, alignItems:'center' }}>
                <input value={nameInput} onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveThaliName()}
                  autoFocus
                  style={{ flex:1, padding:'5px 10px', borderRadius:8,
                    border:`1px solid ${t.accent}`, background:t.inputBg,
                    color:t.text, fontSize:15, fontWeight:700, outline:'none' }}/>
                <button onClick={saveThaliName}
                  style={{ background:t.accentGrad, border:'none', borderRadius:8,
                    padding:'5px 10px', cursor:'pointer', display:'flex', alignItems:'center' }}>
                  <Check size={14} color="#fff"/>
                </button>
                <button onClick={() => { setEditingName(false); setNameInput(thaliName) }}
                  style={{ background:'transparent', border:`1px solid ${t.border}`,
                    borderRadius:8, padding:'5px 10px', cursor:'pointer', display:'flex', alignItems:'center' }}>
                  <X size={14} color={t.textSub}/>
                </button>
              </div>
            ) : (
              <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ fontSize:18, fontWeight:800, color:t.accent }}>{thaliName}</span>
                <button onClick={() => setEditingName(true)}
                  style={{ background:'none', border:'none', cursor:'pointer', padding:2, display:'flex', opacity:0.65 }}>
                  <Edit3 size={13} color={t.accent}/>
                </button>
              </div>
            )}
          </div>
          {/* Level badge */}
          {!statsLoading && (
            <div style={{ textAlign:'center', flexShrink:0 }}>
              <CircleIcon size={42} style={{ margin:'0 auto 4px', boxShadow:`0 4px 12px ${t.accentBg}` }}>
                <Trophy size={18} color="#fff"/>
              </CircleIcon>
              <div style={{ fontSize:10, color:t.textSub, fontWeight:700 }}>Lv {stats.level}</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Survey Dashboard ── */}
      {!statsLoading && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:10, marginBottom:22 }}>
          {[
            { label:'Surveys Filled', value:stats.total_surveys, icon:<ClipboardList size={17} color="#fff"/> },
            { label:'Level',          value:stats.level,         icon:<Trophy size={17} color="#fff"/> },
            { label:'Points',         value:stats.points,        icon:<Star size={17} color="#fff"/> },
          ].map(({ label, value, icon }) => (
            <div key={label} style={{ padding:'14px 8px', background:t.card,
              borderRadius:14, border:`1px solid ${t.borderActive}`, textAlign:'center' }}>
              <CircleIcon size={34} style={{ margin:'0 auto 8px', boxShadow:`0 2px 8px ${t.accentBg}` }}>
                {icon}
              </CircleIcon>
              <div style={{ fontSize:20, fontWeight:800, color:t.accent }}>{value}</div>
              <div style={{ fontSize:10, color:t.textSub, lineHeight:1.3, marginTop:2 }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── Weekly Menu Header — logo inline left ── */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
        <img src="/al-mawaid.png" alt="Al-Mawaid"
          style={{ width:42, height:42, objectFit:'contain', flexShrink:0,
            filter:'drop-shadow(0 2px 8px rgba(201,168,76,0.4))' }}/>
        <div>
          <h2 style={{ margin:0, fontSize:18, fontWeight:800, color:t.accent, lineHeight:1.2 }}>
            Weekly Menu Schedule
          </h2>
          <p style={{ margin:0, fontSize:11, color:t.textSub }}>Monday – Saturday · tap to expand</p>
        </div>
      </div>

      {/* ── Start Survey Button ── */}
      <button onClick={() => setShowSurvey(true)}
        style={{ width:'100%', padding:14, borderRadius:12, border:'none', marginBottom:18,
          background:t.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
          cursor:'pointer', boxShadow:`0 6px 20px ${t.accentBg}`, transition:'all 0.3s',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <CircleIcon size={28} bg="rgba(255,255,255,0.18)" style={{ boxShadow:'none' }}>
          <ClipboardList size={14} color="#fff"/>
        </CircleIcon>
        Start Weekly Survey
      </button>

      {/* ── Days Accordion ── */}
      {DAYS.map(day => {
        const menu = WEEKLY_MENU[day]
        const isExpanded = expandedDay === day
        return (
          <div key={day} style={{ marginBottom:10 }}>
            <button onClick={() => setExpandedDay(isExpanded ? null : day)}
              style={{ width:'100%', padding:'13px 16px', borderRadius:12,
                border:`1px solid ${isExpanded ? t.borderActive : t.border}`,
                background: isExpanded ? t.cardActive : t.card, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                transition:'all 0.3s', boxShadow: isExpanded ? `0 4px 16px ${t.accentBg}` : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
                <CircleIcon size={36} style={{ boxShadow:'none' }}>
                  <span style={{ fontSize:16 }}></span>
                </CircleIcon>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:t.accent }}>{menu.en}</div>
                  <div style={{ fontSize:11, color:t.textSub, fontFamily:"'Amiri','Georgia',serif" }}>{menu.ar}</div>
                </div>
              </div>
              <div style={{ width:28, height:28, borderRadius:'50%', background:t.accentBg,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                {isExpanded
                  ? <ChevronUp size={14} color={t.accent}/>
                  : <ChevronDown size={14} color={t.accent}/>}
              </div>
            </button>

            {isExpanded && (
              <div style={{ marginTop:6, padding:16, background:t.inputBg,
                borderRadius:12, border:`1px solid ${t.border}` }}>
                {[[' Lunch', menu.lunch], [' Dinner', menu.dinner]].map(([label, dishes], li) => (
                  <div key={label} style={{ marginBottom: li === 0 ? 14 : 0 }}>
                    <h4 style={{ margin:'0 0 8px', fontSize:13, fontWeight:700, color:t.accent }}>{label}</h4>
                    <ul style={{ margin:0, paddingLeft:18, fontSize:13, color:t.textBody, lineHeight:1.9 }}>
                      {dishes.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {showSurvey && <SurveyModal onClose={() => { setShowSurvey(false); loadStats() }}/>}
    </main>
  )
}

/* ─── Survey Modal ───────────────────────────────────────────── */
function SurveyModal({ onClose }) {
  const t = useTheme()
  const { user } = useAuth()
  const [currentDay, setCurrentDay]   = useState('monday')
  const [currentMeal, setCurrentMeal] = useState('lunch')
  const [responses, setResponses]     = useState({})
  const [wantsFood, setWantsFood]     = useState(null)
  const [loading, setLoading]         = useState(false)
  const [existingResponse, setExistingResponse] = useState(null)

  const currentDayIndex = DAYS.indexOf(currentDay)
  const menu = WEEKLY_MENU[currentDay]

  useEffect(() => { loadExisting() }, [currentDay, currentMeal])

  const loadExisting = async () => {
    try {
      const { data } = await supabase.from('survey_responses').select('*')
        .eq('user_id', user.id).eq('day', currentDay).eq('meal', currentMeal)
        .order('created_at', { ascending:false }).limit(1).single()
      if (data) { setExistingResponse(data); setWantsFood(data.wants_food); setResponses(data.dish_responses || {}) }
      else { setExistingResponse(null); setWantsFood(null); setResponses({}) }
    } catch { setExistingResponse(null); setWantsFood(null); setResponses({}) }
  }

  const handleNext = async () => {
    if (wantsFood !== null) {
      setLoading(true)
      try {
        if (existingResponse && existingResponse.edit_count >= 1) {
          alert('You have already edited this response once. No more edits allowed.')
          setLoading(false); return
        }
        const { error } = await supabase.from('survey_responses').upsert([{
          user_id:user.id, day:currentDay, meal:currentMeal, wants_food:wantsFood,
          dish_responses: wantsFood ? responses : {},
          edit_count: existingResponse ? (existingResponse.edit_count||0)+1 : 0
        }], { onConflict:'user_id,day,meal' })
        if (error) throw error
        await supabase.rpc('increment_user_points', { p_user_id:user.id, p_points:10 })
      } catch (err) { alert('Error saving: ' + err.message) }
      finally { setLoading(false) }
    }
    if (currentMeal === 'lunch') {
      setCurrentMeal('dinner'); setWantsFood(null); setResponses({})
    } else if (currentDayIndex < DAYS.length - 1) {
      setCurrentDay(DAYS[currentDayIndex+1]); setCurrentMeal('lunch'); setWantsFood(null); setResponses({})
    } else {
      alert('🎉 Survey completed! Thank you.'); onClose()
    }
  }

  const dishes = currentMeal === 'lunch' ? menu.lunch : menu.dinner

  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center',
      background:'rgba(0,0,0,0.75)', padding:20, backdropFilter:'blur(8px)', overflowY:'auto' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:THEME.card, borderRadius:20, padding:24, maxWidth:500, width:'100%',
          border:`1px solid ${THEME.borderActive}`, boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
          maxHeight:'90vh', overflowY:'auto' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:THEME.accent }}>
              {menu.en} · {currentMeal === 'lunch' ? 'Lunch' : 'Dinner'}
            </h2>
            <p style={{ margin:'4px 0 0', fontSize:12, color:THEME.textSub, fontFamily:"'Amiri','Georgia',serif" }}>{menu.ar}</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
            <X size={20} color={THEME.text}/>
          </button>
        </div>

        {wantsFood === null ? (
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:THEME.text, marginBottom:14 }}>
              Do you want to order {currentMeal} for {menu.en}?
            </p>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setWantsFood(true)}
                style={{ flex:1, padding:14, borderRadius:12, border:`1px solid ${THEME.accent}`,
                  background:THEME.accentBg, color:THEME.accent, fontSize:15, fontWeight:700, cursor:'pointer' }}>
                ✅ Yes
              </button>
              <button onClick={() => { setWantsFood(false); setTimeout(handleNext, 200) }}
                style={{ flex:1, padding:14, borderRadius:12, border:`1px solid ${THEME.border}`,
                  background:'transparent', color:THEME.text, fontSize:15, fontWeight:700, cursor:'pointer' }}>
                ❌ No
              </button>
            </div>
          </div>
        ) : wantsFood ? (
          <div>
            <p style={{ fontSize:13, fontWeight:600, color:THEME.textSub, marginBottom:12 }}>Select portion for each dish:</p>
            {dishes.map(dish => (
              <div key={dish} style={{ marginBottom:12, padding:12, background:THEME.inputBg, borderRadius:10 }}>
                <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:600, color:THEME.text }}>{dish}</p>
                <div style={{ display:'flex', gap:6 }}>
                  {[0,25,50,100].map(pct => (
                    <button key={pct} onClick={() => setResponses(prev => ({ ...prev, [dish]:pct }))}
                      style={{ flex:1, padding:'7px 2px', borderRadius:8,
                        border:`1.5px solid ${responses[dish]===pct ? THEME.accent : THEME.border}`,
                        background: responses[dish]===pct ? THEME.accentBg : 'transparent',
                        color: responses[dish]===pct ? THEME.accent : THEME.text,
                        fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.2s' }}>
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleNext}
              disabled={loading || Object.keys(responses).length < dishes.length}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none', marginTop:8,
                background: Object.keys(responses).length < dishes.length ? THEME.border : THEME.accentGrad,
                color:'#fff', fontSize:14, fontWeight:700,
                cursor: Object.keys(responses).length < dishes.length ? 'not-allowed' : 'pointer',
                opacity: Object.keys(responses).length < dishes.length ? 0.5 : 1 }}>
              {loading ? 'Saving…' : currentMeal==='dinner' && currentDayIndex===DAYS.length-1 ? 'Complete Survey' : 'Next →'}
            </button>
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:20 }}>
            <p style={{ color:THEME.textSub }}>Skipping…</p>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Feedback Page ──────────────────────────────────────────── */
function FeedbackPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [selectedDay, setSelectedDay] = useState(DAYS[0])
  const [submitted, setSubmitted]     = useState({})
  const [loading, setLoading]         = useState(true)
  const [submitting, setSubmitting]   = useState(false)
  const [error, setError]             = useState('')

  const [lunchStars,    setLunchStars]    = useState(0)
  const [lunchEmoji,    setLunchEmoji]    = useState(null)
  const [lunchComment,  setLunchComment]  = useState('')
  const [dinnerStars,   setDinnerStars]   = useState(0)
  const [dinnerEmoji,   setDinnerEmoji]   = useState(null)
  const [dinnerComment, setDinnerComment] = useState('')

  const EMOJIS = ['😡','😟','😐','😊','😍']

  useEffect(() => { loadSubmitted() }, [user])
  useEffect(() => { resetForm() }, [selectedDay])

  const loadSubmitted = async () => {
    try {
      const { data } = await supabase.from('daily_feedback').select('day').eq('user_id', user.id)
      const map = {}
      ;(data || []).forEach(r => { map[r.day] = true })
      setSubmitted(map)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const resetForm = () => {
    setLunchStars(0); setLunchEmoji(null); setLunchComment('')
    setDinnerStars(0); setDinnerEmoji(null); setDinnerComment('')
    setError('')
  }

  const handleSubmit = async () => {
    if (!lunchStars || !dinnerStars) return setError('Please rate both Lunch and Dinner')
    if (lunchEmoji === null || dinnerEmoji === null) return setError('Please pick an emoji for each meal')
    setError(''); setSubmitting(true)
    try {
      const { error: dbErr } = await supabase.from('daily_feedback').insert([{
        user_id:user.id, day:selectedDay,
        lunch_stars:lunchStars, lunch_emoji:EMOJIS[lunchEmoji], lunch_comment:lunchComment.trim(),
        dinner_stars:dinnerStars, dinner_emoji:EMOJIS[dinnerEmoji], dinner_comment:dinnerComment.trim(),
      }])
      if (dbErr) throw dbErr
      setSubmitted(prev => ({ ...prev, [selectedDay]:true }))
      resetForm()
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const menu = WEEKLY_MENU[selectedDay]
  const isSubmitted = submitted[selectedDay]

  /* Star rating row */
  const StarRow = ({ value, onChange, disabled }) => (
    <div style={{ display:'flex', gap:5 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => !disabled && onChange(n)} disabled={disabled}
          style={{ background:'none', border:'none', cursor: disabled ? 'default' : 'pointer', padding:2, lineHeight:0 }}>
          <Star size={26} fill={n<=value ? t.accent : 'none'} color={n<=value ? t.accent : t.border} strokeWidth={1.5}/>
        </button>
      ))}
    </div>
  )

  /* Emoji row */
  const EmojiRow = ({ value, onChange, disabled }) => (
    <div style={{ display:'flex', gap:7, marginTop:10 }}>
      {EMOJIS.map((em, i) => (
        <button key={em} onClick={() => !disabled && onChange(i)} disabled={disabled}
          style={{ fontSize:20, background: value===i ? t.accentBg : 'transparent',
            border:`1.5px solid ${value===i ? t.accent : t.border}`,
            borderRadius:'50%', width:40, height:40, cursor: disabled ? 'default' : 'pointer',
            transition:'all 0.2s', display:'flex', alignItems:'center', justifyContent:'center',
            opacity: disabled ? 0.45 : 1 }}>
          {em}
        </button>
      ))}
    </div>
  )

  /* Meal card */
  const MealCard = ({ meal, icon, dishes, stars, setStars, emoji, setEmoji, comment, setComment }) => (
    <div style={{ marginBottom:16, padding:18, background:t.card, borderRadius:16,
      border:`1px solid ${t.borderActive}` }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <CircleIcon size={38} style={{ boxShadow:`0 3px 10px ${t.accentBg}` }}>
          <span style={{ fontSize:17 }}>{icon}</span>
        </CircleIcon>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:t.accent }}>{meal}</div>
          <div style={{ fontSize:11, color:t.textSub, lineHeight:1.4 }}>
            {dishes.slice(0,3).join(' · ')}{dishes.length > 3 ? ' …' : ''}
          </div>
        </div>
      </div>
      <div style={{ marginBottom:8 }}>
        <div style={{ fontSize:11, fontWeight:700, color:t.textSub, marginBottom:6, letterSpacing:'0.06em' }}>RATING</div>
        <StarRow value={stars} onChange={setStars} disabled={isSubmitted}/>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:t.textSub, marginBottom:4, letterSpacing:'0.06em' }}>HOW WAS IT?</div>
        <EmojiRow value={emoji} onChange={setEmoji} disabled={isSubmitted}/>
      </div>
      <textarea value={comment} onChange={e => setComment(e.target.value)} disabled={isSubmitted}
        style={{ width:'100%', padding:'10px 12px', borderRadius:10, boxSizing:'border-box',
          background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
          fontSize:13, resize:'none', outline:'none', fontFamily:'inherit', minHeight:60,
          opacity: isSubmitted ? 0.45 : 1 }}
        placeholder="Add a comment (optional)…"/>
    </div>
  )

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* Day pill selector */}
      <div style={{ display:'flex', gap:7, overflowX:'auto', marginBottom:20, paddingBottom:4, scrollbarWidth:'none' }}>
        {DAYS.map(day => {
          const done   = submitted[day]
          const active = selectedDay === day
          return (
            <button key={day} onClick={() => setSelectedDay(day)}
              style={{ flexShrink:0, padding:'8px 14px', borderRadius:20,
                border:`1.5px solid ${active ? t.accent : done ? 'rgba(34,197,94,0.45)' : t.border}`,
                background: active ? t.accentBg : done ? 'rgba(34,197,94,0.09)' : 'transparent',
                color: active ? t.accent : done ? '#22c55e' : t.textSub,
                fontWeight:700, fontSize:12, cursor:'pointer', transition:'all 0.2s',
                display:'flex', alignItems:'center', gap:4 }}>
              {done && <Check size={10}/>}
              {WEEKLY_MENU[day].en.slice(0,3)}
            </button>
          )
        })}
      </div>

      {/* Heading card */}
      <div style={{ marginBottom:18, padding:'14px 18px', borderRadius:14,
        background:t.cardActive, border:`1px solid ${t.borderActive}` }}>
        <div style={{ fontSize:10, color:t.textSub, letterSpacing:'0.14em', textTransform:'uppercase', marginBottom:3 }}>
          Weekly Feedback
        </div>
        <div style={{ fontSize:22, fontWeight:900, color:t.accent }}>{menu.en}</div>
        <div style={{ fontSize:13, color:t.textSub, fontFamily:"'Amiri','Georgia',serif", marginTop:2 }}>{menu.ar}</div>
      </div>

      {isSubmitted ? (
        <div style={{ textAlign:'center', padding:'44px 20px', background:t.card,
          borderRadius:16, border:`1px solid ${t.borderActive}` }}>
          <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
          <div style={{ fontSize:17, fontWeight:700, color:t.accent, marginBottom:6 }}>Feedback Submitted!</div>
          <div style={{ fontSize:13, color:t.textSub }}>You've already submitted feedback for {menu.en}.</div>
        </div>
      ) : (
        <>
          <MealCard meal="Lunch"  icon="🍛" dishes={menu.lunch}
            stars={lunchStars}   setStars={setLunchStars}
            emoji={lunchEmoji}   setEmoji={setLunchEmoji}
            comment={lunchComment} setComment={setLunchComment}/>

          <MealCard meal="Dinner" icon="🍽️" dishes={menu.dinner}
            stars={dinnerStars}  setStars={setDinnerStars}
            emoji={dinnerEmoji}  setEmoji={setDinnerEmoji}
            comment={dinnerComment} setComment={setDinnerComment}/>

          {error && <ErrorBanner msg={error}/>}

          <button onClick={handleSubmit} disabled={submitting}
            style={{ width:'100%', padding:15, borderRadius:12, border:'none', marginTop:4,
              background: submitting ? t.border : t.accentGrad, color:'#fff',
              fontSize:15, fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer',
              boxShadow:`0 6px 20px ${t.accentBg}`, transition:'all 0.3s' }}>
            {submitting ? 'Submitting…' : '✨ Submit Feedback'}
          </button>
        </>
      )}
    </main>
  )
}

/* ─── Profile Page ───────────────────────────────────────────── */
function ProfilePage() {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [stats, setStats]     = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false))
  }, [])

  const initials = (user.email || 'U').charAt(0).toUpperCase()

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <div style={{ width:88, height:88, margin:'0 auto 14px', borderRadius:'50%',
          background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:34, fontWeight:900, color:'#fff',
          boxShadow:`0 8px 28px ${t.accentBg}`, border:`3px solid ${t.accent}` }}>
          {initials}
        </div>
        <h2 style={{ margin:'0 0 4px', fontSize:18, fontWeight:700, color:t.text }}>{user.email}</h2>
        <p style={{ margin:0, fontSize:12, color:t.textSub }}>
          Member since {new Date(user.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
        </p>
      </div>

      {stats && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          {[
            { icon:<Trophy size={20} color="#fff"/>,       val:stats.level,         label:'Level' },
            { icon:<Star size={20} color="#fff"/>,         val:stats.points,        label:'Points' },
            { icon:<ClipboardList size={20} color="#fff"/>,val:stats.total_surveys, label:'Surveys' },
            { icon:<MessageCircle size={20} color="#fff"/>,val:stats.streak||0,     label:'Day Streak' },
          ].map(({ icon, val, label }) => (
            <div key={label} style={{ padding:16, background:t.card, borderRadius:14,
              border:`1px solid ${t.border}`, textAlign:'center' }}>
              <CircleIcon size={40} style={{ margin:'0 auto 8px', boxShadow:`0 3px 10px ${t.accentBg}` }}>
                {icon}
              </CircleIcon>
              <div style={{ fontSize:22, fontWeight:800, color:t.accent }}>{val}</div>
              <div style={{ fontSize:11, color:t.textSub }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      <button onClick={signOut}
        style={{ width:'100%', padding:14, borderRadius:12,
          border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.08)',
          color:'#ef4444', fontSize:14, fontWeight:700, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
        <LogOut size={16}/> Sign Out
      </button>
    </main>
  )
}

/* ─── Post / Requests Page ───────────────────────────────────── */
function PostPage() {
  const t = useTheme()
  const [subTab, setSubTab] = useState('requests')
  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', gap:8, marginBottom:20, background:t.card,
        borderRadius:12, padding:6, border:`1px solid ${t.border}` }}>
        {[{ id:'requests', label:'📋 Requests' }, { id:'queries', label:'❓ Queries' }].map(({ id, label }) => (
          <button key={id} onClick={() => setSubTab(id)}
            style={{ flex:1, padding:'10px 12px', borderRadius:8, border:'none',
              background: subTab===id ? t.accentGrad : 'transparent',
              color: subTab===id ? '#fff' : t.textSub,
              fontWeight:700, fontSize:13, cursor:'pointer', transition:'all 0.3s' }}>
            {label}
          </button>
        ))}
      </div>
      {subTab === 'requests' && <ThaliRequestsSection/>}
      {subTab === 'queries'  && <QueriesSection/>}
    </main>
  )
}

/* ─── Thali Requests Section ─────────────────────────────────── */
function ThaliRequestsSection() {
  const t = useTheme()
  const { user } = useAuth()
  const [activeRequest, setActiveRequest] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError]     = useState('')

  const [resumeFrom, setResumeFrom] = useState('')
  const [resumeTo, setResumeTo]     = useState('')
  const [stopFrom, setStopFrom]     = useState('')
  const [stopTo, setStopTo]         = useState('')
  const [extraItems, setExtraItems] = useState([{ name:'', qty:1 }])

  const resetAll = () => {
    setResumeFrom(''); setResumeTo(''); setStopFrom(''); setStopTo('')
    setExtraItems([{ name:'', qty:1 }]); setError(''); setSuccess('')
  }
  const openRequest = (type) => { resetAll(); setActiveRequest(activeRequest===type ? null : type) }
  const addExtraItem = () => setExtraItems(prev => [...prev, { name:'', qty:1 }])
  const removeExtraItem = i => setExtraItems(prev => prev.filter((_,idx) => idx!==i))
  const updateExtraItem = (i, field, val) =>
    setExtraItems(prev => prev.map((item, idx) => idx===i ? { ...item, [field]:val } : item))

  const handleSubmit = async (type) => {
    setError(''); setSuccess(''); setSubmitting(true)
    try {
      let payload = { user_id:user.id, request_type:type, status:'pending' }
      if (type === 'resume') {
        if (!resumeFrom || !resumeTo) throw new Error('Please select both From and To dates')
        if (new Date(resumeFrom) > new Date(resumeTo)) throw new Error('From must be before To')
        payload = { ...payload, from_date:resumeFrom, to_date:resumeTo }
      } else if (type === 'stop') {
        if (!stopFrom || !stopTo) throw new Error('Please select both From and To dates')
        if (new Date(stopFrom) > new Date(stopTo)) throw new Error('From must be before To')
        payload = { ...payload, from_date:stopFrom, to_date:stopTo }
      } else if (type === 'extra') {
        const valid = extraItems.filter(i => i.name.trim())
        if (!valid.length) throw new Error('Please add at least one food item')
        payload = { ...payload, extra_items:valid }
      }
      const { error:dbErr } = await supabase.from('thali_requests').insert([payload])
      if (dbErr) throw dbErr
      setSuccess(`✅ ${type==='resume'?'Resume':type==='stop'?'Stop':'Extra food'} request submitted!`)
      resetAll(); setActiveRequest(null)
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const today = new Date().toISOString().split('T')[0]
  const inp = { width:'100%', padding:'10px 12px', borderRadius:10, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text, fontSize:14, outline:'none', fontFamily:'inherit' }

  const Card = ({ type, children }) => (
    <div style={{ marginBottom:12, borderRadius:14,
      border:`1px solid ${activeRequest===type ? t.borderActive : t.border}`,
      background: activeRequest===type ? t.cardActive : t.card,
      overflow:'hidden', transition:'all 0.3s' }}>
      {children}
    </div>
  )
  const HdrBtn = ({ type, emoji, label, desc }) => (
    <button onClick={() => openRequest(type)}
      style={{ width:'100%', padding:16, background:'transparent', border:'none',
        cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
      <CircleIcon size={44} style={{ boxShadow:`0 3px 10px ${t.accentBg}` }}>
        <span style={{ fontSize:20 }}>{emoji}</span>
      </CircleIcon>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:15, fontWeight:700, color: activeRequest===type ? t.accent : t.text }}>{label}</div>
        <div style={{ fontSize:12, color:t.textSub, marginTop:2 }}>{desc}</div>
      </div>
      <div style={{ width:28, height:28, borderRadius:'50%', background:t.accentBg,
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        {activeRequest===type
          ? <ChevronUp size={14} color={t.accent}/>
          : <ChevronDown size={14} color={t.accent}/>}
      </div>
    </button>
  )

  return (
    <div>
      {success && (
        <div style={{ marginBottom:14, padding:12, borderRadius:10,
          background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.3)',
          color:'#22c55e', fontSize:13, fontWeight:600 }}>{success}</div>
      )}

      <Card type="resume">
        <HdrBtn type="resume" emoji="▶️" label="Resume Thali" desc="Restart your thali service for a date range"/>
        {activeRequest === 'resume' && (
          <div style={{ padding:'0 16px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:t.textSub, marginBottom:5 }}>From</label>
                <input type="date" value={resumeFrom} min={today} onChange={e => setResumeFrom(e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:t.textSub, marginBottom:5 }}>To</label>
                <input type="date" value={resumeTo} min={resumeFrom||today} onChange={e => setResumeTo(e.target.value)} style={inp}/>
              </div>
            </div>
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('resume')} disabled={submitting}
              style={{ width:'100%', padding:12, borderRadius:10, border:'none',
                background: submitting ? t.border : t.accentGrad, color:'#fff', fontWeight:700, cursor:'pointer' }}>
              {submitting ? 'Submitting…' : '✅ Submit Resume Request'}
            </button>
          </div>
        )}
      </Card>

      <Card type="stop">
        <HdrBtn type="stop" emoji="⏹️" label="Stop Thali" desc="Pause your thali service for a date range"/>
        {activeRequest === 'stop' && (
          <div style={{ padding:'0 16px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:t.textSub, marginBottom:5 }}>From</label>
                <input type="date" value={stopFrom} min={today} onChange={e => setStopFrom(e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:600, color:t.textSub, marginBottom:5 }}>To</label>
                <input type="date" value={stopTo} min={stopFrom||today} onChange={e => setStopTo(e.target.value)} style={inp}/>
              </div>
            </div>
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('stop')} disabled={submitting}
              style={{ width:'100%', padding:12, borderRadius:10, border:'none',
                background: submitting ? t.border : 'linear-gradient(135deg,#ef4444,#dc2626)',
                color:'#fff', fontWeight:700, cursor:'pointer' }}>
              {submitting ? 'Submitting…' : '⏹️ Submit Stop Request'}
            </button>
          </div>
        )}
      </Card>

      <Card type="extra">
        <HdrBtn type="extra" emoji="➕" label="Add Extra Food" desc="Request additional items — choose qty 1–4"/>
        {activeRequest === 'extra' && (
          <div style={{ padding:'0 16px 16px' }}>
            {extraItems.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:10 }}>
                <input type="text" value={item.name} placeholder={`Item ${i+1}`}
                  onChange={e => updateExtraItem(i,'name',e.target.value)}
                  style={{ ...inp, flex:1 }}/>
                <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                  {[1,2,3,4].map(n => (
                    <button key={n} onClick={() => updateExtraItem(i,'qty',n)}
                      style={{ width:32, height:36, borderRadius:8,
                        border:`1.5px solid ${item.qty===n ? t.accent : t.border}`,
                        background: item.qty===n ? t.accentBg : 'transparent',
                        color: item.qty===n ? t.accent : t.textSub,
                        fontWeight:700, fontSize:13, cursor:'pointer', transition:'all 0.2s' }}>
                      {n}
                    </button>
                  ))}
                </div>
                {extraItems.length > 1 && (
                  <button onClick={() => removeExtraItem(i)}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex' }}>
                    <X size={16} color="#ef4444"/>
                  </button>
                )}
              </div>
            ))}
            {extraItems.length < 6 && (
              <button onClick={addExtraItem}
                style={{ width:'100%', padding:10, borderRadius:10,
                  border:`1px dashed ${t.accent}`, background:'transparent',
                  color:t.accent, fontWeight:600, fontSize:13, cursor:'pointer', marginBottom:12 }}>
                + Add Another Item
              </button>
            )}
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('extra')} disabled={submitting}
              style={{ width:'100%', padding:12, borderRadius:10, border:'none',
                background: submitting ? t.border : t.accentGrad, color:'#fff', fontWeight:700, cursor:'pointer' }}>
              {submitting ? 'Submitting…' : '➕ Submit Extra Food Request'}
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

/* ─── Queries Section ────────────────────────────────────────── */
function QueriesSection() {
  const t = useTheme()
  const { user } = useAuth()
  const [queries, setQueries]       = useState([])
  const [loading, setLoading]       = useState(true)
  const [comment, setComment]       = useState('')
  const [mediaFiles, setMediaFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]           = useState('')
  const [success, setSuccess]       = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => { loadQueries() }, [])

  const loadQueries = async () => {
    try {
      const { data } = await supabase.from('queries').select('*')
        .eq('user_id', user.id).order('created_at', { ascending:false }).limit(20)
      setQueries(data || [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
    if (mediaFiles.length + files.length > 4) { setError('Maximum 4 files allowed'); return }
    setMediaFiles(prev => [...prev, ...files.map(file => ({
      file, url:URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video', name:file.name
    }))])
    e.target.value = ''
  }
  const removeMedia = i => {
    setMediaFiles(prev => { URL.revokeObjectURL(prev[i].url); return prev.filter((_,idx) => idx!==i) })
  }

  const handleSubmit = async () => {
    if (!comment.trim() && !mediaFiles.length) return setError('Add a comment or attach a file')
    setError(''); setSuccess(''); setSubmitting(true)
    try {
      const uploadedUrls = []
      for (const item of mediaFiles) {
        const ext = item.file.name.split('.').pop()
        const path = `queries/${user.id}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
        const { error:upErr } = await supabase.storage.from('query-media').upload(path, item.file, { cacheControl:'3600', upsert:false })
        if (!upErr) {
          const { data:urlData } = supabase.storage.from('query-media').getPublicUrl(path)
          uploadedUrls.push({ type:item.type, name:item.file.name, path:urlData.publicUrl })
        } else {
          uploadedUrls.push({ type:item.type, name:item.file.name, path:null })
        }
      }
      const { error:dbErr } = await supabase.from('queries').insert([{
        user_id:user.id, comment:comment.trim(), media:uploadedUrls, status:'open'
      }])
      if (dbErr) throw dbErr
      setSuccess('✅ Query submitted! Our team will respond shortly.')
      setComment(''); setMediaFiles([]); loadQueries()
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const statusColor = s => s==='open' ? '#f59e0b' : s==='resolved' ? '#22c55e' : '#93c5fd'

  return (
    <div>
      <div style={{ marginBottom:20, padding:16, background:t.card, borderRadius:14, border:`1px solid ${t.border}` }}>
        <h3 style={{ margin:'0 0 12px', fontSize:15, fontWeight:700, color:t.accent }}>✉️ New Query</h3>
        <textarea value={comment} onChange={e => setComment(e.target.value)}
          style={{ width:'100%', minHeight:80, padding:12, borderRadius:10, boxSizing:'border-box',
            background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
            fontSize:14, resize:'vertical', outline:'none', fontFamily:'inherit', marginBottom:10 }}
          placeholder="Describe your query or issue…"/>
        {mediaFiles.length > 0 && (
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {mediaFiles.map((item, i) => (
              <div key={i} style={{ position:'relative', width:72, height:72, borderRadius:10,
                overflow:'hidden', border:`1px solid ${t.border}`, flexShrink:0 }}>
                {item.type === 'image'
                  ? <img src={item.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:'100%', background:t.inputBg,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🎬</div>}
                <button onClick={() => removeMedia(i)}
                  style={{ position:'absolute', top:2, right:2, width:18, height:18, borderRadius:'50%',
                    background:'rgba(0,0,0,0.7)', border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', padding:0 }}>
                  <X size={10} color="#fff"/>
                </button>
              </div>
            ))}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple onChange={handleFileSelect} style={{ display:'none' }}/>
        {mediaFiles.length < 4 && (
          <button onClick={() => fileInputRef.current?.click()}
            style={{ width:'100%', padding:10, borderRadius:10,
              border:`1px dashed ${t.accentBorder}`, background:t.accentBg, color:t.accent,
              fontWeight:600, fontSize:13, cursor:'pointer', marginBottom:10,
              display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
            <Camera size={15}/> Attach Photo / Video ({mediaFiles.length}/4)
          </button>
        )}
        {error   && <ErrorBanner msg={error}/>}
        {success && (
          <div style={{ marginBottom:8, padding:10, borderRadius:8,
            background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.3)',
            color:'#22c55e', fontSize:13, fontWeight:600 }}>{success}</div>
        )}
        <button onClick={handleSubmit} disabled={submitting}
          style={{ width:'100%', padding:12, borderRadius:10, border:'none',
            background: submitting ? t.border : t.accentGrad, color:'#fff',
            fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer' }}>
          {submitting ? 'Submitting…' : '📨 Submit Query'}
        </button>
      </div>

      <div style={{ fontSize:11, fontWeight:700, color:t.textSub, letterSpacing:'0.1em', marginBottom:10 }}>MY QUERIES</div>
      {loading ? <Spinner/> : queries.length === 0 ? (
        <div style={{ textAlign:'center', padding:32, color:t.textSub, fontSize:13 }}>No queries yet.</div>
      ) : queries.map(q => (
        <div key={q.id} style={{ marginBottom:10, padding:14, background:t.card,
          borderRadius:12, border:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:11, color:t.textSub }}>{new Date(q.created_at).toLocaleString()}</span>
            <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
              background:`${statusColor(q.status)}22`, color:statusColor(q.status) }}>
              {q.status?.toUpperCase()}
            </span>
          </div>
          {q.comment && <p style={{ margin:'0 0 8px', fontSize:13, color:t.textBody, lineHeight:1.6 }}>{q.comment}</p>}
          {q.media?.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {q.media.map((m,i) => (
                <span key={i} style={{ fontSize:11, color:t.accent, background:t.accentBg, padding:'3px 8px', borderRadius:6 }}>
                  {m.type==='image'?'🖼️':'🎬'} {m.name}
                </span>
              ))}
            </div>
          )}
          {q.admin_reply && (
            <div style={{ marginTop:10, padding:10, borderRadius:8, background:t.accentBg,
              border:`1px solid ${t.accentBorder}`, fontSize:12, color:t.accent }}>
              💬 <strong>Reply:</strong> {q.admin_reply}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ─── Main App ───────────────────────────────────────────────── */
export default function App() {
  const [session, setSession] = useState(undefined)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setSession(session))
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_evt, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => { await supabase.auth.signOut() }, [])

  const tabs = [
    { id:'home',     label:'Home',     Icon: Home },
    { id:'feedback', label:'Feedback', Icon: Star },
    { id:'post',     label:'Requests', Icon: FileText },
    { id:'profile',  label:'Profile',  Icon: User },
  ]

  const tabLabels = { home:'AL-MAWAID', feedback:'FEEDBACK', post:'REQUESTS', profile:'PROFILE' }

  if (session === undefined) {
    return (
      <div style={{ minHeight:'100vh', background:THEME.bgGrad,
        display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
        <Spinner/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
      </div>
    )
  }

  if (!session) return <LoginPage/>

  return (
    <ThemeCtx.Provider value={THEME}>
      <AuthCtx.Provider value={{ user:session.user, signOut }}>
        <div style={{ fontFamily:"'Cairo','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
          minHeight:'100vh', background:THEME.bg, color:THEME.text, display:'flex', flexDirection:'column' }}>

          {/* Header */}
          <header style={{ position:'relative', overflow:'hidden',
            background:THEME.bgGrad, padding:'18px 20px 0', flexShrink:0 }}>
            <GeoBg t={THEME}/>
            <div style={{ position:'relative', zIndex:1, display:'flex',
              justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              <div style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase',
                color:THEME.textSub, opacity:0.55 }}>
                🍽️ Al-Mawaid
              </div>
              <span style={{ fontSize:10, color:THEME.textSub, opacity:0.4 }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>
            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:6 }}>
                <p style={{ fontFamily:"'Amiri','Georgia',serif", fontSize:16, letterSpacing:'0.1em', color:THEME.accent, margin:0 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}
            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:10 }}>
              <h1 style={{ margin:0, fontSize: activeTab==='home' ? 32 : 24,
                fontWeight:900, textTransform:'uppercase', letterSpacing:'0.05em', lineHeight:1.1, color:THEME.accent }}>
                {tabLabels[activeTab]}
              </h1>
            </div>
            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 40" preserveAspectRatio="none">
              <path d="M0,14 C200,40 400,0 600,20 C800,40 1000,4 1200,24 C1320,36 1400,14 1440,18 L1440,40 L0,40 Z"
                fill={THEME.bg}/>
            </svg>
          </header>

          {/* Pages */}
          {activeTab === 'home'     && <HomePage/>}
          {activeTab === 'feedback' && <FeedbackPage/>}
          {activeTab === 'post'     && <PostPage/>}
          {activeTab === 'profile'  && <ProfilePage/>}

          {/* Bottom Nav */}
          <nav style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:30,
            display:'flex', justifyContent:'space-around', alignItems:'center',
            padding:'10px 4px 16px', background:THEME.navBg,
            borderTop:`1px solid ${THEME.navBorder}`, boxShadow:'0 -6px 30px rgba(0,0,0,0.18)' }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ background:'none', border:'none', cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                    padding:'2px 12px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
                  {active && (
                    <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
                      width:28, height:3, borderRadius:6, background:THEME.accent }}/>
                  )}
                  <div style={{ width:36, height:36, borderRadius:'50%', transition:'all 0.3s',
                    background: active ? THEME.accentBg : 'transparent',
                    border: active ? `1px solid ${THEME.accentBorder}` : '1px solid transparent',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={17} color={active ? THEME.accent : THEME.border} strokeWidth={active ? 2.2 : 1.5}/>
                  </div>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.04em',
                    color: active ? THEME.accent : THEME.textSub, opacity: active ? 1 : 0.5 }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </nav>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.8s linear infinite; }
            * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
            body { margin: 0; }
            ::-webkit-scrollbar { display: none; }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
