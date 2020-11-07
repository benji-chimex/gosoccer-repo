export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addligueOneStandings(state, data) {
            state.standings = data;
        },
        addligueOneTopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addligueOneFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getligueOneStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2664`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addligueOneStandings", data.api.standings[0]);
            }).catch(err => console.log(err));
        },
        getligueOneFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2664/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2664/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addligueOneFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getligueOneTopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2664`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addligueOneTopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}