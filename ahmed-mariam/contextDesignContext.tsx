'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { LuxuryDesignEngine } from '@/lib/design-engine';

const DesignContext = createContext<any>(null);

export const DesignProvider = ({ children, coupleId }: { children: React.ReactNode, coupleId: string }) => {
  const [design, setDesign] = useState(null);

  useEffect(() => {
    // Generate the unique identity on server or client initialization
    const uniqueDesign = LuxuryDesignEngine.generateBespokeIdentity(coupleId);
    setDesign(uniqueDesign);
    
    // Inject dynamic CSS variables for colors
    if (uniqueDesign) {
      document.documentElement.style.setProperty('--color-primary', uniqueDesign.colors.primary);
      document.documentElement.style.setProperty('--color-secondary', uniqueDesign.colors.secondary);
      document.documentElement.style.setProperty('--color-text', uniqueDesign.colors.text);
      document.documentElement.style.setProperty('--color-bg', uniqueDesign.colors.background);
    }
  }, [coupleId]);

  if (!design) return null; // Or a highly luxurious loading state

  return (
    <DesignContext.Provider value={design}>
      <div className={`${design.typography.heading} ${design.typography.body} bg-[var(--color-bg)] text-[var(--color-text)] antialiased selection:bg-[var(--color-secondary)] selection:text-white`}>
        {children}
      </div>
    </DesignContext.Provider>
  );
};

export const useDesign = () => useContext(DesignContext);
