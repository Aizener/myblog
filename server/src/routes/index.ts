import express, { NextFunction, Request, Response } from "express";
import userService from '../service/users';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  return {
    code: 200,
    data: await userService.find()
  }
});

router.get('/', async (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

router.get('/', async (req: Request, res: Response) => {
  res.render('index', { title: 'Express' });
});

export default router;
