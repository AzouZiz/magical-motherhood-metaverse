
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Languages } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

// مجموعة اللغات المتاحة
const languages = [
  { code: 'ar', name: 'العربية' },
  { code: 'en', name: 'English' }
];

// نصوص الواجهة باللغة العربية والإنجليزية
const translations = {
  ar: {
    title: 'تسجيل دخول المشرف',
    description: 'أدخل بيانات تسجيل الدخول للوصول إلى لوحة التحكم',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'أدخل بريدك الإلكتروني',
    password: 'كلمة المرور',
    passwordPlaceholder: 'أدخل كلمة المرور',
    login: 'تسجيل الدخول',
    error: 'خطأ في البريد الإلكتروني أو كلمة المرور',
    backToHome: 'العودة إلى الصفحة الرئيسية',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    language: 'اللغة',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور'
  },
  en: {
    title: 'Admin Login',
    description: 'Enter your credentials to access the admin dashboard',
    email: 'Email',
    emailPlaceholder: 'Enter your email',
    password: 'Password',
    passwordPlaceholder: 'Enter your password',
    login: 'Login',
    error: 'Invalid email or password',
    backToHome: 'Back to Home',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    language: 'Language',
    showPassword: 'Show password',
    hidePassword: 'Hide password'
  }
};

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  
  // الحصول على النصوص حسب اللغة المحددة
  const t = translations[language as keyof typeof translations];

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مسجل دخوله بالفعل
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          // التحقق من دور المستخدم
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (data && (data.role === 'super' || data.role === 'helper')) {
            navigate('/admin');
          }
        }
      } catch (error) {
        console.error("فشل في التحقق من الجلسة:", error);
      }
    };
    
    checkSession();
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: language === 'ar' ? "حقول مطلوبة" : "Required fields",
        description: language === 'ar' 
          ? "يرجى إدخال البريد الإلكتروني وكلمة المرور" 
          : "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    setError(false);

    try {
      console.log("محاولة تسجيل الدخول للمستخدم:", email);
      
      // تسجيل الدخول باستخدام Supabase
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (loginError) {
        console.error("خطأ تسجيل الدخول:", loginError);
        throw loginError;
      }
      
      if (!data.user) {
        console.error("لم يتم العثور على المستخدم");
        throw new Error("User not found");
      }
      
      console.log("تم تسجيل الدخول بنجاح، يتم التحقق من دور المستخدم");
      
      // التحقق من دور المستخدم
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role, name')
        .eq('id', data.user.id)
        .maybeSingle();
        
      if (profileError) {
        console.error("خطأ في الحصول على ملف المستخدم:", profileError);
        throw profileError;
      }
      
      console.log("بيانات الملف الشخصي:", profileData);
      
      // التحقق من أن المستخدم مشرف
      if (profileData && (profileData.role === 'super' || profileData.role === 'helper')) {
        // إظهار رسالة نجاح
        toast({
          title: language === 'ar' ? "تم تسجيل الدخول بنجاح" : "Login successful",
          description: language === 'ar' 
            ? `مرحبًا بك في لوحة تحكم كيدمام، ${profileData.name || ''}` 
            : `Welcome to KidMam Admin Dashboard, ${profileData.name || ''}`,
        });
        
        // الانتقال إلى صفحة الإدارة
        navigate('/admin');
      } else {
        console.error("المستخدم ليس مشرفًا:", profileData);
        // المستخدم ليس مشرفًا
        await supabase.auth.signOut();
        throw new Error("User is not an admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(true);
      toast({
        title: language === 'ar' ? "خطأ في تسجيل الدخول" : "Login failed",
        description: language === 'ar' 
          ? "البريد الإلكتروني أو كلمة المرور غير صحيحة أو ليس لديك صلاحيات المشرف" 
          : "Invalid email or password, or you don't have admin privileges",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-kidmam-light/30 dark:bg-kidmam-dark/10 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border-kidmam-purple/20">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-amiri">{t.title}</CardTitle>
              <Select 
                value={language} 
                onValueChange={setLanguage}
              >
                <SelectTrigger className="w-[120px]">
                  <Languages className="h-4 w-4 ml-2" />
                  <SelectValue placeholder={t.language} />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                placeholder={t.emailPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={error ? "border-red-500" : ""}
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  placeholder={t.passwordPlaceholder}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={error ? "border-red-500" : ""}
                  dir="ltr"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? t.hidePassword : t.showPassword}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-kidmam-purple focus:ring-kidmam-purple"
                />
                <Label htmlFor="remember" className="text-sm font-normal">
                  {t.rememberMe}
                </Label>
              </div>
              <Button
                variant="link"
                className="text-sm text-kidmam-purple p-0 h-auto"
                onClick={() => toast({
                  title: language === 'ar' ? "قريباً" : "Coming Soon",
                  description: language === 'ar' 
                    ? "ستتوفر هذه الميزة قريباً" 
                    : "This feature will be available soon",
                })}
              >
                {t.forgotPassword}
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full bg-kidmam-purple hover:bg-kidmam-purple/90"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {language === 'ar' ? 'جاري التحميل...' : 'Loading...'}
                </span>
              ) : (
                t.login
              )}
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/')}
            >
              {t.backToHome}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
