
import { Heart, Baby, Mail, MessageSquare, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-muted/50 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Baby className="h-6 w-6 text-kidmam-purple" />
              <span className="font-amiri text-xl font-bold gradient-text">كيدمام</span>
            </div>
            <p className="text-muted-foreground">
              عالم الأمومة السحري الذكي الأول في العالم العربي
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                <Heart className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                <MessageSquare className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">استكشفي</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-kidmam-purple transition">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-muted-foreground hover:text-kidmam-purple transition">
                  الملف الشخصي
                </Link>
              </li>
              <li>
                <Link to="/virtual-world" className="text-muted-foreground hover:text-kidmam-purple transition">
                  العالم الافتراضي
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-muted-foreground hover:text-kidmam-purple transition">
                  المجتمع
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">الخدمات</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                  مراقبة الحمل
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                  نصائح الأمومة
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                  تغذية الحمل
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-kidmam-purple transition">
                  استشارات طبية
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="h-4 w-4 text-kidmam-purple" />
                <span className="text-muted-foreground">support@kidmam.com</span>
              </li>
              <li className="flex items-center space-x-2 rtl:space-x-reverse">
                <MessageSquare className="h-4 w-4 text-kidmam-purple" />
                <span className="text-muted-foreground">+966 555 123456</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground text-sm">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} كيدمام - عالم الأمومة السحري الذكي</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
