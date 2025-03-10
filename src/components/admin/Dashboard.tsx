
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

const Dashboard = () => {
  return (
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
  );
};

export default Dashboard;
