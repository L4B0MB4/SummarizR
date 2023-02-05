export const getRequest = async <T>(url: string) => {
  const res = await fetch(url);
  const json = (await res.json()) as T;
  return json;
};
export const getRequestText = async <T>(url: string) => {
  const res = await fetch(url);
  const json = (await res.text()) as T;
  return json;
};
