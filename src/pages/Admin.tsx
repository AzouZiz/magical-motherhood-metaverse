
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminProtected from '@/components/AdminProtected';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Users, Settings, LogOut, Plus, UserPlus, AlertCircle, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [assistantAdmins, setAssistantAdmins] = useState<AdminUser[]>([
    { name: 'مساعد المشرف', email: 'assistant@kidmam.com', role: 'helper' }
  ]);
  
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'helper'
  });
  
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

  if (!adminUser) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <h1 className="font-amiri text-2xl font-bold text-kidmam-purple">لوحة تحكم كيدمام</h1>
              <span className="bg-kidmam-purple/10 text-kidmam-purple px-2 py-1 rounded-md text-xs">
                {isSuperAdmin ? 'المشرف الرئيسي' : 'مشرف مساعد'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 ml-2">{adminUser.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-3">
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
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-amiri text-xl">لوحة التحكم</CardTitle>
                      <CardDescription>نظرة عامة على إحصائيات التطبيق</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">1,248</div>
                            <p className="text-xs text-green-600">+12% من الشهر الماضي</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">مستخدمون جدد اليوم</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">24</div>
                            <p className="text-xs text-green-600">+8% من الأمس</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">محتوى ينتظر الموافقة</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">7</div>
                            <div className="flex mt-1">
                              <Button variant="outline" size="sm" className="text-xs">
                                <Eye className="h-3 w-3 mr-1" />
                                عرض الكل
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="users">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle className="font-amiri text-xl">إدارة المستخدمين</CardTitle>
                        <CardDescription>قائمة بمستخدمي التطبيق</CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        إضافة مستخدم
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="border rounded-md">
                        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                          <h3 className="font-medium">المستخدمون النشطون</h3>
                          <div className="flex gap-2">
                            <Input type="search" placeholder="بحث..." className="h-8 w-48" />
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="grid grid-cols-12 font-medium text-sm py-2 border-b">
                            <div className="col-span-4">المستخدم</div>
                            <div className="col-span-3">تاريخ التسجيل</div>
                            <div className="col-span-2">الحالة</div>
                            <div className="col-span-3 text-left">الإجراءات</div>
                          </div>
                          
                          {/* User rows */}
                          <div className="grid grid-cols-12 text-sm py-3 border-b">
                            <div className="col-span-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                  <span className="text-kidmam-purple">ف</span>
                                </div>
                                <div>
                                  <div>فاطمة الزهراء محمد</div>
                                  <div className="text-xs text-gray-500">fatima@example.com</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-3 self-center">15 مايو، 2024</div>
                            <div className="col-span-2 self-center">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                            </div>
                            <div className="col-span-3 self-center flex justify-end gap-2">
                              <Button variant="outline" size="sm">عرض</Button>
                              <Button variant="outline" size="sm">تعديل</Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-12 text-sm py-3 border-b">
                            <div className="col-span-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                                  <span className="text-kidmam-purple">ن</span>
                                </div>
                                <div>
                                  <div>نورة أحمد</div>
                                  <div className="text-xs text-gray-500">noura@example.com</div>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-3 self-center">10 مايو، 2024</div>
                            <div className="col-span-2 self-center">
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                            </div>
                            <div className="col-span-3 self-center flex justify-end gap-2">
                              <Button variant="outline" size="sm">عرض</Button>
                              <Button variant="outline" size="sm">تعديل</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {isSuperAdmin && (
                  <TabsContent value="admins">
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
                                  <div className="font-medium">{adminUser.name || 'المشرف الرئيسي'}</div>
                                  <div className="text-sm text-gray-500">{adminUser.email}</div>
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
                  </TabsContent>
                )}

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-amiri text-xl">إعدادات النظام</CardTitle>
                      <CardDescription>ضبط إعدادات التطبيق</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="app-name">اسم التطبيق</Label>
                          <Input id="app-name" defaultValue="كيدمام" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="language">اللغة الافتراضية</Label>
                          <Select defaultValue="ar">
                            <SelectTrigger id="language">
                              <SelectValue placeholder="اختر اللغة" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ar">العربية</SelectItem>
                              <SelectItem value="en">الإنجليزية</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 ml-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-yellow-800">ملاحظة</h4>
                            <p className="text-sm text-yellow-700">
                              هذه الإعدادات تؤثر على جميع مستخدمي التطبيق. يرجى توخي الحذر عند إجراء تغييرات.
                            </p>
                          </div>
                        </div>
                        
                        <Button className="bg-kidmam-purple hover:bg-kidmam-purple/90">
                          حفظ الإعدادات
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
