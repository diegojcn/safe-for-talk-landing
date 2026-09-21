declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number>
) {
  window.gtag?.('event', eventName, params)
}

export const Events = {
  // SiteHeader
  ClickPlayStore: 'click_download_playstore',
  ClickAppStore: 'click_download_appstore',
  ClickWebApp: 'click_open_webapp',
  // CTA
  ClickInstagram: 'click_social_instagram',
  ClickThreads: 'click_social_threads',
  ClickBackToTop: 'click_cta_back_to_top',
  // Navbar
  ClickNavCTA: 'click_nav_download_cta',
  // Features / Roadmap
  ViewFeatures: 'view_section_features',
  ViewRoadmap: 'view_section_roadmap',
  // Teacher public page (safe4talk.com/@handle) — the first step of the booking funnel.
  // Everything after the click is measured inside the app; until these existed, the step the
  // teacher actually controls (posting their link) was the only one nobody could see.
  ViewTeacherProfile: 'view_teacher_profile',
  ViewTeacherProfileUnavailable: 'view_teacher_profile_unavailable',
  ClickTeacherBook: 'click_teacher_book',
} as const
