export type PaginationMeta = {
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  totalPages: number;
  totalItems: number;
};