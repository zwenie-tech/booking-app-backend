import multer from "multer";

export class FileUploader {
  private storage: multer.StorageEngine;
  public uploadMulter: multer.Multer;

  constructor() {
    this.storage = multer.memoryStorage();
    this.uploadMulter = multer({ storage: this.storage });
  }
  getUploader() {
    return this.uploadMulter;
  }
}

// export const fileUploader = new FileUploader();
// export const uploadMulter = fileUploader.uploadMulter;
