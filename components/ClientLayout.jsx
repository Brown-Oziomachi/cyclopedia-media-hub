"use client";

import { Suspense } from "react";

export default function ClientLayout({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
