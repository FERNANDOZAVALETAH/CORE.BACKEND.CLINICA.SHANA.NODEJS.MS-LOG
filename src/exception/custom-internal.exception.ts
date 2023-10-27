import { InternalServerErrorException } from '@nestjs/common';
import { GENERAL } from '../const/general.const';

export class RegisterLogInternalException extends InternalServerErrorException {
  constructor(execute: string) {
    super(`${GENERAL.EXCEPTION_CODE.REGISTER_LOG}=>${execute}`);
  }
}