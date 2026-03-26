"use client";
import { 
  Bell, 
  ChevronDown, 
  LogOut, 
  Search, 
  Settings, 
  User,
  Menu // Import thêm Menu nếu bạn muốn nút mở sidebar trên mobile nằm ở đây
} from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 shadow-sm flex items-center justify-between px-6 sticky top-0 z-20">
      
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-bold text-blue-950">Overview</h2>
      </div>

      <div className="flex items-center gap-4">
        
        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-slate-400" />
          </span>

          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="w-64 pl-10 pr-4 py-2 text-sm text-slate-900  border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>


        <button className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-6 w-px bg-slate-300 mx-1"></div>


        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
               <User size={18} className="text-blue-600" />
            </div>
            
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-700">Nguyễn Admin</p>
              <p className="text-xs text-slate-500">Quản trị viên</p>
            </div>

            <ChevronDown size={16} className={`text-slate-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
          </button>


          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border border-slate-100 py-1 animation-fade-in origin-top-right">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">Tài khoản</p>
              </div>
              
              <a href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                <User size={16} /> Hồ sơ
              </a>
              <a href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors">
                <Settings size={16} /> Cài đặt
              </a>
              
              <div className="border-t border-slate-100 my-1"></div>
              
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                <LogOut size={16} /> Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}