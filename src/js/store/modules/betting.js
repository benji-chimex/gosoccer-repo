export default {
    state: {
        fixtures: [],
        bets: [],
        bet: {},
        slip: {}
    },
    mutations: {
        addBet(state, data) {
            state.bet = data;
        },
        addBets(state, data) {
            state.bets.push(data);
        },
        addSlip(state, data) {
            state.slip = data;
        }
    },
    actions: {
        getBets({ commit }, info) {
            fetch(`https://v2.api-football.com/fixtures/rounds/${info}/current`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                fetch(`https://v2.api-football.com/fixtures/league/${info}/${data.api.fixtures[0]}`, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                    }
                }).then(res => res.json())
                .then(data => {
                    // commit("addFixtures", data.api.fixtures);
                    for(let fixture of data.api.fixtures) {
                        fetch(`https://v2.api-football.com/odds/fixture/${fixture.fixture_id}/label/1`, {
                            method: "GET",
                            headers: {
                                "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                            }
                        }).then(res => res.json())
                        .then(data => {
                            fixture.bets = data.api.odds[0].bookmakers[0].bets[0].values.reverse();
                            // console.log(fixture);
                            commit("addBets", fixture);
                        })
                    }
                }).catch(err => console.log(err));
            })
        },
        getBet({ commit }, info) {
            fetch(`https://v2.api-football.com/fixtures/id/${info}`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                }
            }).then(res => res.json())
            .then(data => {
                let bet = data.api.fixtures[0];
                fetch(`https://v2.api-football.com/odds/fixture/${info}/bookmaker/11`, {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "519645560703aa161e45bdeba460db57"
                    }
                }).then(res => res.json())
                .then(data => {
                    console.log(data);
                    bet.bets = data.api.odds[0].bookmakers[0].bets;
                    commit("addBet", bet)
                    console.log(bet);
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        },
        getBetSlip({ commit }, info) {
            fetch("http://localhost:3030/slip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }).then(res => res.json())
            .then(data => {
                if(data.msg) {
                    alert(data.msg);
                } else {
                    commit("addSlip", data); 
                }
            }).catch(err => console.log(err));
        }
    }
}