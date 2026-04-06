'use client';

import {
    MoreVertical,
    Search,
    UserPlus,
    Mail,
    Trash2,
    Edit2,
    Funnel,
    ChevronDown,
} from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function StudentsPage() {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState("All Students");
    const [search, setSearch] = useState("");
    const [sortAsc, setSortAsc] = useState(true);

    const students = [
        { id: 1, name: "Alex Johnson", class: "10A", quizzesTaken: 12, avgScore: 85, lastActive: "2 hours ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        { id: 2, name: "Jordan Lee", class: "10B", quizzesTaken: 8, avgScore: 78, lastActive: "5 hours ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" },
        { id: 3, name: "Kris Walker", class: "10A", quizzesTaken: 15, avgScore: 92, lastActive: "1 day ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kris" },
        { id: 4, name: "Taylor Smith", class: "10B", quizzesTaken: 10, avgScore: 81, lastActive: "30 minutes ago", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor" },
    ];

    /* FILTER */
    const filteredStudents = students
        .filter((s) => {
            if (activeTab === "All Students") return true;
            return s.class === activeTab;
        })
        .filter((s) =>
            s.name.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            sortAsc
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );

    return (
        <div className="space-y-6 relative">
            {activeMenu !== null && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setActiveMenu(null)}
                />
            )}

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Students</h2>
                    <p className="text-muted-foreground text-sm">
                        Manage your students and track their progress
                    </p>
                </div>

                <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition font-medium">
                    <UserPlus size={18} />
                    Invite Students
                </button>
            </div>

            {/* CARD */}
            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold">Student Directory</h2>
                        <p className="text-muted-foreground text-sm">
                            View and manage all your students
                        </p>
                    </div>

                    {/* FILTER BAR */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* TABS */}
                        <div className="flex p-1 bg-secondary/50 rounded-lg border border-border w-fit">
                            {["All Students", "10A", "10B"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-sm transition font-medium",
                                        activeTab === tab
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">

                            {/* SEARCH */}
                            <div className="relative">
                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />
                                <input
                                    placeholder="Search students..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition w-64"
                                />
                            </div>

                            {/* SORT */}
                            <button
                                onClick={() => setSortAsc(!sortAsc)}
                                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition"
                            >
                                <Funnel size={16} />
                                Name
                                <ChevronDown
                                    size={14}
                                    className={cn(
                                        "transition",
                                        !sortAsc && "rotate-180"
                                    )}
                                />
                            </button>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-muted-foreground text-xs uppercase border-b border-border">
                                    <th className="px-4 py-4">Name</th>
                                    <th className="px-4 py-4">Class</th>
                                    <th className="px-4 py-4">Quizzes Taken</th>
                                    <th className="px-4 py-4">Average Score</th>
                                    <th className="px-4 py-4">Last Active</th>
                                    <th className="px-4 py-4 text-right">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-border/50">
                                {filteredStudents.map((student, i) => (
                                    <tr
                                        key={student.id}
                                        className="group hover:bg-secondary/30 transition"
                                    >
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={student.avatar}
                                                    className="w-9 h-9 rounded-full border border-border"
                                                    alt=""
                                                />
                                                <span className="font-medium">
                                                    {student.name}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4 text-sm">{student.class}</td>

                                        <td className="px-4 py-4 text-sm">
                                            {student.quizzesTaken}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-1 rounded">
                                                {student.avgScore}%
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm">
                                            {student.lastActive}
                                        </td>

                                        <td className="px-4 py-4 text-right relative">
                                            <button
                                                onClick={() =>
                                                    setActiveMenu(activeMenu === i ? null : i)
                                                }
                                                className={cn(
                                                    "p-1.5 rounded-md",
                                                    activeMenu === i
                                                        ? "bg-primary text-primary-foreground"
                                                        : "text-muted-foreground hover:bg-secondary"
                                                )}
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeMenu === i && (
                                                <div className="absolute right-4 top-12 w-45 rounded-xl border border-border bg-popover shadow-2xl z-50 overflow-hidden py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer font-medium">
                                                        <Edit2 size={14} /> Edit Profile
                                                    </button>
                                                
                                                  
                                                    <button className="w-full flex items-center justify-start gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer font-medium">
                                                        <Trash2 size={14} /> Remove Student </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {filteredStudents.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground text-sm">
                                No students found
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}