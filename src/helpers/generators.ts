import { INestApplication, Logger } from '@nestjs/common'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'
import { version } from '../../package.json'
import * as path from 'path'
import * as fs from 'fs'

function writeSwaggerFile(
  tempPath: string,
  readSwagger: string,
  document: OpenAPIObject,
) {
  fs.writeFile(
    path.resolve(tempPath, 'swagger.html'),
    readSwagger.replace('$$spec', JSON.stringify(document)),
    {
      encoding: 'utf8',
    },
    (err) => {
      if (err) {
        Logger.error(err, 'SwaggerGenerator')
      } else {
        Logger.log('Swagger file generated', 'Swagger')
      }
    },
  )
}

export async function generateSwaggerHtml(app: INestApplication) {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Teste')
    .setDescription(
      '<div><b>Rotas da aplicação do back-end</b></div>'
    )
    .setVersion(version)
    .addServer(process.env.NODE_ENV === 'production' ? '/acessible-api' : '/')
    .build()

  const document = SwaggerModule.createDocument(app, options)

  fs.readFile(
    path.resolve(process.cwd(), 'src', 'templates', 'swagger.template'),
    {
      encoding: 'utf8',
    },
    (err, readSwagger) => {
      if (!err) {
        const tempPath = path.resolve(process.cwd(), 'tmp')

        if (!fs.existsSync(tempPath)) {
          fs.mkdir(tempPath, { recursive: true }, (err, _path) => {
            if (err) {
              Logger.error(err, 'SwaggerGenerator')
              return
            }
            writeSwaggerFile(tempPath, readSwagger, document)
          })
        } else {
          writeSwaggerFile(tempPath, readSwagger, document)
        }
      }
    },
  )
}
