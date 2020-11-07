export default {
    addNews(state, data) {
        state.news = data;
    },
    addANews(state, data) {
        // console.log(data);
        state.newsArticle = data;
    },
    addStandings(state, data) {
        state.standings.push(data);
    },
    addStanding(state, data) {
        state.standing = data;
    },
    addUser(state, data) {
        state.user = data;
    },
    addLiveScores(state, data) {
        state.livescores = data;
    },
    addFixtures(state, data) {
        state.fixtures.push(data);
    },
    addInfo(state, data) {
        state.live_fixture = data;
    },
    addData(state, data) {
        state.fixture = data;
    }
}