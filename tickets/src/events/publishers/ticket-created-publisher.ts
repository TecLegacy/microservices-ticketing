import {
  Publisher,
  Subject,
  TicketCreatedEvent,
} from '@webcafetickets/pub-sub';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
}
