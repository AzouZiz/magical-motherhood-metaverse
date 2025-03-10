
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const UsersManagement = () => {
  return (
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
  );
};

export default UsersManagement;
