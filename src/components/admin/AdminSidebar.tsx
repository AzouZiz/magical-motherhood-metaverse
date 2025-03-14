
import React from 'react';
import { Home, Users, Shield, Settings, FileText, CreditCard, BarChart, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  isSuperAdmin: boolean;
}

const AdminSidebar = ({ isSuperAdmin }: AdminSidebarProps) => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      <h2 className="font-medium text-gray-700 mb-3 text-lg">القائمة الرئيسية</h2>
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Home className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>لوحة التحكم</span>
      </a>
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin#users'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Users className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>إدارة المستخدمين</span>
      </a>
      
      {isSuperAdmin && (
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); handleNavigation('/admin#admins'); }} 
          className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
        >
          <Shield className="h-5 w-5 ml-2 text-kidmam-purple" />
          <span>إدارة المشرفين</span>
        </a>
      )}
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin#content'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <FileText className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>إدارة المحتوى</span>
      </a>
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin#reports'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <BarChart className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>التقارير والإحصائيات</span>
      </a>
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin#billing'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <CreditCard className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>إدارة الاشتراكات</span>
      </a>
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin#notifications'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Bell className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>الإشعارات</span>
      </a>
      
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); handleNavigation('/admin#settings'); }} 
        className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
      >
        <Settings className="h-5 w-5 ml-2 text-kidmam-purple" />
        <span>الإعدادات</span>
      </a>
      
      <div className="pt-4 border-t mt-4">
        <div className="bg-kidmam-purple/10 p-3 rounded-md">
          <p className="text-sm text-kidmam-purple font-medium">مستوى الوصول</p>
          <p className="text-xs mt-1">{isSuperAdmin ? 'مشرف رئيسي (وصول كامل)' : 'مشرف مساعد (وصول محدود)'}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
