
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image as ImageIcon, Smile, Send } from 'lucide-react';
import { toast } from 'sonner';

interface CreatePostFormProps {
  userAvatar?: string;
  userName: string;
  onCreatePost: (content: string, images: string[]) => Promise<void>;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({
  userAvatar,
  userName,
  onCreatePost,
}) => {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    
    Array.from(files).forEach(file => {
      // التحقق من حجم الملف (5MB كحد أقصى)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('حجم الصورة كبير جدًا. الحد الأقصى هو 5 ميجابايت.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          // تحديث حالة الصور فقط بعد اكتمال قراءة جميع الملفات
          if (newImages.length === files.length) {
            setSelectedImages(prev => [...prev, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      toast.error('يرجى كتابة محتوى أو إضافة صورة قبل النشر.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onCreatePost(content, selectedImages);
      // إعادة تعيين النموذج بعد النشر
      setContent('');
      setSelectedImages([]);
      toast.success('تم نشر المشاركة بنجاح!');
    } catch (error) {
      console.error('فشل في نشر المشاركة:', error);
      toast.error('حدث خطأ أثناء نشر المشاركة. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="border-kidmam-teal/10 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3 rtl:space-x-reverse mb-3">
          <Avatar className="h-10 w-10 border border-kidmam-purple/20">
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback className="bg-kidmam-purple/10 text-kidmam-purple">
              {userName?.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <textarea
              placeholder="شاركي تجربتك أو اطرحي سؤالاً..."
              className="w-full min-h-[100px] text-base border-0 focus:ring-0 p-2 bg-secondary/30 rounded-lg resize-none"
              dir="rtl"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            
            {selectedImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={image} 
                      alt={`صورة ${index + 1}`} 
                      className="h-24 w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500"
                  onClick={handleClickImageUpload}
                >
                  <ImageIcon className="h-5 w-5 mr-1" />
                  <span>إضافة صورة</span>
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={handleImageSelect}
                />
                
                <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                  <Smile className="h-5 w-5 mr-1" />
                  <span>مشاعر</span>
                </Button>
              </div>
              
              <Button 
                type="button" 
                variant="default" 
                className="bg-kidmam-purple hover:bg-kidmam-purple/90"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                <Send className="h-4 w-4 mr-1" />
                <span>نشر</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
