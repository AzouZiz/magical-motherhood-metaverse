
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

interface CommunityPostProps {
  id: string;
  authorName: string;
  authorAvatar?: string;
  authorRole?: string;
  content: string;
  images?: string[];
  date: string;
  likesCount: number;
  commentsCount: number;
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onComment?: (id: string) => void;
  onShare?: (id: string) => void;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  id,
  authorName,
  authorAvatar,
  authorRole,
  content,
  images,
  date,
  likesCount,
  commentsCount,
  isLiked = false,
  onLike,
  onComment,
  onShare,
}) => {
  const handleLike = () => {
    if (onLike) onLike(id);
  };

  const handleComment = () => {
    if (onComment) onComment(id);
  };

  const handleShare = () => {
    if (onShare) onShare(id);
  };

  // تحويل النص إلى فقرات
  const contentParagraphs = content.split('\n').filter(p => p.trim() !== '');

  return (
    <Card className="border-kidmam-teal/10 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Avatar className="h-10 w-10 border border-kidmam-purple/20">
              <AvatarImage src={authorAvatar} alt={authorName} />
              <AvatarFallback className="bg-kidmam-purple/10 text-kidmam-purple">
                {authorName?.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium leading-none">{authorName}</div>
              {authorRole && <div className="text-xs text-muted-foreground mt-1">{authorRole}</div>}
            </div>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground ml-2">{date}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="py-3">
        <div className="space-y-2">
          {contentParagraphs.map((paragraph, idx) => (
            <p key={idx} className="text-sm">
              {paragraph}
            </p>
          ))}
        </div>
        
        {images && images.length > 0 && (
          <div className={`mt-3 grid ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2`}>
            {images.map((image, idx) => (
              <div 
                key={idx} 
                className={`rounded-md overflow-hidden ${
                  images.length === 1 ? 'aspect-video' : 'aspect-square'
                }`}
              >
                <img 
                  src={image} 
                  alt={`صورة ${idx + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 pb-4 border-t border-muted/20">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{likesCount} إعجاب</span>
            <span className="mx-2">•</span>
            <span>{commentsCount} تعليق</span>
          </div>
          
          <div className="flex space-x-1 rtl:space-x-reverse">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-8 px-2 ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-red-500' : ''}`} />
              <span className="text-xs">إعجاب</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={handleComment}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              <span className="text-xs">تعليق</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4 mr-1" />
              <span className="text-xs">مشاركة</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CommunityPost;
