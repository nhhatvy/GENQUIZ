'use client';

import { 
    MoreVertical, 
    Search, 
    Flag, 
    Mail, 
    Trash2, 
    AlertCircle, 
    ShieldAlert, 
    CheckCircle2, 
    Funnel, 
    ChevronDown,
    Clock,
    XCircle,
    Eye
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ReportsManagementPage() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);

    const reports = [
        { 
            id: 1, 
            type: "Harassment", 
            priority: "High", 
            reporter: "Emma Watson", 
            reportedUser: "Michael Clark", 
            status: "Pending", 
            date: "2026-03-26",
            avatarReporter: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            avatarReported: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        },
        { 
            id: 2, 
            type: "Cheating", 
            priority: "High", 
            reporter: "Alex John", 
            reportedUser: "Lucia Wilde", 
            status: "Pending", 
            date: "2026-03-25",
            avatarReporter: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            avatarReported: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucia"
        },
        { 
            id: 3, 
            type: "Spam Content", 
            priority: "Medium", 
            reporter: "Sophia Green", 
            reportedUser: "Michael Clark", 
            status: "Resolved", 
            date: "2026-03-24",
            avatarReporter: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
            avatarReported: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
        },
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
                    <h2 className="text-2xl font-bold text-foreground">Reports Management</h2>
                    <p className="text-muted-foreground mt-1 text-sm">Review and handle user violation reports</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg border border-border bg-card text-foreground hover:bg-secondary transition font-medium cursor-pointer">
                        <Clock size={18} />
                        History
                    </button>
                </div>
            </div>

            {/* Main Content Card */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl transition-colors duration-300">
                <div className="p-6 space-y-6">
                    {/* Section Title */}
                    <div>
                        <h2 className="text-xl font-semibold text-foreground">Violation Reports</h2>
                        <p className="text-muted-foreground text-sm">Monitor and resolve community issues</p>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex p-1 bg-secondary/50 rounded-lg border border-border w-fit">
                            {["All Reports", "Pending", "Resolved", "Rejected"].map((tab, idx) => (
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
                                    placeholder="Search by user or type..."
                                    className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition cursor-pointer font-medium">
                                <Funnel size={16} />
                                Priority
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Reports Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                                    <th className="px-4 py-4 font-semibold">Violation Type</th>
                                    <th className="px-4 py-4 font-semibold">Reporter</th>
                                    <th className="px-4 py-4 font-semibold">Reported User</th>
                                    <th className="px-4 py-4 font-semibold text-center">Priority</th>
                                    <th className="px-4 py-4 font-semibold">Status</th>
                                    <th className="px-4 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {reports.map((report, i) => (
                                    <tr key={report.id} className="group hover:bg-secondary/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "p-2 rounded-lg",
                                                    report.type === "Harassment" ? "bg-red-500/10 text-red-500" : "bg-orange-500/10 text-orange-500"
                                                )}>
                                                    <Flag size={16} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-foreground leading-none">{report.type}</span>
                                                    <span className="text-[11px] text-muted-foreground mt-1">{report.date}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <img src={report.avatarReporter} alt="" className="w-7 h-7 rounded-full border border-border" />
                                                <span className="text-sm font-medium text-foreground/80">{report.reporter}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <img src={report.avatarReported} alt="" className="w-7 h-7 rounded-full border border-border" />
                                                <span className="text-sm font-medium text-foreground/80">{report.reportedUser}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-center font-bold">
                                            <span className={cn(
                                                "text-[10px] uppercase px-2 py-1 rounded",
                                                report.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                            )}>
                                                {report.priority}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <span className={cn(
                                                    "w-1.5 h-1.5 rounded-full",
                                                    report.status === "Resolved" ? "bg-green-500" : "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                                                )} />
                                                <span className="text-sm font-medium text-foreground/80">{report.status}</span>
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
                                                        <Eye size={14} />
                                                        View Details
                                                    </button>
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-secondary transition-colors cursor-pointer font-medium">
                                                        <CheckCircle2 size={14} />
                                                        Mark as Resolved
                                                    </button>
                                                    <div className="my-1 border-t border-border" />
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer font-medium">
                                                        <XCircle size={14} />
                                                        Reject Report
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