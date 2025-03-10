
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar } from 'lucide-react';

const Profile = () => {
  // Set RTL direction for Arabic content
  document.documentElement.dir = 'rtl';
  
  const [progress, setProgress] = useState(35);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Sidebar */}
          <div className="md:col-span-4 lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader className="text-center">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-kidmam-purple to-kidmam-teal flex items-center justify-center mb-2">
                  <span className="text-white text-3xl font-bold">ف</span>
                </div>
                <CardTitle className="font-amiri text-xl">فاطمة الزهراء</CardTitle>
                <CardDescription className="font-tajawal">الأسبوع 18 من الحمل</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span className="font-medium">تقدم الحمل</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 bg-gray-100" />
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        تاريخ الولادة المتوقع
                      </span>
                    </div>
                    <div className="font-bold">15 أغسطس، 2024</div>
                  </div>
                  
                  <Button className="w-full mt-4 bg-kidmam-purple hover:bg-kidmam-purple/90">
                    تحديث البيانات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-8 lg:col-span-9">
            <Tabs defaultValue="summary" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="summary" className="flex-1">ملخص</TabsTrigger>
                <TabsTrigger value="appointments" className="flex-1">المواعيد</TabsTrigger>
                <TabsTrigger value="nutrition" className="flex-1">التغذية</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">الإعدادات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-amiri text-xl">ملخص هذا الأسبوع</CardTitle>
                    <CardDescription>متابعة تقدم حملك والتغييرات الأخيرة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-kidmam-light/50 p-4 rounded-lg border border-kidmam-purple/20">
                        <h3 className="font-bold mb-2">طفلك في الأسبوع 18</h3>
                        <p className="text-sm text-gray-600">في هذا الأسبوع، يبلغ طول طفلك حوالي 14 سم ويزن حوالي 190 غراماً. بدأت حواسه في العمل، ويمكنه الآن سماع صوتك وضربات قلبك.</p>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">وزن الأم</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">62 كجم</div>
                            <p className="text-xs text-green-600">+0.5 كجم من الأسبوع الماضي</p>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">نشاط الجنين</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">معتدل</div>
                            <p className="text-xs text-gray-500">ستزداد الحركة في الأسابيع القادمة</p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-amiri text-xl">المواعيد القادمة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex p-4 border rounded-lg bg-white">
                        <div className="mr-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-kidmam-purple">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">فحص الموجات فوق الصوتية</h3>
                          <p className="text-sm text-gray-500">الثلاثاء، 25 مايو · 10:00 صباحاً</p>
                          <p className="text-sm text-gray-500">مستشفى الولادة المركزي</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="nutrition">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-amiri text-xl">نصائح التغذية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      اتبعي نظاماً غذائياً متوازناً غنياً بالفيتامينات والمعادن الضرورية لنمو الجنين بشكل صحيح.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                        <h3 className="font-bold text-green-800 mb-2">أطعمة موصى بها</h3>
                        <ul className="text-sm space-y-1">
                          <li>الخضروات الورقية الخضراء</li>
                          <li>الفواكه الطازجة</li>
                          <li>منتجات الألبان قليلة الدسم</li>
                          <li>البروتينات الخالية من الدهون</li>
                          <li>الحبوب الكاملة</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <h3 className="font-bold text-red-800 mb-2">أطعمة يجب تجنبها</h3>
                        <ul className="text-sm space-y-1">
                          <li>الأسماك عالية الزئبق</li>
                          <li>اللحوم غير المطبوخة جيداً</li>
                          <li>منتجات الألبان غير المبسترة</li>
                          <li>الكافيين بكميات كبيرة</li>
                          <li>الكحول بجميع أنواعه</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-amiri text-xl">إعدادات الحساب</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">الاسم الكامل</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full p-2 border rounded-md"
                          defaultValue="فاطمة الزهراء محمد"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full p-2 border rounded-md"
                          defaultValue="fatima@example.com"
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="due-date" className="text-sm font-medium">تاريخ الولادة المتوقع</label>
                        <input
                          type="date"
                          id="due-date"
                          className="w-full p-2 border rounded-md"
                          defaultValue="2024-08-15"
                        />
                      </div>
                      
                      <Button className="mt-4 bg-kidmam-purple hover:bg-kidmam-purple/90">
                        حفظ التغييرات
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
