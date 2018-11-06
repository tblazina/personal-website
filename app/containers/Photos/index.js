/**
 *
 * Photos
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import _ from 'lodash';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPhotos from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';

/* eslint-disable react/prefer-stateless-function */
export class Photos extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(actions.loadPhotos());
  }

  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    const { photoItems } = this.props.photos;

    const photosPlucked = [];
    if (!_.isEmpty(photoItems)) {
      _.forEach(photoItems, d => {
        const photo = {
          caption: d.fields.caption,
          height: d.fields.height,
          tags: d.fields.tags,
          width: d.fields.width,
          src: d.fields.photos[0].fields.file.url,
        };
        photosPlucked.push(photo);
      });
    }

    return (
      <div>
        <Helmet>
          <title>Photos</title>
          <meta name="description" content="Photos I've taken" />
        </Helmet>
        <div>
          <Gallery photos={photosPlucked} onClick={this.openLightbox} />
          <Lightbox
            images={photosPlucked}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          />
        </div>
      </div>
    );
  }
}

Photos.propTypes = {
  dispatch: PropTypes.func.isRequired,
  photoItems: PropTypes.array,
  photos: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  photos: makeSelectPhotos(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'photos', reducer });
const withSaga = injectSaga({ key: 'photos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Photos);
