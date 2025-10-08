export function toDateOnly(dateStr: string) {
  // "2025-10-12" -> Date di JS (jam diabaikan saat simpan @db.Date)
  return `${dateStr}T00:00:00`;
}
export function toTimeOnly(hhmm: string) {
  // "09:00" -> Date, jam-menit dipakai saat simpan @db.Time
  return `1970-01-01T${hhmm}:00`;
}

export function toTimeLocal(date: any) {
  const opsiFormat = {
    // Tentukan zona waktu ke Asia/Jakarta (WIB = UTC+7)
    timeZone: 'Asia/Jakarta' as const,

    // Opsi tampilan:
    hour: '2-digit' as const,
    minute: '2-digit' as const,
    hour12: false, // Gunakan format 24 jam
  };
  return new Intl.DateTimeFormat('id-ID', opsiFormat).format(date);
}

export function toDateLocal(date: any) {
  const opsiFormat = {
    // Tentukan zona waktu ke Asia/Jakarta (WIB = UTC+7)
    timeZone: 'Asia/Jakarta' as const,

    // Opsi tampilan:
    year: 'numeric' as const, // 2025
    month: '2-digit' as const, // 10
    day: '2-digit' as const,
  };
  return new Intl.DateTimeFormat('sv-SE', opsiFormat).format(date);
}
