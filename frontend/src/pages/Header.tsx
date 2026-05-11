import { UserRoundCheck } from 'lucide-react';

export default function HeaderMain() {
  return (
    <header className="bg-linear-to-r backdrop-blur-md border-b border-slate-500 h-15 
                        md:h-16 lg:h-18 w-full fixed top-0 left-0 z-50 from-slate-900 to-purple-950
                         text-white flex items-stretch">
        
        <div className="bg-purple-950 flex items-center px-4 gap-3 border-r border-slate-500">
            <UserRoundCheck size={37} className="user-icon-header hover:scale-120 cursor-pointer" />
            <h1 className="text-2xl font-bold text-slate-300 font-mono">Secure Authentication</h1>
        </div>
    </header>
  );
}