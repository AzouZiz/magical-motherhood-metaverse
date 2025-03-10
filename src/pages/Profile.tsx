
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import AdminWelcome from '@/components/AdminWelcome';
import { Calendar, BabyIcon, Settings, MessageCircle, FileText, Bell, Send, User } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // التحقق مما إذا كان المستخدم مشرفًا
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      setIsAdmin(true);
    }
  }, []);

  // دالة للتعامل مع النقر على الميزات التي لا تزال قيد التطوير
  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "قريباً",
      description: `ميزة "${featureName}" قيد التطوير وستكون متاحة قريباً!`,
    });
  };

  return (
    <div className="min-h-screen bg-kidmam-light/30 dark:bg-kidmam-dark/10">
      <div className="container mx-auto px-4 py-12">
        {/* إظهار رسالة ترحيب المشرف إذا كان المستخدم مشرفًا */}
        {isAdmin && <AdminWelcome />}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-amiri font-bold mb-4 text-kidmam-purple">
            الملف الشخصي
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            مرحبًا بك في ملفك الشخصي، هنا يمكنك إدارة حسابك وتتبع رحلة حملك ومشاهدة تقدمك
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* القائمة الجانبية للملف الشخصي */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="mb-6">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto h-24 w-24 rounded-full bg-kidmam-purple/20 flex items-center justify-center mb-2">
                  <User className="h-12 w-12 text-kidmam-purple" />
                </div>
                <CardTitle className="text-lg">مستخدمة كيدمام</CardTitle>
                <CardDescription>الأسبوع 24 من الحمل</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleFeatureClick("إدارة الملف الشخصي")}
                >
                  <User className="ml-2 h-5 w-5 text-kidmam-purple" />
                  إدارة الملف الشخصي
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleFeatureClick("تتبع الحمل")}
                >
                  <Calendar className="ml-2 h-5 w-5 text-kidmam-teal" />
                  تتبع الحمل
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleFeatureClick("المجموعات الخاصة بي")}
                >
                  <MessageCircle className="ml-2 h-5 w-5 text-kidmam-rose" />
                  المجموعات الخاصة بي
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleFeatureClick("السجلات الطبية")}
                >
                  <FileText className="ml-2 h-5 w-5 text-kidmam-gold" />
                  السجلات الطبية
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleFeatureClick("الإشعارات")}
                >
                  <Bell className="ml-2 h-5 w-5 text-kidmam-purple" />
                  الإشعارات
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleFeatureClick("الإعدادات")}
                >
                  <Settings className="ml-2 h-5 w-5 text-foreground/70" />
                  الإعدادات
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">مستوى الطاقة الافتراضية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block text-kidmam-purple">
                          75%
                        </span>
                      </div>
                    </div>
                    <div className="flex h-2 mb-4 overflow-hidden text-xs bg-kidmam-purple/10 rounded-full">
                      <div style={{ width: "75%" }} className="flex flex-col justify-center text-center text-white bg-gradient-to-r from-kidmam-purple to-kidmam-teal rounded-full transition-width duration-500"></div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    أكملي المهام اليومية لزيادة طاقتك الافتراضية وفتح ميزات خاصة
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2"
                    onClick={() => handleFeatureClick("استكشاف المهام اليومية")}
                  >
                    استكشاف المهام اليومية
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* المحتوى الرئيسي للملف الشخصي */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="pregnancy" className="w-full">
              <TabsList className="w-full mb-6 grid grid-cols-3">
                <TabsTrigger value="pregnancy">تتبع الحمل</TabsTrigger>
                <TabsTrigger value="baby">الطفل</TabsTrigger>
                <TabsTrigger value="health">الصحة والرفاهية</TabsTrigger>
              </TabsList>

              <TabsContent value="pregnancy">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-kidmam-purple" />
                      تتبع الحمل
                    </CardTitle>
                    <CardDescription>
                      متابعة تقدم حملك والمعالم المهمة والتغييرات
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-kidmam-purple/10 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-kidmam-purple mb-2">الأسبوع 24 من الحمل</h3>
                        <p className="text-sm mb-4">
                          طفلك الآن بحجم كرة القدم، وبدأ في تطوير حواسه الخمس. يمكنه الآن سماع صوتك ويستجيب للضوء والصوت والحركة.
                        </p>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <p className="text-xs text-muted-foreground">الوزن التقريبي</p>
                            <p className="font-medium text-kidmam-purple">600 جرام</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <p className="text-xs text-muted-foreground">الطول التقريبي</p>
                            <p className="font-medium text-kidmam-teal">30 سم</p>
                          </div>
                          <div className="bg-white p-3 rounded-md shadow-sm">
                            <p className="text-xs text-muted-foreground">حجم الطفل</p>
                            <p className="font-medium text-kidmam-rose">كرة قدم</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">المهام الأسبوعية</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              <li className="flex items-center">
                                <input type="checkbox" className="ml-2 h-4 w-4 text-kidmam-purple rounded border-gray-300 focus:ring-kidmam-purple" />
                                <span className="text-sm">زيارة طبيب النساء والتوليد</span>
                              </li>
                              <li className="flex items-center">
                                <input type="checkbox" className="ml-2 h-4 w-4 text-kidmam-purple rounded border-gray-300 focus:ring-kidmam-purple" />
                                <span className="text-sm">إكمال قراءة كتاب تحضير الولادة</span>
                              </li>
                              <li className="flex items-center">
                                <input type="checkbox" className="ml-2 h-4 w-4 text-kidmam-purple rounded border-gray-300 focus:ring-kidmam-purple" checked disabled />
                                <span className="text-sm line-through">تمارين الحوض اليومية</span>
                              </li>
                            </ul>
                            <Button 
                              className="w-full mt-4 text-xs" 
                              variant="outline"
                              onClick={() => handleFeatureClick("إضافة مهمة جديدة")}
                            >
                              إضافة مهمة جديدة
                            </Button>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-base">الفحوصات القادمة</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="border-b pb-2">
                                <p className="font-medium text-sm">فحص الجلوكوز</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-muted-foreground">28 مايو, 2024</span>
                                  <span className="text-xs bg-kidmam-teal/20 text-kidmam-teal px-2 py-0.5 rounded-full">مهم</span>
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-sm">زيارة متابعة روتينية</p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-xs text-muted-foreground">10 يونيو, 2024</span>
                                  <span className="text-xs bg-kidmam-purple/20 text-kidmam-purple px-2 py-0.5 rounded-full">روتيني</span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              className="w-full mt-4 text-xs" 
                              variant="outline"
                              onClick={() => handleFeatureClick("إضافة موعد جديد")}
                            >
                              إضافة موعد جديد
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="bg-white p-4 rounded-lg border">
                        <h3 className="text-lg font-medium mb-3">تسجيل يوميات الحمل</h3>
                        <textarea 
                          placeholder="سجلي أفكارك ومشاعرك وتجاربك اليوم..."
                          className="w-full border rounded-md p-3 min-h-[100px] text-sm focus:outline-none focus:ring-1 focus:ring-kidmam-purple focus:border-kidmam-purple"
                        ></textarea>
                        <div className="flex justify-end mt-2">
                          <Button 
                            className="bg-kidmam-purple hover:bg-kidmam-purple/90"
                            onClick={() => handleFeatureClick("حفظ اليوميات")}
                          >
                            <Send className="h-4 w-4 ml-2" />
                            حفظ
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="baby">
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
                  <BabyIcon className="h-16 w-16 text-kidmam-teal/40 mb-4" />
                  <h3 className="text-xl font-amiri font-medium mb-2">معلومات الطفل</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    يمكنك هنا متابعة نمو طفلك وتسجيل حركاته ومشاهدة تصوره بالواقع المعزز
                  </p>
                  <p className="text-sm bg-kidmam-purple/10 text-kidmam-purple px-4 py-2 rounded-full mb-4">
                    هذه الميزة قيد التطوير وستكون متاحة قريباً
                  </p>
                  <Button 
                    onClick={() => handleFeatureClick("استكشاف نمو الطفل")}
                  >
                    تفعيل الإشعارات عند الإطلاق
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="health">
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border">
                  <Settings className="h-16 w-16 text-kidmam-rose/40 mb-4" />
                  <h3 className="text-xl font-amiri font-medium mb-2">الصحة والرفاهية</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    سجلي نشاطك البدني وتغذيتك ونومك وحالتك المزاجية للحصول على نصائح مخصصة
                  </p>
                  <p className="text-sm bg-kidmam-purple/10 text-kidmam-purple px-4 py-2 rounded-full mb-4">
                    هذه الميزة قيد التطوير وستكون متاحة قريباً
                  </p>
                  <Button 
                    onClick={() => handleFeatureClick("تفعيل متابعة الصحة")}
                  >
                    تفعيل الإشعارات عند الإطلاق
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="border-kidmam-purple/50 text-kidmam-purple hover:bg-kidmam-purple/10"
          >
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
