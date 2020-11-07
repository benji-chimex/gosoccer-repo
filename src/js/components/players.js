export default {
    template: "#players",
    computed: {
        players() {
            return this.$store.state.fantasy.players;
        },
        f_team() {
            return this.$store.state.fantasy.f_team;
        }
    },
    created() {
        this.$store.dispatch("getPlayers", this.$route.params.team);
        this.$store.dispatch("getTeam", this.$route.params.f_team);
    },
    methods: {
        buy(e) {
            e.preventDefault();
            let id = e.target.id;
            let body = {
                playername: this.players[id].player_name,
                player_worth: this.players[id].p_rating * 1000000,
                teamname: this.$route.params.f_team,
                club: this.players[id].team_name,
                country: this.players[id].nationality,
                position: this.players[id].position,
                age: this.players[id].age
            }
            fetch("http://localhost:3030/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
            .then(data => {
                if(data.msg === "ok") {
                    this.f_team.netWorth = this.f_team.netWorth - body.player_worth;
                    this.f_team.signings++;
                    alert(`${data.player} has been purchased`);
                }
            })
        },
        myteam(e) {
            e.preventDefault();
            window.location.assign(`http://localhost:3030/_profile/${this.$route.params.user}/__fantasy/myteam/${this.$route.params.f_team}`);
        }
    }
}