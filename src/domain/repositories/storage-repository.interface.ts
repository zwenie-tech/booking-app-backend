export interface StorageRepository {
  upload(file: Buffer, key: string): Promise<void>;
  download(key: string): Promise<void>;
  delete(key: string): Promise<void>;
}