import { Subject } from './subject';

export interface TicketCreatedEvent {
  subject: Subject;
  data: {
    id: string;
    title: string;
    price: number;
    userId?: string;
  };
}
