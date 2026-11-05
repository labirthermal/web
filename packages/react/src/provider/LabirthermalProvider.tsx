import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { loadLabirRuntime } from "./runtime";
import type { LabirRuntime } from "./runtime";

export interface LabirthermalProviderProps {
  children: ReactNode;
  fallback?: ReactNode;
  errorFallback?: (error: Error) => ReactNode;
}

type InitializationState =
  | { status: "loading" }
  | { status: "ready"; runtime: LabirRuntime }
  | { status: "error"; error: Error };

export const LabirContext = createContext<LabirRuntime | null>(null);

export function LabirthermalProvider({
  children,
  fallback = null,
  errorFallback,
}: LabirthermalProviderProps) {
  const [state, setState] = useState<InitializationState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    loadLabirRuntime().then(
      (runtime) => {
        if (active) {
          setState({ status: "ready", runtime });
        }
      },
      (cause: unknown) => {
        if (active) {
          const error = cause instanceof Error
            ? cause
            : new Error("Failed to initialize LabIR webcomponents.", { cause });
          setState({ status: "error", error });
        }
      },
    );

    return () => {
      active = false;
    };
  }, []);

  if (state.status === "error") {
    if (errorFallback) {
      return errorFallback(state.error);
    }
    throw state.error;
  }

  if (state.status === "loading") {
    return fallback;
  }

  return <LabirContext.Provider value={state.runtime}>{children}</LabirContext.Provider>;
}
