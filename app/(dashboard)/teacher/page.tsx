 import { 

  BookOpen, 

  Calendar, 

  Users, 

  BarChart3, 

  ChevronRight,

  Plus,

  Trophy

} from "lucide-react";



export default function DashboardPage() {

  const stats = [

    { label: "Total Quizzes", value: "2,543", trend: "+12.5%", icon: <BookOpen size={20} />, color: "text-primary", bg: "bg-primary/10" },

    { label: "Active Events", value: "134", trend: "+5.2%", icon: <Calendar size={20} />, color: "text-green-500", bg: "bg-green-500/10" },

    { label: "Students", value: "2,543", trend: "+18%", icon: <Users size={20} />, color: "text-blue-500", bg: "bg-blue-500/10" },

    { label: "Avg Completion", value: "82%", trend: "-2.3%", icon: <BarChart3 size={20} />, color: "text-orange-500", bg: "bg-orange-500/10" },

  ];



  const recentEvents = [

    { title: "Science Mid-term Quiz", time: "Today, 2:30 PM", participants: 32, status: "live" },

    { title: "Mathematics Weekly Test", time: "Tomorrow, 10:00 AM", participants: 28, status: "manage" },

    { title: "History Final Exam", time: "May 20, 9:00 AM", participants: 45, status: "manage" },

  ];



  const topStudents = [

    { name: "Alex John", subject: "Science", score: 950, rank: 1 },

    { name: "Emma Watson", subject: "Mathematics", score: 920, rank: 2 },

    { name: "Michael Clark", subject: "Physics", score: 980, rank: 3 },

    { name: "Sophia Green", subject: "English", score: 890, rank: 4 },

    { name: "Lucia Wilde", subject: "Science", score: 870, rank: 5 },

  ];



  const recentQuizzes = [

    { title: "Introduction to Biology", questions: 15, completions: 28, rate: 75 },

    { title: "Advanced Mathematics", questions: 20, completions: 18, rate: 40 },

    { title: "Chemistry Fundamentals", questions: 12, completions: 34, rate: 90 },

  ];



  return (

    <div className="space-y-6">



      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>

          <p className="text-muted-foreground mt-1 text-sm">

            Welcome back, Sarah! Here's what's happening with your quizzes

          </p>

        </div>



        <button className="flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary hover:opacity-90 transition font-medium text-primary-foreground">

          <Plus size={16}/>

          Create New Quiz

        </button>

      </div>



      {/* Stats - Đã thay bg-[#111115] -> bg-card, border-gray-900 -> border-border */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {stats.map((stat, i) => (

          <div

            key={i}

            className="rounded-sm border border-border bg-card p-6 shadow-sm"

          >

            <div className="flex justify-between items-start">

              <div>

                <p className="text-muted-foreground text-sm">{stat.label}</p>

                <div className="flex items-center gap-2 mt-1">

                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>

                  <span className={`text-xs ${stat.trend.includes("+") ? "text-green-500" : "text-red-500"}`}>

                    {stat.trend}

                  </span>

                </div>

              </div>

              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>

                {stat.icon}

              </div>

            </div>

          </div>

        ))}

      </div>



      {/* Main Grid */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">



        {/* Recent Events */}

        <div className="xl:col-span-2 rounded-sm border border-border bg-card p-6 space-y-6 shadow-sm">

          <div>

            <h2 className="text-xl font-semibold text-foreground">Recent Events</h2>

            <p className="text-muted-foreground text-sm">

              Manage your upcoming and active quiz events

            </p>

          </div>



          <div className="space-y-4">

            {recentEvents.map((event, i) => (

              <div

                key={i}

                className="flex items-center justify-between rounded-lg border border-border bg-background p-4 hover:border-primary transition group"

              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">

                    <Calendar size={18} />

                  </div>

                  <div>

                    <h4 className="font-semibold text-foreground">{event.title}</h4>

                    <div className="text-xs text-muted-foreground flex gap-3 mt-1">

                      <span>{event.time}</span>

                      <span>{event.participants} participants</span>

                    </div>

                  </div>

                </div>



                {event.status === "live" ? (

                  <button className="bg-primary px-4 py-2 text-xs rounded-lg text-primary-foreground font-medium">

                    View Live

                  </button>

                ) : (

                  <button className="bg-secondary text-secondary-foreground border border-border px-4 py-2 text-xs rounded-lg hover:bg-accent transition">

                    Manage

                  </button>

                )}

              </div>

            ))}

          </div>

        </div>



        {/* Top Students */}

        <div className="rounded-sm border border-border bg-card p-6 space-y-6 shadow-sm">

          <div>

            <h2 className="text-xl font-semibold text-foreground">Top Students</h2>

            <p className="text-muted-foreground text-sm">

              Students with highest quiz scores

            </p>

          </div>



          <div className="space-y-4">

            {topStudents.map((student, i) => (

              <div key={i} className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs border border-border text-muted-foreground">

                    {student.rank}

                  </div>

                  <div>

                    <p className="text-sm font-medium text-foreground">{student.name}</p>

                    <p className="text-xs text-muted-foreground">{student.subject}</p>

                  </div>

                </div>

                <div className="flex items-center gap-1 text-orange-500 text-sm font-bold">

                  <Trophy size={14} />

                  {student.score}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>



      {/* Recent Quizzes */}

      <div className="rounded-sm border border-border bg-card p-6 space-y-6 shadow-sm">

        <div>

          <h2 className="text-xl font-semibold text-foreground">Recent Quizzes</h2>

          <p className="text-muted-foreground text-sm">

            Your recently created quizzes

          </p>

        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

          {recentQuizzes.map((quiz, i) => (

            <div

              key={i}

              className="bg-background border border-border rounded-lg p-4 hover:border-primary transition group"

            >

              <div className="flex justify-between mb-3">

                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{quiz.title}</h4>

                <ChevronRight size={16} className="text-muted-foreground" />

              </div>



              <div className="text-xs text-muted-foreground flex gap-4 mb-3">

                <span>{quiz.questions} questions</span>

                <span>{quiz.completions} completions</span>

              </div>



              <div className="space-y-1">

                <div className="flex justify-between text-xs text-muted-foreground">

                  <span>Completion</span>

                  <span className="text-foreground">{quiz.rate}%</span>

                </div>

                <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">

                  <div

                    className="bg-primary h-full transition-all duration-1000"

                    style={{ width: `${quiz.rate}%` }}

                  />

                </div>

              </div>

            </div>

          ))}



          {/* Create Quiz Card */}

          <div className="border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-center p-4 hover:bg-accent transition cursor-pointer group">

            <Plus size={18} className="text-primary mb-2 group-hover:scale-110 transition-transform" />

            <p className="text-sm font-medium text-foreground">Create New Quiz</p>

            <p className="text-xs text-muted-foreground">Add a new quiz</p>

          </div>

        </div>

      </div>

    </div>

  );

}