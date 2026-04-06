'use client';

import { 
  Users, 
  ShieldAlert, 
  Activity, 
  Server, 
  ChevronRight,
  Plus,
  ArrowUpRight,
  UserPlus,
  Flag,
  CheckCircle2
} from "lucide-react";

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminDashboardPage() {

  const stats = [
    { label: "Total Users", value: "12,543", trend: "+12.5%", icon: <Users size={20} />, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Pending Reports", value: "42", trend: "High Priority", icon: <ShieldAlert size={20} />, color: "text-red-500", bg: "bg-red-500/10" },
    { label: "Active Sessions", value: "892", trend: "+18%", icon: <Activity size={20} />, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Server Uptime", value: "99.9%", trend: "Stable", icon: <Server size={20} />, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  const recentReports = [
    { type: "Harassment", user: "Michael Clark", status: "Pending", priority: "High", time: "10 mins ago" },
    { type: "Cheating", user: "Lucia Wilde", status: "In Review", priority: "Medium", time: "25 mins ago" },
    { type: "Spam", user: "Alex John", status: "Pending", priority: "Low", time: "1 hour ago" },
  ];

  const newUsers = [
    { name: "Robert Fox", email: "robert@example.com", role: "Teacher", joined: "Today" },
    { name: "Jane Cooper", email: "jane@example.com", role: "Student", joined: "Today" },
    { name: "Cody Fisher", email: "cody@example.com", role: "Student", joined: "Yesterday" },
    { name: "Esther Howard", email: "esther@example.com", role: "Teacher", joined: "Yesterday" },
  ];

  const systemServices = [
    { name: "API Gateway", status: "Operational", load: 24 },
    { name: "Database Cluster", status: "Operational", load: 45 },
    { name: "AI Generation Service", status: "Operational", load: 12 },
    { name: "Static Storage", status: "Operational", load: 68 },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">System Overview</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Welcome back, Super Admin. System is running smoothly.
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg border border-border bg-card hover:bg-secondary transition font-medium">
            System Logs
          </button>

          <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary hover:opacity-90 transition font-medium text-primary-foreground shadow-lg shadow-primary/20">
            <UserPlus size={16}/>
            Add Admin
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-6 shadow-sm group hover:border-primary/50 transition-all">

            <div className="flex justify-between items-start">

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  {stat.label}
                </p>

                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {stat.value}
                  </h3>

                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full bg-background border border-border",
                    stat.color
                  )}>
                    {stat.trend}
                  </span>
                </div>
              </div>

              <div className={cn(
                "p-2.5 rounded-xl transition-transform group-hover:scale-110",
                stat.bg,
                stat.color
              )}>
                {stat.icon}
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Reports */}
        <div className="xl:col-span-2 rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm relative overflow-hidden">

          <div className="flex justify-between items-end relative z-10">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                Recent Violation Reports
              </h2>
              <p className="text-muted-foreground text-sm">
                Handle pending security alerts and user flags
              </p>
            </div>

            <Link href="/admin/reports"
              className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              View All <ArrowUpRight size={14}/>
            </Link>
          </div>

          <div className="space-y-3">

            {recentReports.map((report, i) => (

              <div key={i}
                className="flex items-center justify-between rounded-xl border border-border bg-background/50 p-4 hover:bg-secondary/30 transition"
              >

                <div className="flex items-center gap-4">

                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    report.priority === "High"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-orange-500/10 text-orange-500"
                  )}>
                    <Flag size={18}/>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {report.type} - {report.user}
                    </h4>

                    <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                      <span>{report.time}</span>
                      <span className={report.priority === "High" ? "text-red-500" : ""}>
                        Priority: {report.priority}
                      </span>
                    </div>
                  </div>

                </div>

                <button className="px-4 py-1.5 text-xs font-medium rounded-lg border border-border hover:bg-primary hover:text-white transition">
                  Review
                </button>

              </div>

            ))}

          </div>

          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full"/>

        </div>

        {/* New Users */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">

          <div>
            <h2 className="text-xl font-semibold text-foreground">
              New Registrations
            </h2>
            <p className="text-muted-foreground text-sm">
              Latest users joined the platform
            </p>
          </div>

          <div className="space-y-4">

            {newUsers.map((user, i) => (

              <div key={i} className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-xs font-medium border border-border text-muted-foreground">
                    {user.name.charAt(0)}
                  </div>

                  <div className="overflow-hidden max-w-[120px]">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.role}
                    </p>
                  </div>

                </div>

                <span className="text-xs text-muted-foreground">
                  {user.joined}
                </span>

              </div>

            ))}

          </div>

          <button className="w-full py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-secondary transition">
            Manage All Accounts
          </button>

        </div>
      </div>

      {/* Infrastructure */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Infrastructure Health
            </h2>
            <p className="text-muted-foreground text-sm">
              Real-time status of backend microservices
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-green-500 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
            <CheckCircle2 size={14}/>
            All Systems Operational
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {systemServices.map((service, i) => (

            <div key={i} className="bg-background/50 border border-border rounded-xl p-5 space-y-4">

              <div className="flex justify-between items-start">
                <h4 className="text-xs font-medium text-foreground">
                  {service.name}
                </h4>

                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
              </div>

              <div className="space-y-2">

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current Load</span>
                  <span className="text-foreground">{service.load}%</span>
                </div>

                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">

                  <div
                    className={cn(
                      "h-full transition-all duration-1000",
                      service.load > 60 ? "bg-orange-500" : "bg-primary"
                    )}
                    style={{ width: `${service.load}%` }}
                  />

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}