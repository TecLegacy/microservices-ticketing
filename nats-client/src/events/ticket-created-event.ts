import { Subject } from './subjects/subject';

export interface TicketCreatedEvent {
  subject: Subject.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId?: string;
  };
}
