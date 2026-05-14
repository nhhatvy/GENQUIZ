This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Setup (sau khi clone hoặc pull)

### 1. Cài dependencies

```bash
npm install
```

### 2. Tạo file môi trường

Tạo file `.env` ở root (xem `.env.example` nếu có), cần có ít nhất:

```env
AUTH_SECRET=your_secret_here
DATABASE_URL="file:./prisma/dev.db"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

### 3. Khởi tạo database

**Nếu được cấp file `dev.db` (có sẵn dữ liệu):**
```bash
# Copy file dev.db vào thư mục prisma/
# prisma/dev.db

# Sau đó chỉ cần sinh Prisma Client — KHÔNG chạy migrate
npx prisma generate
```

**Nếu tạo database mới (trống):**
```bash
# Tạo database và apply toàn bộ migrations
npx prisma migrate deploy

# Sinh Prisma Client
npx prisma generate
```

> Nếu pull về có thay đổi schema mới (file trong `prisma/migrations/`), chạy lại 2 lệnh trên.

### 4. (Tuỳ chọn) Tạo tài khoản admin mặc định

```bash
npx tsx prisma/seed.ts
```

### 5. Chạy dev server

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) trên trình duyệt.

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
