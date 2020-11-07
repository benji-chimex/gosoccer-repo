export default {
    state: {
        teams: [],
        f_team: {},
        players: [],
        myTeam: {}
    },
    mutations: {
        addTeam(state, data) {
            state.f_team = data;
        },
        addMyTeam(state, data) {
            state.myTeam = data;
        },
        addTeams(state, data) {
            state.teams.push(data);
        },
        addPlayers(state, data) {
            let result = state.players.filter(player => player.player_id === data.player_id);
            if(result === undefined || result.length === 0) {
                state.players.push(data);
            }
        }
    },
    actions: {
        getTeam({ commit }, info) {
            let body = {
                teamname: info
            }
            fetch(`http://localhost:3030/fantasy/team`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
            .then(data => {
                commit("addTeam", data);
            }).catch(err => console.log(err));
        },
        getPlayers({ commit }, info) {
            fetch(`https://v2.api-football.com/players/team/${info}/2020-2021`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then($data => {
                fetch(`https://v2.api-football.com/players/team/${info}/2019-2020`, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                    }
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    for(let info of data.api.players) {
                        let result = $data.api.players.filter(player => player.player_id === info.player_id);
                        if(result !== undefined && result.length !== 0) {
                            // console.log(result);
                            result[0].p_rating = info.rating;
                            commit("addPlayers", result[0]);
                        }
                    }
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        },
        getTeams({ commit }, info) {
            fetch(`https://v2.api-football.com/teams/league/${info}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                commit("addTeams", data.api.teams);
            }).catch(err => console.log(err));
        }
    }
}