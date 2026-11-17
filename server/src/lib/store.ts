import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const storageDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../storage');

// Tiny JSON-file storage. Good enough for a demo, swap for a real DB later.
// Writes are chained so two requests never overwrite each other's data.
let queue: Promise<unknown> = Promise.resolve();

async function readCollection<T>(name: string): Promise<T[]> {
  try {
    const raw = await readFile(path.join(storageDir, `${name}.json`), 'utf8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export function append<T extends object>(name: string, record: T) {
  const task = queue.then(async () => {
    await mkdir(storageDir, { recursive: true });
    const items = await readCollection<T & { id: string; createdAt: string }>(name);
    const entry = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...record };
    items.push(entry);
    await writeFile(path.join(storageDir, `${name}.json`), JSON.stringify(items, null, 2));
    return entry;
  });
  queue = task.catch(() => undefined);
  return task;
}

export const list = readCollection;
