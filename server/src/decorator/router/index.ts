import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import Article from 'src/entity/article.entity';
import Category from 'src/entity/category.entity';
import Diary from 'src/entity/diary.entity';
import Music from 'src/entity/music.entity';
import Tag from 'src/entity/tag.entity';
import User from 'src/entity/user.entity';
import { getCurrentDateTime } from 'src/utils';
import * as md5 from 'md5-node';

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
    if (body.id) {
      diary.id = body.id;
    }
    diary.desc = body.desc;
    diary.cover = body.cover;
    diary.content = body.content;
    diary.createTime = getCurrentDateTime();
    return diary;
  }
)

export const CategoryParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const body = req.body;
    const category = new Category();
    if (body.id) {
      category.id = body.id;
    }
    category.title = body.title;
    category.parentId = 0;
    category.createTime = getCurrentDateTime();
    return category;
  }
)

export const TagParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const body = req.body;
    const tag = new Tag();
    if (body.id) {
      tag.id = body.id;
    }
    tag.title = body.title;
    tag.createTime = getCurrentDateTime();
    return tag;
  }
)

export const MusicParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const body = req.body;
    const music = new Music();
    if (body.id) {
      music.id = body.id;
    }
    music.title = body.title;
    music.author = body.author || '';
    music.url = body.url;
    music.createTime = getCurrentDateTime();
    return music;
  }
)

export const UserParam = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const body = req.body;
    const user = new User();
    if (body.id) {  
      user.id = body.id;
    }
    user.email = body.email;
    user.password = md5(body.password);
    user.phone = body.phone || '';
    user.avatar = body.avatar || '';
    user.createTime = getCurrentDateTime();
    return user;
  }
)