import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api", // Next.js API Routes nằm ở thư mục /api
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Log lỗi chi tiết để debug
    const message = error.response?.data || error.message || "Có lỗi xảy ra";
    console.error("Axios Error Details:", error.response); 
    return Promise.reject(error);
  }
);

export default axiosClient;