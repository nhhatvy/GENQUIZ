'use client';

import {
    MoreVertical,
    Search,
    Trash2,
    AlertCircle,
    ExternalLink,
    ShieldCheck,
    Funnel,
    ChevronDown,
    BookOpen
} from "lucide-react";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ManageQuizzesPage() {

    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [filter, setFilter] = useState("All Quizzes");

    const quizzes = [
        { id: 1, title: "Introduction to Biology", author: "Emma Watson", category: "Science", status: "Active", questions: 20, reports: 0 },
        { id: 2, title: "Advanced Political Theory", author: "Sarah Connor", category: "Social", status: "Reported", questions: 15, reports: 12 },
        { id: 3, title: "Quick Math for Kids", author: "Alex John", category: "Mathematics", status: "Active", questions: 10, reports: 0 },
        { id: 4, title: "World War II History", author: "Michael Clark", category: "History", status: "Reported", questions: 25, reports: 3 },
    ];

    return (
        <div className="space-y-6 relative animate-in fade-in duration-500 font-sans">

            {activeMenu !== null && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setActiveMenu(null)}
                />
            )}

            {/* Header */}

            <div className="flex items-center justify-between">

                <div>
                    <h2 className="text-2xl font-heading font-semibold text-foreground tracking-tight">
                        Quiz Management
                    </h2>

                    <p className="text-muted-foreground mt-1 text-sm font-medium">
                        Monitor all quizzes and handle community reports
                    </p>
                </div>

            </div>

            {/* Main Card */}

            <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">

                <div className="p-6 space-y-6">

                    {/* Title */}

                    <div className="flex items-end justify-between border-b border-border/50 pb-4">

                        <div>

                            <h2 className="text-xl font-heading font-semibold text-foreground">
                                Content Directory
                            </h2>

                            <p className="text-muted-foreground text-sm font-medium">
                                Review and moderate quiz content
                            </p>

                        </div>

                    </div>

                    {/* Filters */}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        <div className="flex p-1 bg-secondary/50 rounded-lg border border-border w-fit">

                            {["All Quizzes", "Reported", "Drafts"].map((tab) => (

                                <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-md text-sm font-semibold transition",
                                        filter === tab
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

                                <Search
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                />

                                <input
                                    placeholder="Search quiz title or author..."
                                    className="bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
                                />

                            </div>

                            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:bg-secondary transition cursor-pointer">
                                <Funnel size={16} />
                                Category
                                <ChevronDown size={14} />
                            </button>

                        </div>

                    </div>

                    {/* Table */}

                    <div className="overflow-x-auto">

                        <table className="w-full text-left border-collapse">

                            <thead>

                                <tr className="text-muted-foreground text-xs font-semibold uppercase border-b border-border">

                                    <th className="px-4 py-4">Quiz</th>
                                    <th className="px-4 py-4">Author</th>
                                    <th className="px-4 py-4 text-center">Questions</th>
                                    <th className="px-4 py-4 text-center">Reports</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4 text-right">Actions</th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-border/50">

                                {quizzes.map((quiz, i) => (

                                    <tr
                                        key={quiz.id}
                                        className="hover:bg-secondary/20 transition-colors"
                                    >

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-3">

                                                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                                                    <BookOpen size={18} />
                                                </div>

                                                <div className="flex flex-col">

                                                    <span className="font-semibold text-foreground text-sm">
                                                        {quiz.title}
                                                    </span>

                                                    <span className="text-xs text-muted-foreground font-medium">
                                                        {quiz.category}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium">
                                            {quiz.author}
                                        </td>

                                        <td className="px-4 py-4 text-center text-sm font-medium">
                                            {quiz.questions}
                                        </td>

                                        <td className="px-4 py-4 text-center">

                                            <span
                                                className={cn(
                                                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                                                    quiz.reports > 0
                                                        ? "bg-red-500/10 text-red-500"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {quiz.reports > 0
                                                    ? `${quiz.reports} Reports`
                                                    : "-"}
                                            </span>

                                        </td>

                                        <td className="px-4 py-4">

                                            <div className="flex items-center gap-2">

                                                <div
                                                    className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        quiz.status === "Active"
                                                            ? "bg-green-500"
                                                            : "bg-red-500"
                                                    )}
                                                />

                                                <span className="text-xs font-semibold uppercase">
                                                    {quiz.status}
                                                </span>

                                            </div>

                                        </td>

                                        <td className="px-4 py-4 text-right relative">

                                            <button
                                                onClick={() =>
                                                    setActiveMenu(activeMenu === i ? null : i)
                                                }
                                                className="p-1.5 rounded-md text-muted-foreground hover:bg-secondary"
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {activeMenu === i && (

                                                <div className="absolute right-4 top-12 w-52 rounded-xl border border-border bg-popover shadow-xl z-50 overflow-hidden py-1.5">

                                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition">
                                                        <ExternalLink size={14} />
                                                        View Quiz
                                                    </button>

                                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary transition">
                                                        <ShieldCheck size={14} />
                                                        Change Visibility
                                                    </button>

                                                    <div className="my-1 border-t border-border" />

                                                    <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-500/10 transition">
                                                        <Trash2 size={14} />
                                                        Delete Quiz
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