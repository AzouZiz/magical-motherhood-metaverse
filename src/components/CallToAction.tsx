
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Baby, Heart, Star, Award } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-kidmam-purple/20 via-transparent to-kidmam-teal/20"></div>
      
      {/* Decoration Elements */}
      <motion.div 
        className="absolute -top-10 -left-10 w-40 h-40 bg-kidmam-purple/10 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-10 -right-10 w-40 h-40 bg-kidmam-teal/10 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="glass-card max-w-4xl mx-auto text-center py-12 px-4 md:px-12 rounded-2xl overflow-hidden relative">
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shimmer"></div>
          
          {/* Floating Icons */}
          <motion.div 
            className="absolute top-5 left-10 text-kidmam-purple/40"
            animate={{ y: [-5, 5, -5], rotate: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Baby className="w-8 h-8" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-5 right-10 text-kidmam-teal/40"
            animate={{ y: [-5, 5, -5], rotate: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          >
            <Heart className="w-8 h-8" />
          </motion.div>
          
          <motion.div 
            className="absolute top-10 right-20 text-kidmam-gold/40"
            animate={{ y: [-4, 4, -4], rotate: [0, 15, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <Star className="w-6 h-6" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 left-20 text-kidmam-rose/40"
            animate={{ y: [-4, 4, -4], rotate: [0, -15, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <Award className="w-6 h-6" />
          </motion.div>
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">ابدئي رحلتك في عالم كيدمام</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              انضمي إلى الآلاف من الأمهات اللاتي اكتشفن عالمًا جديدًا من الرعاية والدعم والمعرفة. كيدمام ليس مجرد تطبيق، بل هو رفيقك في واحدة من أجمل رحلات حياتك.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-kidmam-purple/10 flex items-center justify-center mx-auto mb-3">
                  <Baby className="h-6 w-6 text-kidmam-purple" />
                </div>
                <h3 className="font-medium">تقنية متطورة</h3>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-kidmam-teal/10 flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-6 w-6 text-kidmam-teal" />
                </div>
                <h3 className="font-medium">رعاية شاملة</h3>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-kidmam-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-kidmam-gold" />
                </div>
                <h3 className="font-medium">تجربة فريدة</h3>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-kidmam-rose/10 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-6 w-6 text-kidmam-rose" />
                </div>
                <h3 className="font-medium">جودة عالية</h3>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="btn-primary">
                سجلي الآن مجانًا
              </Button>
              <Button size="lg" variant="outline">
                عرض الخطط والأسعار
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
