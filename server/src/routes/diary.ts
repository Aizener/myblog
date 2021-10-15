import express, { NextFunction, Request, Response } from "express";
import Diary from "../model/diary";

import diaryService from '../service/diary';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime, handleErrorNext } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diarys = await diaryService.find()

    res.json({
      code: ResponseCode.SUCCESS,
      data: diarys || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const diary = await diaryService.findDiaryById(Number(req.params.id))
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: diary || null
    })
  } catch(err) {
    handleErrorNext(err, next)
  }
});

router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _diary = filterParams<Diary>(req.body, Diary);
    await checkParamsIsNull(_diary, ['desc', 'cover', 'content'])
  
    const diary = await diaryService.addDiary(_diary).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: diary
    })
  } catch(err: any) {
    handleErrorNext(err, next);
  }
});

router.put('/update', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const _diary = filterParams<Diary>(req.body, Diary);
    await checkParamsIsNull(_diary, ['id'])
  
    const diary = await diaryService.updateDiary(_diary).catch(err => {
      throw { msg: err, code: ResponseCode.INVALID_PARAMS }
    });
    
    res.json({
      code: 200,
      data: diary
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})

router.delete('/remove/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const affected = await diaryService.removeDiary(id).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    })
  
    if (!affected || affected === 0) {
      throw { msg: '该日志已不存在', code: ResponseCode.DATA_IS_EMPTY }
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
