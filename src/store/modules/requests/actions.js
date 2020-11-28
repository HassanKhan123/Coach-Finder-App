export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message
    };
    const res = await fetch(
      `https://vue-find-a-coach-a907f.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request.');
      throw error;
    }
    newRequest.id = resData.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;
    const res = await fetch(
      `https://vue-find-a-coach-a907f.firebaseio.com/requests/${coachId}.json`
    );
    const resData = await res.json();
    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to send request.');
      throw error;
    }
    const requests = [];
    for (const key in resData) {
      const request = {
        id: key,
        coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message
      };
      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
