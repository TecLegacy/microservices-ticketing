import { Message } from 'node-nats-streaming';
import { Listener } from '../nats-config/abstract-listener';
import { TicketCreatedEvent } from '../events/ticket-created-event';
import { Subject } from '../nats-config/subject';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // subject = 'ticket:created';
  readonly subject = Subject.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message): void {
    console.log(data);
    msg.ack();
  }
}
