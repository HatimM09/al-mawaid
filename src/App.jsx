// src/App.jsx — Al-Mawaid Enhanced with Weekly Menu & Feedback
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, Info, X, Sun, Moon, User, ClipboardList,
  Star, Send, Bell, Palette, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ArrowLeft,
  MessageSquare, MessageCircle, Calendar, Camera, Video, Image, Utensils,
  PauseCircle, PlayCircle, Plus, ChevronRight, Smile, Meh, Frown, Menu, MessageSquarePlus
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars.')
}
const supabase = createClient(supabaseUrl, supabaseKey)

const RATING_EMOJIS = {
  1: { emoji: '😢', label: 'Poor', color: '#ef4444' },
  2: { emoji: '😕', label: 'Below Average', color: '#f97316' },
  3: { emoji: '😐', label: 'Average', color: '#eab308' },
  4: { emoji: '😊', label: 'Good', color: '#22c55e' },
  5: { emoji: '😍', label: 'Excellent', color: '#10b981' }
}

// ─── Star Rating Component ──────────────────────────────────────
const StarRating = ({ rating, onChange, theme }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 4, transition: 'transform 0.2s',
              transform: star === rating ? 'scale(1.2)' : 'scale(1)',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <Star
              size={32}
              fill={star <= rating ? theme.accent : 'none'}
              color={star <= rating ? theme.accent : theme.border}
              strokeWidth={2}
            />
          </button>
        ))}
      </div>
      {rating > 0 && (
        <div style={{
          textAlign: 'center', animation: 'fadeInUp 0.3s ease',
          background: theme.accentBg, padding: '8px 16px', borderRadius: 12,
          border: `1px solid ${theme.accentBorder}`
        }}>
          <div style={{ fontSize: 32, marginBottom: 4 }}>{RATING_EMOJIS[rating].emoji}</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: theme.accent, textTransform: 'uppercase' }}>
            {RATING_EMOJIS[rating].label}
          </div>
        </div>
      )}
    </div>
  )
}


// ─── 5 PREMIUM THEMES ────────────────────────────────────────
const THEMES = {
  classic_blue: {
    id: 'classic_blue', label: 'Classic Blue', emoji: '🏢',
    bg: '#f8fbff', bgGrad: 'linear-gradient(180deg,#f8fbff 0%,#eef4ff 60%,#e0ebff 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#ffffff,#f0f7ff)',
    border: 'rgba(26,115,232,0.12)', borderActive: 'rgba(26,115,232,0.3)',
    accent: '#1a73e8', accentGrad: 'linear-gradient(135deg,#4285f4,#1a73e8)',
    accentBg: 'rgba(26,115,232,0.08)', accentBorder: 'rgba(26,115,232,0.25)',
    text: '#1f1f1f', textSub: '#474747', textBody: '#3c4043',
    navBg: 'linear-gradient(180deg,#ffffff,#f8fbff)', navBorder: 'rgba(26,115,232,0.15)',
    geo: 'rgba(26,115,232,0.04)', popupBg: 'rgba(255,255,255,0.98)',
    spinnerBorder: 'rgba(26,115,232,0.15)', spinnerTop: '#1a73e8',
    inputBg: 'rgba(255,255,255,1)', inputBorder: 'rgba(26,115,232,0.2)',
    loginCard: 'rgba(255,255,255,0.95)', loginText: '#1f1f1f',
  },
  prof_gray: {
    id: 'prof_gray', label: 'Professional Gray', emoji: '👤',
    bg: '#fcfcfc', bgGrad: 'linear-gradient(180deg,#fcfcfc 0%,#f1f3f4 60%,#e8eaed 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#ffffff,#f1f3f4)',
    border: 'rgba(95,99,104,0.12)', borderActive: 'rgba(95,99,104,0.3)',
    accent: '#5f6368', accentGrad: 'linear-gradient(135deg,#80868b,#5f6368)',
    accentBg: 'rgba(95,99,104,0.08)', accentBorder: 'rgba(95,99,104,0.25)',
    text: '#202124', textSub: '#5f6368', textBody: '#3c4043',
    navBg: 'linear-gradient(180deg,#ffffff,#fcfcfc)', navBorder: 'rgba(95,99,104,0.15)',
    geo: 'rgba(95,99,104,0.04)', popupBg: 'rgba(255,255,255,0.98)',
    spinnerBorder: 'rgba(95,99,104,0.15)', spinnerTop: '#5f6368',
    inputBg: 'rgba(255,255,255,1)', inputBorder: 'rgba(95,99,104,0.2)',
    loginCard: 'rgba(255,255,255,0.95)', loginText: '#202124',
  },
  emerald: {
    id: 'emerald', label: 'Emerald Green', emoji: '🌿',
    bg: '#f7fdf9', bgGrad: 'linear-gradient(180deg,#f7fdf9 0%,#e6f4ea 60%,#ceead6 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#ffffff,#e6f4ea)',
    border: 'rgba(30,142,62,0.12)', borderActive: 'rgba(30,142,62,0.3)',
    accent: '#1e8e3e', accentGrad: 'linear-gradient(135deg,#34a853,#1e8e3e)',
    accentBg: 'rgba(30,142,62,0.08)', accentBorder: 'rgba(30,142,62,0.25)',
    text: '#137333', textSub: '#188038', textBody: '#202124',
    navBg: 'linear-gradient(180deg,#ffffff,#f7fdf9)', navBorder: 'rgba(30,142,62,0.15)',
    geo: 'rgba(30,142,62,0.04)', popupBg: 'rgba(255,255,255,0.98)',
    spinnerBorder: 'rgba(30,142,62,0.15)', spinnerTop: '#1e8e3e',
    inputBg: 'rgba(255,255,255,1)', inputBorder: 'rgba(30,142,62,0.2)',
    loginCard: 'rgba(255,255,255,0.95)', loginText: '#137333',
  },
  burgundy: {
    id: 'burgundy', label: 'Burgundy Red', emoji: '🍷',
    bg: '#fff8f7', bgGrad: 'linear-gradient(180deg,#fff8f7 0%,#fce8e6 60%,#f9dada 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#ffffff,#fce8e6)',
    border: 'rgba(165,14,14,0.12)', borderActive: 'rgba(165,14,14,0.3)',
    accent: '#a50e0e', accentGrad: 'linear-gradient(135deg,#d93025,#a50e0e)',
    accentBg: 'rgba(165,14,14,0.08)', accentBorder: 'rgba(165,14,14,0.25)',
    text: '#700a0a', textSub: '#c5221f', textBody: '#202124',
    navBg: 'linear-gradient(180deg,#ffffff,#fff8f7)', navBorder: 'rgba(165,14,14,0.15)',
    geo: 'rgba(165,14,14,0.04)', popupBg: 'rgba(255,255,255,0.98)',
    spinnerBorder: 'rgba(165,14,14,0.15)', spinnerTop: '#a50e0e',
    inputBg: 'rgba(255,255,255,1)', inputBorder: 'rgba(165,14,14,0.2)',
    loginCard: 'rgba(255,255,255,0.95)', loginText: '#700a0a',
  },
  navy: {
    id: 'navy', label: 'Navy Blue', emoji: '⚓',
    bg: '#f0f4f9', bgGrad: 'linear-gradient(180deg,#f0f4f9 0%,#d2e3fc 60%,#aecbfa 100%)',
    card: '#ffffff', cardActive: 'linear-gradient(135deg,#ffffff,#d2e3fc)',
    border: 'rgba(13,71,161,0.12)', borderActive: 'rgba(13,71,161,0.3)',
    accent: '#0d47a1', accentGrad: 'linear-gradient(135deg,#1565c0,#0d47a1)',
    accentBg: 'rgba(13,71,161,0.08)', accentBorder: 'rgba(13,71,161,0.25)',
    text: '#002171', textSub: '#1565c0', textBody: '#202124',
    navBg: 'linear-gradient(180deg,#ffffff,#f0f4f9)', navBorder: 'rgba(13,71,161,0.15)',
    geo: 'rgba(13,71,161,0.04)', popupBg: 'rgba(255,255,255,0.98)',
    spinnerBorder: 'rgba(13,71,161,0.15)', spinnerTop: '#0d47a1',
    inputBg: 'rgba(255,255,255,1)', inputBorder: 'rgba(13,71,161,0.2)',
    loginCard: 'rgba(255,255,255,0.95)', loginText: '#002171',
  },
}

function getSavedThemeId() { try { return localStorage.getItem('al-mawaid-theme') || 'classic_blue' } catch { return 'classic_blue' } }
function saveThemeId(id) { try { localStorage.setItem('al-mawaid-theme', id) } catch { } }

const ThemeCtx = createContext(null)
const useTheme = () => useContext(ThemeCtx)

// ─── Toast Component & Hook ───────────────────────────────────────────────────────
// Simple toast that reads the current theme via useTheme(). If the theme context is
// unavailable (e.g., during early loading), it falls back to sensible defaults.
const Toast = ({msg, type}) => {
  const t = useTheme() || {}
  const bg = type === 'error' ? (t.accent || '#ef4444') : (t.accent || '#22c55e')
  const text = '#fff'
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 2000,
      background: bg, color: text,
      padding: '12px 20px', borderRadius: 8,
      boxShadow: `0 4px 12px ${bg}80`,
      fontSize: 14, fontWeight: 600,
      animation: 'fadeInDown 0.3s ease'
    }}>{msg}</div>
  )
}

// Hook to expose toast functionality to any component.
const useToast = () => {
  const [toastInfo, setToastInfo] = useState(null)
  const showToast = (msg, type = 'success') => {
    setToastInfo({msg, type})
    setTimeout(() => setToastInfo(null), 4000)
  }
  return {toastInfo, showToast}
}

const AuthCtx = createContext(null)
const useAuth = () => useContext(AuthCtx)

/* ─── Shared Components ─────────────────────────────────────────── */
const GeoBg = ({ t: tProp }) => {
  const ctx = useTheme()
  const t = tProp || ctx
  return (
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.4 }}>
      <defs>
        <pattern id="geo" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="1.5" fill={t.geo} />
          <circle cx="0" cy="0" r="1" fill={t.geo} />
          <circle cx="50" cy="0" r="1" fill={t.geo} />
          <circle cx="0" cy="50" r="1" fill={t.geo} />
          <circle cx="50" cy="50" r="1" fill={t.geo} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geo)" />
    </svg>
  )
}

const Spinner = ({ fullPage = true }) => {
  const t = useTheme()
  const inner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div className="spin" style={{ width: 40, height: 40, border: `3px solid ${t.spinnerBorder}`, borderTop: `3px solid ${t.spinnerTop}`, borderRadius: '50%' }} />
      {fullPage && <p style={{ margin: 0, fontSize: 14, color: t.textSub, opacity: 0.6, fontWeight: 600 }}>Loading…</p>}
    </div>
  )
  return fullPage
    ? <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>{inner}</div>
    : inner
}

const ErrorBanner = ({ msg }) => (
  <div style={{
    margin: '10px 0', padding: '14px 16px', borderRadius: 14,
    background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)',
    color: '#dc2626', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600
  }}>
    <AlertCircle size={16} style={{ flexShrink: 0 }} />{msg}
  </div>
)

/* ─── Theme Switcher (Profile Only) ─────────────────────────────────────────── */
function ThemeSwitcher({ themeId, setThemeId, theme }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 100 }}>
      <button onClick={() => setOpen(o => !o)}
        style={{
          background: theme.card, border: `1.5px solid ${theme.border}`,
          borderRadius: '50%', width: 44, height: 44, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)', transition: 'all 0.3s',
          WebkitTapHighlightColor: 'transparent', color: theme.accent
        }}>
        <Palette size={22} strokeWidth={2.4} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 60, right: 0, background: theme.card,
          border: `1.5px solid ${theme.border}`, borderRadius: 16,
          padding: 12, display: 'flex', flexDirection: 'column', gap: 8,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)', minWidth: 180
        }}>
          {Object.values(THEMES).map(th => {
            const active = th.id === themeId
            return (
              <button key={th.id} onClick={() => { setThemeId(th.id); setOpen(false) }}
                style={{
                  background: active ? th.accentBg : 'transparent',
                  border: `1.5px solid ${active ? th.accentBorder : th.border}`,
                  borderRadius: 10, padding: '10px 12px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10,
                  transition: 'all 0.2s', WebkitTapHighlightColor: 'transparent'
                }}>
                <span style={{ fontSize: 18 }}>{th.emoji}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: th.text }}>{th.label}</span>
                {active && <Check size={16} color={th.accent} strokeWidth={2.5} style={{ marginLeft: 'auto' }} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── LOGIN PAGE ─────────────────────────────────────────────────────────────────── */
function LoginPage({ themeId, setThemeId }) {
  const theme = THEMES[themeId]
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !pass) return setError('Please enter email and password')
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password: pass })
    setLoading(false)
    if (err) setError(err.message)
  }

  return (
    <div style={{
      minHeight: '100vh', background: theme.bgGrad,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      fontFamily: "'Inter', -apple-system, sans-serif", position: 'relative', overflow: 'hidden'
    }}>
      <GeoBg t={theme} />
      <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={theme} />
      <div style={{
        position: 'relative', zIndex: 1, width: '100%', maxWidth: 420,
        background: theme.loginCard, backdropFilter: 'blur(20px)',
        border: `2px solid ${theme.border}`, borderRadius: 24, padding: '40px 32px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <img src="/logo.png" alt="Logo" style={{ width: 60, height: 60, objectFit: 'contain' }} />
          </div>
          <h1 style={{
            margin: '0 0 8px', fontSize: 32, fontWeight: 900, color: theme.accent,
            textShadow: `0 0 24px ${theme.accentBg}`, letterSpacing: '0.02em'
          }}>Al-Mawaid</h1>
          <p style={{ margin: 0, fontSize: 13, color: theme.textSub, opacity: 0.7, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: '0.03em' }}>
              EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color={theme.textSub} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                style={{
                  width: '100%', padding: '14px 14px 14px 44px', fontSize: 15, fontWeight: 500,
                  background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 12, color: theme.text, outline: 'none', transition: 'all 0.3s'
                }}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: 8, fontSize: 13, fontWeight: 700, color: theme.text, letterSpacing: '0.03em' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color={theme.textSub} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input type={showPass ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} required
                style={{
                  width: '100%', padding: '14px 44px 14px 44px', fontSize: 15, fontWeight: 500,
                  background: theme.inputBg, border: `1.5px solid ${theme.inputBorder}`,
                  borderRadius: 12, color: theme.text, outline: 'none', transition: 'all 0.3s'
                }}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex'
                }}>
                {showPass ? <EyeOff size={18} color={theme.textSub} /> : <Eye size={18} color={theme.textSub} />}
              </button>
            </div>
          </div>

          {error && <ErrorBanner msg={error} />}

          <button type="submit" disabled={loading}
            style={{
              marginTop: 8, padding: '16px', fontSize: 15, fontWeight: 800, letterSpacing: '0.08em',
              textTransform: 'uppercase', color: '#fff', background: theme.accentGrad,
              border: 'none', borderRadius: 14, cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: `0 6px 24px ${theme.accentBg}`, transition: 'all 0.3s',
              opacity: loading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
            }}>
            {loading ? <Spinner fullPage={false} /> : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

/* ─── HOME PAGE WITH WEEKLY MENU ─────────────────────────────────────────────────────────────── */
function HomePage() {
  const t = useTheme()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [weeklyMenu, setWeeklyMenu] = useState([])
  const [expandedDay, setExpandedDay] = useState(null)
  const [loading, setLoading] = useState(true)
  const [feedbackRatings, setFeedbackRatings] = useState({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    // Load profile
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
    setProfile(profileData)

    // Get current week's Monday
    const today = new Date()
    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)
    const weekStart = monday.toISOString().split('T')[0]

    // Load weekly menu
    const { data: menuData } = await supabase
      .from('weekly_menu')
      .select('*')
      .eq('week_start_date', weekStart)
      .order('day_name')
      .order('meal_type')

    setWeeklyMenu(menuData || [])

    // Load user's feedback ratings
    if (menuData) {
      const menuIds = menuData.map(m => m.id)
      const { data: feedbackData } = await supabase
        .from('menu_feedback')
        .select('*')
        .eq('user_id', user.id)
        .in('menu_id', menuIds)

      const ratings = {}
      feedbackData?.forEach(f => {
        ratings[f.menu_id] = f.rating
      })
      setFeedbackRatings(ratings)
    }

    setLoading(false)
  }

  const handleFeedbackSubmit = async (menuId, rating) => {
    // Check if this meal is from today or past
    const meal = weeklyMenu.find(m => m.id === menuId)
    if (!meal) return

    const today = new Date().getDay() // 0 = Sunday, 1 = Monday, etc.
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDay = dayNames[today]

    // Only allow feedback for today and past days
    const dayOrder = {
      'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4,
      'Friday': 5, 'Saturday': 6, 'Sunday': 7
    }

    if (dayOrder[meal.day_name] > dayOrder[currentDay]) {
      alert('Feedback is locked for future days!')
      return
    }

    // Upsert feedback
    const { error } = await supabase
      .from('menu_feedback')
      .upsert({
        user_id: user.id,
        menu_id: menuId,
        rating: rating
      }, { onConflict: 'user_id,menu_id' })

    if (!error) {
      setFeedbackRatings({ ...feedbackRatings, [menuId]: rating })
      alert('Feedback submitted! Thank you.')
    }
  }

  if (loading) return <Spinner />

  const dayOrder = {
    'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4,
    'Friday': 5, 'Saturday': 6, 'Sunday': 7
  }

  const groupedByDay = weeklyMenu.reduce((acc, meal) => {
    if (!acc[meal.day_name]) acc[meal.day_name] = []
    acc[meal.day_name].push(meal)
    return acc
  }, {})

  const sortedDays = Object.keys(groupedByDay).sort((a, b) => dayOrder[a] - dayOrder[b])

  const todayDay = new Date().getDay()
  const dayNamesArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = dayNamesArr[todayDay]

  const filteredDays = sortedDays.filter(day => day !== 'Sunday')

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <div style={{ flex: 1, padding: '20px 20px 100px', background: t.bg }}>
      {/* Personalized Header */}
      <div style={{ marginBottom: 28, padding: '0 4px' }}>
        <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 700, color: t.textSub, opacity: 0.7, letterSpacing: '0.05em' }}>
          {greeting.toUpperCase()}
        </p>
        <h2 style={{ margin: 0, fontSize: 28, fontWeight: 900, color: t.text, letterSpacing: '-0.02em' }}>
          {profile?.full_name?.split(' ')[0] || 'Member'} <span style={{ color: t.accent }}>👋</span>
        </h2>
      </div>

      {/* Profile Summary Card */}
      {profile && (
        <div style={{
          background: t.cardActive || t.card, border: `1.5px solid ${t.borderActive || t.border}`,
          borderRadius: 24, padding: '24px', marginBottom: 32,
          display: 'flex', alignItems: 'center', gap: 20,
          boxShadow: `0 12px 32px ${t.accentBg}`, position: 'relative', overflow: 'hidden'
        }}>
          <div style={{
            width: 80, height: 80, borderRadius: '24px',
            background: profile.profile_pic_url ? `url(${profile.profile_pic_url})` : t.accentGrad,
            backgroundSize: 'cover', backgroundPosition: 'center',
            border: `3px solid rgba(255,255,255,0.2)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 900, color: '#fff', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }}>
            {!profile.profile_pic_url && (profile.full_name?.[0] || 'U')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: t.textSub, opacity: 0.6 }}>Thali Number</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: t.accent }}>#{profile.thali_number}</span>
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(0,0,0,0.05)', padding: '6px 12px', borderRadius: 10,
              fontSize: 12, fontWeight: 700, color: t.textSub
            }}>
              <Check size={14} color={t.accent} /> Active Member
            </div>
          </div>
          <div style={{
            position: 'absolute', right: -20, top: -20, width: 100, height: 100,
            background: t.accent, opacity: 0.05, borderRadius: '50%'
          }} />
        </div>
      )}

      {/* Weekly Menu */}
      <h2 style={{
        margin: '0 0 16px', fontSize: 22, fontWeight: 800, color: t.accent,
        textTransform: 'uppercase', letterSpacing: '0.05em'
      }}>
        Weekly Menu
      </h2>

      {filteredDays.map(day => {
        const meals = groupedByDay[day]
        const isExpanded = expandedDay === day
        const isToday = day === currentDay

        return (
          <div key={day} style={{ marginBottom: 16 }}>
            <div style={{
              background: t.card, border: `2px solid ${isExpanded ? t.accent : t.border}`,
              borderRadius: 20, overflow: 'hidden',
              boxShadow: isExpanded ? `0 8px 32px ${t.accentBg}` : '0 4px 16px rgba(0,0,0,0.04)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* Day Accordion Header */}
              <div
                onClick={() => setExpandedDay(isExpanded ? null : day)}
                style={{
                  padding: '20px 24px', background: isExpanded ? t.accentBg : 'transparent',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', borderBottom: isExpanded ? `1.5px solid ${t.border}` : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ 
                    width: 34, height: 34, borderRadius: 10, overflow: 'hidden', 
                    background: '#fff', display: 'flex', alignItems: 'center', 
                    justifyContent: 'center', border: `1.5px solid ${t.border}`,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}>
                    <img src="/al-mawaid.png" alt="" style={{ width: '82%', height: '82%', objectFit: 'contain' }} />
                  </div>
                  <h3 style={{
                    margin: 0, fontSize: 18, fontWeight: 800,
                    color: isExpanded ? t.accent : t.text
                  }}>
                    {day}
                  </h3>
                  {isToday && (
                    <span style={{
                      fontSize: 10, fontWeight: 800, color: '#fff',
                      background: t.accentGrad, padding: '4px 10px',
                      borderRadius: 8, boxShadow: `0 4px 12px ${t.accentBg}`
                    }}>
                      TODAY
                    </span>
                  )}
                </div>
                <div style={{
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s ease', display: 'flex'
                }}>
                  <ChevronDown size={20} color={t.textSub} />
                </div>
              </div>

              {/* Day Accordion Body (Meals) */}
              {isExpanded && (
                <div style={{
                  animation: 'fadeIn 0.4s ease',
                  background: t.bg === '#111111' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)'
                }}>
                  {meals.map((meal, idx) => (
                    <div key={meal.id} style={{
                      padding: '24px', borderBottom: idx === meals.length - 1 ? 'none' : `1px solid ${t.border}`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
                        <div style={{
                          background: t.accentBg, borderRadius: 12, padding: 10,
                          color: t.accent, display: 'flex'
                        }}>
                          <Utensils size={20} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 15, fontWeight: 800, color: t.text, marginBottom: 6 }}>
                            {meal.meal_type}
                          </div>
                          <div style={{ fontSize: 14, color: t.textSub, lineHeight: 1.6, fontWeight: 500 }}>
                            {meal.items}
                          </div>
                          {meal.special_notes && (
                            <div style={{
                              marginTop: 10, padding: '8px 12px', background: t.card,
                              borderRadius: 8, fontSize: 12, fontStyle: 'italic',
                              color: t.accent, opacity: 0.8, border: `1px dashed ${t.border}`
                            }}>
                              Note: {meal.special_notes}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Integrated Feedback System */}
                      <div style={{
                        marginTop: 20, paddingTop: 20, borderTop: `1.5px solid ${t.border}`,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12
                      }}>
                        <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Rate this food
                        </p>
                        <StarRating
                          rating={feedbackRatings[meal.id] || 0}
                          onChange={(r) => handleFeedbackSubmit(meal.id, r)}
                          theme={t}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )
      })}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
}


// ─── Survey Percentage Bar Component ──────────────────────────────────────
const QuantityBar = ({ value, onChange, theme }) => {
  const steps = [0, 25, 50, 100]
  return (
    <div style={{ width: '100%', padding: '10px 0' }}>
      <div style={{
        height: 8, background: theme.border, borderRadius: 10,
        position: 'relative', marginBottom: 16, display: 'flex', alignItems: 'center'
      }}>
        <div style={{
          position: 'absolute', height: '100%', background: theme.accentGrad,
          width: `${value}%`, borderRadius: 10, transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }} />
        {steps.map(s => (
          <button key={s}
            onClick={() => onChange(s)}
            style={{
              position: 'absolute', left: `calc(${s}% - 12px)`, width: 24, height: 24,
              borderRadius: '50%', background: value === s ? theme.card : '#fff',
              border: `3px solid ${value === s ? theme.accent : theme.border}`,
              cursor: 'pointer', zIndex: 2, transition: 'all 0.2s',
              boxShadow: value === s ? `0 0 12px ${theme.accentBg}` : 'none'
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
        {steps.map(s => (
          <span key={s} style={{
            fontSize: 10, fontWeight: 800, color: value === s ? theme.accent : theme.textSub,
            opacity: value === s ? 1 : 0.5
          }}>
            {s}%
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── SURVEY PAGE (Overhauled) ─────────────────────────────────────────────────────────────── */
function SurveyPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [weeklyMenu, setWeeklyMenu] = useState([])
  const [surveyResponses, setSurveyResponses] = useState({}) // { menu_id: { item_name: rating, roti: 'No' } }
  const [expandedMeal, setExpandedMeal] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    const today = new Date()
    const monday = getMondayOfWeek(today)
    const weekStart = monday.toISOString().split('T')[0]

    // Load menu
    const { data: menuData } = await supabase
      .from('weekly_menu')
      .select('*')
      .eq('week_start_date', weekStart)
      .order('day_name')

    const sortedMenu = (menuData || []).filter(m => m.day_name !== 'Sunday')
    setWeeklyMenu(sortedMenu)

    // Load existing response
    const { data: existingResponse } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('user_id', user.id)
      .eq('week_start_date', weekStart)
      .single()

    if (existingResponse) {
      setSurveyResponses(existingResponse.responses || {})
      setHasSubmitted(true)
    }

    setLoading(false)
  }

  const getMondayOfWeek = (date) => {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1)
    return new Date(d.setDate(diff))
  }

  const handleUpdateItemRating = (menuId, itemName, value) => {
    setSurveyResponses(prev => ({
      ...prev,
      [menuId]: {
        ...(prev[menuId] || {}),
        [itemName]: value
      }
    }))
  }

  const handleSubmitSurvey = async () => {
    setIsSubmitting(true)
    const monday = getMondayOfWeek(new Date())
    const weekStart = monday.toISOString().split('T')[0]

    const { error } = await supabase
      .from('survey_responses')
      .upsert({
        user_id: user.id,
        week_start_date: weekStart,
        responses: surveyResponses
      }, { onConflict: 'user_id,week_start_date' })

    setIsSubmitting(false)
    if (!error) {
      setHasSubmitted(true)
      setIsEditing(false)
    } else {
      alert('Error saving survey: ' + error.message)
    }
  }

  if (loading) return <Spinner />

  if (hasSubmitted && !isEditing) {
    return (
      <div style={{ flex: 1, padding: '20px 20px 100px', background: t.bg }}>
        <div style={{
          textAlign: 'center', marginBottom: 32, padding: '40px 20px',
          background: t.card, borderRadius: 32, border: `2px solid ${t.border}`,
          boxShadow: `0 20px 48px ${t.accentBg}`, animation: 'fadeInUp 0.6s ease'
        }}>
          <div style={{
            width: 80, height: 80, background: t.accentBg, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 20px', fontSize: 40, border: `2px solid ${t.accentBorder}`
          }}>
            ✅
          </div>
          <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 900, color: t.accent }}>Submission Successful</h2>
          <p style={{ margin: 0, fontSize: 14, color: t.textSub, fontWeight: 600, opacity: 0.7 }}>
            Your quantity responses for this week have been recorded.
          </p>
          <button onClick={() => setIsEditing(true)}
            style={{
              marginTop: 24, padding: '12px 24px', fontSize: 14, fontWeight: 800,
              color: t.accent, background: t.accentBg, border: `1.5px solid ${t.accentBorder}`,
              borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s',
              display: 'inline-flex', alignItems: 'center', gap: 8
            }}>
            <Palette size={18} /> Edit My Responses
          </button>
        </div>

        <h3 style={{
          margin: '0 0 20px', fontSize: 13, fontWeight: 800,
          color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.15em',
          display: 'flex', alignItems: 'center', gap: 10
        }}>
          <div style={{ height: 1.5, flex: 1, background: t.border }} />
          Your Submitted Data
          <div style={{ height: 1.5, flex: 1, background: t.border }} />
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sortedDays.map(day => {
            const meals = groupedMenu[day].filter(m => surveyResponses[m.id])
            if (meals.length === 0) return null
            return (
              <div key={day} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: t.text, opacity: 0.6, marginLeft: 4 }}>{day}</div>
                {meals.map(meal => {
                  const res = surveyResponses[meal.id]
                  return (
                    <div key={meal.id} style={{
                      background: t.card, border: `1.5px solid ${t.border}`,
                      borderRadius: 24, padding: '20px 24px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ color: t.accent }}>
                          {meal.meal_type.toLowerCase().includes('lunch') ? <Sun size={18} /> : <Moon size={18} />}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{meal.meal_type}</div>
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {Object.entries(res).map(([item, val]) => {
                          if (item.endsWith('_received')) return null
                          return (
                            <div key={item} style={{
                              padding: '10px 16px', background: t.bg, borderRadius: 14,
                              border: `1.5px solid ${t.border}`, flex: '1 1 calc(50% - 10px)',
                              minWidth: 140
                            }}>
                              <div style={{ fontSize: 11, fontWeight: 800, color: t.textSub, marginBottom: 4, textTransform: 'uppercase' }}>{item}</div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: 16, fontWeight: 900, color: t.accent }}>{val}%</span>
                                {res[`${item}_received`] && (
                                  <span style={{ 
                                    fontSize: 9, fontWeight: 900, padding: '3px 6px', 
                                    borderRadius: 6, background: res[`${item}_received`] === 'Yes' ? '#22c55e20' : '#ef444420',
                                    color: res[`${item}_received`] === 'Yes' ? '#10b981' : '#ef4444',
                                    border: `1px solid ${res[`${item}_received`] === 'Yes' ? '#10b98140' : '#ef444440'}`
                                  }}>
                                    {res[`${item}_received`] === 'Yes' ? 'RECEIVED' : 'NOT REC'}
                                  </span>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const dayOrder = { 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3, 'Thursday': 4, 'Friday': 5, 'Saturday': 6 }
  const groupedMenu = weeklyMenu.reduce((acc, m) => {
    if (!acc[m.day_name]) acc[m.day_name] = []
    acc[m.day_name].push(m)
    return acc
  }, {})
  const sortedDays = Object.keys(groupedMenu).sort((a, b) => dayOrder[a] - dayOrder[b])

  return (
    <div style={{ flex: 1, padding: '20px 20px 120px', background: t.bg }}>
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 900, color: t.accent, letterSpacing: '-0.02em' }}>Quantity Survey</h2>
        <p style={{ margin: 0, fontSize: 14, color: t.textSub, fontWeight: 600, opacity: 0.6 }}>Tell us how much you consumed of each item</p>
      </div>

      {sortedDays.map(day => (
        <div key={day} style={{ marginBottom: 32 }}>
          <h3 style={{
            margin: '0 0 16px', fontSize: 13, fontWeight: 800,
            color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.15em',
            paddingLeft: 4, opacity: 0.8
          }}>{day}</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {groupedMenu[day].map(meal => {
              const res = surveyResponses[meal.id] || {}
              const isExpanded = expandedMeal === meal.id

              const rawItems = meal.items.split(',').map(i => i.trim())
              // Prioritize Roti
              const items = [
                ...rawItems.filter(i => i.toLowerCase().includes('roti')),
                ...rawItems.filter(i => !i.toLowerCase().includes('roti'))
              ]

              return (
                <div key={meal.id} style={{
                  background: t.card, border: `1.5px solid ${isExpanded ? t.accent : t.border}`,
                  borderRadius: 24, overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isExpanded ? `0 12px 32px ${t.accentBg}` : 'none'
                }}>
                  <div
                    onClick={() => setExpandedMeal(isExpanded ? null : meal.id)}
                    style={{
                      padding: '20px 24px', cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14, background: t.accentBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: t.accent, fontSize: 22, boxShadow: `inset 0 0 0 1.5px ${t.accentBorder}`
                      }}>
                        {meal.meal_type.toLowerCase().includes('lunch') ? <Sun size={20} /> : <Moon size={20} />}
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 900, color: t.text }}>{meal.meal_type}</div>
                        <div style={{ fontSize: 12, color: t.accent, fontWeight: 800, opacity: 0.8 }}>
                          {Object.keys(res).length} items rated
                        </div>
                      </div>
                    </div>
                    <div style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease', color: t.textSub
                    }}>
                      <ChevronDown size={20} />
                    </div>
                  </div>

                  {isExpanded && (
                    <div style={{ padding: '0 24px 24px', animation: 'fadeIn 0.3s ease' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {items.map(itemName => (
                          <div key={itemName} style={{
                            padding: '16px', background: t.bg, borderRadius: 18,
                            border: `1.5px solid ${t.border}`, transition: 'all 0.2s'
                          }}>
                            <div style={{
                              fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 12,
                              display: 'flex', alignItems: 'center', gap: 8
                            }}>
                              {itemName.toLowerCase().includes('roti') && <span style={{ fontSize: 18 }}>🍞</span>}
                              {itemName}
                            </div>
                            <QuantityBar
                              value={res[itemName] || 0}
                              onChange={(v) => handleUpdateItemRating(meal.id, itemName, v)}
                              theme={t}
                            />
                            {itemName.toLowerCase().includes('roti') && (
                              <div style={{
                                marginTop: 12, display: 'flex', alignItems: 'center',
                                gap: 12, paddingTop: 12, borderTop: `1px dashed ${t.border}`
                              }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: t.textSub }}>RECEIVED?</span>
                                <div style={{ display: 'flex', gap: 6 }}>
                                  {['Yes', 'No'].map(opt => (
                                    <button key={opt}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        handleUpdateItemRating(meal.id, `${itemName}_received`, opt)
                                      }}
                                      style={{
                                        padding: '4px 12px', borderRadius: 8, fontSize: 11, fontWeight: 800,
                                        background: res[`${itemName}_received`] === opt ? t.accent : t.card,
                                        color: res[`${itemName}_received`] === opt ? '#fff' : t.textSub,
                                        border: `1px solid ${res[`${itemName}_received`] === opt ? t.accent : t.border}`
                                      }}
                                    >
                                      {opt}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div style={{ height: 100 }} /> {/* Spacer for fixed button */}
      
      <div style={{
        position: 'fixed', bottom: 90, left: 0, right: 0,
        padding: '20px 24px', background: `linear-gradient(0deg, ${t.bg} 80%, transparent)`,
        zIndex: 100
      }}>
        <button onClick={handleSubmitSurvey} disabled={isSubmitting}
          style={{
            width: '100%', padding: '20px', fontSize: 16, fontWeight: 900,
            color: '#fff', background: t.accentGrad, border: 'none',
            borderRadius: 20, cursor: isSubmitting ? 'not-allowed' : 'pointer', 
            boxShadow: `0 12px 32px ${t.accentBg}`,
            textTransform: 'uppercase', letterSpacing: '0.12em',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
            opacity: isSubmitting ? 0.8 : 1, transition: 'all 0.3s'
          }}>
          {isSubmitting ? (
            <div className="spin" style={{ width: 20, height: 20, border: '3px solid rgba(255,255,255,0.3)', borderTop: '3px solid #fff', borderRadius: '50%' }} />
          ) : (
            <Send size={20} strokeWidth={2.5} />
          )}
          {isSubmitting ? 'Saving...' : 'Save Survey Responses'}
        </button>
      </div>
    </div>
  )
}

/* ─── THALI REQUESTS PAGE (POSTS) ─────────────────────────────────────────────────────────────── */
function ThaliRequestsPage() {
  const t = useTheme()
  const { user, showToast } = useAuth()

  // Form state
  const [stopDates, setStopDates] = useState({ start: '', end: '' })
  const [resumeDates, setResumeDates] = useState({ start: '', end: '' })
  const [extra, setExtra] = useState({ qty: 1, start: '', end: '' })
  const [issue, setIssue] = useState({ message: '', media: null })
  const [loading, setLoading] = useState(false)

  const handleInsert = async (type, payload) => {
    setLoading(true)
    const { error } = await supabase.from('thali_requests').insert({
      user_id: user.id,
      thali_number: (await supabase.from('profiles').select('thali_number').eq('id', user.id).single()).data?.thali_number,
      request_type: type,
      ...payload
    })
    setLoading(false)
    if (error) {
      showToast(error.message, 'error')
    } else {
      showToast('Request submitted')
      // reset relevant fields
      if (type === 'stop') setStopDates({ start: '', end: '' })
      if (type === 'resume') setResumeDates({ start: '', end: '' })
      if (type === 'extra') setExtra({ qty: 1, start: '', end: '' })
      if (type === 'issue') setIssue({ message: '', media: null })
    }
  }

  const uploadMedia = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const { data, error } = await supabase.storage.from('thali_media').upload(fileName, file)
    if (error) throw error
    const { publicURL } = supabase.storage.from('thali_media').getPublicUrl(fileName)
    return publicURL
  }

  const submitIssue = async () => {
    let mediaUrl = null
    if (issue.media) {
      try { mediaUrl = await uploadMedia(issue.media) } catch (e) { showToast(e.message, 'error'); return }
    }
    await handleInsert('issue', { message: issue.message, media_url: mediaUrl })
  }

  return (
    <div style={{ flex: 1, padding: '20px 20px 120px', background: t.bg }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 900, color: t.text }}>Thali Requests</h2>

      {/* Stop Thali */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: t.textSub }}>Stop Thali</h3>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <input type="date" value={stopDates.start} onChange={e => setStopDates({ ...stopDates, start: e.target.value })} style={{ flex: 1, ...inputStyle(t) }} />
          <input type="date" value={stopDates.end} onChange={e => setStopDates({ ...stopDates, end: e.target.value })} style={{ flex: 1, ...inputStyle(t) }} />
        </div>
        <button onClick={() => handleInsert('stop', { start_date: stopDates.start, end_date: stopDates.end })} disabled={loading} style={primaryBtn(t)}>{loading ? 'Saving...' : 'Submit Stop'}</button>
      </section>

      {/* Resume Thali */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: t.textSub }}>Resume Thali</h3>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <input type="date" value={resumeDates.start} onChange={e => setResumeDates({ ...resumeDates, start: e.target.value })} style={{ flex: 1, ...inputStyle(t) }} />
          <input type="date" value={resumeDates.end} onChange={e => setResumeDates({ ...resumeDates, end: e.target.value })} style={{ flex: 1, ...inputStyle(t) }} />
        </div>
        <button onClick={() => handleInsert('resume', { start_date: resumeDates.start, end_date: resumeDates.end })} disabled={loading} style={primaryBtn(t)}>{loading ? 'Saving...' : 'Submit Resume'}</button>
      </section>

      {/* Extra Food */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: t.textSub }}>Extra Food</h3>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          <select value={extra.qty} onChange={e => setExtra({ ...extra, qty: Number(e.target.value) })} style={inputStyle(t)}>
            {[1,2,3,4].map(n => (<option key={n} value={n}>{n} portion{n>1?'s':''}</option>))}
          </select>
          <input type="date" value={extra.start} onChange={e => setExtra({ ...extra, start: e.target.value })} style={{ flex: 1, ...inputStyle(t) }} />
          <input type="date" value={extra.end} onChange={e => setExtra({ ...extra, end: e.target.value })} style={{ flex: 1, ...inputStyle(t) }} />
        </div>
        <button onClick={() => handleInsert('extra', { quantity: extra.qty, start_date: extra.start, end_date: extra.end })} disabled={loading} style={primaryBtn(t)}>{loading ? 'Saving...' : 'Submit Extra Food'}</button>
      </section>

      {/* Report Issue */}
      <section style={{ marginBottom: 28 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: t.textSub }}>Report Issue</h3>
        <textarea placeholder="Describe the issue..." value={issue.message} onChange={e => setIssue({ ...issue, message: e.target.value })} style={{ width: '100%', minHeight: 80, marginTop: 8, ...inputStyle(t) }} />
        <input type="file" accept="image/*,video/*" onChange={e => setIssue({ ...issue, media: e.target.files[0] })} style={{ marginTop: 8 }} />
        <button onClick={submitIssue} disabled={loading} style={primaryBtn(t)}>{loading ? 'Saving...' : 'Submit Issue'}</button>
      </section>
    </div>
  )
}

// Helper styles used in the request page
const inputStyle = (t) => ({
  background: t.inputBg, border: `1.5px solid ${t.inputBorder}`,
  borderRadius: 8, padding: '8px 12px', color: t.text, fontSize: 14, outline: 'none'
})

const primaryBtn = (t) => ({
  marginTop: 8,
  padding: '10px 16px',
  background: t.accentGrad,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  cursor: 'pointer',
  fontWeight: 600
})

      /* ─── PROFILE PAGE WITH LOGOUT ─────────────────────────────────────────────────────────────────── */
      function ProfilePage() {
  const t = useTheme()
      const {user, signOut} = useAuth()
      const [profile, setProfile] = useState(null)
      const [loading, setLoading] = useState(true)

  useEffect(() => {
        loadProfile()
      }, [])

  const loadProfile = async () => {
    const {data} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      setProfile(data)
      setLoading(false)
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
        await signOut()
      }
  }

      if (loading) return <Spinner />

      return (
      <div style={{ flex: 1, padding: '20px 20px 100px', background: t.bg }}>
        {/* Profile Card */}
        {profile && (
          <div style={{
            background: t.card, border: `2px solid ${t.border}`,
            borderRadius: 20, padding: 32, marginBottom: 24, textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: profile.profile_pic_url ? `url(${profile.profile_pic_url})` : t.accentGrad,
              backgroundSize: 'cover', backgroundPosition: 'center',
              border: `4px solid ${t.accent}`, margin: '0 auto 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 40, fontWeight: 900, color: '#fff'
            }}>
              {!profile.profile_pic_url && (profile.full_name?.[0] || 'U')}
            </div>

            <h2 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 800, color: t.text }}>
              {profile.full_name}
            </h2>
            <p style={{ margin: '0 0 16px', fontSize: 14, color: t.textSub }}>
              {profile.email}
            </p>
            <div style={{
              display: 'inline-block', background: t.accentBg,
              border: `2px solid ${t.accentBorder}`, borderRadius: 10,
              padding: '8px 16px', fontSize: 15, fontWeight: 800,
              color: t.accent, letterSpacing: '0.05em'
            }}>
              Thali #{profile.thali_number}
            </div>
          </div>
        )}

        {/* Profile Details */}
        <div style={{
          background: t.card, border: `2px solid ${t.border}`,
          borderRadius: 16, overflow: 'hidden', marginBottom: 24
        }}>
          {profile?.phone && (
            <div style={{
              padding: '16px 20px', borderBottom: `1px solid ${t.border}`,
              display: 'flex', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.textSub }}>Phone</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{profile.phone}</span>
            </div>
          )}
          {profile?.address && (
            <div style={{
              padding: '16px 20px', borderBottom: `1px solid ${t.border}`,
              display: 'flex', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.textSub }}>Address</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text, textAlign: 'right' }}>
                {profile.address}
              </span>
            </div>
          )}
          {profile?.city && (
            <div style={{
              padding: '16px 20px',
              display: 'flex', justifyContent: 'space-between'
            }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: t.textSub }}>City</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: t.text }}>{profile.city}, {profile.state}</span>
            </div>
          )}
        </div>

        {/* General Section */}
        <h3 style={{
          margin: '0 0 16px', fontSize: 14, fontWeight: 700,
          color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.08em'
        }}>
          General
        </h3>
        <div style={{
          background: t.card, border: `2px solid ${t.border}`,
          borderRadius: 16, overflow: 'hidden', marginBottom: 24
        }}>
          <button style={{
            width: '100%', padding: '18px 20px', background: 'none',
            border: 'none', borderBottom: `1px solid ${t.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Survey Data</span>
            <ChevronRight size={20} color={t.textSub} />
          </button>
          <button style={{
            width: '100%', padding: '18px 20px', background: 'none',
            border: 'none', borderBottom: `1px solid ${t.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Your Requests</span>
            <ChevronRight size={20} color={t.textSub} />
          </button>
          <button style={{
            width: '100%', padding: '18px 20px', background: 'none',
            border: 'none', borderBottom: `1px solid ${t.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Khidmat Guzar List</span>
            <ChevronRight size={20} color={t.textSub} />
          </button>
          <button style={{
            width: '100%', padding: '18px 20px', background: 'none',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>About us</span>
            <ChevronRight size={20} color={t.textSub} />
          </button>
        </div>

        {/* Support Section */}
        <h3 style={{
          margin: '0 0 16px', fontSize: 14, fontWeight: 700,
          color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.08em'
        }}>
          Support
        </h3>
        <div style={{
          background: t.card, border: `2px solid ${t.border}`,
          borderRadius: 16, overflow: 'hidden', marginBottom: 24
        }}>
          <button style={{
            width: '100%', padding: '18px 20px', background: 'none',
            border: 'none', borderBottom: `1px solid ${t.border}`,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Contact us</span>
            <ChevronRight size={20} color={t.textSub} />
          </button>
          <button style={{
            width: '100%', padding: '18px 20px', background: 'none',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Support ticket</span>
            <ChevronRight size={20} color={t.textSub} />
          </button>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout}
          style={{
            width: '100%', padding: 18, fontSize: 15, fontWeight: 800,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#fff', background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            border: 'none', borderRadius: 14, cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(239,68,68,0.3)',
            transition: 'all 0.3s', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10
          }}>
          <LogOut size={20} />
          Log Out
        </button>
      </div>
      )
}

      /* ─── MAIN APP ─────────────────────────────────────────────────────────────────── */
      export default function App() {
  const [session, setSession] = useState(undefined)
      const [activeTab, setActiveTab] = useState('home')
      const [themeId, setThemeId] = useState(getSavedThemeId())
const theme = THEMES[themeId]
  // Toast state for global feedback
  const [toastInfo, setToastInfo] = useState(null)
  const showToast = (msg, type = 'success') => {
    setToastInfo({msg, type})
    setTimeout(() => setToastInfo(null), 4000)
  }

  useEffect(() => {
        saveThemeId(themeId)
      }, [themeId])

  useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const {data: {subscription} } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
        await supabase.auth.signOut()
      }

      const tabs = [
      {id: 'home', label: 'Home', Icon: Home },
      {id: 'survey', label: 'Survey', Icon: ClipboardList },
      {id: 'thali', label: 'Post', Icon: FileText },
      {id: 'profile', label: 'Profile', Icon: User },
      ]

      const pageTitles = {
        home: {en: 'Al-Mawaid', sub: 'Weekly Menu & Feedback' },
      survey: {en: 'Weekly Survey', sub: 'Share your feedback' },
      thali: {en: 'Posts', sub: 'Latest Updates' },
      profile: {en: 'My Profile', sub: 'Member details' },
  }
      const title = pageTitles[activeTab]

      if (session === undefined) {
    return (
      <div style={{
        minHeight: '100vh', background: theme.bgGrad,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', -apple-system, sans-serif"
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div className="spin" style={{
            width: 44, height: 44,
            border: `3px solid ${theme.spinnerBorder}`,
            borderTop: `3px solid ${theme.spinnerTop}`, borderRadius: '50%'
          }} />
          <p style={{ margin: 0, fontSize: 14, color: theme.textSub, opacity: 0.6, fontWeight: 600 }}>Loading…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .85s linear infinite}body{margin:0;font-family:'Inter',-apple-system,sans-serif}`}</style>
      </div>
      )
  }

      if (!session) return <LoginPage themeId={themeId} setThemeId={setThemeId} />

      return (
      <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
        <AuthCtx.Provider value={authValue}>
            {/* Toast handling */}
            {(() => {
              const [toastInfo, setToastInfo] = useState(null)
              const showToast = (msg, type = 'success') => {
                setToastInfo({msg, type})
                setTimeout(() => setToastInfo(null), 4000)
              }
              // Expose showToast via a custom attribute on AuthCtx for children to consume
              const authValue = { user: session.user, signOut, showToast }
              return (
                <AuthCtx.Provider value={authValue}>
                  {/* Toast UI */}
                  {toastInfo && <Toast {...toastInfo} />}
                </AuthCtx.Provider>
              )
            })() }
          <div style={{
            fontFamily: "'Inter', -apple-system, sans-serif",
            minHeight: '100vh', background: theme.bg, color: theme.text,
            display: 'flex', flexDirection: 'column',
            transition: 'background 0.4s ease, color 0.4s ease'
          }}>

            {/* Theme Switcher only on Profile */}
            {activeTab === 'profile' && <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={theme} />}

            {/* HEADER */}
            <header style={{
              position: 'relative', overflow: 'hidden',
              background: theme.bgGrad, padding: '24px 20px 0',
              transition: 'background 0.4s ease'
            }}>
              <GeoBg t={theme} />

              <div style={{
                position: 'relative', zIndex: 1, display: 'flex',
                justifyContent: 'space-between', alignItems: 'center', marginBottom: 16
              }}>
                <div />

                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  color: theme.textSub, opacity: 0.8
                }}>
                  <img src="/logo.png" alt="" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>
                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>

              {activeTab === 'home' && (
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 10 }}>
                  <p style={{
                    fontFamily: "'Amiri', serif", fontSize: 20, letterSpacing: '0.08em',
                    color: theme.accent, margin: 0, fontWeight: 700
                  }}>
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                  </p>
                </div>
              )}

              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 14 }}>
                {activeTab === 'home' && (
                  <p style={{
                    fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase',
                    color: theme.textSub, opacity: 0.5, margin: '0 0 4px', fontWeight: 700
                  }}>Welcome to</p>
                )}
                <h1 style={{
                  margin: 0, fontSize: activeTab === 'home' ? 38 : 28,
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.03em',
                  lineHeight: 1.1, color: theme.accent, textShadow: `0 0 24px ${theme.accentBg}`
                }}>
                  {title.en}
                </h1>
                <p style={{
                  margin: '4px 0 0', fontSize: 12, letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: theme.textSub, opacity: 0.5, fontWeight: 700
                }}>{title.sub}</p>
              </div>

              <svg style={{ display: 'block', position: 'relative', zIndex: 1 }}
                width="100%" viewBox="0 0 1440 48" preserveAspectRatio="none">
                <path d="M0,16 C200,48 400,0 600,24 C800,48 1000,6 1200,28 C1320,42 1400,16 1440,22 L1440,48 L0,48 Z"
                  fill={theme.bg} />
              </svg>
            </header>

            {activeTab === 'home' && <HomePage />}
            {activeTab === 'survey' && <SurveyPage />}
            {activeTab === 'thali' && <ThaliRequestsPage />}
            {activeTab === 'profile' && <ProfilePage />}

            {/* Bottom nav */}
            <nav style={{
              position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
              display: 'flex', justifyContent: 'space-around', alignItems: 'center',
              padding: '12px 10px 24px', background: theme.navBg || theme.card,
              borderTop: `2px solid ${theme.navBorder || theme.border}`,
              boxShadow: '0 -8px 36px rgba(0,0,0,0.12)',
              transition: 'background 0.4s ease'
            }}>
              {tabs.map(({ id, label, Icon }) => {
                const active = activeTab === id
                return (
                  <button key={id} onClick={() => setActiveTab(id)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      gap: 4, padding: '8px 16px', position: 'relative',
                      WebkitTapHighlightColor: 'transparent'
                    }}>
                    {active && (
                      <div style={{
                        position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                        width: 36, height: 4, borderRadius: 8, background: theme.accent,
                        boxShadow: `0 0 14px ${theme.accentBg}`
                      }} />
                    )}
                    <Icon size={22} color={active ? theme.accent : theme.textSub} strokeWidth={active ? 2.5 : 2} />
                    <span style={{
                      fontSize: 10, fontWeight: active ? 800 : 600, letterSpacing: '0.02em',
                      color: active ? theme.accent : theme.textSub, opacity: active ? 1 : 0.7
                    }}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </nav>


            <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Amiri:wght@400;700&display=swap');
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.85s linear infinite; }
            @keyframes fadeInDown {
              from { opacity:0; transform:translateY(-10px) }
              to   { opacity:1; transform:translateY(0) }
            }
            @keyframes fadeInUp {
              from { opacity:0; transform:translateY(10px) }
              to   { opacity:1; transform:translateY(0) }
            }
            @keyframes fadeIn {
              from { opacity:0 }
              to   { opacity:1 }
            }
            * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
{toastInfo && <Toast {...toastInfo} />}
            body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; }
          `}</style>
          </div>
        </AuthCtx.Provider>
      </ThemeCtx.Provider>
      )
}