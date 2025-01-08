"use client"

import { useState, useEffect } from "react";
import Dashboard from "./dashboard/page";

export default function Home() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) {
    // Optionally return a loader or null during SSR
    return null; // Avoid rendering until hydration is complete
  }

  return (
    <>
      <Dashboard />
    </>
  );
}
