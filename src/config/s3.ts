import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCESS_KEY!,
        secretAccessKey: process.env.SECRET_ACCESS_KEY!
    },
    region: process.env.BUCKET_REGION!
})