'use client'

import { useEffect, useState } from 'react'

interface BookingInfo {
  has_booking: boolean
  booking_url?: string
  discount_pct?: number
  discount_code?: string
  discount_description?: string
  platform?: string
  valid_until?: string
}

interface BookingButtonProps {
  listingId?: string
  slug?: string
  listingName: string
  variant?: 'full' | 'compact' | 'card' // full = listing page, compact = sidebar, card = flip card
}

export default function BookingButton({ listingId, slug, listingName, variant = 'full' }: BookingButtonProps) {
  const [info, setInfo] = useState<BookingInfo | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/api/book', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: listingId, slug }),
    })
      .then(r => r.json())
      .then(setInfo)
  }, [listingId, slug])

  const copyCode = () => {
    if (!info?.discount_code) return
    navigator.clipboard.writeText(info.discount_code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!info || !info.has_booking) return null

  // CARD variant — compact single-line shown on flip cards
  if (variant === 'card') {
    return (
      <a
        href={info.booking_url}
        className="inline-flex items-center gap-1.5 bg-[#E8723A] text-white text-[11px] font-bold px-3 py-1.5 rounded-md no-underline"
      >
        Book with {info.discount_pct}% off
      </a>
    )
  }

  // COMPACT variant — used in listing sidebar
  if (variant === 'compact') {
    return (
      <div className="border border-[#E8723A] rounded-xl overflow-hidden mb-3">
        <div className="bg-[#E8723A] px-4 py-2.5 flex items-center gap-2">
          <span className="text-white text-lg font-bold">{info.discount_pct}%</span>
          <div>
            <div className="text-white text-[11px] font-bold leading-tight">Exclusive discount</div>
            <div className="text-white/80 text-[10px] leading-tight">Book through Best Dive Guide</div>
          </div>
        </div>
        <div className="bg-[#FFF5F0] px-4 py-3">
          <div className="text-[11px] text-gray-500 mb-2.5 leading-snug">
            Use code <span className="font-bold text-[#0A2342] tracking-wide">{info.discount_code}</span> when booking directly with {listingName}.
          </div>
          <a
            href={info.booking_url}
            className="block w-full text-center bg-[#E8723A] text-white text-[13px] font-bold py-2.5 rounded-lg no-underline mb-2"
          >
            Book now — save {info.discount_pct}%
          </a>
          <button
            onClick={copyCode}
            className="block w-full text-center border border-[#E8723A] text-[#E8723A] text-[11px] font-bold py-1.5 rounded-lg bg-transparent cursor-pointer"
          >
            {copied ? '✓ Code copied!' : `Copy code: ${info.discount_code}`}
          </button>
          {info.valid_until && (
            <div className="text-[10px] text-gray-400 text-center mt-1.5">Valid until {new Date(info.valid_until).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</div>
          )}
        </div>
      </div>
    )
  }

  // FULL variant — inline booking section on the listing page
  return (
    <div className="bg-[#FFF5F0] border border-[#F5D0BE] rounded-2xl overflow-hidden my-6">
      {/* Banner */}
      <div className="bg-[#E8723A] px-6 py-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-2xl font-bold">{info.discount_pct}%</span>
        </div>
        <div>
          <div className="text-white font-bold text-base leading-tight">Exclusive Best Dive Guide discount</div>
          <div className="text-white/80 text-sm mt-0.5">Book directly through us and save {info.discount_pct}% on your stay.</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
          {info.discount_description ?? `Save ${info.discount_pct}% when you book ${listingName} through Best Dive Guide. Use the code below at checkout or click the button to go directly to their booking page with the discount applied.`}
        </p>

        {/* Code box */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 bg-white border-2 border-dashed border-[#E8723A] rounded-xl px-5 py-3 text-center">
            <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mb-0.5">Your discount code</div>
            <div className="text-xl font-bold text-[#0A2342] tracking-widest">{info.discount_code}</div>
          </div>
          <button
            onClick={copyCode}
            className="bg-white border border-gray-200 text-[12px] font-bold text-gray-500 px-4 py-3 rounded-xl cursor-pointer flex-shrink-0 transition-all hover:border-[#E8723A] hover:text-[#E8723A]"
          >
            {copied ? '✓ Copied!' : 'Copy code'}
          </button>
        </div>

        <a
          href={info.booking_url}
          className="block w-full text-center bg-[#E8723A] text-white text-[15px] font-bold py-4 rounded-xl no-underline mb-2 hover:opacity-90 transition-opacity"
        >
          Book {listingName} — save {info.discount_pct}% →
        </a>

        <p className="text-[11px] text-gray-400 text-center">
          You will be taken to the operator's booking page. The discount code is pre-applied where possible, or paste it at checkout.
        </p>
      </div>
    </div>
  )
}
