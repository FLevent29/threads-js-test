import { expose } from 'threads/worker';
import { MessagePort } from 'worker_threads';

expose(async function add(port: MessagePort, a: number, b: number) {
  port.postMessage(
    `Hello from worker! Message port works! I am adding together ${a} and ${b}!`,
  );
  return a + b;
});
