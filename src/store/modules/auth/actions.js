export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup'
    });
  },
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMLbBBbNyt28fqSEAtRzDmKqH8noA9hqs';
    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMLbBBbNyt28fqSEAtRzDmKqH8noA9hqs';
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to authenticate.');
      throw error;
    }
    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userId', resData.localId);
    context.commit('setUser', {
      token: resData.idToken,
      tokenExpiration: resData.expiresIn,
      userId: resData.localId
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
        tokenExpiration: null
      });
    }
  }
};
