/* eslint-disable @typescript-eslint/no-explicit-any */
export namespace BulkOps {
  type Filterable = {
    filter: { [key: string]: any };
  };
  type Updatable = {
    update: { [key: string]: any };
  };
  type Options = {
    upsert?: boolean;
  };
  export type InsertOne = {
    insertOne: {
      document: { [key: string]: any };
    };
  };
  export type UpdateOne = {
    updateOne: Filterable & Updatable & Options;
  };
  export type UpdateMany = {
    updateMany: Filterable & Updatable & Options;
  };
  export type DeleteOne = {
    deleteOne: Filterable;
  };
  export type DeleteMany = {
    deleteMany: Filterable;
  };
  export type ReplaceOne = {
    replaceOne: {
      replacement: { [key: string]: any };
    } & Filterable &
      Options;
  };
  export type Operation =
    | InsertOne
    | UpdateOne
    | UpdateMany
    | DeleteOne
    | DeleteMany
    | ReplaceOne;
  export type Operations = Operation[];
}

export type BulkOperation = BulkOps.Operation;
export type BulkOperations = BulkOps.Operations;
