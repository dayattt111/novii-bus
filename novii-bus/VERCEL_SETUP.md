# 🔧 Vercel Environment Variables Setup

Untuk deployment yang sukses, pastikan environment variables berikut diset di Vercel:

## 1. DATABASE_URL (Pooled Connection)
```
postgresql://neondb_owner:npg_M6IfctvzUy4b@ep-raspy-feather-a18jmubf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

## 2. DIRECT_URL (Direct Connection - untuk migrations)
```
postgresql://neondb_owner:npg_M6IfctvzUy4b@ep-raspy-feather-a18jmubf.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```
**Note**: Ganti `-pooler` dengan direct connection (hapus `-pooler` dari hostname)

## 3. NEXTAUTH_SECRET
```
z71QSUpKfJtJYDtm5m/pcXJ1AOouF9+fCcInZsK9vqE=
```

## 4. NEXTAUTH_URL
```
https://novii-bus-83q7.vercel.app
```
**Note**: Ganti dengan URL Vercel yang sebenarnya

## 5. NODE_ENV (optional, auto-set by Vercel)
```
production
```

---

## ✅ Checklist Deployment

- [x] Database Neon.tech sudah dibuat
- [x] Connection string sudah didapat
- [x] Database sudah di-seed dengan 48 routes, 71 buses, 2472 seats
- [ ] Environment variables sudah diset di Vercel Dashboard
- [ ] NEXTAUTH_URL sudah diupdate dengan URL Vercel yang benar
- [ ] Push code terbaru ke GitHub
- [ ] Vercel auto-redeploy
- [ ] Test login & booking flow di production

---

## 🚀 Cara Set Environment Variables di Vercel

1. Buka https://vercel.com
2. Pilih project **novii-bus**
3. Klik **Settings** → **Environment Variables**
4. Tambahkan setiap variable di atas
5. Pilih environment: **Production**, **Preview**, dan **Development** (centang semua)
6. Klik **Save**
7. Trigger redeploy:
   - Klik **Deployments** tab
   - Klik tombol **...** di deployment terakhir
   - Klik **Redeploy**

---

## 🔍 Testing Production Database

Untuk memverifikasi database sudah benar:

```bash
# Test connection
bun run test-db.ts

# Check routes
bunx prisma studio
# Akan buka browser dengan GUI database
```

---

## 📊 Database Status

✅ **Connection**: Berhasil  
✅ **Tables**: Created (User, Route, Bus, Seat, Booking)  
✅ **Data Seeded**: 
   - 48 Routes
   - 71 Buses  
   - 2,472 Seats
   
---

## 🐛 Troubleshooting Error di Vercel

### Error: "Can't reach database server"
**Solusi**: 
- Pastikan DATABASE_URL benar di Vercel
- Pastikan sslmode=require ada di connection string
- Cek Neon dashboard apakah database masih active

### Error: "The table public.Route does not exist"
**Solusi**:
- Database belum di-seed
- Run: `bunx prisma db push` di local
- Run: `bunx prisma db seed` di local
- Atau gunakan Neon SQL Editor untuk run migration manual

### Error: "NEXTAUTH_URL not configured"
**Solusi**:
- Set NEXTAUTH_URL di Vercel environment variables
- Value: https://[your-project].vercel.app
- Redeploy

---

## 📝 Notes

- Database Neon sudah production-ready
- Semua data sudah terisi
- Environment variables harus diset manual di Vercel Dashboard
- Setelah set env vars, trigger redeploy untuk apply changes
