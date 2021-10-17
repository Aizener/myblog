import express, { NextFunction, Request, Response } from "express";
import uploadService from "../service/upload";

import ResponseCode from "../utils/code";
import { handleErrorNext } from "../utils/index";

const router = express.Router();

router.get('/qiniu/token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await uploadService.getToken().catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });

    res.json({
      code: ResponseCode.SUCCESS,
      data: token || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});
export default router;
