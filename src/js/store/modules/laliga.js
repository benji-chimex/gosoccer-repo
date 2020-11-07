export default {
    state: {
        standings: [],
        statistics: {
            topscorers: []
        },
        fixtures: []
    },
    mutations: {
        addlaLigaStandings(state, data) {
            state.standings = data;
        },
        addlaLigaTopStats(state, data) {
            state.statistics.topscorers = data;
        },
        addlaLigaFixtures(state, data) {
            state.fixtures = data;
        }
    },
    actions: {
        getlaLigaStandings({ commit }) {
            fetch(`https://v2.api-football.com/leagueTable/2833`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                commit("addlaLigaStandings", data.api.standings[0]);
            }).catch(err => console.log(err));
        },
        getlaLigaFixtures({ commit }) {
            fetch("https://v2.api-football.com/fixtures/rounds/2833/current", {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/2833/${data.api.fixtures[0]}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
                })
                .then(res => res.json())
                .then(data => {
                    commit("addlaLigaFixtures", data.api.fixtures);
                }).catch(err => console.log(err));
            })
        },
        getlaLigaTopStats({ commit }) {
            fetch(`https://v2.api-football.com/topscorers/2833`, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
            }
            })
            .then(res => res.json())
            .then(data => {
                commit("addlaLigaTopStats", data.api.topscorers);
            }).catch(err => console.log(err));
        }
    }
}