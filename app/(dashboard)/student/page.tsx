"use client";

import {
  BookOpen,
  Trophy,
  Users,
  Flame,
  ChevronRight,
  Play,
  Plus,
  Search,
  Lightbulb,
  Calendar,
  ArrowUpRight
} from "lucide-react";

export default function StudentDashboard() {

  const stats = [
    { label: "Quizzes Completed", value: "24", icon: BookOpen, trend: "+8", color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Average Score", value: "87%", icon: Trophy, trend: "+5%", color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "Study Groups", value: "3", icon: Users, trend: null, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Day Streak", value: "7", icon: Flame, trend: "+2", color: "text-red-500", bg: "bg-red-500/10" }
  ];

  const challenges = [
    {
      title: "Weekly Science Quiz",
      sub: "Biology Masters",
      people: "12 participants",
      time: "2 hours",
      icon: BookOpen
    },
    {
      title: "Math Speed Challenge",
      sub: "Math Wizards",
      people: "8 participants",
      time: "Tomorrow",
      icon: TargetIcon
    }
  ];

  return (
    <div className="space-y-8 pb-10">

      {/* WELCOME BANNER */}

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-indigo-900 p-8 text-white shadow-xl">

        <div className="relative z-10 space-y-4 max-w-2xl">

          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, Alex 👋
          </h1>

          <p className="text-purple-100 opacity-90">
            Ready to continue your learning journey?
          </p>

          <div className="flex gap-3 pt-2">

            <button className="bg-white text-purple-700 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-opacity-90 transition active:scale-95">
              Continue Learning
            </button>

            <button className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/30 transition">
              Create Quiz
            </button>

          </div>
        </div>

        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 translate-x-20" />

      </div>


      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {stats.map((stat, i) => (

          <div
            key={i}
            className="bg-card border border-border p-5 rounded-2xl flex flex-col justify-between hover:border-primary/50 hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 group"
          >

            <div className="flex justify-between items-start">

              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition`}>
                <stat.icon size={20} />
              </div>

              {stat.trend && (
                <span className="text-xs font-bold text-green-500 flex items-center gap-0.5 bg-green-500/10 px-2 py-1 rounded-full">
                  ↑ {stat.trend}
                </span>
              )}

            </div>

            <div className="mt-4">
              <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">
                {stat.label}
              </p>

              <p className="text-2xl font-bold mt-1 text-foreground">
                {stat.value}
              </p>
            </div>

          </div>
        ))}

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


        {/* LEFT SIDE */}

        <div className="lg:col-span-2 space-y-8">


          {/* CONTINUE LEARNING */}

          <section className="space-y-4">

            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold">Continue Learning</h2>

              <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
                View All
                <ChevronRight size={14} />
              </button>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


              {/* IN PROGRESS */}

              <div className="group bg-card border border-border p-5 rounded-2xl hover:border-primary hover:shadow-md hover:-translate-y-[2px] transition-all duration-200">

                <div className="flex justify-between mb-4">

                  <div>
                    <h3 className="font-bold">Biology Fundamentals</h3>
                    <p className="text-xs text-muted-foreground">
                      Science • 20 questions
                    </p>
                  </div>

                  <ChevronRight
                    size={18}
                    className="text-muted-foreground group-hover:text-primary transition"
                  />

                </div>


                <div className="space-y-2">

                  <div className="flex justify-between text-xs font-medium">

                    <span className="text-primary bg-primary/10 px-2 py-0.5 rounded italic">
                      In Progress
                    </span>

                    <span>65%</span>

                  </div>


                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">

                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: "65%" }}
                    />

                  </div>

                </div>

              </div>


              {/* COMPLETED */}

              <QuizCompleted
                title="World War II History"
                score="92%"
                subject="History"
                questions="15"
              />

              {/* START QUIZ */}

              <QuizStart
                title="Algebra Basics"
                subject="Mathematics"
                questions="25"
              />

              <QuizCompleted
                title="English Grammar"
                score="88%"
                subject="English"
                questions="18"
              />

            </div>

          </section>



          {/* CHALLENGES */}

          <section className="space-y-4">

            <h2 className="text-xl font-bold">Upcoming Challenges</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {challenges.map((c, i) => (

                <div
                  key={i}
                  className="bg-card border border-border p-5 rounded-2xl space-y-4 hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 group"
                >

                  <div className="flex items-center gap-4">

                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition">
                      <c.icon size={20} />
                    </div>

                    <div>
                      <h4 className="font-bold text-sm">{c.title}</h4>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>

                  </div>

                  <div className="flex gap-4 text-[10px] font-medium text-muted-foreground">

                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {c.people}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {c.time}
                    </span>

                  </div>

                  <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold transition active:scale-95">
                    Join Challenge
                  </button>

                </div>

              ))}

            </div>

          </section>

        </div>


        {/* RIGHT SIDEBAR */}

        <div className="space-y-6">


          <StudyStreak />

          <QuickActions />

          <LearningTip />

        </div>

      </div>
    </div>
  );
}



function QuizCompleted({ title, subject, questions, score }: any) {

  return (

    <div className="bg-card border border-border p-5 rounded-2xl hover:shadow-md hover:-translate-y-[2px] transition-all">

      <div className="flex justify-between mb-4">

        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-xs text-muted-foreground">
            {subject} • {questions} questions
          </p>
        </div>

        <div className="flex items-center gap-1 text-orange-500 font-bold text-sm">
          <Trophy size={14} /> {score}
        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">
          Completed
        </span>

        <button className="text-xs font-bold text-primary hover:underline">
          View Results
        </button>

      </div>

    </div>

  );
}



function QuizStart({ title, subject, questions }: any) {

  return (

    <div className="bg-card border border-border p-5 rounded-2xl hover:shadow-md hover:-translate-y-[2px] transition-all">

      <div className="mb-4">

        <h3 className="font-bold">{title}</h3>

        <p className="text-xs text-muted-foreground">
          {subject} • {questions} questions
        </p>

      </div>

      <button className="w-full mt-2 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition">

        <Play size={14} fill="currentColor" />

        Start Quiz

      </button>

    </div>

  );

}



function StudyStreak() {

  return (

    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">

      <div className="flex justify-between items-center mb-4">

        <h3 className="font-bold">Study Streak</h3>

        <div className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-lg text-xs font-black">
          <Flame size={14} fill="currentColor" /> 7 days
        </div>

      </div>

      <p className="text-xs text-muted-foreground mb-6 italic">
        Keep your learning momentum going!
      </p>

    </div>

  );

}



function QuickActions() {

  return (

    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm space-y-4">

      <h3 className="font-bold mb-2">Quick Actions</h3>

      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition">

        <Plus size={18} />

        Create New Quiz

      </button>

      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border font-bold text-sm hover:bg-secondary/80 transition">

        <Users size={18} />

        Join Study Group

      </button>

      <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary border border-border font-bold text-sm hover:bg-secondary/80 transition">

        <Search size={18} />

        Browse Library

      </button>

    </div>

  );

}



function LearningTip() {

  return (

    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm border-l-4 border-l-orange-500">

      <div className="flex items-center gap-2 text-orange-500 mb-2">

        <Lightbulb size={18} />

        <h4 className="font-bold text-sm uppercase tracking-wider">
          Learning Tip
        </h4>

      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Take regular breaks during study sessions to improve retention.
      </p>

      <button className="mt-4 text-xs font-bold text-primary hover:underline flex items-center gap-1">

        Learn More

        <ArrowUpRight size={12} />

      </button>

    </div>

  );

}



function TargetIcon({ size }: { size: number }) {

  return (

    <div style={{ width: size, height: size }} className="relative flex items-center justify-center">

      <div className="absolute inset-0 border-2 border-current rounded-full" />

      <div className="absolute w-1/2 h-1/2 border-2 border-current rounded-full" />

      <div className="w-1.5 h-1.5 bg-current rounded-full" />

    </div>

  );

}