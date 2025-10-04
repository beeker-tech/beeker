import {
  ClientMetadata,
  DeviceAuthorizationParameters,
  Issuer,
} from 'openid-client';
import open from 'open';
import jwtDecode from 'jwt-decode';
import { clearLastLine, displayError, displayInfo } from '../print.utils';
import { getAccessToken, setAccessToken } from './auth-storage.utils';
import { AccessToken } from './access-token.interface';
import { DEFAULT_CONFIGURATION } from '../../_config';
import { Logger } from '@beeker-tech/engine-core/domain/_utils';

declare global {
  // eslint-disable-next-line no-var
  var access_token: string | null;
}

const ISSUER_URL =
  process.env['AUTH0_ISSUER_BASE_URL'] ||
  DEFAULT_CONFIGURATION.AUTH0_ISSUER_BASE_URL;
const CLIENT_ID =
  process.env['AUTH0_CLIENT_ID'] || DEFAULT_CONFIGURATION.AUTH0_CLIENT_ID;
const AUDIENCE =
  process.env['AUTH0_AUDIENCE'] || DEFAULT_CONFIGURATION.AUTH0_AUDIENCE;
const SCOPE = process.env['AUTH0_SCOPE'] || DEFAULT_CONFIGURATION.AUTH0_SCOPE;
const GRANT_TYPE = 'urn:ietf:params:oauth:grant-type:device_code';

export const getAuthorizationHeader = async (): Promise<string> => {
  const accessToken = await getAccessToken();

  return `Bearer ${accessToken}`;
};

export const checkDeviceAuthorization = async (logger: Logger) => {
  logger.verbose('CheckDeviceAuthorization', `Getting token...`);

  let accessToken = await getAccessToken();

  const isValid = isAccessTokenValid(accessToken);

  logger.verbose('CheckDeviceAuthorization', `Token valid: ${isValid}`);

  if (!isValid) {
    logger.verbose('CheckDeviceAuthorization', `Fetching token...`);

    accessToken = await fetchDeviceAuthorization(logger);

    logger.verbose('CheckDeviceAuthorization', `Fetched token...`);

    if (!accessToken) return false;

    await setAccessToken(accessToken);
  }

  logger.verbose('CheckDeviceAuthorization', `Device is authorized.`);

  return true;
};

export const fetchDeviceAuthorization = async (
  logger: Logger
): Promise<string | null> => {
  const clientMetadata: ClientMetadata = {
    client_id: CLIENT_ID,
    grant_types: [GRANT_TYPE],
    response_types: [],
    redirect_uris: [],
    token_endpoint_auth_method: 'none',
    application_type: 'native',
  };
  const deviceAuthorizationParameters: DeviceAuthorizationParameters = {
    audience: AUDIENCE,
    scope: SCOPE,
  };

  try {
    const issuer = await Issuer.discover(ISSUER_URL);

    const client = new issuer.Client(clientMetadata);

    logger.verbose(
      'FetchDeviceAuthorization',
      `Checking device authorization...`
    );

    const handle = await client.deviceAuthorization(
      deviceAuthorizationParameters
    );

    displayInfo(
      `Your code is ${handle.user_code}. Please confirm in your browser.`
    );

    await open(handle.verification_uri_complete, { wait: false });

    const tokenSet = await handle.poll();

    clearLastLine();

    if (!tokenSet.access_token) return null;

    return tokenSet.access_token;
  } catch (error: unknown) {
    displayError(JSON.stringify(error));
  }

  return null;
};

const isAccessTokenValid = (accessToken: string | null | undefined) => {
  if (!accessToken) return false;

  if (hasAccessTokenExpired(accessToken)) return false;

  return true;
};

const hasAccessTokenExpired = (accessToken: string) => {
  const decodedToken: AccessToken = jwtDecode(accessToken);
  const currentDate = new Date();
  const currentTimestamp = Math.floor(currentDate.getTime() / 1000);

  return currentTimestamp > decodedToken.exp;
};
