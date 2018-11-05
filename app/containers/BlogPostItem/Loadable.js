/**
 *
 * Asynchronously loads the component for BlogPostItem
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
