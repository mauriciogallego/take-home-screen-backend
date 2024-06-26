import { PaginatedResult } from '@src/common/entities/paginated-result.entity';
import { Quote } from './quote.entity';

export class QuoteList extends PaginatedResult<Quote> {
  results: Quote[];
}
