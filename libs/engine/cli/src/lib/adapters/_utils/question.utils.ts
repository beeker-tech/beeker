export const getMessageForSelectCommandFromList = () =>
  `Select a command to execute:`;
export const getMessageForFilterConfirm = (filter: string) =>
  `Do you want to filter on a particular ${filter} ?`;

export const getMessageForCreateEntity = (entity: string, paramName: string) =>
  `Enter the ${paramName} of the ${entity} to create:\n (enter no value to cancel)\n`;

export const getMessageForDeleteEntity = (entity: string) =>
  `Enter the ${entity} to delete:`;

export const getMessageForSelectParentEntity = (
  entity: string,
  parentEntity: string
) => `Select the parent ${parentEntity} of your ${entity}.`;

export const getMessageForSelectRelationEntity = (
  entity: string,
  relationEntity: string
) => `Select a ${relationEntity} for your ${entity}.`;

export const getMessageForEnterParamValue = (
  paramName: string,
  isOptional = true,
  isCancelable = true
) => {
  const enterValueMessage = `Enter a value for '${paramName}' parameter:`;
  const optionalMessage = `(optional, enter no value to continue)`;
  const cancelMessage = `(enter no value to cancel)`;

  if (isOptional) {
    return `${enterValueMessage}\n ${optionalMessage}\n`;
  } else if (isCancelable) {
    return `${enterValueMessage}\n ${cancelMessage}\n`;
  }

  return `${enterValueMessage}\n`;
};
