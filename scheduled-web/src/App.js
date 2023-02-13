// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoadingModal from './components/modal/LoadingModal';
import AlertModal from './components/modal/AlertModal';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ScrollToTop />
        <Router />
        <LoadingModal />
        <AlertModal />
      </ThemeProvider>
    </Provider>
  );
}
