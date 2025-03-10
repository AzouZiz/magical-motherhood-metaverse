
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface AdminUser {
  name: string;
  email: string;
  role: 'super' | 'helper';
}

export interface UserPermission {
  id: string;
  name: string;
  enabled: boolean;
}

export const useAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [assistantAdmins, setAssistantAdmins] = useState<AdminUser[]>([
    { name: 'مساعد المشرف', email: 'assistant@kidmam.com', role: 'helper' }
  ]);
  
  const [permissions, setPermissions] = useState<UserPermission[]>([
    { id: 'manage_users', name: 'إدارة المستخدمين', enabled: true },
    { id: 'content_approval', name: 'الموافقة على المحتوى', enabled: true },
    { id: 'system_settings', name: 'إعدادات النظام', enabled: false },
    { id: 'reports_view', name: 'عرض التقارير', enabled: true },
    { id: 'admin_management', name: 'إدارة المشرفين', enabled: false },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('adminUser');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setAdminUser(parsedUser);
      setIsSuperAdmin(parsedUser.role === 'super');
    } else {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    toast({
      title: "تم تسجيل الخروج",
      description: "تم تسجيل خروجك بنجاح",
    });
    navigate('/admin-login');
  };

  return {
    adminUser,
    isSuperAdmin,
    assistantAdmins,
    setAssistantAdmins,
    permissions,
    setPermissions,
    handleLogout
  };
};
