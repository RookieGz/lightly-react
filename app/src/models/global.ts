export default {
  name: 'global',
  state: {
    global: '12345',
  },
  reducers: {
    updata(state, payload) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
