import { PaginatedResult } from '@src/common/entities/paginated-result.entity';
import { Product } from './product.entity';

export class ProductList extends PaginatedResult<Product> {
  results: Product[];
}
