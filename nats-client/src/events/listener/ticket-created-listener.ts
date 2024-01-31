import { Message } from 'node-nats-streaming';
import { Listener } from '../abtract-classes/abstract-listener';
import { TicketCreatedEvent } from '../ticket-created-event';
import { Subject } from '../subjects/subject';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // subject = 'ticket:created';
  readonly subject = Subject.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
