// src/App.jsx — Al-Mawaid Food Survey System
// ✨ Supabase Auth | Weekly Menu Survey | Gamification | Arabic Support
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, User, X, Sun, Moon,
  Star, Send, Bell, Camera, Palette, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ChevronUp,
  MessageSquare, Trophy, Zap, Award, TrendingUp, Edit
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
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
}

// ─── Menu Data Structure ─────────────────────────────────────
const WEEKLY_MENU = {
  monday: {
    en: 'Monday', ar: 'الاثنين',
    lunch: ['Chicken Biryani', 'Dal Makhani', 'Naan', 'Raita', 'Salad'],
    dinner: ['Grilled Fish', 'Vegetable Curry', 'Rice', 'Chapati', 'Pickle']
  },
  tuesday: {
    en: 'Tuesday', ar: 'الثلاثاء',
    lunch: ['Mutton Rogan Josh', 'Paneer Butter Masala', 'Roti', 'Raita', 'Papadam'],
    dinner: ['Chicken Tikka', 'Mixed Vegetables', 'Jeera Rice', 'Naan', 'Chutney']
  },
  wednesday: {
    en: 'Wednesday', ar: 'الأربعاء',
    lunch: ['Fish Curry', 'Aloo Gobi', 'Paratha', 'Yogurt', 'Pickle'],
    dinner: ['Beef Kebab', 'Palak Paneer', 'Pulao', 'Roti', 'Salad']
  },
  thursday: {
    en: 'Thursday', ar: 'الخميس',
    lunch: ['Chicken Korma', 'Chana Masala', 'Rice', 'Naan', 'Raita'],
    dinner: ['Prawn Masala', 'Egg Curry', 'Jeera Rice', 'Chapati', 'Pickle']
  },
  friday: {
    en: 'Friday', ar: 'الجمعة',
    lunch: ['Lamb Biryani', 'Vegetable Jalfrezi', 'Naan', 'Raita', 'Salad'],
    dinner: ['Tandoori Chicken', 'Dal Tadka', 'Rice', 'Roti', 'Chutney']
  },
  saturday: {
    en: 'Saturday', ar: 'السبت',
    lunch: ['Fish Tikka', 'Mixed Dal', 'Paratha', 'Yogurt', 'Pickle'],
    dinner: ['Mutton Curry', 'Aloo Matar', 'Pulao', 'Naan', 'Salad']
  }
}

// Theme persistence helpers
function getSavedThemeId() { try { return localStorage.getItem('al-mawaid-theme') || 'night' } catch { return 'night' } }
function saveThemeId(id)   { try { localStorage.setItem('al-mawaid-theme', id) } catch {} }

const ThemeCtx = createContext(null)
const useTheme = () => useContext(ThemeCtx)
const AuthCtx  = createContext(null)
const useAuth  = () => useContext(AuthCtx)

/* ─── Shared Components ──────────────────────────────────────── */
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

const Spinner = ({ fullPage = true }) => {
  // Fallback to an empty object if useTheme returns null/undefined
  const t = useTheme() || {};

  const inner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div 
        className="spin" 
        style={{ 
          width: 36, 
          height: 36, 
          // Added optional chaining and default fallback colors (adjust hex codes as needed)
          border: `3px solid ${t?.spinnerBorder || '#e5e7eb'}`, 
          borderTop: `3px solid ${t?.spinnerTop || '#3b82f6'}`, 
          borderRadius: '50%' 
        }}
      />
      {fullPage && (
        <p style={{ 
          margin: 0, 
          fontSize: 13, 
          color: t?.textSub || '#6b7280', 
          opacity: 0.5 
        }}>
          Loading…
        </p>
      )}
    </div>
  );

  return fullPage ? (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '60px 20px' 
    }}>
      {inner}
    </div>
  ) : (
    inner
  );
};

const ErrorBanner = ({ msg }) => (
  <div style={{ 
    margin: '8px 0', 
    padding: '12px 14px', 
    borderRadius: 12,
    background: 'rgba(239, 68, 68, 0.10)', 
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#ef4444', 
    fontSize: 13, 
    display: 'flex', 
    alignItems: 'center', 
    gap: 8 
  }}>
    <AlertCircle size={14} style={{ flexShrink: 0 }} />
    {msg}
  </div>
);
/* ─── Login Page ─────────────────────────────────────────────── */
function LoginPage({ themeId, setThemeId }) {
  const theme = THEMES[themeId]
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState('login') // 'login' or 'signup'

  const handleAuth = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setError('Check your email for verification link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight:'100vh', background:theme.bgGrad, display:'flex', 
      alignItems:'center', justifyContent:'center', padding:20, position:'relative', overflow:'hidden',
      fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
      <GeoBg t={theme}/>
      
      {/* Theme Switcher */}
      <div style={{ position:'fixed', top:16, right:16, zIndex:10 }}>
        <button onClick={() => setThemeId(themeId === 'night' ? 'sunrise' : 'night')}
          style={{ background:theme.card, border:`1px solid ${theme.border}`, borderRadius:50,
            padding:10, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all 0.3s', boxShadow:`0 4px 12px ${theme.accentBg}` }}>
          {themeId === 'night' ? <Sun size={20} color={theme.accent}/> : <Moon size={20} color={theme.accent}/>}
        </button>
      </div>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:420, 
        background:theme.loginCard, backdropFilter:'blur(20px)', borderRadius:24,
        padding:'40px 30px', border:`1px solid ${theme.borderActive}`, 
        boxShadow:`0 20px 60px rgba(0,0,0,0.3)` }}>
        
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ width:100, height:100, margin:'0 auto 16px', 
            background:`linear-gradient(135deg, ${theme.accent}, ${theme.accentBorder})`,
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 8px 24px ${theme.accentBg}` }}>
            <img src="/al-mawaid.png" alt="Al-Mawaid" style={{ width:70, height:70, objectFit:'contain' }}/>
          </div>
          <h1 style={{ margin:'0 0 8px', fontSize:32, fontWeight:900, color:theme.accent,
            textTransform:'uppercase', letterSpacing:'0.05em', fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
            Al-Mawaid
          </h1>
          <p style={{ margin:0, fontSize:14, color:theme.textSub, opacity:0.7, 
            fontFamily:"'Amiri','Georgia',serif", letterSpacing:'0.1em' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        {/* Toggle Mode */}
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          <button onClick={() => setMode('login')}
            style={{ flex:1, padding:'10px 20px', borderRadius:12, border:`1px solid ${mode === 'login' ? theme.accent : theme.border}`,
              background: mode === 'login' ? theme.accentBg : 'transparent', color: mode === 'login' ? theme.accent : theme.text,
              fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
            Login
          </button>
          <button onClick={() => setMode('signup')}
            style={{ flex:1, padding:'10px 20px', borderRadius:12, border:`1px solid ${mode === 'signup' ? theme.accent : theme.border}`,
              background: mode === 'signup' ? theme.accentBg : 'transparent', color: mode === 'signup' ? theme.accent : theme.text,
              fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth}>
          {/* Email */}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:theme.textSub, marginBottom:6 }}>
              Email
            </label>
            <div style={{ position:'relative' }}>
              <Mail size={18} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:theme.accent, opacity:0.6 }}/>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width:'100%', padding:'12px 12px 12px 44px', borderRadius:12,
                  background:theme.inputBg, border:`1px solid ${theme.inputBorder}`, color:theme.text,
                  fontSize:14, outline:'none', transition:'all 0.3s', boxSizing:'border-box' }}
                placeholder="Enter your email"/>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:theme.textSub, marginBottom:6 }}>
              Password
            </label>
            <div style={{ position:'relative' }}>
              <Lock size={18} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:theme.accent, opacity:0.6 }}/>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width:'100%', padding:'12px 44px 12px 44px', borderRadius:12,
                  background:theme.inputBg, border:`1px solid ${theme.inputBorder}`, color:theme.text,
                  fontSize:14, outline:'none', transition:'all 0.3s', boxSizing:'border-box' }}
                placeholder="Enter your password"/>
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                {showPass ? <EyeOff size={18} color={theme.accent}/> : <Eye size={18} color={theme.accent}/>}
              </button>
            </div>
          </div>

          {error && <ErrorBanner msg={error}/>}

          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:14, borderRadius:12, border:'none',
              background:theme.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
              boxShadow:`0 4px 16px ${theme.accentBg}`, transition:'all 0.3s' }}>
            {loading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.8s linear infinite; }
        body { margin: 0; }
      `}</style>
    </div>
  )
}

/* ─── Gamification Component ─────────────────────────────────── */
function GamificationBadge() {
  const t = useTheme()
  const { user } = useAuth()
  const [stats, setStats] = useState({ points: 0, level: 1, streak: 0, totalSurveys: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [user])

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setStats(data)
      } else if (!error || error.code === 'PGRST116') {
        // Create initial stats
        const { data: newStats } = await supabase
          .from('user_stats')
          .insert([{ user_id: user.id, points: 0, level: 1, streak: 0, total_surveys: 0 }])
          .select()
          .single()
        if (newStats) setStats(newStats)
      }
    } catch (err) {
      console.error('Load stats error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return null

  return (
    <div style={{ margin:'16px 0', padding:16, borderRadius:16,
      background:t.cardActive, border:`1px solid ${t.borderActive}`,
      display:'flex', gap:12, alignItems:'center' }}>
      <div style={{ width:50, height:50, borderRadius:'50%', background:t.accentGrad,
        display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:`0 4px 12px ${t.accentBg}` }}>
        <Trophy size={24} color="#fff"/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
          <span style={{ fontSize:12, fontWeight:700, color:t.textSub }}>Level {stats.level}</span>
          <span style={{ fontSize:11, color:t.accent, fontWeight:600 }}>{stats.points} pts</span>
        </div>
        <div style={{ display:'flex', gap:16, fontSize:11, color:t.textBody }}>
          <span>🔥 {stats.streak} day streak</span>
          <span>📊 {stats.total_surveys} surveys</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Feedback Button ────────────────────────────────────────── */
function FeedbackButton() {
  const t = useTheme()
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('lunch') // 'lunch' or 'dinner'
  const [loading, setLoading] = useState(false)
  const [submissions, setSubmissions] = useState({ lunch: 0, dinner: 0 })
  const [error, setError] = useState('')

  useEffect(() => {
    loadSubmissions()
  }, [user])

  const loadSubmissions = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const { data } = await supabase
        .from('feedback')
        .select('type')
        .eq('user_id', user.id)
        .gte('created_at', today)

      if (data) {
        const counts = { lunch: 0, dinner: 0 }
        data.forEach(item => {
          if (counts[item.type] !== undefined) counts[item.type]++
        })
        setSubmissions(counts)
      }
    } catch (err) {
      console.error('Load submissions error:', err)
    }
  }

  const handleSubmit = async () => {
    if (!message.trim()) return setError('Please enter your feedback')
    if (submissions[type] >= 1) return setError(`You've already submitted ${type} feedback today`)

    setLoading(true)
    setError('')

    try {
      const { error: insertError } = await supabase
        .from('feedback')
        .insert([{ user_id: user.id, type, message: message.trim() }])

      if (insertError) throw insertError

      setSubmissions(prev => ({ ...prev, [type]: prev[type] + 1 }))
      setMessage('')
      setOpen(false)
      alert('Feedback submitted successfully! 🎉')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = submissions.lunch < 1 || submissions.dinner < 1

  return (
    <>
      {/* Floating Button */}
      <button onClick={() => setOpen(true)}
        style={{ position:'fixed', right:16, top:'50%', transform:'translateY(-50%)', zIndex:25,
          background:t.accentGrad, border:'none', borderRadius:'50%', width:56, height:56,
          cursor:'pointer', boxShadow:`0 6px 20px ${t.accentBg}`, display:'flex',
          alignItems:'center', justifyContent:'center', transition:'all 0.3s' }}>
        <MessageSquare size={24} color="#fff"/>
      </button>

      {/* Popup */}
      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:40, display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,0.6)', padding:20, backdropFilter:'blur(4px)' }}
          onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:t.card, borderRadius:20, padding:24, maxWidth:420, width:'100%',
              border:`1px solid ${t.borderActive}`, boxShadow:'0 20px 60px rgba(0,0,0,0.4)' }}>
            
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:700, color:t.accent }}>Send Feedback</h3>
              <button onClick={() => setOpen(false)}
                style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
                <X size={20} color={t.text}/>
              </button>
            </div>

            <div style={{ marginBottom:16 }}>
              <div style={{ display:'flex', gap:8, marginBottom:12 }}>
                <button onClick={() => setType('lunch')} disabled={submissions.lunch >= 1}
                  style={{ flex:1, padding:'10px', borderRadius:10, border:`1px solid ${type === 'lunch' ? t.accent : t.border}`,
                    background: type === 'lunch' ? t.accentBg : 'transparent', color: type === 'lunch' ? t.accent : t.text,
                    fontWeight:600, cursor: submissions.lunch >= 1 ? 'not-allowed' : 'pointer', 
                    opacity: submissions.lunch >= 1 ? 0.5 : 1, fontSize:13, transition:'all 0.3s' }}>
                  🍛 Lunch {submissions.lunch >= 1 && '✓'}
                </button>
                <button onClick={() => setType('dinner')} disabled={submissions.dinner >= 1}
                  style={{ flex:1, padding:'10px', borderRadius:10, border:`1px solid ${type === 'dinner' ? t.accent : t.border}`,
                    background: type === 'dinner' ? t.accentBg : 'transparent', color: type === 'dinner' ? t.accent : t.text,
                    fontWeight:600, cursor: submissions.dinner >= 1 ? 'not-allowed' : 'pointer',
                    opacity: submissions.dinner >= 1 ? 0.5 : 1, fontSize:13, transition:'all 0.3s' }}>
                  🍽️ Dinner {submissions.dinner >= 1 && '✓'}
                </button>
              </div>

              <textarea value={message} onChange={e => setMessage(e.target.value)}
                disabled={submissions[type] >= 1}
                style={{ width:'100%', minHeight:100, padding:12, borderRadius:10, boxSizing:'border-box',
                  background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
                  fontSize:14, resize:'vertical', outline:'none', fontFamily:'inherit',
                  opacity: submissions[type] >= 1 ? 0.5 : 1 }}
                placeholder={submissions[type] >= 1 ? `You've already submitted ${type} feedback today` : `Share your thoughts about ${type}...`}/>
            </div>

            {error && <ErrorBanner msg={error}/>}

            {!canSubmit && (
              <div style={{ padding:12, background:t.accentBg, borderRadius:10, marginBottom:12,
                fontSize:12, color:t.accent, textAlign:'center' }}>
                ✅ You've submitted all feedback for today!
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading || submissions[type] >= 1 || !canSubmit}
              style={{ width:'100%', padding:12, borderRadius:10, border:'none',
                background: loading || submissions[type] >= 1 ? t.border : t.accentGrad,
                color:'#fff', fontWeight:700, cursor: loading || submissions[type] >= 1 ? 'not-allowed' : 'pointer',
                opacity: loading || submissions[type] >= 1 ? 0.5 : 1, transition:'all 0.3s' }}>
              {loading ? 'Submitting...' : submissions[type] >= 1 ? 'Already Submitted' : 'Submit Feedback'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}

/* ─── Survey Modal ───────────────────────────────────────────── */
function SurveyModal({ onClose }) {
  const t = useTheme()
  const { user } = useAuth()
  const [currentDay, setCurrentDay] = useState('monday')
  const [currentMeal, setCurrentMeal] = useState('lunch')
  const [responses, setResponses] = useState({})
  const [wantsFood, setWantsFood] = useState(null) // null, true, false
  const [loading, setLoading] = useState(false)
  const [existingResponse, setExistingResponse] = useState(null)
  const [editMode, setEditMode] = useState(false)

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const currentDayIndex = days.indexOf(currentDay)
  const menu = WEEKLY_MENU[currentDay]

  useEffect(() => {
    loadExistingResponse()
  }, [currentDay, currentMeal])

  const loadExistingResponse = async () => {
    try {
      const { data } = await supabase
        .from('survey_responses')
        .select('*')
        .eq('user_id', user.id)
        .eq('day', currentDay)
        .eq('meal', currentMeal)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (data) {
        setExistingResponse(data)
        setWantsFood(data.wants_food)
        setResponses(data.dish_responses || {})
      } else {
        setExistingResponse(null)
        setWantsFood(null)
        setResponses({})
      }
    } catch (err) {
      // No existing response
      setExistingResponse(null)
      setWantsFood(null)
      setResponses({})
    }
  }

  const handlePercentageSelect = (dish, percentage) => {
    setResponses(prev => ({ ...prev, [dish]: percentage }))
  }

  const handleNext = async () => {
    // Save current response
    if (wantsFood !== null) {
      setLoading(true)
      try {
        const responseData = {
          user_id: user.id,
          day: currentDay,
          meal: currentMeal,
          wants_food: wantsFood,
          dish_responses: wantsFood ? responses : {},
          edit_count: existingResponse ? (existingResponse.edit_count || 0) + 1 : 0
        }

        if (existingResponse && existingResponse.edit_count >= 1) {
          alert('You have already edited this response once. No more edits allowed.')
          setLoading(false)
          return
        }

        const { error } = await supabase
          .from('survey_responses')
          .upsert([responseData], { onConflict: 'user_id,day,meal' })

        if (error) throw error

        // Award points for survey completion
        await supabase.rpc('increment_user_points', { 
          p_user_id: user.id, 
          p_points: 10 
        })

      } catch (err) {
        console.error('Save error:', err)
        alert('Error saving response: ' + err.message)
      } finally {
        setLoading(false)
      }
    }

    // Move to next meal/day
    if (currentMeal === 'lunch') {
      setCurrentMeal('dinner')
      setWantsFood(null)
      setResponses({})
    } else if (currentDayIndex < days.length - 1) {
      setCurrentDay(days[currentDayIndex + 1])
      setCurrentMeal('lunch')
      setWantsFood(null)
      setResponses({})
    } else {
      // Completed all days
      alert('🎉 Survey completed! Thank you for your feedback.')
      onClose()
    }
  }

  const dishes = currentMeal === 'lunch' ? menu.lunch : menu.dinner
  const percentages = [0, 25, 50, 100]

  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'center',
      background:'rgba(0,0,0,0.7)', padding:20, backdropFilter:'blur(6px)', overflowY:'auto' }}
      onClick={onClose}>
      <div onClick={e => e.stopPropagation()}
        style={{ background:t.card, borderRadius:20, padding:24, maxWidth:500, width:'100%',
          border:`1px solid ${t.borderActive}`, boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
          maxHeight:'90vh', overflowY:'auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:t.accent }}>
              {menu.en} - {currentMeal === 'lunch' ? 'Lunch 🍛' : 'Dinner 🍽️'}
            </h2>
            <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
              <X size={22} color={t.text}/>
            </button>
          </div>
          <p style={{ margin:0, fontSize:13, color:t.textSub, fontFamily:"'Amiri','Georgia',serif" }}>
            {menu.ar}
          </p>
          {existingResponse && (
            <div style={{ marginTop:8, padding:8, background:t.accentBg, borderRadius:8, fontSize:11, color:t.accent }}>
              ✏️ Edit Mode {existingResponse.edit_count >= 1 ? '(Last edit)' : '(1 edit remaining)'}
            </div>
          )}
        </div>

        {/* Yes/No Question */}
        {wantsFood === null ? (
          <div>
            <p style={{ fontSize:15, fontWeight:600, color:t.text, marginBottom:16 }}>
              Do you want to order {currentMeal} for {menu.en}?
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setWantsFood(true)}
                style={{ flex:1, padding:16, borderRadius:12, border:`1px solid ${t.accent}`,
                  background:t.accentBg, color:t.accent, fontSize:16, fontWeight:700,
                  cursor:'pointer', transition:'all 0.3s' }}>
                ✅ Yes
              </button>
              <button onClick={() => { setWantsFood(false); setTimeout(handleNext, 300) }}
                style={{ flex:1, padding:16, borderRadius:12, border:`1px solid ${t.border}`,
                  background:'transparent', color:t.text, fontSize:16, fontWeight:700,
                  cursor:'pointer', transition:'all 0.3s' }}>
                ❌ No
              </button>
            </div>
          </div>
        ) : wantsFood === false ? (
          <div style={{ textAlign:'center', padding:20 }}>
            <p style={{ fontSize:14, color:t.textSub }}>Skipping to next meal...</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:t.text, marginBottom:16 }}>
              Select quantity for each dish:
            </p>
            {dishes.map(dish => (
              <div key={dish} style={{ marginBottom:16, padding:12, background:t.inputBg, borderRadius:10 }}>
                <p style={{ margin:'0 0 10px', fontSize:13, fontWeight:600, color:t.text }}>{dish}</p>
                <div style={{ display:'flex', gap:8 }}>
                  {percentages.map(pct => (
                    <button key={pct} onClick={() => handlePercentageSelect(dish, pct)}
                      style={{ flex:1, padding:'8px 4px', borderRadius:8,
                        border:`1.5px solid ${responses[dish] === pct ? t.accent : t.border}`,
                        background: responses[dish] === pct ? t.accentBg : 'transparent',
                        color: responses[dish] === pct ? t.accent : t.text,
                        fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={handleNext} disabled={loading || Object.keys(responses).length < dishes.length}
              style={{ width:'100%', padding:14, borderRadius:12, border:'none', marginTop:16,
                background: loading || Object.keys(responses).length < dishes.length ? t.border : t.accentGrad,
                color:'#fff', fontSize:15, fontWeight:700,
                cursor: loading || Object.keys(responses).length < dishes.length ? 'not-allowed' : 'pointer',
                opacity: loading || Object.keys(responses).length < dishes.length ? 0.5 : 1,
                transition:'all 0.3s' }}>
              {loading ? 'Saving...' : currentMeal === 'dinner' && currentDayIndex === days.length - 1 ? 'Complete Survey' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Home Page ──────────────────────────────────────────────── */
function HomePage() {
  const t = useTheme()
  const [expandedDay, setExpandedDay] = useState(null)
  const [showSurvey, setShowSurvey] = useState(false)
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  return (
    <main style={{ flex:1, padding:'20px 20px 80px', maxWidth:800, margin:'0 auto', width:'100%' }}>
      <GamificationBadge/>
      <FeedbackButton/>

      {/* Weekly Menu Header */}
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <h2 style={{ margin:'0 0 8px', fontSize:22, fontWeight:700, color:t.accent }}>
          Weekly Menu Schedule
        </h2>
        <p style={{ margin:0, fontSize:13, color:t.textSub }}>
          Monday - Saturday | Click to view details
        </p>
      </div>

      {/* Logo */}
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <img src="/al-mawaid.png" alt="Al-Mawaid" 
          style={{ width:120, height:120, objectFit:'contain', 
            filter: t.id === 'night' ? 'drop-shadow(0 4px 12px rgba(201,168,76,0.3))' : 'none' }}/>
      </div>

      {/* Start Survey Button */}
      <button onClick={() => setShowSurvey(true)}
        style={{ width:'100%', padding:16, borderRadius:12, border:'none', marginBottom:24,
          background:t.accentGrad, color:'#fff', fontSize:16, fontWeight:700,
          cursor:'pointer', boxShadow:`0 6px 20px ${t.accentBg}`, transition:'all 0.3s' }}>
        📋 Start Weekly Survey
      </button>

      {/* Days Accordion */}
      {days.map(day => {
        const menu = WEEKLY_MENU[day]
        const isExpanded = expandedDay === day
        
        return (
          <div key={day} style={{ marginBottom:12 }}>
            <button onClick={() => setExpandedDay(isExpanded ? null : day)}
              style={{ width:'100%', padding:16, borderRadius:12, border:`1px solid ${t.borderActive}`,
                background: isExpanded ? t.cardActive : t.card, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                transition:'all 0.3s', boxShadow: isExpanded ? `0 4px 16px ${t.accentBg}` : 'none' }}>
              <div style={{ textAlign:'left' }}>
                <h3 style={{ margin:0, fontSize:16, fontWeight:700, color:t.accent }}>
                  {menu.en}
                </h3>
                <p style={{ margin:'4px 0 0', fontSize:12, color:t.textSub, fontFamily:"'Amiri','Georgia',serif" }}>
                  {menu.ar}
                </p>
              </div>
              {isExpanded ? <ChevronUp size={20} color={t.accent}/> : <ChevronDown size={20} color={t.text}/>}
            </button>

            {isExpanded && (
              <div style={{ marginTop:8, padding:16, background:t.inputBg, borderRadius:12,
                border:`1px solid ${t.border}` }}>
                {/* Lunch */}
                <div style={{ marginBottom:16 }}>
                  <h4 style={{ margin:'0 0 8px', fontSize:14, fontWeight:700, color:t.accent }}>
                    🍛 Lunch
                  </h4>
                  <ul style={{ margin:0, paddingLeft:20, fontSize:13, color:t.textBody, lineHeight:1.8 }}>
                    {menu.lunch.map(dish => <li key={dish}>{dish}</li>)}
                  </ul>
                </div>
                {/* Dinner */}
                <div>
                  <h4 style={{ margin:'0 0 8px', fontSize:14, fontWeight:700, color:t.accent }}>
                    🍽️ Dinner
                  </h4>
                  <ul style={{ margin:0, paddingLeft:20, fontSize:13, color:t.textBody, lineHeight:1.8 }}>
                    {menu.dinner.map(dish => <li key={dish}>{dish}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )
      })}

      {showSurvey && <SurveyModal onClose={() => setShowSurvey(false)}/>}
    </main>
  )
}

/* ─── Profile Page ───────────────────────────────────────────── */
function ProfilePage() {
  const t = useTheme()
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()
      setStats(data)
    } catch (err) {
      console.error('Load profile error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'20px 20px 80px', maxWidth:600, margin:'0 auto', width:'100%' }}>
      <div style={{ textAlign:'center', marginBottom:24 }}>
        <div style={{ width:100, height:100, margin:'0 auto 16px', borderRadius:'50%',
          background:t.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 8px 24px ${t.accentBg}` }}>
          <User size={50} color="#fff"/>
        </div>
        <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:700, color:t.text }}>
          {user.email}
        </h2>
        <p style={{ margin:0, fontSize:12, color:t.textSub }}>Member since {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      {stats && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          <div style={{ padding:16, background:t.card, borderRadius:12, border:`1px solid ${t.border}`, textAlign:'center' }}>
            <Trophy size={24} color={t.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:t.accent }}>{stats.level}</div>
            <div style={{ fontSize:11, color:t.textSub }}>Level</div>
          </div>
          <div style={{ padding:16, background:t.card, borderRadius:12, border:`1px solid ${t.border}`, textAlign:'center' }}>
            <Star size={24} color={t.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:t.accent }}>{stats.points}</div>
            <div style={{ fontSize:11, color:t.textSub }}>Points</div>
          </div>
          <div style={{ padding:16, background:t.card, borderRadius:12, border:`1px solid ${t.border}`, textAlign:'center' }}>
            <Zap size={24} color={t.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:t.accent }}>{stats.streak}</div>
            <div style={{ fontSize:11, color:t.textSub }}>Day Streak</div>
          </div>
          <div style={{ padding:16, background:t.card, borderRadius:12, border:`1px solid ${t.border}`, textAlign:'center' }}>
            <FileText size={24} color={t.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:t.accent }}>{stats.total_surveys}</div>
            <div style={{ fontSize:11, color:t.textSub }}>Surveys</div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ─── Post Page ──────────────────────────────────────────────── */
function PostPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [newPost, setNewPost] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      const { data } = await supabase
        .from('posts')
        .select('*, profiles(email)')
        .order('created_at', { ascending: false })
        .limit(20)
      setPosts(data || [])
    } catch (err) {
      console.error('Load posts error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePost = async () => {
    if (!newPost.trim()) return
    setSubmitting(true)

    try {
      const { error } = await supabase
        .from('posts')
        .insert([{ user_id: user.id, content: newPost.trim() }])
      
      if (error) throw error
      setNewPost('')
      loadPosts()
    } catch (err) {
      alert('Error posting: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'20px 20px 80px', maxWidth:600, margin:'0 auto', width:'100%' }}>
      {/* Create Post */}
      <div style={{ marginBottom:24, padding:16, background:t.card, borderRadius:12, border:`1px solid ${t.border}` }}>
        <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
          style={{ width:'100%', minHeight:80, padding:12, borderRadius:10, boxSizing:'border-box',
            background:t.inputBg, border:`1px solid ${t.inputBorder}`, color:t.text,
            fontSize:14, resize:'vertical', outline:'none', fontFamily:'inherit', marginBottom:12 }}
          placeholder="Share an announcement or update..."/>
        <button onClick={handlePost} disabled={submitting || !newPost.trim()}
          style={{ width:'100%', padding:12, borderRadius:10, border:'none',
            background: submitting || !newPost.trim() ? t.border : t.accentGrad,
            color:'#fff', fontWeight:700, cursor: submitting || !newPost.trim() ? 'not-allowed' : 'pointer',
            opacity: submitting || !newPost.trim() ? 0.5 : 1 }}>
          {submitting ? 'Posting...' : 'Post Update'}
        </button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div style={{ textAlign:'center', padding:40, color:t.textSub }}>
          No posts yet. Be the first to share!
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ marginBottom:12, padding:16, background:t.card,
            borderRadius:12, border:`1px solid ${t.border}` }}>
            <div style={{ display:'flex', gap:12, marginBottom:8 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:t.accentGrad,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <User size={20} color="#fff"/>
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:t.text }}>
                  {post.profiles?.email || 'User'}
                </div>
                <div style={{ fontSize:11, color:t.textSub }}>
                  {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            <p style={{ margin:0, fontSize:14, color:t.textBody, lineHeight:1.6 }}>
              {post.content}
            </p>
          </div>
        ))
      )}
    </main>
  )
}

/* ─── Theme Switcher ─────────────────────────────────────────── */
function ThemeSwitcher({ themeId, setThemeId, theme }) {
  return (
    <div style={{ position:'fixed', bottom:80, right:16, zIndex:25 }}>
      <button onClick={() => setThemeId(themeId === 'night' ? 'sunrise' : 'night')}
        style={{ background:theme.card, border:`1px solid ${theme.border}`, borderRadius:50,
          padding:12, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 4px 12px ${theme.accentBg}`, transition:'all 0.3s' }}>
        {themeId === 'night' ? <Sun size={20} color={theme.accent}/> : <Moon size={20} color={theme.accent}/>}
      </button>
    </div>
  )
}

/* ─── Logout Button ──────────────────────────────────────────── */
function LogoutButton() {
  const t = useTheme()
  const { signOut } = useAuth()

  return (
    <button onClick={signOut}
      style={{ position:'fixed', top:16, right:16, zIndex:20, background:t.card,
        border:`1px solid ${t.border}`, borderRadius:50, padding:10, cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.3s',
        boxShadow:`0 4px 12px ${t.accentBg}` }}>
      <LogOut size={18} color={t.accent}/>
    </button>
  )
}

/* ─── Main App ───────────────────────────────────────────────── */
export default function App() {
  const [session, setSession] = useState(undefined)
  const [activeTab, setActiveTab] = useState('home')
  const [themeId, setThemeId] = useState(getSavedThemeId)
  const theme = THEMES[themeId] || THEMES.night

  useEffect(() => { saveThemeId(themeId) }, [themeId])

  useEffect(() => {
    supabase.auth.getSession().then(({ data:{ session } }) => setSession(session))
    const { data:{ subscription } } = supabase.auth.onAuthStateChange((_evt, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => { await supabase.auth.signOut() }, [])

  const tabs = [
    { id:'home', label:'Home', Icon: Home },
    { id:'profile', label:'Profile', Icon: User },
    { id:'post', label:'Posts', Icon: FileText },
  ]

  if (session === undefined) {
    return (
      <div style={{ minHeight:'100vh', background:theme.bgGrad,
        display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
        <Spinner/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .8s linear infinite}body{margin:0}`}</style>
      </div>
    )
  }

  if (!session) return <LoginPage themeId={themeId} setThemeId={setThemeId}/>

  return (
    <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
      <AuthCtx.Provider value={{ user:session.user, signOut }}>
        <div style={{ fontFamily:"'Cairo','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
          minHeight:'100vh', background:theme.bg, color:theme.text,
          display:'flex', flexDirection:'column', transition:'background 0.35s ease, color 0.35s ease' }}>

          <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={theme}/>
          <LogoutButton/>

          <header style={{ position:'relative', overflow:'hidden',
            background:theme.bgGrad, padding:'20px 20px 0', transition:'background 0.35s ease' }}>
            <GeoBg t={theme}/>

            <div style={{ position:'relative', zIndex:1, display:'flex',
              justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10,
                letterSpacing:'0.2em', textTransform:'uppercase', color:theme.textSub, opacity:0.6 }}>
                🍽️ Al-Mawaid
              </div>
              <span style={{ fontSize:10, color:theme.textSub, opacity:0.4 }}>
                {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>

            {activeTab === 'home' && (
              <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:8 }}>
                <p style={{ fontFamily:"'Amiri','Georgia',serif", fontSize:18, letterSpacing:'0.1em', color:theme.accent, margin:0 }}>
                  بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
              </div>
            )}

            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:12 }}>
              <h1 style={{ margin:0, fontSize: activeTab === 'home' ? 34 : 26,
                fontWeight:900, textTransform:'uppercase', letterSpacing:'0.05em', lineHeight:1.1,
                color:theme.accent }}>
                {activeTab === 'home' ? 'AL-MAWAID' : activeTab === 'profile' ? 'PROFILE' : 'POSTS'}
              </h1>
            </div>

            <svg style={{ display:'block', position:'relative', zIndex:1 }}
              width="100%" viewBox="0 0 1440 48" preserveAspectRatio="none">
              <path d="M0,16 C200,48 400,0 600,24 C800,48 1000,6 1200,28 C1320,42 1400,16 1440,22 L1440,48 L0,48 Z"
                fill={theme.bg}/>
            </svg>
          </header>

          {activeTab === 'home' && <HomePage/>}
          {activeTab === 'profile' && <ProfilePage/>}
          {activeTab === 'post' && <PostPage/>}

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
            @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Amiri:wght@400;700&display=swap');
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.8s linear infinite; }
            * { -webkit-tap-highlight-color: transparent; }
            body { margin: 0; }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
