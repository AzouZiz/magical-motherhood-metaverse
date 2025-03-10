
import React from 'react';

interface AdminSidebarProps {
  isSuperAdmin: boolean;
}

const AdminSidebar = ({ isSuperAdmin }: AdminSidebarProps) => {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-2">
      <h2 className="font-medium text-gray-700 mb-3">القائمة الرئيسية</h2>
      <a href="#dashboard" className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100">
        لوحة التحكم
      </a>
      <a href="#users" className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100">
        إدارة المستخدمين
      </a>
      {isSuperAdmin && (
        <a href="#admins" className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100">
          إدارة المشرفين
        </a>
      )}
      <a href="#settings" className="flex items-center p-2 text-gray-700 rounded-md hover:bg-gray-100">
        الإعدادات
      </a>
    </div>
  );
};

export default AdminSidebar;
