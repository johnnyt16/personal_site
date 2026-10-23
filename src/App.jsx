import { findRoute } from './routes';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';
import PlayHost from './play/PlayHost';

function Page({ route }) {
  if (!route) return <NotFound />;
  if (route.page === 'case-study') return <CaseStudy slug={route.slug} />;
  return <Home />;
}

export default function App({ path }) {
  return (
    <>
      <Page route={findRoute(path)} />
      <PlayHost />
    </>
  );
}
