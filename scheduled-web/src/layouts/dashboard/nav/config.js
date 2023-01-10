// component
import Iconify from 'src/components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'course',
    path: '/dashboard/courses',
    icon: icon('ic_user'),
  },
  {
    title: 'room',
    path: '/dashboard/rooms',
    icon: <Iconify icon="material-symbols:meeting-room" />,
  },
  {
    title: 'teacher',
    path: '/dashboard/teachers',
    icon: <Iconify icon="ph:chalkboard-teacher-light"/>
  },
  {
    title: 'class course',
    path: '/dashboard/class_courses',
    icon: <Iconify icon="simple-icons:coursera"/>
  },
  {
    title: 'teaching',
    path: '/dashboard/teachings',
    icon: <Iconify icon="mdi:teaching"/>
  },
  {
    title: 'scheduled',
    path: '/dashboard/scheduled',
    icon: <Iconify icon="gridicons:scheduled"/>
  }
];

export default navConfig;
