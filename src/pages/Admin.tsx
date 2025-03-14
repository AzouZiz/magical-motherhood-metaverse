
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminProtected from '@/components/AdminProtected';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import Dashboard from '@/components/admin/Dashboard';
import UsersManagement from '@/components/admin/UsersManagement';
import AdminsManagement from '@/components/admin/AdminsManagement';
import SettingsPanel from '@/components/admin/SettingsPanel';
import { useAdmin } from '@/hooks/useAdmin';

const Admin = () => {
  const {
    adminUser,
    userEmail,
    isSuperAdmin,
    assistantAdmins,
    setAssistantAdmins,
    permissions,
    setPermissions,
    handleLogout
  } = useAdmin();

  if (!adminUser) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader 
          email={userEmail} 
          isSuperAdmin={isSuperAdmin} 
          onLogout={handleLogout} 
        />

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-3">
              <AdminSidebar isSuperAdmin={isSuperAdmin} />
            </div>

            {/* Main content */}
            <div className="md:col-span-9">
              <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="dashboard" className="flex-1">لوحة التحكم</TabsTrigger>
                  <TabsTrigger value="users" className="flex-1">المستخدمون</TabsTrigger>
                  {isSuperAdmin && (
                    <TabsTrigger value="admins" className="flex-1">المشرفون</TabsTrigger>
                  )}
                  <TabsTrigger value="settings" className="flex-1">الإعدادات</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard">
                  <Dashboard />
                </TabsContent>

                <TabsContent value="users">
                  <UsersManagement />
                </TabsContent>

                {isSuperAdmin && (
                  <TabsContent value="admins">
                    <AdminsManagement 
                      adminUser={adminUser}
                      assistantAdmins={assistantAdmins}
                      setAssistantAdmins={setAssistantAdmins}
                      permissions={permissions}
                      setPermissions={setPermissions}
                    />
                  </TabsContent>
                )}

                <TabsContent value="settings">
                  <SettingsPanel />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </AdminProtected>
  );
};

export default Admin;
