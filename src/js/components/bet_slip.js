export default {
    template: "#bet-slip",
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
        }
    },
    created() {
        let token = {
            betToken: sessionStorage.getItem("betToken")
        };
        this.$store.dispatch("getBetSlip", token);
    },
    data() {
        return {

        }
    },
    methods: {
        slip(e) {
            e.preventDefault();
            let input = document.querySelector("#amount").value;
            window.location.assign(`http://localhost:3030/_profile/${this.$route.params.user}/slip/${input}`);
        }
    },
    filters: {
        string(val) {
            return val.toString().slice(0, 19);
        }
    }
}