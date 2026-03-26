import { z } from "zod";

// Khai báo Enum khớp với Prisma Schema
export const DifficultyLevelEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
export const QuizStatusEnum = z.enum(["DRAFT", "PUBLISHED"]);

export const quizSchema = z.object({
  // Chấp nhận string từ client (input) và sẽ convert sang BigInt sau
  creator_id: z.union([z.string(), z.number(), z.bigint()]),
  
  title: z
    .string()
    .min(5, "Tiêu đề bài Quiz phải có ít nhất 5 ký tự")
    .max(255, "Tiêu đề quá dài"),
    
  description: z.string().max(2000, "Mô tả không nên quá dài").optional().nullable(),
  
  // ID của danh mục (từ dropdown)
  category_id: z.union([z.string(), z.number(), z.bigint()]).optional().nullable(),
  
  // Các thiết lập từ UI
  time_limit: z.number().int().min(0).default(0),
  status: QuizStatusEnum.default("DRAFT"),
  difficulty: DifficultyLevelEnum.default("MEDIUM"),
  passing_score: z.number().int().min(0).max(100).default(70),
  randomize_questions: z.boolean().default(false),
});

// Helper: Tự động tạo Slug chuẩn SEO từ Title
export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .normalize('NFD') // Tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '') // Xóa ký tự đặc biệt
    .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng gạch ngang
    .replace(/-+/g, '-') // Tránh gạch ngang liên tiếp
    .replace(/^-+|-+$/g, ''); // Xóa gạch ở đầu/cuối
};

export type QuizInput = z.infer<typeof quizSchema>;
