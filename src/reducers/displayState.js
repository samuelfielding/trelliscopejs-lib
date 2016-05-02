import { SET_LAYOUT, SET_LABELS, SET_SORT, SET_FILTER } from '../constants.js';

export const layout = (state = { nrow: 1, ncol: 1, arrange: 'row' }, action) => {
  switch (action.type) {
    case SET_LAYOUT:
      return Object.assign({}, state, action.layout);
    default:
  }
  return state;
};

export const labels = (state = [], action) => {
  switch (action.type) {
    case SET_LABELS:
      return Object.assign([], [], action.labels);
    default:
  }
  return state;
};

export const sort = (state = [], action) => {
  switch (action.type) {
    case SET_SORT:
      return Object.assign([], [], action.sort);
    default:
  }
  return state;
};

export const filter = (state = {}, action) => {
  switch (action.type) {
    case SET_FILTER:
      return Object.assign({}, state, action.filter);
    default:
  }
  return state;
};
