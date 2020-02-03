export const createStore = function(reducer) {
  let state = {};
  let listeners = [];
  const getState = function() {
    return state;
  };

  const dispatch = function(action) {
    let newState = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = function(func) {
    listeners.push(func);
    return () => listeners.filter(listener => listener !== func);
  };

  dispatch({})
  return { getState, dispatch, subscribe };
};
