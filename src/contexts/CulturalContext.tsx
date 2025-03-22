
import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';

// Types for our cultural context
export type MadhhabType = 'hanafi' | 'maliki' | 'shafi' | 'hanbali' | 'unspecified';
export type RegionType = 'gulf' | 'levant' | 'north-africa' | 'general';
export type ModestyLevelType = 1 | 2 | 3 | 4 | 5;
export type DialectType = 'MSA' | 'Egyptian' | 'Gulf' | 'Levantine' | 'Maghrebi';

interface CulturalContextType {
  direction: 'rtl' | 'ltr';
  locale: string;
  modestyLevel: ModestyLevelType;
  religiousPreference: 'conservative' | 'moderate' | 'liberal';
  region: RegionType;
  madhhab: MadhhabType;
  dialect: DialectType;
  setLocale: (locale: string) => void;
  setModestyLevel: (level: ModestyLevelType) => void;
  setReligiousPreference: (pref: 'conservative' | 'moderate' | 'liberal') => void;
  setRegion: (region: RegionType) => void;
  setMadhhab: (madhhab: MadhhabType) => void;
  setDialect: (dialect: DialectType) => void;
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      halal: string;
      haram: string;
    };
  };
}

// Create the cultural context with default values
const CulturalContext = createContext<CulturalContextType | undefined>(undefined);

// Color generator based on preferences
const generateCulturalColors = (modestyLevel: ModestyLevelType, religiousPreference: string) => {
  // Adjust color saturation based on modesty level
  const primaryColors = {
    conservative: {
      primary: '#6b5f9a', // More subdued purple
      secondary: '#3ab4a6', // Subdued teal
      accent: '#c0935c', // Subdued gold
    },
    moderate: {
      primary: '#9b87f5', // Standard purple
      secondary: '#3fc2b5', // Standard teal
      accent: '#d4af37', // Standard gold
    },
    liberal: {
      primary: '#ad97ff', // Vibrant purple
      secondary: '#40d9ca', // Vibrant teal
      accent: '#ffc857', // Vibrant gold
    }
  };

  // Religious color indicators
  const religiousColors = {
    halal: religiousPreference === 'conservative' ? '#2e7d32' : '#66BB6A',
    haram: religiousPreference === 'conservative' ? '#c62828' : '#EF5350',
  };

  return {
    ...primaryColors[religiousPreference as keyof typeof primaryColors],
    ...religiousColors
  };
};

// Provider component
export const CulturalProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [locale, setLocale] = useState<string>('ar');
  const [modestyLevel, setModestyLevel] = useState<ModestyLevelType>(3);
  const [religiousPreference, setReligiousPreference] = useState<'conservative' | 'moderate' | 'liberal'>('moderate');
  const [region, setRegion] = useState<RegionType>('general');
  const [madhhab, setMadhhab] = useState<MadhhabType>('unspecified');
  const [dialect, setDialect] = useState<DialectType>('MSA');

  // Memoize the colors to avoid recalculating on every render
  const colors = useMemo(
    () => generateCulturalColors(modestyLevel, religiousPreference),
    [modestyLevel, religiousPreference]
  );

  // Memoize the full context value
  const contextValue = useMemo(
    () => ({
      direction: locale === 'ar' ? 'rtl' : 'ltr',
      locale,
      modestyLevel,
      religiousPreference,
      region,
      madhhab,
      dialect,
      setLocale,
      setModestyLevel,
      setReligiousPreference,
      setRegion,
      setMadhhab,
      setDialect,
      theme: {
        colors
      }
    }),
    [locale, modestyLevel, religiousPreference, region, madhhab, dialect, colors]
  );

  return (
    <CulturalContext.Provider value={contextValue}>
      <div dir={contextValue.direction} className={`cultural-root ${locale}`}>
        {children}
      </div>
    </CulturalContext.Provider>
  );
};

// Custom hook for using the cultural context
export const useCultural = () => {
  const context = useContext(CulturalContext);
  if (context === undefined) {
    throw new Error('useCultural must be used within a CulturalProvider');
  }
  return context;
};
