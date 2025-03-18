import { Route, Routes } from 'react-router-dom';
import { Layout } from '@app/components';
import { Home, NotFound } from '@app/pages';
import { ROUTES } from '@app/types';
import { useSiteSettingsContext } from '@app/context';

/**
 * Defines the routes for the application
 * @returns {JSX.Element}
 */
const App = (): JSX.Element => {
  const { siteTitle } = useSiteSettingsContext();
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout pageTitle={siteTitle} />}>
        <Route index element={<Home />} />
      </Route>
      <Route path={ROUTES.ANY} element={<NotFound />} />
    </Routes>
  );
};

export default App;
