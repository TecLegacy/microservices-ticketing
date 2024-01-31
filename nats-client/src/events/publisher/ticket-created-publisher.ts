import { Publisher } from '../abtract-classes/abstract-publisher';
import { Subject } from '../subjects/subject';
import { TicketCreatedEvent } from '../ticket-created-event';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject = Subject.TicketCreated;
}
