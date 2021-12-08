import fs from 'fs';
import { connect, disconnect } from '../../data/db';
import tasks, { buildOpsFilePath } from './tasks.config';
import { BulkOpsWithModel } from './builders';
import { BulkOps } from '../types/mongodb.bulkOps';

const { readFile } = fs.promises;

const main = async () => {
  const db = await connect();
  for await (const task of tasks.filter((t) => t.type === 'gtfs')) {
    for await (const source of task.sources) {
      const { key, uri } = source;
      if (uri !== null) {
        const opsFilePath = buildOpsFilePath(key);
        const operations: BulkOpsWithModel[] = JSON.parse(
          await readFile(opsFilePath, { encoding: 'utf8' }),
        );
        const op = operations[0].ops[0] as BulkOps.UpdateOne;
        const feedVersion = op.updateOne.update.version as string;
        const feedInfo = await db.models.Feed.findOne(
          { uri: source.uri },
          'inProcessing, version',
        );
        if (feedInfo?.inProcessing) {
          console.log('Other process in running. No need to run');
        } else if (feedVersion === feedInfo?.version) {
          console.log('Feed version has not changed. No need to run');
        } else {
          for await (const operation of operations) {
            const { model, ops } = operation;
            const result = await db.models[model].bulkWrite(ops);
            console.log(model, result);
          }
        }
      }
    }
  }
  await disconnect();
};

main().catch(async (err) => {
  await disconnect();
  console.error(err);
  process.exit(1);
});
