'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * The one interactive island on /lab: copy the bureau email to the clipboard.
 * Everything else on the page is server-rendered, so this stays tiny.
 */
export default function CopyEmail({ email, copiedLabel, hint }: { email: string; copiedLabel: string; hint: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const copy = () => {
    const done = () => {
      setCopied(true)
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 1900)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(done, done)
    } else {
      done()
    }
  }

  return (
    <button type="button" className="vl-copy-btn" onClick={copy} title={hint} aria-label={`${hint}: ${email}`}>
      <span>{email}</span>
      <span className={copied ? 'vl-copy-ok' : undefined} aria-live="polite">
        {copied ? `✓ ${copiedLabel}` : ''}
      </span>
    </button>
  )
}
