import {
  Publisher,
  Subject,
  TicketUpdatedEvent,
} from '@webcafetickets/pub-sub';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subject.TicketUpdated;
}
