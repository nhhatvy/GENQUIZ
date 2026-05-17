import { NextResponse } from "next/server";
import { QuizSchema } from "@/lib/validations/quiz";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { z } from "zod";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const quizzes = await prisma.quiz.findMany({
      where: { creatorId: session.user.id },
      include: { _count: { select: { questions: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("[QUIZZES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = QuizSchema.parse(json);

    const quiz = await prisma.quiz.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        difficulty: body.difficulty,
        timeLimit: body.timeLimit,
        passingScore: body.passingScore,
        status: body.status,
        visibility: body.visibility ?? "Private",
        creationMethod: body.creationMethod ?? "MANUAL",
        creatorId: session.user.id,
        questions: {
          create: body.questions.map((q, index) => ({
            text: q.text,
            type: q.type,
            points: q.points,
            order: index,
            options: {
              create: q.options.map((opt) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
              })),
            },
          })),
        },
      },
      include: { _count: { select: { questions: true } } },
    });

    return NextResponse.json(quiz, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: error.issues },
        { status: 422 }
      );
    }
    console.error("[QUIZ_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
