
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase, Profile, AdminUser } from '@/integrations/supabase/client';

export interface UserPermission {
  id: string;
  name: string;
  enabled: boolean;
}

export const useAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [assistantAdmins, setAssistantAdmins] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [permissions, setPermissions] = useState<UserPermission[]>([
    { id: 'manage_users', name: 'إدارة المستخدمين', enabled: true },
    { id: 'content_approval', name: 'الموافقة على المحتوى', enabled: true },
    { id: 'system_settings', name: 'إعدادات النظام', enabled: false },
    { id: 'reports_view', name: 'عرض التقارير', enabled: true },
    { id: 'admin_management', name: 'إدارة المشرفين', enabled: false },
  ]);

  useEffect(() => {
    const getProfileAndAssistants = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session) {
          setLoading(false);
          navigate('/admin-login');
          return;
        }
        
        // الحصول على معلومات الملف الشخصي للمستخدم
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError || !profileData) {
          setLoading(false);
          navigate('/admin-login');
          return;
        }
        
        setProfile(profileData as Profile);
        setIsSuperAdmin(profileData.role === 'super');
        
        // الحصول على قائمة المشرفين المساعدين
        if (profileData.role === 'super') {
          const { data: assistantsData, error: assistantsError } = await supabase
            .from('profiles')
            .select('name, id, role')
            .eq('role', 'helper');
          
          if (!assistantsError && assistantsData) {
            // الحصول على معلومات البريد الإلكتروني لكل مشرف مساعد
            const adminsWithEmail: AdminUser[] = [];
            
            for (const admin of assistantsData) {
              const { data: userData } = await supabase.auth.admin.getUserById(admin.id);
              if (userData.user) {
                adminsWithEmail.push({
                  name: admin.name || 'مساعد المشرف',
                  email: userData.user.email || '',
                  role: 'helper'
                });
              }
            }
            
            setAssistantAdmins(adminsWithEmail);
          }
        }
      } catch (error) {
        console.error("Error loading admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    getProfileAndAssistants();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setProfile(null);
        setIsSuperAdmin(false);
        navigate('/admin-login');
      } else {
        getProfileAndAssistants();
      }
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

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

  return {
    profile,
    adminUser: profile,
    isSuperAdmin,
    assistantAdmins,
    setAssistantAdmins,
    permissions,
    setPermissions,
    handleLogout,
    loading
  };
};
