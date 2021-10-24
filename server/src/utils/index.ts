// 获取当前的时间，例：2021-10-14 22:32
export const getCurrentDateTime = (): string =>  {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// 获取传入时间字符串的时间戳
export const getCurrentTimestamp = (datetime: string): number => {
  const date = new Date(datetime);
  return date.getTime();
}
