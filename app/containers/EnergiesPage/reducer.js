/*
 *
 * EnergiesPage reducer
 *
 */

import _ from 'lodash';
import * as constants from './constants';

const initialState = {
  selectedReaction: {},
  matchingReactions: [],
  reactionSystems: [],
  searchSubmitted: false,
  searchParams: {},
  filter: {},
  search: {},
  resultSize: 0,
  withGeometry: true,
};


function energiesPageReducer(state = initialState, action) {
  const update = {};
  switch (action.type) {
    case constants.TOGGLE_GEOMETRY:
      return {
        ...state,
        withGeometry: !state.withGeometry,
      };
    case constants.SAVE_RESULT_SIZE:
      return {
        ...state,
        resultSize: action.payload.resultSize,
      };
    case constants.SAVE_SEARCH:
      return {
        ...state,
        search: action.payload.search,
      };
    case constants.UPDATE_FILTER:
      update[action.payload.field] = action.payload.value;
      return {
        ...state,
        filter: _.extend(state.filter, update),
      };

    case constants.SUBMIT_SEARCH:
      return {
        ...state,
        searchSubmitted: true,
        searchParams: _.extend(state.searchParams, action.payload),
      };
    case constants.DEFAULT_ACTION:
      return state;
    case constants.SELECT_REACTION:
      return {
        ...state,
        selectedReaction: action.payload,
      };
    case constants.RECEIVE_REACTIONS:
      return {
        ...state,
        matchingReactions: action.payload,
      };
    case constants.RECEIVE_SYSTEMS:
      return {
        ...state,
        reactionSystems: action.payload,
      };
    case constants.SAVE_SYSTEM: {
      let reactionSystems = state.reactionSystems;
      reactionSystems = reactionSystems.concat(action.payload);

      const negativeDensity = (system) => {
        if (typeof system.mass !== 'undefined' && typeof system.volume !== 'undefined') {
          return system.mass / system.volume;
        }
        return 0.0;
      };

      reactionSystems.sort(negativeDensity);
      return {
        ...state,
        reactionSystems,
      };
    }
    case constants.CLEAR_SYSTEMS:
      return {
        ...state,
        reactionSystems: [],
      };
    default:
      return state;
  }
}

export default energiesPageReducer;
