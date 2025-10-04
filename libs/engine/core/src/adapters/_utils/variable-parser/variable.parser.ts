import { VariableParser } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import { VarInterpModeRegexp } from './variable-interpolation-mode-regexp';
import { VarInterpMode } from '@beeker-tech/engine-common';

const DEFAULT_VARIABLE_INTERPOLATION_MODE = VarInterpMode.DOUBLE_CURLY_BRACE;

@Injectable()
export class VariableParserImpl implements VariableParser {
  replacePlaceholdersWithVariable(
    document: string,
    variableName: string,
    variableValue: string,
    variableInterpolationMode?: VarInterpMode
  ) {
    const interpolationMode =
      variableInterpolationMode || DEFAULT_VARIABLE_INTERPOLATION_MODE;

    return document.replace(
      new RegExp(VarInterpModeRegexp[interpolationMode]),
      (originalMatch: string, foundVariableName: string) => {
        if (variableName == foundVariableName) return variableValue;

        return originalMatch;
      }
    );
  }

  findPlaceholders = (
    document: string,
    variableInterpolationMode?: VarInterpMode | null
  ): string[] => {
    const interpolationMode =
      variableInterpolationMode || DEFAULT_VARIABLE_INTERPOLATION_MODE;
    const placeholders = Array.from(
      document.matchAll(VarInterpModeRegexp[interpolationMode]),
      (match) => match[1]
    );

    return placeholders;
  };
}
