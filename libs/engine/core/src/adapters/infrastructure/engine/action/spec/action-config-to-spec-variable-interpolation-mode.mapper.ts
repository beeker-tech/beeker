import {
  ActionConfigVarInterpMode,
  VarInterpMode,
} from '@beeker-tech/engine-common';

export const ActionConfigToSpecVarInterpModeMapper = {
  [ActionConfigVarInterpMode['double-curly-brace']]:
    VarInterpMode.DOUBLE_CURLY_BRACE,
  [ActionConfigVarInterpMode['simple-curly-brace']]:
    VarInterpMode.SIMPLE_CURLY_BRACE,
  [ActionConfigVarInterpMode['dollar-curly-brace']]:
    VarInterpMode.DOLLAR_CURLY_BRACE,
};
