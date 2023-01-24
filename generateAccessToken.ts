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
    return response.access_token;
  } else {
    throw new Error(response);
  }
};
