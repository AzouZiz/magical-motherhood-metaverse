
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { supabase, Profile } from '@/integrations/supabase/client';

const AdminWelcome = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (error) throw error;
        
        setProfile(data as Profile);
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getProfile();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setProfile(null);
      } else {
        getProfile();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "تم تسجيل الخروج",
        description: "تم تسجيل خروجك بنجاح",
      });
      navigate('/admin-login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج",
        variant: "destructive",
      });
    }
  };

  const handleAdminPanel = () => {
    navigate('/admin');
  };

  if (loading) {
    return <div>جاري التحميل...</div>;
  }

  if (!profile) {
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
          أنت مسجل دخولك كـ{profile.role === 'super' ? ' مشرف رئيسي' : ' مشرف مساعد'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm">الاسم: {profile.name || 'المشرف'}</p>
            <p className="text-sm">البريد الإلكتروني: {supabase.auth.getUser().then(({ data }) => data.user?.email)}</p>
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
