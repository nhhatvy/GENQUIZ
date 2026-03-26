import prisma from "@/lib/prisma";
import { generateSlug } from "@/lib/validations/category";
import { quizSchema } from "@/lib/validations/quiz";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await params;
    const quizId = BigInt(id);

    const quiz = await prisma.quizzes.findUnique({
      where: { quiz_id: quizId },
      include: {
        category: true, 
        _count: {
          select: { questions: true } 
        }
      }
    });

    if (!quiz) {
      return NextResponse.json({ message: "Không tìm thấy bài Quiz" }, { status: 404 });
    }

    const data = JSON.parse(
      JSON.stringify(quiz, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi hệ thống" }, { status: 500 });
  }
} 
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> } ) {
  try {
    const body = await req.json();
    
    const { id } = await params; 
    
    if (!id) {
      return NextResponse.json({ message: "Thiếu ID" }, { status: 400 });
    }

    const quizId = BigInt(id);

    const validation = quizSchema.partial().safeParse(body);
    if (!validation.success) {
      return NextResponse.json(validation.error.flatten().fieldErrors, { status: 400 });
    }

    const { category_id, creator_id, ...restData } = validation.data;

    const updatedQuiz = await prisma.quizzes.update({
      where: { quiz_id: quizId },
      data: {
        ...restData,
        ...(category_id !== undefined && { 
          category_id: category_id ? BigInt(category_id) : null 
        }),
        ...(creator_id !== undefined && { 
          creator_id: BigInt(creator_id) 
        }),
        ...(restData.title && { 
          slug: generateSlug(restData.title) 
        }),
      },
    });

    return NextResponse.json({
      message: "Cập nhật thành công!",
      data: JSON.parse(JSON.stringify(updatedQuiz, (_, v) => typeof v === 'bigint' ? v.toString() : v))
    });

  } catch (error: any) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ message: "Lỗi hệ thống", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request,{ params }: { params: Promise<{ id: string }> } ) {
  try {

    const { id } = await params;

    if (!id) {
      return NextResponse.json({ message: "Thiếu ID bài Quiz" }, { status: 400 });
    }

    const quizId = BigInt(id);

    const deletedQuiz = await prisma.quizzes.delete({
      where: { quiz_id: quizId },
    });

    return NextResponse.json({
      message: "Đã xóa bài Quiz thành công!",
      deletedId: id
    }, { status: 200 });

  } catch (error: any) {
    console.error("DELETE ERROR:", error);

    if (error.code === 'P2025') {
      return NextResponse.json({ message: "Bài Quiz không tồn tại hoặc đã bị xóa trước đó" }, { status: 404 });
    }

    return NextResponse.json({ message: "Lỗi hệ thống khi xóa", error: error.message }, { status: 500 });
  }
}