export interface IRequestConfig extends RequestInit {
  body?: any;
  token?: string;
  customHeaders?: RequestInit['headers'];
}

export async function apiClient<T = any>(endpoint: string, requestConfig: IRequestConfig = {}): Promise<T> {
  const {body, token, customHeaders, ...customConfig} = requestConfig;
  const config = {
    method: body ? 'POST' : 'GET',
    body: body ? body : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      ...customHeaders,
    },
    ...customConfig,
  };

  return window.fetch(endpoint, config as RequestInit).then(async response => {
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    if (response.redirected) {
      window.location.href = response.url;
      return;
    }
    const data = await response.json();
    // if ('error' in data) {
    //   return Promise.reject(data.error);
    // }
    if (data.code >= 400) {
      return Promise.reject(data)
    }
    return data;
  });
}
