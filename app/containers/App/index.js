/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import NavBar from 'components/NavBar';
// import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Photos from 'containers/Photos/Loadable';
import AboutMe from 'components/AboutMe';
import Contact from 'components/Contact/Loadable';
import BlogPostSummary from 'containers/BlogPostSummary/Loadable';
import BlogPostItem from 'containers/BlogPostItem/Loadable';
// import StravaData from 'containers/StravaData/Loadable';

const AppStyle = styled.div`
  margin-left: 0vw;
`;

export default function App() {
  return (
    <div>
      <Helmet>
        <title> {"Tim Blazina's personal blog"} </title>
      </Helmet>
      <NavBar>
        <AppStyle>
          <Switch>
            {/* <Route exact path="/" component={HomePage} /> */}
            <Route exact path="/" component={BlogPostSummary} />
            <Route exact path="/posts/:id" component={BlogPostItem} />
            <Route exact path="/photos" component={Photos} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about-me" component={AboutMe} />
            {/* <Route exact path="/my-strava-data" component={StravaData} /> */}
            <Route path="" component={NotFoundPage} />
          </Switch>
        </AppStyle>
      </NavBar>
    </div>
  );
}
