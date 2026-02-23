"use client";

import {
  QueryClient,
  QueryClientProvider as Base,
} from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export function QueryClientProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return <Base client={queryClient}>{children}</Base>;
}
