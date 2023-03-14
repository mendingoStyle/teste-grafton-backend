import {
  Controller,
  Get,
  Post,
  Body,
  Res,
} from '@nestjs/common'

import { ApiExcludeEndpoint, ApiProperty, ApiTags } from '@nestjs/swagger'
import * as path from 'path'
import { version } from '../../../package.json'

class ResponseRoot {
  @ApiProperty()
  version: string
}

class ResponseHealth extends ResponseRoot {
  @ApiProperty()
  status: string
}

@ApiTags('Auth')
@Controller()
export class AppController {

  @Get()
  index(): ResponseRoot {
    return {
      version,
    }
  }


  @Get('/health')
  healthCheck(): ResponseHealth {
    return {
      status: 'UP',
      version,
    }
  }

  @ApiExcludeEndpoint()
  @Get('docs')
  docs(@Res() res) {
    return res.sendFile(path.resolve(process.cwd(), 'tmp', 'swagger.html'))
  }


}
