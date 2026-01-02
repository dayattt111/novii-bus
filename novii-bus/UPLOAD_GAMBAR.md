# 📸 Upload Gambar Bus - Panduan Lengkap

## 🎯 Cara Upload Gambar untuk Bus

Ada 2 cara untuk menambahkan gambar bus:

### **Metode 1: Upload Langsung ke Folder `public/image/`**

1. **Siapkan gambar bus** (format: JPG, PNG, WebP)
2. **Copy gambar** ke folder: `public/image/`
3. **Gunakan nama file** yang deskriptif, contoh:
   - `business-class.jpg`
   - `high-class.jpg`
   - `sleeper-class.jpg`
   - `bus-executive.png`

4. **Update database** via Prisma Studio:
   ```bash
   bunx prisma studio
   ```
   - Buka tabel **Bus**
   - Edit field `imageUrl` dengan path: `/image/nama-file.jpg`
   - Contoh: `/image/business-class.jpg`

---

### **Metode 2: Upload via Seed Script (Otomatis)**

Edit file `prisma/seed.ts` untuk set default image saat seeding:

```typescript
// Di seed.ts, tambahkan imageUrl
await prisma.bus.create({
  data: {
    routeId: route.id,
    tipe: 'Business Class',
    nama: 'Express Comfort',
    imageUrl: '/image/business-class.jpg', // ← Tambahkan ini
  }
})
```

Lalu jalankan:
```bash
bunx prisma db seed
```

---

## 📁 Struktur Folder

```
public/
  └── image/
      ├── bus.jpeg              # Default fallback image
      ├── business-class.jpg    # Business Class bus
      ├── high-class.jpg        # High Class bus
      ├── sleeper-class.jpg     # Sleeper Class bus
      └── ...                   # Gambar bus lainnya
```

---

## 🔧 Update Seed Script dengan ImageURL

Buka `prisma/seed.ts` dan update bagian pembuatan bus:

```typescript
const buses = [
  {
    tipe: 'Business Class',
    nama: 'Express Comfort',
    imageUrl: '/image/business-class.jpg', // ← Set default image
    seats: 36
  },
  {
    tipe: 'High Class',
    nama: 'Premium Luxury',
    imageUrl: '/image/high-class.jpg',
    seats: 32
  },
  {
    tipe: 'Sleeper Class',
    nama: 'Royal Sleeper',
    imageUrl: '/image/sleeper-class.jpg',
    seats: 24
  }
]
```

---

## ✅ Verifikasi Gambar Tampil

1. **Jalankan dev server**:
   ```bash
   bun run dev
   ```

2. **Buka halaman booking bus**:
   - Login ke aplikasi
   - Pilih rute & tanggal
   - Lihat halaman "Type bus"
   - Gambar bus akan tampil di card

3. **Jika gambar tidak tampil**:
   - ✅ Pastikan file ada di `public/image/`
   - ✅ Periksa nama file & extension (case-sensitive)
   - ✅ Pastikan path di database: `/image/filename.jpg` (bukan `public/image/`)
   - ✅ Refresh browser (Ctrl+R)

---

## 🌐 Upload Gambar di Production (Vercel)

Untuk production di Vercel, ada 2 opsi:

### **Opsi 1: Commit Gambar ke Git**
```bash
git add public/image/
git commit -m "add: bus images"
git push
```

### **Opsi 2: Gunakan Cloud Storage**
- Upload ke **Cloudinary**, **Vercel Blob**, atau **AWS S3**
- Update `imageUrl` di database dengan URL cloud:
  ```
  https://res.cloudinary.com/your-project/image/upload/bus.jpg
  ```

---

## 🎨 Tips Gambar Bus yang Bagus

- **Resolusi**: Minimal 400x400px
- **Aspect Ratio**: 1:1 (square) atau 4:3
- **Format**: WebP (best), JPG, PNG
- **Ukuran File**: Max 200KB (compress dulu)
- **Style**: Background terang, bus terlihat jelas

---

## 🔄 Troubleshooting

**Error: "Image optimization error"**
- Tambahkan domain di `next.config.mjs`:
  ```js
  images: {
    domains: ['res.cloudinary.com']
  }
  ```

**Gambar blur/pecah**
- Upload gambar dengan resolusi lebih tinggi
- Gunakan format WebP

**Gambar tidak muncul setelah deploy**
- Pastikan gambar sudah di-commit ke Git
- Atau gunakan absolute URL dari cloud storage

---

## 📝 Contoh Seed Script Lengkap

```typescript
// prisma/seed.ts
const busTypes = [
  { type: 'Business Class', image: '/image/business-class.jpg' },
  { type: 'High Class', image: '/image/high-class.jpg' },
  { type: 'Sleeper Class', image: '/image/sleeper-class.jpg' }
]

for (const route of routes) {
  for (const busType of busTypes) {
    const bus = await prisma.bus.create({
      data: {
        routeId: route.id,
        tipe: busType.type,
        nama: `${route.kotaAsal} ${busType.type}`,
        imageUrl: busType.image, // ← Default image
      }
    })
  }
}
```

Sekarang semua bus akan punya gambar default! 🚀
