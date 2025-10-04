import { ActionExecutionParam } from './execution-param.dto';

export interface ActionPreviewParam extends ActionExecutionParam {
  shouldApply?: boolean;
}
