<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h1 align="center">Sistem LMS Trainer</h1>

<p align="center">
  <strong>Backend Sistem Manajemen Pembelajaran komprehensif untuk mengelola sesi pelatihan, topik, dan materi.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

## Deskripsi

Sistem LMS Trainer adalah aplikasi backend yang kuat yang dibangun dengan framework [NestJS](https://nestjs.com/). Sistem ini dirancang untuk membantu lembaga pendidikan dan organisasi pelatihan mengelola konten pembelajaran mereka, menjadwalkan sesi pelatihan, dan mengatur materi pendidikan secara efektif.

Platform ini memungkinkan pelatih dan administrator untuk membuat dan mengelola konten pendidikan melalui topik, materi, dan tugas. Sistem ini menyediakan solusi komprehensif untuk mengorganisir, menjadwalkan, dan menyampaikan sesi pelatihan melalui antarmuka API yang intuitif.

## Fitur-fitur

- **Manajemen Pengguna**: Kontrol akses berbasis peran dengan peran ADMIN dan USER
- **Manajemen Topik**: Membuat, membaca, memperbarui, dan menghapus topik pendidikan
- **Manajemen Materi**: Mengunggah dan mengatur materi pembelajaran dengan URL file
- **Manajemen Tugas**: Menjadwalkan sesi pelatihan dengan tanggal/waktu, kapasitas, dan penugasan pelatih
- **Manajemen Sesi Pelatihan**: Mengorganisir acara belajar dengan tautan kelas dan batas peserta
- **Integrasi Database**: Database MySQL dengan ORM Prisma
- **Otentikasi**: Otentikasi berbasis JWT dengan Passport.js
- **Validasi**: Validasi input menggunakan Zod
- **Keamanan**: Hashing password dengan bcrypt

## Teknologi yang Digunakan

- **Framework**: [NestJS](https://nestjs.com/) (v11.0.1)
- **Bahasa**: TypeScript
- **Database**: MySQL dengan [Prisma ORM](https://www.prisma.io/)
- **Otentikasi**: Strategi JWT dengan Passport.js
- **Validasi**: Zod
- **Keamanan**: bcrypt untuk hashing password
- **Pengujian**: Jest untuk pengujian unit dan e2e
- **Format Kode**: Prettier
- **Linting**: ESLint

## Arsitektur

Aplikasi ini mengikuti pola arsitektur modular NestJS:

- **Modul Inti**:
  - **Modul Topik**: Mengelola topik pendidikan
  - **Modul Materi**: Menangani materi dan sumber pembelajaran
  - **Modul Tugas**: Menjadwalkan dan mengelola sesi pelatihan
  - **Modul Pengguna**: Mengelola akun dan otentikasi pengguna

- **Lapisan Data**:
  - ORM Prisma untuk interaksi database
  - Database MySQL untuk persistensi data
  - Definisi entitas yang aman secara tipe

- **Lapisan Keamanan**:
  - Otentikasi JWT
  - Otorisasi berbasis peran
  - Validasi input

## Persiapan Proyek

### Prasyarat

- Node.js (v20+)
- npm atau yarn
- Database MySQL

### Instalasi

```bash
# Clone repository
$ git clone <repository-url>

# Masuk ke direktori proyek
$ cd lms-trainer

# Instal dependensi
$ npm install
```

### Konfigurasi Lingkungan

Buat file `.env` di direktori root dengan konfigurasi berikut:

```env
DATABASE_URL="mysql://username:password@localhost:3306/lms_trainer"
JWT_SECRET="kunci_rahasia_jwt_anda"
JWT_EXPIRES_IN="24h"
BCRYPT_SALT_ROUNDS=10
```

### Persiapan Database

```bash
# Generate client Prisma
$ npx prisma generate

# Push skema ke database
$ npx prisma db push

# Atau jalankan migrasi
$ npx prisma migrate dev
```

### Kompilasi dan Menjalankan Proyek

```bash
# Mode development
$ npm run start:dev

# Mode production
$ npm run start:prod

# Mode watch
$ npm run start:dev
```

## Endpoint API

Aplikasi menyediakan endpoint RESTful untuk semua fungsionalitas inti:

- **Otentikasi**: `/auth/login`, `/auth/register`
- **Topik**: `/topics` (GET, POST, PUT, DELETE)
- **Materi**: `/materials` (GET, POST, PUT, DELETE)
- **Tugas**: `/assignments` (GET, POST, PUT, DELETE)
- **Pengguna**: `/users` (GET, POST, PUT, DELETE)

## Menjalankan Pengujian

```bash
# Pengujian unit
$ npm run test

# Pengujian e2e
$ npm run test:e2e

# Cakupan pengujian
$ npm run test:cov
```

## Deployment

Saat melakukan deployment ke production, pastikan Anda:

1. Mengatur variabel lingkungan production
2. Mengkonfigurasi database production
3. Mengatur rahasia JWT secara aman
4. Mengkonfigurasi sertifikat SSL
5. Menggunakan manajer proses seperti PM2 untuk menjalankan aplikasi

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/fitur-hebat`)
3. Commit perubahan Anda (`git commit -m 'Tambah fitur hebat'`)
4. Push ke branch (`git push origin feature/fitur-hebat`)
5. Buka Pull Request

## Dukungan

Untuk pertanyaan dan dukungan, silakan hubungi tim pengembang atau kirimkan isu di repositori.

## Tetap Terhubung

- Pembuat - [Tim Pengembang]
- Framework - [NestJS](https://nestjs.com/)

## Lisensi

Proyek ini dilisensikan di bawah [lisensi MIT](https://github.com/nestjs/nest/blob/master/LICENSE).
