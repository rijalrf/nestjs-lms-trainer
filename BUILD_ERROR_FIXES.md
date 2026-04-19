
# Laporan Perbaikan Error Build

Dokumen ini merinci kesalahan yang ditemukan selama proses build dan langkah-langkah perbaikan yang telah diterapkan pada proyek **nestjs-lms-trainer**.

## 1. Masalah Autentikasi & DTO User
**Error:** 
- `Property 'password' does not exist on type 'UserResponseDTO'`.
- `LoginResponseDTO.set(user, token)` mengharapkan model Prisma `User`, bukan DTO.

**Penyebab:** 
`UserResponseDTO` dirancang untuk menyembunyikan password demi keamanan, namun proses login di `AuthService` membutuhkan password untuk validasi.

**Perubahan:**
- **`src/user/user.dto.ts`**: 
    - Menambahkan `UserAuthDTO` yang mewarisi `UserResponseDTO` tetapi menyertakan field `password` untuk penggunaan internal.
    - Memperbaiki constructor `UserResponseDTO` yang sebelumnya lupa menggunakan kata kunci `this`.
    - Mengubah `id` menjadi non-nullable (`number`) karena data berasal dari database.
- **`src/user/user.service.ts`**: Mengubah `findAuthByEmail` agar mengembalikan `UserAuthDTO`.
- **`src/auth/auth.dto.ts`**: Memperbarui `LoginResponseDTO` agar menerima `UserResponseDTO` alih-alih model Prisma `User`, menjaga konsistensi penggunaan DTO.

## 2. Kesalahan Import Prisma
**Error:** `Cannot find module 'generated/prisma'`.

**Penyebab:** Import pada `AssignmentEntity` mengarah ke folder yang tidak ada atau salah konfigurasi.

**Perubahan:**
- **`src/core/assignment/assignment.entity.ts`**: Mengubah import `Prisma` agar mengambil langsung dari `@prisma/client`.

## 3. Ketidakcocokan Tipe Data Material Popular
**Error:** `MaterialPopularEntity` tidak ditemukan dan `MaterialPopularSQLResult` tidak bisa di-assign ke DTO.

**Penyebab:** 
- Tipe data `MaterialPopularEntity` belum didefinisikan di entity.
- Hasil query SQL mentah (raw query) hanya mengembalikan field tertentu (`title`, `description`, `countAssignment`), sehingga tidak cocok dengan entity lengkap.

**Perubahan:**
- **`src/core/material/material.entity.ts`**: Menambahkan definisi tipe `MaterialPopularEntity`.
- **`src/core/material/material.dto.ts`**: Memperbarui `MaterialsPopularResponseDTO` agar menggunakan `MaterialPopularSQLResult` sebagai sumber data karena query SQL mentah tidak mengembalikan semua kolom material.

## 4. Konfigurasi TypeScript (tsconfig)
**Error:** `Invalid value for '--ignoreDeprecations'`.

**Penyebab:** Terdapat baris `"ignoreDeprecations": "6.0"` di `tsconfig.json` yang bukan merupakan opsi valid untuk versi TypeScript yang digunakan.

**Perubahan:**
- **`tsconfig.json`**: Menghapus opsi `ignoreDeprecations`.

## 5. Perbaikan Lainnya
- Menambahkan *Definite Assignment Assertion* (`!`) pada `UserRequestDTO` untuk menghindari error inisialisasi pada mode strict.
- Memastikan `user.id` dari request di Controller dilempar sebagai `number` yang valid (menggunakan assertion `!`).

---
**Status Akhir:** Build Berhasil (`npm run build` sukses).
