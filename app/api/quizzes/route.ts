import prisma from "@/lib/prisma";
import { generateSlug, quizSchema } from "@/lib/validations/quiz";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const validation = quizSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.flatten().fieldErrors, { status: 400 });
    }

    const data = validation.data;
    const slug = `${generateSlug(data.title)}-${Date.now().toString().slice(-4)}`;

    const newQuiz = await prisma.quizzes.create({
      data: {
        title: data.title,
        slug: slug,
        description: data.description,
        time_limit: data.time_limit,
        status: data.status,
        difficulty: data.difficulty,
        passing_score: data.passing_score,
        randomize_questions: data.randomize_questions,
        creator_id: data.creator_id ? BigInt(data.creator_id) : BigInt(1),
        category_id: data.category_id ? BigInt(data.category_id) : null,
      },
    });

    return NextResponse.json({
      message: "Tạo Quiz thành công!",
      data: JSON.parse(JSON.stringify(newQuiz, (_, v) => typeof v === 'bigint' ? v.toString() : v))
    }, { status: 201 });

  } catch (error: any) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ message: "Lỗi hệ thống", error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const quizzes = await prisma.quizzes.findMany({
      include: {
        category: {
          select: { name: true }
        },
        _count: {
          select: { questions: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    const responseData = JSON.parse(
      JSON.stringify(quizzes, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json({ data: responseData }, { status: 200 });
  } catch (error: any) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ 
      message: "Lỗi hệ thống", 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
    await prisma.quizzes.deleteMany({})
    return NextResponse.json({ message: "Tất cả quizzes đã được xóa thành công" }, { status: 200 })
}