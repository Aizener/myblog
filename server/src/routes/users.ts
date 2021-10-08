import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

import userService from '../service/users';


/* GET users listing. */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const params = req.query
  console.log(req.query)

  if (!params.id) {
    res.json({
      code: 400,
      msg: '却少参数id',
      data: {}
    })
    return
  }

  const result = await userService.findUserById(Number(params.id));
  res.json({
    code: 200,
    msg: '请求成功',
    data: result || {}
  })
});

export default router;
