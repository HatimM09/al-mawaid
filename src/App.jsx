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
  const t = useTheme()
  // Provide complete fallback theme if context is not available
  const bg = type === 'error' 
    ? (t?.accent || '#ef4444') 
    : (t?.accent || '#22c55e')
  const text = '#fff'
  return (
    <div style={{
      position: 'fixed', top: 20, right: 20, zIndex: 2000,
      background: bg, color: text,
      padding: '12px 20px', borderRadius: 8,
      boxShadow: `0 4px 12px ${bg}80`,
      fontSize: 14, fontWeight: 600,
      animation: 'fadeInDown 0.3s ease'
    }}>
      {msg}
    </div>
  )
}

const useToast = () => {
  const [toastInfo, setToastInfo] = useState(null)
  const showToast = useCallback((msg, type='success') => {
    setToastInfo({msg,type})
    setTimeout(() => setToastInfo(null), 4000)
  }, [])
  const ToastUI = toastInfo ? <Toast {...toastInfo} /> : null
  return { showToast, ToastUI }
}

const AuthCtx = createContext(null)
const useAuth = () => useContext(AuthCtx)

function LoadingOverlay({ theme }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 3000,
      background: theme.bg, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 20
    }}>
      <div style={{
        width: 48, height: 48,
        border: `4px solid ${theme.spinnerBorder}`,
        borderTop: `4px solid ${theme.spinnerTop}`,
        borderRadius: '50%'
      }} className="spin" />
      <p style={{ fontSize: 13, fontWeight: 600, color: theme.textSub }}>
        Loading your experience...
      </p>
    </div>
  )
}

function GeoBg({ t }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, opacity: 0.35 }}>
      {Array.from({ length: 30 }, (_, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
          width: `${20 + Math.random() * 30}px`, height: `${20 + Math.random() * 30}px`,
          background: t.geo, borderRadius: '50%', pointerEvents: 'none',
          animation: `fadeIn ${1 + Math.random() * 2}s ease infinite alternate`,
          opacity: 0.4 + Math.random() * 0.6
        }} />
      ))}
    </div>
  )
}

// ===== DUMMY PAGES (fill in real components) =====
const title = { en: 'AL-MAWAID', sub: 'CHURU' }
const tabs = [
  { id: 'home', label: 'Home', Icon: Home },
  { id: 'survey', label: 'Survey', Icon: ClipboardList },
  { id: 'thali', label: 'Thali', Icon: Utensils },
  { id: 'profile', label: 'Profile', Icon: User },
]

function HomePage() {
  const theme = useTheme()
  return (
    <div style={{ flex: 1, padding: 20 }}>
      <div style={{ background: theme.card, padding: 20, borderRadius: 12, border: `1px solid ${theme.border}` }}>
        <h2 style={{ color: theme.accent, margin: '0 0 12px' }}>Welcome Home</h2>
        <p style={{ color: theme.textBody, margin: 0 }}>
          Your main dashboard content goes here.
        </p>
      </div>
    </div>
  )
}

function SurveyPage() {
  const theme = useTheme()
  return (
    <div style={{ flex: 1, padding: 20 }}>
      <div style={{ background: theme.card, padding: 20, borderRadius: 12, border: `1px solid ${theme.border}` }}>
        <h2 style={{ color: theme.accent, margin: '0 0 12px' }}>Survey</h2>
        <p style={{ color: theme.textBody, margin: 0 }}>
          Submit your feedback and surveys here.
        </p>
      </div>
    </div>
  )
}

function ThaliRequestsPage() {
  const theme = useTheme()
  return (
    <div style={{ flex: 1, padding: 20 }}>
      <div style={{ background: theme.card, padding: 20, borderRadius: 12, border: `1px solid ${theme.border}` }}>
        <h2 style={{ color: theme.accent, margin: '0 0 12px' }}>Thali Requests</h2>
        <p style={{ color: theme.textBody, margin: 0 }}>
          Manage your thali requests here.
        </p>
      </div>
    </div>
  )
}

function ProfilePage() {
  const theme = useTheme()
  const { user, signOut } = useAuth()
  
  return (
    <div style={{ flex: 1, padding: 20, paddingBottom: 100 }}>
      <div style={{ background: theme.card, padding: 20, borderRadius: 12, border: `1px solid ${theme.border}`, marginBottom: 16 }}>
        <h2 style={{ color: theme.accent, margin: '0 0 12px' }}>Profile</h2>
        <p style={{ color: theme.textBody, margin: '0 0 16px' }}>
          {user?.email || 'Not logged in'}
        </p>
        <button
          onClick={signOut}
          style={{
            background: theme.accentGrad,
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 8,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <LogOut size={16} style={{ marginRight: 8, display: 'inline-block', verticalAlign: 'middle' }} />
          Sign Out
        </button>
      </div>
    </div>
  )
}

function ThemeSwitcher({ themeId, setThemeId, theme }) {
  return (
    <div style={{
      position: 'fixed', top: 80, right: 20, zIndex: 1000,
      background: theme.card, padding: 16, borderRadius: 12,
      border: `1px solid ${theme.border}`,
      boxShadow: `0 4px 24px ${theme.border}`,
      display: 'flex', flexDirection: 'column', gap: 8
    }}>
      <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: theme.textSub, textTransform: 'uppercase' }}>
        Choose Theme
      </p>
      {Object.values(THEMES).map(t => (
        <button
          key={t.id}
          onClick={() => setThemeId(t.id)}
          style={{
            background: themeId === t.id ? theme.accentBg : 'transparent',
            border: `2px solid ${themeId === t.id ? theme.accent : theme.border}`,
            padding: '8px 12px',
            borderRadius: 8,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s',
            fontWeight: themeId === t.id ? 700 : 500,
            color: themeId === t.id ? theme.accent : theme.textSub
          }}
        >
          <span style={{ fontSize: 18 }}>{t.emoji}</span>
          <span style={{ fontSize: 12 }}>{t.label}</span>
        </button>
      ))}
    </div>
  )
}

// ===== LOGIN / AUTH =====
function LoginScreen({ onLogin, theme }) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setLoading(true)
    try {
      if (isLogin) {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) throw err
      } else {
        const { error: err } = await supabase.auth.signUp({ email, password })
        if (err) throw err
        alert('Check your email for confirmation!')
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bgGrad,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <GeoBg t={theme} />
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: theme.loginCard,
        padding: 32,
        borderRadius: 16,
        border: `1px solid ${theme.border}`,
        maxWidth: 400,
        width: '100%',
        boxShadow: `0 8px 32px ${theme.border}`
      }}>
        <h1 style={{
          margin: '0 0 8px',
          fontSize: 32,
          fontWeight: 900,
          color: theme.accent,
          textAlign: 'center'
        }}>
          {title.en}
        </h1>
        <p style={{
          margin: '0 0 24px',
          fontSize: 12,
          color: theme.textSub,
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          {title.sub}
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 600, color: theme.textSub }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              border: `1px solid ${theme.inputBorder}`,
              borderRadius: 8,
              background: theme.inputBg,
              fontSize: 14,
              color: theme.text
            }}
            placeholder="you@example.com"
          />
        </div>

        <div style={{ marginBottom: 16, position: 'relative' }}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 12, fontWeight: 600, color: theme.textSub }}>
            Password
          </label>
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: 12,
              paddingRight: 40,
              border: `1px solid ${theme.inputBorder}`,
              borderRadius: 8,
              background: theme.inputBg,
              fontSize: 14,
              color: theme.text
            }}
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{
              position: 'absolute',
              right: 12,
              top: 38,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4
            }}
          >
            {showPass ? <EyeOff size={18} color={theme.textSub} /> : <Eye size={18} color={theme.textSub} />}
          </button>
        </div>

        {error && (
          <div style={{
            marginBottom: 16,
            padding: 12,
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: 8,
            fontSize: 12,
            color: '#c00',
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%',
            padding: 14,
            background: theme.accentGrad,
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 700,
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1,
            marginBottom: 16
          }}
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            width: '100%',
            padding: 12,
            background: 'transparent',
            color: theme.accent,
            border: `1px solid ${theme.border}`,
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  )
}

// ===== MAIN APP =====
export default function App() {
  const [themeId, setThemeId] = useState(getSavedThemeId())
  const theme = THEMES[themeId]
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('home')
  const { showToast, ToastUI } = useToast()

  useEffect(() => {
    saveThemeId(themeId)
  }, [themeId])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    await supabase.auth.signOut()
    showToast('Signed out successfully')
  }

  if (loading) {
    return (
      <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
        <LoadingOverlay theme={theme} />
      </ThemeCtx.Provider>
    )
  }

  if (!session) {
    return (
      <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
        <LoginScreen onLogin={() => {}} theme={theme} />
      </ThemeCtx.Provider>
    )
  }

  const authValue = { user: session.user, signOut, showToast }

  return (
    <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
      <AuthCtx.Provider value={authValue}>
        {/* Toast UI */}
        {ToastUI}
        
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
            body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
