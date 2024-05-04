import type { Product } from '@/models/Product';
import type { Pagination } from '@/models/Pagination';

export interface ProductsPagination extends Pagination {
    products: Product[];
}
