/**
 *
 * Asynchronously loads the component for BlogPostSummary
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
