export function toDateOnly(dateStr: string | Date) {
  // "2025-10-12" -> Date di JS (jam diabaikan saat simpan @db.Date)
  const date = `${dateStr}T00:00:00`;
  return new Date(date);
}
export function toTimeOnly(hhmm: string | Date) {
  // "09:00" -> Date, jam-menit dipakai saat simpan @db.Time
  const time = `1970-01-01T${hhmm}:00`;
  return new Date(time);
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
  return new Intl.DateTimeFormat('en-GB', opsiFormat).format(date);
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
