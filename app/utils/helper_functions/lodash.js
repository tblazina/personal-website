import _ from 'lodash';

const reduceCollection = (collection, fields) =>
  _.map(collection, _.partial(_.pick, _, ...fields));

export default reduceCollection;
