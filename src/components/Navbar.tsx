
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon, Sun, Baby, Heart, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [darkMode, setDarkMode] = useState(false);
  const { toast } = useToast();

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
    document.documentElement.dir = language === 'ar' ? 'ltr' : 'rtl';
    toast({
      title: language === 'ar' ? 'Switched to English' : 'تم التحويل إلى العربية',
      description: language === 'ar' ? 'Language has been changed' : 'تم تغيير اللغة',
    });
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <Baby className="h-8 w-8 text-kidmam-purple" />
            <span className="font-amiri text-2xl font-bold gradient-text">كيدمام</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            <Link to="/" className="text-foreground hover:text-kidmam-purple transition">
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link to="/profile" className="text-foreground hover:text-kidmam-purple transition">
              {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </Link>
            <Link to="/virtual-world" className="text-foreground hover:text-kidmam-purple transition">
              {language === 'ar' ? 'العالم الافتراضي' : 'Virtual World'}
            </Link>
            <Link to="/community" className="text-foreground hover:text-kidmam-purple transition">
              {language === 'ar' ? 'المجتمع' : 'Community'}
            </Link>
            <Button 
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button className="bg-kidmam-purple hover:bg-kidmam-purple/90">
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3 rtl:space-x-reverse">
            <Button 
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={toggleLanguage}
            >
              <Globe className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="icon"
              onClick={toggleMenu}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3 space-y-3 animate-slide-up">
            <Link 
              to="/" 
              className="block text-foreground hover:text-kidmam-purple transition py-2"
              onClick={() => setIsOpen(false)}
            >
              {language === 'ar' ? 'الرئيسية' : 'Home'}
            </Link>
            <Link 
              to="/profile" 
              className="block text-foreground hover:text-kidmam-purple transition py-2"
              onClick={() => setIsOpen(false)}
            >
              {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
            </Link>
            <Link 
              to="/virtual-world" 
              className="block text-foreground hover:text-kidmam-purple transition py-2"
              onClick={() => setIsOpen(false)}
            >
              {language === 'ar' ? 'العالم الافتراضي' : 'Virtual World'}
            </Link>
            <Link 
              to="/community" 
              className="block text-foreground hover:text-kidmam-purple transition py-2"
              onClick={() => setIsOpen(false)}
            >
              {language === 'ar' ? 'المجتمع' : 'Community'}
            </Link>
            <Button className="w-full bg-kidmam-purple hover:bg-kidmam-purple/90 mt-3">
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Button>
            <Button 
              variant="outline"
              className="w-full mt-2"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <>{language === 'ar' ? 'الوضع النهاري' : 'Light Mode'} <Sun className="ml-2 h-4 w-4" /></>
              ) : (
                <>{language === 'ar' ? 'الوضع الليلي' : 'Dark Mode'} <Moon className="ml-2 h-4 w-4" /></>
              )}
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
