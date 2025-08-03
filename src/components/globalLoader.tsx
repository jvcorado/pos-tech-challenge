'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './loader';

export function GlobalLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 300); // tempo do loader visível
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <Loader /> : null;
}
