export function getClientCode() {
  return `import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/react-start'
import { createRouter } from './router'

const router = createRouter()

hydrateRoot(document, <StartClient router={router} />)
`;
}

export function getSSRCode(features) {
  return `import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createRouter } from './router'
${features.includes('i18n') ? `import { paraglideMiddleware } from './paraglide/server'` : ''}

const handler = createStartHandler({
  createRouter: () => createRouter(),
})(defaultStreamHandler)

export default {
  fetch: (request) => {
    ${features.includes('i18n') ? `return paraglideMiddleware(request, ({ request: req }) => handler.fetch(req))` : `return handler.fetch(request)`}
  }
}
`;
}
