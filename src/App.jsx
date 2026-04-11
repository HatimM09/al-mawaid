// src/App.jsx — Al-Mawaid Food Survey System
// ✨ Supabase Auth | Weekly Menu Survey | Gamification | Arabic Support
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, User, X, 
  Star, Send, Bell, Camera, Palette, Check,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ChevronUp,
  MessageSquare, Trophy, Zap, Award, TrendingUp, Edit, Circle, CheckCircle
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env')
}
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── THEME (Fixed Night Theme) ───────────────────────────────
const THEME = {
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

const AuthCtx  = createContext(null)
const useAuth  = () => useContext(AuthCtx)

/* ─── Shared Components ──────────────────────────────────────── */
const GeoBg = () => {
  return (
    <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
      <defs>
        <pattern id="geo" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 20L20 40L0 20Z" fill="none" stroke={THEME.geo} strokeWidth="0.7"/>
          <circle cx="20" cy="20" r="5" fill="none" stroke={THEME.geo} strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)"/>
    </svg>
  )
}

const Spinner = ({ fullPage = true }) => {
  const inner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div 
        className="spin" 
        style={{ 
          width: 36, 
          height: 36, 
          border: `3px solid ${THEME.spinnerBorder}`, 
          borderTop: `3px solid ${THEME.spinnerTop}`, 
          borderRadius: '50%' 
        }}
      />
      {fullPage && (
        <p style={{ 
          margin: 0, 
          fontSize: 13, 
          color: THEME.textSub, 
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
function LoginPage() {
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
    <div style={{ minHeight:'100vh', background:THEME.bgGrad, display:'flex', 
      alignItems:'center', justifyContent:'center', padding:20, position:'relative', overflow:'hidden',
      fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
      <GeoBg/>

      <div style={{ position:'relative', zIndex:1, width:'100%', maxWidth:420, 
        background:THEME.loginCard, backdropFilter:'blur(20px)', borderRadius:24,
        padding:'40px 30px', border:`1px solid ${THEME.borderActive}`, 
        boxShadow:`0 20px 60px rgba(0,0,0,0.3)` }}>
        
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ width:100, height:100, margin:'0 auto 16px', 
            background:`linear-gradient(135deg, ${THEME.accent}, ${THEME.accentBorder})`,
            borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 8px 24px ${THEME.accentBg}` }}>
            <img src="/al-mawaid.png" alt="Al-Mawaid" style={{ width:70, height:70, objectFit:'contain' }}/>
          </div>
          <h1 style={{ margin:'0 0 8px', fontSize:32, fontWeight:900, color:THEME.accent,
            textTransform:'uppercase', letterSpacing:'0.05em', fontFamily:"'Cairo','Segoe UI',sans-serif" }}>
            Al-Mawaid
          </h1>
          <p style={{ margin:0, fontSize:14, color:THEME.textSub, opacity:0.7, 
            fontFamily:"'Amiri','Georgia',serif", letterSpacing:'0.1em' }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </div>

        {/* Toggle Mode */}
        <div style={{ display:'flex', gap:8, marginBottom:20 }}>
          <button onClick={() => setMode('login')}
            style={{ flex:1, padding:'10px 20px', borderRadius:12, border:`1px solid ${mode === 'login' ? THEME.accent : THEME.border}`,
              background: mode === 'login' ? THEME.accentBg : 'transparent', color: mode === 'login' ? THEME.accent : THEME.text,
              fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
            Login
          </button>
          <button onClick={() => setMode('signup')}
            style={{ flex:1, padding:'10px 20px', borderRadius:12, border:`1px solid ${mode === 'signup' ? THEME.accent : THEME.border}`,
              background: mode === 'signup' ? THEME.accentBg : 'transparent', color: mode === 'signup' ? THEME.accent : THEME.text,
              fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
            Sign Up
          </button>
        </div>

        <form onSubmit={handleAuth}>
          {/* Email */}
          <div style={{ marginBottom:16 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:THEME.textSub, marginBottom:6 }}>
              Email
            </label>
            <div style={{ position:'relative' }}>
              <Mail size={18} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:THEME.accent, opacity:0.6 }}/>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{ width:'100%', padding:'12px 12px 12px 44px', borderRadius:12,
                  background:THEME.inputBg, border:`1px solid ${THEME.inputBorder}`, color:THEME.text,
                  fontSize:14, outline:'none', transition:'all 0.3s', boxSizing:'border-box' }}
                placeholder="Enter your email"/>
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom:20 }}>
            <label style={{ display:'block', fontSize:12, fontWeight:600, color:THEME.textSub, marginBottom:6 }}>
              Password
            </label>
            <div style={{ position:'relative' }}>
              <Lock size={18} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:THEME.accent, opacity:0.6 }}/>
              <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required
                style={{ width:'100%', padding:'12px 44px 12px 44px', borderRadius:12,
                  background:THEME.inputBg, border:`1px solid ${THEME.inputBorder}`, color:THEME.text,
                  fontSize:14, outline:'none', transition:'all 0.3s', boxSizing:'border-box' }}
                placeholder="Enter your password"/>
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)',
                  background:'none', border:'none', cursor:'pointer', padding:0, display:'flex' }}>
                {showPass ? <EyeOff size={18} color={THEME.accent}/> : <Eye size={18} color={THEME.accent}/>}
              </button>
            </div>
          </div>

          {error && <ErrorBanner msg={error}/>}

          <button type="submit" disabled={loading}
            style={{ width:'100%', padding:14, borderRadius:12, border:'none',
              background:THEME.accentGrad, color:'#fff', fontSize:15, fontWeight:700,
              cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1,
              boxShadow:`0 4px 16px ${THEME.accentBg}`, transition:'all 0.3s' }}>
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

/* ─── Survey Modal ───────────────────────────────────────────── */
function SurveyModal({ onClose }) {
  const { user } = useAuth()
  const [currentDay, setCurrentDay] = useState('monday')
  const [currentMeal, setCurrentMeal] = useState('lunch')
  const [responses, setResponses] = useState({})
  const [wantsFood, setWantsFood] = useState(null) // null, true, false
  const [loading, setLoading] = useState(false)
  const [existingResponse, setExistingResponse] = useState(null)

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
        style={{ background:THEME.card, borderRadius:20, padding:24, maxWidth:500, width:'100%',
          border:`1px solid ${THEME.borderActive}`, boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
          maxHeight:'90vh', overflowY:'auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
            <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:THEME.accent }}>
              {menu.en} - {currentMeal === 'lunch' ? 'Lunch 🍛' : 'Dinner 🍽️'}
            </h2>
            <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', padding:4 }}>
              <X size={22} color={THEME.text}/>
            </button>
          </div>
          <p style={{ margin:0, fontSize:13, color:THEME.textSub, fontFamily:"'Amiri','Georgia',serif" }}>
            {menu.ar}
          </p>
          {existingResponse && (
            <div style={{ marginTop:8, padding:8, background:THEME.accentBg, borderRadius:8, fontSize:11, color:THEME.accent }}>
              ✏️ Edit Mode {existingResponse.edit_count >= 1 ? '(Last edit)' : '(1 edit remaining)'}
            </div>
          )}
        </div>

        {/* Yes/No Question */}
        {wantsFood === null ? (
          <div>
            <p style={{ fontSize:15, fontWeight:600, color:THEME.text, marginBottom:16 }}>
              Do you want to order {currentMeal} for {menu.en}?
            </p>
            <div style={{ display:'flex', gap:12 }}>
              <button onClick={() => setWantsFood(true)}
                style={{ flex:1, padding:16, borderRadius:12, border:`1px solid ${THEME.accent}`,
                  background:THEME.accentBg, color:THEME.accent, fontSize:16, fontWeight:700,
                  cursor:'pointer', transition:'all 0.3s' }}>
                ✅ Yes
              </button>
              <button onClick={() => { setWantsFood(false); setTimeout(handleNext, 300) }}
                style={{ flex:1, padding:16, borderRadius:12, border:`1px solid ${THEME.border}`,
                  background:'transparent', color:THEME.text, fontSize:16, fontWeight:700,
                  cursor:'pointer', transition:'all 0.3s' }}>
                ❌ No
              </button>
            </div>
          </div>
        ) : wantsFood === false ? (
          <div style={{ textAlign:'center', padding:20 }}>
            <p style={{ fontSize:14, color:THEME.textSub }}>Skipping to next meal...</p>
          </div>
        ) : (
          <div>
            <p style={{ fontSize:14, fontWeight:600, color:THEME.text, marginBottom:16 }}>
              Select quantity for each dish:
            </p>
            {dishes.map(dish => (
              <div key={dish} style={{ marginBottom:16, padding:12, background:THEME.inputBg, borderRadius:10 }}>
                <p style={{ margin:'0 0 10px', fontSize:13, fontWeight:600, color:THEME.text }}>{dish}</p>
                <div style={{ display:'flex', gap:8 }}>
                  {percentages.map(pct => (
                    <button key={pct} onClick={() => handlePercentageSelect(dish, pct)}
                      style={{ flex:1, padding:'8px 4px', borderRadius:8,
                        border:`1.5px solid ${responses[dish] === pct ? THEME.accent : THEME.border}`,
                        background: responses[dish] === pct ? THEME.accentBg : 'transparent',
                        color: responses[dish] === pct ? THEME.accent : THEME.text,
                        fontSize:12, fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button onClick={handleNext} disabled={loading || Object.keys(responses).length < dishes.length}
              style={{ width:'100%', padding:14, borderRadius:12, border:'none', marginTop:16,
                background: loading || Object.keys(responses).length < dishes.length ? THEME.border : THEME.accentGrad,
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
  const { user } = useAuth()
  const [expandedDay, setExpandedDay] = useState(null)
  const [showSurvey, setShowSurvey] = useState(false)
  const [stats, setStats] = useState({ points: 0, level: 1, total_surveys: 0 })
  const [thaliName, setThaliName] = useState('')
  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState('')
  const [loading, setLoading] = useState(true)

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

  useEffect(() => {
    loadUserData()
  }, [user])

  const loadUserData = async () => {
    try {
      // Load user stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (statsData) {
        setStats(statsData)
      } else {
        // Create initial stats
        const { data: newStats } = await supabase
          .from('user_stats')
          .insert([{ user_id: user.id, points: 0, level: 1, streak: 0, total_surveys: 0 }])
          .select()
          .single()
        if (newStats) setStats(newStats)
      }

      // Load thali name from user metadata or create default
      const { data: { user: userData } } = await supabase.auth.getUser()
      const name = userData?.user_metadata?.thali_name || 'My Thali'
      setThaliName(name)
      setTempName(name)

    } catch (err) {
      console.error('Load user data error:', err)
    } finally {
      setLoading(false)
    }
  }

  const saveThaliName = async () => {
    if (!tempName.trim()) return
    try {
      const { error } = await supabase.auth.updateUser({
        data: { thali_name: tempName.trim() }
      })
      if (!error) {
        setThaliName(tempName.trim())
        setEditingName(false)
      }
    } catch (err) {
      console.error('Save name error:', err)
    }
  }

  if (loading) return <Spinner/>

  return (
    <main style={{ flex:1, padding:'20px 20px 80px', maxWidth:800, margin:'0 auto', width:'100%' }}>
      
      {/* Profile Card */}
      <div style={{ marginBottom:20, padding:20, borderRadius:16,
        background:THEME.cardActive, border:`1px solid ${THEME.borderActive}`,
        display:'flex', gap:16, alignItems:'center' }}>
        
        {/* Profile Picture */}
        <div style={{ position:'relative' }}>
          <div style={{ width:70, height:70, borderRadius:'50%', 
            background:THEME.accentGrad, display:'flex', alignItems:'center', 
            justifyContent:'center', boxShadow:`0 4px 16px ${THEME.accentBg}`,
            fontSize:28, fontWeight:700, color:'#fff' }}>
            {user.email.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* User Info */}
        <div style={{ flex:1 }}>
          {editingName ? (
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <input type="text" value={tempName} onChange={e => setTempName(e.target.value)}
                style={{ flex:1, padding:'8px 12px', borderRadius:8, background:THEME.inputBg,
                  border:`1px solid ${THEME.inputBorder}`, color:THEME.text, fontSize:14, outline:'none' }}
                placeholder="Enter thali name"/>
              <button onClick={saveThaliName}
                style={{ padding:'8px 12px', borderRadius:8, background:THEME.accentGrad,
                  border:'none', color:'#fff', cursor:'pointer', display:'flex', alignItems:'center' }}>
                <Check size={16}/>
              </button>
              <button onClick={() => { setEditingName(false); setTempName(thaliName) }}
                style={{ padding:'8px 12px', borderRadius:8, background:THEME.border,
                  border:'none', color:THEME.text, cursor:'pointer', display:'flex', alignItems:'center' }}>
                <X size={16}/>
              </button>
            </div>
          ) : (
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
              <h3 style={{ margin:0, fontSize:18, fontWeight:700, color:THEME.accent }}>
                {thaliName}
              </h3>
              <button onClick={() => setEditingName(true)}
                style={{ background:'none', border:'none', cursor:'pointer', padding:4, display:'flex' }}>
                <Edit size={14} color={THEME.accent}/>
              </button>
            </div>
          )}
          <p style={{ margin:0, fontSize:12, color:THEME.textSub }}>{user.email}</p>
        </div>
      </div>

      {/* Survey Dashboard */}
      <div style={{ marginBottom:24, padding:20, borderRadius:16,
        background:THEME.card, border:`1px solid ${THEME.border}` }}>
        <h3 style={{ margin:'0 0 16px', fontSize:16, fontWeight:700, color:THEME.accent }}>
          Survey Dashboard
        </h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
          <div style={{ textAlign:'center', padding:12, background:THEME.inputBg, borderRadius:10 }}>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent, marginBottom:4 }}>
              {stats.total_surveys}
            </div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Total Surveys</div>
          </div>
          <div style={{ textAlign:'center', padding:12, background:THEME.inputBg, borderRadius:10 }}>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent, marginBottom:4 }}>
              {stats.level}
            </div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Level</div>
          </div>
          <div style={{ textAlign:'center', padding:12, background:THEME.inputBg, borderRadius:10 }}>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent, marginBottom:4 }}>
              {stats.points}
            </div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Points</div>
          </div>
        </div>
      </div>

      {/* Weekly Menu Header with Logo */}
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <img src="/al-mawaid.png" alt="Al-Mawaid" 
          style={{ width:40, height:40, objectFit:'contain', 
            filter:'drop-shadow(0 2px 8px rgba(201,168,76,0.3))' }}/>
        <div>
          <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:THEME.accent }}>
            Weekly Menu Schedule
          </h2>
          <p style={{ margin:0, fontSize:12, color:THEME.textSub }}>
            Monday - Saturday
          </p>
        </div>
      </div>

      {/* Start Survey Button */}
      <button onClick={() => setShowSurvey(true)}
        style={{ width:'100%', padding:16, borderRadius:12, border:'none', marginBottom:24,
          background:THEME.accentGrad, color:'#fff', fontSize:16, fontWeight:700,
          cursor:'pointer', boxShadow:`0 6px 20px ${THEME.accentBg}`, transition:'all 0.3s',
          display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
        <Circle size={20}/>
        Start Weekly Survey
      </button>

      {/* Days Accordion */}
      {days.map(day => {
        const menu = WEEKLY_MENU[day]
        const isExpanded = expandedDay === day
        
        return (
          <div key={day} style={{ marginBottom:12 }}>
            <button onClick={() => setExpandedDay(isExpanded ? null : day)}
              style={{ width:'100%', padding:16, borderRadius:12, border:`1px solid ${THEME.borderActive}`,
                background: isExpanded ? THEME.cardActive : THEME.card, cursor:'pointer',
                display:'flex', justifyContent:'space-between', alignItems:'center',
                transition:'all 0.3s', boxShadow: isExpanded ? `0 4px 16px ${THEME.accentBg}` : 'none' }}>
              <div style={{ textAlign:'left' }}>
                <h3 style={{ margin:0, fontSize:16, fontWeight:700, color:THEME.accent }}>
                  {menu.en}
                </h3>
                <p style={{ margin:'4px 0 0', fontSize:12, color:THEME.textSub, fontFamily:"'Amiri','Georgia',serif" }}>
                  {menu.ar}
                </p>
              </div>
              {isExpanded ? <ChevronUp size={20} color={THEME.accent}/> : <ChevronDown size={20} color={THEME.text}/>}
            </button>

            {isExpanded && (
              <div style={{ marginTop:8, padding:16, background:THEME.inputBg, borderRadius:12,
                border:`1px solid ${THEME.border}` }}>
                {/* Lunch */}
                <div style={{ marginBottom:16 }}>
                  <h4 style={{ margin:'0 0 8px', fontSize:14, fontWeight:700, color:THEME.accent }}>
                    🍛 Lunch
                  </h4>
                  <ul style={{ margin:0, paddingLeft:20, fontSize:13, color:THEME.textBody, lineHeight:1.8 }}>
                    {menu.lunch.map(dish => <li key={dish}>{dish}</li>)}
                  </ul>
                </div>
                {/* Dinner */}
                <div>
                  <h4 style={{ margin:'0 0 8px', fontSize:14, fontWeight:700, color:THEME.accent }}>
                    🍽️ Dinner
                  </h4>
                  <ul style={{ margin:0, paddingLeft:20, fontSize:13, color:THEME.textBody, lineHeight:1.8 }}>
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

/* ─── Feedback Page ──────────────────────────────────────────── */
function FeedbackPage() {
  const { user } = useAuth()
  const [currentDay, setCurrentDay] = useState('monday')
  const [lunchRating, setLunchRating] = useState(0)
  const [lunchEmoji, setLunchEmoji] = useState('')
  const [dinnerRating, setDinnerRating] = useState(0)
  const [dinnerEmoji, setDinnerEmoji] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const menu = WEEKLY_MENU[currentDay]

  const emojis = ['😡', '😟', '😐', '😊', '😍']

  useEffect(() => {
    checkSubmission()
  }, [currentDay])

  const checkSubmission = async () => {
    try {
      const { data } = await supabase
        .from('weekly_feedback')
        .select('*')
        .eq('user_id', user.id)
        .eq('day', currentDay)
        .single()

      if (data) {
        setSubmitted(true)
        setLunchRating(data.lunch_rating)
        setLunchEmoji(data.lunch_emoji)
        setDinnerRating(data.dinner_rating)
        setDinnerEmoji(data.dinner_emoji)
        setMessage(data.message || '')
      } else {
        setSubmitted(false)
        setLunchRating(0)
        setLunchEmoji('')
        setDinnerRating(0)
        setDinnerEmoji('')
        setMessage('')
      }
    } catch (err) {
      setSubmitted(false)
    }
  }

  const handleSubmit = async () => {
    if (lunchRating === 0 || dinnerRating === 0) {
      alert('Please rate both lunch and dinner!')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('weekly_feedback')
        .upsert([{
          user_id: user.id,
          day: currentDay,
          lunch_rating: lunchRating,
          lunch_emoji: lunchEmoji,
          dinner_rating: dinnerRating,
          dinner_emoji: dinnerEmoji,
          message: message.trim()
        }], { onConflict: 'user_id,day' })

      if (error) throw error

      alert('Feedback submitted successfully! 🎉')
      setSubmitted(true)
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{ flex:1, padding:'20px 20px 80px', maxWidth:600, margin:'0 auto', width:'100%' }}>
      
      {/* Day Selector */}
      <div style={{ marginBottom:24 }}>
        <h3 style={{ margin:'0 0 12px', fontSize:16, fontWeight:700, color:THEME.accent }}>
          Select Day
        </h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:8 }}>
          {days.map(day => (
            <button key={day} onClick={() => setCurrentDay(day)}
              style={{ padding:'12px 8px', borderRadius:10, 
                border:`1px solid ${currentDay === day ? THEME.accent : THEME.border}`,
                background: currentDay === day ? THEME.accentBg : THEME.card,
                color: currentDay === day ? THEME.accent : THEME.text,
                fontSize:13, fontWeight:700, cursor:'pointer', transition:'all 0.3s' }}>
              {WEEKLY_MENU[day].en}
            </button>
          ))}
        </div>
      </div>

      {/* Current Day Display */}
      <div style={{ marginBottom:24, padding:16, background:THEME.card, borderRadius:12,
        border:`1px solid ${THEME.border}`, textAlign:'center' }}>
        <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:700, color:THEME.accent }}>
          {menu.en}
        </h2>
        <p style={{ margin:0, fontSize:13, color:THEME.textSub, fontFamily:"'Amiri','Georgia',serif" }}>
          {menu.ar}
        </p>
      </div>

      {/* Lunch Feedback */}
      <div style={{ marginBottom:24, padding:20, background:THEME.cardActive, 
        borderRadius:12, border:`1px solid ${THEME.borderActive}` }}>
        <h3 style={{ margin:'0 0 16px', fontSize:16, fontWeight:700, color:THEME.accent,
          display:'flex', alignItems:'center', gap:8 }}>
          🍛 Lunch Feedback
        </h3>
        
        {/* Star Rating */}
        <div style={{ marginBottom:16 }}>
          <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:600, color:THEME.text }}>
            Rate your lunch:
          </p>
          <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setLunchRating(star)} disabled={submitted}
                style={{ background:'none', border:'none', cursor: submitted ? 'not-allowed' : 'pointer',
                  fontSize:28, opacity: submitted ? 0.5 : 1, transition:'all 0.2s' }}>
                <Star size={32} 
                  fill={star <= lunchRating ? THEME.accent : 'none'}
                  color={star <= lunchRating ? THEME.accent : THEME.border}/>
              </button>
            ))}
          </div>
        </div>

        {/* Emoji Selection */}
        <div>
          <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:600, color:THEME.text }}>
            How did you feel?
          </p>
          <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
            {emojis.map(emoji => (
              <button key={emoji} onClick={() => setLunchEmoji(emoji)} disabled={submitted}
                style={{ padding:8, borderRadius:10, fontSize:28,
                  border:`2px solid ${lunchEmoji === emoji ? THEME.accent : THEME.border}`,
                  background: lunchEmoji === emoji ? THEME.accentBg : 'transparent',
                  cursor: submitted ? 'not-allowed' : 'pointer', opacity: submitted ? 0.5 : 1,
                  transition:'all 0.2s' }}>
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dinner Feedback */}
      <div style={{ marginBottom:24, padding:20, background:THEME.cardActive, 
        borderRadius:12, border:`1px solid ${THEME.borderActive}` }}>
        <h3 style={{ margin:'0 0 16px', fontSize:16, fontWeight:700, color:THEME.accent,
          display:'flex', alignItems:'center', gap:8 }}>
          🍽️ Dinner Feedback
        </h3>
        
        {/* Star Rating */}
        <div style={{ marginBottom:16 }}>
          <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:600, color:THEME.text }}>
            Rate your dinner:
          </p>
          <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
            {[1,2,3,4,5].map(star => (
              <button key={star} onClick={() => setDinnerRating(star)} disabled={submitted}
                style={{ background:'none', border:'none', cursor: submitted ? 'not-allowed' : 'pointer',
                  fontSize:28, opacity: submitted ? 0.5 : 1, transition:'all 0.2s' }}>
                <Star size={32} 
                  fill={star <= dinnerRating ? THEME.accent : 'none'}
                  color={star <= dinnerRating ? THEME.accent : THEME.border}/>
              </button>
            ))}
          </div>
        </div>

        {/* Emoji Selection */}
        <div>
          <p style={{ margin:'0 0 8px', fontSize:13, fontWeight:600, color:THEME.text }}>
            How did you feel?
          </p>
          <div style={{ display:'flex', gap:8, justifyContent:'center' }}>
            {emojis.map(emoji => (
              <button key={emoji} onClick={() => setDinnerEmoji(emoji)} disabled={submitted}
                style={{ padding:8, borderRadius:10, fontSize:28,
                  border:`2px solid ${dinnerEmoji === emoji ? THEME.accent : THEME.border}`,
                  background: dinnerEmoji === emoji ? THEME.accentBg : 'transparent',
                  cursor: submitted ? 'not-allowed' : 'pointer', opacity: submitted ? 0.5 : 1,
                  transition:'all 0.2s' }}>
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Comments */}
      <div style={{ marginBottom:24 }}>
        <label style={{ display:'block', fontSize:13, fontWeight:600, color:THEME.text, marginBottom:8 }}>
          Additional Comments (Optional)
        </label>
        <textarea value={message} onChange={e => setMessage(e.target.value)}
          disabled={submitted}
          style={{ width:'100%', minHeight:100, padding:12, borderRadius:10, boxSizing:'border-box',
            background:THEME.inputBg, border:`1px solid ${THEME.inputBorder}`, color:THEME.text,
            fontSize:14, resize:'vertical', outline:'none', fontFamily:'inherit',
            opacity: submitted ? 0.5 : 1 }}
          placeholder="Share your thoughts about the food..."/>
      </div>

      {/* Submit Button */}
      {submitted ? (
        <div style={{ padding:16, background:THEME.accentBg, borderRadius:12,
          textAlign:'center', color:THEME.accent, fontSize:14, fontWeight:700,
          display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          <CheckCircle size={20}/>
          Feedback already submitted for {menu.en}
        </div>
      ) : (
        <button onClick={handleSubmit} disabled={loading}
          style={{ width:'100%', padding:16, borderRadius:12, border:'none',
            background: loading ? THEME.border : THEME.accentGrad, color:'#fff',
            fontSize:16, fontWeight:700, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1, transition:'all 0.3s',
            boxShadow:`0 6px 20px ${THEME.accentBg}` }}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      )}
    </main>
  )
}

/* ─── Profile Page ───────────────────────────────────────────── */
function ProfilePage() {
  const { user, signOut } = useAuth()
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
          background:THEME.accentGrad, display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 8px 24px ${THEME.accentBg}`, fontSize:40, fontWeight:700, color:'#fff' }}>
          {user.email.charAt(0).toUpperCase()}
        </div>
        <h2 style={{ margin:'0 0 4px', fontSize:20, fontWeight:700, color:THEME.text }}>
          {user.email}
        </h2>
        <p style={{ margin:0, fontSize:12, color:THEME.textSub }}>
          Member since {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      {stats && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:24 }}>
          <div style={{ padding:16, background:THEME.card, borderRadius:12, border:`1px solid ${THEME.border}`, textAlign:'center' }}>
            <Trophy size={24} color={THEME.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent }}>{stats.level}</div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Level</div>
          </div>
          <div style={{ padding:16, background:THEME.card, borderRadius:12, border:`1px solid ${THEME.border}`, textAlign:'center' }}>
            <Star size={24} color={THEME.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent }}>{stats.points}</div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Points</div>
          </div>
          <div style={{ padding:16, background:THEME.card, borderRadius:12, border:`1px solid ${THEME.border}`, textAlign:'center' }}>
            <FileText size={24} color={THEME.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent }}>{stats.total_surveys}</div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Surveys</div>
          </div>
          <div style={{ padding:16, background:THEME.card, borderRadius:12, border:`1px solid ${THEME.border}`, textAlign:'center' }}>
            <MessageSquare size={24} color={THEME.accent} style={{ margin:'0 auto 8px' }}/>
            <div style={{ fontSize:24, fontWeight:700, color:THEME.accent }}>Active</div>
            <div style={{ fontSize:11, color:THEME.textSub }}>Status</div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <button onClick={signOut}
        style={{ width:'100%', padding:16, borderRadius:12, border:`1px solid ${THEME.border}`,
          background:'transparent', color:THEME.text, fontSize:16, fontWeight:700,
          cursor:'pointer', transition:'all 0.3s', marginTop:24 }}>
        Sign Out
      </button>
    </main>
  )
}

/* ─── Post Page ──────────────────────────────────────────────── */
function PostPage() {
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
      <div style={{ marginBottom:24, padding:16, background:THEME.card, borderRadius:12, border:`1px solid ${THEME.border}` }}>
        <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
          style={{ width:'100%', minHeight:80, padding:12, borderRadius:10, boxSizing:'border-box',
            background:THEME.inputBg, border:`1px solid ${THEME.inputBorder}`, color:THEME.text,
            fontSize:14, resize:'vertical', outline:'none', fontFamily:'inherit', marginBottom:12 }}
          placeholder="Share an announcement or update..."/>
        <button onClick={handlePost} disabled={submitting || !newPost.trim()}
          style={{ width:'100%', padding:12, borderRadius:10, border:'none',
            background: submitting || !newPost.trim() ? THEME.border : THEME.accentGrad,
            color:'#fff', fontWeight:700, cursor: submitting || !newPost.trim() ? 'not-allowed' : 'pointer',
            opacity: submitting || !newPost.trim() ? 0.5 : 1 }}>
          {submitting ? 'Posting...' : 'Post Update'}
        </button>
      </div>

      {/* Posts List */}
      {posts.length === 0 ? (
        <div style={{ textAlign:'center', padding:40, color:THEME.textSub }}>
          No posts yet. Be the first to share!
        </div>
      ) : (
        posts.map(post => (
          <div key={post.id} style={{ marginBottom:12, padding:16, background:THEME.card,
            borderRadius:12, border:`1px solid ${THEME.border}` }}>
            <div style={{ display:'flex', gap:12, marginBottom:8 }}>
              <div style={{ width:40, height:40, borderRadius:'50%', background:THEME.accentGrad,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                fontSize:16, fontWeight:700, color:'#fff' }}>
                {post.profiles?.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:700, color:THEME.text }}>
                  {post.profiles?.email || 'User'}
                </div>
                <div style={{ fontSize:11, color:THEME.textSub }}>
                  {new Date(post.created_at).toLocaleString()}
                </div>
              </div>
            </div>
            <p style={{ margin:0, fontSize:14, color:THEME.textBody, lineHeight:1.6 }}>
              {post.content}
            </p>
          </div>
        ))
      )}
    </main>
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
    { id:'home', label:'Home', Icon: Home },
    { id:'feedback', label:'Feedback', Icon: MessageSquare },
    { id:'post', label:'Posts', Icon: FileText },
    { id:'profile', label:'Profile', Icon: User },
  ]

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
    <AuthCtx.Provider value={{ user:session.user, signOut }}>
      <div style={{ fontFamily:"'Cairo','Segoe UI',-apple-system,BlinkMacSystemFont,sans-serif",
        minHeight:'100vh', background:THEME.bg, color:THEME.text,
        display:'flex', flexDirection:'column', transition:'background 0.35s ease, color 0.35s ease' }}>

        <header style={{ position:'relative', overflow:'hidden',
          background:THEME.bgGrad, padding:'20px 20px 0', transition:'background 0.35s ease' }}>
          <GeoBg/>

          <div style={{ position:'relative', zIndex:1, display:'flex',
            justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:10,
              letterSpacing:'0.2em', textTransform:'uppercase', color:THEME.textSub, opacity:0.6 }}>
              🍽️ Al-Mawaid
            </div>
            <span style={{ fontSize:10, color:THEME.textSub, opacity:0.4 }}>
              {new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
            </span>
          </div>

          {activeTab === 'home' && (
            <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:8 }}>
              <p style={{ fontFamily:"'Amiri','Georgia',serif", fontSize:18, letterSpacing:'0.1em', color:THEME.accent, margin:0 }}>
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>
            </div>
          )}

          <div style={{ position:'relative', zIndex:1, textAlign:'center', marginBottom:12 }}>
            <h1 style={{ margin:0, fontSize: activeTab === 'home' ? 34 : 26,
              fontWeight:900, textTransform:'uppercase', letterSpacing:'0.05em', lineHeight:1.1,
              color:THEME.accent }}>
              {activeTab === 'home' ? 'AL-MAWAID' : 
               activeTab === 'feedback' ? 'FEEDBACK' :
               activeTab === 'profile' ? 'PROFILE' : 'POSTS'}
            </h1>
          </div>

          <svg style={{ display:'block', position:'relative', zIndex:1 }}
            width="100%" viewBox="0 0 1440 48" preserveAspectRatio="none">
            <path d="M0,16 C200,48 400,0 600,24 C800,48 1000,6 1200,28 C1320,42 1400,16 1440,22 L1440,48 L0,48 Z"
              fill={THEME.bg}/>
          </svg>
        </header>

        {activeTab === 'home' && <HomePage/>}
        {activeTab === 'feedback' && <FeedbackPage/>}
        {activeTab === 'post' && <PostPage/>}
        {activeTab === 'profile' && <ProfilePage/>}

        <nav style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:30,
          display:'flex', justifyContent:'space-around', alignItems:'center',
          padding:'10px 8px 14px', background:THEME.navBg,
          borderTop:`1px solid ${THEME.navBorder}`, boxShadow:'0 -6px 30px rgba(0,0,0,0.1)',
          transition:'background 0.35s ease' }}>
          {tabs.map(({ id, label, Icon }) => {
            const active = activeTab === id
            return (
              <button key={id} onClick={() => setActiveTab(id)}
                style={{ background:'none', border:'none', cursor:'pointer',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:3,
                  padding:'2px 20px', position:'relative', WebkitTapHighlightColor:'transparent' }}>
                {active && (
                  <div style={{ position:'absolute', top:-10, left:'50%', transform:'translateX(-50%)',
                    width:32, height:3, borderRadius:6, background:THEME.accent,
                    boxShadow:`0 0 10px ${THEME.accentBg}` }}/>
                )}
                <Icon size={22} color={active ? THEME.accent : THEME.border} strokeWidth={active ? 2.2 : 1.5}/>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'0.05em',
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
          * { -webkit-tap-highlight-color: transparent; }
          body { margin: 0; }
        `}</style>
      </div>
    </AuthCtx.Provider>
  )
}
