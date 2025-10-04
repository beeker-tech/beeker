import { AnySchema, AnyValidateFunction } from 'ajv/dist/core';

export interface SchemaValidator {
  compile<T>(schema: AnySchema): AnyValidateFunction<T>;
}
