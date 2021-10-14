import express, { NextFunction, Request, Response } from "express";
import User from "../model/user";

import userService from '../service/users';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime, handleErrorNext } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.find().catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    })

    res.json({
      code: ResponseCode.SUCCESS,
      data: users || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.findUserById(Number(req.params.id)).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    })
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: user || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});

router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _user = filterParams<User>(req.body, User);
    await checkParamsIsNull(_user, ['email', 'password']).catch(err => {
      throw { msg: err, code: ResponseCode.INVALID_PARAMS }
    })
  
    const user = await userService.addUser(_user).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: user
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
  
});

router.put('/update', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const _user = filterParams<User>(req.body, User);
    await checkParamsIsNull(_user, ['id']).catch(err => {
      throw { msg: err, code: ResponseCode.INVALID_PARAMS }
    })
  
    const user = await userService.updateUser(_user).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: user
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})

router.delete('/remove/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const affected = await userService.removeUser(id).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    })
  
    if (!affected || affected === 0) {
      throw { msg: '该用户已不存在', code: ResponseCode.DATA_IS_EMPTY }
    }
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: id
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})

router.get('/update', async (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});


export default router;
