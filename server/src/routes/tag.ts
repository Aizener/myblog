import express, { NextFunction, Request, Response } from "express";
import Tag from "../model/tag";

import tagService from '../service/tag';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const tags = await tagService.find().catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  })

  res.json({
    code: ResponseCode.SUCCESS,
    data: tags || null
  })
});

router.get('/:id', async (req: Request, res: Response) => {
  const tag = await tagService.findTagById(Number(req.params.id)).catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  })

  res.json({
    code: ResponseCode.SUCCESS,
    data: tag || null
  })
});

router.post('/add', async (req: Request, res: Response) => {
  const _tag = filterParams<Tag>(req.body, Tag);
  await checkParamsIsNull(_tag, ['email', 'password']).catch(err => {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: err
    });
  })

  const tag = await tagService.addTag(_tag).catch(err => {
    res.json({
      code: ResponseCode.SERVICE_ERROR,
      data: null,
      msg: err
    });
  });
  
  res.json({
    code: 200,
    data: tag
  })
});

router.put('/update', async(req: Request, res: Response) => {
  const _tag = filterParams<Tag>(req.body, Tag);
  await checkParamsIsNull(_tag, ['id']).catch(err => {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: err
    });
  })

  const tag = await tagService.updateTag(_tag).catch(err => {
    res.json({
      code: ResponseCode.INVALID_PARAMS,
      data: null,
      msg: err
    });
  });
  
  res.json({
    code: 200,
    data: tag
  })
})

router.delete('/remove/:id', async(req: Request, res: Response) => {
  const id = Number(req.params.id);
  const affected = await tagService.removeTag(id).catch(err => {
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
      msg: '该标签已不存在'
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
