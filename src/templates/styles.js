export function getGlobalStyles() {
  return `@import "tailwindcss";
@import "tw-animate-css";

@theme inline {
  --radius: 0.625rem;
  --font-sans: "Inter", sans-serif;
  
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}

@layer base {
  :root {
    --background: 255 255 255;
    --foreground: 10 10 10;
    --card: 255 255 255;
    --card-foreground: 10 10 10;
    --popover: 255 255 255;
    --popover-foreground: 10 10 10;
    --primary: 20 20 20;
    --primary-foreground: 250 250 250;
    --secondary: 240 240 240;
    --secondary-foreground: 20 20 20;
    --muted: 240 240 240;
    --muted-foreground: 100 100 100;
    --accent: 240 240 240;
    --accent-foreground: 20 20 20;
    --destructive: 220 50 50;
    --destructive-foreground: 250 250 250;
    --border: 220 220 220;
    --input: 220 220 220;
    --ring: 20 20 20;
    --radius: 0.5rem;
  }

  .dark {
    --background: 10 10 10;
    --foreground: 250 250 250;
    --card: 10 10 10;
    --card-foreground: 250 250 250;
    --popover: 10 10 10;
    --popover-foreground: 250 250 250;
    --primary: 250 250 250;
    --primary-foreground: 20 20 20;
    --secondary: 40 40 40;
    --secondary-foreground: 250 250 250;
    --muted: 40 40 40;
    --muted-foreground: 160 160 160;
    --accent: 40 40 40;
    --accent-foreground: 250 250 250;
    --destructive: 120 40 40;
    --destructive-foreground: 250 250 250;
    --border: 40 40 40;
    --input: 40 40 40;
    --ring: 200 200 200;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
`;
}
