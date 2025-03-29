export const utcToLocal = (utcString: string | null) => {
  if (!utcString) return "";
  const date = new Date(utcString);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString()
    .slice(0, 16);
};

export const localToUTC = (localString: string | null) => {
  if (!localString) return null;
  return new Date(localString).toISOString();
};