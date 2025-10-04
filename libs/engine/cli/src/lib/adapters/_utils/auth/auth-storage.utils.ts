import keytar from 'keytar';

const CLI_NAME = `${process.env['CLI_NAME']}`;
const DEFAULT_ACCOUNT_NAME = `default`;

export const getAccessToken = async () => {
  return keytar.findPassword(CLI_NAME);
};

export const setAccessToken = async (accessToken: string) => {
  return keytar.setPassword(CLI_NAME, DEFAULT_ACCOUNT_NAME, accessToken);
};
