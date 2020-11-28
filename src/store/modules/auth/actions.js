export default {
  async login(context, payload) {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMLbBBbNyt28fqSEAtRzDmKqH8noA9hqs',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to authenticate.');
      throw error;
    }
    console.log(resData);
    context.commit('setUser', {
      token: resData.idToken,
      tokenExpiration: resData.expiresIn,
      userId: resData.localId
    });
  },
  async signup(context, payload) {
    const res = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMLbBBbNyt28fqSEAtRzDmKqH8noA9hqs',
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to authenticate.');
      throw error;
    }
    console.log(resData);
    context.commit('setUser', {
      token: resData.idToken,
      tokenExpiration: resData.expiresIn,
      userId: resData.localId
    });
  },
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    });
  }
};
