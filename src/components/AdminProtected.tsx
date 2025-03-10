
import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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
    // التحقق من وجود بيانات المشرف في localStorage
    const adminUser = localStorage.getItem('adminUser');
    
    if (adminUser) {
      const admin = JSON.parse(adminUser);
      setIsAuthenticated(true);
      
      // التحقق من الصلاحيات إذا تم طلب دور محدد
      if (requiredRole) {
        if (admin.role === 'super' || admin.role === requiredRole) {
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
    }
    
    setLoading(false);
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
