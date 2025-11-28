import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId,
  });

  console.error(error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
          </div>
          <h3 className="font-semibold text-red-600 dark:text-red-500 text-xl leading-none tracking-tight">
            Something went wrong
          </h3>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="relative w-full rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-red-600 dark:[&>svg]:text-red-500">
            <AlertTriangle className="h-4 w-4" />
            <h5 className="mb-1 font-medium leading-none tracking-tight text-red-600 dark:text-red-500">Error Details</h5>
            <div className="text-sm text-red-600/90 dark:text-red-500/90 [&_p]:leading-relaxed">
              <ErrorComponent error={error} />
            </div>
          </div>
          <p className="text-center text-muted-foreground text-sm">
            We apologize for the inconvenience. Please try refreshing the page
            or go back to continue.
          </p>
        </div>
        <div className="flex items-center p-6 pt-0 flex-col gap-2 sm:flex-row">
          <button
            onClick={() => {
              router.invalidate();
            }}
            className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </button>
          {isRoot ? (
            <Link 
              to="/"
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                window.history.back();
              }}
              className="flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
