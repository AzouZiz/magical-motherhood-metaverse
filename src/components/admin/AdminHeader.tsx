
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AdminHeaderProps {
  email: string;
  isSuperAdmin: boolean;
  onLogout: () => void;
}

const AdminHeader = ({ email, isSuperAdmin, onLogout }: AdminHeaderProps) => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <h1 className="font-amiri text-2xl font-bold text-kidmam-purple">لوحة تحكم كيدمام</h1>
          <span className="bg-kidmam-purple/10 text-kidmam-purple px-2 py-1 rounded-md text-xs">
            {isSuperAdmin ? 'المشرف الرئيسي' : 'مشرف مساعد'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 ml-2">{email}</span>
          <Button variant="outline" size="sm" onClick={onLogout}>
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
