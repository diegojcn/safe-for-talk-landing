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
  ClickWebApp: 'click_open_webapp',
  // CTA
  ClickInstagram: 'click_social_instagram',
  ClickThreads: 'click_social_threads',
  ClickBackToTop: 'click_cta_back_to_top',
  // Features / Roadmap
  ViewFeatures: 'view_section_features',
  ViewRoadmap: 'view_section_roadmap',
} as const
