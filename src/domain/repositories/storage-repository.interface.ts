export interface StorageRepository {
  upload(file: Buffer, key: string, type: string): Promise<string>;
  delete(key: string): Promise<void>;
}