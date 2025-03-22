
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, MenuIcon, XIcon, Wind } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isCalm, setIsCalm] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State for admin user
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin based on localStorage
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [location]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Add keyboard shortcut for calm mode (Ctrl/Cmd + Alt + H)
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key === 'h') {
        toggleCalmMode();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [isCalm]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleCalmMode = () => {
    setIsCalm(!isCalm);
    document.body.classList.toggle('calm-mode');
    toast({
      title: isCalm ? "تم إلغاء الوضع الهادئ" : "تم تفعيل الوضع الهادئ",
      description: isCalm ? "تم استعادة الألوان والعناصر إلى وضعها الطبيعي" : "تم تخفيت الألوان والعناصر البصرية",
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = () => {
    toast({
      title: "قريباً",
      description: "سيتم إطلاق ميزة تسجيل الدخول قريباً!",
    });
  };

  // Close menu when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      className="floating-navbar sticky top-0 z-50 w-full"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-1 flex items-center justify-start">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.span 
                className="font-amiri text-2xl font-bold text-soothing-purple"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                كيدمام
              </motion.span>
            </Link>
          </div>

          {/* Navigation for desktop */}
          <div className="hidden md:flex md:items-center md:space-x-6 rtl:space-x-reverse">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors gentle-glow ${
                location.pathname === '/' ? 'text-soothing-purple' : 'text-foreground/70'
              }`}
              onClick={handleLinkClick}
            >
              الرئيسية
            </Link>
            <Link 
              to="/virtual-world" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors gentle-glow ${
                location.pathname === '/virtual-world' ? 'text-soothing-purple' : 'text-foreground/70'
              }`}
              onClick={handleLinkClick}
            >
              العالم الافتراضي
            </Link>
            <Link 
              to="/community" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors gentle-glow ${
                location.pathname === '/community' ? 'text-soothing-purple' : 'text-foreground/70'
              }`}
              onClick={handleLinkClick}
            >
              المجتمع
            </Link>
            <Link 
              to="/profile" 
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors gentle-glow ${
                location.pathname === '/profile' ? 'text-soothing-purple' : 'text-foreground/70'
              }`}
              onClick={handleLinkClick}
            >
              الملف الشخصي
            </Link>

            {/* إذا كان مشرفًا، عرض رابط لوحة التحكم */}
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors gentle-glow ${
                  location.pathname === '/admin' ? 'text-soothing-purple' : 'text-foreground/70'
                }`}
                onClick={handleLinkClick}
              >
                لوحة التحكم
              </Link>
            )}
          </div>

          {/* Call to Action and Theme Toggle */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse flex-1 justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCalmMode}
              className="rounded-full"
              aria-label={isCalm ? "إلغاء الوضع الهادئ" : "تفعيل الوضع الهادئ"}
            >
              <Wind className={`h-[1.2rem] w-[1.2rem] transition-all ${isCalm ? 'text-soothing-teal' : 'text-muted-foreground'}`} />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              className="rounded-full"
              aria-label={isDarkMode ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
            >
              {isDarkMode ? (
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              ) : (
                <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
              )}
            </Button>
            
            <Button 
              onClick={handleLoginClick}
              className="bg-soothing-purple hover:bg-soothing-purple/90 text-white hidden md:block transition-all duration-200 active:scale-[0.98]"
            >
              دخول
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="md:hidden"
              aria-label={isMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-muted/30"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/' ? 'text-soothing-purple bg-soothing-purple/10' : 'text-foreground/70'
                }`}
                onClick={handleLinkClick}
              >
                الرئيسية
              </Link>
              <Link 
                to="/virtual-world" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/virtual-world' ? 'text-soothing-purple bg-soothing-purple/10' : 'text-foreground/70'
                }`}
                onClick={handleLinkClick}
              >
                العالم الافتراضي
              </Link>
              <Link 
                to="/community" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/community' ? 'text-soothing-purple bg-soothing-purple/10' : 'text-foreground/70'
                }`}
                onClick={handleLinkClick}
              >
                المجتمع
              </Link>
              <Link 
                to="/profile" 
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/profile' ? 'text-soothing-purple bg-soothing-purple/10' : 'text-foreground/70'
                }`}
                onClick={handleLinkClick}
              >
                الملف الشخصي
              </Link>

              {/* إذا كان مشرفًا، عرض رابط لوحة التحكم في القائمة المتنقلة */}
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/admin' ? 'text-soothing-purple bg-soothing-purple/10' : 'text-foreground/70'
                  }`}
                  onClick={handleLinkClick}
                >
                  لوحة التحكم
                </Link>
              )}

              <Button 
                onClick={handleLoginClick}
                className="bg-soothing-purple hover:bg-soothing-purple/90 text-white w-full mt-4"
              >
                دخول
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
