import { StorageRepository } from "../../../domain/repositories/storage-repository.interface";

export class UploadFileUseCase{
    constructor(private storageRepository: StorageRepository){}
    async execute(file: Buffer, key: string, type:string): Promise<string>{
        return await this.storageRepository.upload(file, key, type)
    }
}