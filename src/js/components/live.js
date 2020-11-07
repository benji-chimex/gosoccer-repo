export default {
    template: "#events",
    computed: {
        events() {
            if(this.$store.state.live_fixture.events !== null) {
                return events;
            } else {
                return "NO EVENTS";
            }
        },
        lineups() {
            if(this.$store.state.live_fixture.lineups !== null) {
                let lineup = Object.entries(this.$store.state.live_fixture.lineups)
                return lineup;
            } else {
                return "NO LINEUPS";
            }
        },
        statistics() {
            if(this.$store.state.live_fixture.statistics !== null) {
                let stats = Object.entries(this.$store.state.live_fixture.statistics)
                return stats;
            } else {
                return "NO STATISTICS";
            }
        },
        live_fixture() {
            return this.$store.state.live_fixture;
        }
    },
    created() {
        this.$store.dispatch("getInfo", this.$route.params.fixture_id);
    },
    data() {
        return {
            headers: ["Time", "Type", "Detail", "Player", "Assist", "Team"]
        }
    }
}