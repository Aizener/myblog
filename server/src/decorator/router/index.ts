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
    article.htmlContent = body.htmlContent;
    if (body.id) {
      article.updateTime = getCurrentDateTime();
    } else {
      article.createTime = getCurrentDateTime();
    }
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
    diary.htmlContent = body.htmlContent;
    diary.createTime = getCurrentDateTime();
    if (body.id) {
      diary.updateTime = getCurrentDateTime();
    } else {
      diary.createTime = getCurrentDateTime();
    }
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
    if (body.id) {
      category.updateTime = getCurrentDateTime();
    } else {
      category.createTime = getCurrentDateTime();
    }
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
    if (body.id) {
      tag.updateTime = getCurrentDateTime();
    } else {
      tag.createTime = getCurrentDateTime();
    }
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
    if (body.id) {
      music.updateTime = getCurrentDateTime();
    } else {
      music.createTime = getCurrentDateTime();
    }
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
    if (body.id) {
      user.updateTime = getCurrentDateTime();
    } else {
      user.createTime = getCurrentDateTime();
    }
    return user;
  }
)