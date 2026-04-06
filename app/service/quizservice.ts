import axiosClient from "@/lib/axios";
// Đảm bảo import cả QuizInput (Type) và QuizSchema (Biến)
import { QuizInput, QuizSchema } from "@/lib/validations/quiz"; 

export const quizService = {
  createQuiz: async (data: QuizInput) => {
    // Nếu bạn muốn validate ngay tại service trước khi gửi đi:
    const validatedData = QuizSchema.parse(data);
    return axiosClient.post("/quizzes", validatedData);
  },

  getAllQuizzes: async () => {
    return axiosClient.get("/quizzes");
  },

  deleteQuiz: async (id: string) => {
    return axiosClient.delete(`/quizzes/${id}`);
  }
};