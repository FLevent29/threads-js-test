import { expose } from 'threads/worker';
import { MessagePort } from 'worker_threads';
import { setTimeout } from 'timers/promises';

expose(async function add(port: MessagePort, a: number, b: number) {
  let i = 10;
  while ((i -= 1) > 0) {
    await setTimeout(1000);
    port.postMessage(`Hello from worker! ${i.toString(10)}`);
  }
  return a + b;
});
