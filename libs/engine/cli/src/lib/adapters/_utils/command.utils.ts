export const getCommandName = (entity: string) => entity;
export const getCommandDescription = (entities: string) =>
  `Manage ${entities} in application`;

// GET
export const getByIdNotFoundText = (entity: string, id: string) =>
  `No ${entity} with id '${id}' found.`;
export const getDescriptionForGetManyCommand = (entities: string) =>
  `List all ${entities} in application`;
export const getLoadingTextForGetManyCommand = (entities: string) =>
  `Listing ${entities}...`;
export const getManyNotFoundText = (entity: string) => `No ${entity} found.`;

// CREATE
export const getDescriptionForCreateCommand = (entity: string) =>
  `Create a new ${entity} in application`;
export const getLoadingTextForCreateCommand = (entity: string, id?: string) =>
  `Creating ${entity} '${id}'...`;
export const getSuccessTextForCreateCommand = (entity: string, id?: string) =>
  `Created ${entity} '${id}' with success.`;
export const getErrorTextForCreateCommand = (entity: string, id?: string) =>
  `Creation of ${entity} '${id}' failed.`;

// EXECUTE
export const getDescriptionForExecuteCommand = (entity: string) =>
  `Execute a new ${entity}`;
export const getLoadingTextForExecuteCommand = (entity: string, id?: string) =>
  `Executing ${entity} '${id}'...`;
export const getSuccessTextForExecuteCommand = (entity: string, id?: string) =>
  `Executed ${entity} '${id}' with success.`;
export const getErrorTextForExecuteCommand = (entity: string, id?: string) =>
  `Execution of ${entity} '${id}' failed.`;

// PREVIEW
export const getDescriptionForPreviewCommand = (entity: string) =>
  `Preview a new ${entity}\n`;
export const getLoadingTextForPreviewCommand = (entity: string, id?: string) =>
  `Previewing ${entity} '${id}'...`;
export const getSuccessTextForPreviewCommand = (entity: string, id?: string) =>
  `Previewed ${entity} '${id}' with success.`;
export const getErrorTextForPreviewCommand = (entity: string, id?: string) =>
  `Preview of ${entity} '${id}' failed.`;

// DELETE
export const getDescriptionForDeleteCommand = (entity: string) =>
  `Delete a ${entity} in application`;
export const getLoadingTextForDeleteCommand = (entity: string, id?: string) =>
  `Deleting ${entity} '${id}'...`;
export const getSuccessTextForDeleteCommand = (entity: string, id?: string) =>
  `Deleted ${entity} '${id}' with success.`;
export const getErrorTextForDeleteCommand = (entity: string, id?: string) =>
  `Deleting ${entity} '${id}' failed.`;
export const pleaseCreateBeforeDeleteText = (entity: string) =>
  `Please create a ${entity} before trying to delete.`;
