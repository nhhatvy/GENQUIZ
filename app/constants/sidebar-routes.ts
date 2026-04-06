import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  Calendar,
  PlusCircle,
  History,
  TrendingUp
} from "lucide-react";

export const ROUTES_CONFIG = {
  STUDENT: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/student" },
    { icon: PlusCircle, label: "My Quizzes", href: "/student/myquizzes" },
    { icon: History, label: "Study Groups", href: "/student/groups" },
    { icon: BookOpen, label: "Library", href: "/student/library" },
    { icon: TrendingUp, label: "Progress", href: "/student/progress" },
  ],

  TEACHER: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/teacher" },
    { icon: BookOpen, label: "Quizzes", href: "/teacher/quizzes" },
    { icon: Calendar, label: "Events", href: "/teacher/events" },
    { icon: Users, label: "Students", href: "/teacher/students" },
  ],

  ADMIN: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Users, label: "Accounts", href: "/admin/accounts" },
    { icon: BookOpen, label: "Quizzes", href: "/admin/quizmanage" },
    { icon: FileText, label: "Reports", href: "/admin/reports" },
  ],
};

export type UserRole = keyof typeof ROUTES_CONFIG;