
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, User } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // المشرف الرئيسي والمشرفين المساعدين (يمكن نقل هذا إلى API في المستقبل)
    const admins = [
      { email: 'azeddinebeldjilali9@gmail.com', password: 'Azou@21@Azou', role: 'super' },
      { email: 'assistant@kidmam.com', password: 'Assistant123', role: 'helper' }
    ];

    // التحقق من بيانات الاعتماد
    const admin = admins.find(admin => admin.email === email && admin.password === password);

    setTimeout(() => {
      setIsLoading(false);
      
      if (admin) {
        // تخزين معلومات المشرف في localStorage للاستخدام عبر التطبيق
        localStorage.setItem('adminUser', JSON.stringify({
          email: admin.email,
          role: admin.role,
          name: admin.email.split('@')[0]
        }));
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم",
        });
        
        navigate('/admin');
      } else {
        toast({
          title: "فشل تسجيل الدخول",
          description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-amiri mb-2 text-kidmam-purple">كيدمام</h1>
          <p className="text-gray-600">لوحة تحكم المشرفين</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-amiri text-xl">تسجيل دخول المشرف</CardTitle>
            <CardDescription>أدخل بيانات اعتماد المشرف للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="admin@kidmam.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-kidmam-purple hover:bg-kidmam-purple/90" disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-kidmam-purple hover:underline">العودة إلى الصفحة الرئيسية</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
