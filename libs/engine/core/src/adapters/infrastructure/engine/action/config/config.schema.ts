export const SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    name: { type: 'string' },
    label: { type: 'string' },
    description: { type: 'string' },
    group: { type: 'string' },
    variables: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          label: { type: 'string' },
          description: { type: 'string' },
          value: { type: ['integer', 'string'] },
          default_value: { type: ['integer', 'string'] },
          required: { type: 'boolean' },
        },
        required: ['name'],
        additionalProperties: false,
      },
    },
    rules: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          target: { type: 'string' },
          context: {
            oneOf: [
              { type: 'string', nullable: true },
              {
                type: 'array',
                items: {
                  anyOf: [
                    {
                      type: 'string',
                    },
                    {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        path: { type: 'string' },
                      },
                      required: ['path'],
                    },
                  ],
                },
              },
            ],
          },
          spec: { type: 'string' },
          path: { type: 'string' },
          only: { type: 'boolean' },
        },
        required: ['name', 'target'],
        additionalProperties: false,
      },
    },
    parallelize: {
      type: 'boolean',
    },
    target_root_dir: { type: 'string' },
    variable_interpolation_mode: {
      type: 'string',
      enum: ['double-curly-brace', 'simple-curly-brace', 'dollar-curly-brace'],
    },
  },
  required: ['name', 'rules'],
  additionalProperties: false,
};
