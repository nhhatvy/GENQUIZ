'use client';

import { 
    MoreVertical, 
    Search, 
    UserPlus, 
    Mail, 
    Trash2, 
    Ban, 
    ShieldCheck, 
    CheckCircle2, 
    Funnel, 
    ChevronDown,
    AlertCircle,
    Users
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ManageAccountsPage() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const accounts = [
        { id: 1, name: "Alex John", role: "Student", email: "alex.john@example.com", status: "Active", joined: "15/9/2025", quizzes: 15, reports: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        { id: 2, name: "Emma Watson", role: "Teacher", email: "emma.watson@example.com", status: "Active", joined: "20/8/2025", quizzes: 32, reports: 0, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma" },
        { id: 3, name: "Lucas Hery", role: "Student", email: "lucas@example.com", status: "Banned", joined: "10/1/2026", quizzes: 5, reports: 12, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas" },
        { id: 4, name: "Sarah Connor", role: "Teacher", email: "sarah@example.com", status: "Active", joined: "05/12/2025", quizzes: 48, reports: 2, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    ];

    return (
        <div className="space-y-6 relative">
            {/* Overlay đóng menu */}
            {activeMenu !== null && (
                <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setActiveMenu(null)} />
            )}

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-foreground">Account Management</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Manage user accounts and handle violations</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-medium shadow-lg shadow-primary/20 cursor-pointer">
                    <UserPlus size={18} />
                    Add Admin
                </button>
            </div>

            {/* Main Content Card */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl transition-colors duration-300">
                <div className="p-6 space-y-6">
                    {/* Section Title */}
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">User Directory</h2>
                        <p className="text-muted-foreground text-sm">View and manage all registered users</p>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex p-1 bg-secondary/50 rounded-lg border border-border w-fit">
                            {["All Accounts", "Students", "Teachers"].map((tab, idx) => (
                                <button
                                    key={tab}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-sm transition font-medium",
                                        idx === 0 
                                            ? "bg-background text-foreground shadow-sm" 
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    placeholder="Search by name or email..."
                                    className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition cursor-pointer font-medium">
                                <Funnel size={16} />
                                Status
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Account Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                                    <th className="px-4 py-4 font-semibold">User Info</th>
                                    <th className="px-4 py-4 font-semibold">Role</th>
                                    <th className="px-4 py-4 font-semibold text-center">Quizzes</th>
                                    <th className="px-4 py-4 font-semibold text-center">Reports</th>
                                    <th className="px-4 py-4 font-semibold">Status</th>
                                    <th className="px-4 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {accounts.map((user, i) => (
                                    <tr key={user.id} className="group hover:bg-secondary/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border">
                                                    <img src={user.avatar} alt={user.name} className="object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground leading-none">{user.name}</span>
                                                    <span className="text-[11px] text-muted-foreground mt-1">{user.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase px-2 py-1 rounded",
                                                user.role === "Teacher" ? "bg-purple-500/10 text-purple-500" : "bg-blue-500/10 text-blue-500"
                                            )}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-center text-sm font-medium text-foreground/70">{user.quizzes}</td>
                                        <td className="px-4 py-4 text-center font-bold">
                                            <span className={cn("text-sm", user.reports > 0 ? "text-red-500" : "text-foreground/40")}>
                                                {user.reports}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    user.status === "Active" ? "bg-green-500" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                                )} />
                                                <span className="text-sm font-medium text-foreground/80">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right relative">
                                            <button
                                                onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                                                className={cn(
                                                    "p-1.5 rounded-md transition-all cursor-pointer",
                                                    activeMenu === i 
                                                        ? "bg-primary text-primary-foreground" 
                                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                                )}
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeMenu === i && (
                                                <div className="absolute right-4 top-12 w-48 rounded-xl border border-border bg-popover shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer font-medium">
                                                        <ShieldCheck size={14} />
                                                        View Permissions
                                                    </button>
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors cursor-pointer font-medium">
                                                        <Mail size={14} />
                                                        Send Warning
                                                    </button>
                                                    <div className="my-1 border-t border-border" />
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer font-medium">
                                                        <Ban size={14} />
                                                        {user.status === "Active" ? "Ban Account" : "Unban Account"}
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}