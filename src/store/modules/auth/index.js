import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  state() {
    return {
      userId: null,
      tokenExpiration: null,
      token: null
    };
  },
  mutations,
  actions,
  getters
};
