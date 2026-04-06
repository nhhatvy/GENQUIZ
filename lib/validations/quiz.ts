import * as z from "zod";

export const QuizSchema = z.object({
  title: z.string().min(5, "Tiêu đề phải ít nhất 5 ký tự").max(100),
  description: z.string().min(10, "Mô tả cần chi tiết hơn một chút"),
  category: z.string().min(1),
  // ĐỔI CHO KHỚP VỚI PRISMA (PascalCase)
  difficulty: z.enum(["Easy", "Medium", "Hard"]), 
  timeLimit: z.coerce.number().min(1),
  passingScore: z.coerce.number().min(0).max(100),
  questions: z.array(
    z.object({
      text: z.string().min(5),
      // ĐỔI CHO KHỚP VỚI PRISMA (Enum QuestionType)
      type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE"]), 
      points: z.coerce.number().min(1),
      options: z.array(
        z.object({
          text: z.string().min(1),
          isCorrect: z.boolean()
        })
      ).min(2)
       .refine((opts) => opts.some(o => o.isCorrect), {
          message: "Phải có ít nhất một đáp án đúng"
       })
    })
  ).min(1)
});
export type QuizInput = z.infer<typeof QuizSchema>;