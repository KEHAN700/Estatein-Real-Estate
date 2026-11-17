const BASE_URL = import.meta.env.VITE_API_URL ?? '';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public fields: Record<string, string> = {},
  ) {
    super(message);
  }
}

type Params = Record<string, string | number | boolean | undefined>;

function buildUrl(path: string, params?: Params) {
  const url = new URL(`${BASE_URL}/api${path}`, window.location.origin);
  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== '') url.searchParams.set(key, String(value));
  });
  return url;
}

async function request<T>(path: string, init?: RequestInit & { params?: Params }): Promise<T> {
  const { params, ...options } = init ?? {};
  const res = await fetch(buildUrl(path, params), {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(res.status, data.message ?? 'Request failed', data.fields);
  }
  return data as T;
}

export const http = {
  get: <T>(path: string, params?: Params) => request<T>(path, { params }),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
};

// Images are served by the API, so in production they may live on another host
export const assetUrl = (path: string) => `${BASE_URL}${path}`;
