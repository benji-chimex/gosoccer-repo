export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addEplStandings(state, data) {
            state.standings = data;
        },
        addEplTopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addEplFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getEplStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2790`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addEplStandings", data.api.standings[0]);
            }).catch(err => console.log(err));
        },
        getEplFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2790/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2790/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addEplFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getEplTopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2790`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addEplTopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}