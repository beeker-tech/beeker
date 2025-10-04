import { VarInterpMode } from './variable-interpolation-mode.dto';

export interface ActionSpec {
  // technical
  configPath: string;

  // content
  name: string;
  label: string | null;
  description: string | null;
  group: string | null;

  // execution options
  shouldParallelize: boolean;
  targetRootDir?: string | null;
  variableInterpolationMode?: VarInterpMode | null;
}
