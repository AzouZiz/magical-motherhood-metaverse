
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AdminProtectedProps {
  children: ReactNode;
  requiredRole?: 'super' | 'helper' | undefined;
}

const AdminProtected = ({ children, requiredRole }: AdminProtectedProps) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasRequiredRole, setHasRequiredRole] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        // التحقق من جلسة المستخدم الحالية
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          setLoading(false);
          setIsAuthenticated(false);
          return;
        }
        
        // التحقق من وجود ملف تعريف للمستخدم ودوره
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profileError || !profileData) {
          setLoading(false);
          setIsAuthenticated(false);
          return;
        }
        
        setIsAuthenticated(true);
        
        // التحقق من الصلاحيات إذا تم طلب دور محدد
        if (requiredRole) {
          if (profileData.role === 'super' || profileData.role === requiredRole) {
            setHasRequiredRole(true);
          } else {
            toast({
              title: "وصول مرفوض",
              description: "ليس لديك صلاحيات كافية للوصول إلى هذه الصفحة",
              variant: "destructive",
            });
          }
        } else {
          setHasRequiredRole(true);
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAuth();
    
    // الاستماع إلى تغييرات حالة المصادقة
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        setHasRequiredRole(false);
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [requiredRole, toast]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" />;
  }

  if (!hasRequiredRole) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default AdminProtected;
