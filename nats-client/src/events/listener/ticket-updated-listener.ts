import { Message } from 'node-nats-streaming';
import { Listener } from '../abtract-classes/abstract-listener';
import { Subject } from '../subjects/subject';
import { TicketUpdatedEvent } from '../ticket-updated-event';
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subject.TicketUpdated;
  queueGroupName: string = 'payments-service';

  onMessage(
    data: {
      id: string;
      title: string;
      price: number;
      userId?: string | undefined;
    },
    msg: Message
  ): void {
    console.log(data);
    msg.ack();
  }
}
