export type AccessTokenResponse = {
  merchant_id: string;
  channel_id: string;
  api_key: string;
  access_token: string;
  public_access_token: string;
  read_access_token: string;
};

export const generateAccessToken = async (
  apiKey: string,
  apiSecret: string,
  requestToken: string
) => {
  const url = 'https://developer.paytmmoney.com/accounts/v2/gettoken';
  const body = {
    api_key: apiKey,
    api_secret_key: apiSecret,
    request_token: requestToken,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const response = await res.json();
  if (res.ok) {
    return response as AccessTokenResponse;
  } else {
    console.error(response);
    throw new Error(response?.message);
  }
};
