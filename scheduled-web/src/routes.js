import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CoursePage from './pages/CoursePage';
import RoomPage from './pages/RoomPage';
import TeacherPage from './pages/TeacherPage';
import ClassCoursePage from './pages/ClassCoursePage';
import TeachingPage from './pages/TeachingPage';
import ScheduledPage from './pages/ScheduledPage';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'courses', element: <CoursePage /> },
        { path: 'rooms', element: <RoomPage /> },
        { path: 'teachers', element: <TeacherPage />},
        { path: 'class_courses', element: <ClassCoursePage />},
        { path: 'teachings', element: <TeachingPage />},
        { path: 'scheduled', element: <ScheduledPage />} 
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
      ],
    },
  ]);

  return routes;
}
