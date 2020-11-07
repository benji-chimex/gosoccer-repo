export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addChampsStandings(state, data) {
            state.standings = data;
        },
        addChampsTopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addChampsFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getChampsStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2771`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addChampsStandings", data.api.standings);
            }).catch(err => console.log(err));
        },
        getChampsFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2771/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2771/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addChampsFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getChampsTopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2771`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addChampsTopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}