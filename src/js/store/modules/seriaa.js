export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addseriaAStandings(state, data) {
            state.standings = data;
        },
        addseriaATopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addseriaAFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getseriaAStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2857`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addseriaAStandings", data.api.standings[0]);
            }).catch(err => console.log(err));
        },
        getseriaAFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2857/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2857/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addseriaAFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getseriaATopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2857`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addseriaATopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}