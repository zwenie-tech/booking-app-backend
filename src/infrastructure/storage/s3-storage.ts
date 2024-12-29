import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { StorageRepository } from "../../domain/repositories/storage-repository.interface";
import { s3Client } from "../../config/s3";
import sharp from "sharp";

export class S3ObjectStoreService implements StorageRepository {
  private async reSizeImage(file: Buffer) {
    const buffer = await sharp(file).resize(600).toBuffer();
    return buffer;
  }

  async upload(file: Buffer, key: string, type: string): Promise<string> {
    const buffer = await this.reSizeImage(file);
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME!,
      Key: key,
      Body: buffer,
      ContentType: type,
    });
    const result = await s3Client.send(command);
    console.log(result);
    return `${process.env.S3_BASE_URL}${key}`;
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
        Bucket: process.env.BUCKET_NAME!,
        Key: key
    });
    s3Client.send(command);
  }
}
