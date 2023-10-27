import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices'
import { IRegister } from "./interfaces";
import { FnRegisterService } from "./service";

@Controller()
export class ConsultingTcpController {
    
    constructor(
        private readonly fnRegisterService: FnRegisterService
    ) {}
    
    @MessagePattern({ subjet: 'client-log', function: 'consulting/register' })
    register(payload: IRegister): Promise<void> {
        return this.fnRegisterService.execute(payload);
    }

}