import { Subject } from './subjects/subject';

export interface TicketUpdatedEvent {
  subject: Subject.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId?: string;
  };
}
