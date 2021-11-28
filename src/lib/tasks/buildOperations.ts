import fs from 'fs';

import tasks, { buildDataDirPath, buildOpsFilePath, opsDirPath } from './tasks.config';
import buildBulkOperations from './builders';

const { mkdir, writeFile } = fs.promises;

type PromiseReturningVoid = Promise<void>;
const main = async (): PromiseReturningVoid => {
  await mkdir(opsDirPath, { recursive: true });

  for await (const task of tasks.filter((t) => t.type === 'gtfs')) {
    for await (const source of task.sources) {
      const { key, uri } = source;
      if (uri !== null) {
        const sourceDirPath = buildDataDirPath(key);
        const destFilePath = buildOpsFilePath(key);

        const ops = buildBulkOperations({ key, uri }, sourceDirPath);
        await writeFile(destFilePath, JSON.stringify(ops, null, 2));
      }
    }
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
