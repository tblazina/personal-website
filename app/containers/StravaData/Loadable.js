/**
 *
 * Asynchronously loads the component for StravaData
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
