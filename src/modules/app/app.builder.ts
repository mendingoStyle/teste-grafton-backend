import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json } from 'express'
import { join } from 'path'
import { AppModule } from './app.module'
import serve from 'express-static'
import * as fs from 'fs'

export async function appBuilder() {
  let appOptions = {};

  const httpsOptions = {
    key: null,
    cert: null,
  };
  if (process.env.APP_ENV !== 'DEVELOPMENT') {
    httpsOptions.key = fs.readFileSync('./drlive-decrypted.key');
    httpsOptions.cert = fs.readFileSync('./drlive.crt');
    appOptions = {
      httpsOptions
    }
  }

  const app = await NestFactory.create(AppModule,
    appOptions,
  )
  app.enableCors()
  app.use(json({ limit: '50mb' }))
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use('/public', serve(join(process.cwd(), 'public')))
  return app
}
