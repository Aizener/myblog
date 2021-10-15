import express, { NextFunction, Request, Response } from "express";
import Music from "../model/music";

import musicService from '../service/music';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime, handleErrorNext } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const musics = await musicService.find()

    res.json({
      code: ResponseCode.SUCCESS,
      data: musics || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const music = await musicService.findMusicById(Number(req.params.id))
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: music || null
    })
  } catch(err) {
    handleErrorNext(err, next)
  }
});

router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _music = filterParams<Music>(req.body, Music);
    await checkParamsIsNull(_music, ['title', 'author', 'url'])
  
    const music = await musicService.addMusic(_music).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: music
    })
  } catch(err: any) {
    handleErrorNext(err, next);
  }
});

router.put('/update', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const _music = filterParams<Music>(req.body, Music);
    await checkParamsIsNull(_music, ['id', 'title'])
  
    const music = await musicService.updateMusic(_music).catch(err => {
      throw { msg: err, code: ResponseCode.INVALID_PARAMS }
    });
    
    res.json({
      code: 200,
      data: music
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})

router.delete('/remove/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const affected = await musicService.removeMusic(id).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    })
  
    if (!affected || affected === 0) {
      throw { msg: '该音乐已不存在', code: ResponseCode.DATA_IS_EMPTY }
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
