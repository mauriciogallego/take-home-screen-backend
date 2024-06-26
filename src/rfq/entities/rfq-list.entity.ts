import { PaginatedResult } from '@src/common/entities/paginated-result.entity';
import { Rfq } from './rfq.entity';

export class RfqList extends PaginatedResult<Rfq> {
  results: Rfq[];
}
