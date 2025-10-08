export class Pagination {
  currentPage?: number;
  perPage?: number;
  totalItems?: number;
  totalPages?: number;

  constructor(currentPage: number, perPage: number, totalItems: number) {
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.totalItems = totalItems;
    this.totalPages = Math.ceil(totalItems / perPage);
  }
}
