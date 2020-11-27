export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const res = await fetch(
      `https://vue-find-a-coach-a907f.firebaseio.com/coaches/${userId}.json`,
      {
        method: 'PUT',
        body: JSON.stringify(coachData)
      }
    );

    // const resData = await res.json();

    if (!res.ok) {
      ///
    }
    context.commit('registerCoach', {
      ...coachData,
      id: userId
    });
  }
};
