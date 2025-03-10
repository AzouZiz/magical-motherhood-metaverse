
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, Calendar, UserPlus, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const posts = [
  {
    id: 1,
    user: { name: 'فاطمة محمد', avatar: '', initials: 'ف' },
    content: 'مرحباً بكل الأمهات! أنا في الأسبوع 24 من حملي وأتساءل عن أفضل التمارين التي يمكنني القيام بها في هذه المرحلة؟',
    time: 'منذ 2 ساعة',
    likes: 15,
    comments: 8,
    shares: 3
  },
  {
    id: 2,
    user: { name: 'نورة أحمد', avatar: '', initials: 'ن' },
    content: 'شاركت اليوم في جلسة "الرحلة العاطفية للحمل" وكانت رائعة! هل حضرها أحد آخر؟ ما أكثر ما أعجبكم فيها؟',
    time: 'منذ 4 ساعات',
    likes: 32,
    comments: 14,
    shares: 6
  },
  {
    id: 3,
    user: { name: 'سارة علي', avatar: '', initials: 'س' },
    content: 'أريد أن أشكر مجتمع كيدمام على الدعم المستمر خلال الثلث الأول من حملي. نصائحكم ساعدتني كثيراً في التغلب على غثيان الصباح! ❤️',
    time: 'منذ يوم واحد',
    likes: 45,
    comments: 22,
    shares: 8
  }
];

const events = [
  {
    id: 1,
    title: 'جلسة حوارية: تغذية الحامل في شهر رمضان',
    date: '18 مايو، 2024',
    time: '6:00 مساءً',
    participants: 24
  },
  {
    id: 2,
    title: 'ورشة عمل: تحضير المنزل لاستقبال المولود',
    date: '22 مايو، 2024',
    time: '4:30 مساءً',
    participants: 18
  }
];

const groups = [
  {
    id: 1,
    name: 'الثلث الثاني من الحمل',
    members: 342,
    image: ''
  },
  {
    id: 2,
    name: 'الأمهات الجدد',
    members: 526,
    image: ''
  },
  {
    id: 3,
    name: 'وصفات غذائية للحوامل',
    members: 218,
    image: ''
  }
];

const Community = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFeatureClick = (featureName: string) => {
    toast({
      title: "قريباً",
      description: `ميزة "${featureName}" قيد التطوير وستكون متاحة قريباً!`,
    });
  };

  return (
    <div className="min-h-screen bg-kidmam-light/30 dark:bg-kidmam-dark/10">
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-amiri font-bold mb-4 text-kidmam-purple">
            مجتمع كيدمام
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            مكان آمن للأمهات للمشاركة والتعلم والتواصل مع نساء يمررن بنفس التجربة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* القائمة الجانبية */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <div className="flex items-center">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/profile')}>
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-kidmam-purple/20 text-kidmam-purple">م</AvatarFallback>
                      </Avatar>
                      <span>الملف الشخصي</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleFeatureClick("مجموعاتي")}
                  >
                    <Users className="ml-2 h-5 w-5 text-kidmam-purple" />
                    مجموعاتي
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleFeatureClick("الأحداث القادمة")}
                  >
                    <Calendar className="ml-2 h-5 w-5 text-kidmam-teal" />
                    الأحداث القادمة
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => handleFeatureClick("المحادثات")}
                  >
                    <MessageCircle className="ml-2 h-5 w-5 text-kidmam-rose" />
                    المحادثات
                  </Button>
                </CardContent>
              </Card>

              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold font-amiri">أحداث قادمة</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {events.map(event => (
                    <div key={event.id} className="border-b pb-3 last:border-0 last:pb-0">
                      <h4 className="font-medium text-kidmam-purple">{event.title}</h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <Calendar className="h-4 w-4 ml-1" />
                        {event.date} • {event.time}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">{event.participants} مشاركة</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => handleFeatureClick("الانضمام للحدث")}
                        >
                          انضمام
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-kidmam-purple"
                    onClick={() => handleFeatureClick("عرض كل الأحداث")}
                  >
                    عرض كل الأحداث
                  </Button>
                </CardFooter>
              </Card>

              <Card className="mb-6">
                <CardHeader className="pb-3">
                  <h3 className="text-lg font-semibold font-amiri">اقتراحات المجموعات</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  {groups.map(group => (
                    <div key={group.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-kidmam-purple/10 flex items-center justify-center ml-3">
                          <span className="text-kidmam-purple">{group.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{group.name}</h4>
                          <p className="text-xs text-muted-foreground">{group.members} عضوة</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleFeatureClick("الانضمام للمجموعة")}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="ghost" 
                    className="w-full text-kidmam-purple"
                    onClick={() => handleFeatureClick("استكشاف المزيد من المجموعات")}
                  >
                    استكشاف المزيد
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>

          {/* المحتوى الرئيسي */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <Tabs defaultValue="feed">
                    <TabsList className="w-full mb-6">
                      <TabsTrigger value="feed" className="flex-1">آخر المشاركات</TabsTrigger>
                      <TabsTrigger value="popular" className="flex-1">الأكثر تفاعلاً</TabsTrigger>
                      <TabsTrigger value="questions" className="flex-1">أسئلة ونصائح</TabsTrigger>
                    </TabsList>
                    <TabsContent value="feed" className="space-y-4">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-kidmam-purple/20 text-kidmam-purple">م</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input 
                            placeholder="شاركي تجربتك أو اطرحي سؤالاً..." 
                            className="w-full"
                            onClick={() => handleFeatureClick("إنشاء منشور")}
                          />
                        </div>
                      </div>

                      {posts.map(post => (
                        <Card key={post.id} className="mb-4 hover:shadow-md transition-shadow">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex items-center">
                                <Avatar className="h-10 w-10 ml-3">
                                  <AvatarImage src={post.user.avatar} />
                                  <AvatarFallback className="bg-kidmam-purple/20 text-kidmam-purple">
                                    {post.user.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{post.user.name}</h4>
                                  <p className="text-xs text-muted-foreground">{post.time}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleFeatureClick("خيارات المنشور")}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="1" />
                                  <circle cx="19" cy="12" r="1" />
                                  <circle cx="5" cy="12" r="1" />
                                </svg>
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2">
                            <p>{post.content}</p>
                          </CardContent>
                          <CardFooter className="pt-2 pb-4 flex justify-between">
                            <div className="flex space-x-4 rtl:space-x-reverse">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground flex items-center text-xs"
                                onClick={() => handleFeatureClick("الإعجاب")}
                              >
                                <Heart className="h-4 w-4 ml-1" />
                                {post.likes}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground flex items-center text-xs"
                                onClick={() => handleFeatureClick("التعليق")}
                              >
                                <MessageCircle className="h-4 w-4 ml-1" />
                                {post.comments}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-muted-foreground flex items-center text-xs"
                                onClick={() => handleFeatureClick("المشاركة")}
                              >
                                <Share2 className="h-4 w-4 ml-1" />
                                {post.shares}
                              </Button>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </TabsContent>
                    <TabsContent value="popular">
                      <div className="flex flex-col items-center justify-center py-12">
                        <Users className="h-16 w-16 text-kidmam-purple/30 mb-4" />
                        <h3 className="text-xl font-amiri font-medium mb-2">المنشورات الأكثر تفاعلاً</h3>
                        <p className="text-muted-foreground text-center max-w-md">
                          هذه الميزة قيد التطوير وستكون متاحة قريباً
                        </p>
                        <Button 
                          className="mt-4" 
                          variant="outline"
                          onClick={() => handleFeatureClick("تفعيل إشعارات المنشورات الشائعة")}
                        >
                          تفعيل الإشعارات عند الإطلاق
                        </Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="questions">
                      <div className="flex flex-col items-center justify-center py-12">
                        <MessageCircle className="h-16 w-16 text-kidmam-purple/30 mb-4" />
                        <h3 className="text-xl font-amiri font-medium mb-2">أسئلة ونصائح</h3>
                        <p className="text-muted-foreground text-center max-w-md">
                          هذه الميزة قيد التطوير وستكون متاحة قريباً
                        </p>
                        <Button 
                          className="mt-4" 
                          variant="outline"
                          onClick={() => handleFeatureClick("طرح سؤال جديد")}
                        >
                          طرح سؤال جديد
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold font-amiri">اكتشفي الأمهات بالقرب منك</h3>
                    <Button 
                      variant="ghost" 
                      className="text-kidmam-purple text-sm"
                      onClick={() => handleFeatureClick("إدارة الموقع")}
                    >
                      إدارة الموقع
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden mb-4">
                    {/* سيتم استبدال هذا بخريطة حقيقية */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">الخريطة قيد التحميل...</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    يمكنك الاتصال بـ 15 أمًا في منطقتك يشاركنك تجربة الحمل
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-kidmam-purple hover:bg-kidmam-purple/90"
                    onClick={() => handleFeatureClick("تفعيل موقعي")}
                  >
                    تفعيل موقعي للاتصال
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
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

export default Community;
