import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import GooglePlayIcon from '../assets/google-play.svg'
import { useTranslation } from 'react-i18next'
import { Globe, ArrowLeft } from 'lucide-react'
import { trackEvent, Events } from '@/lib/analytics'

/* ─── Social proof avatars ─── */
const SOCIAL_AVATARS = [
  'https://i.pravatar.cc/40?img=32',
  'https://i.pravatar.cc/40?img=44',
  'https://i.pravatar.cc/40?img=47',
  'https://i.pravatar.cc/40?img=60',
  'https://i.pravatar.cc/40?img=68',
]

type FrameType = 'fluente' | 'aprendiz' | 'nativo' | 'iniciante'

interface Participant {
  id: number
  name: string
  letter: string
  avatar?: string
  frame: FrameType
  muted: boolean
  tileBg: string
  waiting?: boolean
}

const PARTICIPANTS: Participant[] = [
  { id: 0, name: 'Diego N.',  letter: 'D', avatar: 'https://i.pravatar.cc/80?img=12', frame: 'fluente',   muted: false, tileBg: '#050d1a' },
  { id: 1, name: 'Teri J.',   letter: 'T', frame: 'iniciante', muted: true,  tileBg: '#0d1e35' },
  { id: 2, name: 'Damon W.', letter: 'D', frame: 'nativo',    muted: true,  tileBg: '#050d1a' },
  { id: 3, name: 'Nuage L.', letter: 'N', frame: 'aprendiz',  muted: false, tileBg: '#0e1a00' },
  { id: 4, name: 'Sara K.',  letter: 'S', avatar: 'https://i.pravatar.cc/80?img=38', frame: 'fluente',   muted: false, tileBg: '#0a1628' },
  { id: 5, name: '',          letter: '+', frame: 'iniciante', muted: true,  tileBg: '#050d1a', waiting: true },
]

// Only non-muted participants: Diego(0), Nuage(3), Sara(4)
const SPEAKING_SEQUENCE = [0, 3, 4, 0, 4, 3, 0, 3]

/* ─── Real app frames — converted from Android Vector Drawable ─── */

/**
 * avatar_frame_iniciante — gray open arc (86×88 viewBox)
 * Ring center ≈ (42.8, 42.8) → top: 0 at width=48
 */
function FrameIniciante() {
  return (
    <svg
      viewBox="0 0 86 88"
      width="48"
      className="absolute pointer-events-none"
      style={{ top: 0, left: 0, overflow: 'visible' }}
    >
      {/* Ghost ring */}
      <path
        d="M14.6238,70.9859C9.0507,65.412,5.25554,58.3107,3.71822,50.5799C2.18091,42.8491,2.97048,34.8361,5.98711,27.5541C9.00373,20.272,14.1119,14.048,20.6658,9.66906C27.2196,5.29009,34.9247,2.95284,42.8069,2.95284C50.689,2.95284,58.3942,5.29009,64.948,9.66906C71.5019,14.048,76.61,20.272,79.6267,27.5541C82.6433,34.8361,83.4329,42.8491,81.8956,50.5799C80.3582,58.3107,76.5631,65.412,70.99,70.9859"
        fill="none" stroke="#9CA3AF" strokeWidth="5.88" strokeOpacity={0.18}
      />
      {/* Main ring */}
      <path
        d="M14.6238,70.9859C9.0507,65.412,5.25554,58.3107,3.71822,50.5799C2.18091,42.8491,2.97048,34.8361,5.98711,27.5541C9.00373,20.272,14.1119,14.048,20.6658,9.66906C27.2196,5.29009,34.9247,2.95284,42.8069,2.95284C50.689,2.95284,58.3942,5.29009,64.948,9.66906C71.5019,14.048,76.61,20.272,79.6267,27.5541C82.6433,34.8361,83.4329,42.8491,81.8956,50.5799C80.3582,58.3107,76.5631,65.412,70.99,70.9859"
        fill="none" stroke="#9CA3AF" strokeWidth="2.88"
      />
      {/* Inner accent */}
      <path
        d="M15.8491,69.7603C10.52,64.429,6.89123,57.6373,5.42172,50.2438C3.95221,42.8504,4.70792,35.1872,7.5933,28.2232C10.4787,21.2592,15.3642,15.3071,21.6321,11.1195C27.9,6.93189,35.2688,4.69678,42.8069,4.69678C50.3449,4.69678,57.7138,6.93189,63.9817,11.1195C70.2496,15.3071,75.135,21.2592,78.0204,28.2232C80.9058,35.1872,81.6615,42.8504,80.192,50.2438C78.7225,57.6373,75.0938,64.429,69.7646,69.7603"
        fill="none" stroke="#6B7280" strokeWidth="0.8" strokeOpacity={0.6}
      />
      {/* Corner decorations */}
      <path d="M10.7575,72.1221L13.4847,74.8493L18.4845,69.8494L15.7573,67.1222L10.7575,72.1221Z" fill="#6B7280" />
      <path d="M72.1295,74.8493L74.8567,72.1221L69.8568,67.1222L67.1296,69.8494L72.1295,74.8493Z" fill="#6B7280" />
    </svg>
  )
}

/**
 * avatar_frame_aprendiz — gold crown frame (96×125 viewBox)
 * Ring center ≈ (48, 70) → top: -11px at width=48
 */
function FrameAprendiz() {
  return (
    <svg
      viewBox="0 0 96 125"
      width="48"
      className="absolute pointer-events-none"
      style={{ top: '-11px', left: 0, overflow: 'visible' }}
    >
      {/* Ghost ring */}
      <path
        d="M47.9998,109.68C69.9145,109.68,87.6798,91.9145,87.6798,69.9998C87.6798,48.0852,69.9145,30.3198,47.9998,30.3198C26.0852,30.3198,8.31982,48.0852,8.31982,69.9998C8.31982,91.9145,26.0852,109.68,47.9998,109.68Z"
        fill="none" stroke="#F5C842" strokeWidth="12.32" strokeOpacity={0.18}
      />
      {/* Dark outline */}
      <path
        d="M48.0002,107.57C68.7495,107.57,85.5702,90.7495,85.5702,70.0002C85.5702,49.2508,68.7495,32.4302,48.0002,32.4302C27.2508,32.4302,10.4302,49.2508,10.4302,70.0002C10.4302,90.7495,27.2508,107.57,48.0002,107.57Z"
        fill="none" stroke="#7C5200" strokeWidth="0.8" strokeOpacity={0.7}
      />
      {/* Main golden ring */}
      <path
        d="M47.9998,109.68C69.9145,109.68,87.6798,91.9145,87.6798,69.9998C87.6798,48.0852,69.9145,30.3198,47.9998,30.3198C26.0852,30.3198,8.31982,48.0852,8.31982,69.9998C8.31982,91.9145,26.0852,109.68,47.9998,109.68Z"
        fill="none" stroke="#C8941A" strokeWidth="3.52"
      />
      {/* Left horn */}
      <path d="M17.6,44.4901C6.48998,23.8601,32.13,34.2901,23.4,17.6201C26.57,28.7301,30.18,21.1501,35.74,32.2601L17.6,44.4901Z" fill="#C8941A" />
      {/* Right horn */}
      <path d="M78.3998,44.4901C89.5098,23.8601,63.8698,34.2901,72.5998,17.6201C69.4298,28.7301,65.8198,21.1501,60.2598,32.2601L78.3998,44.4901Z" fill="#C8941A" />
      {/* Left horn outline */}
      <path d="M17.6,44.4901C6.48998,23.8601,32.13,34.2901,23.4,17.6201C26.57,28.7301,30.18,21.1501,35.74,32.2601L17.6,44.4901Z" fill="none" stroke="#F5C842" strokeWidth="0.7" strokeOpacity={0.55} />
      {/* Right horn outline */}
      <path d="M78.3998,44.4901C89.5098,23.8601,63.8698,34.2901,72.5998,17.6201C69.4298,28.7301,65.8198,21.1501,60.2598,32.2601L78.3998,44.4901Z" fill="none" stroke="#F5C842" strokeWidth="0.7" strokeOpacity={0.55} />
      {/* Left star */}
      <path d="M23.4001,13.1401L24.5001,16.1001L27.6601,16.2401L25.1901,18.2001L26.0301,21.2501L23.4001,19.5001L20.7701,21.2501L21.6101,18.2001L19.1401,16.2401L22.2901,16.1001L23.4001,13.1401Z" fill="#F5C842" />
      {/* Right star */}
      <path d="M72.5998,13.1401L73.7098,16.1001L76.8598,16.2401L74.3898,18.2001L75.2299,21.2501L72.5998,19.5001L69.9698,21.2501L70.8098,18.2001L68.3398,16.2401L71.4998,16.1001L72.5998,13.1401Z" fill="#F5C842" />
      {/* Left glow circle */}
      <path d="M23.4,24.7902C27.3599,24.7902,30.57,21.5801,30.57,17.6202C30.57,13.6603,27.3599,10.4502,23.4,10.4502C19.4401,10.4502,16.23,13.6603,16.23,17.6202C16.23,21.5801,19.4401,24.7902,23.4,24.7902Z" fill="#F5C842" fillOpacity={0.18} />
      {/* Right glow circle */}
      <path d="M72.6002,24.7902C76.5601,24.7902,79.7702,21.5801,79.7702,17.6202C79.7702,13.6603,76.5601,10.4502,72.6002,10.4502C68.6403,10.4502,65.4302,13.6603,65.4302,17.6202C65.4302,21.5801,68.6403,24.7902,72.6002,24.7902Z" fill="#F5C842" fillOpacity={0.18} />
      {/* Bottom left accent */}
      <path d="M41.1998,108.58L33.5598,114.43L30.8198,105.21L41.1998,108.58Z" fill="#C8941A" />
      {/* Bottom right accent */}
      <path d="M65.1798,105.21L62.4398,114.43L54.7998,108.58L65.1798,105.21Z" fill="#C8941A" />
      {/* Bottom tail */}
      <path d="M42.2402,113.01H53.7602V116.85C49.9202,121.456,46.0802,121.456,42.2402,116.85V113.01Z" fill="#C8941A" />
      {/* Bottom tail outline */}
      <path d="M42.2402,113.01H53.7602V116.85C49.9202,121.456,46.0802,121.456,42.2402,116.85V113.01Z" fill="none" stroke="#F5C842" strokeWidth="0.7" strokeOpacity={0.6} />
      {/* Bottom star */}
      <path d="M48.0002,112.09L48.7902,114.22L51.0702,114.32L49.2802,115.73L49.9002,117.92L48.0002,116.66L46.1002,117.92L46.7202,115.73L44.9302,114.32L47.2102,114.22L48.0002,112.09Z" fill="#F5C842" />
    </svg>
  )
}

/**
 * avatar_frame_nativo — blue wave frame (108×135 viewBox)
 * Ring center ≈ (54, 78) → top: -11px at width=48
 */
function FrameNativo() {
  return (
    <svg
      viewBox="0 0 108 135"
      width="48"
      className="absolute pointer-events-none"
      style={{ top: '-11px', left: 0, overflow: 'visible' }}
    >
      {/* Outer glow ring */}
      <path
        d="M53.9998,122.68C78.6759,122.68,98.6798,102.676,98.6798,77.9998C98.6798,53.3237,78.6759,33.3198,53.9998,33.3198C29.3237,33.3198,9.31982,53.3237,9.31982,77.9998C9.31982,102.676,29.3237,122.68,53.9998,122.68Z"
        fill="none" stroke="#A2CCFF" strokeWidth="14.08" strokeOpacity={0.18}
      />
      {/* Secondary blue glow */}
      <path
        d="M53.9998,117.68C75.9145,117.68,93.6798,99.9145,93.6798,77.9998C93.6798,56.0852,75.9145,38.3198,53.9998,38.3198C32.0852,38.3198,14.3198,56.0852,14.3198,77.9998C14.3198,99.9145,32.0852,117.68,53.9998,117.68Z"
        fill="none" stroke="#2D8CFF" strokeWidth="17.6" strokeOpacity={0.33}
      />
      {/* Main blue ring */}
      <path
        d="M53.9998,117.68C75.9145,117.68,93.6798,99.9145,93.6798,77.9998C93.6798,56.0852,75.9145,38.3198,53.9998,38.3198C32.0852,38.3198,14.3198,56.0852,14.3198,77.9998C14.3198,99.9145,32.0852,117.68,53.9998,117.68Z"
        fill="none" stroke="#2D8CFF" strokeWidth="3.52"
      />
      {/* Inner ring */}
      <path
        d="M53.9998,115.22C74.5558,115.22,91.2198,98.5558,91.2198,77.9998C91.2198,57.4437,74.5558,40.7798,53.9998,40.7798C33.4437,40.7798,16.7798,57.4437,16.7798,77.9998C16.7798,98.5558,33.4437,115.22,53.9998,115.22Z"
        fill="none" stroke="#A2CCFF" strokeWidth="0.9" strokeOpacity={0.75}
      />
      {/* Left wave dark */}
      <path d="M82.0602,49.9401L20.6702,43.0801L15.9102,54.9901L30.9902,65.3001L16.7102,64.4301L82.0602,49.9401Z" fill="#0A3D7A" />
      {/* Right wave dark */}
      <path d="M25.9399,49.9401L87.3299,43.0801L92.0899,54.9901L77.0099,65.3001L91.2899,64.4301L25.9399,49.9401Z" fill="#0A3D7A" />
      {/* Left wave blue */}
      <path d="M82.0602,49.9401L20.6702,43.0801L15.9102,54.9901L30.9902,65.3001L16.7102,64.4301L82.0602,49.9401Z" fill="#2D8CFF" fillOpacity={0.75} />
      {/* Right wave blue */}
      <path d="M25.9399,49.9401L87.3299,43.0801L92.0899,54.9901L77.0099,65.3001L91.2899,64.4301L25.9399,49.9401Z" fill="#2D8CFF" fillOpacity={0.75} />
      {/* Wave accent lines */}
      <g opacity={0.55}>
        <path d="M82.0602,49.9399L15.9102,54.9899" fill="none" stroke="#A2CCFF" strokeWidth="0.8" />
        <path d="M30.9899,65.3001L20.6699,43.0801" fill="none" stroke="#A2CCFF" strokeWidth="0.8" />
        <path d="M25.9399,49.9399L92.0899,54.9899" fill="none" stroke="#A2CCFF" strokeWidth="0.8" />
        <path d="M77.0098,65.3001L87.3298,43.0801" fill="none" stroke="#A2CCFF" strokeWidth="0.8" />
      </g>
      {/* Wave outlines */}
      <path d="M82.0602,49.9401L20.6702,43.0801L15.9102,54.9901L30.9902,65.3001L16.7102,64.4301L82.0602,49.9401Z" fill="none" stroke="#A2CCFF" strokeWidth="0.9" strokeOpacity={0.5} />
      <path d="M25.9399,49.9401L87.3299,43.0801L92.0899,54.9901L77.0099,65.3001L91.2899,64.4301L25.9399,49.9401Z" fill="none" stroke="#A2CCFF" strokeWidth="0.9" strokeOpacity={0.5} />
      {/* Diamond shapes */}
      <path d="M51.3598,43.9502L53.4098,46.5102L51.3598,49.0702L49.3198,46.5102L51.3598,43.9502Z" fill="#A2CCFF" fillOpacity={0.85} />
      <path d="M18.2902,46.4702L20.3402,49.0302L18.2902,51.5902L16.2402,49.0302L18.2902,46.4702Z" fill="#A2CCFF" fillOpacity={0.85} />
      <path d="M56.6398,43.9502L58.6798,46.5102L56.6398,49.0702L54.5898,46.5102L56.6398,43.9502Z" fill="#A2CCFF" fillOpacity={0.85} />
      <path d="M89.7102,46.4702L91.7602,49.0302L89.7102,51.5902L87.6602,49.0302L89.7102,46.4702Z" fill="#A2CCFF" fillOpacity={0.85} />
      {/* Triangular accents */}
      <path d="M79.5102,47.5998L26.2202,36.3398L72.6302,42.9598L79.5102,47.5998Z" fill="#2D8CFF" />
      <path d="M28.4902,47.5998L81.7802,36.3398L35.3702,42.9598L28.4902,47.5998Z" fill="#2D8CFF" />
      <path d="M67.5699,40.7102L38.9199,31.1802L57.4599,38.4702L67.5699,40.7102Z" fill="#2D8CFF" />
      <path d="M40.4302,40.7102L69.0802,31.1802L50.5402,38.4702L40.4302,40.7102Z" fill="#2D8CFF" />
      {/* Top fin */}
      <path d="M49.2402,39.11C52.4136,34.6166,54.0002,27.74,54.0002,18.48C54.0002,27.74,55.5869,34.6166,58.7602,39.11H49.2402Z" fill="#2D8CFF" />
      <path d="M49.2402,39.11C52.4136,34.6166,54.0002,27.74,54.0002,18.48C54.0002,27.74,55.5869,34.6166,58.7602,39.11H49.2402Z" fill="none" stroke="#A2CCFF" strokeWidth="0.8" strokeOpacity={0.65} />
      {/* Small triangle outlines */}
      <path d="M67.5699,40.7102L38.9199,31.1802L57.4599,38.4702L67.5699,40.7102Z" fill="none" stroke="#A2CCFF" strokeWidth="0.7" strokeOpacity={0.55} />
      <path d="M40.4302,40.7102L69.0802,31.1802L50.5402,38.4702L40.4302,40.7102Z" fill="none" stroke="#A2CCFF" strokeWidth="0.7" strokeOpacity={0.55} />
      {/* Crown glow */}
      <path d="M53.9998,26.1598C58.2414,26.1598,61.6798,22.7214,61.6798,18.4798C61.6798,14.2383,58.2414,10.7998,53.9998,10.7998C49.7583,10.7998,46.3198,14.2383,46.3198,18.4798C46.3198,22.7214,49.7583,26.1598,53.9998,26.1598Z" fill="#A2CCFF" fillOpacity={0.22} />
      {/* Crown circle */}
      <path d="M54.0002,23.2802C56.6512,23.2802,58.8002,21.1311,58.8002,18.4802C58.8002,15.8292,56.6512,13.6802,54.0002,13.6802C51.3492,13.6802,49.2002,15.8292,49.2002,18.4802C49.2002,21.1311,51.3492,23.2802,54.0002,23.2802Z" fill="#A2CCFF" />
      {/* Crown white dot */}
      <path d="M52.7999,18.7198C53.5952,18.7198,54.2399,18.0751,54.2399,17.2798C54.2399,16.4846,53.5952,15.8398,52.7999,15.8398C52.0046,15.8398,51.3599,16.4846,51.3599,17.2798C51.3599,18.0751,52.0046,18.7198,52.7999,18.7198Z" fill="#FFFFFF" fillOpacity={0.7} />
      {/* Bottom accents */}
      <path d="M47.87,116.7L39.27,123.35L36.21,112.91L47.87,116.7Z" fill="#2D8CFF" />
      <path d="M71.7899,112.91L68.7299,123.35L60.1299,116.7L71.7899,112.91Z" fill="#2D8CFF" />
      {/* Bottom drops */}
      <path d="M39.2701,133.27C40.8607,133.27,42.1501,131.336,42.1501,128.95C42.1501,126.564,40.8607,124.63,39.2701,124.63C37.6796,124.63,36.3901,126.564,36.3901,128.95C36.3901,131.336,37.6796,133.27,39.2701,133.27Z" fill="#A2CCFF" fillOpacity={0.9} />
      <path d="M68.7301,133.27C70.3207,133.27,71.6101,131.336,71.6101,128.95C71.6101,126.564,70.3207,124.63,68.7301,124.63C67.1395,124.63,65.8501,126.564,65.8501,128.95C65.8501,131.336,67.1395,133.27,68.7301,133.27Z" fill="#A2CCFF" fillOpacity={0.9} />
      {/* Bottom badge */}
      <path d="M53.9999,131.44C57.3578,131.44,60.0799,128.718,60.0799,125.36C60.0799,122.002,57.3578,119.28,53.9999,119.28C50.642,119.28,47.9199,122.002,47.9199,125.36C47.9199,128.718,50.642,131.44,53.9999,131.44Z" fill="#0A3D7A" stroke="#2D8CFF" strokeWidth="1" />
      {/* Badge anchor */}
      <path d="M49.7402,126.49H58.2602V125.36L56.1302,122.91L54.6402,124.98L54.0002,121.59L53.3602,124.98L51.8702,122.91L49.7402,125.36V126.49Z" fill="#A2CCFF" fillOpacity={0.85} />
      {/* Star dots */}
      <path d="M33.2102,34.6899C33.9171,34.6899,34.4902,34.1168,34.4902,33.4099C34.4902,32.703,33.9171,32.1299,33.2102,32.1299C32.5033,32.1299,31.9302,32.703,31.9302,33.4099C31.9302,34.1168,32.5033,34.6899,33.2102,34.6899Z" fill="#A2CCFF" fillOpacity={0.6} />
      <path d="M52.2502,29.1601C52.9571,29.1601,53.5302,28.587,53.5302,27.8801C53.5302,27.1732,52.9571,26.6001,52.2502,26.6001C51.5433,26.6001,50.9702,27.1732,50.9702,27.8801C50.9702,28.587,51.5433,29.1601,52.2502,29.1601Z" fill="#A2CCFF" fillOpacity={0.54} />
      <path d="M70.8298,33.04C71.5367,33.04,72.1098,32.4669,72.1098,31.76C72.1098,31.0531,71.5367,30.48,70.8298,30.48C70.1229,30.48,69.5498,31.0531,69.5498,31.76C69.5498,32.4669,70.1229,33.04,70.8298,33.04Z" fill="#A2CCFF" fillOpacity={0.48} />
      <path d="M17.8601,43.1401C18.567,43.1401,19.1401,42.567,19.1401,41.8601C19.1401,41.1532,18.567,40.5801,17.8601,40.5801C17.1532,40.5801,16.5801,41.1532,16.5801,41.8601C16.5801,42.567,17.1532,43.1401,17.8601,43.1401Z" fill="#A2CCFF" fillOpacity={0.36} />
    </svg>
  )
}

/**
 * avatar_frame_fluente — green leaf frame (106×127 viewBox)
 * Ring center ≈ (53, 71) → top: -8px at width=48
 */
function FrameFluente() {
  return (
    <svg
      viewBox="0 0 106 127"
      width="48"
      className="absolute pointer-events-none"
      style={{ top: '-8px', left: 0, overflow: 'visible' }}
    >
      {/* Ghost ring */}
      <path
        d="M52.9998,110.68C74.9145,110.68,92.6798,92.9145,92.6798,70.9998C92.6798,49.0852,74.9145,31.3198,52.9998,31.3198C31.0852,31.3198,13.3198,49.0852,13.3198,70.9998C13.3198,92.9145,31.0852,110.68,52.9998,110.68Z"
        fill="none" stroke="#00AA4F" strokeWidth="14.08" strokeOpacity={0.28}
      />
      {/* Main green ring */}
      <path
        d="M52.9998,110.68C74.9145,110.68,92.6798,92.9145,92.6798,70.9998C92.6798,49.0852,74.9145,31.3198,52.9998,31.3198C31.0852,31.3198,13.3198,49.0852,13.3198,70.9998C13.3198,92.9145,31.0852,110.68,52.9998,110.68Z"
        fill="none" stroke="#00AA4F" strokeWidth="3.52"
      />
      {/* Left leaf dark base */}
      <path d="M17.6402,52.9898C-2.19977,44.2598,26.0202,55.9198,14.9102,39.2598C22.0502,62.2698,30.7002,21.8098,39.4302,33.7098L17.6402,52.9898Z" fill="#005C2B" />
      {/* Right leaf dark base */}
      <path d="M88.3598,52.9898C108.2,44.2598,79.9798,55.9198,91.0898,39.2598C83.9498,62.2698,75.2998,21.8098,66.5698,33.7098L88.3598,52.9898Z" fill="#005C2B" />
      {/* Left leaf green */}
      <path d="M17.6402,52.9898C-2.19977,44.2598,26.0202,55.9198,14.9102,39.2598C22.0502,62.2698,30.7002,21.8098,39.4302,33.7098L17.6402,52.9898Z" fill="#00AA4F" fillOpacity={0.78} />
      {/* Right leaf green */}
      <path d="M88.3598,52.9898C108.2,44.2598,79.9798,55.9198,91.0898,39.2598C83.9498,62.2698,75.2998,21.8098,66.5698,33.7098L88.3598,52.9898Z" fill="#00AA4F" fillOpacity={0.78} />
      {/* Left leaf outline */}
      <path d="M17.6402,52.9898C-2.19977,44.2598,26.0202,55.9198,14.9102,39.2598C22.0502,62.2698,30.7002,21.8098,39.4302,33.7098L17.6402,52.9898Z" fill="none" stroke="#00FF7A" strokeWidth="0.8" strokeOpacity={0.55} />
      {/* Right leaf outline */}
      <path d="M88.3598,52.9898C108.2,44.2598,79.9798,55.9198,91.0898,39.2598C83.9498,62.2698,75.2998,21.8098,66.5698,33.7098L88.3598,52.9898Z" fill="none" stroke="#00FF7A" strokeWidth="0.8" strokeOpacity={0.55} />
      {/* Leaf veins */}
      <path d="M30.3998,47.59C30.1265,51.5567,27.3431,50.3667,22.0498,44.02" fill="none" stroke="#00FF7A" strokeWidth="0.8" strokeOpacity={0.55} />
      <path d="M32.3702,55.9198C29.1902,52.2198,26.5435,51.9564,24.4302,55.1298" fill="none" stroke="#00FF7A" strokeWidth="0.65" strokeOpacity={0.4} />
      <path d="M75.6001,47.59C75.8734,51.5567,78.6568,50.3667,83.9501,44.02" fill="none" stroke="#00FF7A" strokeWidth="0.8" strokeOpacity={0.55} />
      <path d="M73.6299,55.9198C76.8099,52.2198,79.4566,51.9564,81.5699,55.1298" fill="none" stroke="#00FF7A" strokeWidth="0.65" strokeOpacity={0.4} />
      {/* Bottom accents */}
      <path d="M46.1099,110.08C46.1099,125.16,45.0599,105.92,45.0599,113.85L36.8599,107.25L46.1099,110.08Z" fill="#00AA4F" fillOpacity={0.9} />
      <path d="M69.1401,107.25C69.1401,122.33,60.9401,105.92,60.9401,113.85L59.8901,110.08L69.1401,107.25Z" fill="#00AA4F" fillOpacity={0.9} />
      {/* Bottom accent outlines */}
      <path d="M46.1099,110.08C46.1099,125.16,45.0599,105.92,45.0599,113.85L36.8599,107.25L46.1099,110.08Z" fill="none" stroke="#00FF7A" strokeWidth="0.7" strokeOpacity={0.5} />
      <path d="M69.1401,107.25C69.1401,122.33,60.9401,105.92,60.9401,113.85L59.8901,110.08L69.1401,107.25Z" fill="none" stroke="#00FF7A" strokeWidth="0.7" strokeOpacity={0.5} />
      {/* Bottom glow */}
      <path d="M53,126.04C57.9485,126.04,61.96,122.029,61.96,117.08C61.96,112.132,57.9485,108.12,53,108.12C48.0516,108.12,44.04,112.132,44.04,117.08C44.04,122.029,48.0516,126.04,53,126.04Z" fill="#00FF7A" fillOpacity={0.2} />
      {/* Bottom dark circle */}
      <path d="M53.0002,122.9C56.2145,122.9,58.8202,120.294,58.8202,117.08C58.8202,113.865,56.2145,111.26,53.0002,111.26C49.7859,111.26,47.1802,113.865,47.1802,117.08C47.1802,120.294,49.7859,122.9,53.0002,122.9Z" fill="#00AA4F" />
      {/* Bottom bright circle */}
      <path d="M53,121.56C55.4743,121.56,57.48,119.554,57.48,117.08C57.48,114.606,55.4743,112.6,53,112.6C50.5258,112.6,48.52,114.606,48.52,117.08C48.52,119.554,50.5258,121.56,53,121.56Z" fill="#00FF7A" />
      {/* Star dots */}
      <path d="M63.0598,24.8702C63.7336,24.8702,64.2798,24.324,64.2798,23.6502C64.2798,22.9764,63.7336,22.4302,63.0598,22.4302C62.3861,22.4302,61.8398,22.9764,61.8398,23.6502C61.8398,24.324,62.3861,24.8702,63.0598,24.8702Z" fill="#00FF7A" fillOpacity={0.75} />
      <path d="M46.1399,23.42C46.8137,23.42,47.3599,22.8738,47.3599,22.2C47.3599,21.5262,46.8137,20.98,46.1399,20.98C45.4661,20.98,44.9199,21.5262,44.9199,22.2C44.9199,22.8738,45.4661,23.42,46.1399,23.42Z" fill="#00FF7A" fillOpacity={0.75} />
      <path d="M59.74,24.2798C60.4138,24.2798,60.96,23.7336,60.96,23.0598C60.96,22.3861,60.4138,21.8398,59.74,21.8398C59.0662,21.8398,58.52,22.3861,58.52,23.0598C58.52,23.7336,59.0662,24.2798,59.74,24.2798Z" fill="#00FF7A" fillOpacity={0.75} />
      <path d="M76.3401,28.3199C77.0139,28.3199,77.5601,27.7737,77.5601,27.0999C77.5601,26.4261,77.0139,25.8799,76.3401,25.8799C75.6663,25.8799,75.1201,26.4261,75.1201,27.0999C75.1201,27.7737,75.6663,28.3199,76.3401,28.3199Z" fill="#00FF7A" fillOpacity={0.75} />
    </svg>
  )
}

/* ─── Letter color per frame type ─── */
const FRAME_LETTER_COLOR: Record<FrameType, string> = {
  fluente:   '#00FF7A',
  nativo:    '#2D8CFF',
  aprendiz:  '#F5C842',
  iniciante: '#9CA3AF',
}

/* ─── Participant tile ─── */
function ParticipantTile({ p, speaking }: { p: Participant; speaking: boolean }) {
  if (p.waiting) {
    return (
      <div
        className="relative rounded-xl flex flex-col items-center justify-center"
        style={{ backgroundColor: p.tileBg, border: '1px dashed rgba(255,255,255,0.15)' }}
      >
        <span className="text-white/20 text-lg">+</span>
        <span className="text-white/20 text-[8px] mt-0.5 absolute bottom-1 left-2">Aguardando</span>
      </div>
    )
  }

  return (
    <div
      className="relative rounded-xl flex flex-col items-center justify-center"
      style={{
        backgroundColor: p.tileBg,
        border: speaking ? '2px solid #3b82f6' : '1px solid rgba(255,255,255,0.05)',
        zIndex: speaking ? 2 : 1,
      }}
    >
      {/* Animated background glow when speaking */}
      {speaking && (
        <div className="absolute inset-0 rounded-xl bg-blue-500/5 animate-pulse" />
      )}

      {/* Frame + avatar area — overflow visible so decorations extend */}
      <div className="relative w-12 h-12 flex items-center justify-center">
        {/* Ornamental frame */}
        {p.frame === 'fluente'   && <FrameFluente />}
        {p.frame === 'aprendiz'  && <FrameAprendiz />}
        {p.frame === 'nativo'    && <FrameNativo />}
        {p.frame === 'iniciante' && <FrameIniciante />}

        {/* Avatar: photo (camera open) or letter (camera off) */}
        <div
          className="relative w-8 h-8 rounded-full overflow-hidden z-10 flex items-center justify-center"
          style={{ backgroundColor: p.avatar ? 'transparent' : p.tileBg }}
        >
          {p.avatar ? (
            <img src={p.avatar} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            <span className="font-bold text-sm" style={{ color: FRAME_LETTER_COLOR[p.frame] }}>
              {p.letter}
            </span>
          )}
        </div>
      </div>

      {/* Name bottom-left */}
      <span className="absolute bottom-1 left-1.5 text-white/80 text-[8px] font-medium truncate max-w-[50%]">
        {p.name}
      </span>

      {/* Mic icon bottom-right */}
      <span className={`absolute bottom-1 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center z-10 ${p.muted ? 'bg-red-500' : 'bg-blue-500'}`}>
        {p.muted ? (
          <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
            <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M3 3l18 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        ) : (
          <svg width="7" height="7" viewBox="0 0 24 24" fill="none">
            <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" fill="white" />
            <path d="M19 10v2a7 7 0 01-14 0v-2" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
          </svg>
        )}
      </span>
    </div>
  )
}

/* ─── Bottom action bar ─── */
function BottomBar() {
  return (
    <div className="flex-none flex justify-around items-center px-3 py-2 border-t border-white/5" style={{ backgroundColor: '#060c18' }}>
      <button className="flex flex-col items-center gap-0.5">
        <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M12 1a3 3 0 00-3 3v5m6 0V4a3 3 0 00-3-3zM19 10a7 7 0 01-1.5 4.4M5 10a7 7 0 007 7" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </span>
        <span className="text-red-400 text-[7px]">Microfone</span>
      </button>

      <button className="flex flex-col items-center gap-0.5">
        <span className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <line x1="2" y1="2" x2="22" y2="22" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M15 10l4.553-2.548A1 1 0 0121 8.382v7.236a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </span>
        <span className="text-red-400 text-[7px]">Câmera</span>
      </button>

      <button className="flex flex-col items-center gap-0.5 relative">
        <span className="w-8 h-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-blue-500 text-[7px] text-white font-bold flex items-center justify-center">5</span>
        <span className="text-white/50 text-[7px]">Pessoas</span>
      </button>

      <button className="flex flex-col items-center gap-0.5">
        <span className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-red-400 text-[7px]">Sair</span>
      </button>
    </div>
  )
}

/* ─── Realistic phone shell ─── */
function PhoneShell({ children, width, height }: { children: React.ReactNode; width: number; height: number }) {
  const bezel = 8
  const outerR = 46
  const innerR = 38
  const btn = (extra: React.CSSProperties) => ({
    position: 'absolute' as const,
    width: 3,
    background: 'linear-gradient(180deg, #3c3c42, #26262c)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.4)',
    borderRadius: 2,
    ...extra,
  })

  return (
    <div className="relative" style={{ width: width + bezel * 2, height: height + bezel * 2 }}>
      {/* Body */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: outerR,
          background: 'linear-gradient(160deg, #313136 0%, #1d1d22 55%, #29292f 100%)',
          boxShadow: [
            '0 0 0 1px rgba(255,255,255,0.14)',
            'inset 0 0 0 1px rgba(255,255,255,0.06)',
            '0 70px 140px rgba(0,0,0,0.85)',
            '0 35px 70px rgba(0,0,0,0.55)',
            '0 0 120px rgba(99,102,241,0.10)',
          ].join(','),
        }}
      />

      {/* Left: silent switch */}
      <div style={btn({ left: -3, top: '10%', height: '3.5%' })} />
      {/* Left: volume up */}
      <div style={btn({ left: -3, top: '17%', height: '7%' })} />
      {/* Left: volume down */}
      <div style={btn({ left: -3, top: '27%', height: '7%' })} />
      {/* Right: power */}
      <div style={btn({ right: -3, top: '22%', height: '11%' })} />

      {/* Screen — inset shadow gives "pressed-in" depth */}
      <div
        className="absolute overflow-hidden"
        style={{
          inset: bezel,
          borderRadius: innerR,
          background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07), inset 0 2px 10px rgba(0,0,0,0.7)',
        }}
      >
        {/* Dynamic island */}
        <div
          className="absolute z-20"
          style={{
            top: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            width: Math.round(width * 0.28),
            height: 10,
            background: '#000',
            borderRadius: 999,
          }}
        />
        {children}
        {/* Glass glare — subtle diagonal highlight over screen */}
        <div
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            borderRadius: innerR,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, transparent 38%)',
          }}
        />
      </div>

      {/* Body top-edge shine */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '15%',
          right: '15%',
          height: 1,
          borderRadius: 999,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
        }}
      />
    </div>
  )
}

/* ─── Secondary phone — real app screenshot ─── */
function SecondaryPhone() {
  // screen-rooms-list.png: 2122×2250 dual-mode export (dark left = rooms, light right).
  // The Figma export includes a "DARK" mode label above the phone mockup (~top 12% of image).
  // Fix: make the img 16% taller than the container with marginTop:-16% so overflow:hidden
  // clips away the label artifact and shows the actual app content.
  return (
    <div className="w-full h-full overflow-hidden" style={{ background: '#090f1d' }}>
      <img
        src="/figma-screens/screen-rooms-list.png"
        alt="Safe 4 Talk — Salas ao vivo"
        style={{
          display: 'block',
          width: '100%',
          height: 'calc(100% + 54px)',
          marginTop: '-54px',
          objectFit: 'cover',
          objectPosition: 'left top',
        }}
      />
    </div>
  )
}

/* ─── App Mockup ─── */
function AppMockup() {
  const [speakingIdx, setSpeakingIdx] = useState(0)
  const seqPosRef = useRef(0)
  const [timer, setTimer] = useState(872)

  useEffect(() => {
    const iv = setInterval(() => {
      seqPosRef.current = (seqPosRef.current + 1) % SPEAKING_SEQUENCE.length
      setSpeakingIdx(SPEAKING_SEQUENCE[seqPosRef.current])
    }, 1800)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const mins = String(Math.floor(timer / 60)).padStart(2, '0')
  const secs = String(timer % 60).padStart(2, '0')

  return (
    <div
      className="relative w-[270px] h-[580px] flex flex-col"
      style={{ backgroundColor: '#080e1c' }}
    >
      {/* Status bar */}
      <div className="flex-none flex justify-between items-center px-5 pt-3 pb-1">
        <span className="text-white/40 text-[10px] font-medium">9:41</span>
        <div className="w-20" />{/* spacer — PhoneShell renders the real Dynamic Island */}
        <div className="flex items-center gap-0.5">
          <svg width="13" height="9" viewBox="0 0 15 10" fill="none" className="opacity-40">
            <rect x="0" y="4" width="3" height="6" rx="0.5" fill="white" />
            <rect x="4" y="2" width="3" height="8" rx="0.5" fill="white" />
            <rect x="8" y="0" width="3" height="10" rx="0.5" fill="white" />
            <rect x="12" y="0" width="3" height="10" rx="0.5" fill="white" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Room header */}
      <div className="flex-none flex items-center gap-2 px-3 py-2">
        <button className="text-white/40 p-1">
          <ArrowLeft size={14} />
        </button>
        <div className="flex-1 text-center">
          <p className="text-[#3b82f6] text-xs font-bold leading-none">Only English</p>
          <p className="text-white/40 text-[8px] mt-0.5">Any Level · 5/10</p>
        </div>
        <span className="bg-[#1d4ed8] text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
          {mins}:{secs}
        </span>
        <div className="relative w-7 h-7">
          <span className="absolute inset-0 rounded-full border border-green-500 animate-ping opacity-40" />
          <span className="absolute inset-0 rounded-full border border-green-500 opacity-80" />
          <img src="https://i.pravatar.cc/40?img=12" alt="host"
            className="w-full h-full rounded-full object-cover border border-green-500" />
        </div>
      </div>

      <div className="h-px bg-white/5 mx-3" />

      {/* Participants grid 2×3 */}
      <div className="flex-1 grid grid-cols-2 gap-1 p-1.5" style={{ overflow: 'visible' }}>
        {PARTICIPANTS.map((p) => (
          <ParticipantTile key={p.id} p={p} speaking={speakingIdx === p.id && !p.waiting} />
        ))}
      </div>

      {/* Speaking label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speakingIdx}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex-none text-center py-1"
        >
          <span className="text-green-400 text-[8px] font-medium">
            🎙 {PARTICIPANTS[speakingIdx]?.name || ''} está falando…
          </span>
        </motion.div>
      </AnimatePresence>

      <BottomBar />
    </div>
  )
}

/* ─── Section ─── */
export function SiteHeader() {
  const { t } = useTranslation()

  return (
    <section id="site-header" className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0f1e]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.06)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-3 self-start bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <div className="flex -space-x-2">
                {SOCIAL_AVATARS.map((src, i) => (
                  <img key={i} src={src} alt="user"
                    className="w-7 h-7 rounded-full border-2 border-[#0a0f1e] object-cover" />
                ))}
              </div>
              <span className="text-slate-300 text-sm font-medium">+2.400 pessoas conversando agora</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight"
            >
              {t('site-header-start-one')}
              <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {t('site-header-start-two')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg text-slate-400 max-w-lg leading-relaxed"
            >
              {t('site-header-start-three')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="https://play.google.com/store/apps/details?id=br.com.safefortalk.android"
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent(Events.ClickPlayStore, { source: 'hero' })}
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-5 py-3 rounded-xl hover:bg-slate-100 transition-all font-semibold shadow-lg shadow-white/10"
              >
                <img src={GooglePlayIcon} alt="Google Play" className="w-8 h-8" />
                <div className="text-left">
                  <span className="text-[10px] leading-none block text-gray-500 uppercase tracking-wide">{t('site-header-google-one')}</span>
                  <span className="text-sm font-bold leading-none">{t('site-header-google-two')}</span>
                </div>
              </a>

              <a
                href="https://safe-for-talk-web.diginfrastructures.com/"
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackEvent(Events.ClickWebApp, { source: 'hero' })}
                className="inline-flex items-center gap-3 bg-white/10 border border-white/20 text-white px-5 py-3 rounded-xl hover:bg-white/15 transition-all font-semibold"
              >
                <Globe className="w-6 h-6 text-indigo-400" />
                <div className="text-left">
                  <span className="text-[10px] leading-none block text-slate-400 uppercase tracking-wide">{t('site-header-web-one')}</span>
                  <span className="text-sm font-bold leading-none">{t('site-header-web-two')}</span>
                </div>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 text-slate-500 text-sm"
            >
              <span>✓ Gratuito</span>
              <span>✓ Sem cartão</span>
              <span>✓ Android & Web</span>
            </motion.div>
          </div>

          {/* RIGHT: Two phone mockups */}
          <div className="hidden lg:flex justify-end items-end">
            {/* Wrapper — front phone is the anchor; back phone overflows left */}
            <div className="relative">

              {/* Back phone — rooms screenshot, tilted behind */}
              <motion.div
                initial={{ opacity: 0, x: -20, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: -7 }}
                transition={{ duration: 0.8, delay: 0.35 }}
                className="absolute bottom-0 z-0"
                style={{ right: '240px', transformOrigin: 'bottom right' }}
              >
                <PhoneShell width={200} height={430}>
                  <SecondaryPhone />
                </PhoneShell>
                {/* XP badge */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute -left-20 top-28 bg-[#0a0f1e] border border-white/10 rounded-2xl px-3 py-2 shadow-xl"
                >
                  <p className="text-white/40 text-[9px] uppercase tracking-wide">Vocabulário</p>
                  <p className="text-white text-xs font-bold">📚 3 palavras hoje</p>
                  <p className="text-indigo-400 text-[9px]">+120 XP ganhos</p>
                </motion.div>
              </motion.div>

              {/* Front phone — animated live room */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative z-10"
              >
                <PhoneShell width={270} height={580}>
                  <AppMockup />
                </PhoneShell>

                {/* Live badge — overlaps bottom-right of phone (intentional floating chip) */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7 }}
                  className="absolute right-4 -bottom-4 bg-[#0a0f1e] border border-white/10 rounded-2xl px-3 py-2 shadow-xl min-w-[120px]"
                >
                  <p className="text-white/40 text-[9px] uppercase tracking-wide">Ao vivo</p>
                  <p className="text-white text-xs font-bold">🎙 Falando agora</p>
                  <p className="text-indigo-400 text-[9px]">Áudio em tempo real</p>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none" />
    </section>
  )
}
