import { findRoute } from './routes';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';

export default function App({ path }) {
  const route = findRoute(path);

  if (!route) return <NotFound />;
  if (route.page === 'case-study') return <CaseStudy slug={route.slug} />;
  return <Home />;
}
