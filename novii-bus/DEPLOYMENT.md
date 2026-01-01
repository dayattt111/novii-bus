# 🚀 Panduan Deployment ke Vercel dengan Neon.tech

Panduan lengkap untuk deploy aplikasi Novii Bus ke Vercel menggunakan Neon.tech sebagai database PostgreSQL.

---

## 📋 Prerequisites

- Akun GitHub (untuk push kode)
- Akun Vercel (gratis di https://vercel.com)
- Akun Neon.tech (gratis di https://neon.tech)

---

## 1️⃣ Setup Database di Neon.tech

### Langkah 1: Buat Database Baru

1. Buka https://neon.tech dan login/daftar
2. Klik **"Create a project"**
3. Isi informasi project:
   - **Project name**: `novii-bus` (atau nama lain)
   - **Region**: Pilih yang terdekat (contoh: `AWS / Asia Pacific (Singapore)`)
   - **PostgreSQL version**: 16 (default)
4. Klik **"Create project"**

### Langkah 2: Dapatkan Connection String

1. Setelah project dibuat, buka tab **"Dashboard"**
2. Lihat section **"Connection Details"**
3. Pilih **"Pooled connection"** (recommended untuk serverless)
4. Copy **Connection string** yang terlihat seperti ini:
   ```
   postgresql://username:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
   ```
5. **SIMPAN** string ini untuk langkah selanjutnya

### Langkah 3: Buat Database untuk Production

Neon sudah menyediakan database default `neondb`, tapi Anda bisa buat database baru:

1. Di dashboard Neon, klik tab **"Databases"**
2. Klik **"Create database"**
3. Nama: `novii_bus_production`
4. Klik **"Create"**

Update connection string dengan nama database baru (ganti `neondb` dengan `novii_bus_production`):
```
postgresql://username:password@ep-xxxx.region.aws.neon.tech/novii_bus_production?sslmode=require
```

---

## 2️⃣ Push Kode ke GitHub

### Langkah 1: Buat Repository GitHub

1. Buka https://github.com dan login
2. Klik tombol **"+"** di pojok kanan atas → **"New repository"**
3. Isi informasi:
   - **Repository name**: `novii-bus`
   - **Description**: "Sistem Booking Tiket Bus Online"
   - **Visibility**: Public atau Private (terserah Anda)
4. **JANGAN** centang "Add a README file" (sudah ada di project)
5. Klik **"Create repository"**

### Langkah 2: Push Kode

Buka terminal di folder project (`novii-bus/`), kemudian jalankan:

```bash
# Inisialisasi git (jika belum)
git init

# Add remote repository
git remote add origin https://github.com/USERNAME/novii-bus.git
# Ganti USERNAME dengan username GitHub Anda

# Add semua file
git add .

# Commit
git commit -m "feat: initial commit for deployment"

# Push ke GitHub
git branch -M main
git push -u origin main
```

**Catatan**: Jika diminta login, masukkan username dan personal access token GitHub Anda.

---

## 3️⃣ Deploy ke Vercel

### Langkah 1: Import Project dari GitHub

1. Buka https://vercel.com dan login
2. Klik tombol **"Add New..."** → **"Project"**
3. Pilih **"Import Git Repository"**
4. Jika belum connect GitHub:
   - Klik **"Connect GitHub"**
   - Authorize Vercel untuk akses repository Anda
5. Pilih repository **"novii-bus"** dari list
6. Klik **"Import"**

### Langkah 2: Konfigurasi Project

Di halaman konfigurasi:

1. **Project Name**: `novii-bus` (atau sesuai keinginan)
2. **Framework Preset**: Next.js (auto-detected)
3. **Root Directory**: `./novii-bus` (karena project ada di subfolder)
   - Klik **"Edit"** di bagian Root Directory
   - Isi dengan: `novii-bus`
4. **Build and Output Settings**: Biarkan default
5. **JANGAN** klik Deploy dulu!

### Langkah 3: Setup Environment Variables

Masih di halaman yang sama, scroll ke bagian **"Environment Variables"**:

#### Variable 1: DATABASE_URL
```
Name: DATABASE_URL
Value: postgresql://username:password@ep-xxxx.region.aws.neon.tech/novii_bus_production?sslmode=require
```
(Gunakan connection string dari Neon.tech yang sudah Anda simpan)

#### Variable 2: DIRECT_URL
```
Name: DIRECT_URL
Value: postgresql://username:password@ep-xxxx.region.aws.neon.tech/novii_bus_production?sslmode=require
```
(Sama dengan DATABASE_URL, tapi tanpa pooling - ganti `ep-` dengan `ep-` untuk direct connection)

**Catatan**: Untuk DIRECT_URL, ganti dari pooled ke direct connection:
- Di Neon dashboard, pilih **"Direct connection"** (bukan Pooled)
- Copy connection string yang baru
- Gunakan untuk DIRECT_URL

#### Variable 3: NEXTAUTH_SECRET
```
Name: NEXTAUTH_SECRET
Value: [random string panjang]
```

Untuk generate random string, buka terminal dan jalankan:
```bash
openssl rand -base64 32
```
Copy hasilnya dan paste sebagai value.

#### Variable 4: NEXTAUTH_URL (Optional, tapi recommended)
```
Name: NEXTAUTH_URL
Value: https://novii-bus.vercel.app
```
(Ganti dengan domain Vercel Anda nanti, atau gunakan https://[project-name].vercel.app)

**Setelah semua variable ditambahkan**, environment variables Anda akan terlihat seperti ini:
- DATABASE_URL
- DIRECT_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL

### Langkah 4: Deploy!

1. Setelah semua environment variables diisi, klik **"Deploy"**
2. Vercel akan mulai build dan deploy
3. Tunggu sekitar 2-5 menit
4. Jika berhasil, akan muncul confetti 🎉 dan link ke aplikasi Anda

---

## 4️⃣ Inisialisasi Database

Setelah deployment berhasil, database masih kosong. Anda perlu:

### Opsi A: Manual via Neon SQL Editor

1. Buka Neon.tech dashboard
2. Klik tab **"SQL Editor"**
3. Copy isi file `schema.prisma` Anda
4. Generate SQL dengan Prisma:

```bash
# Di terminal lokal
cd novii-bus
bunx prisma migrate dev --name init --create-only
```

5. Buka file migration yang dibuat di `prisma/migrations/[timestamp]_init/migration.sql`
6. Copy semua SQL, paste ke Neon SQL Editor
7. Klik **"Run"**

### Opsi B: Via Vercel CLI (Recommended)

Jika Anda install Vercel CLI nanti:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migration
bunx prisma migrate deploy

# Seed database (optional)
bunx prisma db seed
```

### Opsi C: Via GitHub Actions (Advanced)

Buat file `.github/workflows/deploy.yml` untuk auto-migration setiap deploy.

---

## 5️⃣ Update Environment Variables Lokal

Buat file `.env.production.local` di folder `novii-bus/`:

```env
# Database
DATABASE_URL="postgresql://username:password@ep-xxxx.region.aws.neon.tech/novii_bus_production?sslmode=require"
DIRECT_URL="postgresql://username:password@ep-xxxx.region.aws.neon.tech/novii_bus_production?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="[random-string-yang-sama-dengan-vercel]"
NEXTAUTH_URL="https://novii-bus.vercel.app"
```

**Penting**: Tambahkan ke `.gitignore`:
```
.env*.local
.env.production
```

---

## 6️⃣ Testing & Verifikasi

### 1. Cek Deployment
- Buka URL Vercel Anda: `https://[project-name].vercel.app`
- Pastikan halaman landing muncul

### 2. Cek Database Connection
- Coba register user baru
- Coba login
- Coba search bus

### 3. Cek Logs
- Di Vercel dashboard, klik project Anda
- Klik tab **"Logs"** untuk melihat error (jika ada)

---

## 7️⃣ Setup Domain Custom (Optional)

### Menggunakan Domain Vercel

Domain gratis: `[project-name].vercel.app` sudah aktif otomatis.

### Menggunakan Domain Sendiri

1. Di Vercel dashboard, buka project Anda
2. Klik tab **"Settings"** → **"Domains"**
3. Klik **"Add"**
4. Masukkan domain Anda (contoh: `nobiibus.com`)
5. Ikuti instruksi untuk update DNS di provider domain Anda
6. Tambahkan record:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
7. Tunggu propagasi DNS (5-60 menit)
8. Update NEXTAUTH_URL di environment variables Vercel dengan domain baru

---

## 8️⃣ Continuous Deployment

Setelah setup awal, setiap kali Anda push ke GitHub:

```bash
git add .
git commit -m "feat: tambah fitur xyz"
git push origin main
```

Vercel akan otomatis:
1. Detect perubahan di GitHub
2. Build ulang aplikasi
3. Deploy ke production

**Branch Previews**: Push ke branch lain untuk preview deployment tanpa affect production.

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"

**Solusi**:
1. Cek DATABASE_URL benar
2. Pastikan sslmode=require ada di connection string
3. Cek IP whitelist di Neon (default: allow all)

### Error: "Prisma Client not generated"

**Solusi**:
1. Di Vercel, tambahkan build command custom:
   - Settings → General → Build & Development Settings
   - Build Command: `cd novii-bus && bun install && bunx prisma generate && bun run build`

### Error: "NEXTAUTH_URL not configured"

**Solusi**:
1. Tambahkan environment variable NEXTAUTH_URL
2. Value: `https://[your-project].vercel.app`
3. Redeploy

### Error: "Module not found"

**Solusi**:
1. Cek package.json ada di root directory yang benar
2. Vercel harus tau root directory: `novii-bus`
3. Settings → General → Root Directory → Edit → `novii-bus`

### Database Migration Failed

**Solusi**:
1. Gunakan Neon SQL Editor untuk run migration manual
2. Atau gunakan Vercel CLI: `bunx prisma migrate deploy`

### Build Timeout

**Solusi**:
1. Optimize dependencies (hapus yang tidak terpakai)
2. Upgrade Vercel plan jika perlu (gratis punya limit)

---

## 📊 Monitoring & Maintenance

### Vercel Analytics (Optional)

1. Di Vercel dashboard, buka project
2. Klik tab **"Analytics"**
3. Enable Web Analytics
4. Install package:
   ```bash
   bun add @vercel/analytics
   ```
5. Update `app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

### Database Monitoring

1. Buka Neon.tech dashboard
2. Tab **"Monitoring"** untuk lihat:
   - Query performance
   - Database size
   - Connection count
   - Branch usage

### Backup Database

Neon menyediakan:
- **Automatic backups**: 7 days retention (gratis)
- **Point-in-time restore**: Restore ke waktu tertentu
- **Branch**: Buat branch untuk testing

Untuk manual backup:
```bash
# Export via Neon CLI
pg_dump [connection-string] > backup.sql

# Import
psql [connection-string] < backup.sql
```

---

## 🎯 Best Practices

1. **Gunakan Branch untuk Development**
   - Main branch = Production
   - Develop branch = Staging
   - Feature branches = Preview deployments

2. **Environment Variables**
   - Jangan commit `.env` ke Git
   - Gunakan Vercel environment variables
   - Beda ENV untuk production/preview/development

3. **Database Migrations**
   - Test di local dulu
   - Gunakan `prisma migrate deploy` di production
   - Jangan pernah `prisma db push` di production

4. **Monitoring**
   - Enable Vercel Analytics
   - Setup error tracking (Sentry)
   - Monitor Neon database metrics

5. **Security**
   - Regenerate NEXTAUTH_SECRET secara berkala
   - Gunakan HTTPS only
   - Enable rate limiting jika perlu

---

## 📝 Checklist Deployment

- [ ] Database dibuat di Neon.tech
- [ ] Connection string disimpan
- [ ] Kode di-push ke GitHub
- [ ] Project di-import ke Vercel
- [ ] Root directory diset: `novii-bus`
- [ ] Environment variables ditambahkan (DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, NEXTAUTH_URL)
- [ ] Deploy berhasil (muncul confetti)
- [ ] Database di-migrate
- [ ] Database di-seed (optional)
- [ ] Testing login/register
- [ ] Testing booking flow
- [ ] Domain disetup (optional)

---

## 🔗 Resources

- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
- Next.js Deployment: https://nextjs.org/docs/deployment
- Prisma with Neon: https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel

---

## 📞 Support

Jika ada masalah:
1. Cek Vercel logs: Dashboard → Project → Logs
2. Cek Neon monitoring: Dashboard → Monitoring
3. Buka issue di GitHub repository
4. Contact Vercel support (jika akun berbayar)

---

**Selamat! Aplikasi Novii Bus Anda sudah live di internet! 🚀🎉**

URL: `https://[your-project].vercel.app`
