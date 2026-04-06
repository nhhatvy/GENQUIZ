"use client";

import {
  BookOpen,
  CalendarPlus,
  MoreVertical,
  Search,
  Clock,
  Users
} from "lucide-react";

import { useEffect, useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

// Sub views
import ScheduleModal from "./_components/ScheduleModal";
import QuizLiveView from "./_components/Active";
import QuizReportView from "./_components/Comleted";
import QuizWaitingView from "./_components/Upcoming";

function EventsContent() {
  const searchParams = useSearchParams();
  const quizIdFromUrl = searchParams.get("quizId");

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [viewingEvent, setViewingEvent] = useState<any | null>(null);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  const [activeTab, setActiveTab] = useState("All Events");

  const myQuizzes = [
    { id: "q1", title: "Introduction to Biology", questions: 20 },
    { id: "q2", title: "Advanced Mathematics", questions: 15 },
    { id: "q123", title: "Environmental Science Test", questions: 25 },
  ];

  const [eventList, setEventList] = useState([
    {
      id: 1,
      title: "Science Mid-term Quiz",
      quizName: "Introduction to Biology",
      status: "Active",
      time: "Today, 2:30 PM",
      participants: 32,
      statusColor: "bg-red-500/10 text-red-500",
    },
    {
      id: 2,
      title: "Mathematics Weekly Test",
      quizName: "Advanced Mathematics",
      status: "Upcoming",
      time: "Tomorrow, 10:00 AM",
      participants: 28,
      statusColor: "bg-blue-500/10 text-blue-500",
    },
    {
      id: 3,
      title: "History Final Exam",
      quizName: "World History 101",
      status: "Completed",
      time: "Yesterday, 9:00 AM",
      participants: 45,
      statusColor: "bg-green-500/10 text-green-500",
    },
  ]);

  const filteredEvents =
    activeTab === "All Events"
      ? eventList
      : eventList.filter((event) => event.status === activeTab);

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEventList(eventList.filter(e => e.id !== id));
      setActiveMenu(null);
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setIsScheduleModalOpen(true);
    setActiveMenu(null);
  };

  const handleCloseModal = () => {
    setIsScheduleModalOpen(false);
    setEditingEvent(null);
  };

  useEffect(() => {
    if (quizIdFromUrl) {
      setIsScheduleModalOpen(true);
    }
  }, [quizIdFromUrl]);

  if (viewingEvent) {
    const handleBack = () => setViewingEvent(null);
    switch (viewingEvent.status) {
      case "Upcoming": return <QuizWaitingView event={viewingEvent} onBack={handleBack} />;
      case "Active": return <QuizLiveView event={viewingEvent} onBack={handleBack} />;
      case "Completed": return <QuizReportView event={viewingEvent} onBack={handleBack} />;
      default: return <div className="p-10 text-center">Unsupported event state</div>;
    }
  }

  return (
    <div className="space-y-6 relative animate-in fade-in duration-500">
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseModal}
        initialQuizId={quizIdFromUrl}
        quizzes={myQuizzes}
        editingEvent={editingEvent}
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">Quiz Events</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Schedule and manage quiz sessions for your students
          </p>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 px-5 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium
          shadow-lg shadow-primary/20
          hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-[1px] hover:opacity-95
          active:scale-95 transition-all duration-200"
        >
          <CalendarPlus size={18} /> Schedule Event
        </button>
      </div>

      <div className="rounded-sm border border-border bg-card p-6 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          {/* Tabs */}
          <div className="flex gap-2">
            {["All Events", "Active", "Upcoming", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium border transition-all duration-200",
                  activeTab === tab
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary hover:border-border hover:shadow-sm"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                placeholder="Search events..."
                className="bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-foreground outline-none
                focus:ring-2 focus:ring-primary/20 w-full md:w-64 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredEvents.map((event, i) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-lg border border-border bg-background p-4
              hover:border-primary hover:shadow-md hover:-translate-y-[1px]
              transition-all duration-200 group shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <BookOpen size={18} />
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>

                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider",
                      event.statusColor
                    )}>
                      {event.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm">{event.quizName}</p>

                  <div className="flex gap-4 text-muted-foreground text-xs mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {event.time}
                    </span>

                    <span className="flex items-center gap-1">
                      <Users size={12} /> {event.participants} participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewingEvent(event)}
                  className="px-4 py-1.5 text-sm border border-border rounded-md text-muted-foreground
                  hover:bg-secondary hover:text-foreground hover:border-primary/40
                  transition-all duration-200 font-medium"
                >
                  {event.status === "Active"
                    ? "View Live"
                    : event.status === "Upcoming"
                    ? "Waiting"
                    : "View Report"}
                </button>

                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === i ? null : i)}
                    className={cn(
                      "w-8 h-8 flex items-center justify-center border border-border rounded-md transition-all duration-200",
                      activeMenu === i
                        ? "bg-primary text-white border-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-border"
                    )}
                  >
                    <MoreVertical size={16} />
                  </button>

                  {activeMenu === i && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setActiveMenu(null)}
                      />

                      <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-xl z-20 py-1 animate-in zoom-in-95 duration-100">

                        <button
                          onClick={() => handleEdit(event)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-secondary hover:text-foreground transition-all"
                        >
                          Edit Event
                        </button>

                        <button
                          onClick={() => handleDelete(event.id)}
                          className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-all"
                        >
                          Delete
                        </button>

                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading Events...</div>}>
      <EventsContent />
    </Suspense>
  );
}