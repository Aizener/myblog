import { NextFunction, Request, Response } from 'express';
import Article from '../model/article';
import Tag from '../model/tag';
import ResponseCode from './code';

// 根据实体类来过滤参数
export const filterParams = <T>(params: any, Model: any): T  => {
  const model = new Model()

  for(let key in params) {
    if (model.hasOwnProperty(key) && ['number', 'string'].includes(typeof params[key])) {
      model[key] = params[key];
    }
  }

  if (model instanceof Article) {
    model.tags = params.tags.map((id: number) => {
      const tag = new Tag();
      tag.id = id;
      return tag;
    })
  }

  return model;
}

// 检查参数是否为空
export const checkParamsIsNull = (obj: any, params: Array<string>): Promise<any> => {
  return new Promise((resolve, reject) => {
    for (let param of params)     {
      if (isEmpty(obj[param])) {
        reject({
          msg: `Param Error: 参数${param}为${obj[param] || null}，不是合法值！`,
          code: ResponseCode.INVALID_PARAMS
        })
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
  let msg = '';
  if (err.msg) {
    msg = toString(err.msg).includes('Error') ? err.msg ? err.msg.message : err.message : err.msg
  } else {
    msg = err.message;
  }
  next({
    code: err.code || 500,
    data: null,
    msg: msg
  })
}

// 错误处理函数
export const responseErrorCallback = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.json({
    url: `${req.protocol}//${req.hostname}:${req.socket.localPort}${req.path}`,
    ip: req.ip,
    code: err.code,
    data: err.data,
    msg: err.msg
  })
}

// 获取对象类型的字符串形式
export const toString = (obj: any): string => {
  return Object.prototype.toString.call(obj)
}