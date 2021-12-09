import { resolve } from 'path';

type ProcessEnvAuthValue = {
  type: 'process.env';
  name: string;
};

type AuthValue = ProcessEnvAuthValue;

type ParamsAuthInfo = {
  type: 'params';
  key: string;
  value: string | AuthValue;
};

type AuthInfo = ParamsAuthInfo;

export type GtfsSource = {
  key: string;
  name: string;
  uri: string | null;
  auth?: AuthInfo;
};

export type GtfsSourceIdentifier = { [P in 'key' | 'uri']: NonNullable<GtfsSource[P]> };

type GtfsConfig = {
  type: 'gtfs';
  sources: GtfsSource[];
};

type TaskConfig = GtfsConfig[];

const config: TaskConfig = [
  {
    type: 'gtfs',
    sources: [
      {
        key: 'tobus',
        name: '都営バス',
        uri:
          'https://api-tokyochallenge.odpt.org/api/v4/files/Toei/data/ToeiBus-GTFS.zip',
        auth: {
          type: 'params',
          key: 'acl:consumerKey',
          value: { type: 'process.env', name: 'ODPT_AUTH_TOKEN' },
        },
      },
      {
        key: 'dt-shuttle',
        name: 'ドゥトゥールシャトルバス',
        uri: null,
      },
      {
        key: 'harumi-liner',
        name: '晴海ライナー',
        uri: null,
      },
      {
        key: 'chuo-edo-bus',
        name: '中央区コミュニティバス(江戸バス)',
        uri: null,
      },
    ],
  },
];

export default config;

const tmpPath = 'tmp';
export const buildDataDirPath = (key: string): string => resolve(tmpPath, 'data', key);
export const opsDirPath = resolve(tmpPath, 'ops');
export const buildOpsFilePath = (key: string): string =>
  resolve(opsDirPath, `${key}.json`);
