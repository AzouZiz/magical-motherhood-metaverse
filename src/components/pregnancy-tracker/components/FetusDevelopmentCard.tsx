
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FetusDevelopment } from '../types';

type FetusDevelopmentCardProps = {
  weekNumber: number;
  fetusDevelopment: FetusDevelopment;
};

const FetusDevelopmentCard: React.FC<FetusDevelopmentCardProps> = ({
  weekNumber,
  fetusDevelopment,
}) => {
  return (
    <Card className="glass-card">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <motion.div
            key={`title-${weekNumber}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold mb-4">
              طفلك في الأسبوع {weekNumber}
            </h3>
            <p className="text-muted-foreground mb-6">
              {fetusDevelopment.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div
              key={`size-${weekNumber}`}
              className="bg-muted/40 p-4 rounded-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <p className="text-sm text-muted-foreground mb-1">الحجم</p>
              <p className="text-xl font-bold gradient-text">{fetusDevelopment.size}</p>
            </motion.div>
            
            <motion.div
              key={`weight-${weekNumber}`}
              className="bg-muted/40 p-4 rounded-lg text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <p className="text-sm text-muted-foreground mb-1">الوزن</p>
              <p className="text-xl font-bold gradient-text">{fetusDevelopment.weight}</p>
            </motion.div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">أبرز التطورات</h4>
            <ul className="space-y-2">
              {fetusDevelopment.highlights.map((highlight, index) => (
                <motion.li
                  key={`highlight-${weekNumber}-${index}`}
                  className="flex items-start"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                >
                  <span className="inline-block w-2 h-2 mt-2 mr-2 bg-kidmam-purple rounded-full"></span>
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button className="w-full bg-gradient-to-r from-kidmam-purple to-kidmam-teal text-white">
              عرض التفاصيل الكاملة
            </Button>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FetusDevelopmentCard;
