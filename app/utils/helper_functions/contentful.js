import * as contentful from 'contentful';

const client = contentful.createClient({
  space: 'ful6an5guvso',
  accessToken: process.env.CONTENTFUL_TOKEN,
});

export default client;
