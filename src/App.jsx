// src/App.jsx — Al-Mawaid Food Survey System v2
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, User, X,
  Star, Camera, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ChevronUp,
  ClipboardList, Edit3, MessageCircle, ChevronLeft, ChevronRight,
  Palette, Sun, Moon, Sparkles, Phone, MapPin, Clock, Info
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── THEMES ──────────────────────────────────────────────────
const THEMES = {
  night: {
    id: 'night', name: 'Midnight Gold', icon: '🌙',
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
  ivory: {
    id: 'ivory', name: 'Ivory & Oud', icon: '☀️',
    bg: '#faf7f0', bgGrad: 'linear-gradient(180deg,#faf7f0 0%,#f5efe0 60%,#faf7f0 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#fffbf0,#fdf6e3)',
    border: 'rgba(180,140,60,0.18)', borderActive: 'rgba(160,110,30,0.50)',
    accent: '#8b5e1a', accentGrad: 'linear-gradient(135deg,#b8860b,#8b5e1a)',
    accentBg: 'rgba(184,134,11,0.10)', accentBorder: 'rgba(184,134,11,0.35)',
    text: '#1a1008', textSub: '#6b4c1e', textBody: '#4a3010',
    navBg: 'linear-gradient(180deg,#faf7f0,#f5efe0)', navBorder: 'rgba(184,134,11,0.25)',
    geo: 'rgba(180,140,60,0.08)',
    spinnerBorder: 'rgba(184,134,11,0.2)', spinnerTop: '#b8860b',
    inputBg: 'rgba(184,134,11,0.05)', inputBorder: 'rgba(184,134,11,0.25)',
    loginCard: 'rgba(255,251,240,0.92)', headerWave: '#faf7f0',
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

const ThemeCtx = createContext(THEMES.night)
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

/* ─── Tiffin Logo Icon ───────────────────────────────────────── */
const TiffinIcon = ({ size = 32 }) => (
  <img src="/al-mawaid.png" alt="Al-Mawaid"
    style={{ width:size, height:size, objectFit:'contain',
      filter:'drop-shadow(0 2px 6px rgba(201,168,76,0.4))' }}/>
)

/* ─── Login Page ─────────────────────────────────────────────── */
function LoginPage() {
  const t = THEMES.night
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
            <img src="/al-mawaid.png" alt="Al-Mawaid" style={{ width:62, height:62, objectFit:'contain' }}/>
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
                  fontSize:14, outline:'none' }}
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
                  fontSize:14, outline:'none' }}
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
function HomePage({ setActiveTab }) {
  const t = useTheme()
  const { user } = useAuth()
  const [expandedDay, setExpandedDay] = useState(null)
  const [showSurvey, setShowSurvey]   = useState(false)
  const [surveyStartDay, setSurveyStartDay] = useState('monday')
  const [stats, setStats]             = useState({ total_surveys:0 })
  const [profileData, setProfileData] = useState({ name:'', thali_number:'' })
  const [statsLoading, setStatsLoading] = useState(true)

  useEffect(() => { loadStats() }, [user])

  const loadStats = async () => {
    try {
      const { data } = await supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      if (data) {
        setStats(data)
        setProfileData({ name: data.name || '', thali_number: data.thali_number || '' })
      } else {
        const { data: ns } = await supabase.from('user_stats')
          .insert([{ user_id:user.id, total_surveys:0, name:'', thali_number:'' }])
          .select().single()
        if (ns) setStats(ns)
      }
    } catch (err) { console.error(err) }
    finally { setStatsLoading(false) }
  }

  const openSurveyFromDay = (day) => { setSurveyStartDay(day); setShowSurvey(true) }

  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:800, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* ── Profile Preview Card (locked, read-only) ── */}
      <div style={{ marginBottom:20, padding:18, borderRadius:18,
        background:t.cardActive, border:`1px solid ${t.borderActive}`,
        boxShadow:'0 8px 32px rgba(0,0,0,0.18)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ width:58, height:58, borderRadius:'50%', background:t.accentGrad,
            display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
            fontSize:24, fontWeight:900, color:'#fff',
            boxShadow:`0 4px 14px ${t.accentBg}`, border:`2px solid ${t.accent}` }}>
            {(user.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:11, color:t.textSub, marginBottom:3, opacity:0.7 }}>{user.email}</div>
            <div style={{ fontSize:18, fontWeight:800, color:t.accent }}>
              {profileData.name || 'Set your name →'}
            </div>
            {profileData.thali_number && (
              <div style={{ fontSize:12, color:t.textSub, marginTop:2 }}>
                Thali No: <strong style={{ color:t.accent }}>#{profileData.thali_number}</strong>
              </div>
            )}
          </div>
          <button onClick={() => setActiveTab('profile')}
            style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
              borderRadius:10, padding:'6px 12px', cursor:'pointer',
              color:t.accent, fontSize:11, fontWeight:700 }}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* ── Survey Count Dashboard ── */}
      {!statsLoading && (
        <div style={{ marginBottom:22, padding:'16px 20px', background:t.card,
          borderRadius:16, border:`1px solid ${t.borderActive}`,
          display:'flex', alignItems:'center', gap:16 }}>
          <CircleIcon size={48} style={{ boxShadow:`0 4px 14px ${t.accentBg}` }}>
            <ClipboardList size={22} color="#fff"/>
          </CircleIcon>
          <div>
            <div style={{ fontSize:32, fontWeight:900, color:t.accent, lineHeight:1 }}>{stats.total_surveys || 0}</div>
            <div style={{ fontSize:12, color:t.textSub, marginTop:2 }}>Surveys Completed</div>
          </div>
        </div>
      )}

      {/* ── Weekly Menu Header ── */}
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
      <button onClick={() => openSurveyFromDay('monday')}
        style={{ width:'100%', padding:14, borderRadius:12, border:'none', marginBottom:18,
          background:t.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
          cursor:'pointer', boxShadow:`0 6px 20px ${t.accentBg}`,
          display:'flex', alignItems:'center', justifyContent:'center', gap:10 }}>
        <ClipboardList size={18} color="#fff"/>
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
                {/* Tiffin logo instead of plate icon */}
                <img src="/al-mawaid.png" alt=""
                  style={{ width:36, height:36, objectFit:'contain', flexShrink:0,
                    filter:'drop-shadow(0 2px 6px rgba(201,168,76,0.35))' }}/>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:t.accent }}>{menu.en}</div>
                  <div style={{ fontSize:11, color:t.textSub, fontFamily:"'Amiri','Georgia',serif" }}>{menu.ar}</div>
                </div>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <button onClick={e => { e.stopPropagation(); openSurveyFromDay(day) }}
                  style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
                    borderRadius:8, padding:'5px 10px', cursor:'pointer',
                    color:t.accent, fontSize:10, fontWeight:700, whiteSpace:'nowrap' }}>
                  Fill Survey
                </button>
                <div style={{ width:26, height:26, borderRadius:'50%', background:t.accentBg,
                  display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  {isExpanded ? <ChevronUp size={13} color={t.accent}/> : <ChevronDown size={13} color={t.accent}/>}
                </div>
              </div>
            </button>

            {isExpanded && (
              <div style={{ marginTop:6, padding:16, background:t.inputBg,
                borderRadius:12, border:`1px solid ${t.border}` }}>
                {[['Lunch', menu.lunch], ['Dinner', menu.dinner]].map(([label, dishes], li) => (
                  <div key={label} style={{ marginBottom: li === 0 ? 14 : 0 }}>
                    <h4 style={{ margin:'0 0 8px', fontSize:13, fontWeight:700, color:t.accent }}>
                      {label}
                    </h4>
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

      {showSurvey && (
        <SurveyModal
          startDay={surveyStartDay}
          onClose={() => { setShowSurvey(false); loadStats() }}/>
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

  // Navigate to a specific day directly
  const goToDay = (day) => { setCurrentDay(day); setCurrentMeal('lunch'); setWantsFood(null); setResponses({}) }

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
        await supabase.rpc('increment_user_surveys', { p_user_id:user.id })
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
      background:'rgba(0,0,0,0.75)', padding:20, backdropFilter:'blur(8px)', overflowY:'auto' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:t.card, borderRadius:20, padding:24, maxWidth:520, width:'100%',
          border:`1px solid ${t.borderActive}`, boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
          maxHeight:'92vh', overflowY:'auto' }}>

        {/* Day navigation pills */}
        <div style={{ display:'flex', gap:5, overflowX:'auto', marginBottom:16, paddingBottom:4, scrollbarWidth:'none' }}>
          {DAYS.map((day, i) => (
            <button key={day} onClick={() => goToDay(day)}
              style={{ flexShrink:0, padding:'5px 10px', borderRadius:16,
                border:`1.5px solid ${currentDay===day ? t.accent : t.border}`,
                background: currentDay===day ? t.accentBg : 'transparent',
                color: currentDay===day ? t.accent : t.textSub,
                fontWeight:700, fontSize:11, cursor:'pointer' }}>
              {WEEKLY_MENU[day].en.slice(0,3)}
            </button>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
              <img src="/al-mawaid.png" alt="" style={{ width:28, height:28, objectFit:'contain' }}/>
              <h2 style={{ margin:0, fontSize:18, fontWeight:700, color:t.accent }}>
                {menu.en}
              </h2>
            </div>
            <div style={{ fontSize:13, color:t.textSub }}>
              {currentMeal === 'lunch' ? '☀️ Lunch' : '🌙 Dinner'}
              <span style={{ margin:'0 6px', opacity:0.4 }}>·</span>
              <span style={{ fontFamily:"'Amiri','Georgia',serif" }}>{menu.ar}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
            <X size={20} color={t.text}/>
          </button>
        </div>

        {/* Prev / Next nav */}
        <div style={{ display:'flex', gap:8, marginBottom:16 }}>
          <button onClick={handlePrev} disabled={isFirst}
            style={{ flex:1, padding:'8px 12px', borderRadius:10, border:`1px solid ${t.border}`,
              background:'transparent', color: isFirst ? t.border : t.textSub, fontSize:12,
              fontWeight:600, cursor: isFirst ? 'not-allowed' : 'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
            <ChevronLeft size={14}/> Prev
          </button>
          <button onClick={handleNext} disabled={loading}
            style={{ flex:1, padding:'8px 12px', borderRadius:10, border:`1px solid ${t.accent}`,
              background:t.accentBg, color:t.accent, fontSize:12,
              fontWeight:700, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:4 }}>
            {isLast ? 'Finish ✓' : 'Next'} {!isLast && <ChevronRight size={14}/>}
          </button>
        </div>

        {wantsFood === null ? (
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:t.text, marginBottom:14 }}>
              Do you want {currentMeal} for {menu.en}?
            </p>
            <div style={{ display:'flex', gap:10 }}>
              <button onClick={() => setWantsFood(true)}
                style={{ flex:1, padding:14, borderRadius:12, border:`1px solid ${t.accent}`,
                  background:t.accentBg, color:t.accent, fontSize:15, fontWeight:700, cursor:'pointer' }}>
                ✅ Yes
              </button>
              <button onClick={() => { setWantsFood(false); setTimeout(handleNext, 200) }}
                style={{ flex:1, padding:14, borderRadius:12, border:`1px solid ${t.border}`,
                  background:'transparent', color:t.text, fontSize:15, fontWeight:700, cursor:'pointer' }}>
                ❌ No
              </button>
            </div>
          </div>
        ) : wantsFood ? (
          <div>
            <p style={{ fontSize:13, fontWeight:600, color:t.textSub, marginBottom:12 }}>
              Select portion for each dish:
            </p>
            {dishes.map(dish => (
              <div key={dish} style={{ marginBottom:12, padding:12, background:t.inputBg, borderRadius:10 }}>
                <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:600, color:t.text }}>{dish}</p>
                {isRotiItem(dish) ? (
                  /* Roti yes/no condition */
                  <div style={{ display:'flex', gap:8 }}>
                    <button onClick={() => setResponses(prev => ({ ...prev, [dish]:'yes' }))}
                      style={{ flex:1, padding:'8px 4px', borderRadius:8,
                        border:`1.5px solid ${responses[dish]==='yes' ? t.accent : t.border}`,
                        background: responses[dish]==='yes' ? t.accentBg : 'transparent',
                        color: responses[dish]==='yes' ? t.accent : t.text,
                        fontSize:13, fontWeight:700, cursor:'pointer' }}>
                      ✅ Yes
                    </button>
                    <button onClick={() => setResponses(prev => ({ ...prev, [dish]:'no' }))}
                      style={{ flex:1, padding:'8px 4px', borderRadius:8,
                        border:`1.5px solid ${responses[dish]==='no' ? '#ef4444' : t.border}`,
                        background: responses[dish]==='no' ? 'rgba(239,68,68,0.1)' : 'transparent',
                        color: responses[dish]==='no' ? '#ef4444' : t.text,
                        fontSize:13, fontWeight:700, cursor:'pointer' }}>
                      ❌ No
                    </button>
                  </div>
                ) : (
                  /* Portion % for non-roti */
                  <div style={{ display:'flex', gap:6 }}>
                    {[0,25,50,100].map(pct => (
                      <button key={pct} onClick={() => setResponses(prev => ({ ...prev, [dish]:pct }))}
                        style={{ flex:1, padding:'7px 2px', borderRadius:8,
                          border:`1.5px solid ${responses[dish]===pct ? t.accent : t.border}`,
                          background: responses[dish]===pct ? t.accentBg : 'transparent',
                          color: responses[dish]===pct ? t.accent : t.text,
                          fontSize:12, fontWeight:700, cursor:'pointer' }}>
                        {pct}%
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button onClick={handleNext}
              disabled={loading || Object.keys(responses).length < dishes.length}
              style={{ width:'100%', padding:13, borderRadius:12, border:'none', marginTop:8,
                background: Object.keys(responses).length < dishes.length ? t.border : t.accentGrad,
                color:'#fff', fontSize:14, fontWeight:700,
                cursor: Object.keys(responses).length < dishes.length ? 'not-allowed' : 'pointer',
                opacity: Object.keys(responses).length < dishes.length ? 0.5 : 1 }}>
              {loading ? 'Saving…' : isLast ? 'Complete Survey ✓' : 'Save & Next →'}
            </button>
          </div>
        ) : (
          <div style={{ textAlign:'center', padding:20, color:t.textSub }}>Skipping this meal…</div>
        )}
      </div>
    </div>
  )
}

/* ─── Feedback Page ──────────────────────────────────────────── */
function FeedbackPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [currentDayIdx, setCurrentDayIdx] = useState(0)
  const [submitted, setSubmitted]     = useState({})
  const [loading, setLoading]         = useState(true)
  const [submitting, setSubmitting]   = useState(false)
  const [error, setError]             = useState('')
  const [lunchStars,    setLunchStars]    = useState(0)
  const [dinnerStars,   setDinnerStars]   = useState(0)
  const [lunchComment,  setLunchComment]  = useState('')
  const [dinnerComment, setDinnerComment] = useState('')
  const [hoveredLunch,  setHoveredLunch]  = useState(0)
  const [hoveredDinner, setHoveredDinner] = useState(0)

  const selectedDay = DAYS[currentDayIdx]
  const menu = WEEKLY_MENU[selectedDay]

  const STAR_EMOJIS = { 1:'😡', 2:'😟', 3:'😐', 4:'😊', 5:'😍' }

  useEffect(() => { loadSubmitted() }, [user])
  useEffect(() => { resetForm() }, [currentDayIdx])

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
    setLunchStars(0); setDinnerStars(0)
    setLunchComment(''); setDinnerComment('')
    setHoveredLunch(0); setHoveredDinner(0)
    setError('')
  }

  const handleSubmit = async () => {
    if (!lunchStars || !dinnerStars) return setError('Please rate both Lunch and Dinner')
    setError(''); setSubmitting(true)
    try {
      const { error: dbErr } = await supabase.from('daily_feedback').insert([{
        user_id:user.id, day:selectedDay,
        lunch_stars:lunchStars, lunch_emoji:STAR_EMOJIS[lunchStars], lunch_comment:lunchComment.trim(),
        dinner_stars:dinnerStars, dinner_emoji:STAR_EMOJIS[dinnerStars], dinner_comment:dinnerComment.trim(),
      }])
      if (dbErr) throw dbErr
      setSubmitted(prev => ({ ...prev, [selectedDay]:true }))
      resetForm()
    } catch (err) { setError(err.message) }
    finally { setSubmitting(false) }
  }

  // Star rating with emoji reveal below
  const StarRating = ({ value, hovered, onHover, onChange, disabled, label }) => {
    const display = hovered || value
    return (
      <div>
        <div style={{ display:'flex', gap:6, marginBottom: display ? 8 : 0 }}>
          {[1,2,3,4,5].map(n => (
            <button key={n}
              onClick={() => !disabled && onChange(n)}
              onMouseEnter={() => !disabled && onHover(n)}
              onMouseLeave={() => !disabled && onHover(0)}
              disabled={disabled}
              style={{ background:'none', border:'none', cursor: disabled ? 'default' : 'pointer', padding:2, lineHeight:0 }}>
              <Star size={28}
                fill={n <= (hovered || value) ? t.accent : 'none'}
                color={n <= (hovered || value) ? t.accent : t.border}
                strokeWidth={1.5}/>
            </button>
          ))}
        </div>
        {/* Classic emoji reveal under stars */}
        {display > 0 && (
          <div style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 10px',
            background:t.accentBg, borderRadius:10, border:`1px solid ${t.accentBorder}`,
            transition:'all 0.3s' }}>
            <span style={{ fontSize:24 }}>{STAR_EMOJIS[display]}</span>
            <span style={{ fontSize:13, color:t.accent, fontWeight:600 }}>
              {['','Terrible','Poor','Okay','Good','Excellent!'][display]}
            </span>
          </div>
        )}
      </div>
    )
  }

  const MealCard = ({ meal, label, dishes, stars, hovered, onHover, setStars, comment, setComment }) => (
    <div style={{ marginBottom:16, padding:18, background:t.card, borderRadius:16,
      border:`1px solid ${t.borderActive}` }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <img src="/al-mawaid.png" alt="" style={{ width:36, height:36, objectFit:'contain' }}/>
        <div>
          <div style={{ fontSize:15, fontWeight:700, color:t.accent }}>{label}</div>
          <div style={{ fontSize:11, color:t.textSub }}>
            {dishes.slice(0,3).join(' · ')}{dishes.length > 3 ? ' …' : ''}
          </div>
        </div>
      </div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:11, fontWeight:700, color:t.textSub, marginBottom:8, letterSpacing:'0.06em' }}>RATING</div>
        <StarRating value={stars} hovered={hovered} onHover={onHover} onChange={setStars} disabled={submitted[selectedDay]}/>
      </div>
      <textarea value={comment} onChange={e => setComment(e.target.value)} disabled={submitted[selectedDay]}
        style={{ width:'100%', padding:'10px 12px', borderRadius:10, boxSizing:'border-box',
          background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
          fontSize:13, resize:'none', outline:'none', fontFamily:'inherit', minHeight:56,
          opacity: submitted[selectedDay] ? 0.45 : 1 }}
        placeholder="Add a comment (optional)…"/>
    </div>
  )

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* Day carousel — auto popup style */}
      <div style={{ marginBottom:20, padding:'16px 18px', borderRadius:16,
        background:t.cardActive, border:`1px solid ${t.borderActive}` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <button onClick={() => setCurrentDayIdx(i => Math.max(0, i-1))} disabled={currentDayIdx===0}
            style={{ background:'none', border:'none', cursor: currentDayIdx===0 ? 'not-allowed' : 'pointer',
              opacity: currentDayIdx===0 ? 0.3 : 1, padding:4 }}>
            <ChevronLeft size={20} color={t.accent}/>
          </button>
          <div style={{ textAlign:'center' }}>
            <div style={{ fontSize:22, fontWeight:900, color:t.accent }}>{menu.en}</div>
            <div style={{ fontSize:13, color:t.textSub, fontFamily:"'Amiri','Georgia',serif" }}>{menu.ar}</div>
            <div style={{ fontSize:10, color:t.textSub, marginTop:4, opacity:0.6 }}>
              Day {currentDayIdx+1} of {DAYS.length}
            </div>
          </div>
          <button onClick={() => setCurrentDayIdx(i => Math.min(DAYS.length-1, i+1))} disabled={currentDayIdx===DAYS.length-1}
            style={{ background:'none', border:'none', cursor: currentDayIdx===DAYS.length-1 ? 'not-allowed' : 'pointer',
              opacity: currentDayIdx===DAYS.length-1 ? 0.3 : 1, padding:4 }}>
            <ChevronRight size={20} color={t.accent}/>
          </button>
        </div>
        {/* Day dots */}
        <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:10 }}>
          {DAYS.map((d,i) => (
            <button key={d} onClick={() => setCurrentDayIdx(i)}
              style={{ width: i===currentDayIdx ? 20 : 8, height:8, borderRadius:4, border:'none',
                background: submitted[d] ? '#22c55e' : i===currentDayIdx ? t.accent : t.border,
                cursor:'pointer', transition:'all 0.3s', padding:0 }}/>
          ))}
        </div>
      </div>

      {submitted[selectedDay] ? (
        <div style={{ textAlign:'center', padding:'44px 20px', background:t.card,
          borderRadius:16, border:`1px solid ${t.borderActive}` }}>
          <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
          <div style={{ fontSize:17, fontWeight:700, color:t.accent, marginBottom:6 }}>Feedback Submitted!</div>
          <div style={{ fontSize:13, color:t.textSub }}>You've already submitted for {menu.en}.</div>
        </div>
      ) : (
        <>
          <MealCard meal="lunch" label="Lunch"
            dishes={menu.lunch}
            stars={lunchStars} hovered={hoveredLunch}
            onHover={setHoveredLunch} setStars={setLunchStars}
            comment={lunchComment} setComment={setLunchComment}/>

          <MealCard meal="dinner" label="Dinner"
            dishes={menu.dinner}
            stars={dinnerStars} hovered={hoveredDinner}
            onHover={setHoveredDinner} setStars={setDinnerStars}
            comment={dinnerComment} setComment={setDinnerComment}/>

          {error && <ErrorBanner msg={error}/>}

          <button onClick={handleSubmit} disabled={submitting}
            style={{ width:'100%', padding:15, borderRadius:12, border:'none', marginTop:4,
              background: submitting ? t.border : t.accentGrad, color:'#fff',
              fontSize:15, fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer',
              boxShadow:`0 6px 20px ${t.accentBg}` }}>
            {submitting ? 'Submitting…' : '✨ Submit Feedback'}
          </button>
        </>
      )}
    </main>
  )
}

/* ─── Profile Page ───────────────────────────────────────────── */
function ProfilePage({ theme, setTheme }) {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [stats, setStats]       = useState(null)
  const [loading, setLoading]   = useState(true)
  const [name, setName]         = useState('')
  const [thaliNum, setThaliNum] = useState('')
  const [phone, setPhone]       = useState('')
  const [address, setAddress]   = useState('')
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    supabase.from('user_stats').select('*').eq('user_id', user.id).single()
      .then(({ data }) => {
        if (data) {
          setStats(data)
          setName(data.name || '')
          setThaliNum(data.thali_number || '')
          setPhone(data.phone || '')
          setAddress(data.address || '')
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('user_stats').upsert([{
      user_id:user.id, name:name.trim(), thali_number:thaliNum.trim(),
      phone:phone.trim(), address:address.trim()
    }], { onConflict:'user_id' })
    setSaving(false); setSaved(true); setEditMode(false)
    setTimeout(() => setSaved(false), 2500)
  }

  if (loading) return <Spinner/>

  const initials = (user.email || 'U').charAt(0).toUpperCase()
  const inp = {
    width:'100%', padding:'11px 14px', borderRadius:10, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
    fontSize:14, outline:'none', fontFamily:'inherit'
  }

  return (
    <main style={{ flex:1, padding:'20px 20px 90px', maxWidth:600, margin:'0 auto', width:'100%', boxSizing:'border-box' }}>

      {/* Profile avatar + info */}
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <div style={{ width:90, height:90, margin:'0 auto 14px', borderRadius:'50%',
          background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:34, fontWeight:900, color:'#fff',
          boxShadow:`0 8px 28px ${t.accentBg}`, border:`3px solid ${t.accent}` }}>
          {initials}
        </div>
        <h2 style={{ margin:'0 0 4px', fontSize:18, fontWeight:700, color:t.text }}>{user.email}</h2>
        {name && <div style={{ fontSize:16, fontWeight:700, color:t.accent }}>{name}</div>}
        {thaliNum && <div style={{ fontSize:13, color:t.textSub, marginTop:4 }}>Thali No: <strong style={{ color:t.accent }}>#{thaliNum}</strong></div>}
        <p style={{ margin:'6px 0 0', fontSize:12, color:t.textSub }}>
          Member since {new Date(user.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
        </p>
      </div>

      {/* Survey count */}
      <div style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 18px', marginBottom:20,
        background:t.card, borderRadius:14, border:`1px solid ${t.borderActive}` }}>
        <CircleIcon size={40} style={{ boxShadow:`0 3px 10px ${t.accentBg}` }}>
          <ClipboardList size={18} color="#fff"/>
        </CircleIcon>
        <div>
          <div style={{ fontSize:24, fontWeight:800, color:t.accent }}>{stats?.total_surveys || 0}</div>
          <div style={{ fontSize:11, color:t.textSub }}>Surveys Completed</div>
        </div>
      </div>

      {/* Profile edit form */}
      <div style={{ marginBottom:20, padding:18, background:t.card, borderRadius:16, border:`1px solid ${t.border}` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <h3 style={{ margin:0, fontSize:15, fontWeight:700, color:t.accent }}>Profile Details</h3>
          {!editMode ? (
            <button onClick={() => setEditMode(true)}
              style={{ background:t.accentBg, border:`1px solid ${t.accentBorder}`,
                borderRadius:8, padding:'6px 12px', cursor:'pointer', color:t.accent, fontSize:12, fontWeight:700 }}>
              Edit
            </button>
          ) : null}
        </div>
        {[
          { label:'Full Name', value:name, setter:setName, placeholder:'Your full name', icon:<User size={14}/> },
          { label:'Thali Number', value:thaliNum, setter:setThaliNum, placeholder:'e.g. 42', icon:<ClipboardList size={14}/> },
          { label:'Phone', value:phone, setter:setPhone, placeholder:'Your contact number', icon:<Phone size={14}/> },
          { label:'Address / Room', value:address, setter:setAddress, placeholder:'Your address or room number', icon:<MapPin size={14}/> },
        ].map(({ label, value, setter, placeholder, icon }) => (
          <div key={label} style={{ marginBottom:12 }}>
            <label style={{ display:'block', fontSize:11, fontWeight:600, color:t.textSub, marginBottom:5 }}>
              {label}
            </label>
            {editMode ? (
              <input value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} style={inp}/>
            ) : (
              <div style={{ padding:'11px 14px', borderRadius:10, background:t.inputBg,
                border:`1px solid ${t.border}`, fontSize:14, color: value ? t.text : t.textSub, opacity: value ? 1 : 0.5 }}>
                {value || placeholder}
              </div>
            )}
          </div>
        ))}
        {editMode && (
          <div style={{ display:'flex', gap:8, marginTop:4 }}>
            <button onClick={handleSave} disabled={saving}
              style={{ flex:1, padding:11, borderRadius:10, border:'none',
                background: saving ? t.border : t.accentGrad, color:'#fff',
                fontWeight:700, cursor:'pointer', fontSize:14 }}>
              {saving ? 'Saving…' : saved ? '✅ Saved!' : 'Save Profile'}
            </button>
            <button onClick={() => setEditMode(false)}
              style={{ padding:'11px 16px', borderRadius:10, border:`1px solid ${t.border}`,
                background:'transparent', color:t.textSub, fontWeight:600, cursor:'pointer', fontSize:14 }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* ── Theme Switcher ── */}
      <div style={{ marginBottom:20, padding:18, background:t.card, borderRadius:16, border:`1px solid ${t.border}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14 }}>
          <Palette size={16} color={t.accent}/>
          <h3 style={{ margin:0, fontSize:15, fontWeight:700, color:t.accent }}>App Theme</h3>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {Object.values(THEMES).map(th => (
            <button key={th.id} onClick={() => setTheme(th.id)}
              style={{ padding:'12px 16px', borderRadius:12,
                border:`2px solid ${theme===th.id ? th.accent : t.border}`,
                background: theme===th.id ? th.accentBg : t.inputBg,
                cursor:'pointer', display:'flex', alignItems:'center', gap:12,
                transition:'all 0.3s' }}>
              {/* Color preview swatches */}
              <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                <div style={{ width:20, height:20, borderRadius:'50%', background:th.bg, border:'2px solid rgba(255,255,255,0.2)' }}/>
                <div style={{ width:20, height:20, borderRadius:'50%', background:th.accent }}/>
                <div style={{ width:20, height:20, borderRadius:'50%', background:th.card, border:'1px solid rgba(255,255,255,0.2)' }}/>
              </div>
              <div style={{ flex:1, textAlign:'left' }}>
                <div style={{ fontSize:14, fontWeight:700, color: theme===th.id ? th.accent : t.text }}>{th.icon} {th.name}</div>
              </div>
              {theme===th.id && <Check size={16} color={th.accent}/>}
            </button>
          ))}
        </div>
      </div>

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
              fontWeight:700, fontSize:13, cursor:'pointer' }}>
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
  const inp = { width:'100%', padding:'10px 12px', borderRadius:10, boxSizing:'border-box',
    background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text, fontSize:14, outline:'none', fontFamily:'inherit' }

  const Card = ({ type, children }) => (
    <div style={{ marginBottom:12, borderRadius:14,
      border:`1px solid ${activeRequest===type ? t.borderActive : t.border}`,
      background: activeRequest===type ? t.cardActive : t.card, overflow:'hidden' }}>
      {children}
    </div>
  )
  const HdrBtn = ({ type, emoji, label, desc }) => (
    <button onClick={() => openRequest(type)}
      style={{ width:'100%', padding:16, background:'transparent', border:'none',
        cursor:'pointer', display:'flex', alignItems:'center', gap:12, textAlign:'left' }}>
      <CircleIcon size={44}><span style={{ fontSize:20 }}>{emoji}</span></CircleIcon>
      <div style={{ flex:1 }}>
        <div style={{ fontSize:15, fontWeight:700, color: activeRequest===type ? t.accent : t.text }}>{label}</div>
        <div style={{ fontSize:12, color:t.textSub, marginTop:2 }}>{desc}</div>
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
        <div style={{ marginBottom:14, padding:12, borderRadius:10,
          background:'rgba(34,197,94,0.12)', border:'1px solid rgba(34,197,94,0.3)',
          color:'#22c55e', fontSize:13, fontWeight:600 }}>{success}</div>
      )}

      <Card type="resume">
        <HdrBtn type="resume" emoji="▶️" label="Resume Thali" desc="Restart your thali service"/>
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
        <HdrBtn type="stop" emoji="⏹️" label="Stop Thali" desc="Pause your thali service"/>
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
        <HdrBtn type="extra" emoji="➕" label="Add Extra Food" desc="Request additional items"/>
        {activeRequest === 'extra' && (
          <div style={{ padding:'0 16px 16px' }}>
            {extraItems.map((item, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'center', marginBottom:10 }}>
                <input type="text" value={item.name} placeholder={`Item ${i+1}`}
                  onChange={e => updateExtraItem(i,'name',e.target.value)} style={{ ...inp, flex:1 }}/>
                <div style={{ display:'flex', gap:4, flexShrink:0 }}>
                  {[1,2,3,4].map(n => (
                    <button key={n} onClick={() => updateExtraItem(i,'qty',n)}
                      style={{ width:32, height:36, borderRadius:8,
                        border:`1.5px solid ${item.qty===n ? t.accent : t.border}`,
                        background: item.qty===n ? t.accentBg : 'transparent',
                        color: item.qty===n ? t.accent : t.textSub,
                        fontWeight:700, fontSize:13, cursor:'pointer' }}>
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
      <div style={{ marginBottom:20, padding:16, background:useTheme().card, borderRadius:14, border:`1px solid ${useTheme().border}` }}>
        <h3 style={{ margin:'0 0 12px', fontSize:15, fontWeight:700, color:useTheme().accent }}>✉️ New Query</h3>
        <textarea value={comment} onChange={e => setComment(e.target.value)}
          style={{ width:'100%', minHeight:80, padding:12, borderRadius:10, boxSizing:'border-box',
            background:useTheme().inputBg, border:`1px solid ${useTheme().inputBorder}`, color:useTheme().text,
            fontSize:14, resize:'vertical', outline:'none', fontFamily:'inherit', marginBottom:10 }}
          placeholder="Describe your query or issue…"/>
        {mediaFiles.length > 0 && (
          <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:10 }}>
            {mediaFiles.map((item, i) => (
              <div key={i} style={{ position:'relative', width:72, height:72, borderRadius:10, overflow:'hidden',
                border:`1px solid ${useTheme().border}`, flexShrink:0 }}>
                {item.type === 'image'
                  ? <img src={item.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  : <div style={{ width:'100%', height:'100%', background:useTheme().inputBg,
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
              border:`1px dashed ${useTheme().accentBorder}`, background:useTheme().accentBg,
              color:useTheme().accent, fontWeight:600, fontSize:13, cursor:'pointer', marginBottom:10,
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
            background: submitting ? useTheme().border : useTheme().accentGrad, color:'#fff',
            fontWeight:700, cursor: submitting ? 'not-allowed' : 'pointer' }}>
          {submitting ? 'Submitting…' : '📨 Submit Query'}
        </button>
      </div>

      <div style={{ fontSize:11, fontWeight:700, color:useTheme().textSub, letterSpacing:'0.1em', marginBottom:10 }}>MY QUERIES</div>
      {loading ? <Spinner/> : queries.length === 0 ? (
        <div style={{ textAlign:'center', padding:32, color:useTheme().textSub, fontSize:13 }}>No queries yet.</div>
      ) : queries.map(q => (
        <div key={q.id} style={{ marginBottom:10, padding:14, background:useTheme().card,
          borderRadius:12, border:`1px solid ${useTheme().border}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <span style={{ fontSize:11, color:useTheme().textSub }}>{new Date(q.created_at).toLocaleString()}</span>
            <span style={{ fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
              background:`${statusColor(q.status)}22`, color:statusColor(q.status) }}>
              {q.status?.toUpperCase()}
            </span>
          </div>
          {q.comment && <p style={{ margin:'0 0 8px', fontSize:13, color:useTheme().textBody, lineHeight:1.6 }}>{q.comment}</p>}
          {q.admin_reply && (
            <div style={{ marginTop:10, padding:10, borderRadius:8, background:useTheme().accentBg,
              border:`1px solid ${useTheme().accentBorder}`, fontSize:12, color:useTheme().accent }}>
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
  const [session, setSession]   = useState(undefined)
  const [activeTab, setActiveTab] = useState('home')
  const [theme, setTheme]       = useState(() => localStorage.getItem('almawaid_theme') || 'night')

  const currentTheme = THEMES[theme] || THEMES.night

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
      <div style={{ minHeight:'100vh', background:THEMES.night.bgGrad,
        display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
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
        <div style={{ fontFamily:"'Cairo','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
          minHeight:'100vh', background:t.bg, color:t.text, display:'flex', flexDirection:'column' }}>

          {/* Header */}
          <header style={{ position:'relative', overflow:'hidden',
            background:t.bgGrad, padding:'18px 20px 0', flexShrink:0 }}>
            <GeoBg t={t}/>
            <div style={{ position:'relative', zIndex:1, display:'flex',
              justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
              {/* Al-Mawaid logo top left */}
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <img src="/al-mawaid.png" alt="Al-Mawaid"
                  style={{ width:28, height:28, objectFit:'contain',
                    filter:'drop-shadow(0 2px 6px rgba(201,168,76,0.5))' }}/>
                <span style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase',
                  color:t.textSub, opacity:0.7, fontWeight:700 }}>Al-Mawaid</span>
              </div>
              <span style={{ fontSize:10, color:t.textSub, opacity:0.4 }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>
            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:6 }}>
                <p style={{ fontFamily:"'Amiri','Georgia',serif", fontSize:16, letterSpacing:'0.1em', color:t.accent, margin:0 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}
            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:10 }}>
              <h1 style={{ margin:0, fontSize: activeTab==='home' ? 32 : 24,
                fontWeight:900, textTransform:'uppercase', letterSpacing:'0.05em', lineHeight:1.1, color:t.accent }}>
                {tabLabels[activeTab]}
              </h1>
            </div>
            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 40" preserveAspectRatio="none">
              <path d="M0,14 C200,40 400,0 600,20 C800,40 1000,4 1200,24 C1320,36 1400,14 1440,18 L1440,40 L0,40 Z"
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
            padding:'10px 4px 16px', background:t.navBg,
            borderTop:`1px solid ${t.navBorder}`, boxShadow:'0 -6px 30px rgba(0,0,0,0.18)' }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ background:'none', border:'none', cursor:'pointer',
                    display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                    padding:'2px 12px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
                  {active && (
                    <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
                      width:28, height:3, borderRadius:6, background:t.accent }}/>
                  )}
                  <div style={{ width:36, height:36, borderRadius:'50%', transition:'all 0.3s',
                    background: active ? t.accentBg : 'transparent',
                    border: active ? `1px solid ${t.accentBorder}` : '1px solid transparent',
                    display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={17} color={active ? t.accent : t.border} strokeWidth={active ? 2.2 : 1.5}/>
                  </div>
                  <span style={{ fontSize:9, fontWeight:700, letterSpacing:'0.04em',
                    color: active ? t.accent : t.textSub, opacity: active ? 1 : 0.5 }}>
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
            input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.6); }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
