/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import periodicTableSelector from 'containers/PeriodicTableSelector/reducer';
import elementContainerReducer from 'containers/ElementContainer/reducer';
import generalSearchReducer from 'containers/GeneralSearchContainer/reducer';
import energiesPageReducer from 'containers/EnergiesPage/reducer';
import plotlyDemoReducer from 'containers/PlotlyDemo/reducer';
import activityMapsPageReducer from 'containers/ActivityMapsPage/reducer';
import catKitDemoReducer from 'containers/CatKitDemo/reducer';
import profileReducer from 'containers/Profile/reducer';
import bulkGeneratorReducer from 'containers/BulkGenerator/reducer';
import appSnackBarReducer from 'containers/AppSnackBar/reducer';
import prototypeSearchReducer from 'containers/PrototypeSearch/reducer';
import geometryCanvasReducer from 'components/GeometryCanvasWithOptions/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    periodicTableSelector,
    generalSearchReducer,
    elementContainerReducer,
    energiesPageReducer,
    plotlyDemoReducer,
    activityMapsPageReducer,
    catKitDemoReducer,
    profileReducer,
    bulkGeneratorReducer,
    appSnackBarReducer,
    prototypeSearchReducer,
    geometryCanvasReducer,
    ...asyncReducers,
  });
}
