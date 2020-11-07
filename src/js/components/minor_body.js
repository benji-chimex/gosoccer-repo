export default {
    template: "#body-minor",
    data() {
        return {
            headers: ["Rank", "", "TeamName", "P", "W", "D", "L", "GD", "Pts"],
            show: false
        }
    },
    computed: {
        standings() {
            return this.$store.state.standings;
        },
        league() {
            return this.$store.state.standings[0].group;
        }
    }
}