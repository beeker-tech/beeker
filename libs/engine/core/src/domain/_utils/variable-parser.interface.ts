import { VarInterpMode } from '@beeker-tech/engine-common';

export interface VariableParser {
  replacePlaceholdersWithVariable(
    template: string,
    variableName: string,
    variableValue: string,
    variableInterpolationMode?: VarInterpMode | null
  ): string;

  findPlaceholders(
    document: string,
    variableInterpolationMode?: VarInterpMode | null
  ): string[];
}
