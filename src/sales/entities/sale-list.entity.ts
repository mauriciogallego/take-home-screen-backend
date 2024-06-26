import { PaginatedResult } from '@src/common/entities/paginated-result.entity';
import { Sale } from './sale.entity';

export class SaleList extends PaginatedResult<Sale> {
  results: Sale[];
}
