export default {
    getNews({ commit }) {
        fetch("https://newsapi.org/v2/top-headlines?pageSize=20&country=us&category=sports&apiKey=3aa1155452544d51ac4de3f2680c47a2")
        .then(res => res.json())
        .then(data => {
            commit("addNews", data);
        }).catch(err => console.log(err));
    },
    getANews({ commit }, info) {
        fetch("https://newsapi.org/v2/top-headlines?pageSize=20&country=us&category=sports&apiKey=3aa1155452544d51ac4de3f2680c47a2")
        .then(res => res.json())
        .then(data => {
            // console.log(data.articles[info]);
            commit("addANews", data.articles[info]);
        }).catch(err => console.log(err));
    },
    getStandings({ commit }, data) {
        fetch(`https://v2.api-football.com/leagueTable/${data}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
        })
        .then(res => res.json())
        .then(data => {
            commit("addStandings", data.api.standings[0]);
        }).catch(err => console.log(err));
    },
    getStanding({ commit }, data) {
        fetch(`https://v2.api-football.com/leagueTable/${data}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
        })
        .then(res => res.json())
        .then(data => {
            commit("addStanding", data.api.standings[0]);
        }).catch(err => console.log(err));
    },
    getUser({ commit }, data) {
        fetch(`http://localhost:3030/profile/${data}`)
        .then(res => res.json())
        .then(data => {
            commit("addUser", data);
        }).catch(err => console.log(err));

    },
    getLiveScores({ commit }) {
        fetch("https://v2.api-football.com/fixtures/live", {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
        }).then(res => res.json())
        .then(data => {
            commit("addLiveScores", data.api.fixtures);
        }).catch(err => console.log(err));
    },
    getFixtures({ commit }, info) {
        fetch(`https://v2.api-football.com/fixtures/rounds/${info}/current`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
        }).then(res => res.json())
        .then(data => {
            // console.log(data);
            fetch(`https://v2.api-football.com/fixtures/league/${info}/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
            .then(res => res.json())
            .then(data => {
                commit("addFixtures", data.api.fixtures);
            }).catch(err => console.log(err));
        })
    },
    getInfo({ commit }, info) {
        fetch("https://v2.api-football.com/fixtures/live", {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
        }).then(res => res.json())
        .then(data => {
            let result = data.api.fixtures.filter(fixture => fixture.fixture_id === parseInt(info));
            let fixture = result[0];
            // console.log(data)
            // console.log(result)
            fetch(`https://v2.api-football.com/fixtures/id/${info}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                if(data.api.fixtures[0].lineups !== null || data.api.fixtures[0].lineups !== undefined) {
                    fixture.lineups = data.api.fixtures[0].lineups;
                } else {
                    fixture.lineups = null;
                }

                if(data.api.fixtures[0].statistics !== null || data.api.fixtures[0].statistics !== undefined) {
                    fixture.statistics = data.api.fixtures[0].statistics;
                } else {
                    fixture.statistics = null;
                }
                console.log(fixture);
                commit("addInfo", fixture);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    },
    getData({ commit }, info) {
        fetch(`https://v2.api-football.com/fixtures/id/${info}`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
        }).then(res => res.json())
        .then(data => {
            commit("addData", data.api.fixtures[0]);
        })
    }
}