/*
 *
 * CatKitDemo
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import ReactGA from 'react-ga';
import Script from 'react-load-script';

import BulkInput from './BulkInput';
import { BulkView } from './BulkView';
import SlabInput from './SlabInput';
import { SlabView } from './SlabView';

import * as actions from './actions';

export class CatKitDemo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Script url="https://code.jquery.com/jquery-3.2.1.min.js" />
        <Script url="https://hub.chemdoodle.com/cwc/8.0.0/ChemDoodleWeb.js" />

        <h1>CatKit Slab Generator</h1>
        <div>Checkout full code on <ReactGA.OutboundLink
          eventLabel="https://github.com/jboes/CatKit"
          to="https://github.com/jboes/CatKit"
        >
                github/jboes/CatKit
              </ReactGA.OutboundLink>
        </div>
        <BulkInput {...this.props} />
        <BulkView {...this.props} />
        <SlabInput {...this.props} />
        <SlabView {...this.props} />
      </div>
    );
  }
}

CatKitDemo.propTypes = {
  /* dispatch: PropTypes.func.isRequired,*/
};

const mapDispatchToProps = (dispatch) => ({
  receiveBulkCif: (cif) => {
    dispatch(actions.receiveBulkCif(cif));
  },
  receiveSlabCifs: (images) => {
    dispatch(actions.receiveSlabCifs(images));
  },
});

const mapStateToProps = (state) => ({
  bulkCif: state.get('catKitDemo').bulkCif,
  images: state.get('catKitDemo').images,
});

export default connect(mapStateToProps, mapDispatchToProps)(CatKitDemo);