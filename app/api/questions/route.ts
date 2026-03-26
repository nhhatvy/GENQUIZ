
import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { questionSchema } from "@/lib/validations/question";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsedData = questionSchema.safeParse(body);
        if (!parsedData.success) {
            return NextResponse.json({ message: "Dữ liệu không hợp lệ", errors: parsedData.error.flatten() }, { status: 400 });
        }

        const data = parsedData.data;
        const quizExists = await prisma.quizzes.findUnique({
      where: { quiz_id: BigInt(data.quiz_id) }
    });
       if (!quizExists) {
      return NextResponse.json({ message: "Bài Quiz không tồn tại" }, { status: 404 });
    }

    const newQuestion = await prisma.questions.create({
      data: {
        quiz_id: BigInt(data.quiz_id),
        question_text: data.question_text,
        question_type: data.question_type,
        options_json: data.options_json,
        correct_index: data.correct_index,
        points: data.points,
        order_inquiz: data.order_inquiz,
      },
    });

    const responseData = JSON.parse(
      JSON.stringify(newQuestion, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );

    return NextResponse.json(
      { message: "Tạo câu hỏi thành công", data: responseData }, 
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Lỗi hệ thống", details: error.message }, 
      { status: 500 }
    );
  }
}