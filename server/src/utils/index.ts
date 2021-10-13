export const filterParams = <T>(params: any, Model: any): T  => {
  const model = new Model()

  // const getParam = (type: any, param: any) => {
  //   const C = type.__proto__.constructor;
  //   return C(param);
  // }

  for(let key in params) {
    if (model.hasOwnProperty(key)) {
      console.log(model[key], params[key])
      // model[key] = getParam(model[key], params[key]);
      model[key] = params[key];
    }
  }

  return model
}

export const checkParamsIsNull = (obj: any, params: Array<string>): Promise<any> => {
  return new Promise((resolve, reject) => {
    for (let param of params)     {
      if (isEmpty(obj[param])) {
        reject(`Param Error: 参数${param}为${obj[param]}，不是合法值！`)
      }
    }
    resolve(null)
  })
}

export const isEmpty = (param: any): boolean => {
  if (typeof param === 'object') {
    return ['{}', '[]'].includes(JSON.stringify(param))
  } else if(typeof param === 'string') {
    return param.length === 0
  } else {
    return !param
  }
}

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

export const toString = (obj: any): string => {
  return Object.prototype.toString.call(obj)
}