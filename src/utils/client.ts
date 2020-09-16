async function client(endpoint: string, { headers = {}, ...restOptions }: RequestInit = {}) {
  const response = await fetch(endpoint, {
    headers: { 'Content-Type': 'application/json', ...headers },
    ...restOptions,
  });
  const body = await response.json();

  if (response.ok) {
    return body;
  }

  throw body;
}

export { client };
