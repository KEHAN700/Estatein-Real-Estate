import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home/Home';

const About = lazy(() => import('@/pages/About/About'));
const Properties = lazy(() => import('@/pages/Properties/Properties'));
const PropertyDetails = lazy(() => import('@/pages/PropertyDetails/PropertyDetails'));
const Services = lazy(() => import('@/pages/Services/Services'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const Legal = lazy(() => import('@/pages/Legal/Legal'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'properties', element: <Properties /> },
      { path: 'properties/:slug', element: <PropertyDetails /> },
      { path: 'services', element: <Services /> },
      { path: 'contact', element: <Contact /> },
      { path: 'terms', element: <Legal /> },
      { path: 'privacy', element: <Legal /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
