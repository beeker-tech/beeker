import { Logger, VariableParser } from '../../../../../_utils';
import { FilePathMissingParamException } from './file-path-missing-param.exception';
import { ActionExecutionVariable } from '../../execution-variable.model';
import { VarInterpMode } from '@beeker-tech/engine-common';

export class ActionRuleApplicationFilePathParser {
  constructor(private logger: Logger, private variableParser: VariableParser) {}

  parse(
    filePath: string,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ): string {
    const parsedFilePath = this.replacePlaceholdersWithVariables(
      filePath,
      variables,
      variableInterpolationMode
    );

    this.logger.verbose(
      `ActionRuleApplicationFilePathParser`,
      `parsed rule path ${JSON.stringify(parsedFilePath)}`
    );

    const unfilledPlaceholders = this.variableParser.findPlaceholders(
      parsedFilePath,
      variableInterpolationMode
    );

    if (unfilledPlaceholders.length) {
      throw new FilePathMissingParamException(filePath, unfilledPlaceholders);
    }

    return parsedFilePath;
  }

  private replacePlaceholdersWithVariables = (
    document: string,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ): string => {
    let documentWithVariablesFilled = document;

    if (variables) {
      for (const variable of variables) {
        const { name, value } = variable;

        documentWithVariablesFilled =
          this.variableParser.replacePlaceholdersWithVariable(
            documentWithVariablesFilled,
            name,
            value,
            variableInterpolationMode
          );
      }
    }

    return documentWithVariablesFilled;
  };
}
