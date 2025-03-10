
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';

interface AdminUser {
  name: string;
  email: string;
  role: 'super' | 'helper';
}

const AdminWelcome = () => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // التحقق من وجود بيانات المشرف في localStorage
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAdminUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    navigate('/');
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  if (!adminUser) {
    return null;
  }

  return (
    <Card className="mb-8 border-kidmam-purple/30 bg-gradient-to-r from-kidmam-purple/5 to-background">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 ml-2 text-kidmam-purple" />
          مرحباً بك في لوحة التحكم
        </CardTitle>
        <CardDescription>
          أنت مسجل دخولك كـ{adminUser.role === 'super' ? ' مشرف رئيسي' : ' مشرف مساعد'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">الاسم: {adminUser.name || 'المشرف'}</p>
            <p className="text-sm">البريد الإلكتروني: {adminUser.email}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleAdminPanel}>
              لوحة التحكم
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 ml-1" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminWelcome;
