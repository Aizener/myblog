import express, { NextFunction, Request, Response } from "express";
import Tag from "../model/tag";

import tagService from '../service/tag';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime, handleErrorNext } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tags = await tagService.find()

    res.json({
      code: ResponseCode.SUCCESS,
      data: tags || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tag = await tagService.findTagById(Number(req.params.id))
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: tag || null
    })
  } catch(err) {
    handleErrorNext(err, next)
  }
});

router.post('/save', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _tag = filterParams<Tag>(req.body, Tag);
    await checkParamsIsNull(_tag, ['title'])
  
    const tag = await tagService.addTag(_tag).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: tag
    })
  } catch(err: any) {
    handleErrorNext(err, next);
  }
});

router.put('/save', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _tag = filterParams<Tag>(req.body, Tag);
    await checkParamsIsNull(_tag, ['title'])
  
    const tag = await tagService.addTag(_tag).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: tag
    })
  } catch(err: any) {
    handleErrorNext(err, next);
  }
});


router.put('/update', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const _tag = filterParams<Tag>(req.body, Tag);
    await checkParamsIsNull(_tag, ['id'])
  
    const tag = await tagService.updateTag(_tag).catch(err => {
      throw { msg: err, code: ResponseCode.INVALID_PARAMS }
    });
    
    res.json({
      code: 200,
      data: tag
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})

router.delete('/remove/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const affected = await tagService.removeTag(id).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    })
  
    if (!affected || affected === 0) {
      throw { msg: '该标签已不存在', code: ResponseCode.DATA_IS_EMPTY }
    }
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: req.params.id
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})
export default router;
