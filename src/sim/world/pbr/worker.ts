/// <reference lib="webworker" />
/** Worker de generación de texturas: recibe un trabajo y devuelve sus mapas (sin copiar: transferidos). */
import { runJob, transferables, type Job } from './jobs';

self.onmessage = (e: MessageEvent<Job>) => {
  const res = runJob(e.data);
  (self as unknown as Worker).postMessage(res, transferables(res));
};
