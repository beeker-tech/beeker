export const EVENTS = {
  ACTION: {
    PREVIEW: {
      CREATED: 'action.preview.created',
      RUNNING: 'action.preview.running',
      PASSED: 'action.preview.passed',
      FAILED: 'action.preview.failed',
    },
    EXECUTION: {
      CREATED: 'action.execution.created',
      RUNNING: 'action.execution.running',
      PASSED: 'action.execution.passed',
      FAILED: 'action.execution.failed',
    },
  },
  RULE: {
    APPLICATION: {
      PREVIEW: {
        CREATED: 'rule.application.preview.created',
        RUNNING: 'rule.application.preview.running',
        SKIPPED: 'rule.application.preview.skipped',
        PASSED: `rule.application.preview.passed`,
        FAILED: `rule.application.preview.failed`,
      },
      EXECUTION: {
        CREATED: 'rule.application.execution.created',
        RUNNING: 'rule.application.execution.running',
        SKIPPED: 'rule.application.execution.skipped',
        PASSED: `rule.application.execution.passed`,
        FAILED: `rule.application.execution.failed`,
      },
    },
  },
};
