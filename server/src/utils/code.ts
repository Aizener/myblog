enum  ResponseCode {
  // 成功
  SUCCESS = 200,
  // 数据已经不存在
  DATA_IS_EMPTY = 204,
  // 不合法的请求参数
  INVALID_PARAMS = 400,
  // 服务端内部错误
  SERVICE_ERROR = 500
}

export default ResponseCode