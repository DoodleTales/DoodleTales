
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ContextType = {
  theme: string;
  setTheme: (value: string) => void;
};

const Context = createContext<ContextType | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('');

  return (
    <Context.Provider value={{ theme, setTheme }}>
      {children}
    </Context.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(Context);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}