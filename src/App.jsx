// src/App.jsx — Al-Mawaid Food Survey System v3
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, User, X,
  Star, Camera, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ChevronUp,
  ClipboardList, Edit3, MessageCircle, ChevronLeft, ChevronRight,
  Palette, Sun, Moon, Sparkles, Phone, MapPin, Clock, Info,
  Upload, Heart, Users, Award, BookOpen, Bell
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── THEMES ──────────────────────────────────────────────────
const THEMES = {
  royal: {
    id: 'royal', name: 'Royal Indigo', icon: '👑',
    bg: '#0f0c29', bgGrad: 'linear-gradient(160deg,#0f0c29 0%,#1a1050 50%,#0f0c29 100%)',
    card: '#1a1650', cardActive: 'linear-gradient(135deg,#231a6e,#1a1050)',
    border: 'rgba(139,92,246,0.18)', borderActive: 'rgba(251,191,36,0.5)',
    accent: '#fbbf24', accentGrad: 'linear-gradient(135deg,#fbbf24,#d97706)',
    accentBg: 'rgba(251,191,36,0.10)', accentBorder: 'rgba(251,191,36,0.35)',
    text: '#f5f3ff', textSub: '#a78bfa', textBody: '#c4b5fd',
    navBg: 'linear-gradient(180deg,#1a1050,#0f0c29)', navBorder: 'rgba(251,191,36,0.2)',
    geo: 'rgba(139,92,246,0.07)',
    spinnerBorder: 'rgba(251,191,36,0.2)', spinnerTop: '#fbbf24',
    inputBg: 'rgba(139,92,246,0.08)', inputBorder: 'rgba(139,92,246,0.3)',
    loginCard: 'rgba(26,22,80,0.90)', headerWave: '#0f0c29',
  },
  dusk: {
    id: 'dusk', name: 'Desert Dusk', icon: '🌅',
    bg: '#1c0f0a', bgGrad: 'linear-gradient(160deg,#1c0f0a 0%,#2d1810 50%,#1c0f0a 100%)',
    card: '#2a1610', cardActive: 'linear-gradient(135deg,#3d2015,#2a1610)',
    border: 'rgba(251,146,60,0.18)', borderActive: 'rgba(251,191,36,0.5)',
    accent: '#fb923c', accentGrad: 'linear-gradient(135deg,#fb923c,#ea580c)',
    accentBg: 'rgba(251,146,60,0.10)', accentBorder: 'rgba(251,146,60,0.35)',
    text: '#fff7ed', textSub: '#fdba74', textBody: '#fed7aa',
    navBg: 'linear-gradient(180deg,#2a1610,#1c0f0a)', navBorder: 'rgba(251,146,60,0.22)',
    geo: 'rgba(251,146,60,0.06)',
    spinnerBorder: 'rgba(251,146,60,0.2)', spinnerTop: '#fb923c',
    inputBg: 'rgba(251,146,60,0.06)', inputBorder: 'rgba(251,146,60,0.25)',
    loginCard: 'rgba(42,22,16,0.92)', headerWave: '#1c0f0a',
  },
  sage: {
    id: 'sage', name: 'Sage & Cream', icon: '🌿',
    bg: '#f9f6f0', bgGrad: 'linear-gradient(160deg,#f9f6f0 0%,#f0ebe0 50%,#f9f6f0 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#fffdf7,#fdf8ee)',
    border: 'rgba(101,163,13,0.18)', borderActive: 'rgba(101,163,13,0.45)',
    accent: '#4d7c0f', accentGrad: 'linear-gradient(135deg,#65a30d,#4d7c0f)',
    accentBg: 'rgba(101,163,13,0.08)', accentBorder: 'rgba(101,163,13,0.3)',
    text: '#1a2e05', textSub: '#3f6212', textBody: '#365314',
    navBg: 'linear-gradient(180deg,#f9f6f0,#f0ebe0)', navBorder: 'rgba(101,163,13,0.2)',
    geo: 'rgba(101,163,13,0.06)',
    spinnerBorder: 'rgba(101,163,13,0.2)', spinnerTop: '#65a30d',
    inputBg: 'rgba(101,163,13,0.04)', inputBorder: 'rgba(101,163,13,0.22)',
    loginCard: 'rgba(255,255,255,0.95)', headerWave: '#f9f6f0',
  },
  midnight: {
    id: 'midnight', name: 'Midnight Gold', icon: '🌙',
    bg: '#060d1a', bgGrad: 'linear-gradient(180deg,#060d1a 0%,#0d1f3c 60%,#0a1828 100%)',
    card: '#0d1a30', cardActive: 'linear-gradient(135deg,#0d2044,#0a1828)',
    border: 'rgba(59,130,246,0.14)', borderActive: 'rgba(201,168,76,0.45)',
    accent: '#c9a84c', accentGrad: 'linear-gradient(135deg,#c9a84c,#a8883a)',
    accentBg: 'rgba(201,168,76,0.10)', accentBorder: 'rgba(201,168,76,0.35)',
    text: '#fff', textSub: '#93c5fd', textBody: '#bfdbfe',
    navBg: 'linear-gradient(180deg,#0a1828,#060d1a)', navBorder: 'rgba(201,168,76,0.22)',
    geo: 'rgba(255,255,255,0.06)',
    spinnerBorder: 'rgba(201,168,76,0.2)', spinnerTop: '#c9a84c',
    inputBg: 'rgba(255,255,255,0.05)', inputBorder: 'rgba(201,168,76,0.25)',
    loginCard: 'rgba(13,26,48,0.85)', headerWave: '#060d1a',
  },
  emerald: {
    id: 'emerald', name: 'Emerald Dusk', icon: '✨',
    bg: '#0a1a12', bgGrad: 'linear-gradient(180deg,#0a1a12 0%,#0d2218 60%,#081510 100%)',
    card: '#0d1f16', cardActive: 'linear-gradient(135deg,#0d2a1a,#081510)',
    border: 'rgba(52,211,153,0.14)', borderActive: 'rgba(212,175,55,0.45)',
    accent: '#d4af37', accentGrad: 'linear-gradient(135deg,#d4af37,#a8880a)',
    accentBg: 'rgba(212,175,55,0.10)', accentBorder: 'rgba(212,175,55,0.35)',
    text: '#f0faf4', textSub: '#6ee7b7', textBody: '#a7f3d0',
    navBg: 'linear-gradient(180deg,#0a1a12,#081510)', navBorder: 'rgba(212,175,55,0.22)',
    geo: 'rgba(52,211,153,0.06)',
    spinnerBorder: 'rgba(212,175,55,0.2)', spinnerTop: '#d4af37',
    inputBg: 'rgba(52,211,153,0.05)', inputBorder: 'rgba(212,175,55,0.25)',
    loginCard: 'rgba(10,26,18,0.88)', headerWave: '#0a1a12',
  },
}

// ─── Menu Data ────────────────────────────────────────────────
const WEEKLY_MENU = {
  monday:    { en:'Monday',    ar:'الاثنين',  lunch:['Chicken Biryani','Dal Makhani','Roti','Raita','Salad'],              dinner:['Grilled Fish','Vegetable Curry','Rice','Chapati','Pickle'] },
  tuesday:   { en:'Tuesday',   ar:'الثلاثاء', lunch:['Mutton Rogan Josh','Paneer Butter Masala','Roti','Raita','Papadam'], dinner:['Chicken Tikka','Mixed Vegetables','Jeera Rice','Naan','Chutney'] },
  wednesday: { en:'Wednesday', ar:'الأربعاء', lunch:['Fish Curry','Aloo Gobi','Roti','Yogurt','Pickle'],                  dinner:['Beef Kebab','Palak Paneer','Pulao','Roti','Salad'] },
  thursday:  { en:'Thursday',  ar:'الخميس',  lunch:['Chicken Korma','Chana Masala','Rice','Naan','Raita'],               dinner:['Prawn Masala','Egg Curry','Jeera Rice','Chapati','Pickle'] },
  friday:    { en:'Friday',    ar:'الجمعة',  lunch:['Lamb Biryani','Vegetable Jalfrezi','Roti','Raita','Salad'],          dinner:['Tandoori Chicken','Dal Tadka','Rice','Roti','Chutney'] },
  saturday:  { en:'Saturday',  ar:'السبت',   lunch:['Fish Tikka','Mixed Dal','Roti','Yogurt','Pickle'],                  dinner:['Mutton Curry','Aloo Matar','Pulao','Naan','Salad'] },
}
const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday']
const ROTI_ITEMS = ['roti','chapati','naan','paratha']
const isRotiItem = (dish) => ROTI_ITEMS.some(r => dish.toLowerCase().includes(r))

// Get today's day key
const getTodayKey = () => {
  const d = new Date().getDay() // 0=Sun,1=Mon...6=Sat
  const map = { 1:'monday',2:'tuesday',3:'wednesday',4:'thursday',5:'friday',6:'saturday' }
  return map[d] || 'monday'
}

const ThemeCtx = createContext(THEMES.midnight)
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
  const t = useTheme()
  const inner = (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
      <div className="spin" style={{ width:36, height:36, border:`3px solid ${t.spinnerBorder}`, borderTop:`3px solid ${t.spinnerTop}`, borderRadius:'50%' }}/>
      {fullPage && <p style={{ margin:0, fontSize:13, color:t.textSub, opacity:0.5, fontFamily:'inherit' }}>Loading…</p>}
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
    color:'#ef4444', fontSize:14, display:'flex', alignItems:'center', gap:8 }}>
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

/* ─── Avatar Component ───────────────────────────────────────── */
const Avatar = ({ avatarUrl, name, email, size = 56 }) => {
  const t = useTheme()
  const initials = (name || email || 'U').charAt(0).toUpperCase()
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', overflow:'hidden', flexShrink:0,
      border:`2.5px solid ${t.accent}`, boxShadow:`0 4px 16px ${t.accentBg}` }}>
      {avatarUrl
        ? <img src={avatarUrl} alt="Avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        : <div style={{ width:'100%', height:'100%', background:t.accentGrad,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize: size * 0.38, fontWeight:900, color:'#fff' }}>
            {initials}
          </div>
      }
    </div>
  )
}

/* ─── Login Page ─────────────────────────────────────────────── */
function LoginPage() {
  const t = THEMES.midnight
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
      position:'relative', overflow:'hidden', fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
      <GeoBg t={t}/>
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:420,
        background:t.loginCard, backdropFilter:'blur(20px)', borderRadius:28,
        padding:'44px 32px', border:`1px solid ${t.borderActive}`, boxShadow:'0 24px 64px rgba(0,0,0,0.4)' }}>

        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ width:92, height:92, margin:'0 auto 18px', borderRadius:'50%',
            background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 10px 32px ${t.accentBg}` }}>
            <img src="/al-mawaid.png" alt="Al-Mawaid" style={{ width:64, height:64, objectFit:'contain' }}/>
          </div>
          <h1 style={{ margin:'0 0 8px', fontSize:34, fontWeight:700, color:t.accent,
            letterSpacing:'0.06em', fontFamily:"'Cormorant Garamond','Georgia',serif" }}>Al-Mawaid</h1>
          <p style={{ margin:0, fontSize:15, color:t.textSub, opacity:0.75,
            fontFamily:"'Amiri','Georgia',serif", letterSpacing:'0.12em' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        <div style={{ display:'flex', gap:6, marginBottom:24,
          background:'rgba(255,255,255,0.04)', borderRadius:14, padding:5 }}>
          {['login','signup'].map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ flex:1, padding:'10px 20px', borderRadius:10,
                border:'none',
                background: mode===m ? t.accentGrad : 'transparent',
                color: mode===m ? '#fff' : t.textSub,
                fontWeight:700, cursor:'pointer', transition:'all 0.3s', fontSize:14,
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleAuth}>
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub, marginBottom:7, letterSpacing:'0.1em' }}>EMAIL</label>
            <div style={{ position:'relative' }}>
              <Mail size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width:'100%', padding:'13px 13px 13px 44px', borderRadius:12, boxSizing:'border-box',
                  background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                  fontSize:15, outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif" }}
                placeholder="your@email.com"/>
            </div>
          </div>
          <div style={{ marginBottom:22 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub, marginBottom:7, letterSpacing:'0.1em' }}>PASSWORD</label>
            <div style={{ position:'relative' }}>
              <Lock size={15} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width:'100%', padding:'13px 46px 13px 44px', borderRadius:12, boxSizing:'border-box',
                  background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                  fontSize:15, outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif" }}
                placeholder="••••••••"/>
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                {showPass ? <EyeOff size={15} color={t.accent}/> : <Eye size={15} color={t.accent}/>}
              </button>
            </div>
          </div>
          {error && <ErrorBanner msg={error}/>}
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:15, borderRadius:12, border:'none',
              background:t.accentGrad, color:'#fff', fontSize:16, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              boxShadow:`0 6px 20px ${t.accentBg}`, transition:'all 0.3s', marginTop:6,
              fontFamily:"'Inter','Segoe UI',sans-serif", letterSpacing:'0.03em' }}>
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
    </div>
  )
}

/* ─── Home Page ──────────────────────────────────────────────── */
function HomePage({ setActiveTab }) {
  const t = useTheme()
  const { user } = useAuth()
  const [expandedDay, setExpandedDay] = useState(null)
  const [showSurvey, setShowSurvey]   = useState(false)
  const [surveyStartDay, setSurveyStartDay] = useState('monday')
  const [stats, setStats]             = useState({ total_surveys:0 })
  const [profileData, setProfileData] = useState({ name:'', thali_number:'', avatar_url:'' })
  const [statsLoading, setStatsLoading] = useState(true)
  const [feedbackCounts, setFeedbackCounts] = useState({})
  const [surveyDaysCounts, setSurveyDaysCounts] = useState({})

  useEffect(() => { loadStats(); loadFeedbackCounts(); loadSurveyCounts() }, [user])

  const loadStats = async () => {
    try {
      const { data } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      if (data) {
        setStats(data)
        setProfileData({ name: data.name || '', thali_number: data.thali_number || '', avatar_url: data.avatar_url || '' })
      } else {
        const { data: ns } = await supabase.from('user_stats')
          .insert([{ user_id:user.id, total_surveys:0, name:'', thali_number:'' }])
          .select().single()
        if (ns) setStats(ns)
      }
    } catch (err) { console.error(err) }
    finally { setStatsLoading(false) }
  }

  const loadFeedbackCounts = async () => {
    try {
      const { data } = await supabase.from('daily_feedback').select('day,lunch_stars,dinner_stars').eq('user_id', user.id)
      const counts = {}
      ;(data || []).forEach(r => {
        if (!counts[r.day]) counts[r.day] = { lunch: false, dinner: false }
        if (r.lunch_stars) counts[r.day].lunch = true
        if (r.dinner_stars) counts[r.day].dinner = true
      })
      setFeedbackCounts(counts)
    } catch(err) { console.error(err) }
  }

  const loadSurveyCounts = async () => {
    try {
      const { data } = await supabase.from('survey_responses').select('day,meal').eq('user_id', user.id)
      const counts = {}
      ;(data || []).forEach(r => {
        if (!counts[r.day]) counts[r.day] = new Set()
        counts[r.day].add(r.meal)
      })
      setSurveyDaysCounts(counts)
    } catch(err) { console.error(err) }
  }

  // How many full days surveyed (both lunch+dinner = 1 day)
  const surveyedDaysCount = Object.values(surveyDaysCounts).filter(s => s.size >= 2).length
  // Total feedback filled = days with both lunch+dinner feedback
  const feedbackDaysCount = Object.values(feedbackCounts).filter(f => f.lunch && f.dinner).length

  const openSurveyFromDay = (day) => { setSurveyStartDay(day); setShowSurvey(true) }

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:800, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* ── Profile Preview Card ── */}
      <div style={{ marginBottom:18, padding:18, borderRadius:20,
        background:t.cardActive, border:`1px solid ${t.borderActive}`,
        boxShadow:'0 8px 32px rgba(0,0,0,0.18)', display:'flex', alignItems:'center', gap:16 }}>
        <Avatar avatarUrl={profileData.avatar_url} name={profileData.name} email={user.email} size={60}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:19, fontWeight:700, color:t.accent,
            fontFamily:"'Cormorant Garamond','Georgia',serif", lineHeight:1.2 }}>
            {profileData.name || 'Set your name →'}
          </div>
          <div style={{ fontSize:12, color:t.textSub, marginTop:3, opacity:0.75 }}>{user.email}</div>
          {profileData.thali_number && (
            <div style={{ fontSize:13, color:t.textSub, marginTop:3 }}>
              Thali No: <strong style={{ color:t.accent, fontWeight:800 }}>#{profileData.thali_number}</strong>
            </div>
          )}
        </div>
        <button onClick={() => setActiveTab('profile')}
          style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
            borderRadius:10, padding:'7px 13px', cursor:'pointer',
            color:t.accent, fontSize:12, fontWeight:700, whiteSpace:'nowrap',
            fontFamily:"'Inter','Segoe UI',sans-serif" }}>
          Edit
        </button>
      </div>

      {/* ── Stats Row ── */}
      {!statsLoading && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:20 }}>
          {/* Survey count */}
          <div style={{ padding:'16px 16px', background:t.card, borderRadius:16,
            border:`1px solid ${t.borderActive}`, display:'flex', alignItems:'center', gap:12 }}>
            <CircleIcon size={44} style={{ boxShadow:`0 4px 14px ${t.accentBg}` }}>
              <ClipboardList size={20} color="#fff"/>
            </CircleIcon>
            <div>
              <div style={{ fontSize:28, fontWeight:900, color:t.accent, lineHeight:1,
                fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
                {surveyedDaysCount}<span style={{ fontSize:14, color:t.textSub, fontWeight:600 }}>/6</span>
              </div>
              <div style={{ fontSize:11, color:t.textSub, marginTop:3, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                Survey Days
              </div>
            </div>
          </div>
          {/* Feedback count */}
          <div style={{ padding:'16px 16px', background:t.card, borderRadius:16,
            border:`1px solid ${t.borderActive}`, display:'flex', alignItems:'center', gap:12 }}>
            <CircleIcon size={44} bg="linear-gradient(135deg,#f43f5e,#e11d48)" style={{ boxShadow:'0 4px 14px rgba(244,63,94,0.2)' }}>
              <Star size={20} color="#fff"/>
            </CircleIcon>
            <div>
              <div style={{ fontSize:28, fontWeight:900, color:'#f43f5e', lineHeight:1,
                fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
                {feedbackDaysCount}<span style={{ fontSize:14, color:t.textSub, fontWeight:600 }}>/6</span>
              </div>
              <div style={{ fontSize:11, color:t.textSub, marginTop:3, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                Feedback Days
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Weekly Menu Header ── */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
        <img src="/al-mawaid.png" alt="Al-Mawaid"
          style={{ width:38, height:38, objectFit:'contain', flexShrink:0,
            filter:'drop-shadow(0 2px 8px rgba(201,168,76,0.4))' }}/>
        <div>
          <h2 style={{ margin:0, fontSize:17, fontWeight:700, color:t.accent, lineHeight:1.2,
            fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
            Weekly Menu Schedule
          </h2>
          <p style={{ margin:0, fontSize:12, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            Monday – Saturday · tap to expand
          </p>
        </div>
      </div>

      {/* ── Start Survey Button ── */}
      <button onClick={() => openSurveyFromDay('monday')}
        style={{ width:'100%', padding:14, borderRadius:14, border:'none', marginBottom:16,
          background:t.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
          cursor:'pointer', boxShadow:`0 6px 20px ${t.accentBg}`,
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          fontFamily:"'Inter','Segoe UI',sans-serif", letterSpacing:'0.02em' }}>
        <ClipboardList size={17} color="#fff"/>
        Start Weekly Survey
      </button>

      {/* ── Days Accordion ── */}
      {DAYS.map(day => {
        const menu = WEEKLY_MENU[day]
        const isExpanded = expandedDay === day
        const daySurvey = surveyDaysCounts[day]
        const dayFb = feedbackCounts[day]
        const surveyDone = daySurvey && daySurvey.size >= 2
        const lunchFbDone = dayFb?.lunch
        const dinnerFbDone = dayFb?.dinner

        return (
          <div key={day} style={{ marginBottom:10 }}>
            <button onClick={() => setExpandedDay(isExpanded ? null : day)}
              style={{ width:'100%', padding:'13px 16px', borderRadius:14,
                border:`1px solid ${isExpanded ? t.borderActive : t.border}`,
                background: isExpanded ? t.cardActive : t.card, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                transition:'all 0.3s', boxShadow: isExpanded ? `0 4px 16px ${t.accentBg}` : 'none' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
                <img src="/al-mawaid.png" alt=""
                  style={{ width:34, height:34, objectFit:'contain', flexShrink:0,
                    filter:'drop-shadow(0 2px 6px rgba(201,168,76,0.35))' }}/>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:t.accent,
                    fontFamily:"'Cormorant Garamond','Georgia',serif" }}>{menu.en}</div>
                  <div style={{ fontSize:11, color:t.textSub, fontFamily:"'Amiri','Georgia',serif", marginBottom:3 }}>{menu.ar}</div>
                  {/* Status badges */}
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    <span style={{ fontSize:10, padding:'2px 7px', borderRadius:10,
                      background: surveyDone ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.06)',
                      color: surveyDone ? '#22c55e' : t.textSub, fontWeight:700,
                      fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                      {surveyDone ? '✓ Survey' : '○ Survey'}
                    </span>
                    <span style={{ fontSize:10, padding:'2px 7px', borderRadius:10,
                      background: (lunchFbDone||dinnerFbDone) ? 'rgba(244,63,94,0.12)' : 'rgba(255,255,255,0.06)',
                      color: (lunchFbDone||dinnerFbDone) ? '#f43f5e' : t.textSub, fontWeight:700,
                      fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                      {lunchFbDone && dinnerFbDone ? '✓ Feedback' : lunchFbDone||dinnerFbDone ? '◑ Feedback' : '○ Feedback'}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <button onClick={e => { e.stopPropagation(); openSurveyFromDay(day) }}
                  style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
                    borderRadius:8, padding:'5px 10px', cursor:'pointer',
                    color:t.accent, fontSize:10, fontWeight:700, whiteSpace:'nowrap',
                    fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                  Survey
                </button>
                <div style={{ width:26, height:26, borderRadius:'50%', background:t.accentBg,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {isExpanded ? <ChevronUp size={13} color={t.accent}/> : <ChevronDown size={13} color={t.accent}/>}
                </div>
              </div>
            </button>

            {isExpanded && (
              <div style={{ marginTop:6, padding:16, background:t.inputBg,
                borderRadius:14, border:`1px solid ${t.border}` }}>
                {[['☀️ Lunch', menu.lunch], ['🌙 Dinner', menu.dinner]].map(([label, dishes], li) => (
                  <div key={label} style={{ marginBottom: li === 0 ? 14 : 0 }}>
                    <h4 style={{ margin:'0 0 8px', fontSize:13, fontWeight:700, color:t.accent,
                      fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                      {label}
                    </h4>
                    <ul style={{ margin:0, paddingLeft:18, lineHeight:2 }}>
                      {dishes.map(d => (
                        <li key={d} style={{ fontSize:14, color:t.textBody,
                          fontFamily:"'Inter','Segoe UI',sans-serif" }}>{d}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      {showSurvey && (
        <SurveyModal
          startDay={surveyStartDay}
          onClose={() => { setShowSurvey(false); loadStats(); loadSurveyCounts() }}/>
      )}
    </main>
  )
}

/* ─── Survey Modal ───────────────────────────────────────────── */
function SurveyModal({ startDay = 'monday', onClose }) {
  const t = useTheme()
  const { user } = useAuth()
  const [currentDay, setCurrentDay]   = useState(startDay)
  const [currentMeal, setCurrentMeal] = useState('lunch')
  const [responses, setResponses]     = useState({})
  const [wantsFood, setWantsFood]     = useState(null)
  const [loading, setLoading]         = useState(false)
  const [existingResponse, setExistingResponse] = useState(null)
  const [editBlocked, setEditBlocked] = useState(false)

  const currentDayIndex = DAYS.indexOf(currentDay)
  const menu = WEEKLY_MENU[currentDay]

  useEffect(() => { loadExisting() }, [currentDay, currentMeal])

  const loadExisting = async () => {
    setEditBlocked(false)
    try {
      const { data } = await supabase.from('survey_responses').select('*')
        .eq('user_id', user.id).eq('day', currentDay).eq('meal', currentMeal)
        .order('created_at', { ascending:false }).limit(1).single()
      if (data) {
        setExistingResponse(data)
        setWantsFood(data.wants_food)
        setResponses(data.dish_responses || {})
        if ((data.edit_count || 0) >= 1) setEditBlocked(true)
      }
      else { setExistingResponse(null); setWantsFood(null); setResponses({}); setEditBlocked(false) }
    } catch { setExistingResponse(null); setWantsFood(null); setResponses({}); setEditBlocked(false) }
  }

  const goToDay = (day) => { setCurrentDay(day); setCurrentMeal('lunch'); setWantsFood(null); setResponses({}) }

  const handleNext = async () => {
    if (wantsFood !== null) {
      if (existingResponse && (existingResponse.edit_count || 0) >= 1) {
        // Already edited once — skip save, just navigate
      } else {
        setLoading(true)
        try {
          const { error } = await supabase.from('survey_responses').upsert([{
            user_id:user.id, day:currentDay, meal:currentMeal, wants_food:wantsFood,
            dish_responses: wantsFood ? responses : {},
            edit_count: existingResponse ? (existingResponse.edit_count||0)+1 : 0
          }], { onConflict:'user_id,day,meal' })
          if (error) throw error
          if (!existingResponse) {
            await supabase.rpc('increment_user_surveys', { p_user_id:user.id })
          }
        } catch (err) { alert('Error saving: ' + err.message) }
        finally { setLoading(false) }
      }
    }
    if (currentMeal === 'lunch') {
      setCurrentMeal('dinner'); setWantsFood(null); setResponses({})
    } else if (currentDayIndex < DAYS.length - 1) {
      setCurrentDay(DAYS[currentDayIndex+1]); setCurrentMeal('lunch'); setWantsFood(null); setResponses({})
    } else {
      alert('🎉 Survey completed! Thank you.'); onClose()
    }
  }

  const handlePrev = () => {
    if (currentMeal === 'dinner') {
      setCurrentMeal('lunch'); setWantsFood(null); setResponses({})
    } else if (currentDayIndex > 0) {
      setCurrentDay(DAYS[currentDayIndex-1]); setCurrentMeal('dinner'); setWantsFood(null); setResponses({})
    }
  }

  const dishes = currentMeal === 'lunch' ? menu.lunch : menu.dinner
  const isFirst = currentDayIndex === 0 && currentMeal === 'lunch'
  const isLast  = currentDayIndex === DAYS.length-1 && currentMeal === 'dinner'

  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center',
      background:'rgba(0,0,0,0.78)', padding:20, backdropFilter:'blur(10px)', overflowY:'auto' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:t.card, borderRadius:22, padding:24, maxWidth:520, width:'100%',
          border:`1px solid ${t.borderActive}`, boxShadow:'0 24px 64px rgba(0,0,0,0.5)',
          maxHeight:'92vh', overflowY:'auto' }}>

        {/* Day navigation pills */}
        <div style={{ display:'flex', gap:5, overflowX:'auto', marginBottom:16, paddingBottom:4, scrollbarWidth:'none' }}>
          {DAYS.map((day) => (
            <button key={day} onClick={() => goToDay(day)}
              style={{ flexShrink:0, padding:'5px 11px', borderRadius:20,
                border:`1.5px solid ${currentDay===day ? t.accent : t.border}`,
                background: currentDay===day ? t.accentBg : 'transparent',
                color: currentDay===day ? t.accent : t.textSub,
                fontWeight:700, fontSize:11, cursor:'pointer',
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {WEEKLY_MENU[day].en.slice(0,3)}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <img src="/al-mawaid.png" alt="" style={{ width:26, height:26, objectFit:'contain' }}/>
              <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent,
                fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
                {menu.en}
              </h2>
            </div>
            <div style={{ fontSize:13, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {currentMeal === 'lunch' ? '☀️ Lunch' : '🌙 Dinner'}
              <span style={{ margin:'0 6px', opacity:0.4 }}>·</span>
              <span style={{ fontFamily:"'Amiri','Georgia',serif", fontSize:14 }}>{menu.ar}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
            <X size={20} color={t.text}/>
          </button>
        </div>

        {/* Edit blocked notice */}
        {editBlocked && (
          <div style={{ marginBottom:14, padding:12, borderRadius:10,
            background:'rgba(251,146,60,0.1)', border:'1px solid rgba(251,146,60,0.3)',
            color:'#fb923c', fontSize:13, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            ⚠️ You've used your 1 edit for this meal. View-only mode.
          </div>
        )}

        {/* Prev / Next nav */}
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          <button onClick={handlePrev} disabled={isFirst}
            style={{ flex:1, padding:'9px 12px', borderRadius:11, border:`1px solid ${t.border}`,
              background:'transparent', color: isFirst ? t.border : t.textSub, fontSize:13,
              fontWeight:600, cursor: isFirst ? 'not-allowed' : 'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            <ChevronLeft size={14}/> Prev
          </button>
          <button onClick={handleNext} disabled={loading}
            style={{ flex:1, padding:'9px 12px', borderRadius:11, border:`1px solid ${t.accent}`,
              background:t.accentBg, color:t.accent, fontSize:13,
              fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            {isLast ? 'Finish ✓' : 'Next'} {!isLast && <ChevronRight size={14}/>}
          </button>
        </div>

        {editBlocked ? (
          /* View only */
          <div style={{ padding:16, background:t.inputBg, borderRadius:14, border:`1px solid ${t.border}` }}>
            <p style={{ margin:'0 0 12px', fontSize:14, fontWeight:600, color:t.textSub,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {wantsFood ? 'Responded: Yes' : 'Responded: No (skipped)'}
            </p>
            {wantsFood && Object.entries(responses).map(([dish, val]) => (
              <div key={dish} style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'8px 0', borderBottom:`1px solid ${t.border}` }}>
                <span style={{ fontSize:14, color:t.text, fontFamily:"'Inter','Segoe UI',sans-serif" }}>{dish}</span>
                <span style={{ fontSize:13, fontWeight:700, color:t.accent,
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>{val === 'yes' ? '✅' : val === 'no' ? '❌' : `${val}%`}</span>
              </div>
            ))}
          </div>
        ) : wantsFood === null ? (
          <div>
            <p style={{ fontSize:15, fontWeight:600, color:t.text, marginBottom:16,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              Do you want {currentMeal} for {menu.en}?
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setWantsFood(true)}
                style={{ flex:1, padding:15, borderRadius:14, border:`1px solid ${t.accent}`,
                  background:t.accentBg, color:t.accent, fontSize:16, fontWeight:700, cursor:'pointer',
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                ✅ Yes
              </button>
              <button onClick={() => { setWantsFood(false); setTimeout(handleNext, 200) }}
                style={{ flex:1, padding:15, borderRadius:14, border:`1px solid ${t.border}`,
                  background:'transparent', color:t.text, fontSize:16, fontWeight:700, cursor:'pointer',
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                ❌ No
              </button>
            </div>
          </div>
        ) : wantsFood ? (
          <div>
            <p style={{ fontSize:13, fontWeight:600, color:t.textSub, marginBottom:12,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              Select portion for each dish:
            </p>
            {dishes.map(dish => (
              <div key={dish} style={{ marginBottom:12, padding:13, background:t.inputBg, borderRadius:12 }}>
                <p style={{ margin:'0 0 10px', fontSize:14, fontWeight:600, color:t.text,
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>{dish}</p>
                {isRotiItem(dish) ? (
                  <div style={{ display:'flex', gap:8 }}>
                    {['yes','no'].map(opt => (
                      <button key={opt} onClick={() => setResponses(prev => ({ ...prev, [dish]:opt }))}
                        style={{ flex:1, padding:'9px 4px', borderRadius:10,
                          border:`1.5px solid ${responses[dish]===opt ? (opt==='yes'?t.accent:'#ef4444') : t.border}`,
                          background: responses[dish]===opt ? (opt==='yes'?t.accentBg:'rgba(239,68,68,0.1)') : 'transparent',
                          color: responses[dish]===opt ? (opt==='yes'?t.accent:'#ef4444') : t.text,
                          fontSize:14, fontWeight:700, cursor:'pointer',
                          fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                        {opt === 'yes' ? '✅ Yes' : '❌ No'}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display:'flex', gap:6 }}>
                    {[0,25,50,100].map(pct => (
                      <button key={pct} onClick={() => setResponses(prev => ({ ...prev, [dish]:pct }))}
                        style={{ flex:1, padding:'8px 2px', borderRadius:10,
                          border:`1.5px solid ${responses[dish]===pct ? t.accent : t.border}`,
                          background: responses[dish]===pct ? t.accentBg : 'transparent',
                          color: responses[dish]===pct ? t.accent : t.text,
                          fontSize:13, fontWeight:700, cursor:'pointer',
                          fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                        {pct}%
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={handleNext}
              disabled={loading || Object.keys(responses).length < dishes.length}
              style={{ width:'100%', padding:14, borderRadius:12, border:'none', marginTop:8,
                background: Object.keys(responses).length < dishes.length ? t.border : t.accentGrad,
                color:'#fff', fontSize:14, fontWeight:700,
                cursor: Object.keys(responses).length < dishes.length ? 'not-allowed' : 'pointer',
                opacity: Object.keys(responses).length < dishes.length ? 0.5 : 1,
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {loading ? 'Saving…' : isLast ? 'Complete Survey ✓' : 'Save & Next →'}
            </button>
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:20, color:t.textSub,
            fontFamily:"'Inter','Segoe UI',sans-serif" }}>Skipping this meal…</div>
        )}
      </div>
    </div>
  )
}

/* ─── Feedback Page — Auto Today's Menu ──────────────────────── */
function FeedbackPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [loading, setLoading]         = useState(true)
  const [submitting, setSubmitting]   = useState(false)
  const [error, setError]             = useState('')
  const [submitted, setSubmitted]     = useState({ lunch: false, dinner: false })
  const [lunchStars,    setLunchStars]    = useState(0)
  const [dinnerStars,   setDinnerStars]   = useState(0)
  const [lunchComment,  setLunchComment]  = useState('')
  const [dinnerComment, setDinnerComment] = useState('')
  const [hoveredLunch,  setHoveredLunch]  = useState(0)
  const [hoveredDinner, setHoveredDinner] = useState(0)

  const todayKey = getTodayKey()
  const menu = WEEKLY_MENU[todayKey]

  const STAR_EMOJIS = { 1:'😡', 2:'😟', 3:'😐', 4:'😊', 5:'😍' }
  const STAR_LABELS = { 1:'Terrible', 2:'Poor', 3:'Okay', 4:'Good', 5:'Excellent!' }

  useEffect(() => { loadToday() }, [user])

  const loadToday = async () => {
    try {
      const { data } = await supabase.from('daily_feedback').select('*')
        .eq('user_id', user.id).eq('day', todayKey)
        .gte('created_at', new Date(Date.now() - 24*60*60*1000).toISOString())
        .order('created_at', { ascending:false }).limit(1).single()
      if (data) {
        setSubmitted({ lunch: !!data.lunch_stars, dinner: !!data.dinner_stars })
        if (data.lunch_stars) setLunchStars(data.lunch_stars)
        if (data.dinner_stars) setDinnerStars(data.dinner_stars)
        if (data.lunch_comment) setLunchComment(data.lunch_comment)
        if (data.dinner_comment) setDinnerComment(data.dinner_comment)
      }
    } catch { /* no existing */ }
    finally { setLoading(false) }
  }

  const handleSubmitMeal = async (meal) => {
    const stars = meal === 'lunch' ? lunchStars : dinnerStars
    if (!stars) return setError(`Please rate ${meal} first`)
    setError(''); setSubmitting(true)
    try {
      const comment = meal === 'lunch' ? lunchComment : dinnerComment
      const { error: dbErr } = await supabase.from('daily_feedback').upsert([{
        user_id:user.id, day:todayKey,
        ...(meal === 'lunch' ? {
          lunch_stars:lunchStars, lunch_emoji:STAR_EMOJIS[lunchStars], lunch_comment:lunchComment.trim()
        } : {
          dinner_stars:dinnerStars, dinner_emoji:STAR_EMOJIS[dinnerStars], dinner_comment:dinnerComment.trim()
        })
      }], { onConflict:'user_id,day' })
      if (dbErr) throw dbErr
      setSubmitted(prev => ({ ...prev, [meal]:true }))
      setError('')
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const StarRating = ({ value, hovered, onHover, onChange, disabled }) => {
    const display = hovered || value
    return (
      <div>
        <div style={{ display:'flex', gap:8, marginBottom: display ? 10 : 0 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n}
              onClick={() => !disabled && onChange(n)}
              onMouseEnter={() => !disabled && onHover(n)}
              onMouseLeave={() => !disabled && onHover(0)}
              disabled={disabled}
              style={{ background:'none', border:'none', cursor: disabled ? 'default' : 'pointer', padding:2, lineHeight:0 }}>
              <Star size={30}
                fill={n <= (hovered || value) ? t.accent : 'none'}
                color={n <= (hovered || value) ? t.accent : t.border}
                strokeWidth={1.5}/>
            </button>
          ))}
        </div>
        {display > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
            background:t.accentBg, borderRadius:12, border:`1px solid ${t.accentBorder}` }}>
            <span style={{ fontSize:28 }}>{STAR_EMOJIS[display]}</span>
            <span style={{ fontSize:15, color:t.accent, fontWeight:700,
              fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
              {STAR_LABELS[display]}
            </span>
          </div>
        )}
      </div>
    )
  }

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* Today Header */}
      <div style={{ marginBottom:20, padding:'18px 20px', borderRadius:20,
        background:t.cardActive, border:`1px solid ${t.borderActive}`,
        textAlign:'center' }}>
        <div style={{ fontSize:12, color:t.textSub, letterSpacing:'0.12em', marginBottom:4,
          fontFamily:"'Inter','Segoe UI',sans-serif", fontWeight:700 }}>TODAY'S FEEDBACK</div>
        <div style={{ fontSize:26, fontWeight:700, color:t.accent,
          fontFamily:"'Cormorant Garamond','Georgia',serif" }}>{menu.en}</div>
        <div style={{ fontSize:16, color:t.textSub, fontFamily:"'Amiri','Georgia',serif",
          marginTop:4 }}>{menu.ar}</div>
        <div style={{ fontSize:12, color:t.textSub, marginTop:6, opacity:0.6,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>
          Feedback expires after 24 hours
        </div>
      </div>

      {/* Lunch Card */}
      <div style={{ marginBottom:14, padding:20, background:t.card, borderRadius:18,
        border:`1px solid ${submitted.lunch ? 'rgba(34,197,94,0.4)' : t.borderActive}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#f59e0b,#d97706)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>☀️</div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:t.accent,
              fontFamily:"'Cormorant Garamond','Georgia',serif" }}>Lunch</div>
            <div style={{ fontSize:12, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {menu.lunch.slice(0,3).join(' · ')}{menu.lunch.length > 3 ? ' …' : ''}
            </div>
          </div>
          {submitted.lunch && (
            <div style={{ marginLeft:'auto', fontSize:12, color:'#22c55e', fontWeight:700,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>✓ Submitted</div>
          )}
        </div>
        <div style={{ marginBottom:14 }}>
          <StarRating value={lunchStars} hovered={hoveredLunch} onHover={setHoveredLunch}
            onChange={setLunchStars} disabled={submitted.lunch}/>
        </div>
        {!submitted.lunch && (
          <>
            <textarea value={lunchComment} onChange={e => setLunchComment(e.target.value)}
              style={{ width:'100%', padding:'11px 13px', borderRadius:12, boxSizing:'border-box',
                background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                fontSize:14, resize:'none', outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif", minHeight:60 }}
              placeholder="Comment on lunch (optional)…"/>
            <button onClick={() => handleSubmitMeal('lunch')} disabled={submitting || !lunchStars}
              style={{ width:'100%', padding:12, borderRadius:12, border:'none', marginTop:10,
                background: !lunchStars ? t.border : t.accentGrad, color:'#fff',
                fontSize:14, fontWeight:700, cursor: !lunchStars ? 'not-allowed' : 'pointer',
                opacity: !lunchStars ? 0.5 : 1, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              Submit Lunch Feedback
            </button>
          </>
        )}
      </div>

      {/* Dinner Card */}
      <div style={{ marginBottom:14, padding:20, background:t.card, borderRadius:18,
        border:`1px solid ${submitted.dinner ? 'rgba(34,197,94,0.4)' : t.borderActive}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <div style={{ width:40, height:40, borderRadius:12, background:'linear-gradient(135deg,#6366f1,#4338ca)',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20 }}>🌙</div>
          <div>
            <div style={{ fontSize:17, fontWeight:700, color:t.accent,
              fontFamily:"'Cormorant Garamond','Georgia',serif" }}>Dinner</div>
            <div style={{ fontSize:12, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {menu.dinner.slice(0,3).join(' · ')}{menu.dinner.length > 3 ? ' …' : ''}
            </div>
          </div>
          {submitted.dinner && (
            <div style={{ marginLeft:'auto', fontSize:12, color:'#22c55e', fontWeight:700,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>✓ Submitted</div>
          )}
        </div>
        <div style={{ marginBottom:14 }}>
          <StarRating value={dinnerStars} hovered={hoveredDinner} onHover={setHoveredDinner}
            onChange={setDinnerStars} disabled={submitted.dinner}/>
        </div>
        {!submitted.dinner && (
          <>
            <textarea value={dinnerComment} onChange={e => setDinnerComment(e.target.value)}
              style={{ width:'100%', padding:'11px 13px', borderRadius:12, boxSizing:'border-box',
                background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                fontSize:14, resize:'none', outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif", minHeight:60 }}
              placeholder="Comment on dinner (optional)…"/>
            <button onClick={() => handleSubmitMeal('dinner')} disabled={submitting || !dinnerStars}
              style={{ width:'100%', padding:12, borderRadius:12, border:'none', marginTop:10,
                background: !dinnerStars ? t.border : t.accentGrad, color:'#fff',
                fontSize:14, fontWeight:700, cursor: !dinnerStars ? 'not-allowed' : 'pointer',
                opacity: !dinnerStars ? 0.5 : 1, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              Submit Dinner Feedback
            </button>
          </>
        )}
      </div>

      {error && <ErrorBanner msg={error}/>}

      {submitted.lunch && submitted.dinner && (
        <div style={{ textAlign:'center', padding:'24px 20px', background:t.card,
          borderRadius:18, border:'1px solid rgba(34,197,94,0.35)' }}>
          <div style={{ fontSize:44, marginBottom:10 }}>✅</div>
          <div style={{ fontSize:18, fontWeight:700, color:'#22c55e', marginBottom:5,
            fontFamily:"'Cormorant Garamond','Georgia',serif" }}>All Done for Today!</div>
          <div style={{ fontSize:14, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            Your feedback has been recorded. See you tomorrow!
          </div>
        </div>
      )}
    </main>
  )
}

/* ─── Profile Page ───────────────────────────────────────────── */
function ProfilePage({ theme, setTheme }) {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [activeSubPage, setActiveSubPage] = useState('main')

  if (activeSubPage === 'surveys') return <MySurveysPage onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'requests') return <MyRequestsPage onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'khidmat') return <KhidmatPage onBack={() => setActiveSubPage('main')}/>

  return <ProfileMainPage theme={theme} setTheme={setTheme} onNav={setActiveSubPage}/>
}

/* ─── Profile Main ───────────────────────────────────────────── */
function ProfileMainPage({ theme, setTheme, onNav }) {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [stats, setStats]       = useState(null)
  const [loading, setLoading]   = useState(true)
  const [name, setName]         = useState('')
  const [thaliNum, setThaliNum] = useState('')
  const [phone, setPhone]       = useState('')
  const [address, setAddress]   = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      .then(({ data }) => {
        if (data) {
          setStats(data); setName(data.name || ''); setThaliNum(data.thali_number || '')
          setPhone(data.phone || ''); setAddress(data.address || ''); setAvatarUrl(data.avatar_url || '')
        }
      }).finally(() => setLoading(false))
  }, [])

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `avatars/${user.id}.${ext}`
      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert:true })
      if (upErr) throw upErr
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(path)
      const url = urlData.publicUrl + '?t=' + Date.now()
      setAvatarUrl(url)
      await supabase.from('user_stats').upsert([{ user_id:user.id, avatar_url:url }], { onConflict:'user_id' })
    } catch (err) { alert('Upload failed: ' + err.message) }
    finally { setUploading(false) }
  }

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('user_stats').upsert([{
      user_id:user.id, name:name.trim(), thali_number:thaliNum.trim(),
      phone:phone.trim(), address:address.trim(), avatar_url:avatarUrl
    }], { onConflict:'user_id' })
    setSaving(false); setSaved(true); setEditMode(false)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <Spinner/>

  const inp = {
    width:'100%', padding:'12px 14px', borderRadius:12, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
    fontSize:15, outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif"
  }

  const NavCard = ({ label, icon, desc, onClick }) => (
    <button onClick={onClick}
      style={{ width:'100%', padding:'14px 18px', borderRadius:16, border:`1px solid ${t.border}`,
        background:t.card, cursor:'pointer', display:'flex', alignItems:'center', gap:14,
        marginBottom:10, textAlign:'left', transition:'all 0.2s' }}>
      <div style={{ width:44, height:44, borderRadius:12, background:t.accentGrad,
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        {icon}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:15, fontWeight:700, color:t.text,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>{label}</div>
        <div style={{ fontSize:12, color:t.textSub, marginTop:2,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>{desc}</div>
      </div>
      <ChevronRight size={16} color={t.textSub}/>
    </button>
  )

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* Profile avatar + info */}
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <div style={{ position:'relative', width:96, height:96, margin:'0 auto 14px' }}>
          <Avatar avatarUrl={avatarUrl} name={name} email={user.email} size={96}/>
          <button onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{ position:'absolute', bottom:0, right:0, width:30, height:30, borderRadius:'50%',
              background:t.accentGrad, border:`2px solid ${t.card}`,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
            {uploading ? <div className="spin" style={{ width:14,height:14,border:`2px solid rgba(255,255,255,0.3)`,borderTop:'2px solid #fff',borderRadius:'50%' }}/> : <Upload size={13} color="#fff"/>}
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display:'none' }}/>
        </div>
        <h2 style={{ margin:'0 0 4px', fontSize:22, fontWeight:700, color:t.text,
          fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
          {name || 'Your Name'}
        </h2>
        <div style={{ fontSize:14, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>{user.email}</div>
        {thaliNum && (
          <div style={{ display:'inline-block', marginTop:8, padding:'4px 16px', borderRadius:20,
            background:t.accentBg, border:`1px solid ${t.accentBorder}` }}>
            <span style={{ fontSize:13, color:t.accent, fontWeight:800,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>Thali #{thaliNum}</span>
          </div>
        )}
        <p style={{ margin:'8px 0 0', fontSize:12, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
          Member since {new Date(user.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
        </p>
      </div>

      {/* Navigation Cards */}
      <div style={{ marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:t.textSub, letterSpacing:'0.12em', marginBottom:12,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>MY ACTIVITY</div>
        <NavCard label="My Surveys" icon={<ClipboardList size={20} color="#fff"/>}
          desc="View all your submitted surveys"
          onClick={() => onNav('surveys')}/>
        <NavCard label="My Requests" icon={<FileText size={20} color="#fff"/>}
          desc="View resume, stop & extra food requests"
          onClick={() => onNav('requests')}/>
        <NavCard label="Khidmat Guzaar" icon={<Users size={20} color="#fff"/>}
          desc="Meet our service team"
          onClick={() => onNav('khidmat')}/>
      </div>

      {/* Profile edit form */}
      <div style={{ marginBottom:20, padding:20, background:t.card, borderRadius:18, border:`1px solid ${t.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <h3 style={{ margin:0, fontSize:17, fontWeight:700, color:t.accent,
            fontFamily:"'Cormorant Garamond','Georgia',serif" }}>Profile Details</h3>
          {!editMode && (
            <button onClick={() => setEditMode(true)}
              style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
                borderRadius:10, padding:'7px 14px', cursor:'pointer', color:t.accent,
                fontSize:13, fontWeight:700, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              Edit
            </button>
          )}
        </div>
        {[
          { label:'Full Name', value:name, setter:setName, placeholder:'Your full name' },
          { label:'Thali Number', value:thaliNum, setter:setThaliNum, placeholder:'e.g. 42' },
          { label:'Phone', value:phone, setter:setPhone, placeholder:'Your contact number' },
          { label:'Address / Room', value:address, setter:setAddress, placeholder:'Your address or room number' },
        ].map(({ label, value, setter, placeholder }) => (
          <div key={label} style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub,
              marginBottom:7, letterSpacing:'0.1em', fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {label.toUpperCase()}
            </label>
            {editMode ? (
              <input value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} style={inp}/>
            ) : (
              <div style={{ padding:'12px 14px', borderRadius:12, background:t.inputBg,
                border:`1px solid ${t.border}`, fontSize:15, color: value ? t.text : t.textSub,
                opacity: value ? 1 : 0.5, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                {value || placeholder}
              </div>
            )}
          </div>
        ))}
        {editMode && (
          <div style={{ display:'flex', gap:10, marginTop:6 }}>
            <button onClick={handleSave} disabled={saving}
              style={{ flex:1, padding:13, borderRadius:12, border:'none',
                background: saving ? t.border : t.accentGrad, color:'#fff',
                fontWeight:700, cursor:'pointer', fontSize:15,
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {saving ? 'Saving…' : saved ? '✅ Saved!' : 'Save Profile'}
            </button>
            <button onClick={() => setEditMode(false)}
              style={{ padding:'13px 18px', borderRadius:12, border:`1px solid ${t.border}`,
                background:'transparent', color:t.textSub, fontWeight:600, cursor:'pointer',
                fontSize:15, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Theme Switcher */}
      <div style={{ marginBottom:20, padding:20, background:t.card, borderRadius:18, border:`1px solid ${t.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
          <Palette size={17} color={t.accent}/>
          <h3 style={{ margin:0, fontSize:17, fontWeight:700, color:t.accent,
            fontFamily:"'Cormorant Garamond','Georgia',serif" }}>App Theme</h3>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {Object.values(THEMES).map(th => (
            <button key={th.id} onClick={() => setTheme(th.id)}
              style={{ padding:'13px 16px', borderRadius:14,
                border:`2px solid ${theme===th.id ? th.accent : t.border}`,
                background: theme===th.id ? th.accentBg : t.inputBg,
                cursor:'pointer', display:'flex', alignItems:'center', gap:14, transition:'all 0.3s' }}>
              <div style={{ display:'flex', gap:5, flexShrink:0 }}>
                {[th.bg, th.accent, th.card].map((c,i) => (
                  <div key={i} style={{ width:22, height:22, borderRadius:'50%', background:c,
                    border:'2px solid rgba(255,255,255,0.15)' }}/>
                ))}
              </div>
              <div style={{ flex:1, textAlign:'left', fontSize:14, fontWeight:700,
                color: theme===th.id ? th.accent : t.text, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                {th.icon} {th.name}
              </div>
              {theme===th.id && <Check size={16} color={th.accent}/>}
            </button>
          ))}
        </div>
      </div>

      <button onClick={signOut}
        style={{ width:'100%', padding:15, borderRadius:14,
          border:'1px solid rgba(239,68,68,0.3)', background:'rgba(239,68,68,0.07)',
          color:'#ef4444', fontSize:15, fontWeight:700, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>
        <LogOut size={16}/> Sign Out
      </button>
    </main>
  )
}

/* ─── My Surveys Sub-Page ────────────────────────────────────── */
function MySurveysPage({ onBack }) {
  const t = useTheme()
  const { user } = useAuth()
  const [surveys, setSurveys] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('survey_responses').select('*').eq('user_id', user.id)
      .order('created_at', { ascending:false })
      .then(({ data }) => {
        const grouped = {}
        ;(data || []).forEach(r => {
          if (!grouped[r.day]) grouped[r.day] = {}
          grouped[r.day][r.meal] = r
        })
        setSurveys(grouped)
      }).finally(() => setLoading(false))
  }, [])

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={22} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:t.accent,
          fontFamily:"'Cormorant Garamond','Georgia',serif" }}>My Surveys</h2>
      </div>
      {loading ? <Spinner/> : DAYS.map(day => {
        const dayData = surveys[day]
        if (!dayData) return null
        return (
          <div key={day} style={{ marginBottom:14, padding:18, background:t.card,
            borderRadius:16, border:`1px solid ${t.borderActive}` }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
              <img src="/al-mawaid.png" alt="" style={{ width:30, height:30, objectFit:'contain' }}/>
              <div style={{ fontSize:17, fontWeight:700, color:t.accent,
                fontFamily:"'Cormorant Garamond','Georgia',serif" }}>{WEEKLY_MENU[day].en}</div>
            </div>
            {['lunch','dinner'].map(meal => {
              const r = dayData[meal]
              if (!r) return null
              return (
                <div key={meal} style={{ marginBottom:10, padding:12, background:t.inputBg,
                  borderRadius:12, border:`1px solid ${t.border}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:t.accent,
                      fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                      {meal === 'lunch' ? '☀️ Lunch' : '🌙 Dinner'}
                    </span>
                    <span style={{ fontSize:11, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                      {r.edit_count >= 1 ? '(edited)' : ''}
                      {(r.edit_count||0) < 1
                        ? <span style={{ color:t.accent }}> 1 edit left</span>
                        : <span style={{ color:'#ef4444' }}> no edits left</span>}
                    </span>
                  </div>
                  <div style={{ fontSize:14, color: r.wants_food ? '#22c55e' : '#ef4444', fontWeight:700,
                    fontFamily:"'Inter','Segoe UI',sans-serif", marginBottom: r.wants_food ? 8 : 0 }}>
                    {r.wants_food ? 'Requested Food' : 'Skipped'}
                  </div>
                  {r.wants_food && r.dish_responses && Object.entries(r.dish_responses).map(([dish, val]) => (
                    <div key={dish} style={{ display:'flex', justifyContent:'space-between',
                      padding:'5px 0', borderBottom:`1px solid ${t.border}` }}>
                      <span style={{ fontSize:13, color:t.textBody, fontFamily:"'Inter','Segoe UI',sans-serif" }}>{dish}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:t.accent,
                        fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                        {val === 'yes' ? '✅' : val === 'no' ? '❌' : `${val}%`}
                      </span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )
      })}
      {Object.keys(surveys).length === 0 && !loading && (
        <div style={{ textAlign:'center', padding:48, color:t.textSub, fontSize:15,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>No surveys submitted yet.</div>
      )}
    </main>
  )
}

/* ─── My Requests Sub-Page ───────────────────────────────────── */
function MyRequestsPage({ onBack }) {
  const t = useTheme()
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('thali_requests').select('*').eq('user_id', user.id)
      .order('created_at', { ascending:false })
      .then(({ data }) => setRequests(data || []))
      .finally(() => setLoading(false))
  }, [])

  const statusColor = s => s==='pending' ? '#f59e0b' : s==='approved' ? '#22c55e' : '#ef4444'
  const typeLabel = t => t === 'resume' ? '▶️ Resume' : t === 'stop' ? '⏹️ Stop' : '➕ Extra Food'

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={22} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:t.accent,
          fontFamily:"'Cormorant Garamond','Georgia',serif" }}>My Requests</h2>
      </div>
      {loading ? <Spinner/> : requests.length === 0 ? (
        <div style={{ textAlign:'center', padding:48, color:t.textSub, fontSize:15,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>No requests submitted yet.</div>
      ) : requests.map(r => (
        <div key={r.id} style={{ marginBottom:12, padding:16, background:t.card,
          borderRadius:14, border:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <span style={{ fontSize:15, fontWeight:700, color:t.text,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>{typeLabel(r.request_type)}</span>
            <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20,
              background:`${statusColor(r.status)}22`, color:statusColor(r.status),
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {r.status?.toUpperCase()}
            </span>
          </div>
          {r.from_date && (
            <div style={{ fontSize:13, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {r.from_date} → {r.to_date}
            </div>
          )}
          {r.extra_items && (
            <div style={{ fontSize:13, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {r.extra_items.map(i => `${i.name} ×${i.qty}`).join(', ')}
            </div>
          )}
          <div style={{ fontSize:11, color:t.textSub, marginTop:6, opacity:0.6,
            fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            {new Date(r.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
          </div>
        </div>
      ))}
    </main>
  )
}

/* ─── Khidmat Guzaar Sub-Page ────────────────────────────────── */
function KhidmatPage({ onBack }) {
  const t = useTheme()
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('khidmat_guzaar').select('*').order('name', { ascending:true })
      .then(({ data }) => setStaff(data || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={22} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:22, fontWeight:700, color:t.accent,
          fontFamily:"'Cormorant Garamond','Georgia',serif" }}>Khidmat Guzaar</h2>
      </div>
      <div style={{ marginBottom:20, padding:14, borderRadius:14, background:t.accentBg,
        border:`1px solid ${t.accentBorder}`, fontSize:14, color:t.accent,
        fontFamily:"'Inter','Segoe UI',sans-serif" }}>
        🤝 Our dedicated service team — the ones who make every meal possible.
      </div>
      {loading ? <Spinner/> : staff.length === 0 ? (
        <div style={{ textAlign:'center', padding:48, color:t.textSub, fontSize:15,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>No staff profiles available.</div>
      ) : staff.map(member => (
        <div key={member.id} style={{ marginBottom:14, padding:18, background:t.card,
          borderRadius:18, border:`1px solid ${t.borderActive}`,
          display:'flex', alignItems:'center', gap:16 }}>
          <Avatar avatarUrl={member.avatar_url} name={member.name} email="" size={64}/>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:17, fontWeight:700, color:t.accent,
              fontFamily:"'Cormorant Garamond','Georgia',serif" }}>{member.name}</div>
            {member.role && (
              <div style={{ display:'inline-block', marginTop:5, padding:'3px 12px',
                borderRadius:20, background:t.accentBg, border:`1px solid ${t.accentBorder}` }}>
                <span style={{ fontSize:12, fontWeight:700, color:t.accent,
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>{member.role}</span>
              </div>
            )}
            {member.phone && (
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:7 }}>
                <Phone size={13} color={t.textSub}/>
                <span style={{ fontSize:13, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                  {member.phone}
                </span>
              </div>
            )}
            {member.area && (
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:4 }}>
                <MapPin size={13} color={t.textSub}/>
                <span style={{ fontSize:13, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                  {member.area}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </main>
  )
}

/* ─── Post / Requests Page ───────────────────────────────────── */
function PostPage() {
  const t = useTheme()
  const [subTab, setSubTab] = useState('requests')
  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', gap:6, marginBottom:20, background:t.card,
        borderRadius:14, padding:6, border:`1px solid ${t.border}` }}>
        {[{ id:'requests', label:'📋 Requests' }, { id:'queries', label:'❓ Queries' }].map(({ id, label }) => (
          <button key={id} onClick={() => setSubTab(id)}
            style={{ flex:1, padding:'11px 12px', borderRadius:10, border:'none',
              background: subTab===id ? t.accentGrad : 'transparent',
              color: subTab===id ? '#fff' : t.textSub,
              fontWeight:700, fontSize:14, cursor:'pointer',
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
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
        payload = { ...payload, from_date:resumeFrom, to_date:resumeTo }
      } else if (type === 'stop') {
        if (!stopFrom || !stopTo) throw new Error('Please select both From and To dates')
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
  const inp = { width:'100%', padding:'11px 13px', borderRadius:12, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text, fontSize:14,
    outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif" }

  const Card = ({ type, children }) => (
    <div style={{ marginBottom:12, borderRadius:16,
      border:`1px solid ${activeRequest===type ? t.borderActive : t.border}`,
      background: activeRequest===type ? t.cardActive : t.card, overflow:'hidden' }}>
      {children}
    </div>
  )
  const HdrBtn = ({ type, emoji, label, desc }) => (
    <button onClick={() => openRequest(type)}
      style={{ width:'100%', padding:17, background:'transparent', border:'none',
        cursor:'pointer', display:'flex', alignItems:'center', gap:14, textAlign:'left' }}>
      <CircleIcon size={46}><span style={{ fontSize:20 }}>{emoji}</span></CircleIcon>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:16, fontWeight:700, color: activeRequest===type ? t.accent : t.text,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>{label}</div>
        <div style={{ fontSize:13, color:t.textSub, marginTop:2,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>{desc}</div>
      </div>
      <div style={{ width:28, height:28, borderRadius:'50%', background:t.accentBg,
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        {activeRequest===type ? <ChevronUp size={14} color={t.accent}/> : <ChevronDown size={14} color={t.accent}/>}
      </div>
    </button>
  )

  return (
    <div>
      {success && (
        <div style={{ marginBottom:14, padding:14, borderRadius:12,
          background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.3)',
          color:'#22c55e', fontSize:14, fontWeight:600,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>{success}</div>
      )}

      <Card type="resume">
        <HdrBtn type="resume" emoji="▶️" label="Resume Thali" desc="Restart your thali service"/>
        {activeRequest === 'resume' && (
          <div style={{ padding:'0 18px 18px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub,
                  marginBottom:7, letterSpacing:'0.1em', fontFamily:"'Inter','Segoe UI',sans-serif" }}>FROM</label>
                <input type="date" value={resumeFrom} min={today} onChange={e => setResumeFrom(e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub,
                  marginBottom:7, letterSpacing:'0.1em', fontFamily:"'Inter','Segoe UI',sans-serif" }}>TO</label>
                <input type="date" value={resumeTo} min={resumeFrom||today} onChange={e => setResumeTo(e.target.value)} style={inp}/>
              </div>
            </div>
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('resume')} disabled={submitting}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none',
                background: submitting ? t.border : t.accentGrad, color:'#fff',
                fontWeight:700, cursor:'pointer', fontSize:15, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {submitting ? 'Submitting…' : '✅ Submit Resume Request'}
            </button>
          </div>
        )}
      </Card>

      <Card type="stop">
        <HdrBtn type="stop" emoji="⏹️" label="Stop Thali" desc="Pause your thali service"/>
        {activeRequest === 'stop' && (
          <div style={{ padding:'0 18px 18px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub,
                  marginBottom:7, letterSpacing:'0.1em', fontFamily:"'Inter','Segoe UI',sans-serif" }}>FROM</label>
                <input type="date" value={stopFrom} min={today} onChange={e => setStopFrom(e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:11, fontWeight:700, color:t.textSub,
                  marginBottom:7, letterSpacing:'0.1em', fontFamily:"'Inter','Segoe UI',sans-serif" }}>TO</label>
                <input type="date" value={stopTo} min={stopFrom||today} onChange={e => setStopTo(e.target.value)} style={inp}/>
              </div>
            </div>
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('stop')} disabled={submitting}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none',
                background: submitting ? t.border : 'linear-gradient(135deg,#ef4444,#dc2626)',
                color:'#fff', fontWeight:700, cursor:'pointer', fontSize:15,
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {submitting ? 'Submitting…' : '⏹️ Submit Stop Request'}
            </button>
          </div>
        )}
      </Card>

      <Card type="extra">
        <HdrBtn type="extra" emoji="➕" label="Add Extra Food" desc="Request additional items"/>
        {activeRequest === 'extra' && (
          <div style={{ padding:'0 18px 18px' }}>
            {extraItems.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:10 }}>
                <input type="text" value={item.name} placeholder={`Item ${i+1}`}
                  onChange={e => updateExtraItem(i,'name',e.target.value)} style={{ ...inp, flex:1 }}/>
                <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                  {[1,2,3,4].map(n => (
                    <button key={n} onClick={() => updateExtraItem(i,'qty',n)}
                      style={{ width:34, height:38, borderRadius:10,
                        border:`1.5px solid ${item.qty===n ? t.accent : t.border}`,
                        background: item.qty===n ? t.accentBg : 'transparent',
                        color: item.qty===n ? t.accent : t.textSub,
                        fontWeight:700, fontSize:14, cursor:'pointer',
                        fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                      {n}
                    </button>
                  ))}
                </div>
                {extraItems.length > 1 && (
                  <button onClick={() => removeExtraItem(i)}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
                    <X size={16} color="#ef4444"/>
                  </button>
                )}
              </div>
            ))}
            {extraItems.length < 6 && (
              <button onClick={addExtraItem}
                style={{ width:'100%', padding:11, borderRadius:12,
                  border:`1px dashed ${t.accent}`, background:'transparent',
                  color:t.accent, fontWeight:600, fontSize:14, cursor:'pointer', marginBottom:12,
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                + Add Another Item
              </button>
            )}
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('extra')} disabled={submitting}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none',
                background: submitting ? t.border : t.accentGrad, color:'#fff',
                fontWeight:700, cursor:'pointer', fontSize:15,
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {submitting ? 'Submitting…' : '➕ Submit Extra Food Request'}
            </button>
          </div>
        )}
      </Card>
    </div>
  )
}

/* ─── Queries Section — Queries Only ────────────────────────── */
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
        const { error:upErr } = await supabase.storage.from('query-media').upload(path, item.file)
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
      {/* Compose Query */}
      <div style={{ marginBottom:20, padding:18, background:t.card, borderRadius:16, border:`1px solid ${t.border}` }}>
        <h3 style={{ margin:'0 0 14px', fontSize:16, fontWeight:700, color:t.accent,
          fontFamily:"'Cormorant Garamond','Georgia',serif" }}>✉️ New Query</h3>
        <textarea value={comment} onChange={e => setComment(e.target.value)}
          style={{ width:'100%', minHeight:84, padding:13, borderRadius:12, boxSizing:'border-box',
            background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
            fontSize:15, resize:'vertical', outline:'none', fontFamily:"'Inter','Segoe UI',sans-serif", marginBottom:10 }}
          placeholder="Describe your query or issue…"/>
        {mediaFiles.length > 0 && (
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {mediaFiles.map((item, i) => (
              <div key={i} style={{ position:'relative', width:74, height:74, borderRadius:12, overflow:'hidden',
                border:`1px solid ${t.border}`, flexShrink:0 }}>
                {item.type === 'image'
                  ? <img src={item.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:'100%', background:t.inputBg,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>🎬</div>}
                <button onClick={() => removeMedia(i)}
                  style={{ position:'absolute', top:3, right:3, width:20, height:20, borderRadius:'50%',
                    background:'rgba(0,0,0,0.7)', border:'none', cursor:'pointer',
                    display:'flex', alignItems:'center', justifyContent:'center', padding:0 }}>
                  <X size={11} color="#fff"/>
                </button>
              </div>
            ))}
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple onChange={handleFileSelect} style={{ display:'none' }}/>
        {mediaFiles.length < 4 && (
          <button onClick={() => fileInputRef.current?.click()}
            style={{ width:'100%', padding:11, borderRadius:12,
              border:`1px dashed ${t.accentBorder}`, background:t.accentBg,
              color:t.accent, fontWeight:600, fontSize:14, cursor:'pointer', marginBottom:10,
              display:'flex', alignItems:'center', justifyContent:'center', gap:8,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
            <Camera size={15}/> Attach Photo / Video ({mediaFiles.length}/4)
          </button>
        )}
        {error   && <ErrorBanner msg={error}/>}
        {success && (
          <div style={{ marginBottom:10, padding:11, borderRadius:10,
            background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.3)',
            color:'#22c55e', fontSize:14, fontWeight:600, fontFamily:"'Inter','Segoe UI',sans-serif" }}>{success}</div>
        )}
        <button onClick={handleSubmit} disabled={submitting}
          style={{ width:'100%', padding:13, borderRadius:12, border:'none',
            background: submitting ? t.border : t.accentGrad, color:'#fff',
            fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer', fontSize:15,
            fontFamily:"'Inter','Segoe UI',sans-serif" }}>
          {submitting ? 'Submitting…' : '📨 Submit Query'}
        </button>
      </div>

      {/* Queries List Only */}
      <div style={{ fontSize:11, fontWeight:700, color:t.textSub, letterSpacing:'0.12em', marginBottom:12,
        fontFamily:"'Inter','Segoe UI',sans-serif" }}>MY QUERIES</div>
      {loading ? <Spinner/> : queries.length === 0 ? (
        <div style={{ textAlign:'center', padding:40, color:t.textSub, fontSize:15,
          fontFamily:"'Inter','Segoe UI',sans-serif" }}>No queries yet.</div>
      ) : queries.map(q => (
        <div key={q.id} style={{ marginBottom:10, padding:16, background:t.card,
          borderRadius:14, border:`1px solid ${t.border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
            <span style={{ fontSize:12, color:t.textSub, fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {new Date(q.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
            </span>
            <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20,
              background:`${statusColor(q.status)}22`, color:statusColor(q.status),
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
              {q.status?.toUpperCase()}
            </span>
          </div>
          {q.comment && (
            <p style={{ margin:'0 0 8px', fontSize:15, color:t.textBody, lineHeight:1.65,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>{q.comment}</p>
          )}
          {q.media && q.media.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:8 }}>
              {q.media.map((m,i) => m.path && m.type === 'image' && (
                <img key={i} src={m.path} alt="" style={{ width:60, height:60, borderRadius:8, objectFit:'cover' }}/>
              ))}
            </div>
          )}
          {q.admin_reply && (
            <div style={{ marginTop:10, padding:12, borderRadius:10, background:t.accentBg,
              border:`1px solid ${t.accentBorder}`, fontSize:14, color:t.accent,
              fontFamily:"'Inter','Segoe UI',sans-serif" }}>
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
  const [session, setSession]     = useState(undefined)
  const [activeTab, setActiveTab] = useState('home')
  const [theme, setTheme]         = useState(() => localStorage.getItem('almawaid_theme') || 'midnight')

  const currentTheme = THEMES[theme] || THEMES.midnight

  const handleSetTheme = (id) => {
    setTheme(id)
    localStorage.setItem('almawaid_theme', id)
  }

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
      <div style={{ minHeight:'100vh', background:THEMES.midnight.bgGrad,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:"'Inter','Segoe UI',sans-serif" }}>
        <Spinner/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
      </div>
    )
  }

  if (!session) return <LoginPage/>

  const t = currentTheme

  return (
    <ThemeCtx.Provider value={t}>
      <AuthCtx.Provider value={{ user:session.user, signOut }}>
        <div style={{
          fontFamily:"'Inter','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
          minHeight:'100vh', background:t.bg, color:t.text, display:'flex', flexDirection:'column' }}>

          {/* Header */}
          <header style={{ position:'relative', overflow:'hidden',
            background:t.bgGrad, padding:'16px 18px 0', flexShrink:0 }}>
            <GeoBg t={t}/>
            <div style={{ position:'relative', zIndex:1, display:'flex',
              justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <img src="/al-mawaid.png" alt="Al-Mawaid"
                  style={{ width:26, height:26, objectFit:'contain',
                    filter:'drop-shadow(0 2px 6px rgba(201,168,76,0.5))' }}/>
                <span style={{ fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase',
                  color:t.textSub, opacity:0.65, fontWeight:700,
                  fontFamily:"'Inter','Segoe UI',sans-serif" }}>Al-Mawaid</span>
              </div>
              <span style={{ fontSize:12, color:t.textSub, opacity:0.45,
                fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>
            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:4 }}>
                <p style={{ fontFamily:"'Amiri','Georgia',serif", fontSize:17, letterSpacing:'0.1em', color:t.accent, margin:0 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}
            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:8 }}>
              <h1 style={{ margin:0, fontSize: activeTab==='home' ? 30 : 22,
                fontWeight:700, letterSpacing:'0.06em', lineHeight:1.1, color:t.accent,
                fontFamily:"'Cormorant Garamond','Georgia',serif" }}>
                {tabLabels[activeTab]}
              </h1>
            </div>
            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 36" preserveAspectRatio="none">
              <path d="M0,12 C200,36 400,0 600,18 C800,36 1000,4 1200,22 C1320,32 1400,12 1440,16 L1440,36 L0,36 Z"
                fill={t.headerWave}/>
            </svg>
          </header>

          {/* Pages */}
          {activeTab === 'home'     && <HomePage setActiveTab={setActiveTab}/>}
          {activeTab === 'feedback' && <FeedbackPage/>}
          {activeTab === 'post'     && <PostPage/>}
          {activeTab === 'profile'  && <ProfilePage theme={theme} setTheme={handleSetTheme}/>}

          {/* Bottom Nav */}
          <nav style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:30,
            display:'flex', justifyContent:'space-around', alignItems:'center',
            padding:'10px 4px 18px', background:t.navBg,
            borderTop:`1px solid ${t.navBorder}`, boxShadow:'0 -6px 30px rgba(0,0,0,0.18)' }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ background:'none', border:'none', cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                    padding:'2px 14px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
                  {active && (
                    <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
                      width:30, height:3, borderRadius:6, background:t.accent }}/>
                  )}
                  <div style={{ width:38, height:38, borderRadius:'50%', transition:'all 0.3s',
                    background: active ? t.accentBg : 'transparent',
                    border: active ? `1px solid ${t.accentBorder}` : '1px solid transparent',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={17} color={active ? t.accent : t.border} strokeWidth={active ? 2.2 : 1.5}/>
                  </div>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.05em',
                    color: active ? t.accent : t.textSub, opacity: active ? 1 : 0.5,
                    fontFamily:"'Inter','Segoe UI',sans-serif" }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </nav>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.8s linear infinite; }
            * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
            body { margin: 0; }
            ::-webkit-scrollbar { display: none; }
            input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
