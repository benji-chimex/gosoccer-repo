export default {
    template: "#l_matches",
    methods: {
        match(e) {
            let id = e.target.id;
            // window.location.assign(`http://localhost:3030/livescore/fixtures/${id}`);
        }
    },
    computed: {
        matches() {
            return this.$store.state.fixtures;
        }
    },
    created() {
        this.$store.dispatch("getFixtures", "2790");
        this.$store.dispatch("getFixtures", "2833");
        this.$store.dispatch("getFixtures", "2755");
        this.$store.dispatch("getFixtures", "2857");
        this.$store.dispatch("getFixtures", "2664");
    },
    filters: {
        dateString(val) {
            return val.toString().slice(0, 19);
        }
    }
}