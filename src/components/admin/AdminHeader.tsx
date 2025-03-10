
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Bell, 
  Search, 
  User, 
  Settings, 
  HelpCircle,
  ChevronDown 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface AdminHeaderProps {
  email: string;
  isSuperAdmin: boolean;
  onLogout: () => void;
}

const AdminHeader = ({ email, isSuperAdmin, onLogout }: AdminHeaderProps) => {
  const [notifications, setNotifications] = useState(3);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleClearNotifications = () => {
    setNotifications(0);
    toast({
      title: "تم مسح الإشعارات",
      description: "تم مسح جميع الإشعارات بنجاح",
    });
  };
  
  return (
    <header className="bg-white border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <h1 className="font-amiri text-2xl font-bold text-kidmam-purple">لوحة تحكم كيدمام</h1>
          <Badge variant="outline" className="bg-kidmam-purple/10 text-kidmam-purple border-kidmam-purple/30">
            {isSuperAdmin ? 'المشرف الرئيسي' : 'مشرف مساعد'}
          </Badge>
        </div>
        
        <div className="flex-1 max-w-md mx-8 relative hidden md:block">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="بحث..." 
              className="w-full py-2 pl-3 pr-10 border rounded-md focus:ring-2 focus:ring-kidmam-purple/30 focus:border-kidmam-purple/50 focus:outline-none transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>الإشعارات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications > 0 ? (
                <>
                  <div className="max-h-64 overflow-auto">
                    <div className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                      <p className="font-medium text-sm">تم تسجيل مستخدم جديد</p>
                      <p className="text-xs text-gray-500 mt-1">قامت منى علي بالتسجيل في المنصة</p>
                      <p className="text-xs text-gray-400 mt-1">منذ ساعتين</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer border-b">
                      <p className="font-medium text-sm">تحديث النظام</p>
                      <p className="text-xs text-gray-500 mt-1">تم تحديث النظام إلى الإصدار 2.1.0</p>
                      <p className="text-xs text-gray-400 mt-1">منذ 5 ساعات</p>
                    </div>
                    <div className="p-3 hover:bg-gray-50 cursor-pointer">
                      <p className="font-medium text-sm">تقرير جديد</p>
                      <p className="text-xs text-gray-500 mt-1">تم إنشاء تقرير النشاط الشهري</p>
                      <p className="text-xs text-gray-400 mt-1">منذ يوم واحد</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={handleClearNotifications}
                    >
                      مسح جميع الإشعارات
                    </Button>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  <p>لا توجد إشعارات جديدة</p>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <User className="h-4 w-4 ml-1" />
                <span className="text-sm hidden md:inline-block">{email}</span>
                <ChevronDown className="h-4 w-4 mr-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>الحساب</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="h-4 w-4 ml-2" />
                الملف الشخصي
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4 ml-2" />
                إعدادات الحساب
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="h-4 w-4 ml-2" />
                المساعدة والدعم
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout} className="text-red-500 focus:text-red-500">
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
