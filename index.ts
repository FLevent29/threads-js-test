import { spawn, Thread, Worker, Transfer } from 'threads';
import * as path from 'path';
import { MessageChannel } from 'worker_threads';

(async function Main() {
  const { port1, port2 } = new MessageChannel();
  port2.on('message', (msg: string) => {
    console.log(msg);
  });
  const add = await spawn(new Worker(path.join('worker')));
  const sum = await add(Transfer(port1), 2, 3);

  console.log(`2 + 3 = ${sum}`);

  await Thread.terminate(add);
})().catch(console.error);
