import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import yauzl from 'yauzl-promise';

import tasks, { GtfsSource, buildDataDirPath } from './tasks.config';

const { mkdir } = fs.promises;

const buildUri = (source: GtfsSource): URL => {
  const uri = new URL(source.uri as string);
  if (source.auth?.type === 'params') {
    if (source.auth.key == null || source.auth.value == null) {
      throw new Error('`source.auth.key` and `source.auth.value` are required.');
    }
    let value = '';
    if (typeof source.auth.value === 'string') {
      value = source.auth.value;
    } else if (source.auth.value.type === 'process.env') {
      const envValue = process.env[source.auth.value.name];
      if (envValue == null) {
        throw new Error(`missing $${source.auth.value.name}`);
      }
      value = envValue;
    }
    uri.searchParams.append(source.auth.key, value);
  }
  return uri;
};

type PromiseVoid = Promise<void>;

const fetchAndStore = (source: GtfsSource, outDirPath: string): PromiseVoid => {
  const uri = buildUri(source);
  return fetch(uri).then(async (res) => {
    const buffer = await res.buffer();
    const zipFile = await yauzl.fromBuffer(buffer, { lazyEntries: true });
    await zipFile.walkEntries(async (entry) => {
      const filePath = path.resolve(outDirPath, entry.fileName);
      const writeStream = fs.createWriteStream(filePath);
      const readStream = await zipFile.openReadStream(entry);
      readStream.pipe(writeStream);
      console.log(entry.getLastModDate(), entry.fileName);
    });
    await zipFile.close();
  });
};

const main = async () => {
  for await (const task of tasks.filter((t) => t.type === 'gtfs')) {
    for await (const source of task.sources) {
      if (source.uri !== null) {
        const outDirPath = buildDataDirPath(source.key);
        await mkdir(outDirPath, { recursive: true });

        await fetchAndStore(source, outDirPath);
      }
    }
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
