export default {
    template: "#betting",
    data() {
        return {
            headers: ["Date", "Fixtures", "1", "X", "2", ""]
        }
    },
    computed: {
        bets() {
            return this.$store.state.betting.bets;
        }
    },
    created() {
        if(this.$route.params.league === "epl") {
            this.$store.dispatch("getBets", "2790");
        } else if(this.$route.params.league === "laliga") {
            this.$store.dispatch("getBets", "2833");
        } else if(this.$route.params.league === "seriaA") {
            this.$store.dispatch("getBets", "2857");
        } else if(this.$route.params.league === "bundesliga") {
            this.$store.dispatch("getBets", "2755");
        } else if(this.$route.params.league === "ligueOne") {
            this.$store.dispatch("getBets", "2664");
        } else if(this.$route.params.league === "champs") {
            this.$store.dispatch("getBets", "2771");
        } else if(this.$route.params.league === "europa") {
            this.$store.dispatch("getBets", "2777");
        }
    },
    filters: {
        dateString(val) {
            return val.toString().slice(0, 19);
        }
    },
    methods: {
        more(e) {
            let id = e.target.id;
            let user = this.$route.params.user;
            window.location.assign(`http://localhost:3030/_profile/${user}/bet/${id}`);
        },
        betslip(e) {
            e.preventDefault();
            window.location.assign(`http://localhost:3030/_profile/${this.$route.params.user}/betslip`)
        },
    }
}