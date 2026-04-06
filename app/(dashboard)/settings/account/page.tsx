'use client';
import { ShieldCheck, Trash2, Key, Globe, Mail } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AccountSettings() {
  const [isTwoFactor, setIsTwoFactor] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* 1. Account Security Section */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-lg transition-colors">
        <div className="border-b border-border pb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Key size={20} className="text-primary" /> Account Security
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Update your password and security settings</p>
        </div>

        <div className="max-w-md space-y-4">
          {[
            { label: "Current Password", placeholder: "••••••••" },
            { label: "New Password", placeholder: "Enter new password" },
            { label: "Confirm New Password", placeholder: "Repeat new password" },
          ].map((field) => (
            <div key={field.label} className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">{field.label}</label>
              <input 
                type="password"
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" 
                placeholder={field.placeholder}
              />
            </div>
          ))}
          
          <button className="px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-bold shadow-lg shadow-primary/20 active:scale-95 cursor-pointer">
            Update Password
          </button>
        </div>
      </div>

      {/* 2. Two-Factor Authentication Section */}
      <div className="rounded-xl border border-border bg-card p-6 flex items-center justify-between shadow-lg transition-colors">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck size={20} className="text-primary" /> Two-Factor Authentication
          </h2>
          <p className="text-muted-foreground text-sm font-medium">Add an extra layer of security to your account</p>
          <p className="text-xs text-muted-foreground/60 mt-2">Receive a verification code via email or authenticator app</p>
        </div>
        
        {/* Custom Toggle Switch - Sử dụng màu Primary */}
        <button 
          onClick={() => setIsTwoFactor(!isTwoFactor)}
          className={cn(
            "w-12 h-6 rounded-full transition-all relative cursor-pointer shadow-inner",
            isTwoFactor ? 'bg-primary' : 'bg-muted'
          )}
        >
          <div className={cn(
            "absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md",
            isTwoFactor ? 'left-7' : 'left-1'
          )} />
        </button>
      </div>

      {/* 3. Connected Accounts Section */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-lg">
        <div className="border-b border-border pb-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Globe size={20} className="text-primary" /> Connected Accounts
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Connect your account to other services</p>
        </div>

        <div className="space-y-3">
          {[
            { name: "Google", icon: "G", desc: "Connect your Google account" },
            { name: "Facebook", icon: "f", desc: "Connect your Facebook account" },
            { name: "X", icon: "X", desc: "Connect your X account" },
          ].map((app) => (
            <div key={app.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/30 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary border border-primary/20 shadow-sm">
                  {app.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">{app.name}</h4>
                  <p className="text-xs text-muted-foreground font-medium">{app.desc}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 text-[11px] font-black uppercase tracking-wider border border-primary/30 bg-primary/5 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Danger Zone Section */}
      <div className="rounded-xl border border-destructive/30 bg-card p-6 space-y-6 shadow-lg">
        <div>
          <h2 className="text-xl font-semibold text-destructive flex items-center gap-2">
            <ShieldCheck size={20} /> Danger Zone
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Irreversible actions for your account</p>
        </div>

        <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-destructive">Delete Account</h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-md font-medium">
              Once you delete your account, there is no going back. All your data will be permanently removed.
            </p>
          </div>
          <button className="px-5 py-2 text-sm rounded-lg cursor-pointer bg-destructive hover:opacity-90 transition font-bold text-destructive-foreground shadow-lg shadow-destructive/20 active:scale-95">
            Delete Account
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground pt-4 font-medium">
        Need help with your account settings? <span className="text-primary hover:underline cursor-pointer font-bold">Contact Support</span>
      </p>
    </div>
  );
}