'use client';

import { useState } from "react";
import Link from "next/link";
import {
    GraduationCap,
    Presentation,
    User,
    Mail,
    Lock,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/app/_components/Logo";

export default function LoginrPage() {
    const [role, setRole] = useState<'student' | 'teacher'>('student');

    return (
        <div className="flex h-screen bg-background overflow-hidden selection:bg-primary/30">

            <div className="hidden lg:flex flex-1 relative bg-[#020203] items-center justify-center overflow-hidden border-r border-border selection:bg-primary/30">

                <div className="absolute inset-0 z-0 pointer-events-none">

                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                        <div
                            className="absolute bottom-1/2 left-[-50%] w-[200%] h-[150%] opacity-[0.15]"
                            style={{
                                backgroundImage: `
      linear-gradient(to right, #333 1px, transparent 1px),
      linear-gradient(to bottom, #333 1px, transparent 1px)
    `,
                                backgroundSize: '45px 45px',
                                transform: 'perspective(1000px) rotateX(-65deg)',
                                transformOrigin: 'center bottom',

                                maskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
                                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
                            }}
                        />
                        <div
                            className="absolute bottom-1/2 left-[-50%] w-[200%] h-[150%] opacity-[0.15]"
                            style={{
                                backgroundImage: `
      linear-gradient(to right, #333 1px, transparent 1px),
      linear-gradient(to bottom, #333 1px, transparent 1px)
    `,
                                backgroundSize: '45px 45px',
                                transform: 'perspective(1000px) rotateX(-65deg)',
                                transformOrigin: 'center bottom',

                                maskImage: 'linear-gradient(to top, transparent 0%, black 40%)',
                                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 40%)'
                            }}
                        />
                        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,#5813C133_0%,transparent_60%)] blur-6xl pointer-events-none" />
                        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,#C4503722_0%,transparent_60%)] blur-6xl pointer-events-none" />
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#5813C122_0%,transparent_50%)]"
                        />
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-primary/20 blur-[120px] rounded-full" />
                </div>
                <div className="relative z-10 scale-[1.8] transition-transform duration-500 hover:scale-[2]">
                    <div className="bg-gradient-to-r from-[#5813C1] via-[#8B5CF6] to-[#C45037] bg-clip-text text-transparent">
                        <Logo />
                    </div>
                </div>

            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white h-screen overflow-y-auto scrollbar-hide">
                <div className="w-[550px] space-y-7 py-2">

                    <div className="space-y-1.5">
                        <h1 className="text-3xl font-bold text-black tracking-tight">Welcome Back</h1>
                        <p className="text-gray-500 text-sm font-medium">
                            Enter your credentials to access your account
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all cursor-pointer text-gray-900 shadow-sm">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/action/google.svg" className="w-4 h-4" alt="Google" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all cursor-pointer text-gray-900 shadow-sm">
                            <svg className="w-4 h-4 text-[#1877F2] fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            Facebook
                        </button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300" /></div>
                        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-gray-400 font-bold tracking-widest">OR</span></div>
                    </div>

                    <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>

                        <div className="space-y-1.5 flex flex-col items-start">
                            <label className="text-[11px] font-black text-gray-900 uppercase tracking-wider ml-1">Email</label>
                            <div className="relative w-full">
                                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="email" placeholder="name@example.com" className="w-full bg-gray-50 border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-black placeholder:text-gray-400" />
                            </div>
                        </div>

                        <div className="space-y-1.5 flex flex-col items-start">
                            <label className="text-[11px] font-black text-gray-900 uppercase tracking-wider ml-1">Password</label>
                            <div className="relative w-full">
                                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-300 rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-black placeholder:text-gray-400" />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/25 hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer mt-2 uppercase tracking-wide">
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 font-medium">
                        Don't have an account? <Link href="/register" className="text-primary font-bold hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}