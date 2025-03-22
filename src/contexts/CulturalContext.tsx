
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

// Define types
type RegionType = 'gulf' | 'levant' | 'north-africa' | 'egypt' | 'global';
type ModestyLevelType = 1 | 2 | 3 | 4 | 5;
type DirectionType = 'rtl' | 'ltr';

// Cultural context type definition
interface CulturalContextType {
  direction: DirectionType;
  locale: string;
  modestyLevel: ModestyLevelType;
  religiousPreference: 'conservative' | 'moderate' | 'liberal';
  region: RegionType;
  setLocale: (locale: string) => void;
  setModestyLevel: (level: ModestyLevelType) => void;
  setReligiousPreference: (preference: 'conservative' | 'moderate' | 'liberal') => void;
  setRegion: (region: RegionType) => void;
  formatDate: (date: Date) => string;
  formatCurrency: (amount: number) => string;
  translate: (key: string) => string;
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    patterns: {
      primary: string;
      secondary: string;
    };
  };
}

// Create the context with a default value
export const CulturalContext = createContext<CulturalContextType>({
  direction: 'rtl',
  locale: 'ar',
  modestyLevel: 3,
  religiousPreference: 'moderate',
  region: 'gulf',
  setLocale: () => {},
  setModestyLevel: () => {},
  setReligiousPreference: () => {},
  setRegion: () => {},
  formatDate: () => '',
  formatCurrency: () => '',
  translate: () => '',
  theme: {
    colors: {
      primary: '#9b6dff',
      secondary: '#4fd1c5',
      accent: '#ffd166',
      background: '#ffffff',
      text: '#333333',
    },
    patterns: {
      primary: 'url(/patterns/arab-pattern.svg)',
      secondary: 'linear-gradient(45deg, rgba(155, 109, 255, 0.1), rgba(79, 209, 197, 0.1))',
    },
  },
});

// Provider component
export const CulturalProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<string>('ar');
  const [modestyLevel, setModestyLevel] = useState<ModestyLevelType>(3);
  const [religiousPreference, setReligiousPreference] = useState<'conservative' | 'moderate' | 'liberal'>('moderate');
  const [region, setRegion] = useState<RegionType>('gulf');

  // Derived direction based on locale
  const direction: DirectionType = locale === 'ar' ? 'rtl' : 'ltr';

  // Format date according to locale and cultural preferences
  const formatDate = (date: Date): string => {
    if (locale === 'ar') {
      // Here you might implement Hijri date conversion
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    }
    
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  // Format currency according to region
  const formatCurrency = (amount: number): string => {
    const currencies: Record<RegionType, string> = {
      'gulf': 'SAR',
      'levant': 'JOD',
      'north-africa': 'MAD',
      'egypt': 'EGP',
      'global': 'USD',
    };

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencies[region],
    }).format(amount);
  };

  // Simple translation function (would be more sophisticated in a real app)
  const translate = (key: string): string => {
    // Placeholder for translation logic
    return key;
  };

  // Theme values based on cultural preferences
  const theme = useMemo(() => {
    // Adjust colors based on modesty level and religious preference
    const primaryColor = modestyLevel > 3 ? '#7559cc' : '#9b6dff';
    const secondaryColor = religiousPreference === 'conservative' ? '#2c7a7b' : '#4fd1c5';
    
    return {
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        accent: '#ffd166',
        background: '#ffffff',
        text: '#333333',
      },
      patterns: {
        primary: 'url(/patterns/arab-pattern.svg)',
        secondary: 'linear-gradient(45deg, rgba(155, 109, 255, 0.1), rgba(79, 209, 197, 0.1))',
      },
    };
  }, [modestyLevel, religiousPreference]);

  // Value object for the context
  const contextValue: CulturalContextType = {
    direction,
    locale,
    modestyLevel,
    religiousPreference,
    region,
    setLocale,
    setModestyLevel,
    setReligiousPreference,
    setRegion,
    formatDate,
    formatCurrency,
    translate,
    theme,
  };

  return (
    <CulturalContext.Provider value={contextValue}>
      {children}
    </CulturalContext.Provider>
  );
};

// Custom hook for using the cultural context
export const useCultural = () => useContext(CulturalContext);
