import {
  CellCollectorResults,
  CellCollector as CellCollectorInterface,
} from "ckb-js-toolkit";

export type Logger = (level: string, message: string) => void;

export interface IndexerOptions {
  pollIntervalSeconds?: number;
  livenessCheckIntervalSeconds?: number;
  logger?: Logger;
}

export interface Tip {
  block_number: string;
  block_hash: string;
}

// TODO: change those when we have proper typing for all the CKB data structures.
export interface Script {
  code_hash: string;
  hash_type: string;
  args: string;
}

export interface OutPoint {
  tx_hash: string;
  index: string;
}

export interface CollectorQueries {
  lock?: Script;
  type?: Script;
  argsLen?: number;
}

export interface TransactionCollectorOptions {
  skipMissing?: boolean;
  includeStatus?: boolean;
}

export class CellCollector implements CellCollectorInterface {
  constructor(indexer: Indexer, queries: CollectorQueries);

  collect(): CellCollectorResults;
}

export class TransactionCollector implements CellCollectorInterface {
  constructor(
    indexer: Indexer,
    queries: CollectorQueries,
    options?: TransactionCollectorOptions
  );

  collect(): CellCollectorResults;
}

export class Indexer {
  constructor(uri: string, path: string, options?: IndexerOptions);

  running(): boolean;
  startForever(): void;
  start(): void;
  stop(): void;
  tip(): Promise<Tip>;

  collector(queries: CollectorQueries): CellCollector;
}
