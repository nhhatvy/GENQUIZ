'use client';
import { Timer, SkipForward, ChevronRight, X, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function QuizPreviewEngine({
  quiz,
  onExit,
}: {
  quiz: any;
  onExit: () => void;
}) {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExit, setShowExit] = useState(false);

  const options = [
    { id: "A", text: "Solar Power" },
    { id: "B", text: "Wind Power" },
    { id: "C", text: "Natural Gas" },
    { id: "D", text: "Hydroelectric Power" },
  ];

  function handleExitClick() {
    setShowExit(true);
  }

  function handleCancelExit() {
    setShowExit(false);
  }

  function handleConfirmExit() {
    setShowExit(false);
    onExit();
  }

  return (
    <>
      <div className="mt-17 fixed inset-0 z-[100] bg-background text-foreground flex flex-col p-6 animate-in fade-in duration-300">

        {/* TOP NAV */}
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between mb-8">

          <div className="flex items-center ">

            {/* BACK BUTTON */}
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-border rounded-md
              text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <span className="mx-4 text-sm font-medium text-muted-foreground">
              Question 1 of 10
            </span>

          </div>

          <span className="text-sm font-medium text-muted-foreground uppercase">
            10% Complete
          </span>

        </div>

        {/* PROGRESS */}
        <div className="max-w-5xl mx-auto w-full h-2 bg-secondary rounded-full mb-12 overflow-hidden">
          <div className="h-full bg-primary w-[10%] rounded-full transition-all" />
        </div>

        {/* QUESTION */}
        <div className="max-w-5xl mx-auto w-full bg-card border border-border rounded-lg p-10 mb-8 shadow-sm">

          <div className="flex items-center justify-between mb-8">

            <span className="px-3 py-1 text-xs font-bold uppercase rounded-md bg-primary/10 text-primary">
              100 points
            </span>

            <div className="flex items-center gap-2 text-destructive font-mono font-bold">
              <Timer size={18} />
              <span>00:30</span>
            </div>

            <span className="px-3 py-1 text-xs rounded-md bg-secondary text-muted-foreground italic">
              Medium
            </span>

          </div>

          <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
            Which of the following energy sources cannot be replenished naturally on a human timescale?
          </h2>

        </div>

        {/* OPTIONS */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 content-start">

          {options.map((option) => (

            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`flex items-center gap-6 p-6 rounded-lg border text-left
              transition-all duration-200 group shadow-sm

              ${
                selectedOption === option.id
                  ? "border-primary bg-primary/10"
                  : "bg-card border-border hover:border-primary hover:shadow-md hover:-translate-y-[1px]"
              }`}
            >

              <span
                className={`w-10 h-10 flex items-center justify-center rounded-md font-bold
                ${
                  selectedOption === option.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground group-hover:bg-primary/10"
                }`}
              >
                {option.id}
              </span>

              <span className="text-base font-medium">
                {option.text}
              </span>

            </button>

          ))}

        </div>

        {/* CONTROLS */}
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between mt-8">

          <button
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-md
            text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
          >
            <SkipForward size={16} /> Skip
          </button>

          <button
            disabled={!selectedOption}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-medium rounded-md transition-all

              ${
                selectedOption
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-[1px]"
                  : "bg-secondary text-muted-foreground cursor-not-allowed opacity-60"
              }
            `}
          >
            Next Question <ChevronRight size={16} />
          </button>

        </div>

      </div>

      
    </>
  );
}