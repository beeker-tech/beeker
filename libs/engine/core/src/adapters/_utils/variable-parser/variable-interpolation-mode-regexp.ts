export const VarInterpModeRegexp: {
  [key: string]: RegExp;
} = {
  DOUBLE_CURLY_BRACE: /{{(.*?)}}/g,
  SIMPLE_CURLY_BRACE: /{(.*?)}/g,
  DOLLAR_CURLY_BRACE: /\$\{(.*?)\}/g,
};
