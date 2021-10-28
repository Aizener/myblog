export const throttle = (func: Function, delay = 50) => {
  let timer: any;
  return function(args: any) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      func(args);
      timer = null;
      clearTimeout(timer);
    }, delay)
  }
}