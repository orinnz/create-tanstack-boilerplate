import { createFileRoute } from '@tanstack/react-router'

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
