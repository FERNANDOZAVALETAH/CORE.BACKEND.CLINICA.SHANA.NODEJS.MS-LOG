import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Logs, LogsSchema } from 'src/common/schemas';
import { ConsultingTcpController } from './cosulting-tcp.controller';
import { FnRegisterService } from './service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Logs.name,
        schema: LogsSchema
      }
    ]),
  ],
  controllers: [ConsultingTcpController],
  providers: [
    FnRegisterService
  ]
})
export class ConsultingModule {}