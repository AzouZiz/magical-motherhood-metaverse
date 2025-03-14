
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
  const [userEmail, setUserEmail] = useState<string>('');
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
        console.log("جاري التحقق من جلسة المستخدم...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("خطأ في الحصول على الجلسة:", sessionError);
          throw sessionError;
        }
        
        if (!session) {
          console.log("لا توجد جلسة نشطة");
          setLoading(false);
          navigate('/admin-login');
          return;
        }
        
        console.log("تم العثور على جلسة نشطة للمستخدم:", session.user.id);
        
        // Save user email
        if (session.user?.email) {
          setUserEmail(session.user.email);
        }
        
        console.log("جاري الحصول على معلومات الملف الشخصي...");
        // الحصول على معلومات الملف الشخصي للمستخدم
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (profileError) {
          console.error("خطأ في الحصول على الملف الشخصي:", profileError);
          throw profileError;
        }
        
        if (!profileData) {
          console.error("لم يتم العثور على ملف شخصي للمستخدم");
          setLoading(false);
          navigate('/admin-login');
          return;
        }
        
        console.log("بيانات الملف الشخصي:", profileData);
        
        // التحقق من دور المستخدم
        if (profileData.role !== 'super' && profileData.role !== 'helper') {
          console.error("ليس لدى المستخدم صلاحيات المشرف:", profileData.role);
          setLoading(false);
          navigate('/admin-login');
          return;
        }
        
        const updatedProfile = {
          ...profileData as Profile,
          email: session.user.email // Add email from session
        };
        
        setProfile(updatedProfile);
        setIsSuperAdmin(profileData.role === 'super');
        
        console.log("تم تعيين المستخدم كمشرف بنجاح. نوع المشرف:", profileData.role);
        
        // الحصول على قائمة المشرفين المساعدين
        if (profileData.role === 'super') {
          console.log("جاري الحصول على قائمة المشرفين المساعدين...");
          const { data: assistantsData, error: assistantsError } = await supabase
            .from('profiles')
            .select('id, name, role')
            .eq('role', 'helper');
          
          if (assistantsError) {
            console.error("خطأ في الحصول على المشرفين المساعدين:", assistantsError);
          } else if (assistantsData) {
            console.log("تم العثور على المشرفين المساعدين:", assistantsData.length);
            
            // الحصول على معلومات المشرفين المساعدين
            const adminsWithEmail: AdminUser[] = [];
            
            for (const admin of assistantsData) {
              try {
                // الحصول على بريد المستخدم من auth.users
                const { data: authUserData, error: authUserError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', admin.id)
                  .single();
                  
                if (authUserError) {
                  console.error("خطأ في الحصول على بيانات المستخدم:", authUserError);
                } else if (authUserData) {
                  // استخدام البريد الإلكتروني من auth.users
                  adminsWithEmail.push({
                    id: admin.id,
                    name: admin.name || 'مساعد المشرف',
                    email: session.user.email || '',
                    role: 'helper'
                  });
                }
              } catch (err) {
                console.error("Error fetching admin user:", err);
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
        setUserEmail('');
        navigate('/admin-login');
      } else {
        if (session.user?.email) {
          setUserEmail(session.user.email);
        }
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
    userEmail,
    isSuperAdmin,
    assistantAdmins,
    setAssistantAdmins,
    permissions,
    setPermissions,
    handleLogout,
    loading
  };
};
