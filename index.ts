import { spawn, Thread, Worker, Transfer } from 'threads';
import { MessageChannel } from 'worker_threads';
import * as path from 'path';

(async function Main() {
  const { port1, port2 } = new MessageChannel();
  port2.on('message', (msg: unknown) => {
    console.log(msg);
  });

  const addFn = await spawn(new Worker(path.join('worker')));
  // todo: cast port1 as any
  const sum = await addFn(Transfer(port1), 2, 3);

  console.log(`2 + 3 = ${sum}`);

  await Thread.terminate(addFn);
})().catch(console.error);
