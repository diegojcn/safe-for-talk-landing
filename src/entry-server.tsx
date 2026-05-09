import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import App from './App'
import './i18n'

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {}

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  )

  const { helmet } = helmetContext

  return {
    html,
    head: helmet
      ? `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
      : '',
  }
}
