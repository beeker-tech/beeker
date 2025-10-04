import { ActionRuleContextFileSpec } from './action-rule-context-file-spec.model';
import { ActionRuleSpecParam } from './action-rule-spec-param.interface';

export class ActionRuleSpec {
  // technical
  configPath: string | null;

  // content
  name: string;
  targetFilePath: string;
  contextFiles: ActionRuleContextFileSpec[] | null;
  spec: string | null;

  // state
  sequence: number;
  isSkippedInConfig: boolean;

  constructor(param: ActionRuleSpecParam) {
    const {
      // technical
      configPath = null,

      // content
      name,
      targetFilePath,
      contextFiles = null,
      spec = null,

      // state
      sequence,
      isSkippedInConfig = false,
    } = param;

    // technical
    this.configPath = configPath;

    // content
    this.name = name;
    this.targetFilePath = targetFilePath;
    this.contextFiles = contextFiles;
    this.spec = spec;

    // state
    this.sequence = sequence;
    this.isSkippedInConfig = isSkippedInConfig;
  }
}
