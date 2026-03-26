import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { categorySchema, generateSlug } from "@/lib/validations/category";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors }, 
        { status: 400 }
      );
    }

    const { name, slug } = validation.data;
    const finalSlug = slug || generateSlug(name);

    const newCategory = await prisma.categories.create({
      data: {
        name,
        slug: finalSlug,
      },
    });
    const result = JSON.parse(
      JSON.stringify(newCategory, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
    );

    return NextResponse.json(
      { message: "Tạo danh mục thành công", data: result }, 
      { status: 201 }
    );

  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: "Tên danh mục này đã tồn tại" }, 
        { status: 400 }
      );
    }

    console.error("Category API Error:", error);
    return NextResponse.json(
      { message: "Lỗi hệ thống nội bộ" }, 
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const list = await prisma.categories.findMany({
      orderBy: { name: 'asc' }
    });

    const data = JSON.parse(
      JSON.stringify(list, (_, v) => (typeof v === 'bigint' ? v.toString() : v))
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Lỗi khi lấy dữ liệu" }, { status: 500 });
  }
}