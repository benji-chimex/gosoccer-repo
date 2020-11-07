export default {
    template: "#fixture",
    computed: {
        events() {
            return this.$store.state.fixture.events;
        },
        lineups() {
            let lineup = Object.entries(this.$store.state.fixture.lineups);
            return lineup;
        },
        statistics() {
            let stats = Object.entries(this.$store.state.fixture.statistics)
            return stats;
        },
        fixture() {
            return this.$store.state.fixture;
        }
    },
    created() {
        this.$store.dispatch("getData", this.$route.params.fixture_id);
    },
    data() {
        return {
            headers: ["Time", "Type", "Detail", "Player", "Assist", "Team"]
        }
    }
}