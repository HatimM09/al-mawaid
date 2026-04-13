// src/App.jsx — Al-Mawaid Food Survey System v5
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, User, X,
  Star, Camera, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ChevronUp,
  ClipboardList, MessageCircle, ChevronLeft, ChevronRight,
  Phone, MapPin, Users, Upload, Bell, Info, Headphones, KeyRound,
  MessageSquare
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// ══════════════════════════════════════════════════════════════
// THEMES — 3 Classic, Soothing Themes
// ══════════════════════════════════════════════════════════════
const THEMES = {
  midnight: {
    id: 'midnight',
    name: 'Midnight Oud',
    icon: '🌙',
    bg: '#0b0f1a',
    bgGrad: 'linear-gradient(160deg,#0b0f1a 0%,#111827 60%,#0d1120 100%)',
    card: '#141d2e',
    cardActive: 'linear-gradient(135deg,#1a2540,#111827)',
    border: 'rgba(180,140,80,0.14)',
    borderActive: 'rgba(196,156,90,0.45)',
    accent: '#c49c5a',
    accentGrad: 'linear-gradient(135deg,#d4aa6a,#a87c40)',
    accentBg: 'rgba(196,156,90,0.10)',
    accentBorder: 'rgba(196,156,90,0.32)',
    text: '#f0ead8',
    textSub: '#9aabb8',
    textBody: '#c8d0da',
    navBg: 'rgba(11,15,26,0.97)',
    navBorder: 'rgba(196,156,90,0.18)',
    geo: 'rgba(196,156,90,0.05)',
    spinnerBorder: 'rgba(196,156,90,0.2)',
    spinnerTop: '#c49c5a',
    inputBg: 'rgba(255,255,255,0.04)',
    inputBorder: 'rgba(196,156,90,0.22)',
    loginCard: 'rgba(20,29,46,0.92)',
    headerWave: '#0b0f1a',
    successBg: 'rgba(74,163,110,0.12)',
    successBorder: 'rgba(74,163,110,0.3)',
    successText: '#5eba82',
  },
  ivory: {
    id: 'ivory',
    name: 'Ivory Dune',
    icon: '🏺',
    bg: '#faf6ef',
    bgGrad: 'linear-gradient(160deg,#faf6ef 0%,#f3ece0 60%,#faf6ef 100%)',
    card: '#ffffff',
    cardActive: 'linear-gradient(135deg,#fffdf8,#fef9f0)',
    border: 'rgba(160,100,60,0.14)',
    borderActive: 'rgba(185,105,55,0.4)',
    accent: '#9c5a2a',
    accentGrad: 'linear-gradient(135deg,#b8672f,#874a20)',
    accentBg: 'rgba(156,90,42,0.08)',
    accentBorder: 'rgba(156,90,42,0.28)',
    text: '#2a1a0e',
    textSub: '#7a5a40',
    textBody: '#5a3d28',
    navBg: 'rgba(250,246,239,0.97)',
    navBorder: 'rgba(156,90,42,0.18)',
    geo: 'rgba(156,90,42,0.06)',
    spinnerBorder: 'rgba(156,90,42,0.2)',
    spinnerTop: '#9c5a2a',
    inputBg: 'rgba(156,90,42,0.04)',
    inputBorder: 'rgba(156,90,42,0.2)',
    loginCard: 'rgba(255,255,255,0.96)',
    headerWave: '#faf6ef',
    successBg: 'rgba(60,140,80,0.08)',
    successBorder: 'rgba(60,140,80,0.28)',
    successText: '#3a7a50',
  },
  forest: {
    id: 'forest',
    name: 'Forest Qalam',
    icon: '🌿',
    bg: '#0a130e',
    bgGrad: 'linear-gradient(160deg,#0a130e 0%,#0f1f15 60%,#091108 100%)',
    card: '#111e14',
    cardActive: 'linear-gradient(135deg,#162a1a,#0f1f15)',
    border: 'rgba(120,180,100,0.13)',
    borderActive: 'rgba(180,158,80,0.42)',
    accent: '#b89e50',
    accentGrad: 'linear-gradient(135deg,#cab060,#9a7e38)',
    accentBg: 'rgba(184,158,80,0.10)',
    accentBorder: 'rgba(184,158,80,0.30)',
    text: '#e8f0e2',
    textSub: '#7aab82',
    textBody: '#a8c8a0',
    navBg: 'rgba(10,19,14,0.97)',
    navBorder: 'rgba(184,158,80,0.18)',
    geo: 'rgba(120,180,100,0.06)',
    spinnerBorder: 'rgba(184,158,80,0.2)',
    spinnerTop: '#b89e50',
    inputBg: 'rgba(120,180,100,0.05)',
    inputBorder: 'rgba(184,158,80,0.22)',
    loginCard: 'rgba(17,30,20,0.92)',
    headerWave: '#0a130e',
    successBg: 'rgba(80,180,100,0.12)',
    successBorder: 'rgba(80,180,100,0.3)',
    successText: '#60c078',
  },
}

// ─── Menu Data ────────────────────────────────────────────────
const WEEKLY_MENU = {
  monday:    { en:'Monday',    ar:'الاثنين',  lunch:['Chola','kulcha','Sreekhand','Dal','Chawal'],              dinner:['FMB MENU'] },
  tuesday:   { en:'Tuesday',   ar:'الثلاثاء', lunch:['American Choupsey','Wafers','Butter Khichdi'],              dinner:['Roti','Veg Jaipuri','Chicken Pulao','Soup'] },
  wednesday: { en:'Wednesday', ar:'الأربعاء', lunch:['Vegetable Sandwich','Bhel Salad','Corn Pulao'],                  dinner:['Roti','White Chicken','Manchurian Rice ','Gravy'] },
  thursday:  { en:'Thursday',  ar:'الخميس',  lunch:['Chicken 65','Corn Munch Salad','Dal makhni','Chawal'],               dinner:['Roti','mango Custard','Matar Paneer','Tuwar Pulao','Palidu'] },
  friday:    { en:'Friday',    ar:'الجمعة',  lunch:['FMB MENU'],                                                   dinner:['Roti','Gobi Matar','Chicken Kashmiri Pulao','Soup'] },
  saturday:  { en:'Saturday',  ar:'السبت',   lunch:['Chana Bateta','Dal Makhni ','Chawal'],                  dinner:['Roti','Chicken Tarkari,','Veg Coconut Rice','Kung pao Gravy'] },
}
const DAYS = ['monday','tuesday','wednesday','thursday','friday','saturday']
const ROTI_ITEMS = ['roti','chapati','naan','paratha']
const isRotiItem = (dish) => ROTI_ITEMS.some(r => dish.toLowerCase().includes(r))

const getTodayKey = () => {
  const d = new Date().getDay()
  const map = { 1:'monday', 2:'tuesday', 3:'wednesday', 4:'thursday', 5:'friday', 6:'saturday' }
  return map[d] || 'monday'
}

const isSurveyOpen = () => {
  const now  = new Date()
  const day  = now.getDay()
  const hour = now.getHours()
  const min  = now.getMinutes()
  const totalMins = hour * 60 + min
  const sat20 = 20 * 60
  const mon10 = 10 * 60
  if (day === 6 && totalMins >= sat20) return true
  if (day === 0) return true
  if (day === 1 && totalMins <= mon10) return true
  return false
}

const getSurveyWindowMessage = () => {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  if (day === 6 && hour < 20) {
    const hoursLeft = 20 - hour
    return `Survey opens today at 8:00 PM (in ~${hoursLeft}h)`
  }
  if (day === 1 && hour >= 10) return 'Survey window closed. Opens next Saturday at 8:00 PM.'
  if (day >= 2 && day <= 5) return 'Survey opens Saturday at 8:00 PM.'
  return 'Survey opens Saturday at 8:00 PM.'
}

// ─── Contexts ─────────────────────────────────────────────────
const ThemeCtx = createContext(THEMES.midnight)
const useTheme = () => useContext(ThemeCtx)
const AuthCtx  = createContext(null)
const useAuth  = () => useContext(AuthCtx)

/* ─── Geo Background ─────────────────────────────────────────── */
const GeoBg = ({ t: tProp }) => {
  const ctx = useTheme()
  const t = tProp || ctx
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none', opacity:0.7 }}>
      <defs>
        <pattern id="geo" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M24 2L46 24L24 46L2 24Z" fill="none" stroke={t.geo} strokeWidth="0.7"/>
          <circle cx="24" cy="24" r="4.5" fill="none" stroke={t.geo} strokeWidth="0.5"/>
          <circle cx="0"  cy="0"  r="2"   fill={t.geo}/>
          <circle cx="48" cy="0"  r="2"   fill={t.geo}/>
          <circle cx="0"  cy="48" r="2"   fill={t.geo}/>
          <circle cx="48" cy="48" r="2"   fill={t.geo}/>
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
      <div className="spin" style={{ width:34, height:34, border:`2.5px solid ${t.spinnerBorder}`, borderTop:`2.5px solid ${t.spinnerTop}`, borderRadius:'50%' }}/>
      {fullPage && <p style={{ margin:0, fontSize:12, color:t.textSub, opacity:0.45, fontFamily:"'DM Sans',sans-serif", letterSpacing:'0.08em' }}>Loading…</p>}
    </div>
  )
  return fullPage
    ? <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 20px' }}>{inner}</div>
    : inner
}

/* ─── Error Banner ───────────────────────────────────────────── */
const ErrorBanner = ({ msg }) => (
  <div style={{ margin:'8px 0', padding:'11px 14px', borderRadius:10,
    background:'rgba(220,60,60,0.09)', border:'1px solid rgba(220,60,60,0.28)',
    color:'#e05555', fontSize:13, display:'flex', alignItems:'center', gap:8,
    fontFamily:"'DM Sans',sans-serif" }}>
    <AlertCircle size={14} style={{ flexShrink:0 }}/>{msg}
  </div>
)

/* ─── Avatar ─────────────────────────────────────────────────── */
const Avatar = ({ avatarUrl, name, email, size = 56 }) => {
  const t = useTheme()
  const initials = (name || email || 'U').charAt(0).toUpperCase()
  return (
    <div style={{ width:size, height:size, borderRadius:'50%', overflow:'hidden', flexShrink:0,
      border:`2px solid ${t.accent}`, boxShadow:`0 4px 16px ${t.accentBg}` }}>
      {avatarUrl
        ? <img src={avatarUrl} alt="Avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
        : <div style={{ width:'100%', height:'100%', background:t.accentGrad,
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize: size * 0.38, fontWeight:800, color:'#fff',
            fontFamily:"'Playfair Display',serif" }}>
            {initials}
          </div>
      }
    </div>
  )
}

/* ─── Section Label ──────────────────────────────────────────── */
const SectionLabel = ({ children }) => {
  const t = useTheme()
  return (
    <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.18em', color:t.textSub,
      textTransform:'uppercase', marginBottom:12, fontFamily:"'DM Sans',sans-serif", opacity:0.7 }}>
      {children}
    </div>
  )
}

/* ─── Card ───────────────────────────────────────────────────── */
const Card = ({ children, active, style: extraStyle = {} }) => {
  const t = useTheme()
  return (
    <div style={{
      padding:'18px 18px', borderRadius:16,
      background: active ? t.cardActive : t.card,
      border:`1px solid ${active ? t.borderActive : t.border}`,
      boxShadow: active ? `0 6px 24px ${t.accentBg}` : '0 2px 8px rgba(0,0,0,0.08)',
      ...extraStyle
    }}>
      {children}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// LOGIN PAGE
// ══════════════════════════════════════════════════════════════
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
        setError('✅ Check your email for a verification link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const inp = {
    width:'100%', padding:'13px 13px 13px 44px', borderRadius:12, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
    fontSize:15, outline:'none', fontFamily:"'DM Sans',sans-serif", transition:'border 0.2s'
  }

  return (
    <div style={{ minHeight:'100vh', background:t.bgGrad, display:'flex', alignItems:'center',
      justifyContent:'center', padding:20, position:'relative', overflow:'hidden',
      fontFamily:"'DM Sans',sans-serif" }}>
      <GeoBg t={t}/>
      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:400,
        background:t.loginCard, backdropFilter:'blur(24px)', borderRadius:24,
        padding:'40px 28px', border:`1px solid ${t.borderActive}`,
        boxShadow:'0 32px 80px rgba(0,0,0,0.5)' }}>
        <div style={{ textAlign:'center', marginBottom:28 }}>
          <div style={{ width:88, height:88, margin:'0 auto 16px', borderRadius:'50%',
            background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 12px 36px rgba(196,156,90,0.25)` }}>
            <img src="/al-mawaid.png" alt="Al-Mawaid" style={{ width:60, height:60, objectFit:'contain' }}/>
          </div>
          <h1 style={{ margin:'0 0 6px', fontSize:30, fontWeight:700, color:t.accent,
            letterSpacing:'0.06em', fontFamily:"'Playfair Display',serif" }}>Al-Mawaid</h1>
          <p style={{ margin:0, fontSize:15, color:t.textSub, fontFamily:"'Noto Nastaliq Urdu','Amiri',serif",
            letterSpacing:'0.1em', lineHeight:1.8 }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        </div>
        <div style={{ display:'flex', gap:6, marginBottom:22,
          background:'rgba(255,255,255,0.04)', borderRadius:12, padding:5 }}>
          {['login','signup'].map(m => (
            <button key={m} onClick={() => setMode(m)}
              style={{ flex:1, padding:'9px 16px', borderRadius:9, border:'none',
                background: mode===m ? t.accentGrad : 'transparent',
                color: mode===m ? '#fff' : t.textSub, fontWeight:600, cursor:'pointer',
                transition:'all 0.25s', fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>
        <form onSubmit={handleAuth}>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
              marginBottom:7, letterSpacing:'0.14em', fontFamily:"'DM Sans',sans-serif" }}>EMAIL</label>
            <div style={{ position:'relative' }}>
              <Mail size={14} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={inp} placeholder="your@email.com"/>
            </div>
          </div>
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
              marginBottom:7, letterSpacing:'0.14em', fontFamily:"'DM Sans',sans-serif" }}>PASSWORD</label>
            <div style={{ position:'relative' }}>
              <Lock size={14} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                style={{ ...inp, paddingRight:44 }} placeholder="••••••••"/>
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                {showPass ? <EyeOff size={14} color={t.accent}/> : <Eye size={14} color={t.accent}/>}
              </button>
            </div>
          </div>
          {error && <ErrorBanner msg={error}/>}
          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:14, borderRadius:12, border:'none',
              background: loading ? t.border : t.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1,
              boxShadow:`0 6px 20px ${t.accentBg}`, transition:'all 0.25s', marginTop:4,
              fontFamily:"'DM Sans',sans-serif", letterSpacing:'0.02em' }}>
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// HOME PAGE
// ══════════════════════════════════════════════════════════════
function HomePage({ setActiveTab }) {
  const t = useTheme()
  const { user } = useAuth()
  const [expandedDay, setExpandedDay]   = useState(null)
  const [showSurvey, setShowSurvey]     = useState(false)
  const [surveyStartDay, setSurveyStartDay] = useState('monday')
  const [profileData, setProfileData]   = useState({ name:'', thali_number:'', avatar_url:'' })
  const [surveyDaysCounts, setSurveyDaysCounts] = useState({})
  const [feedbackCounts, setFeedbackCounts]     = useState({})
  const [statsLoading, setStatsLoading] = useState(true)

  const surveyOpen = isSurveyOpen()

  useEffect(() => { loadData() }, [user])

  const loadData = async () => {
    try {
      const { data } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      if (data) setProfileData({ name: data.name || '', thali_number: data.thali_number || '', avatar_url: data.avatar_url || '' })
    } catch {}
    try {
      const { data } = await supabase.from('survey_responses').select('day,meal').eq('user_id', user.id)
      const counts = {}
      ;(data||[]).forEach(r => {
        if (!counts[r.day]) counts[r.day] = new Set()
        counts[r.day].add(r.meal)
      })
      setSurveyDaysCounts(counts)
    } catch {}
    try {
      const { data } = await supabase.from('daily_feedback').select('day,lunch_stars,dinner_stars').eq('user_id', user.id)
      const counts = {}
      ;(data||[]).forEach(r => {
        if (!counts[r.day]) counts[r.day] = { lunch:false, dinner:false }
        if (r.lunch_stars)  counts[r.day].lunch  = true
        if (r.dinner_stars) counts[r.day].dinner = true
      })
      setFeedbackCounts(counts)
    } catch {}
    setStatsLoading(false)
  }

  const surveyedDaysCount = Object.values(surveyDaysCounts).filter(s => s.size >= 2).length
  const feedbackDaysCount = Object.values(feedbackCounts).filter(f => f.lunch && f.dinner).length

  const openSurveyFromDay = (day) => {
    if (!surveyOpen) return
    setSurveyStartDay(day)
    setShowSurvey(true)
  }

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:800, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <Card active style={{ display:'flex', alignItems:'center', gap:14, marginBottom:16 }}>
        <Avatar avatarUrl={profileData.avatar_url} name={profileData.name} email={user.email} size={54}/>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:18, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',amiri", lineHeight:1.2 }}>
            {profileData.name || 'السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُه'}
          </div>
          <div style={{ fontSize:12, color:t.textSub, marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>{user.email}</div>
          {profileData.thali_number && (
            <div style={{ fontSize:12, color:t.textSub, marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>
              Thali <strong style={{ color:t.accent }}>#{profileData.thali_number}</strong>
            </div>
          )}
        </div>
      </Card>

      {!statsLoading && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:18 }}>
          <Card style={{ textAlign:'center', padding:'14px 12px' }}>
            <div style={{ fontSize:28, fontWeight:800, color:t.accent, lineHeight:1, fontFamily:"'Playfair Display',serif" }}>
              {surveyedDaysCount}<span style={{ fontSize:13, fontWeight:500, color:t.textSub }}>/6</span>
            </div>
            <div style={{ fontSize:11, color:t.textSub, marginTop:4, fontFamily:"'DM Sans',sans-serif", letterSpacing:'0.04em' }}>Survey Days</div>
          </Card>
          <Card style={{ textAlign:'center', padding:'14px 12px' }}>
            <div style={{ fontSize:28, fontWeight:800, color:'#e06070', lineHeight:1, fontFamily:"'Playfair Display',serif" }}>
              {feedbackDaysCount}<span style={{ fontSize:13, fontWeight:500, color:t.textSub }}>/6</span>
            </div>
            <div style={{ fontSize:11, color:t.textSub, marginTop:4, fontFamily:"'DM Sans',sans-serif", letterSpacing:'0.04em' }}>Feedback Days</div>
          </Card>
        </div>
      )}

      {!surveyOpen && (
        <div style={{ marginBottom:16, padding:'12px 16px', borderRadius:12,
          background:t.accentBg, border:`1px solid ${t.accentBorder}`,
          fontSize:13, color:t.accent, fontFamily:"'DM Sans',sans-serif",
          display:'flex', alignItems:'center', gap:8 }}>
          🕐 {getSurveyWindowMessage()}
        </div>
      )}
      {surveyOpen && (
        <div style={{ marginBottom:16, padding:'12px 16px', borderRadius:12,
          background:t.successBg, border:`1px solid ${t.successBorder}`,
          fontSize:13, color:t.successText, fontFamily:"'DM Sans',sans-serif",
          display:'flex', alignItems:'center', gap:8 }}>
          ✅ Survey window is open! (Sat 8PM – Mon 10AM)
        </div>
      )}

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
        <img src="/al-mawaid.png" alt="" style={{ width:32, height:32, objectFit:'contain',
          filter:'drop-shadow(0 2px 8px rgba(196,156,90,0.4))', flexShrink:0 }}/>
        <div>
          <div style={{ fontSize:16, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>Weekly Menu</div>
          <div style={{ fontSize:11, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>Monday – Saturday · tap to expand</div>
        </div>
      </div>

      <button onClick={() => openSurveyFromDay('monday')}
        disabled={!surveyOpen}
        style={{ width:'100%', padding:13, borderRadius:13, border:'none', marginBottom:14,
          background: surveyOpen ? t.accentGrad : t.border, color:'#fff', fontSize:14, fontWeight:700,
          cursor: surveyOpen ? 'pointer' : 'not-allowed', opacity: surveyOpen ? 1 : 0.55,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          boxShadow: surveyOpen ? `0 6px 20px ${t.accentBg}` : 'none',
          fontFamily:"'DM Sans',sans-serif" }}>
        <ClipboardList size={16}/> Start Weekly Survey
      </button>

      {DAYS.map(day => {
        const menu = WEEKLY_MENU[day]
        const isExpanded = expandedDay === day
        const daySurvey  = surveyDaysCounts[day]
        const dayFb      = feedbackCounts[day]
        const surveyDone = daySurvey && daySurvey.size >= 2
        const lunchFb    = dayFb?.lunch
        const dinnerFb   = dayFb?.dinner

        return (
          <div key={day} style={{ marginBottom:8 }}>
            <button onClick={() => setExpandedDay(isExpanded ? null : day)}
              style={{ width:'100%', padding:'12px 14px', borderRadius:13,
                border:`1px solid ${isExpanded ? t.borderActive : t.border}`,
                background: isExpanded ? t.cardActive : t.card, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                transition:'all 0.25s', textAlign:'left' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                <img src="/al-mawaid.png" alt="" style={{ width:30, height:30, objectFit:'contain', flexShrink:0,
                  filter:'drop-shadow(0 2px 6px rgba(196,156,90,0.3))' }}/>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>{menu.en}</div>
                  <div style={{ fontSize:11, color:t.textSub, fontFamily:"'Amiri',serif", marginTop:1 }}>{menu.ar}</div>
                  <div style={{ display:'flex', gap:5, marginTop:4, flexWrap:'wrap' }}>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20,
                      background: surveyDone ? `${t.successBg}` : t.accentBg,
                      color: surveyDone ? t.successText : t.textSub, fontWeight:700,
                      border:`1px solid ${surveyDone ? t.successBorder : t.border}`,
                      fontFamily:"'DM Sans',sans-serif" }}>
                      {surveyDone ? '✓ Survey' : '○ Survey'}
                    </span>
                    <span style={{ fontSize:10, padding:'2px 8px', borderRadius:20,
                      background: (lunchFb||dinnerFb) ? 'rgba(200,80,100,0.10)' : t.accentBg,
                      color: (lunchFb||dinnerFb) ? '#e06070' : t.textSub, fontWeight:700,
                      border:`1px solid ${(lunchFb||dinnerFb) ? 'rgba(200,80,100,0.28)' : t.border}`,
                      fontFamily:"'DM Sans',sans-serif" }}>
                      {lunchFb && dinnerFb ? '✓ Feedback' : lunchFb||dinnerFb ? '◑ Feedback' : '○ Feedback'}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                {surveyOpen && (
                  <button onClick={e => { e.stopPropagation(); openSurveyFromDay(day) }}
                    style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
                      borderRadius:8, padding:'4px 10px', cursor:'pointer',
                      color:t.accent, fontSize:10, fontWeight:700,
                      fontFamily:"'DM Sans',sans-serif" }}>
                    Survey
                  </button>
                )}
                <div style={{ width:24, height:24, borderRadius:'50%', background:t.accentBg,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {isExpanded ? <ChevronUp size={12} color={t.accent}/> : <ChevronDown size={12} color={t.accent}/>}
                </div>
              </div>
            </button>

            {isExpanded && (
              <div style={{ marginTop:4, padding:'14px 16px', background:t.inputBg,
                borderRadius:12, border:`1px solid ${t.border}` }}>
                {[['☀️ Lunch', menu.lunch], ['🌙 Dinner', menu.dinner]].map(([label, dishes], li) => (
                  <div key={label} style={{ marginBottom: li===0 ? 14 : 0 }}>
                    <div style={{ fontSize:13, fontWeight:700, color:t.accent,
                      fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>{label}</div>
                    <ul style={{ margin:0, paddingLeft:16, lineHeight:2.0 }}>
                      {dishes.map(d => (
                        <li key={d} style={{ fontSize:14, color:t.textBody, fontFamily:"'DM Sans',sans-serif" }}>{d}</li>
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
          onClose={() => { setShowSurvey(false); loadData() }}/>
      )}
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// SURVEY MODAL
// ══════════════════════════════════════════════════════════════
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
        if ((data.edit_count||0) >= 1) setEditBlocked(true)
      } else { setExistingResponse(null); setWantsFood(null); setResponses({}); setEditBlocked(false) }
    } catch { setExistingResponse(null); setWantsFood(null); setResponses({}); setEditBlocked(false) }
  }

  const goToDay = (day) => { setCurrentDay(day); setCurrentMeal('lunch'); setWantsFood(null); setResponses({}) }

  const handleNext = async () => {
    if (wantsFood !== null && !(existingResponse && (existingResponse.edit_count||0) >= 1)) {
      setLoading(true)
      try {
        const { error } = await supabase.from('survey_responses').upsert([{
          user_id:user.id, day:currentDay, meal:currentMeal, wants_food:wantsFood,
          dish_responses: wantsFood ? responses : {},
          edit_count: existingResponse ? (existingResponse.edit_count||0)+1 : 0
        }], { onConflict:'user_id,day,meal' })
        if (error) throw error
        if (!existingResponse) await supabase.rpc('increment_user_surveys', { p_user_id:user.id })
      } catch (err) { alert('Error saving: ' + err.message) }
      finally { setLoading(false) }
    }

    if (currentMeal === 'lunch') {
      setCurrentMeal('dinner'); setWantsFood(null); setResponses({})
    } else if (currentDayIndex < DAYS.length - 1) {
      setCurrentDay(DAYS[currentDayIndex+1]); setCurrentMeal('lunch'); setWantsFood(null); setResponses({})
    } else {
      alert('🎉 Survey complete!'); onClose()
    }
  }

  const handlePrev = () => {
    if (currentMeal === 'dinner') { setCurrentMeal('lunch'); setWantsFood(null); setResponses({}) }
    else if (currentDayIndex > 0) { setCurrentDay(DAYS[currentDayIndex-1]); setCurrentMeal('dinner'); setWantsFood(null); setResponses({}) }
  }

  const dishes = currentMeal === 'lunch' ? menu.lunch : menu.dinner
  const isFirst = currentDayIndex === 0 && currentMeal === 'lunch'
  const isLast  = currentDayIndex === DAYS.length-1 && currentMeal === 'dinner'
  const totalSteps = DAYS.length * 2
  const currentStep = currentDayIndex * 2 + (currentMeal === 'lunch' ? 1 : 2)
  const progress = (currentStep / totalSteps) * 100

  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center',
      background:'rgba(0,0,0,0.82)', padding:16, backdropFilter:'blur(12px)', overflowY:'auto' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:t.card, borderRadius:20, padding:22, maxWidth:500, width:'100%',
          border:`1px solid ${t.borderActive}`, boxShadow:'0 28px 70px rgba(0,0,0,0.55)',
          maxHeight:'92vh', overflowY:'auto' }}>
        <div style={{ height:3, background:t.inputBg, borderRadius:2, marginBottom:16, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${progress}%`, background:t.accentGrad,
            borderRadius:2, transition:'width 0.4s ease' }}/>
        </div>
        <div style={{ display:'flex', gap:4, overflowX:'auto', marginBottom:14, paddingBottom:2, scrollbarWidth:'none' }}>
          {DAYS.map(day => (
            <button key={day} onClick={() => goToDay(day)}
              style={{ flexShrink:0, padding:'4px 10px', borderRadius:20,
                border:`1.5px solid ${currentDay===day ? t.accent : t.border}`,
                background: currentDay===day ? t.accentBg : 'transparent',
                color: currentDay===day ? t.accent : t.textSub,
                fontWeight:700, fontSize:10, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
              {WEEKLY_MENU[day].en.slice(0,3)}
            </button>
          ))}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <img src="/al-mawaid.png" alt="" style={{ width:24, height:24, objectFit:'contain' }}/>
              <h2 style={{ margin:0, fontSize:19, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
                {menu.en}
              </h2>
            </div>
            <div style={{ fontSize:13, color:t.textSub, fontFamily:"'DM Sans',sans-serif", marginTop:3 }}>
              {currentMeal === 'lunch' ? '☀️ Lunch' : '🌙 Dinner'}
              <span style={{ margin:'0 6px', opacity:0.3 }}>·</span>
              <span style={{ fontFamily:"'Amiri',serif", fontSize:14 }}>{menu.ar}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
            <X size={18} color={t.textSub}/>
          </button>
        </div>
        {editBlocked && (
          <div style={{ marginBottom:12, padding:11, borderRadius:10,
            background:'rgba(220,140,40,0.10)', border:'1px solid rgba(220,140,40,0.28)',
            color:'#d4882a', fontSize:12, fontFamily:"'DM Sans',sans-serif" }}>
            ⚠️ 1 edit already used for this meal — view only.
          </div>
        )}
        <div style={{ display:'flex', gap:8, marginBottom:14 }}>
          <button onClick={handlePrev} disabled={isFirst}
            style={{ flex:1, padding:'8px 12px', borderRadius:10, border:`1px solid ${t.border}`,
              background:'transparent', color: isFirst ? t.border : t.textSub, fontSize:13,
              fontWeight:600, cursor: isFirst ? 'not-allowed' : 'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4,
              fontFamily:"'DM Sans',sans-serif" }}>
            <ChevronLeft size={13}/> Prev
          </button>
          <button onClick={handleNext} disabled={loading}
            style={{ flex:1, padding:'8px 12px', borderRadius:10, border:`1px solid ${t.accent}`,
              background:t.accentBg, color:t.accent, fontSize:13, fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4,
              fontFamily:"'DM Sans',sans-serif" }}>
            {isLast ? 'Finish ✓' : 'Next'} {!isLast && <ChevronRight size={13}/>}
          </button>
        </div>
        {editBlocked ? (
          <div style={{ padding:14, background:t.inputBg, borderRadius:12, border:`1px solid ${t.border}` }}>
            <p style={{ margin:'0 0 10px', fontSize:13, fontWeight:600, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>
              {wantsFood ? 'Responded: Yes' : 'Responded: No (skipped)'}
            </p>
            {wantsFood && Object.entries(responses).map(([dish, val]) => (
              <div key={dish} style={{ display:'flex', justifyContent:'space-between',
                padding:'7px 0', borderBottom:`1px solid ${t.border}` }}>
                <span style={{ fontSize:13, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>{dish}</span>
                <span style={{ fontSize:13, fontWeight:700, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>
                  {val === 'yes' ? '✅' : val === 'no' ? '❌' : `${val}%`}
                </span>
              </div>
            ))}
          </div>
        ) : wantsFood === null ? (
          <div>
            <p style={{ fontSize:15, fontWeight:600, color:t.text, marginBottom:14, fontFamily:"'DM Sans',sans-serif" }}>
              Do you want {currentMeal} for {menu.en}?
            </p>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setWantsFood(true)}
                style={{ flex:1, padding:14, borderRadius:12, border:`1px solid ${t.accent}`,
                  background:t.accentBg, color:t.accent, fontSize:16, fontWeight:700, cursor:'pointer',
                  fontFamily:"'DM Sans',sans-serif" }}>✅ Yes</button>
              <button onClick={() => { setWantsFood(false); setTimeout(handleNext, 200) }}
                style={{ flex:1, padding:14, borderRadius:12, border:`1px solid ${t.border}`,
                  background:'transparent', color:t.text, fontSize:16, fontWeight:700, cursor:'pointer',
                  fontFamily:"'DM Sans',sans-serif" }}>❌ No</button>
            </div>
          </div>
        ) : wantsFood ? (
          <div>
            <p style={{ fontSize:12, fontWeight:600, color:t.textSub, marginBottom:10, fontFamily:"'DM Sans',sans-serif" }}>
              Select portion for each dish:
            </p>
            {dishes.map(dish => (
              <div key={dish} style={{ marginBottom:10, padding:12, background:t.inputBg, borderRadius:11 }}>
                <p style={{ margin:'0 0 8px', fontSize:14, fontWeight:600, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>{dish}</p>
                {isRotiItem(dish) ? (
                  <div style={{ display:'flex', gap:8 }}>
                    {['yes','no'].map(opt => (
                      <button key={opt} onClick={() => setResponses(prev => ({ ...prev, [dish]:opt }))}
                        style={{ flex:1, padding:'8px 4px', borderRadius:9,
                          border:`1.5px solid ${responses[dish]===opt ? (opt==='yes'?t.accent:'#e05555') : t.border}`,
                          background: responses[dish]===opt ? (opt==='yes'?t.accentBg:'rgba(220,80,80,0.09)') : 'transparent',
                          color: responses[dish]===opt ? (opt==='yes'?t.accent:'#e05555') : t.text,
                          fontSize:14, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                        {opt === 'yes' ? '✅ Yes' : '❌ No'}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display:'flex', gap:5 }}>
                    {[0,25,50,100].map(pct => (
                      <button key={pct} onClick={() => setResponses(prev => ({ ...prev, [dish]:pct }))}
                        style={{ flex:1, padding:'7px 2px', borderRadius:9,
                          border:`1.5px solid ${responses[dish]===pct ? t.accent : t.border}`,
                          background: responses[dish]===pct ? t.accentBg : 'transparent',
                          color: responses[dish]===pct ? t.accent : t.text,
                          fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                        {pct}%
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={handleNext}
              disabled={loading || Object.keys(responses).length < dishes.length}
              style={{ width:'100%', padding:13, borderRadius:11, border:'none', marginTop:6,
                background: Object.keys(responses).length < dishes.length ? t.border : t.accentGrad,
                color:'#fff', fontSize:14, fontWeight:700,
                cursor: Object.keys(responses).length < dishes.length ? 'not-allowed' : 'pointer',
                opacity: Object.keys(responses).length < dishes.length ? 0.5 : 1,
                fontFamily:"'DM Sans',sans-serif" }}>
              {loading ? 'Saving…' : isLast ? 'Complete Survey ✓' : 'Save & Next →'}
            </button>
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:20, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>
            Skipping this meal…
          </div>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// FEEDBACK PAGE
// ══════════════════════════════════════════════════════════════
function FeedbackPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [loading, setLoading]         = useState(true)
  const [submitting, setSubmitting]   = useState(false)
  const [error, setError]             = useState('')
  const [submitted, setSubmitted]     = useState({ lunch:false, dinner:false })
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
        setSubmitted({ lunch:!!data.lunch_stars, dinner:!!data.dinner_stars })
        if (data.lunch_stars)   setLunchStars(data.lunch_stars)
        if (data.dinner_stars)  setDinnerStars(data.dinner_stars)
        if (data.lunch_comment)  setLunchComment(data.lunch_comment)
        if (data.dinner_comment) setDinnerComment(data.dinner_comment)
      }
    } catch {}
    finally { setLoading(false) }
  }

  const handleSubmitMeal = async (meal) => {
    const stars = meal === 'lunch' ? lunchStars : dinnerStars
    if (!stars) return setError(`Please rate ${meal} first`)
    setError(''); setSubmitting(true)
    try {
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
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const StarRating = ({ value, hovered, onHover, onChange, disabled }) => {
    const display = hovered || value
    return (
      <div style={{ marginBottom:10 }}>
        <div style={{ display:'flex', gap:6, marginBottom: display ? 10 : 0 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n} onClick={() => !disabled && onChange(n)}
              onMouseEnter={() => !disabled && onHover(n)}
              onMouseLeave={() => !disabled && onHover(0)}
              disabled={disabled}
              style={{ background:'none', border:'none', cursor: disabled ? 'default' : 'pointer', padding:2, lineHeight:0, transition:'transform 0.15s' }}>
              <Star size={28}
                fill={n <= (hovered || value) ? t.accent : 'none'}
                color={n <= (hovered || value) ? t.accent : t.border}
                strokeWidth={1.5}/>
            </button>
          ))}
        </div>
        {display > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 13px',
            background:t.accentBg, borderRadius:10, border:`1px solid ${t.accentBorder}` }}>
            <span style={{ fontSize:24 }}>{STAR_EMOJIS[display]}</span>
            <span style={{ fontSize:14, color:t.accent, fontWeight:700, fontFamily:"'Playfair Display',serif" }}>
              {STAR_LABELS[display]}
            </span>
          </div>
        )}
      </div>
    )
  }

  if (loading) return <Spinner/>

  const MealCard = ({ meal, icon, gradient, stars, setStars, hoveredStars, setHoveredStars, comment, setComment }) => {
    const isLunch  = meal === 'lunch'
    const dishes   = isLunch ? menu.lunch : menu.dinner
    const isDone   = submitted[meal]

    return (
      <Card active={isDone} style={{ marginBottom:14 }}>
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:gradient,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
            {icon}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:17, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
              {isLunch ? 'Lunch' : 'Dinner'}
            </div>
            {isDone && (
              <div style={{ fontSize:11, color:t.successText, fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>
                ✓ Submitted
              </div>
            )}
          </div>
        </div>
        <div style={{ marginBottom:16, padding:'12px 14px', background:t.inputBg,
          borderRadius:11, border:`1px solid ${t.border}` }}>
          <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:t.textSub,
            marginBottom:8, fontFamily:"'DM Sans',sans-serif" }}>TODAY'S MENU</div>
          <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
            {dishes.map((d, i) => (
              <div key={d} style={{ display:'flex', alignItems:'center', gap:8 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:t.accent, flexShrink:0, opacity:0.6 }}/>
                <span style={{ fontSize:14, color:t.textBody, fontFamily:"'DM Sans',sans-serif" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
        <StarRating
          value={stars} hovered={hoveredStars}
          onHover={setHoveredStars} onChange={setStars}
          disabled={isDone}/>
        {!isDone && (
          <>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              style={{ width:'100%', padding:'11px 13px', borderRadius:11, boxSizing:'border-box',
                background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                fontSize:14, resize:'none', outline:'none', fontFamily:"'DM Sans',sans-serif",
                minHeight:62, marginTop:10, marginBottom:10 }}
              placeholder={`Any comment on ${meal}? (optional)`}/>
            <button onClick={() => handleSubmitMeal(meal)} disabled={submitting || !stars}
              style={{ width:'100%', padding:12, borderRadius:11, border:'none',
                background: !stars ? t.border : t.accentGrad, color:'#fff', fontSize:14,
                fontWeight:700, cursor: !stars ? 'not-allowed' : 'pointer',
                opacity: !stars ? 0.5 : 1, fontFamily:"'DM Sans',sans-serif",
                transition:'all 0.2s' }}>
              {submitting ? 'Saving…' : `Submit ${isLunch ? 'Lunch' : 'Dinner'} Feedback`}
            </button>
          </>
        )}
      </Card>
    )
  }

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ marginBottom:18, padding:'16px 18px', borderRadius:16,
        background:t.cardActive, border:`1px solid ${t.borderActive}`, textAlign:'center' }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.18em', color:t.textSub,
          marginBottom:5, fontFamily:"'DM Sans',sans-serif" }}>TODAY'S FEEDBACK</div>
        <div style={{ fontSize:24, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>{menu.en}</div>
        <div style={{ fontSize:16, color:t.textSub, fontFamily:"'Amiri',serif", marginTop:3 }}>{menu.ar}</div>
        <div style={{ fontSize:11, color:t.textSub, marginTop:6, opacity:0.55, fontFamily:"'DM Sans',sans-serif" }}>
          Feedback resets every 24 hours
        </div>
      </div>
      <MealCard
        meal="lunch" icon="☀️" gradient="linear-gradient(135deg,#f59e0b,#d97706)"
        stars={lunchStars} setStars={setLunchStars}
        hoveredStars={hoveredLunch} setHoveredStars={setHoveredLunch}
        comment={lunchComment} setComment={setLunchComment}/>
      <MealCard
        meal="dinner" icon="🌙" gradient="linear-gradient(135deg,#6366f1,#4338ca)"
        stars={dinnerStars} setStars={setDinnerStars}
        hoveredStars={hoveredDinner} setHoveredStars={setHoveredDinner}
        comment={dinnerComment} setComment={setDinnerComment}/>
      {error && <ErrorBanner msg={error}/>}
      {submitted.lunch && submitted.dinner && (
        <div style={{ textAlign:'center', padding:'22px 18px', background:t.card,
          borderRadius:16, border:`1px solid ${t.successBorder}` }}>
          <div style={{ fontSize:40, marginBottom:10 }}>✅</div>
          <div style={{ fontSize:18, fontWeight:700, color:t.successText, marginBottom:5,
            fontFamily:"'Playfair Display',serif" }}>All Done for Today!</div>
          <div style={{ fontSize:13, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>
            JazakAllah Khair for your feedback!
          </div>
        </div>
      )}
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// PROFILE PAGE
// ══════════════════════════════════════════════════════════════
function ProfilePage({ theme, setTheme }) {
  const [activeSubPage, setActiveSubPage] = useState('main')

  if (activeSubPage === 'surveys')       return <MySurveysPage      onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'requests')      return <MyRequestsPage     onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'khidmat')       return <KhidmatPage        onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'notifications') return <NotificationHistoryPage onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'about')         return <AboutPage          onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'support')       return <SupportTicketPage  onBack={() => setActiveSubPage('main')}/>
  if (activeSubPage === 'password')      return <ChangePasswordPage onBack={() => setActiveSubPage('main')}/>

  return <ProfileMainPage theme={theme} setTheme={setTheme} onNav={setActiveSubPage}/>
}

function ProfileMainPage({ theme, setTheme, onNav }) {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      .then(({ data }) => { if (data) setProfileData(data) })
      .finally(() => setLoading(false))
  }, [])

  const NavCard = ({ label, icon, desc, onClick, iconBg }) => (
    <button onClick={onClick}
      style={{ width:'100%', padding:'13px 16px', borderRadius:14, border:`1px solid ${t.border}`,
        background:t.card, cursor:'pointer', display:'flex', alignItems:'center', gap:14,
        marginBottom:10, textAlign:'left', transition:'all 0.2s' }}>
      <div style={{ width:42, height:42, borderRadius:12, background: iconBg || t.accentGrad,
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        {icon}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:15, fontWeight:700, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>{label}</div>
        <div style={{ fontSize:12, color:t.textSub, marginTop:1, fontFamily:"'DM Sans',sans-serif" }}>{desc}</div>
      </div>
      <ChevronRight size={15} color={t.textSub}/>
    </button>
  )

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      {/* Profile View */}
      <Card active style={{ textAlign:'center', marginBottom:20 }}>
        <div style={{ width:84, height:84, margin:'0 auto 14px' }}>
          <Avatar avatarUrl={profileData?.avatar_url} name={profileData?.name} email={user.email} size={84}/>
        </div>
        <h2 style={{ margin:'0 0 4px', fontSize:22, fontWeight:700, color:t.text, fontFamily:"'Playfair Display',serif" }}>
          {profileData?.name || 'Member'}
        </h2>
        <div style={{ fontSize:13, color:t.textSub, fontFamily:"'DM Sans',sans-serif", marginBottom:6 }}>{user.email}</div>
        {profileData?.thali_number && (
          <div style={{ display:'inline-block', padding:'4px 16px', borderRadius:20,
            background:t.accentBg, border:`1px solid ${t.accentBorder}`, marginBottom:6 }}>
            <span style={{ fontSize:13, color:t.accent, fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>
              Thali #{profileData.thali_number}
            </span>
          </div>
        )}
        {profileData?.phone && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:6 }}>
            <Phone size={12} color={t.textSub}/>
            <span style={{ fontSize:13, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>{profileData.phone}</span>
          </div>
        )}
        {profileData?.address && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6, marginTop:4 }}>
            <MapPin size={12} color={t.textSub}/>
            <span style={{ fontSize:13, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>{profileData.address}</span>
          </div>
        )}
        <div style={{ fontSize:11, color:t.textSub, marginTop:10, opacity:0.5, fontFamily:"'DM Sans',sans-serif" }}>
          Member since {new Date(user.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
        </div>
        <div style={{ marginTop:12, padding:'10px 14px', borderRadius:10, background:t.accentBg,
          border:`1px solid ${t.accentBorder}`, fontSize:12, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>
          ℹ️ To update your profile details, contact an admin.
        </div>
      </Card>

      {/* My Activity */}
      <SectionLabel>My Activity</SectionLabel>
      <NavCard label="My Surveys"   icon={<ClipboardList size={19} color="#fff"/>}
        desc="View your weekly survey responses" onClick={() => onNav('surveys')}/>
      <NavCard label="My Requests"  icon={<FileText size={19} color="#fff"/>}
        desc="Resume, stop & extra food requests" onClick={() => onNav('requests')}/>
      <NavCard label="Khidmat Guzaar" icon={<Users size={19} color="#fff"/>}
        desc="Meet our Mawaid service team" onClick={() => onNav('khidmat')}/>

      {/* Account */}
      <SectionLabel>Account</SectionLabel>
      <NavCard label="Notification History" icon={<Bell size={19} color="#fff"/>}
        desc="View past notifications & alerts"
        iconBg="linear-gradient(135deg,#6366f1,#4338ca)"
        onClick={() => onNav('notifications')}/>
      <NavCard label="Change Password" icon={<KeyRound size={19} color="#fff"/>}
        desc="Update your login password"
        iconBg="linear-gradient(135deg,#10b981,#059669)"
        onClick={() => onNav('password')}/>

      {/* Support */}
      <SectionLabel>Help & Info</SectionLabel>
      <NavCard label="Support Ticket" icon={<Headphones size={19} color="#fff"/>}
        desc="Raise an issue with the admin team"
        iconBg="linear-gradient(135deg,#f59e0b,#d97706)"
        onClick={() => onNav('support')}/>
      <NavCard label="About Al-Mawaid" icon={<Info size={19} color="#fff"/>}
        desc="App info, version & acknowledgements"
        iconBg="linear-gradient(135deg,#8b5cf6,#6d28d9)"
        onClick={() => onNav('about')}/>

      {/* Theme Switcher */}
      <div style={{ marginTop:20, marginBottom:20 }}>
        <SectionLabel>App Theme</SectionLabel>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {Object.values(THEMES).map(th => (
            <button key={th.id} onClick={() => setTheme(th.id)}
              style={{ padding:'12px 14px', borderRadius:13,
                border:`1.5px solid ${theme===th.id ? th.accent : t.border}`,
                background: theme===th.id ? th.accentBg : t.card,
                cursor:'pointer', display:'flex', alignItems:'center', gap:12, transition:'all 0.25s' }}>
              <div style={{ display:'flex', gap:5, flexShrink:0 }}>
                {[th.bg, th.accent, th.card].map((c,i) => (
                  <div key={i} style={{ width:20, height:20, borderRadius:'50%', background:c,
                    border:'1.5px solid rgba(255,255,255,0.12)' }}/>
                ))}
              </div>
              <div style={{ flex:1, textAlign:'left', fontSize:14, fontWeight:700,
                color: theme===th.id ? th.accent : t.text, fontFamily:"'DM Sans',sans-serif" }}>
                {th.icon} {th.name}
              </div>
              {theme===th.id && <Check size={15} color={th.accent}/>}
            </button>
          ))}
        </div>
      </div>

      <button onClick={signOut}
        style={{ width:'100%', padding:14, borderRadius:13,
          border:'1px solid rgba(220,60,60,0.28)', background:'rgba(220,60,60,0.07)',
          color:'#e05555', fontSize:14, fontWeight:700, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          fontFamily:"'DM Sans',sans-serif" }}>
        <LogOut size={15}/> Sign Out
      </button>
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// NOTIFICATION HISTORY PAGE
// ══════════════════════════════════════════════════════════════
function NotificationHistoryPage({ onBack }) {
  const t = useTheme()
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending:false })
      .limit(50)
      .then(({ data }) => setNotifications(data||[]))
      .finally(() => setLoading(false))
  }, [])

  const typeIcon = (type) => {
    const icons = { info:'ℹ️', alert:'⚠️', success:'✅', announcement:'📢', reminder:'🔔' }
    return icons[type] || '🔔'
  }

  const typeColor = (type) => {
    const colors = { info:'#6366f1', alert:'#f59e0b', success:'#10b981', announcement:'#ec4899', reminder:'#8b5cf6' }
    return colors[type] || t.accent
  }

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          Notification History
        </h2>
      </div>

      {loading ? <Spinner/> : notifications.length === 0 ? (
        <div style={{ textAlign:'center', padding:60 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔔</div>
          <div style={{ fontSize:16, fontWeight:600, color:t.textSub, fontFamily:"'DM Sans',sans-serif", marginBottom:6 }}>
            No notifications yet
          </div>
          <div style={{ fontSize:13, color:t.textSub, opacity:0.6, fontFamily:"'DM Sans',sans-serif" }}>
            You'll see updates and announcements here.
          </div>
        </div>
      ) : notifications.map(n => (
        <div key={n.id} style={{ marginBottom:10, padding:'14px 16px', borderRadius:14,
          background: n.read ? t.card : t.cardActive,
          border:`1px solid ${n.read ? t.border : t.borderActive}`,
          display:'flex', gap:12, alignItems:'flex-start' }}>
          <div style={{ fontSize:22, flexShrink:0, marginTop:2 }}>{typeIcon(n.type)}</div>
          <div style={{ flex:1, minWidth:0 }}>
            {n.title && (
              <div style={{ fontSize:14, fontWeight:700, color:typeColor(n.type),
                fontFamily:"'DM Sans',sans-serif", marginBottom:3 }}>{n.title}</div>
            )}
            <div style={{ fontSize:13, color:t.textBody, lineHeight:1.6,
              fontFamily:"'DM Sans',sans-serif" }}>{n.message}</div>
            <div style={{ fontSize:10, color:t.textSub, marginTop:6, opacity:0.55,
              fontFamily:"'DM Sans',sans-serif" }}>
              {new Date(n.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
            </div>
          </div>
          {!n.read && (
            <div style={{ width:8, height:8, borderRadius:'50%', background:t.accent,
              flexShrink:0, marginTop:6 }}/>
          )}
        </div>
      ))}
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// ABOUT PAGE
// ══════════════════════════════════════════════════════════════
function AboutPage({ onBack }) {
  const t = useTheme()

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          About Al-Mawaid
        </h2>
      </div>

      {/* Logo & Name */}
      <div style={{ textAlign:'center', marginBottom:24, padding:'28px 20px',
        background:t.cardActive, borderRadius:20, border:`1px solid ${t.borderActive}` }}>
        <div style={{ width:80, height:80, margin:'0 auto 14px', borderRadius:'50%',
          background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 8px 28px ${t.accentBg}` }}>
          <img src="/al-mawaid.png" alt="" style={{ width:56, height:56, objectFit:'contain' }}/>
        </div>
        <div style={{ fontSize:26, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif", marginBottom:4 }}>
          Al-Mawaid
        </div>
        <div style={{ fontSize:15, color:t.textSub, fontFamily:"'Amiri',serif", marginBottom:10 }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <div style={{ display:'inline-block', padding:'4px 16px', borderRadius:20,
          background:t.accentBg, border:`1px solid ${t.accentBorder}` }}>
          <span style={{ fontSize:12, color:t.accent, fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>
            Version 5.0.0
          </span>
        </div>
      </div>

      {/* Info Cards */}
      {[
        { title:'What is Al-Mawaid?', body:'Al-Mawaid is a community food service management app that helps members manage their weekly thali subscriptions, submit food preferences, give feedback, and communicate with the service team.' },
        { title:'Survey System', body:'Every week, from Saturday 8:00 PM to Monday 10:00 AM, members can submit their food preferences for the upcoming week. This helps us prepare the right quantity for each member.' },
        { title:'Feedback', body:'After each meal, members can rate their experience from 1–5 stars and leave comments. This helps the team continuously improve food quality.' },
        { title:'Acknowledgements', body:'Built with care for the Al-Mawaid community. Powered by Supabase, React, and Vite. May Allah accept this service. آمین' },
      ].map(({ title, body }) => (
        <Card key={title} style={{ marginBottom:12 }}>
          <div style={{ fontSize:14, fontWeight:700, color:t.accent, marginBottom:8,
            fontFamily:"'Playfair Display',serif" }}>{title}</div>
          <div style={{ fontSize:13, color:t.textBody, lineHeight:1.7, fontFamily:"'DM Sans',sans-serif" }}>
            {body}
          </div>
        </Card>
      ))}

      <div style={{ textAlign:'center', marginTop:20, fontSize:12, color:t.textSub, opacity:0.5,
        fontFamily:"'DM Sans',sans-serif" }}>
        Made with ❤️ for the community · © 2025 Al-Mawaid
      </div>
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// SUPPORT TICKET PAGE
// ══════════════════════════════════════════════════════════════
function SupportTicketPage({ onBack }) {
  const t = useTheme()
  const { user } = useAuth()
  const [tickets, setTickets]     = useState([])
  const [loading, setLoading]     = useState(true)
  const [subject, setSubject]     = useState('')
  const [message, setMessage]     = useState('')
  const [category, setCategory]   = useState('general')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]         = useState('')
  const [success, setSuccess]     = useState('')

  const CATEGORIES = [
    { id:'general',  label:'General' },
    { id:'food',     label:'Food Quality' },
    { id:'delivery', label:'Delivery' },
    { id:'billing',  label:'Billing' },
    { id:'account',  label:'Account' },
    { id:'other',    label:'Other' },
  ]

  useEffect(() => { loadTickets() }, [])

  const loadTickets = async () => {
    try {
      const { data } = await supabase.from('support_tickets')
        .select('*').eq('user_id', user.id)
        .order('created_at', { ascending:false }).limit(20)
      setTickets(data||[])
    } catch {}
    finally { setLoading(false) }
  }

  const handleSubmit = async () => {
    if (!subject.trim()) return setError('Please enter a subject')
    if (!message.trim()) return setError('Please describe your issue')
    setError(''); setSuccess(''); setSubmitting(true)
    try {
      const { error:dbErr } = await supabase.from('support_tickets').insert([{
        user_id:user.id, subject:subject.trim(), message:message.trim(),
        category, status:'open'
      }])
      if (dbErr) throw dbErr
      setSuccess('✅ Ticket submitted! Our team will respond within 24 hours.')
      setSubject(''); setMessage(''); setCategory('general')
      loadTickets()
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  const statusColor = s => s==='open' ? '#f59e0b' : s==='in_progress' ? '#6366f1' : s==='resolved' ? '#10b981' : '#9aabb8'
  const statusLabel = s => s==='open' ? 'Open' : s==='in_progress' ? 'In Progress' : s==='resolved' ? 'Resolved' : s

  const inp = {
    width:'100%', padding:'11px 13px', borderRadius:11, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
    fontSize:14, outline:'none', fontFamily:"'DM Sans',sans-serif"
  }

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          Support Ticket
        </h2>
      </div>

      {/* New Ticket Form */}
      <Card style={{ marginBottom:20 }}>
        <div style={{ fontSize:15, fontWeight:700, color:t.accent, marginBottom:14,
          fontFamily:"'Playfair Display',serif", display:'flex', alignItems:'center', gap:8 }}>
          <Headphones size={16}/> New Support Request
        </div>

        {/* Category */}
        <div style={{ marginBottom:12 }}>
          <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
            marginBottom:7, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>CATEGORY</label>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCategory(c.id)}
                style={{ padding:'5px 12px', borderRadius:20,
                  border:`1.5px solid ${category===c.id ? t.accent : t.border}`,
                  background: category===c.id ? t.accentBg : 'transparent',
                  color: category===c.id ? t.accent : t.textSub,
                  fontSize:12, fontWeight:700, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Subject */}
        <div style={{ marginBottom:10 }}>
          <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
            marginBottom:7, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>SUBJECT</label>
          <input type="text" value={subject} onChange={e => setSubject(e.target.value)}
            placeholder="Brief summary of your issue" style={inp}/>
        </div>

        {/* Message */}
        <div style={{ marginBottom:14 }}>
          <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
            marginBottom:7, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>MESSAGE</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)}
            style={{ ...inp, minHeight:100, resize:'vertical' }}
            placeholder="Describe your issue in detail…"/>
        </div>

        {error   && <ErrorBanner msg={error}/>}
        {success && (
          <div style={{ marginBottom:10, padding:11, borderRadius:10,
            background:t.successBg, border:`1px solid ${t.successBorder}`,
            color:t.successText, fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>{success}</div>
        )}

        <button onClick={handleSubmit} disabled={submitting}
          style={{ width:'100%', padding:12, borderRadius:11, border:'none',
            background: submitting ? t.border : t.accentGrad, color:'#fff',
            fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer', fontSize:14,
            fontFamily:"'DM Sans',sans-serif" }}>
          {submitting ? 'Submitting…' : '📨 Submit Ticket'}
        </button>
      </Card>

      {/* Past Tickets */}
      <SectionLabel>My Tickets</SectionLabel>
      {loading ? <Spinner/> : tickets.length === 0 ? (
        <div style={{ textAlign:'center', padding:36, color:t.textSub, fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>
          No tickets yet.
        </div>
      ) : tickets.map(ticket => (
        <Card key={ticket.id} style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
            <div style={{ fontSize:14, fontWeight:700, color:t.text, fontFamily:"'DM Sans',sans-serif", flex:1, paddingRight:8 }}>
              {ticket.subject}
            </div>
            <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20, flexShrink:0,
              background:`${statusColor(ticket.status)}20`, color:statusColor(ticket.status),
              border:`1px solid ${statusColor(ticket.status)}40`, fontFamily:"'DM Sans',sans-serif" }}>
              {statusLabel(ticket.status)}
            </span>
          </div>
          <div style={{ fontSize:11, color:t.textSub, marginBottom:6, fontFamily:"'DM Sans',sans-serif" }}>
            {ticket.category?.charAt(0).toUpperCase() + ticket.category?.slice(1)} ·{' '}
            {new Date(ticket.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
          </div>
          <div style={{ fontSize:13, color:t.textBody, lineHeight:1.6, fontFamily:"'DM Sans',sans-serif" }}>
            {ticket.message}
          </div>
          {ticket.admin_reply && (
            <div style={{ marginTop:10, padding:'10px 12px', borderRadius:10, background:t.accentBg,
              border:`1px solid ${t.accentBorder}`, fontSize:13, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>
              💬 <strong>Admin Reply:</strong> {ticket.admin_reply}
            </div>
          )}
        </Card>
      ))}
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// CHANGE PASSWORD PAGE
// ══════════════════════════════════════════════════════════════
function ChangePasswordPage({ onBack }) {
  const t = useTheme()
  const [current, setCurrent]   = useState('')
  const [newPass, setNewPass]   = useState('')
  const [confirm, setConfirm]   = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew,     setShowNew]     = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState('')

  const handleChange = async () => {
    setError(''); setSuccess('')
    if (!newPass) return setError('Please enter a new password')
    if (newPass.length < 6) return setError('Password must be at least 6 characters')
    if (newPass !== confirm) return setError('Passwords do not match')
    setLoading(true)
    try {
      const { error: authErr } = await supabase.auth.updateUser({ password: newPass })
      if (authErr) throw authErr
      setSuccess('✅ Password updated successfully!')
      setCurrent(''); setNewPass(''); setConfirm('')
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  const inp = {
    width:'100%', padding:'13px 13px 13px 44px', borderRadius:12, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
    fontSize:15, outline:'none', fontFamily:"'DM Sans',sans-serif"
  }

  const PasswordField = ({ label, value, onChange, show, setShow, placeholder }) => (
    <div style={{ marginBottom:14 }}>
      <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
        marginBottom:7, letterSpacing:'0.14em', fontFamily:"'DM Sans',sans-serif" }}>{label}</label>
      <div style={{ position:'relative' }}>
        <Lock size={14} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:t.accent, opacity:0.6 }}/>
        <input type={show ? 'text' : 'password'} value={value} onChange={e => onChange(e.target.value)}
          style={{ ...inp, paddingRight:44 }} placeholder={placeholder}/>
        <button type="button" onClick={() => setShow(!show)}
          style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
            background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
          {show ? <EyeOff size={14} color={t.accent}/> : <Eye size={14} color={t.accent}/>}
        </button>
      </div>
    </div>
  )

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          Change Password
        </h2>
      </div>

      <Card>
        <div style={{ fontSize:15, fontWeight:700, color:t.accent, marginBottom:18,
          fontFamily:"'Playfair Display',serif", display:'flex', alignItems:'center', gap:8 }}>
          <KeyRound size={16}/> Update Your Password
        </div>

        <PasswordField label="NEW PASSWORD" value={newPass} onChange={setNewPass}
          show={showNew} setShow={setShowNew} placeholder="Min. 6 characters"/>
        <PasswordField label="CONFIRM PASSWORD" value={confirm} onChange={setConfirm}
          show={showConfirm} setShow={setShowConfirm} placeholder="Repeat new password"/>

        {/* Strength indicator */}
        {newPass && (
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:t.textSub, marginBottom:5, fontFamily:"'DM Sans',sans-serif" }}>
              Password strength
            </div>
            <div style={{ height:4, background:t.border, borderRadius:4, overflow:'hidden' }}>
              <div style={{
                height:'100%', borderRadius:4, transition:'width 0.3s',
                width: newPass.length < 6 ? '25%' : newPass.length < 10 ? '55%' : '100%',
                background: newPass.length < 6 ? '#e05555' : newPass.length < 10 ? '#f59e0b' : '#10b981'
              }}/>
            </div>
          </div>
        )}

        {error   && <ErrorBanner msg={error}/>}
        {success && (
          <div style={{ marginBottom:14, padding:11, borderRadius:10,
            background:t.successBg, border:`1px solid ${t.successBorder}`,
            color:t.successText, fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>{success}</div>
        )}

        <button onClick={handleChange} disabled={loading}
          style={{ width:'100%', padding:14, borderRadius:12, border:'none',
            background: loading ? t.border : t.accentGrad, color:'#fff', fontSize:15,
            fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily:"'DM Sans',sans-serif", opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Updating…' : '🔐 Update Password'}
        </button>
      </Card>
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// MY SURVEYS
// ══════════════════════════════════════════════════════════════
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
        ;(data||[]).forEach(r => {
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
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          My Surveys
        </h2>
      </div>

      {loading ? <Spinner/> : DAYS.map(day => {
        const dayData = surveys[day]
        if (!dayData) return null
        return (
          <Card key={day} active style={{ marginBottom:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <img src="/al-mawaid.png" alt="" style={{ width:28, height:28, objectFit:'contain' }}/>
              <div style={{ fontSize:16, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
                {WEEKLY_MENU[day].en}
              </div>
            </div>
            {['lunch','dinner'].map(meal => {
              const r = dayData[meal]
              if (!r) return null
              return (
                <div key={meal} style={{ marginBottom:8, padding:11, background:t.inputBg,
                  borderRadius:10, border:`1px solid ${t.border}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                    <span style={{ fontSize:12, fontWeight:700, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>
                      {meal === 'lunch' ? '☀️ Lunch' : '🌙 Dinner'}
                    </span>
                    <span style={{ fontSize:10, color: (r.edit_count||0) < 1 ? t.accent : '#e05555',
                      fontFamily:"'DM Sans',sans-serif", fontWeight:600 }}>
                      {(r.edit_count||0) < 1 ? '1 edit left' : 'no edits left'}
                    </span>
                  </div>
                  <div style={{ fontSize:13, color: r.wants_food ? t.successText : '#e05555',
                    fontWeight:700, fontFamily:"'DM Sans',sans-serif", marginBottom: r.wants_food ? 6 : 0 }}>
                    {r.wants_food ? '✅ Requested Food' : '❌ Skipped'}
                  </div>
                  {r.wants_food && r.dish_responses && Object.entries(r.dish_responses).map(([dish, val]) => (
                    <div key={dish} style={{ display:'flex', justifyContent:'space-between',
                      padding:'4px 0', borderBottom:`1px solid ${t.border}` }}>
                      <span style={{ fontSize:12, color:t.textBody, fontFamily:"'DM Sans',sans-serif" }}>{dish}</span>
                      <span style={{ fontSize:12, fontWeight:700, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>
                        {val === 'yes' ? '✅' : val === 'no' ? '❌' : `${val}%`}
                      </span>
                    </div>
                  ))}
                </div>
              )
            })}
          </Card>
        )
      })}

      {Object.keys(surveys).length === 0 && !loading && (
        <div style={{ textAlign:'center', padding:48, color:t.textSub, fontSize:15,
          fontFamily:"'DM Sans',sans-serif" }}>No surveys submitted yet.</div>
      )}
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// MY REQUESTS
// ══════════════════════════════════════════════════════════════
function MyRequestsPage({ onBack }) {
  const t = useTheme()
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    supabase.from('thali_requests').select('*').eq('user_id', user.id)
      .order('created_at', { ascending:false })
      .then(({ data }) => setRequests(data||[]))
      .finally(() => setLoading(false))
  }, [])

  const statusColor = s => s==='pending' ? '#d4882a' : s==='approved' ? '#5eba82' : '#e05555'
  const typeLabel   = t => t === 'resume' ? '▶️ Resume' : t === 'stop' ? '⏹️ Stop' : '➕ Extra Food'

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          My Requests
        </h2>
      </div>
      {loading ? <Spinner/> : requests.length === 0 ? (
        <div style={{ textAlign:'center', padding:48, color:t.textSub, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
          No requests yet.
        </div>
      ) : requests.map(r => (
        <Card key={r.id} style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:6 }}>
            <span style={{ fontSize:15, fontWeight:700, color:t.text, fontFamily:"'DM Sans',sans-serif" }}>{typeLabel(r.request_type)}</span>
            <span style={{ fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20,
              background:`${statusColor(r.status)}20`, color:statusColor(r.status),
              border:`1px solid ${statusColor(r.status)}40`, fontFamily:"'DM Sans',sans-serif" }}>
              {r.status?.toUpperCase()}
            </span>
          </div>
          {r.from_date && <div style={{ fontSize:12, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>{r.from_date} → {r.to_date}</div>}
          {r.extra_items && <div style={{ fontSize:12, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>{r.extra_items.map(i => `${i.name} ×${i.qty}`).join(', ')}</div>}
          {r.admin_note && <div style={{ marginTop:8, fontSize:12, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>📝 {r.admin_note}</div>}
          <div style={{ fontSize:10, color:t.textSub, marginTop:6, opacity:0.5, fontFamily:"'DM Sans',sans-serif" }}>
            {new Date(r.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
          </div>
        </Card>
      ))}
    </main>
  )
}

// ══════════════════════════════════════════════════════════════
// KHIDMAT GUZAAR — with phone & WhatsApp links
// ══════════════════════════════════════════════════════════════
function KhidmatPage({ onBack }) {
  const t = useTheme()
  const [staff, setStaff]     = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('khidmat_guzaar').select('*').order('sort_order', { ascending:true })
      .then(({ data }) => setStaff(data||[]))
      .finally(() => setLoading(false))
  }, [])

  // Strips non-digits and formats for tel: and wa.me links
  const cleanPhone = (phone) => phone ? phone.replace(/\D/g, '') : ''

  const handleCall = (phone) => {
    const num = cleanPhone(phone)
    if (num) window.open(`tel:${num}`, '_self')
  }

  const handleWhatsApp = (phone) => {
    const num = cleanPhone(phone)
    if (num) window.open(`https://wa.me/${num}`, '_blank')
  }

  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
          <ChevronLeft size={20} color={t.accent}/>
        </button>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
          Khidmat Guzaar
        </h2>
      </div>

      {/* Banner */}
      <div style={{ marginBottom:16, padding:'14px 16px', borderRadius:14,
        background:t.accentBg, border:`1px solid ${t.accentBorder}` }}>
        <div style={{ fontSize:14, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif", marginBottom:4 }}>
          🤝 Our Mawaid Team
        </div>
        <div style={{ fontSize:13, color:t.textBody, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>
          Meet the dedicated team who make every meal possible. Tap the phone or WhatsApp icon to reach them directly.
        </div>
      </div>

      {loading ? <Spinner/> : staff.length === 0 ? (
        <div style={{ textAlign:'center', padding:48, color:t.textSub, fontSize:15, fontFamily:"'DM Sans',sans-serif" }}>
          No staff profiles available.
        </div>
      ) : staff.map(member => (
        <Card key={member.id} active style={{ marginBottom:12 }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
            <Avatar avatarUrl={member.avatar_url} name={member.name} email="" size={58}/>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:17, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif" }}>
                {member.name}
              </div>
              {member.role && (
                <div style={{ display:'inline-block', marginTop:4, padding:'2px 10px',
                  borderRadius:20, background:t.accentBg, border:`1px solid ${t.accentBorder}` }}>
                  <span style={{ fontSize:11, fontWeight:700, color:t.accent, fontFamily:"'DM Sans',sans-serif" }}>
                    {member.role}
                  </span>
                </div>
              )}
              {member.area && (
                <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:6 }}>
                  <MapPin size={11} color={t.textSub}/>
                  <span style={{ fontSize:12, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>{member.area}</span>
                </div>
              )}

              {/* Phone number display */}
              {member.phone && (
                <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:4 }}>
                  <Phone size={11} color={t.textSub}/>
                  <span style={{ fontSize:12, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>{member.phone}</span>
                </div>
              )}

              {/* Action buttons — only if phone exists */}
              {member.phone && (
                <div style={{ display:'flex', gap:8, marginTop:10 }}>
                  {/* Call Button */}
                  <button
                    onClick={() => handleCall(member.phone)}
                    style={{
                      flex:1, padding:'8px 10px', borderRadius:10,
                      border:`1.5px solid ${t.accentBorder}`,
                      background:t.accentBg,
                      color:t.accent, fontSize:12, fontWeight:700,
                      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                      fontFamily:"'DM Sans',sans-serif", transition:'all 0.2s'
                    }}>
                    <Phone size={13}/>
                    Call
                  </button>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => handleWhatsApp(member.phone)}
                    style={{
                      flex:1, padding:'8px 10px', borderRadius:10,
                      border:'1.5px solid rgba(37,211,102,0.35)',
                      background:'rgba(37,211,102,0.10)',
                      color:'#25d366', fontSize:12, fontWeight:700,
                      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6,
                      fontFamily:"'DM Sans',sans-serif", transition:'all 0.2s'
                    }}>
                    {/* WhatsApp SVG icon */}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </Card>
      ))}

      {/* Mawaid Helpline Section */}
      <div style={{ marginTop:8, marginBottom:4 }}>
        <SectionLabel>Al-Mawaid Helpline</SectionLabel>
        <Card active style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <div style={{ fontSize:14, fontWeight:700, color:t.accent, fontFamily:"'Playfair Display',serif", marginBottom:4 }}>
            📞 General Helpline
          </div>
          <div style={{ fontSize:13, color:t.textBody, fontFamily:"'DM Sans',sans-serif", lineHeight:1.6 }}>
            For general inquiries, thali issues, or urgent requests — reach us directly.
          </div>

          {/* Static helpline — update number as needed */}
          <HelplineContact
            name="Al-Mawaid Office"
            phone="919999999999"
            label="Helpline"
          />
        </Card>
      </div>
    </main>
  )
}

/* ─── Helpline Contact Row ───────────────────────────────────── */
function HelplineContact({ name, phone, label }) {
  const t = useTheme()

  const handleCall = () => {
    if (phone) window.open(`tel:${phone}`, '_self')
  }

  const handleWhatsApp = () => {
    if (phone) window.open(`https://wa.me/${phone}`, '_blank')
  }

  return (
    <div style={{ padding:'12px 0', borderTop:`1px solid ${t.border}` }}>
      <div style={{ fontSize:13, fontWeight:700, color:t.text, fontFamily:"'DM Sans',sans-serif", marginBottom:2 }}>
        {name}
      </div>
      {label && (
        <div style={{ fontSize:11, color:t.textSub, fontFamily:"'DM Sans',sans-serif", marginBottom:8 }}>
          {label} · +{phone}
        </div>
      )}
      <div style={{ display:'flex', gap:8 }}>
        <button onClick={handleCall}
          style={{ flex:1, padding:'8px 10px', borderRadius:10,
            border:`1.5px solid ${t.accentBorder}`, background:t.accentBg,
            color:t.accent, fontSize:12, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            fontFamily:"'DM Sans',sans-serif" }}>
          <Phone size={13}/> Call
        </button>
        <button onClick={handleWhatsApp}
          style={{ flex:1, padding:'8px 10px', borderRadius:10,
            border:'1.5px solid rgba(37,211,102,0.35)', background:'rgba(37,211,102,0.10)',
            color:'#25d366', fontSize:12, fontWeight:700, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center', gap:6,
            fontFamily:"'DM Sans',sans-serif" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          WhatsApp
        </button>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// REQUESTS PAGE (Post tab)
// ══════════════════════════════════════════════════════════════
function PostPage() {
  const t = useTheme()
  const [subTab, setSubTab] = useState('requests')
  return (
    <main style={{ flex:1, padding:'16px 16px 96px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>
      <div style={{ display:'flex', gap:6, marginBottom:18, background:t.card,
        borderRadius:13, padding:5, border:`1px solid ${t.border}` }}>
        {[{ id:'requests', label:'📋 Requests' }, { id:'queries', label:'❓ Queries' }].map(({ id, label }) => (
          <button key={id} onClick={() => setSubTab(id)}
            style={{ flex:1, padding:'10px 12px', borderRadius:9, border:'none',
              background: subTab===id ? t.accentGrad : 'transparent',
              color: subTab===id ? '#fff' : t.textSub,
              fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:"'DM Sans',sans-serif",
              transition:'all 0.25s' }}>
            {label}
          </button>
        ))}
      </div>
      {subTab === 'requests' && <ThaliRequestsSection/>}
      {subTab === 'queries'  && <QueriesSection/>}
    </main>
  )
}

// ── Thali Requests ────────────────────────────────────────────
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
        if (!resumeFrom || !resumeTo) throw new Error('Please select both dates')
        payload = { ...payload, from_date:resumeFrom, to_date:resumeTo }
      } else if (type === 'stop') {
        if (!stopFrom || !stopTo) throw new Error('Please select both dates')
        payload = { ...payload, from_date:stopFrom, to_date:stopTo }
      } else if (type === 'extra') {
        const valid = extraItems.filter(i => i.name.trim())
        if (!valid.length) throw new Error('Please add at least one item')
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
  const inp = {
    width:'100%', padding:'11px 13px', borderRadius:11, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
    fontSize:14, outline:'none', fontFamily:"'DM Sans',sans-serif"
  }

  const RCard = ({ type, children }) => (
    <div style={{ marginBottom:10, borderRadius:14,
      border:`1px solid ${activeRequest===type ? t.borderActive : t.border}`,
      background: activeRequest===type ? t.cardActive : t.card, overflow:'hidden' }}>
      {children}
    </div>
  )
  const HdrBtn = ({ type, emoji, label, desc }) => (
    <button onClick={() => openRequest(type)}
      style={{ width:'100%', padding:15, background:'transparent', border:'none',
        cursor:'pointer', display:'flex', alignItems:'center', gap:14, textAlign:'left' }}>
      <div style={{ width:44, height:44, borderRadius:12, background:t.accentGrad,
        display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
        {emoji}
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:15, fontWeight:700, color: activeRequest===type ? t.accent : t.text,
          fontFamily:"'DM Sans',sans-serif" }}>{label}</div>
        <div style={{ fontSize:12, color:t.textSub, marginTop:1, fontFamily:"'DM Sans',sans-serif" }}>{desc}</div>
      </div>
      {activeRequest===type ? <ChevronUp size={14} color={t.accent}/> : <ChevronDown size={14} color={t.accent}/>}
    </button>
  )

  return (
    <div>
      {success && (
        <div style={{ marginBottom:12, padding:13, borderRadius:12,
          background:t.successBg, border:`1px solid ${t.successBorder}`,
          color:t.successText, fontSize:14, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>{success}</div>
      )}

      <RCard type="resume">
        <HdrBtn type="resume" emoji="▶️" label="Resume Thali" desc="Restart your thali service"/>
        {activeRequest === 'resume' && (
          <div style={{ padding:'0 16px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
                  marginBottom:6, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>FROM</label>
                <input type="date" value={resumeFrom} min={today} onChange={e => setResumeFrom(e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
                  marginBottom:6, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>TO</label>
                <input type="date" value={resumeTo} min={resumeFrom||today} onChange={e => setResumeTo(e.target.value)} style={inp}/>
              </div>
            </div>
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('resume')} disabled={submitting}
              style={{ width:'100%', padding:12, borderRadius:11, border:'none',
                background: submitting ? t.border : t.accentGrad, color:'#fff',
                fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>
              {submitting ? 'Submitting…' : '✅ Submit Resume Request'}
            </button>
          </div>
        )}
      </RCard>

      <RCard type="stop">
        <HdrBtn type="stop" emoji="⏹️" label="Stop Thali" desc="Pause your thali service"/>
        {activeRequest === 'stop' && (
          <div style={{ padding:'0 16px 16px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:12 }}>
              <div>
                <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
                  marginBottom:6, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>FROM</label>
                <input type="date" value={stopFrom} min={today} onChange={e => setStopFrom(e.target.value)} style={inp}/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:10, fontWeight:700, color:t.textSub,
                  marginBottom:6, letterSpacing:'0.12em', fontFamily:"'DM Sans',sans-serif" }}>TO</label>
                <input type="date" value={stopTo} min={stopFrom||today} onChange={e => setStopTo(e.target.value)} style={inp}/>
              </div>
            </div>
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('stop')} disabled={submitting}
              style={{ width:'100%', padding:12, borderRadius:11, border:'none',
                background: submitting ? t.border : 'linear-gradient(135deg,#e05555,#c03030)',
                color:'#fff', fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>
              {submitting ? 'Submitting…' : '⏹️ Submit Stop Request'}
            </button>
          </div>
        )}
      </RCard>

      <RCard type="extra">
        <HdrBtn type="extra" emoji="➕" label="Add Extra Food" desc="Request additional items"/>
        {activeRequest === 'extra' && (
          <div style={{ padding:'0 16px 16px' }}>
            {extraItems.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:8 }}>
                <input type="text" value={item.name} placeholder={`Item ${i+1}`}
                  onChange={e => updateExtraItem(i,'name',e.target.value)} style={{ ...inp, flex:1 }}/>
                <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                  {[1,2,3,4].map(n => (
                    <button key={n} onClick={() => updateExtraItem(i,'qty',n)}
                      style={{ width:32, height:36, borderRadius:9,
                        border:`1.5px solid ${item.qty===n ? t.accent : t.border}`,
                        background: item.qty===n ? t.accentBg : 'transparent',
                        color: item.qty===n ? t.accent : t.textSub,
                        fontWeight:700, fontSize:13, cursor:'pointer', fontFamily:"'DM Sans',sans-serif" }}>
                      {n}
                    </button>
                  ))}
                </div>
                {extraItems.length > 1 && (
                  <button onClick={() => removeExtraItem(i)}
                    style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
                    <X size={15} color="#e05555"/>
                  </button>
                )}
              </div>
            ))}
            {extraItems.length < 6 && (
              <button onClick={addExtraItem}
                style={{ width:'100%', padding:10, borderRadius:11,
                  border:`1px dashed ${t.accent}`, background:'transparent',
                  color:t.accent, fontWeight:600, fontSize:13, cursor:'pointer', marginBottom:10,
                  fontFamily:"'DM Sans',sans-serif" }}>
                + Add Another Item
              </button>
            )}
            {error && <ErrorBanner msg={error}/>}
            <button onClick={() => handleSubmit('extra')} disabled={submitting}
              style={{ width:'100%', padding:12, borderRadius:11, border:'none',
                background: submitting ? t.border : t.accentGrad, color:'#fff',
                fontWeight:700, cursor:'pointer', fontSize:14, fontFamily:"'DM Sans',sans-serif" }}>
              {submitting ? 'Submitting…' : '➕ Submit Extra Food Request'}
            </button>
          </div>
        )}
      </RCard>
    </div>
  )
}

// ── Queries ───────────────────────────────────────────────────
function QueriesSection() {
  const t = useTheme()
  const { user } = useAuth()
  const [queries, setQueries]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [comment, setComment]   = useState('')
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
      setQueries(data||[])
    } catch {}
    finally { setLoading(false) }
  }

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files).filter(f => f.type.startsWith('image/') || f.type.startsWith('video/'))
    if (mediaFiles.length + files.length > 4) { setError('Max 4 files'); return }
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
        const ext  = item.file.name.split('.').pop()
        const path = `queries/${user.id}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
        const { error:upErr } = await supabase.storage.from('query-media').upload(path, item.file)
        if (!upErr) {
          const { data:urlData } = supabase.storage.from('query-media').getPublicUrl(path)
          uploadedUrls.push({ type:item.type, name:item.file.name, path:urlData.publicUrl })
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

  const statusColor = s => s==='open' ? '#d4882a' : s==='resolved' ? '#5eba82' : '#7aabb8'

  return (
    <div>
      <Card style={{ marginBottom:18 }}>
        <div style={{ fontSize:15, fontWeight:700, color:t.accent, marginBottom:12,
          fontFamily:"'Playfair Display',serif" }}>✉️ New Query</div>
        <textarea value={comment} onChange={e => setComment(e.target.value)}
          style={{ width:'100%', minHeight:78, padding:12, borderRadius:11, boxSizing:'border-box',
            background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
            fontSize:14, resize:'vertical', outline:'none', fontFamily:"'DM Sans',sans-serif", marginBottom:10 }}
          placeholder="Describe your query or issue…"/>
        {mediaFiles.length > 0 && (
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {mediaFiles.map((item, i) => (
              <div key={i} style={{ position:'relative', width:68, height:68, borderRadius:10,
                overflow:'hidden', border:`1px solid ${t.border}`, flexShrink:0 }}>
                {item.type === 'image'
                  ? <img src={item.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:'100%', background:t.inputBg,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:24 }}>🎬</div>}
                <button onClick={() => removeMedia(i)}
                  style={{ position:'absolute', top:3, right:3, width:18, height:18, borderRadius:'50%',
                    background:'rgba(0,0,0,0.72)', border:'none', cursor:'pointer',
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
            style={{ width:'100%', padding:10, borderRadius:11,
              border:`1px dashed ${t.accentBorder}`, background:t.accentBg,
              color:t.accent, fontWeight:600, fontSize:13, cursor:'pointer', marginBottom:10,
              display:'flex', alignItems:'center', justifyContent:'center', gap:7,
              fontFamily:"'DM Sans',sans-serif" }}>
            <Camera size={14}/> Attach Photo / Video ({mediaFiles.length}/4)
          </button>
        )}
        {error   && <ErrorBanner msg={error}/>}
        {success && (
          <div style={{ marginBottom:10, padding:11, borderRadius:10,
            background:t.successBg, border:`1px solid ${t.successBorder}`,
            color:t.successText, fontSize:13, fontWeight:600, fontFamily:"'DM Sans',sans-serif" }}>{success}</div>
        )}
        <button onClick={handleSubmit} disabled={submitting}
          style={{ width:'100%', padding:12, borderRadius:11, border:'none',
            background: submitting ? t.border : t.accentGrad, color:'#fff',
            fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer', fontSize:14,
            fontFamily:"'DM Sans',sans-serif" }}>
          {submitting ? 'Submitting…' : '📨 Submit Query'}
        </button>
      </Card>

      <SectionLabel>My Queries</SectionLabel>
      {loading ? <Spinner/> : queries.length === 0 ? (
        <div style={{ textAlign:'center', padding:40, color:t.textSub, fontSize:14,
          fontFamily:"'DM Sans',sans-serif" }}>No queries yet.</div>
      ) : queries.map(q => (
        <Card key={q.id} style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:11, color:t.textSub, fontFamily:"'DM Sans',sans-serif" }}>
              {new Date(q.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
            </span>
            <span style={{ fontSize:10, fontWeight:700, padding:'2px 9px', borderRadius:20,
              background:`${statusColor(q.status)}20`, color:statusColor(q.status),
              border:`1px solid ${statusColor(q.status)}38`, fontFamily:"'DM Sans',sans-serif" }}>
              {q.status?.toUpperCase()}
            </span>
          </div>
          {q.comment && (
            <p style={{ margin:'0 0 8px', fontSize:14, color:t.textBody, lineHeight:1.6,
              fontFamily:"'DM Sans',sans-serif" }}>{q.comment}</p>
          )}
          {q.media && q.media.length > 0 && (
            <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:6 }}>
              {q.media.map((m,i) => m.path && m.type === 'image' && (
                <img key={i} src={m.path} alt="" style={{ width:56, height:56, borderRadius:8, objectFit:'cover' }}/>
              ))}
            </div>
          )}
          {q.admin_reply && (
            <div style={{ marginTop:8, padding:10, borderRadius:9, background:t.accentBg,
              border:`1px solid ${t.accentBorder}`, fontSize:13, color:t.accent,
              fontFamily:"'DM Sans',sans-serif" }}>
              💬 <strong>Reply:</strong> {q.admin_reply}
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════
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
        display:'flex', alignItems:'center', justifyContent:'center' }}>
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
          fontFamily:"'DM Sans','Segoe UI',-apple-system,sans-serif",
          minHeight:'100vh', background:t.bgGrad, color:t.text,
          display:'flex', flexDirection:'column' }}>

          {/* Header */}
          <header style={{ position:'relative', overflow:'hidden',
            background:t.bgGrad, padding:'14px 18px 0', flexShrink:0 }}>
            <GeoBg t={t}/>
            <div style={{ position:'relative', zIndex:1,
              display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <img src="/al-mawaid.png" alt=""
                  style={{ width:24, height:24, objectFit:'contain',
                    filter:'drop-shadow(0 2px 6px rgba(196,156,90,0.5))' }}/>
                <span style={{ fontSize:9, letterSpacing:'0.24em', textTransform:'uppercase',
                  color:t.textSub, opacity:0.55, fontWeight:700, fontFamily:"'DM Sans',sans-serif" }}>
                  Al-Mawaid
                </span>
              </div>
              <span style={{ fontSize:11, color:t.textSub, opacity:0.4, fontFamily:"'DM Sans',sans-serif" }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>

            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:2 }}>
                <p style={{ fontFamily:"'Noto Nastaliq Urdu','Amiri',serif", fontSize:16, color:t.accent, margin:0, lineHeight:1.8 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}

            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:6 }}>
              <h1 style={{ margin:0, fontSize: activeTab==='home' ? 28 : 20,
                fontWeight:700, letterSpacing:'0.06em', lineHeight:1.1, color:t.accent,
                fontFamily:"'Playfair Display',serif" }}>
                {tabLabels[activeTab]}
              </h1>
            </div>

            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 28" preserveAspectRatio="none">
              <path d="M0,10 C200,28 400,0 600,14 C800,28 1000,4 1200,18 C1320,26 1400,10 1440,14 L1440,28 L0,28 Z"
                fill={t.headerWave} opacity="0.9"/>
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
            padding:'8px 4px 18px', background:t.navBg,
            borderTop:`1px solid ${t.navBorder}`,
            boxShadow:`0 -8px 30px rgba(0,0,0,0.20)` }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ background:'none', border:'none', cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                    padding:'2px 14px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
                  {active && (
                    <div style={{ position:'absolute', top:-8, left:'50%', transform:'translateX(-50%)',
                      width:28, height:2.5, borderRadius:6, background:t.accent }}/>
                  )}
                  <div style={{ width:36, height:36, borderRadius:'50%', transition:'all 0.25s',
                    background: active ? t.accentBg : 'transparent',
                    border: active ? `1px solid ${t.accentBorder}` : '1px solid transparent',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={16} color={active ? t.accent : t.textSub}
                      strokeWidth={active ? 2.2 : 1.5} style={{ opacity: active ? 1 : 0.5 }}/>
                  </div>
                  <span style={{ fontSize:8, fontWeight:700, letterSpacing:'0.06em',
                    color: active ? t.accent : t.textSub, opacity: active ? 1 : 0.45,
                    fontFamily:"'DM Sans',sans-serif" }}>
                    {label}
                  </span>
                </button>
              )
            })}
          </nav>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@400;500;600;700;800&family=Amiri:wght@400;700&display=swap');
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.8s linear infinite; }
            * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
            body { margin: 0; }
            ::-webkit-scrollbar { display: none; }
            input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
            textarea::placeholder, input::placeholder { opacity: 0.45; }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
