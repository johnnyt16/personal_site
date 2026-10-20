import { findRoute } from './routes';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default function App({ path }) {
  const route = findRoute(path);

  if (!route) return <NotFound />;
  return <Home />;
}
