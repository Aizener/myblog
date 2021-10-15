import Mock from 'mockjs'

const tokens: {
  [propName: string]: any
} = {
  admin: 'abcdefghijklmnopqrstuvwxyz0',
  visitor: 'abcdefghijklmnopqrstuvwxyz1'
}

const menus: {
  [propName: string]: any
} = {
  admin: [
    {
      path: '/permission',
      component: 'Layout.vue',
      meta: {
        title: 'slideBarPermission',
        icon: 'icon-permission'
      },
      children: [
        {
          path: '/permission/index',
          component: 'permission/index.vue'
        }
      ]
    }
  ],
  visitor: []
}

Mock.mock(/\/login/, 'post', (options: any) => {
  const data = JSON.parse(options.body)
  let res: { [propName: string]: any } = {}
  if (data.username === 'admin' && data.password === 'admin') {
    res.code = 200
    res.data = {
      token: tokens.admin
    }
  } else if (data.username === 'visitor' && data.password === 'visitor') {
    res.code = 200
    res.data = {
      token: tokens.visitor
    }
  } else {
    res.code = 500,
    res.msg = '用户名或密码错误'
  }
  return res
})

Mock.mock(/\/getUserInfo/, 'post', (options: any) => {
  const data = JSON.parse(options.body)
  const userInfo: any = {}
  for (let k in tokens) {
    if (tokens[k] === data.token) {
      userInfo.role = k
      userInfo.menus = menus[k]
    }
  }
  return {
    code: 200,
    data: {
      ...userInfo
    }
  }
})
