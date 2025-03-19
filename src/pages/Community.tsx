
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import CommunityPost from '@/components/community/CommunityPost';
import CreatePostForm from '@/components/community/CreatePostForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Users, TrendingUp, Sparkles } from 'lucide-react';

// بيانات المنشورات للعرض التوضيحي
const DEMO_POSTS = [
  {
    id: '1',
    authorName: 'سارة أحمد',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    authorRole: 'أم لطفلين',
    content: 'أنا في الأسبوع 28 من الحمل وبدأت أشعر بألم في أسفل الظهر. هل هذا طبيعي؟ وما هي النصائح للتخفيف من هذا الألم؟\n\nلقد جربت بعض تمارين اليوغا البسيطة ولكنها لم تساعد كثيرًا.',
    date: 'منذ ساعتين',
    likesCount: 24,
    commentsCount: 8,
    isLiked: false,
  },
  {
    id: '2',
    authorName: 'د. نورا محمد',
    authorAvatar: 'https://i.pravatar.cc/150?img=5',
    authorRole: 'طبيبة نساء وتوليد',
    content: 'نصائح مهمة للثلث الثالث من الحمل:\n\n1. تناولي وجبات صغيرة ومتكررة\n2. احرصي على شرب الكثير من الماء\n3. خذي قسطًا كافيًا من الراحة\n4. مارسي تمارين خفيفة مثل المشي اليومي\n5. احتفظي بوضعية جيدة للنوم، ويفضل على الجانب الأيسر',
    images: ['https://images.unsplash.com/photo-1519683109889-d9230c56b42d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'],
    date: 'منذ يوم',
    likesCount: 156,
    commentsCount: 32,
    isLiked: true,
  },
  {
    id: '3',
    authorName: 'ليلى عبدالله',
    authorAvatar: 'https://i.pravatar.cc/150?img=10',
    authorRole: 'حامل في الشهر الخامس',
    content: 'هل تعانين من تقلصات في الساق أثناء الحمل؟ وجدت هذه النصائح مفيدة جدًا:\n\n- تدليك الساق بلطف\n- شرب المزيد من الماء\n- تناول الموز للحصول على البوتاسيوم\n- تمدد عضلات الساق قبل النوم',
    images: [
      'https://images.unsplash.com/photo-1544939514-aa98d908331a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621478374422-35206faedbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80'
    ],
    date: 'منذ يومين',
    likesCount: 87,
    commentsCount: 15,
    isLiked: false,
  }
];

const Community = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [likedPosts, setLikedPosts] = useState<string[]>([posts.filter(p => p.isLiked).map(p => p.id)].flat());
  
  const handleCreatePost = async (content: string, images: string[]) => {
    // في التطبيق الحقيقي، هنا ستقوم بإرسال البيانات إلى الخادم
    
    // إضافة المنشور الجديد إلى القائمة المحلية للعرض
    const newPost = {
      id: Date.now().toString(),
      authorName: 'أنتِ',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
      authorRole: 'مستخدمة',
      content,
      images,
      date: 'الآن',
      likesCount: 0,
      commentsCount: 0,
      isLiked: false,
    };
    
    setPosts([newPost, ...posts]);
    return Promise.resolve();
  };
  
  const handleLike = (postId: string) => {
    const isAlreadyLiked = likedPosts.includes(postId);
    
    if (isAlreadyLiked) {
      // إلغاء الإعجاب
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      // إضافة إعجاب
      setLikedPosts([...likedPosts, postId]);
    }
    
    // تحديث عدد الإعجابات في المنشور
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likesCount: isAlreadyLiked ? post.likesCount - 1 : post.likesCount + 1,
          isLiked: !isAlreadyLiked
        };
      }
      return post;
    }));
  };
  
  const handleComment = (postId: string) => {
    toast({
      title: "التعليقات",
      description: "سيتم إضافة ميزة التعليقات قريبًا!",
    });
  };
  
  const handleShare = (postId: string) => {
    toast({
      title: "مشاركة",
      description: "تم نسخ رابط المنشور إلى الحافظة",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2">مجتمع الأمهات</h1>
            <p className="text-gray-600 text-center">تواصلي مع أمهات أخريات وشاركي تجاربك وأسئلتك</p>
          </div>
          
          <div className="flex items-center gap-2 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="ابحثي عن منشورات..." 
                className="pl-10 pr-4"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <Tabs defaultValue="latest" className="mb-6">
            <TabsList className="w-full">
              <TabsTrigger value="latest" className="flex-1">
                <Sparkles className="h-4 w-4 mr-1" />
                <span>الأحدث</span>
              </TabsTrigger>
              <TabsTrigger value="popular" className="flex-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span>الأكثر تفاعلًا</span>
              </TabsTrigger>
              <TabsTrigger value="following" className="flex-1">
                <Users className="h-4 w-4 mr-1" />
                <span>المتابَعين</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="mt-4">
              <CreatePostForm 
                userName="أنتِ" 
                userAvatar="https://i.pravatar.cc/150?img=3" 
                onCreatePost={handleCreatePost}
              />
              
              <div className="mt-6 space-y-4">
                {posts.map(post => (
                  <CommunityPost
                    key={post.id}
                    {...post}
                    isLiked={likedPosts.includes(post.id)}
                    onLike={handleLike}
                    onComment={handleComment}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-4">
              <div className="p-8 text-center text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-kidmam-purple/40" />
                <h3 className="text-lg font-medium mb-1">المنشورات الأكثر تفاعلًا</h3>
                <p className="text-sm">سيتم عرض المنشورات الأكثر تفاعلًا هنا</p>
              </div>
            </TabsContent>
            
            <TabsContent value="following" className="mt-4">
              <div className="p-8 text-center text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-3 text-kidmam-purple/40" />
                <h3 className="text-lg font-medium mb-1">منشورات المتابَعين</h3>
                <p className="text-sm">قومي بمتابعة مستخدمين آخرين لرؤية منشوراتهم هنا</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Community;
