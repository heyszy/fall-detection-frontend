export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
    // hideInMenu: true,
  },
  {
    name: 'camera-detect',
    icon: 'VideoCameraOutlined',
    path: '/camera-detect',
    component: './CameraDetect',
  },
  {
    name: 'image-detect',
    icon: 'FileImageOutlined',
    path: '/img-detect',
    component: './ImgDetect',
  },
  {
    name: 'video-detect',
    icon: 'PlaySquareOutlined',
    path: '/video-detect',
    component: './VideoDetect',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
