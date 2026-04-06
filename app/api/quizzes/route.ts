import { NextResponse } from "next/server";
import { QuizSchema } from "@/lib/validations/quiz";
import prisma from "@/lib/prisma";
import { z } from "zod";

// Lấy danh sách Quiz từ Database
export async function GET() {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("[QUIZZES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Tạo mới Quiz
export async function POST(req: Request) {
  try {
    const json = await req.json();
    const body = QuizSchema.parse(json); 

    const quiz = await prisma.quiz.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        difficulty: body.difficulty , // Ép kiểu PascalCase (Easy, Medium, Hard)
        timeLimit: body.timeLimit,
        passingScore: body.passingScore,
        status: "Published",
        questions: {
          create: body.questions.map((q, index) => ({
            text: q.text,
            type: q.type,
            points: q.points,
            order: index,
            options: {
              create: q.options.map(opt => ({
                text: opt.text,
                isCorrect: opt.isCorrect
              }))
            }
          }))
        }
      }
    });

    return NextResponse.json(quiz);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.issues, { status: 422 });
    }
    console.error("[QUIZ_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}