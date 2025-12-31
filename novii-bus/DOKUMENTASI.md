# TemanBus - Aplikasi Booking Bus Online Sulawesi

Aplikasi web untuk booking tiket bus online di wilayah Sulawesi dengan fitur lengkap dari registrasi hingga e-ticket.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon.tech)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Authentication**: Manual (bcrypt + cookies)
- **Deployment**: Vercel

## Fitur Utama

✅ Registrasi & Login User
✅ Dashboard booking tiket
✅ Pilih rute perjalanan (6 kota di Sulawesi)
✅ Pilih tipe bus (Ekonomi, Eksekutif, Sleeper)
✅ Pilih kursi
✅ Input biodata penumpang
✅ Pembayaran (dummy)
✅ E-ticket dengan QR Code

## Wilayah yang Tersedia

- Makassar
- Toraja
- Palopo
- Sorowako
- Morowali
- Mamuju

## Instalasi & Setup

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd novii-bus
bun install
```

### 2. Setup Database di Neon.tech

1. Buat akun di [Neon.tech](https://neon.tech)
2. Buat database PostgreSQL baru
3. Copy connection string

### 3. Environment Variables

Buat file `.env` di root project:

```env
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
NODE_ENV="development"
```

### 4. Generate Prisma Client & Migrasi Database

```bash
bun db:generate
bun db:push
```

### 5. Seed Data Awal

```bash
bun db:seed
```

### 6. Jalankan Development Server

```bash
bun dev
```

Aplikasi akan berjalan di `http://localhost:3000`

## Struktur Database

### User
- id, nama, email, password (hashed)

### Route
- id, kotaAsal, kotaTujuan, harga

### Bus
- id, routeId, tipe (Ekonomi/Eksekutif/Sleeper), nama

### Seat
- id, busId, nomorKursi (A1, A2, B1, dst), harga, isBooked

### Booking
- id, userId, busId, seatId
- namaPenumpang, noHp, naikDi, turunDi
- tanggalKeberangkatan, waktuKeberangkatan
- totalHarga, biayaLayanan
- metodePembayaran, statusPembayaran
- qrCode

## Flow Aplikasi

1. **Landing Page** → Masuk / Daftar
2. **Register/Login** → Input email & password
3. **Dashboard** → Pilih tanggal, kota asal & tujuan
4. **Pilih Rute** → Tampilan rute yang tersedia
5. **Pilih Tipe Bus** → Ekonomi / Eksekutif / Sleeper
6. **Pilih Kursi** → Seat selection
7. **Biodata** → Nama penumpang, no HP, dll
8. **Pembayaran** → Pilih metode (dummy)
9. **E-Ticket** → Tiket dengan QR Code

## Deploy ke Vercel

### 1. Push ke GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

### 2. Deploy di Vercel

1. Login ke [Vercel](https://vercel.com)
2. Import project dari GitHub
3. Tambahkan Environment Variables:
   - `DATABASE_URL`: Connection string dari Neon.tech
   - `NODE_ENV`: production
4. Deploy!

### 3. Setup Database di Production

Setelah deploy, jalankan migrations:

```bash
# Di Vercel Dashboard → Settings → Environment Variables
# Atau via terminal:
vercel env pull
bunx prisma db push
bunx prisma db seed
```

## Server Actions

Semua operasi database menggunakan Server Actions (no REST API):

- `registerUser()` - Register user baru
- `loginUser()` - Login user
- `logoutUser()` - Logout user
- `createBooking()` - Buat booking baru
- `updatePaymentStatus()` - Update status pembayaran
- `getRoutes()` - Ambil daftar rute
- `getBusesByRoute()` - Ambil bus berdasarkan rute
- `getSeatsByBus()` - Ambil kursi berdasarkan bus

## Middleware

Proteksi route otomatis:
- Halaman `/dashboard` dan `/booking/*` → Perlu login
- Jika sudah login dan akses `/login` atau `/register` → Redirect ke dashboard

## Scripts Tersedia

```bash
bun dev          # Development server
bun build        # Build production
bun start        # Start production server
bun db:generate  # Generate Prisma Client
bun db:push      # Push schema ke database
bun db:seed      # Seed data awal
```

## Catatan Penting

- Password di-hash menggunakan bcrypt (10 rounds)
- Session disimpan di cookies (httpOnly, secure di production)
- QR Code digenerate otomatis saat booking
- Pembayaran menggunakan dummy payment (tidak real)
- Default waktu keberangkatan: 10:00

## Troubleshooting

### Error: PrismaClient not found
```bash
bun db:generate
```

### Error: Database connection failed
Pastikan DATABASE_URL di `.env` sudah benar

### Error: Middleware redirect loop
Clear browser cookies

## Kontributor

Dibuat dengan ❤️ untuk memudahkan booking bus di Sulawesi

---

**MVP Ready** ✅ | **Production Ready** ✅ | **Vercel Ready** ✅
