export default {
    template: "#bets",
    computed: {
        bet() {
            return this.$store.state.betting.bet;
        },
        bets() {
            return this.$store.state.betting.bet.bets;
        }
    },
    created() {
        this.$store.dispatch("getBet", this.$route.params.fixture_id);
    },
    filters: {
        dateString(val) {
            return val.toString().slice(0, 19);
        }
    },
    methods: {
        betslip(e) {
            e.preventDefault();
            window.location.assign(`http://localhost:3030/_profile/${this.$route.params.user}/betslip`)
        },
        goBet(e) {
            e.preventDefault();
            let betID = e.target.dataset.bet;
            let betOdd = e.target.dataset.odd;
            let body = {
                fixture : this.bet.awayTeam.team_name + " VS " + this.bet.homeTeam.team_name,
                event_date : this.bet.event_date,
                user: this.$route.params.user,
                label_name: this.bet.bets[betID].label_name,
                value: this.bet.bets[betID].values[betOdd].value,
                odd: this.bet.bets[betID].values[betOdd].odd,
                betToken: sessionStorage.getItem("betToken")
            }
            // console.log(body);
            fetch(`http://localhost:3030/betslip`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
            .then(data => {
                // console.log(data);
                if(data.betToken) {
                    sessionStorage.setItem("betToken", data.betToken);
                    alert(data.msg);
                } else {
                    alert(data.msg);
                }
            }).catch(err => console.log(err));
        }
    }
}