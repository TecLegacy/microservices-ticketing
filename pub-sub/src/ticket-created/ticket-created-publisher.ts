import { Publisher } from '../nats-config/abstract-publisher';
import { Subject } from '../nats-config/subject';
import { TicketCreatedEvent } from '../events/ticket-created-event';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject = Subject.TicketCreated;
}
