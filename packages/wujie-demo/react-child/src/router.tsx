import { createHashRouter, Outlet } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import React, { lazy } from 'react'

const CommunicationTest = lazy(() => import('@/views/CommunicationTest'))
const CssIsolation = lazy(() => import('@/views/CssIsolation'))
const NavigateView = lazy(() => import('@/views/NavigateView'))
const MicroAppView = lazy(() => import('@/views/MicroAppView'))
const TabView = lazy(() => import('@/views/TabView'))

const basename = window.__POWERED_BY_WUJIE__ ? '/reactApp' : '/'

const routes: RouteObject[] = [
  {
    path: basename,
    element: <Outlet />,
    children: [
      { index: true, element: <CommunicationTest /> },
      {
        path: 'communication-test',
        element: <CommunicationTest />,
      },
      {
        path: 'css-isolation',
        element: <CssIsolation />,
      },
      {
        path: 'navigate-view',
        element: <NavigateView />,
      },
      {
        path: 'microapp-view',
        element: <MicroAppView />,
      },
      {
        path: 'tab-view',
        element: <TabView />,
      },
    ]
  },
]

// hashrouter是没有basename的，我们得直接在上面path里，根路径配置为我们的basename
const router = createHashRouter(routes)

export default router
