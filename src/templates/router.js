export function getRouterCode(features) {
  return `import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen'
import { DefaultCatchBoundary } from './components/DefaultCatchBoundary'
import { NotFound } from './components/NotFound'
${features.includes('i18n') ? `import { deLocalizeUrl, localizeUrl } from './paraglide/runtime'` : ''}

export function createRouter() {
  const queryClient = new QueryClient()

  return createTanStackRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: NotFound,
    ${features.includes('i18n') ? `rewrite: {
      input: ({ url }) => deLocalizeUrl(url),
      output: ({ url }) => localizeUrl(url),
    },` : ''}
  })
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
`;
}

export function getRootRouteCode(features) {
  return `import { Outlet, createRootRoute } from '@tanstack/react-router'
import { HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
${features.includes('i18n') ? `import { getLocale } from '../paraglide/runtime'` : ''}

const queryClient = new QueryClient()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'TanStack Start Boilerplate',
        description: 'A modern web application built with TanStack Start.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: NotFound,
  component: RootComponent,
})

function RootComponent() {
  ${features.includes('i18n') ? `const currentLocale = getLocale()` : ''}

  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument ${features.includes('i18n') ? `locale={currentLocale}` : ''}>
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  )
}

function RootDocument({ children${features.includes('i18n') ? ', locale' : ''} }: { children: React.ReactNode${features.includes('i18n') ? ', locale: string' : ''} }) {
  return (
    <html${features.includes('i18n') ? ` lang={locale}` : ''}>
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
`;
}

export function getIndexRouteCode() {
  return `import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to TanStack Start! 🚀
        </h1>
        <p className="text-xl text-muted-foreground">
          Start building something amazing
        </p>
      </div>
    </div>
  )
}
`;
}
