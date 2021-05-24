export default {
  name: 'index',
  state: {
    welcome: 'Hello, world.',
    num: 0,
  },
  reducers: {
    updata(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: (dispatch) => ({
    fetch(payload, state) {
      console.log(payload, state);
      dispatch({ type: 'index/updata', payload: { num: 1 } });
      return '1';
    },
  }),
};
