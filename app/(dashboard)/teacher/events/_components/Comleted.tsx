'use client';

import { 
  BarChart3, 
  PieChart, 
  Download, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Trophy, 
  Clock, 
  Search,
  ChevronRight,
  Target
} from "lucide-react";

import { cn } from "@/lib/utils";

export default function QuizReportView({ event, onBack }: { event: any, onBack: () => void }) {

  const itemAnalysis = [
    { q: "What is the mitochondria?", correct: 85, difficulty: "Easy" },
    { q: "Cell membrane structure and functions?", correct: 42, difficulty: "Hard" },
    { q: "ATP synthesis process in plant cells?", correct: 18, difficulty: "Very Hard" },
  ];

  const studentResults = [
    { id: 1, name: "Nguyễn Văn A", score: 9.5, time: "18:20", status: "Passed" },
    { id: 2, name: "Trần Thị B", score: 8.0, time: "22:45", status: "Passed" },
    { id: 3, name: "Lê Văn C", score: 4.5, time: "45:00", status: "Failed" },
  ];

  const stats = [
    { label: "Average Score", value: "7.8", icon: Target, color: "text-blue-500", trend: "+0.5" },
    { label: "Completion Rate", value: "100%", icon: Users, color: "text-green-500", trend: "0%" },
    { label: "Highest Score", value: "9.5", icon: Trophy, color: "text-yellow-500", trend: "Top 1" },
    { label: "Avg Time", value: "32m", icon: Clock, color: "text-purple-500", trend: "-2m" },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button
            onClick={onBack}
            className="p-2 rounded-lg border border-border bg-card hover:bg-secondary transition"
          >
            <ArrowLeft size={18}/>
          </button>

          <div>
            <h2 className="text-2xl font-semibold text-foreground">
              Performance Report
            </h2>

            <p className="text-muted-foreground text-sm mt-1">
              {event.title} • {event.quizName}
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg border border-border bg-card hover:bg-secondary transition font-medium">
            <Download size={16}/>
            Student Answers
          </button>

          <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary hover:opacity-90 transition font-medium text-primary-foreground shadow-lg shadow-primary/20">
            <Download size={16}/>
            Export XLSX
          </button>

        </div>

      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {stats.map((stat, i) => {

          const Icon = stat.icon;

          return (
            <div
              key={i}
              className="rounded-xl border border-border bg-card p-6 shadow-sm group hover:border-primary/40 transition"
            >

              <div className="flex justify-between items-start">

                <div className="space-y-1">

                  <p className="text-xs text-muted-foreground">
                    {stat.label}
                  </p>

                  <div className="flex items-center gap-2">

                    <h3 className="text-2xl font-semibold text-foreground">
                      {stat.value}
                    </h3>

                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-background border border-border text-green-500">
                      {stat.trend}
                    </span>

                  </div>

                </div>

                <div className={cn(
                  "p-2.5 rounded-xl bg-primary/10",
                  stat.color
                )}>
                  <Icon size={18}/>
                </div>

              </div>

            </div>
          );

        })}

      </div>


      {/* Panels */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

<div className="xl:col-span-2 rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">

  <div className="flex items-center justify-between">
    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
      <BarChart3 size={18}/>
      Score Distribution
    </h3>

    <span className="text-xs text-muted-foreground">
      Based on 35 students
    </span>
  </div>

  <div className="h-64 flex items-end justify-between gap-3 px-4 border-b border-border pb-2">

    {[15, 25, 45, 85, 55, 30].map((h, i) => (

      <div key={i} className="flex-1 flex flex-col items-center gap-3 group">

        <div
          className="w-full bg-primary/10 group-hover:bg-primary/30 border-t-4 border-primary rounded-t-xl transition-all relative"
          style={{ height: `${h}%` }}
        >

          <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white px-2 py-0.5 rounded">
            {Math.round(h / 3)} students
          </span>

        </div>

        <span className="text-xs text-muted-foreground">
          {i * 2}-{(i + 1) * 2}
        </span>

      </div>

    ))}

  </div>

</div>


        {/* Item Analysis */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">

          <div>
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <PieChart size={18}/>
              Item Analysis
            </h3>

            <p className="text-muted-foreground text-sm">
              Question difficulty overview
            </p>
          </div>

          <div className="space-y-4">

            {itemAnalysis.map((item, i) => (

              <div key={i} className="space-y-2">

                <div className="flex justify-between text-sm">

                  <p className="font-medium text-foreground line-clamp-2 pr-4">
                    {item.q}
                  </p>

                  <span className="text-xs px-2 py-0.5 rounded-full bg-background border border-border">
                    {item.difficulty}
                  </span>

                </div>

                <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">

                  <div
                    className="bg-primary h-full"
                    style={{ width: `${item.correct}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>


      {/* Student Results */}
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">

        <div className="p-6 border-b border-border flex justify-between items-center">

          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Users size={18}/>
            Student Results
          </h3>

          <div className="relative w-72">

            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              placeholder="Search student..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20"
            />

          </div>

        </div>


        <table className="w-full text-sm">

          <thead className="bg-secondary/30 text-muted-foreground">

            <tr>
              <th className="text-left px-6 py-3">Student</th>
              <th className="text-center px-6 py-3">Score</th>
              <th className="text-center px-6 py-3">Time</th>
              <th className="text-center px-6 py-3">Status</th>
              <th className="px-6 py-3"></th>
            </tr>

          </thead>

          <tbody className="divide-y divide-border">

            {studentResults.map((student) => (

              <tr key={student.id} className="hover:bg-secondary/30 transition">

                <td className="px-6 py-4 font-medium text-foreground">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-center font-semibold">
                  {student.score}
                </td>

                <td className="px-6 py-4 text-center text-muted-foreground">
                  {student.time}
                </td>

                <td className="px-6 py-4 text-center">

                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full border",
                    student.status === "Passed"
                      ? "text-green-500 border-green-500/30 bg-green-500/10"
                      : "text-red-500 border-red-500/30 bg-red-500/10"
                  )}>
                    {student.status}
                  </span>

                </td>

                <td className="px-6 py-4 text-right">

                  <button className="p-2 rounded-lg hover:bg-secondary transition">
                    <ChevronRight size={16}/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}