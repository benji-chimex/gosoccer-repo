export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addEuropaStandings(state, data) {
            state.standings = data;
        },
        addEuropaTopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addEuropaFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getEuropaStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2777`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addEuropaStandings", data.api.standings);
            }).catch(err => console.log(err));
        },
        getEuropaFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2777/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2777/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addEuropaFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getEuropaTopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2777`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addEuropaTopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}