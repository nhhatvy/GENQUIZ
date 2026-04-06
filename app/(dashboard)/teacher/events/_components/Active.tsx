'use client';

import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Activity,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Zap
} from "lucide-react";

export default function QuizLiveView({
  event,
  onBack,
}: {
  event: any;
  onBack: () => void;
}) {

  const stats = [
    { label: "Total Joined", value: "32/35", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "In Progress", value: "28", icon: Activity, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Submitted", value: "4", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Suspicious", value: "2", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="p-2 border border-border rounded-md hover:bg-secondary transition"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="flex items-center gap-2">

              <h2 className="text-xl font-bold text-foreground">
                {event.title}
              </h2>

              <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500/10 text-red-500 border border-red-500/20">
                <Zap size={10} fill="currentColor" />
                Live
              </span>

            </div>

            <p className="text-sm text-muted-foreground">
              {event.quizName}
            </p>
          </div>

        </div>

        {/* Timer */}
        <div className="flex items-center gap-3 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">

          <div className="w-9 h-9 bg-red-500/10 rounded-md flex items-center justify-center text-red-500">
            <Clock size={18} />
          </div>

          <div>
            <p className="text-[10px] font-semibold text-muted-foreground uppercase">
              Time Remaining
            </p>

            <p className="text-lg font-mono font-bold text-foreground">
              24:15
            </p>
          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((stat, i) => (

          <div
            key={i}
            className="bg-card border border-border p-4 rounded-lg flex items-center justify-between"
          >

            <div className="space-y-1">

              <p className="text-xl font-bold text-foreground">
                {stat.value}
              </p>

              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </p>

            </div>

            <div
              className={cn(
                "w-9 h-9 rounded-md flex items-center justify-center",
                stat.bg,
                stat.color
              )}
            >
              <stat.icon size={18} />
            </div>

          </div>

        ))}

      </div>

      {/* Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Progress */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 space-y-6">

          <div className="flex items-center justify-between">

            <h3 className="font-semibold text-foreground">
              Class Progress
            </h3>

            <p className="text-xs text-muted-foreground">
              Average completion: <span className="text-primary font-semibold">64%</span>
            </p>

          </div>

          {/* Progress bar */}
          <div className="space-y-2">

            <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">

              <div
                className="h-full bg-primary transition-all duration-700"
                style={{ width: "64%" }}
              />

            </div>

            <div className="flex justify-between text-[10px] text-muted-foreground font-medium">
              <span>Start</span>
              <span>Checkpoint</span>
              <span>Finish</span>
            </div>

          </div>

          {/* Quick insights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">

            <div className="p-3 border border-border rounded-md text-center">
              <p className="text-[10px] text-muted-foreground uppercase">
                Fastest
              </p>
              <p className="text-sm font-semibold">
                Alex J.
              </p>
            </div>

            <div className="p-3 border border-border rounded-md text-center">
              <p className="text-[10px] text-muted-foreground uppercase">
                Struggling
              </p>
              <p className="text-sm font-semibold text-orange-500">
                3 Students
              </p>
            </div>

            <div className="p-3 border border-border rounded-md text-center">
              <p className="text-[10px] text-muted-foreground uppercase">
                Tab Leavers
              </p>
              <p className="text-sm font-semibold text-red-500">
                2
              </p>
            </div>

            <button className="text-[11px] font-semibold bg-primary text-white rounded-md flex items-center justify-center hover:opacity-90 transition">
              End Quiz
            </button>

          </div>

        </div>

        {/* Activity Feed */}
        <div className="bg-card border border-border rounded-lg p-5 flex flex-col h-[320px]">

          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-4">
            Live Activity
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 text-sm">

            {[
              { text: "Emma W. submitted the quiz", time: "1m ago", type: "success" },
              { text: "Daniel S. switched tab", time: "3m ago", type: "warning" },
              { text: "12 students reached Q15", time: "5m ago", type: "info" },
              { text: "Michael C. reconnected", time: "8m ago", type: "info" },
            ].map((log, i) => (

              <div
                key={i}
                className="flex gap-3 items-start text-sm"
              >

                <div
                  className={cn(
                    "w-2 h-2 mt-2 rounded-full",
                    log.type === "success"
                      ? "bg-green-500"
                      : log.type === "warning"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  )}
                />

                <div>

                  <p className="font-medium text-foreground">
                    {log.text}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {log.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

          <button className="mt-4 text-xs font-medium text-primary hover:underline">
            View student list
          </button>

        </div>

      </div>

    </div>
  );
}