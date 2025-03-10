
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle } from 'lucide-react';

const SettingsPanel = () => {
  return (
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
  );
};

export default SettingsPanel;
