import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = params.id;

    if (!quizId) {
      return new NextResponse("Missing Quiz ID", { status: 400 });
    }
    await prisma.quiz.delete({
      where: {
        id: quizId,
      },
    });

    return NextResponse.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("[QUIZ_DELETE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}