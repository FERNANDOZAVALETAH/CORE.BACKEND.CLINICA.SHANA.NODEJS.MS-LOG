import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from 'src/common/schemas';
import { AccessTcpController } from './access.tcp-controller';
import { FnRegisterService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Logs.name,
        schema: LogsSchema
      }
    ]),
  ],
  controllers: [AccessTcpController],
  providers: [
    FnRegisterService
  ]
})
export class AccessModule {}