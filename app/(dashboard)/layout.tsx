'use client';

import { useState } from "react"; // Giả lập role cho dev
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import { ThemeProvider } from "../_components/theme_provide";
import { UserRole } from "@/app/constants/sidebar-routes";
import Script from "next/script";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [userRole] = useState<UserRole>("ADMIN"); 

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <div className="h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
                <Script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            try {
                                const savedColor = localStorage.getItem('genquiz-accent');
                                if (savedColor) {
                                    document.documentElement.style.setProperty('--primary', savedColor);
                                    document.documentElement.style.setProperty('--sidebar-primary', savedColor);
                                }
                            } catch (e) {}
                        })()
                        `,
                    }}
                />
                
                <Header role = {userRole} />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar role={userRole} />
                    
                    <main className="flex-1 overflow-y-auto scrollbar-hide p-6 relative">
                        <div 
                            className="absolute inset-0 z-[-1] pointer-events-none transition-all duration-700"
                            style={{ 
                                backgroundImage: `linear-gradient(to bottom right, var(--primary) 0%, black 30%, black 70%, #C4503766 100%)`,
                                opacity: 0.15 
                            }}
                        />
                        
                        <div className="relative z-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}