
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Eye, 
  Trash2, 
  Mail, 
  UserCheck, 
  UserX, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  registrationDate: string;
  lastLogin: string;
  avatar: string;
}

const UsersManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('registrationDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'فاطمة الزهراء محمد',
      email: 'fatima@example.com',
      status: 'active',
      registrationDate: '2024-05-15',
      lastLogin: '2024-05-30',
      avatar: 'ف',
    },
    {
      id: '2',
      name: 'نورة أحمد',
      email: 'noura@example.com',
      status: 'active',
      registrationDate: '2024-05-10',
      lastLogin: '2024-05-29',
      avatar: 'ن',
    },
    {
      id: '3',
      name: 'سارة علي',
      email: 'sara@example.com',
      status: 'active',
      registrationDate: '2024-04-20',
      lastLogin: '2024-05-28',
      avatar: 'س',
    },
    {
      id: '4',
      name: 'ريم خالد',
      email: 'reem@example.com',
      status: 'pending',
      registrationDate: '2024-05-25',
      lastLogin: '',
      avatar: 'ر',
    },
    {
      id: '5',
      name: 'منى عبدالله',
      email: 'mona@example.com',
      status: 'inactive',
      registrationDate: '2024-03-10',
      lastLogin: '2024-04-15',
      avatar: 'م',
    },
    {
      id: '6',
      name: 'أمل ياسر',
      email: 'amal@example.com',
      status: 'active',
      registrationDate: '2024-05-01',
      lastLogin: '2024-05-30',
      avatar: 'أ',
    },
    {
      id: '7',
      name: 'هدى محمود',
      email: 'hoda@example.com',
      status: 'inactive',
      registrationDate: '2024-04-05',
      lastLogin: '2024-04-25',
      avatar: 'ه',
    }
  ];

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedUsers = [...mockUsers].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortField === 'registrationDate') {
      return sortDirection === 'asc' 
        ? new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime() 
        : new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action: string, user: User) => {
    toast({
      title: `تم التنفيذ: ${action}`,
      description: `تم تنفيذ العملية "${action}" على المستخدم ${user.name}`,
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'لا يوجد';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-amiri text-xl">إدارة المستخدمين</CardTitle>
          <CardDescription>قائمة بمستخدمي التطبيق وإدارة حساباتهم</CardDescription>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 ml-1" />
          إضافة مستخدم
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="all">الكل ({mockUsers.length})</TabsTrigger>
            <TabsTrigger value="active">نشط ({mockUsers.filter(u => u.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="pending">معلق ({mockUsers.filter(u => u.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="inactive">غير نشط ({mockUsers.filter(u => u.status === 'inactive').length})</TabsTrigger>
          </TabsList>
        
          <TabsContent value="all" className="border rounded-md">
            <div className="p-4 border-b bg-gray-50 flex justify-between items-center flex-wrap gap-3">
              <h3 className="font-medium">جميع المستخدمين</h3>
              <div className="flex gap-2 flex-wrap">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    type="search" 
                    placeholder="بحث..." 
                    className="h-9 w-48 pr-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 ml-1" />
                  فلترة
                </Button>
              </div>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-12 font-medium text-sm py-2 border-b">
                <div 
                  className="col-span-4 flex items-center cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  المستخدم
                  {sortField === 'name' && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="h-3 w-3 mr-1" /> : 
                      <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                </div>
                <div 
                  className="col-span-3 flex items-center cursor-pointer"
                  onClick={() => handleSort('registrationDate')}
                >
                  تاريخ التسجيل
                  {sortField === 'registrationDate' && (
                    sortDirection === 'asc' ? 
                      <ArrowUp className="h-3 w-3 mr-1" /> : 
                      <ArrowDown className="h-3 w-3 mr-1" />
                  )}
                </div>
                <div className="col-span-2">الحالة</div>
                <div className="col-span-3 text-left">الإجراءات</div>
              </div>
              
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div key={user.id} className="grid grid-cols-12 text-sm py-3 border-b hover:bg-gray-50">
                    <div className="col-span-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center ml-2">
                          <span className="text-kidmam-purple">{user.avatar}</span>
                        </div>
                        <div>
                          <div>{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-3 self-center">{formatDate(user.registrationDate)}</div>
                    <div className="col-span-2 self-center">
                      {user.status === 'active' && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نشط</span>
                      )}
                      {user.status === 'pending' && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">معلق</span>
                      )}
                      {user.status === 'inactive' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">غير نشط</span>
                      )}
                    </div>
                    <div className="col-span-3 self-center flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleAction('عرض', user)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={() => handleAction('تعديل', user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleAction('إرسال بريد', user)}>
                            <Mail className="h-4 w-4 ml-2" />
                            إرسال بريد
                          </DropdownMenuItem>
                          {user.status !== 'active' ? (
                            <DropdownMenuItem onClick={() => handleAction('تنشيط', user)}>
                              <UserCheck className="h-4 w-4 ml-2" />
                              تنشيط الحساب
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleAction('تعليق', user)}>
                              <UserX className="h-4 w-4 ml-2" />
                              تعليق الحساب
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={() => handleAction('حذف', user)}>
                            <Trash2 className="h-4 w-4 ml-2" />
                            حذف الحساب
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-muted-foreground">
                  <p>لم يتم العثور على مستخدمين</p>
                </div>
              )}
              
              {filteredUsers.length > 0 && (
                <div className="flex justify-between items-center mt-4">
                  <div className="text-sm text-gray-500">
                    عرض {filteredUsers.length} من أصل {mockUsers.length} مستخدم
                  </div>
                  <div className="flex">
                    <Button variant="outline" size="sm" className="ml-2">السابق</Button>
                    <Button variant="outline" size="sm">التالي</Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="border rounded-md p-8 text-center">
              <h3 className="font-medium text-lg mb-2">المستخدمون النشطون</h3>
              <p className="text-gray-500">عرض المستخدمين ذوي الحسابات النشطة فقط</p>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="border rounded-md p-8 text-center">
              <h3 className="font-medium text-lg mb-2">المستخدمون المعلقون</h3>
              <p className="text-gray-500">عرض المستخدمين الذين تم تعليق حساباتهم</p>
            </div>
          </TabsContent>
          
          <TabsContent value="inactive">
            <div className="border rounded-md p-8 text-center">
              <h3 className="font-medium text-lg mb-2">المستخدمون غير النشطين</h3>
              <p className="text-gray-500">عرض المستخدمين غير النشطين الذين لم يسجلوا دخولهم مؤخرًا</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UsersManagement;
