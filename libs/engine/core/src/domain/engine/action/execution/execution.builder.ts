import { ActionExecutionVariable } from '../../../../domain/engine';
import { ActionSpec, ActionVariableSpec } from '../spec';
import { ActionExecution } from './execution.model';
import { Logger } from '../../../../domain/_utils';
import { ActionRuleApplicationBuilder } from './rule-application';

export class ActionExecutionBuilder {
  constructor(
    private readonly logger: Logger,
    private readonly ruleApplicationBuilder: ActionRuleApplicationBuilder
  ) {}

  async build(
    rootDir = '',
    spec: ActionSpec,
    promptedVariables?: ActionExecutionVariable[],
    shouldApply?: boolean,
    id?: string
  ) {
    const { shouldParallelize } = spec;

    const variables: ActionExecutionVariable[] | null =
      this.resolveRuntimeVariables(spec, promptedVariables);
    const rulesApplications = await this.ruleApplicationBuilder.buildMany(
      rootDir,
      spec,
      variables,
      id
    );

    const actionExecution: ActionExecution = new ActionExecution({
      id,
      spec,
      shouldParallelize,
      shouldApply,
      rulesApplications,
    });

    return actionExecution;
  }

  private resolveRuntimeVariables(
    spec: ActionSpec,
    promptedVariables?: ActionExecutionVariable[]
  ) {
    const { variables: variablesSpecs } = spec;
    let resolvedVariables: ActionExecutionVariable[] | null = [];

    const unpromptedVariables: ActionExecutionVariable[] | null =
      variablesSpecs?.flatMap((variableSpec: ActionVariableSpec) => {
        const { name, value } = variableSpec;

        if (value == null) return [];

        const variable: ActionExecutionVariable = {
          name,
          value: (value && `${value}`) || '',
        };

        return variable;
      }) || null;

    if (promptedVariables && unpromptedVariables) {
      resolvedVariables = [...unpromptedVariables, ...promptedVariables];
    } else {
      resolvedVariables = unpromptedVariables;
    }

    this.logger.verbose(
      `ActionBuilder`,
      `resolved variables ${JSON.stringify(resolvedVariables)}`
    );

    return resolvedVariables;
  }
}
