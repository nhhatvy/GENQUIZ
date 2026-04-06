'use client';
import { Camera, Save } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfileSettings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Quiz Library Card Style - Thay đổi màu sắc dựa trên biến hệ thống */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-8 shadow-lg transition-colors duration-300">
        
        {/* Title & Description Section */}
        <div className="border-b border-border pb-6">
          <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Update your profile information and public details
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Side: Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-secondary border-4 border-border flex items-center justify-center overflow-hidden transition-all group-hover:border-primary/50">
                {/* Thay bằng thẻ <img /> nếu có ảnh thực tế */}
                <div className="text-muted-foreground group-hover:scale-110 transition-transform">
                   <Camera size={40} />
                </div>
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-xs font-medium text-white">Upload</span>
              </div>
            </div>
            {/* Nút phụ sử dụng màu trung tính */}
            <button className="flex items-center gap-2 px-4 py-2 text-xs border border-border rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition cursor-pointer">
              Change Photo
            </button>
          </div>

          {/* Right Side: Form Fields Section */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                <input 
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" 
                  defaultValue="John" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                <input 
                  type="text"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" 
                  defaultValue="Doe" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input 
                  type="email"
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium" 
                  defaultValue="johndoe@gmail.com" 
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Bio</label>
                <textarea 
                  rows={4}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-medium" 
                  placeholder="Tell us about yourself..."
                  defaultValue="Science teacher with 10+ years of experience. Passionate about making learning fun and engaging through interactive quizzes."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-6 py-2.5 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-bold shadow-lg shadow-primary/20 active:scale-95 cursor-pointer">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="text-center text-xs text-muted-foreground">
        Need help with your account settings? <span className="text-primary hover:underline cursor-pointer font-bold">Contact Support</span>
      </p>
    </div>
  );
}