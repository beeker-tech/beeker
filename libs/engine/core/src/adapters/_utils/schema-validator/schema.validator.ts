import Ajv, { AnySchema, Options } from 'ajv';
import { SchemaValidator } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import { AnyValidateFunction } from 'ajv/dist/core';

const options: Options = {
  allowUnionTypes: true,
};

@Injectable()
export class SchemaValidatorImpl implements SchemaValidator {
  private ajv: Ajv = new Ajv(options);

  compile<T>(schema: AnySchema): AnyValidateFunction<T> {
    return this.ajv.compile(schema);
  }
}
