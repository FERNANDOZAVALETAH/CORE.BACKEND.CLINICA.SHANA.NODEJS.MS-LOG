import { Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { IRegister } from "../interfaces";
import { Logs, LogsDocument } from "src/common/schemas";
import { RegisterLogInternalException } from "src/exception";


export class FnRegisterService {
    private logger = new Logger(`::${FnRegisterService.name}::`);

    constructor(
        @InjectModel(Logs.name)
        private readonly logModel: mongoose.Model<LogsDocument>
    ){}

    async execute(payload: IRegister): Promise<void>{
        this.logger.debug(
            `::execute::parameters::${JSON.stringify(payload)}`,
        );
        try {
            await this.logModel.create({
                type: payload.type,
                idUser: payload.idUser,
                status: 1
            });
            this.logger.debug(
                `::execute::parameters::success`,
            );
        } catch (error) {
            this.logger.error(error);
            throw new RegisterLogInternalException(FnRegisterService.name);
        }

    }
}