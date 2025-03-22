
import { useState, useEffect } from 'react';

type IslamicMonth = 
  | 'Muharram' 
  | 'Safar' 
  | 'Rabi al-Awwal' 
  | 'Rabi al-Thani' 
  | 'Jumada al-Awwal' 
  | 'Jumada al-Thani' 
  | 'Rajab' 
  | 'Shaban' 
  | 'Ramadan' 
  | 'Shawwal' 
  | 'Dhu al-Qadah' 
  | 'Dhu al-Hijjah';

interface IslamicDate {
  day: number;
  month: IslamicMonth;
  year: number;
  formatted: string;
}

interface UseIslamicDateReturn {
  gregorianDate: Date;
  islamicDate: IslamicDate | null;
  setGregorianDate: (date: Date) => void;
}

// A simplified implementation of Gregorian to Islamic date conversion
// In a production app, you would use a full-featured library
function convertToIslamicDate(gregorianDate: Date): IslamicDate {
  // This is a simplified conversion - in a real app you'd use a proper library
  // like hijri-js or moment-hijri for accurate conversion
  
  // For demo purposes, we'll use a rough approximation
  // The Islamic year is approximately 354.367 days
  const gregorianYear = gregorianDate.getFullYear();
  const gregorianMonth = gregorianDate.getMonth();
  const gregorianDay = gregorianDate.getDate();
  
  // Approximate calculation (for demo purposes only)
  const islamicYear = Math.floor((gregorianYear - 622) * (354.367 / 365.25));
  
  // Very simplistic month mapping (not accurate)
  const islamicMonthIndex = (gregorianMonth + 1) % 12;  
  const islamicMonths: IslamicMonth[] = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
  ];
  
  return {
    day: gregorianDay,
    month: islamicMonths[islamicMonthIndex],
    year: islamicYear,
    formatted: `${gregorianDay} ${islamicMonths[islamicMonthIndex]}, ${islamicYear} هـ`
  };
}

export function useIslamicDate(initialDate?: Date): UseIslamicDateReturn {
  const [gregorianDate, setGregorianDate] = useState<Date>(initialDate || new Date());
  const [islamicDate, setIslamicDate] = useState<IslamicDate | null>(null);
  
  useEffect(() => {
    setIslamicDate(convertToIslamicDate(gregorianDate));
  }, [gregorianDate]);
  
  return {
    gregorianDate,
    islamicDate,
    setGregorianDate
  };
}
