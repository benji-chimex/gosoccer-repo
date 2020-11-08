import fixture from "./fixture";
import fixtures from "./fixtures";

export default {
    template: "#_leagues",
    components: {
        "fixtures": fixtures,
        "fixture": fixture
    },
    computed: {
        standings() {
            if(this.$route.params.league === "champs") {
                return this.$store.state.champs.standings;
            } else if(this.$route.params.league === "europa") {
                return this.$store.state.europa.standings;
            }
        },
        topScorers() {
            if(this.$route.params.league === "champs") {
                return this.$store.state.champs.statistics.topscorers;
            } else if(this.$route.params.league === "europa") {
                return this.$store.state.europa.statistics.topscorers;
            } 
        }
    },
    created() {
        if(this.$route.params.league === "champs" || this.$route.params.league_id === "2771") {
            this.$store.dispatch("getChampsStandings");
            this.$store.dispatch("getChampsTopStats");
        } else if(this.$route.params.league === "europa" || this.$route.params.league_id === "2777") {
            this.$store.dispatch("getEuropaStandings");
            this.$store.dispatch("getEuropaTopStats");
        }
    },
    data() {
        return {
            headers: ["Rank", "", "TeamName", "P", "W", "D", "L", "GD", "Pts"],
            t_headers: ["Rank", "Name", "Team", "Goals", "Assists"]
        }
    }
}