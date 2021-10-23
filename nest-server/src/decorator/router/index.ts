import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import Article from 'src/entity/article.entity';
import Category from 'src/entity/category.entity';
import Diary from 'src/entity/diary.entity';
import Tag from 'src/entity/tag.entity';
import User from 'src/entity/user.entity';
import { getCurrentDateTime } from 'src/utils';

export const ArticleParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const body = req.body;
    const article = new Article();
    if (body.id) {
      article.id = body.id;
    }
    article.title = body.title;
    article.desc = body.desc;
    article.cover = body.cover;
    article.content = body.content;
    article.createTime = getCurrentDateTime();
    const tags = body.tags.map(item => {
      const tag = new Tag();
      tag.id = item;
      return tag;
    })
    article.tags = tags;
    const category = new Category();
    category.id = body.category;
    article.category = category;
    const user = new User();
    user.id = 1;
    article.user = user;
    return article;
  },
);

export const DiaryParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const body = req.body;
    const diary = new Diary();
    diary.desc = body.desc;
    diary.cover = body.cover;
    diary.content = body.contentn;
    diary.createTime = getCurrentDateTime();
    return diary;
  }
)