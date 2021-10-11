export const filterParams = <T>(params: any, Model: any): T  => {
  const model = new Model()
  for(let key in params) {
    if (model.hasOwnProperty(key)) {
      model[key] = params[key]
    }
  }

  return model
}

export const checkParamsIsNull = (obj: any, params: Array<string>): Promise<any> => {
  return new Promise((resolve, reject) => {
    for (let param of params)     {
      if (isEmpty(obj[param])) {
        reject(`Param Error: 参数的${param}不能为空值！`)
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

export const toString = (obj: any) => {
  return Object.prototype.toString.call(obj)
}