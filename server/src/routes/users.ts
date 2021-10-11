import express, { NextFunction, Request, Response } from "express";
import User from "../model/user";

import userService from '../service/users';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({
    code: ResponseCode.SUCCESS,
    data: await userService.find()
  })
});

router.post('/add', async (req: Request, res: Response) => {
  const user = filterParams<User>(req.body, User);
  try {
    await checkParamsIsNull(user, ['email', 'password'])
    res.json({
      code: 200,
      data: user
    })
  } catch(err: any) {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: JSON.stringify(err)
    })
  }
});

router.get('/update', async (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});


export default router;
