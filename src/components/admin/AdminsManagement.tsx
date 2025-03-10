
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  name: string;
  email: string;
  role: 'super' | 'helper';
}

interface UserPermission {
  id: string;
  name: string;
  enabled: boolean;
}

interface AdminsManagementProps {
  adminUser: AdminUser | null;
  assistantAdmins: AdminUser[];
  setAssistantAdmins: React.Dispatch<React.SetStateAction<AdminUser[]>>;
  permissions: UserPermission[];
  setPermissions: React.Dispatch<React.SetStateAction<UserPermission[]>>;
}

const AdminsManagement = ({ 
  adminUser, 
  assistantAdmins, 
  setAssistantAdmins, 
  permissions, 
  setPermissions 
}: AdminsManagementProps) => {
  const { toast } = useToast();
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'helper'
  });

  const handleAddAdmin = () => {
    if (newAdmin.name && newAdmin.email && newAdmin.password) {
      setAssistantAdmins([...assistantAdmins, {
        name: newAdmin.name,
        email: newAdmin.email,
        role: 'helper' as 'helper'
      }]);
      
      toast({
        title: "تمت الإضافة بنجاح",
        description: `تمت إضافة المشرف ${newAdmin.name} بنجاح`,
      });
      
      setNewAdmin({
        name: '',
        email: '',
        password: '',
        role: 'helper'
      });
    }
  };

  const togglePermission = (id: string) => {
    setPermissions(permissions.map(perm => 
      perm.id === id ? { ...perm, enabled: !perm.enabled } : perm
    ));
  };

  const removeAdmin = (email: string) => {
    setAssistantAdmins(assistantAdmins.filter(admin => admin.email !== email));
    toast({
      title: "تم الحذف بنجاح",
      description: "تم حذف المشرف المساعد بنجاح",
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-amiri text-xl">إدارة المشرفين</CardTitle>
          <CardDescription>إدارة المشرفين وصلاحياتهم</CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">
              <UserPlus className="h-4 w-4 mr-1" />
              إضافة مشرف
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مشرف جديد</DialogTitle>
              <DialogDescription>
                أضف مشرفًا جديدًا وحدد صلاحياته في النظام.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">الاسم</Label>
                <Input 
                  id="name" 
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">الصلاحيات</Label>
                <div className="space-y-2">
                  {permissions.map(perm => (
                    <div key={perm.id} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <input 
                        type="checkbox"
                        id={perm.id}
                        checked={perm.enabled}
                        onChange={() => togglePermission(perm.id)}
                        className="rounded border-gray-300 text-kidmam-purple"
                      />
                      <Label htmlFor={perm.id}>{perm.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddAdmin}>إضافة مشرف</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">المشرف الرئيسي</h3>
            <div className="bg-gray-50 border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-kidmam-purple/20 flex items-center justify-center mr-3">
                  <Users className="h-5 w-5 text-kidmam-purple" />
                </div>
                <div>
                  <div className="font-medium">{adminUser?.name || 'المشرف الرئيسي'}</div>
                  <div className="text-sm text-gray-500">{adminUser?.email}</div>
                </div>
              </div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-kidmam-gold/10 text-kidmam-gold">
                  صلاحيات كاملة
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">المشرفون المساعدون</h3>
            <div className="space-y-3">
              {assistantAdmins.map((admin, index) => (
                <div key={index} className="bg-white border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-kidmam-teal/20 flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-kidmam-teal" />
                    </div>
                    <div>
                      <div className="font-medium">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      صلاحيات محدودة
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeAdmin(admin.email)}
                    >
                      حذف
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminsManagement;
