import type { ComponentType } from "react";

export function lazyRoute<T extends ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  return {
    Component: async () => (await factory()).default,
  };
}
