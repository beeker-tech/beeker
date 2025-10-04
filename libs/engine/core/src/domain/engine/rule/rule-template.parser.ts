import { RuleVariable } from './rule-variable.model';
import { Logger, VariableParser } from '../../_utils';
import { RuleTemplateMissingParamException } from './rule-template-param.exception';
import { VarInterpMode } from '@beeker-tech/engine-common';

export class RuleTemplateParser {
  constructor(private logger: Logger, private variableParser: VariableParser) {}

  async parse(
    ruleName: string,
    ruleTemplate: string,
    variables: RuleVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ): Promise<string> {
    const document = this.replacePlaceholdersWithVariables(
      ruleTemplate,
      variables,
      variableInterpolationMode
    );

    this.logger.verbose(
      `RuleTemplateParser`,
      `parsed rule template ${JSON.stringify(document)}`
    );

    const unfilledPlaceholders = this.variableParser.findPlaceholders(
      document,
      variableInterpolationMode
    );

    if (unfilledPlaceholders.length) {
      throw new RuleTemplateMissingParamException(
        ruleName,
        unfilledPlaceholders
      );
    }

    return document;
  }

  private replacePlaceholdersWithVariables = (
    document: string,
    variables: RuleVariable[] | null,
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
