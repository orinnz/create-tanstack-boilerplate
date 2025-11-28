import fs from "node:fs";
import path from "node:path";

export function createStateSetup(root, stateLibs = ["jotai"]) {
  fs.mkdirSync(path.join(root, "src/store"), { recursive: true });

  if (stateLibs.includes("jotai")) {
    fs.writeFileSync(
      path.join(root, "src/store/jotaiStore.ts"),
      `import { atom } from 'jotai'

export const countAtom = atom(0)
`,
    );
  }

  if (stateLibs.includes("zustand")) {
    fs.writeFileSync(
      path.join(root, "src/store/zustandStore.ts"),
      `import { create } from 'zustand'

type CounterState = {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
`,
    );
  }
}
