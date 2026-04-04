// src/App.jsx — Al-Mawaid Enhanced
// ✨ 5 Premium Themes | Survey Integration (ROW FORMAT) | Profile Lock | Supabase | Feedback
import React, { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import {
  Home, FileText, Info, X, Sun, Moon, User, ClipboardList,
  Star, Send, Bell, Palette, Check, LogOut,
  Mail, Lock, Eye, EyeOff, AlertCircle, ChevronDown, ArrowLeft,
  MessageSquare, MessageCircle
} from 'lucide-react'
import { createClient } from '@supabase/supabase-js'

// ─── Supabase connection ──────────────────────────────────────
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars.')
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
    rowItemBg: '#fff', rowItemBorder: 'rgba(180,140,60,0.15)', rowItemAccent: '#b48c3c',
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
    rowItemBg: '#1e1e1e', rowItemBorder: 'rgba(232,197,71,0.15)', rowItemAccent: '#e8c547',
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
    rowItemBg: '#fff', rowItemBorder: 'rgba(14,116,120,0.15)', rowItemAccent: '#0e7478',
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
    rowItemBg: '#fff', rowItemBorder: 'rgba(128,30,40,0.15)', rowItemAccent: '#801e28',
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
    rowItemBg: '#fff', rowItemBorder: 'rgba(70,110,70,0.15)', rowItemAccent: '#466e46',
  },
}

function getSavedThemeId() { try { return localStorage.getItem('al-mawaid-theme') || 'ivory' } catch { return 'ivory' } }
function saveThemeId(id) { try { localStorage.setItem('al-mawaid-theme', id) } catch { } }

const ThemeCtx = createContext(null)
const useTheme = () => useContext(ThemeCtx)
const AuthCtx = createContext(null)
const useAuth = () => useContext(AuthCtx)

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

function StarRating({ value, onChange, size = 36 }) {
  const t = useTheme()
  const [hov, setHov] = useState(null)
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {[1, 2, 3, 4, 5].map(s => {
        const on = s <= (hov ?? value ?? 0)
        return (
          <button key={s} onClick={() => onChange(s)}
            onMouseEnter={() => setHov(s)} onMouseLeave={() => setHov(null)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              transform: on ? 'scale(1.2)' : 'scale(1)', transition: 'all 0.2s ease',
              filter: on ? 'drop-shadow(0 0 8px currentColor)' : 'none'
            }}>
            <Star size={size} fill={on ? t.accent : 'none'} color={on ? t.accent : t.border} strokeWidth={1.8} />
          </button>
        )
      })}
    </div>
  )
}

function FeedbackModal({ onClose, menuId, memberNo, todayName, t }) {
  const [rating, setRating] = useState(null)
  const [mealType, setMealType] = useState('general')
  const [comment, setComment] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState(null)
  const [done, setDone] = useState(false)

  async function handleSubmit() {
    if (!rating) { setSaveErr('Please select a star rating.'); return }
    setSaving(true); setSaveErr(null)
    const { error } = await supabase.from('feedback').insert({
      member_no: memberNo,
      menu_id: menuId,
      meal_type: mealType,
      rating,
      comment: comment.trim() || null,
    })
    setSaving(false)
    if (error) { setSaveErr(error.message); return }
    setDone(true)
    setTimeout(onClose, 1800)
  }

  const mealOptions = [
    { value: 'general', label: 'Overall', emoji: '🍽️' },
    { value: 'lunch', label: 'Lunch', emoji: '☀️' },
    { value: 'dinner', label: 'Dinner', emoji: '🌙' },
  ]

  return (
    <div onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: t.popupBg, backdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.2s ease'
      }}>
      <div onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 400, borderRadius: 28, padding: '28px 24px',
          position: 'relative', background: t.card,
          border: `2px solid ${t.accentBorder}`,
          boxShadow: '0 28px 90px rgba(0,0,0,0.35)',
          animation: 'fadeInUp 0.3s ease'
        }}>
        <button onClick={onClose}
          style={{
            position: 'absolute', top: 18, right: 18, background: 'none',
            border: 'none', cursor: 'pointer', color: t.textSub,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: '50%', transition: 'background 0.2s'
          }}>
          <X size={20} />
        </button>

        {done ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <h3 style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 900, color: t.text }}>Thank you!</h3>
            <p style={{ margin: 0, fontSize: 14, color: t.textSub, fontWeight: 500 }}>Your feedback has been recorded.</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 14, background: t.accentBg,
                border: `2px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <MessageCircle size={22} color={t.accent} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.85 }}>Feedback</p>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 900, color: t.text }}>{todayName}'s Meal</p>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: '0 0 10px', fontSize: 12, fontWeight: 800, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.9 }}>What are you rating?</p>
              <div style={{ display: 'flex', gap: 8 }}>
                {mealOptions.map(opt => (
                  <button key={opt.value} onClick={() => setMealType(opt.value)}
                    style={{
                      flex: 1, padding: '10px 6px', borderRadius: 14, cursor: 'pointer',
                      border: `2px solid ${mealType === opt.value ? t.accentBorder : t.border}`,
                      background: mealType === opt.value ? t.accentBg : 'transparent',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all 0.2s'
                    }}>
                    <span style={{ fontSize: 18 }}>{opt.emoji}</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: mealType === opt.value ? t.accent : t.textSub }}>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 800, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.9, textAlign: 'center' }}>Your Rating</p>
              <StarRating value={rating} onChange={setRating} size={40} />
              {rating && (
                <p style={{ textAlign: 'center', margin: '8px 0 0', fontSize: 13, fontWeight: 700, color: t.textSub, opacity: 0.8 }}>
                  {['', '😞 Poor', '😕 Fair', '😊 Good', '😄 Great', '🤩 Excellent!'][rating]}
                </p>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 800, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.9 }}>Comments (optional)</p>
              <textarea
                value={comment}
                onChange={e => { setComment(e.target.value); setSaveErr(null) }}
                placeholder="Tell us more about your experience…"
                rows={3}
                style={{
                  width: '100%', boxSizing: 'border-box', resize: 'vertical',
                  background: t.inputBg, border: `1.5px solid ${t.inputBorder}`,
                  borderRadius: 14, color: t.text, fontSize: 14, padding: '12px 14px',
                  outline: 'none', fontFamily: "'Inter', -apple-system, sans-serif",
                  fontWeight: 500, lineHeight: 1.5, minHeight: 80, transition: 'border-color 0.25s'
                }}
                onFocus={e => e.target.style.borderColor = t.accent}
                onBlur={e => e.target.style.borderColor = t.inputBorder}
              />
            </div>

            {saveErr && <ErrorBanner msg={saveErr} />}

            <button onClick={handleSubmit} disabled={saving}
              style={{
                width: '100%', padding: '15px', borderRadius: 18, border: 'none',
                cursor: saving ? 'wait' : 'pointer',
                background: saving ? t.accentBg : t.accentGrad,
                color: saving ? t.accent : '#fff',
                fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.08em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: saving ? 'none' : `0 10px 32px ${t.accentBg}`, transition: 'all 0.25s'
              }}>
              {saving
                ? <><div className="spin" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: `2px solid ${t.accent}`, borderRadius: '50%' }} /> Submitting…</>
                : <><Send size={16} /> Submit Feedback</>
              }
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function ThemeSwitcher({ themeId, setThemeId, theme: t }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'fixed', bottom: 90, right: 16, zIndex: 200 }}>
      <button onClick={() => setOpen(o => !o)} title="Switch Theme"
        style={{
          width: 50, height: 50, borderRadius: '50%', border: `2px solid ${t.accentBorder}`,
          background: t.accentBg, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(12px)', boxShadow: `0 6px 24px ${t.accentBg}`, transition: 'all 0.3s ease'
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
            <p style={{ margin: '0 6px 6px', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: t.textSub, opacity: 0.7 }}>THEMES</p>
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

/* ═══════════════════════════════════════
   LOGIN PAGE
═══════════════════════════════════════ */
function LoginPage({ themeId, setThemeId }) {
  const t = THEMES[themeId] || THEMES.ivory
  const [email, setEmail] = useState(() => { try { return localStorage.getItem('al-mawaid-email') || '' } catch { return '' } })
  const [password, setPassword] = useState(() => { try { return localStorage.getItem('al-mawaid-pass') || '' } catch { return '' } })
  const [showPass, setShowPass] = useState(false)
  const [remember, setRemember] = useState(() => { try { return !!localStorage.getItem('al-mawaid-email') } catch { return false } })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleLogin(e) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter both email and password.'); return }
    setLoading(true); setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    setLoading(false)
    if (err) { setError(err.message); return }
    if (remember) {
      try { localStorage.setItem('al-mawaid-email', email.trim()); localStorage.setItem('al-mawaid-pass', password) } catch { }
    } else {
      try { localStorage.removeItem('al-mawaid-email'); localStorage.removeItem('al-mawaid-pass') } catch { }
    }
  }

  const inp = {
    width: '100%', boxSizing: 'border-box',
    background: t.inputBg, border: `1.5px solid ${t.inputBorder}`,
    borderRadius: 16, color: t.loginText, fontSize: 15, padding: '15px 18px',
    outline: 'none', fontFamily: "'Inter', -apple-system, sans-serif", transition: 'all 0.25s', fontWeight: 500,
  }

  return (
    <div style={{
      minHeight: '100vh', background: t.bgGrad,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '24px', fontFamily: "'Inter', -apple-system, sans-serif", position: 'relative', overflow: 'hidden'
    }}>
      <GeoBg t={t} />
      <div style={{
        position: 'absolute', top: -120, left: '50%', transform: 'translateX(-50%)',
        width: 450, height: 450, borderRadius: '50%',
        background: `radial-gradient(circle,${t.accentBg} 0%,transparent 70%)`, pointerEvents: 'none', opacity: 0.6
      }} />
      <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={t} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 110, height: 110, borderRadius: '50%', marginBottom: 20,
            background: t.accentBg, border: `3px solid ${t.accentBorder}`,
            boxShadow: `0 0 50px ${t.accentBg}`, fontSize: 38
          }}>
            <img src="/logo.png" alt="Al-Mawaid" style={{ width: 90, height: 90, objectFit: 'contain' }} />
          </div>
          <p style={{ margin: '0 0 4px', fontSize: 12, color: t.textSub, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', opacity: 0.8 }}>Welcome to</p>
          <h1 style={{ margin: '0 0 6px', fontSize: 36, fontWeight: 900, color: t.accent, letterSpacing: '0.03em', textTransform: 'uppercase', textShadow: `0 0 32px ${t.accentBg}` }}>Al-Mawaid</h1>
          <p style={{ margin: 0, fontFamily: "'Amiri', serif", fontSize: 16, color: t.accent, opacity: 0.7, fontWeight: 600 }}>المَوَائِد · Daily Thali</p>
        </div>
        <div style={{ background: t.loginCard, backdropFilter: 'blur(24px)', border: `1.5px solid ${t.accentBorder}`, borderRadius: 28, padding: '32px 26px', boxShadow: '0 28px 90px rgba(0,0,0,0.3)' }}>
          <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 900, color: t.text, textAlign: 'center', letterSpacing: '0.02em' }}>Sign In</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: t.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.9 }}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color={t.accent} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }} />
                <input type="email" value={email} onChange={e => { setEmail(e.target.value); setError(null) }}
                  placeholder="you@example.com" autoComplete="email"
                  style={{ ...inp, paddingLeft: 46 }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: t.accent, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8, opacity: 0.9 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color={t.accent} style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }} />
                <input type={showPass ? 'text' : 'password'} value={password}
                  onChange={e => { setPassword(e.target.value); setError(null) }}
                  placeholder="••••••••" autoComplete="current-password"
                  style={{ ...inp, paddingLeft: 46, paddingRight: 50 }}
                  onFocus={e => e.target.style.borderColor = t.accent}
                  onBlur={e => e.target.style.borderColor = t.inputBorder} />
                <button type="button" onClick={() => setShowPass(s => !s)}
                  style={{ position: 'absolute', right: 15, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: t.accent, opacity: 0.7, display: 'flex' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button type="button" onClick={() => setRemember(r => !r)}
                style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${t.accentBorder}`, background: remember ? t.accent : 'transparent', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}>
                {remember && <Check size={14} color="#fff" strokeWidth={3} />}
              </button>
              <span onClick={() => setRemember(r => !r)} style={{ fontSize: 14, color: t.textSub, cursor: 'pointer', userSelect: 'none', fontWeight: 600 }}>Remember me</span>
            </div>
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 15px', borderRadius: 14, background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.35)', color: '#dc2626', fontSize: 14, fontWeight: 600 }}>
                <AlertCircle size={16} style={{ flexShrink: 0 }} />{error}
              </div>
            )}
            <button type="submit" disabled={loading}
              style={{
                marginTop: 6, padding: '16px', borderRadius: 18, border: 'none', cursor: loading ? 'wait' : 'pointer',
                background: loading ? t.accentBg : t.accentGrad, color: loading ? t.accent : '#fff',
                fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.1em',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: loading ? 'none' : `0 10px 32px ${t.accentBg}`, transition: 'all 0.25s'
              }}>
              {loading ? <><div className="spin" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: `2px solid ${t.accent}`, borderRadius: '50%' }} /> Signing in…</> : 'Sign In'}
            </button>
          </form>
        </div>
        <p style={{ textAlign: 'center', marginTop: 24, fontSize: 12, color: t.textSub, letterSpacing: '0.05em', opacity: 0.5, fontWeight: 600 }}>Al-Mawaid</p>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Amiri:wght@400;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 0.85s linear infinite; }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 1 — HOME
═══════════════════════════════════════ */
function HomePage() {
  const t = useTheme()
  const { user } = useAuth()
  const [menuData, setMenuData] = useState([])
  const [memberNo, setMemberNo] = useState(null)
  const [memberName, setMemberName] = useState(null)
  const [profilePic, setProfilePic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeDay, setActiveDay] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [feedbackMenuId, setFeedbackMenuId] = useState(null)
  const [submittedToday, setSubmittedToday] = useState(false)

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [{ data: menu, error: mErr }, { data: mem }] = await Promise.all([
        supabase.from('menu_arrays').select('*').order('id'),
        user ? supabase.from('members').select('member_no,name_en').eq('user_id', user.id).maybeSingle() : Promise.resolve({ data: null }),
      ])
      if (cancelled) return
      if (mErr) setError(mErr.message); else setMenuData(menu || [])
      if (mem?.member_no) {
        setMemberNo(mem.member_no)
        setMemberName(mem.name_en)
        supabase.from('member_profile_pics').select('pic_url').eq('member_no', mem.member_no).maybeSingle().then(({ data: p }) => {
          if (!cancelled && p?.pic_url) setProfilePic(p.pic_url)
        })
        const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
        const { data: existing } = await supabase.from('feedback').select('id').eq('member_no', mem.member_no).gte('created_at', todayStart.toISOString()).limit(1)
        if (!cancelled && existing?.length > 0) setSubmittedToday(true)
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [user])

  if (loading) return <Spinner />
  if (error) return <ErrorBanner msg={error} />

  return (
    <div style={{ flex: 1, padding: '10px 16px 120px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {memberName && (
        <div style={{ borderRadius: 20, padding: '16px 18px', background: t.cardActive, border: `2px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: `0 6px 24px ${t.accentBg}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: t.accentBg, border: `2px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 20, fontWeight: 900, color: t.accent, flexShrink: 0 }}>
              {profilePic ? <img src={profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (memberName?.[0] || '?')}
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: t.textSub, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700 }}>Welcome back</p>
              <p style={{ margin: '3px 0 0', fontSize: 18, fontWeight: 900, color: t.text, letterSpacing: '0.01em' }}>{memberName}</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: 11, color: t.textSub, opacity: 0.6, fontWeight: 700 }}>Thaali No.</p>
            <p style={{ margin: 0, fontSize: 26, fontWeight: 900, color: t.accent, lineHeight: 1.1 }}>{memberNo}</p>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setShowInfo(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', background: t.accentBg, border: `1.5px solid ${t.accentBorder}`, color: t.accent, borderRadius: 999, padding: '9px 18px', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <Info size={14} /> Menu Information
        </button>
      </div>

      {menuData.map((item, index) => {
        const open = activeDay === index
        const isToday = item.day_name?.toLowerCase() === todayName.toLowerCase()
        const lunch = Array.isArray(item.lunch_items) ? item.lunch_items.filter(Boolean) : [item.lunch_items].filter(Boolean)
        const dinner = Array.isArray(item.dinner_items) ? item.dinner_items.filter(Boolean) : [item.dinner_items].filter(Boolean)

        return (
          <div key={item.id} style={{ borderRadius: 22, overflow: 'hidden', background: open ? t.cardActive : t.card, border: `2px solid ${open ? t.borderActive : isToday ? t.accentBorder : t.border}`, transition: 'all 0.35s ease', boxShadow: isToday ? `0 0 0 3px ${t.accentBorder}` : open ? `0 6px 24px ${t.accentBg}` : 'none' }}>
            <button onClick={() => setActiveDay(open ? null : index)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', color: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ position: 'relative', width: 64, height: 64, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: t.accentBg, borderRadius: 18, border: `2px solid ${t.accentBorder}` }}>
                  <img src="/logo.png" alt="" style={{ width: 52, height: 52, objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 900, fontSize: 17, color: t.text, letterSpacing: '0.01em' }}>{item.day_name}</span>
                    <span style={{ fontSize: 13, color: t.accent, opacity: 0.7, fontFamily: "'Amiri', serif", fontWeight: 600 }}>{item.day_name_ar}</span>
                    {isToday && <span style={{ fontSize: 10, fontWeight: 900, padding: '3px 10px', borderRadius: 999, background: t.accent, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Today</span>}
                  </div>
                  {!open && <span style={{ fontSize: 12, color: t.textSub, opacity: 0.6, display: 'block', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{lunch.join(', ')}</span>}
                </div>
              </div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0, background: open ? t.accent : t.accentBg, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: open ? 'rotate(180deg)' : 'none', transition: 'all 0.35s' }}>
                <ChevronDown size={16} color={open ? '#fff' : t.accent} strokeWidth={3} />
              </div>
            </button>

            {open && (
              <div style={{ padding: '0 16px 18px' }}>
                <div style={{ height: 2, background: `linear-gradient(90deg,${t.accentBorder},transparent)`, marginBottom: 14 }} />
                <div style={{ borderRadius: 16, padding: '16px', background: t.accentBg, border: `1.5px solid ${t.accentBorder}`, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Sun size={15} color={t.accent} />
                    <span style={{ fontSize: 12, fontWeight: 900, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Lunch</span>
                  </div>
                  <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                    {lunch.map((d, i) => <li key={i} style={{ fontSize: 14, color: t.textBody, lineHeight: 1.8, fontWeight: 500 }}>{d}</li>)}
                  </ul>
                </div>
                <div style={{ borderRadius: 16, padding: '16px', background: t.card, border: `1.5px solid ${t.border}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <Moon size={15} color={t.textSub} />
                    <span style={{ fontSize: 12, fontWeight: 900, color: t.textSub, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Dinner</span>
                  </div>
                  <ul style={{ margin: 0, padding: '0 0 0 18px' }}>
                    {dinner.map((d, i) => <li key={i} style={{ fontSize: 14, color: t.textBody, lineHeight: 1.8, fontWeight: 500 }}>{d}</li>)}
                  </ul>
                </div>
                <div style={{ marginTop: 14 }}>
                  {isToday ? (
                    submittedToday ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', borderRadius: 16, background: t.accentBg, border: `1.5px solid ${t.accentBorder}` }}>
                        <Check size={16} color={t.accent} strokeWidth={3} />
                        <span style={{ fontSize: 13, fontWeight: 800, color: t.accent }}>Feedback submitted — thank you!</span>
                      </div>
                    ) : (
                      <button onClick={e => { e.stopPropagation(); setFeedbackMenuId(item.id) }}
                        style={{ width: '100%', padding: '13px 16px', borderRadius: 16, border: 'none', cursor: 'pointer', background: t.accentGrad, color: '#fff', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: `0 6px 20px ${t.accentBg}`, transition: 'all 0.25s' }}>
                        <MessageCircle size={16} /> Leave Feedback
                      </button>
                    )
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', borderRadius: 16, opacity: 0.5, background: 'transparent', border: `1.5px dashed ${t.border}`, cursor: 'not-allowed' }}>
                      <Lock size={14} color={t.textSub} />
                      <span style={{ fontSize: 13, fontWeight: 700, color: t.textSub }}>Feedback only available on this day</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}

      {showInfo && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: t.popupBg, backdropFilter: 'blur(16px)' }}>
          <div style={{ width: '100%', maxWidth: 380, borderRadius: 28, padding: '32px 26px', position: 'relative', background: t.cardActive, border: `2px solid ${t.accentBorder}`, boxShadow: '0 28px 90px rgba(0,0,0,0.35)' }}>
            <button onClick={() => setShowInfo(false)} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', cursor: 'pointer', color: t.textSub }}><X size={22} /></button>
            <h2 style={{ margin: '0 0 12px', fontSize: 24, fontWeight: 900, color: t.text }}>Notice</h2>
            <p style={{ margin: 0, fontSize: 15, color: t.textBody, lineHeight: 1.7, fontWeight: 500 }}>Menu may change based on availability. Tap any day to expand and view the full menu. Shukran!</p>
            <button onClick={() => setShowInfo(false)} style={{ marginTop: 24, width: '100%', padding: '15px', borderRadius: 18, border: 'none', cursor: 'pointer', background: t.accentGrad, color: '#fff', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Got it</button>
          </div>
        </div>
      )}

      {feedbackMenuId !== null && (
        <FeedbackModal t={t} menuId={feedbackMenuId} memberNo={memberNo} todayName={todayName}
          onClose={() => { setFeedbackMenuId(null); setSubmittedToday(true) }} />
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 2 — SURVEY  (ROW FORMAT — each item is its own full-width row)
═══════════════════════════════════════ */

// ── Reusable row-format survey item ──────────────────────────
function SurveyItemRow({ item, value, onChange, t }) {
  const isRoti = /roti/i.test(String(item))
  const percentOptions = [100, 50, 25, 0]

  return (
    <div style={{
      width: '100%',
      borderRadius: 16,
      marginBottom: 12,
      background: t.rowItemBg,
      border: `1.5px solid ${isRoti ? t.accentBorder : t.rowItemBorder}`,
      overflow: 'hidden',
    }}>
      {/* Item name header row */}
      <div style={{
        padding: '12px 16px',
        borderLeft: `4px solid ${t.rowItemAccent}`,
        display: 'flex', alignItems: 'center', gap: 8,
        background: t.accentBg,
      }}>
        {isRoti && <span style={{ fontSize: 18 }}>🫓</span>}
        <span style={{ fontSize: 15, fontWeight: 800, color: t.text }}>{item}</span>
        {value !== null && (
          <span style={{
            marginLeft: 'auto', fontSize: 12, fontWeight: 900,
            padding: '3px 10px', borderRadius: 999,
            background: t.accent, color: '#fff'
          }}>
            {isRoti ? (value === 100 ? 'Yes ✅' : 'No ❌') : `${value}%`}
          </span>
        )}
      </div>

      {/* Button row */}
      <div style={{ padding: '12px 14px' }}>
        {isRoti ? (
          // Yes / No buttons as a full-width row
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => onChange(100)}
              style={{
                flex: 1, padding: '12px', borderRadius: 12, cursor: 'pointer',
                border: `2px solid ${value === 100 ? t.accentBorder : t.border}`,
                background: value === 100 ? t.accentGrad : 'transparent',
                color: value === 100 ? '#fff' : t.textSub,
                fontWeight: 900, fontSize: 15, textTransform: 'uppercase',
                letterSpacing: '0.08em', transition: 'all 0.2s'
              }}>
              ✅ Yes
            </button>
            <button
              onClick={() => onChange(0)}
              style={{
                flex: 1, padding: '12px', borderRadius: 12, cursor: 'pointer',
                border: `2px solid ${value === 0 ? t.accentBorder : t.border}`,
                background: value === 0 ? t.accentBg : 'transparent',
                color: value === 0 ? t.accent : t.textSub,
                fontWeight: 900, fontSize: 15, textTransform: 'uppercase',
                letterSpacing: '0.08em', transition: 'all 0.2s'
              }}>
              ❌ No
            </button>
          </div>
        ) : (
          // 4 percentage buttons in a single row
          <div style={{ display: 'flex', gap: 8 }}>
            {percentOptions.map(pct => (
              <button
                key={pct}
                onClick={() => onChange(pct)}
                style={{
                  flex: 1,
                  padding: '11px 6px',
                  borderRadius: 12,
                  border: `2px solid ${value === pct ? t.accentBorder : t.border}`,
                  background: value === pct ? t.accentBg : 'transparent',
                  color: value === pct ? t.accent : t.textSub,
                  fontWeight: 900, fontSize: 14, cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}>
                {pct === 100 ? 'Full' : pct === 0 ? 'None' : `${pct}%`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SurveyPage() {
  const t = useTheme()
  const { user } = useAuth()
  const [menuData, setMenuData] = useState([])
  const [memberNo, setMemberNo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [step, setStep] = useState(0)
  const [lunchAte, setLunchAte] = useState(null)
  const [dinnerAte, setDinnerAte] = useState(null)
  const [lunchItems, setLunchItems] = useState([])
  const [dinnerItems, setDinnerItems] = useState([])
  const [lunchPercent, setLunchPercent] = useState({})
  const [dinnerPercent, setDinnerPercent] = useState({})
  const [saving, setSaving] = useState(false)
  const [saveErr, setSaveErr] = useState(null)
  const [toast, setToast] = useState(null)
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const todayMenu = menuData.find(m => m.day_name?.toLowerCase() === todayName.toLowerCase())

  useEffect(() => {
    let cancelled = false
    async function load() {
      const [{ data: menu, error: mErr }, { data: mem }] = await Promise.all([
        supabase.from('menu_arrays').select('*').order('id'),
        user ? supabase.from('members').select('member_no').eq('user_id', user.id).maybeSingle() : Promise.resolve({ data: null }),
      ])
      if (cancelled) return
      if (mErr) { setError(mErr.message); setLoading(false); return }
      setMenuData(menu || [])
      if (mem?.member_no) {
        setMemberNo(mem.member_no)
        const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
        const { data: existingSurvey } = await supabase.from('survey_responses').select('id').eq('member_no', mem.member_no).gte('created_at', todayStart.toISOString()).limit(1)
        if (!cancelled && existingSurvey?.length > 0) setHasSubmittedToday(true)
      }
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [user])

  useEffect(() => {
    if (todayMenu) {
      const lunch = Array.isArray(todayMenu.lunch_items) ? todayMenu.lunch_items.filter(Boolean) : [todayMenu.lunch_items].filter(Boolean)
      const dinner = Array.isArray(todayMenu.dinner_items) ? todayMenu.dinner_items.filter(Boolean) : [todayMenu.dinner_items].filter(Boolean)
      setLunchItems(lunch)
      setDinnerItems(dinner)
      const lp = {}; lunch.forEach(item => { lp[item] = null })
      const dp = {}; dinner.forEach(item => { dp[item] = null })
      setLunchPercent(lp)
      setDinnerPercent(dp)
    }
  }, [todayMenu])

  async function handleSubmit() {
    if (!memberNo || !todayMenu) return
    setSaving(true); setSaveErr(null)

    const records = []
    if (lunchAte) {
      Object.entries(lunchPercent).forEach(([item, pct]) => {
        if (pct !== null) records.push({ member_no: memberNo, day_name: todayName, meal_type: 'lunch', menu_item: item, percent: pct })
      })
    }
    if (dinnerAte) {
      Object.entries(dinnerPercent).forEach(([item, pct]) => {
        if (pct !== null) records.push({ member_no: memberNo, day_name: todayName, meal_type: 'dinner', menu_item: item, percent: pct })
      })
    }

    if (records.length > 0) {
      if (isEditing) {
        const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0)
        await supabase.from('survey_responses').delete().eq('member_no', memberNo).gte('created_at', todayStart.toISOString())
      }
      const { error: err } = await supabase.from('survey_responses').insert(records)
      if (err) { setSaveErr(err.message); setSaving(false); return }
    }

    setSaving(false)
    setToast('✅ Survey submitted successfully!')
    setTimeout(() => {
      setToast(null)
      setHasSubmittedToday(true)
      setIsEditing(false)
      setStep(0); setLunchAte(null); setDinnerAte(null)
      const lp = {}; lunchItems.forEach(item => { lp[item] = null })
      const dp = {}; dinnerItems.forEach(item => { dp[item] = null })
      setLunchPercent(lp); setDinnerPercent(dp)
    }, 2000)
  }

  const isRoti = (name) => /roti/i.test(String(name))
  const sortWithRotiFirst = (arr) => [...arr].sort((a, b) => isRoti(a) ? -1 : isRoti(b) ? 1 : 0)
  const sortedLunchItems = sortWithRotiFirst(lunchItems)
  const sortedDinnerItems = sortWithRotiFirst(dinnerItems)

  // Shared step container style
  const stepContainer = { flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }

  const BackBtn = ({ to }) => (
    <button onClick={() => setStep(to)}
      style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', color: t.textSub, fontSize: 14, fontWeight: 700 }}>
      <ArrowLeft size={16} /> Back
    </button>
  )

  const YesNoCard = ({ title, question, onYes, onNo }) => (
    <div style={{ borderRadius: 20, padding: '24px', background: t.surveyCard, border: `2px solid ${t.border}`, textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 900, color: t.text }}>{title}</h3>
      <p style={{ margin: '0 0 24px', fontSize: 15, color: t.textBody, fontWeight: 500 }}>{question}</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button onClick={onYes} style={{ flex: 1, maxWidth: 140, padding: '14px', borderRadius: 16, border: 'none', cursor: 'pointer', background: t.accentGrad, color: '#fff', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Yes</button>
        <button onClick={onNo} style={{ flex: 1, maxWidth: 140, padding: '14px', borderRadius: 16, border: `2px solid ${t.border}`, background: 'transparent', color: t.textSub, fontWeight: 900, fontSize: 15, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.08em' }}>No</button>
      </div>
    </div>
  )

  const allLunchFilled = Object.values(lunchPercent).every(v => v !== null)
  const allDinnerFilled = Object.values(dinnerPercent).every(v => v !== null)

  if (loading) return <Spinner />
  if (error) return <ErrorBanner msg={error} />
  if (!todayMenu) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 16 }}>
        <ClipboardList size={48} color={t.accentBorder} />
        <p style={{ margin: 0, fontSize: 16, color: t.textSub, opacity: 0.6, fontWeight: 600, textAlign: 'center' }}>No menu available for today.</p>
      </div>
    )
  }

  return (
    <div style={{ flex: 1, background: t.surveyBg, padding: '16px 16px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Header */}
      <div style={{ borderRadius: 20, padding: '18px 20px', background: t.cardActive, border: `2px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', gap: 14, boxShadow: `0 6px 24px ${t.accentBg}` }}>
        <ClipboardList size={24} color={t.accent} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 11, color: t.textSub, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.18em', fontWeight: 700 }}>Survey for</p>
          <p style={{ margin: '3px 0 0', fontSize: 18, fontWeight: 900, color: t.text }}>{todayName}'s Meal</p>
        </div>
      </div>

      {/* Already submitted */}
      {hasSubmittedToday && !isEditing && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.accentBg, border: `3px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={40} color={t.accent} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: t.text }}>Survey Completed</h2>
            <p style={{ margin: '8px 0 0', fontSize: 14, color: t.textSub, fontWeight: 500 }}>You have already completed today's survey.</p>
          </div>
          <button onClick={() => { setIsEditing(true); setStep(1) }}
            style={{ padding: '16px 40px', borderRadius: 18, border: `2px solid ${t.accentBorder}`, cursor: 'pointer', background: 'transparent', color: t.accent, fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Edit Response
          </button>
        </div>
      )}

      {(!hasSubmittedToday || isEditing) && (
        <>
          {/* Step 0: Start */}
          {step === 0 && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: 20 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: t.accentBg, border: `3px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ClipboardList size={40} color={t.accent} />
              </div>
              <div style={{ textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, color: t.text }}>Daily Survey</h2>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: t.textSub, fontWeight: 500 }}>Tell us about your meal experience today</p>
              </div>
              <button onClick={() => setStep(1)}
                style={{ padding: '16px 40px', borderRadius: 18, border: 'none', cursor: 'pointer', background: t.accentGrad, color: '#fff', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: `0 8px 28px ${t.accentBg}` }}>
                Start Survey
              </button>
            </div>
          )}

          {/* Step 1: Lunch yes/no */}
          {step === 1 && (
            <div style={stepContainer}>
              <BackBtn to={0} />
              <YesNoCard
                title={`${todayName} Lunch`}
                question="Did you have lunch today?"
                onYes={() => { setLunchAte(true); setStep(2) }}
                onNo={() => { setLunchAte(false); setStep(3) }}
              />
            </div>
          )}

          {/* Step 2: Lunch detail — ROW FORMAT */}
          {step === 2 && (
            <div style={stepContainer}>
              <BackBtn to={1} />
              <div style={{ borderRadius: 20, padding: '18px 16px 10px', background: t.surveyCard, border: `2px solid ${t.accentBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Sun size={18} color={t.accent} />
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: t.text }}>Lunch Items</h3>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: t.textSub, fontWeight: 600 }}>
                    {Object.values(lunchPercent).filter(v => v !== null).length}/{sortedLunchItems.length} answered
                  </span>
                </div>
                {sortedLunchItems.map((item) => (
                  <SurveyItemRow
                    key={item}
                    item={item}
                    value={lunchPercent[item]}
                    onChange={val => setLunchPercent(prev => ({ ...prev, [item]: val }))}
                    t={t}
                  />
                ))}
              </div>
              <button onClick={() => setStep(3)} disabled={!allLunchFilled}
                style={{
                  padding: '16px', borderRadius: 18, border: 'none',
                  cursor: allLunchFilled ? 'pointer' : 'not-allowed',
                  background: allLunchFilled ? t.accentGrad : t.accentBg,
                  color: allLunchFilled ? '#fff' : t.accent,
                  fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.08em', transition: 'all 0.25s'
                }}>
                Next →
              </button>
            </div>
          )}

          {/* Step 3: Dinner yes/no */}
          {step === 3 && (
            <div style={stepContainer}>
              <BackBtn to={lunchAte ? 2 : 1} />
              <YesNoCard
                title={`${todayName} Dinner`}
                question="Did you have dinner today?"
                onYes={() => { setDinnerAte(true); setStep(4) }}
                onNo={() => { setDinnerAte(false); handleSubmit() }}
              />
            </div>
          )}

          {/* Step 4: Dinner detail — ROW FORMAT */}
          {step === 4 && (
            <div style={stepContainer}>
              <BackBtn to={3} />
              <div style={{ borderRadius: 20, padding: '18px 16px 10px', background: t.surveyCard, border: `2px solid ${t.accentBorder}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <Moon size={18} color={t.accent} />
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 900, color: t.text }}>Dinner Items</h3>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: t.textSub, fontWeight: 600 }}>
                    {Object.values(dinnerPercent).filter(v => v !== null).length}/{sortedDinnerItems.length} answered
                  </span>
                </div>
                {sortedDinnerItems.map((item) => (
                  <SurveyItemRow
                    key={item}
                    item={item}
                    value={dinnerPercent[item]}
                    onChange={val => setDinnerPercent(prev => ({ ...prev, [item]: val }))}
                    t={t}
                  />
                ))}
              </div>
              {saveErr && <ErrorBanner msg={saveErr} />}
              <button onClick={handleSubmit} disabled={!allDinnerFilled || saving}
                style={{
                  padding: '16px', borderRadius: 18, border: 'none',
                  cursor: (allDinnerFilled && !saving) ? 'pointer' : 'not-allowed',
                  background: (allDinnerFilled && !saving) ? t.accentGrad : t.accentBg,
                  color: (allDinnerFilled && !saving) ? '#fff' : t.accent,
                  fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.08em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'all 0.25s'
                }}>
                {saving
                  ? <><div className="spin" style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid #fff', borderRadius: '50%' }} /> Submitting…</>
                  : <><Send size={16} /> Submit Survey</>
                }
              </button>
            </div>
          )}
        </>
      )}

      {toast && (
        <div style={{ position: 'fixed', bottom: 100, left: '50%', transform: 'translateX(-50%)', background: t.accent, color: '#fff', padding: '12px 24px', borderRadius: 16, fontSize: 14, fontWeight: 800, boxShadow: '0 10px 28px rgba(0,0,0,0.25)', zIndex: 120, whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 3 — ANNOUNCEMENTS
═══════════════════════════════════════ */
function PostPage() {
  const t = useTheme()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    supabase.from('posts').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
      if (cancelled) return
      if (error) setError(error.message); else setPosts(data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (loading) return <Spinner />
  if (error) return <ErrorBanner msg={error} />

  const typeColor = { announcement: t.accent, notice: '#f59e0b', reminder: '#a78bfa', info: '#34d399' }
  const typeIcon = { announcement: '📣', notice: '⚠️', reminder: '⏰', info: '💡' }

  return (
    <div style={{ flex: 1, padding: '16px 16px 120px', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '24px 22px', background: `linear-gradient(135deg, ${t.cardActive}, ${t.accentBg})`, border: `2px solid ${t.accentBorder}`, boxShadow: `0 12px 40px ${t.accentBg}`, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 52, height: 52, borderRadius: 16, background: t.card, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 8px 24px ${t.accentBg}`, border: `2px solid ${t.accentBorder}`, zIndex: 1 }}>
          <Bell size={26} color={t.accent} />
        </div>
        <div style={{ flex: 1, zIndex: 1 }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: t.accent, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Notice Board</p>
          <p style={{ margin: '2px 0 0', fontSize: 22, fontWeight: 900, color: t.text }}>Announcements</p>
        </div>
        <div style={{ background: t.accent, color: '#fff', fontSize: 13, fontWeight: 900, padding: '6px 14px', borderRadius: 999, zIndex: 1 }}>{posts.length}</div>
      </div>

      {posts.length === 0 && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', gap: 16 }}>
          <div style={{ opacity: 0.2 }}><Bell size={56} color={t.text} /></div>
          <p style={{ margin: 0, fontSize: 16, color: t.textSub, opacity: 0.8, fontWeight: 600 }}>No announcements at the moment.</p>
        </div>
      )}

      {posts.map(post => {
        const isUrgent = post.is_urgent
        const cColor = typeColor[post.type] || t.accent
        return (
          <div key={post.id} style={{ position: 'relative', overflow: 'hidden', borderRadius: 24, padding: '22px', background: t.card, border: `1.5px solid ${isUrgent ? t.accentBorder : t.border}`, boxShadow: isUrgent ? `0 12px 40px ${t.accentBg}` : '0 8px 24px rgba(0,0,0,0.03)', transition: 'all 0.3s ease' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, position: 'relative', zIndex: 1 }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', flexShrink: 0, background: t.cardActive, border: `2px solid ${t.borderActive}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{post.emoji || typeIcon[post.type] || '📌'}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 17, fontWeight: 900, color: t.text, lineHeight: 1.3 }}>{post.title_en}</span>
                  {isUrgent && <span style={{ fontSize: 10, fontWeight: 900, padding: '4px 10px', borderRadius: 999, background: t.accentGrad, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>Important</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: cColor, background: `${cColor}15`, padding: '4px 10px', borderRadius: 8 }}>{post.type || 'Notice'}</span>
                  <span style={{ fontSize: 12, color: t.textSub, opacity: 0.6, fontWeight: 600 }}>{new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <div style={{ padding: '14px 16px', borderRadius: 16, border: `1px solid ${t.border}`, marginBottom: 10 }}>
                  <p style={{ margin: 0, fontSize: 14, color: t.textBody, lineHeight: 1.6, fontWeight: 500 }}>{post.body}</p>
                </div>
                {post.title_ar && <p style={{ margin: 0, fontSize: 15, color: t.accent, opacity: 0.8, fontFamily: "'Amiri', serif", fontWeight: 700, textAlign: 'right' }}>{post.title_ar}</p>}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════
   PAGE 4 — PROFILE
═══════════════════════════════════════ */
function ProfilePage() {
  const t = useTheme()
  const { user, signOut } = useAuth()
  const [member, setMember] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profilePic, setProfilePic] = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!user) { setError('No user session'); setLoading(false); return }
      const { data: m, error: e } = await supabase.from('members').select('*').eq('user_id', user.id).single()
      if (cancelled) return
      if (e) { setError('Profile not linked to this account'); setLoading(false); return }
      setMember(m)
      const { data: p } = await supabase.from('member_profile_pics').select('pic_url').eq('member_no', m.member_no).maybeSingle()
      if (p?.pic_url) setProfilePic(p.pic_url)
      setLoading(false)
    }
    load()
    return () => { cancelled = true }
  }, [user])

  if (loading) return <Spinner />
  if (error) return <ErrorBanner msg={error} />
  if (!member) return <ErrorBanner msg="Member not found" />

  const stats = [
    { label: 'Member Since', value: new Date(member.joined_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) },
    { label: 'Status', value: member.is_active ? '✅ Active' : '❌ Inactive' },
  ]

  return (
    <div style={{ flex: 1, padding: '16px 16px 120px', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ borderRadius: 24, padding: '24px 22px', background: `linear-gradient(135deg,${t.cardActive},${t.accentBg})`, border: `2px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', gap: 18, boxShadow: `0 12px 40px ${t.accentBg}` }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div style={{ width: 76, height: 76, borderRadius: '50%', background: t.accentBg, border: `3px solid ${t.accentBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', fontSize: 32, fontWeight: 900, color: t.accent }}>
            {profilePic ? <img src={profilePic} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (member.name_ar?.[0] || member.name_en?.[0] || '?')}
          </div>
          <div style={{ position: 'absolute', bottom: -2, right: -2, width: 28, height: 28, background: 'rgba(100,100,100,0.6)', border: `2px solid ${t.bg}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={14} color="#fff" />
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: '0 0 3px', fontSize: 11, color: t.accent, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Active Member</p>
          <p style={{ margin: '0 0 3px', fontSize: 17, fontWeight: 900, color: t.text, wordBreak: 'break-word' }}>{member.name_en}</p>
          {user?.email && <p style={{ margin: 0, fontSize: 12, color: t.textSub, opacity: 0.6, fontWeight: 500, wordBreak: 'break-all' }}>{user.email}</p>}
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <p style={{ margin: 0, fontSize: 11, color: t.textSub, opacity: 0.6, fontWeight: 700 }}>Thaali No.</p>
          <p style={{ margin: 0, fontSize: 32, fontWeight: 900, color: t.accent, lineHeight: 1 }}>{member.member_no}</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {stats.map(s => (
          <div key={s.label} style={{ borderRadius: 18, padding: '16px', background: t.card, border: `2px solid ${t.border}` }}>
            <p style={{ margin: '0 0 6px', fontSize: 11, color: t.textSub, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 17, fontWeight: 900, color: t.accent }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div style={{ borderRadius: 20, padding: '20px', background: t.card, border: `2px solid ${t.border}` }}>
        <p style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 900, color: t.text }}>Account</p>
        <p style={{ margin: '0 0 18px', fontSize: 13, color: t.textSub, opacity: 0.6, fontWeight: 500, wordBreak: 'break-all' }}>{user?.email}</p>
        <button onClick={signOut}
          style={{ width: '100%', padding: '15px', borderRadius: 16, border: '1.5px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 800, fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   MAIN APP
═══════════════════════════════════════ */
export default function App() {
  const [session, setSession] = useState(undefined)
  const [activeTab, setActiveTab] = useState('home')
  const [themeId, setThemeId] = useState(getSavedThemeId)
  const theme = THEMES[themeId] || THEMES.ivory

  useEffect(() => { saveThemeId(themeId) }, [themeId])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  const signOut = useCallback(async () => { await supabase.auth.signOut() }, [])

  const tabs = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'survey', label: 'Survey', Icon: ClipboardList },
    { id: 'post', label: 'Announcements', Icon: Bell },
    { id: 'profile', label: 'Profile', Icon: User },
  ]

  const pageTitles = {
    home: { en: 'Al-Mawaid', sub: 'Daily Menu' },
    survey: { en: 'Survey', sub: 'Share your experience' },
    post: { en: 'Announcements', sub: 'Latest updates' },
    profile: { en: 'My Profile', sub: 'Member details' },
  }
  const title = pageTitles[activeTab]

  if (session === undefined) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bgGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div className="spin" style={{ width: 44, height: 44, border: `3px solid ${theme.spinnerBorder}`, borderTop: `3px solid ${theme.spinnerTop}`, borderRadius: '50%' }} />
          <p style={{ margin: 0, fontSize: 14, color: theme.textSub, opacity: 0.6, fontWeight: 600 }}>Loading…</p>
        </div>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin{animation:spin .85s linear infinite}body{margin:0;font-family:'Inter',-apple-system,sans-serif}`}</style>
      </div>
    )
  }

  if (!session) return <LoginPage themeId={themeId} setThemeId={setThemeId} />

  return (
    <ThemeCtx.Provider value={{ ...theme, theme, setThemeId }}>
      <AuthCtx.Provider value={{ user: session.user, signOut }}>
        <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", minHeight: '100vh', background: theme.bg, color: theme.text, display: 'flex', flexDirection: 'column', transition: 'background 0.4s ease, color 0.4s ease' }}>

          <ThemeSwitcher themeId={themeId} setThemeId={setThemeId} theme={theme} />

          {/* HEADER */}
          <header style={{ position: 'relative', overflow: 'hidden', background: theme.bgGrad, padding: '24px 20px 0', transition: 'background 0.4s ease' }}>
            <GeoBg t={theme} />
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.textSub, opacity: 0.9, paddingLeft: 50, fontWeight: 700 }}>
                <img src="/logo.png" alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} /> Al-Mawaid
              </div>
              <span style={{ fontSize: 11, color: theme.textSub, opacity: 0.5, fontWeight: 600 }}>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
            {activeTab === 'home' && (
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 10 }}>
                <p style={{ fontFamily: "'Amiri', serif", fontSize: 20, letterSpacing: '0.08em', color: theme.accent, margin: 0, fontWeight: 700 }}>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
              </div>
            )}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 14 }}>
              {activeTab === 'home' && <p style={{ fontSize: 11, letterSpacing: '0.28em', textTransform: 'uppercase', color: theme.textSub, opacity: 0.5, margin: '0 0 4px', fontWeight: 700 }}>Welcome to</p>}
              <h1 style={{ margin: 0, fontSize: activeTab === 'home' ? 38 : 28, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.03em', lineHeight: 1.1, color: theme.accent, textShadow: `0 0 24px ${theme.accentBg}` }}>{title.en}</h1>
              <p style={{ margin: '4px 0 0', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: theme.textSub, opacity: 0.5, fontWeight: 700 }}>{title.sub}</p>
            </div>
            <svg style={{ display: 'block', position: 'relative', zIndex: 1 }} width="100%" viewBox="0 0 1440 48" preserveAspectRatio="none">
              <path d="M0,16 C200,48 400,0 600,24 C800,48 1000,6 1200,28 C1320,42 1400,16 1440,22 L1440,48 L0,48 Z" fill={theme.bg} />
            </svg>
          </header>

          {activeTab === 'home' && <HomePage />}
          {activeTab === 'survey' && <SurveyPage />}
          {activeTab === 'post' && <PostPage />}
          {activeTab === 'profile' && <ProfilePage />}

          {/* Bottom nav */}
          <nav style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 30, display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '12px 10px 16px', background: theme.navBg, borderTop: `2px solid ${theme.navBorder}`, boxShadow: '0 -8px 36px rgba(0,0,0,0.12)', transition: 'background 0.4s ease' }}>
            {tabs.map(({ id, label, Icon }) => {
              const active = activeTab === id
              return (
                <button key={id} onClick={() => setActiveTab(id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '4px 20px', position: 'relative', WebkitTapHighlightColor: 'transparent' }}>
                  {active && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', width: 36, height: 4, borderRadius: 8, background: theme.accent, boxShadow: `0 0 14px ${theme.accentBg}` }} />}
                  <Icon size={24} color={active ? theme.accent : theme.border} strokeWidth={active ? 2.4 : 1.8} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.04em', color: active ? theme.accent : theme.textSub, opacity: active ? 1 : 0.6 }}>{label}</span>
                </button>
              )
            })}
          </nav>

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Amiri:wght@400;700&display=swap');
            @keyframes spin { to { transform: rotate(360deg); } }
            .spin { animation: spin 0.85s linear infinite; }
            @keyframes fadeInDown { from { opacity:0; transform:translateY(-10px) } to { opacity:1; transform:translateY(0) } }
            @keyframes fadeInUp { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:translateY(0) } }
            @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
            * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
            body { margin: 0; font-family: 'Inter', -apple-system, sans-serif; }
          `}</style>
        </div>
      </AuthCtx.Provider>
    </ThemeCtx.Provider>
  )
}
