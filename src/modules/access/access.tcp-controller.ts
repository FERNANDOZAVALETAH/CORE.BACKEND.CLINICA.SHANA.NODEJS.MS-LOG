import { Controller } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices'
import { IRegister } from "./interfaces";
import { FnRegisterService } from "./services";

@Controller()
export class AccessTcpController {
    
    constructor(
        private readonly fnRegisterService: FnRegisterService
    ) {}
    
    @MessagePattern({ subjet: 'client-log', function: 'access/register' })
    register(payload: IRegister): Promise<void> {
        return this.fnRegisterService.execute(payload);
    }

}