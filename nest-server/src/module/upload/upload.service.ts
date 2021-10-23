import { Injectable } from '@nestjs/common';
import * as qiniu from 'qiniu';

const accessKey = 'DT_NPprnE9s-3zLbm_ZOpTJH2Lu1sB_FWHFGWy-M';
const secretKey = 'V1ffBZEM0Yy2aNxjOiCRH5yFjGinkM7cnDJgN5NO';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
//自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
const options = {
  scope: 'yx-myblog'
};

@Injectable()
export class UploadService {
  async getQiniuToken() {
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
}
