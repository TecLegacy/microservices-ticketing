import nats, { Stan } from 'node-nats-streaming';

class NatsClient {
  private _stan?: Stan;

  get client() {
    if (!this._stan) {
      throw new Error('Client cannot connect before initialization');
    }

    return this._stan;
  }

  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._stan = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      // this._stan!.on('error', err => {
      //   reject(`Stan wrapper Reject ${err}`);
      // });
      this.client.on('error', err => {
        reject(`Stan wrapper Reject ${err}`);
      });

      this.client.on('connect', (err, guid) => {
        console.log('Connected To NATS!!');
      });
      resolve();
    });
  }
}

export const natsClient = new NatsClient();
