import { container } from 'tsyringe'

import IStorageProvider from './StorageProviders/models/IStorageProvider'
import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider'

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import EtherealMailProvider from '@shared/container/providers/MailProvider/implementations/EtherealMailProvider'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)