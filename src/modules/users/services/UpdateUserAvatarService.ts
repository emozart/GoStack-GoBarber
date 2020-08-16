import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import User from '@modules/users/infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import IUserRepository from '@modules/users/Repositories/IUsersRepository'
import IStorageProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider'

interface IUploadRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) { }

  public async execute({
    user_id,
    avatarFilename
  }: IUploadRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = fileName
    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
