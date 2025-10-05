// Tipe untuk Meta (Pagination)
export class ApiMeta {
  currentPage?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;
}

// DTO Sukses, menggunakan Generics <T> untuk tipe data
export class ApiSuccessResponse<T> {
  readonly statusCode: number;
  readonly isSuccess: boolean = true; // Selalu true untuk sukses
  readonly message: string;
  readonly data: T; // Tipe data yang dibungkus
  readonly meta?: ApiMeta; // Opsional

  constructor(
    data: T,
    message: string = 'Operation successful',
    meta?: ApiMeta,
  ) {
    this.statusCode = 200; // Default OK
    this.message = message;
    this.data = data;
    this.meta = meta;
  }
}
