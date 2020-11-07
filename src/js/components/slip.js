export default {
    template: "#bet_slip",
    computed: {
        betslip() {
            return this.$store.state.betting.slip;
        },
        total() {
            let acc = 0;
            for(let bet of this.$store.state.betting.slip.bets) {
                let result = bet.odd + acc;
                acc = result;
            }
            return acc;
        },
        amount() {
            return Math.round(this.$route.params.amount);
        },
        payout() {
            let amount = this.total * this.amount;
            let bonus = ((amount * 10) / 100) + amount;
            return Math.round(bonus);
        }
    },
    created() {
        let token = {
            betToken: sessionStorage.getItem("betToken")
        };
        this.$store.dispatch("getBetSlip", token);
    },
    mounted() {
        let info = {
            msg:  "completed",
            token: sessionStorage.getItem("betToken")
        };
        fetch("http://localhost:3030/completed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(info)
            }).then(res => res.json())
            .then(data => {
                if(data === "ok") {
                    let token = sessionStorage.getItem("betToken")
                    // sessionStorage.removeItem("betToken", token);
                }
            }).catch(err => console.log(err));
    },
    data() {
        return {

        }
    },
    methods: {
        
    },
    filters: {
        string(val) {
            return val.toString().slice(0, 19);
        }
    }
}