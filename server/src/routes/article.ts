import express, { NextFunction, Request, Response } from "express";
import Article from "../model/article";

import articleService from '../service/article';
import ResponseCode from "../utils/code";
import { checkParamsIsNull, filterParams, getCurrentDateTime, handleErrorNext } from "../utils/index";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const articles = await articleService.find()

    res.json({
      code: ResponseCode.SUCCESS,
      data: articles || null
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await articleService.findArticleById(Number(req.params.id))
  
    res.json({
      code: ResponseCode.SUCCESS,
      data: article || null
    })
  } catch(err) {
    handleErrorNext(err, next)
  }
});

router.post('/add', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _article = filterParams<Article>(req.body, Article);
    await checkParamsIsNull(_article, ['title', 'desc', 'cover', 'text', 'view', 'userId', 'categoryId', 'tagId'])
  
    const article = await articleService.addArticle(_article).catch(err => {
      throw { msg: err, code: ResponseCode.SERVICE_ERROR }
    });
    
    res.json({
      code: 200,
      data: article
    })
  } catch(err: any) {
    handleErrorNext(err, next);
  }
});

router.put('/update', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const _article = filterParams<Article>(req.body, Article);
    await checkParamsIsNull(_article, ['id'])
  
    const article = await articleService.updateArticle(_article).catch(err => {
      throw { msg: err, code: ResponseCode.INVALID_PARAMS }
    });
    
    res.json({
      code: 200,
      data: article
    })
  } catch(err) {
    handleErrorNext(err, next);
  }
})

router.delete('/remove/:id', async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);

    const affected = await articleService.removeArticle(id).catch(err => {
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