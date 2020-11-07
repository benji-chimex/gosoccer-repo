export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addBundesligaStandings(state, data) {
            state.standings = data;
        },
        addBundesligaTopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addBundesligaFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getBundesligaStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2755`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addBundesligaStandings", data.api.standings[0]);
            }).catch(err => console.log(err));
        },
        getBundesligaFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2755/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2755/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addBundesligaFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getBundesligaTopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2755`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addBundesligaTopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}