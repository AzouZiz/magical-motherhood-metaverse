
import { FetusDevelopment } from '../types';

// Get detailed description for each week
export const getWeekDescription = (week: number): string => {
  const descriptions: Record<number, string> = {
    4: "يبدأ قلب الجنين في النبض وتتشكل الأعضاء الأساسية مثل الدماغ والعمود الفقري.",
    8: "يكتمل تشكل جميع الأعضاء الرئيسية، ويمكن ملاحظة حركة صغيرة للأطراف.",
    12: "يمكن للجنين أن يغلق أصابعه ويفتحها، كما تظهر ملامح الوجه بشكل أوضح.",
    16: "يكتمل نمو الأعضاء التناسلية ويمكن تحديد جنس الجنين، تظهر بصمات الأصابع.",
    20: "يمكن للأم الشعور بحركة الجنين، ويتطور نظام السمع لدى الجنين.",
    24: "تتكون الرئتين وتتطور، ويستطيع الجنين فتح عينيه والإستجابة للأصوات الخارجية.",
    28: "يستطيع الجنين التنفس ولديه فرصة للبقاء على قيد الحياة في حالة الولادة المبكرة.",
    32: "يزداد نمو الدماغ بسرعة، ويزداد وزن الجنين بشكل كبير.",
    36: "يكتمل نمو الرئتين، ويستعد الجنين للولادة.",
    40: "الجنين مكتمل النمو ومستعد للولادة."
  };
  
  // Find the closest week in the descriptions
  const closestWeek = Object.keys(descriptions)
    .map(w => parseInt(w))
    .reduce((prev, curr) => 
      Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev
    );
    
  return descriptions[closestWeek];
};

export const getFetusDevelopment = (week: number): FetusDevelopment => {
  const developmentStages = {
    size: week < 10 ? `${week * 0.5} سم` : `${Math.min(50, week * 1.2)} سم`,
    weight: week < 10 ? `${week * 3} جرام` : `${Math.min(3500, week * 30)} جرام`,
    highlights: [
      week < 8 ? "تشكل الأعضاء الرئيسية" : "نمو الأطراف والأصابع",
      week < 20 ? "تطور الدماغ والجهاز العصبي" : "نمو الشعر والأظافر",
      week > 25 ? "تطور الرئتين والجهاز التنفسي" : "تشكل ملامح الوجه"
    ],
    trimester: week <= 13 ? "الأول" : week <= 26 ? "الثاني" : "الثالث",
    description: getWeekDescription(week)
  };
  
  return developmentStages;
};

// تحديد صورة الجنين المناسبة حسب الأسبوع
export const getFetalImage = (week: number): string => {
  if (week <= 4) return "/images/fetus-week-4.jpg";
  if (week <= 8) return "/images/fetus-week-8.jpg";
  if (week <= 10) return "/images/fetus-week-10.jpg";
  if (week <= 12) return "/images/fetus-week-12.jpg";
  if (week <= 16) return "/images/fetus-week-16.jpg";
  if (week <= 20) return "/images/fetus-week-20.jpg";
  if (week <= 24) return "/images/fetus-week-24.jpg";
  if (week <= 28) return "/images/fetus-week-28.jpg";
  if (week <= 32) return "/images/fetus-week-32.jpg";
  return "/images/fetus-week-40.jpg";
};
