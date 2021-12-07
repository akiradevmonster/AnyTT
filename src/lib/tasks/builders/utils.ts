import fs from 'fs';
import { resolve } from 'path';
import parse from 'csv-parse/lib/sync';

// types
export type CsvRowAsObj = { [key: string]: string };

export const parseCsvSync = (dirPath: string, fileName: string): CsvRowAsObj[] => {
  const filePath = resolve(dirPath, fileName);
  return parse(fs.readFileSync(filePath, { encoding: 'utf8' }), {
    skip_empty_lines: true,
    columns: true,
    trim: true,
  });
};

export const isLargerThanNext: (current: number, next: number) => number = (
  current,
  next,
) => current - next;
