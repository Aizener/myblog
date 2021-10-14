import { NextFunction, Request, Response } from 'express';

// 根据实体类来过滤参数
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

// 检查参数是否为空
export const checkParamsIsNull = (obj: any, params: Array<string>): Promise<any> => {
  return new Promise((resolve, reject) => {
    for (let param of params)     {
      if (isEmpty(obj[param])) {
        reject(`Param Error: 参数${param}为${obj[param] || null}，不是合法值！`)
      }
    }
    resolve(null)
  })
}

// 判断值是否为空
export const isEmpty = (param: any): boolean => {
  if (typeof param === 'object') {
    return ['{}', '[]'].includes(JSON.stringify(param))
  } else if(typeof param === 'string') {
    return param.length === 0
  } else {
    return !param
  }
}

// 处理next的异常抛出
export const handleErrorNext = (err: any, next: NextFunction) => {
  next({
    code: err.code,
    data: null,
    msg: err.msg
  })
}

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

// 错误处理函数
export const responseErrorCallback = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    path: req.path,
    code: err.code,
    data: err.data,
    msg: toString(err.msg).includes('Error') ? err.msg.message : err.msg
  })
}

// 获取对象类型的字符串形式
export const toString = (obj: any): string => {
  return Object.prototype.toString.call(obj)
}