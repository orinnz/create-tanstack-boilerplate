import { Outlet, createRootRoute } from '@tanstack/react-router'
import { HeadContent, Scripts } from '@tanstack/react-router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary'
import { NotFound } from '../components/NotFound'
import appCss from '../styles/app.css?url'
import { seo } from '../utils/seo'
// {{I18N_IMPORTS}}

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
  // {{I18N_LOCALE_HOOK}}

  return (
    <QueryClientProvider client={queryClient}>
      <RootDocument // {{I18N_LOCALE_PROP}}
      >
        <Outlet />
      </RootDocument>
    </QueryClientProvider>
  )
}

function RootDocument({ children, locale }: { children: React.ReactNode, locale?: string }) {
  return (
    <html lang={locale}>
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
