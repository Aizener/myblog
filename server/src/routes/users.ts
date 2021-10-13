import express, { NextFunction, Request, Response } from "express";
import User from "../model/user";

import userService from '../service/users';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const users = await userService.find().catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  })

  res.json({
    code: ResponseCode.SUCCESS,
    data: users || null
  })
});

router.get('/:id', async (req: Request, res: Response) => {
  const user = await userService.findUserById(Number(req.params.id)).catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  })

  res.json({
    code: ResponseCode.SUCCESS,
    data: user || null
  })
});

router.post('/add', async (req: Request, res: Response) => {
  const _user = filterParams<User>(req.body, User);
  await checkParamsIsNull(_user, ['email', 'password']).catch(err => {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: err
    });
  })

  const user = await userService.addUser(_user).catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  });
  
  res.json({
    code: 200,
    data: user
  })
});

router.put('/update', async(req: Request, res: Response) => {
  const _user = filterParams<User>(req.body, User);
  await checkParamsIsNull(_user, ['id']).catch(err => {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: err
    });
  })

  const user = await userService.updateUser(_user).catch(err => {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: err
    });
  });
  
  res.json({
    code: 200,
    data: user
  })
})

router.delete('/remove/:id', async(req: Request, res: Response) => {
  const id = Number(req.params.id);
  const affected = await userService.removeUser(id).catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  })

  if (!affected || affected === 0) {
    res.json({
      code: ResponseCode.DATA_IS_EMPTY,
      data: id,
      msg: '该用户已不存在'
    })
    return
  }

  res.json({
    code: ResponseCode.SUCCESS,
    data: req.params.id
  })
})

router.get('/update', async (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});


export default router;
