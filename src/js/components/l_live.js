export default {
    template: "#l_live",
    methods: {
        match(e) {
            let id = e.target;
            console.log(id);
            // window.location.assign(`http://localhost:3030/livescore/live_fixture/${id}`);
        }
    },
    computed: {
        fixtures() {
            // if(this.$store.state.livescores.length === 0) {
            //     alert("No Livescore");
            // }
            return this.$store.state.livescores;
        },
    },
    created() {
        this.$store.dispatch("getLiveScores");
    }
}