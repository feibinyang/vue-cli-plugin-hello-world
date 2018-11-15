/**
 * @file 全局配置
 * @author author(author@baidu.com)
 */

import Index from '@/client/Index';

export default {
  routes: [
    {
        path: '/',
        component: Index
    },
  ],
  nav: {
    items: [
      {
          text: '首页',
          url: '/',
          include: /^\//
      },
      {
          text: '导航1',
          url: '/nav1',
          include: /^\/nav1\//
      },
    ]
  },
  api: {
    constants: 'get|/data/system/constants',
    session: 'get|/data/system/user'
  },
  user: {
    client: {
      idKey: 'aderId',
      authMergeStrategy: 'CEILING'
    }
  }
}
