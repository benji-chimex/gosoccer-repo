import fixture from "./fixture";
import fixtures from "./fixtures";

export default {
    template: "#leagues",
    components: {
        "fixtures": fixtures,
        "fixture": fixture
    },
    computed: {
        standings() {
            if(this.$route.params.league === "epl") {
                return this.$store.state.epl.standings;
            } else if(this.$route.params.league === "laliga") {
                return this.$store.state.laliga.standings;
            } else if(this.$route.params.league === "seriaA") {
                return this.$store.state.seriaA.standings;
            } else if(this.$route.params.league === "bundesliga") {
                return this.$store.state.bundesliga.standings;
            } else if(this.$route.params.league === "ligueOne") {
                return this.$store.state.ligueOne.standings;
            }
        },
        topScorers() {
            if(this.$route.params.league === "epl") {
                return this.$store.state.epl.statistics.topscorers;
            } else if(this.$route.params.league === "laliga") {
                return this.$store.state.laliga.statistics.topscorers;
            } else if(this.$route.params.league === "seriaA") {
                return this.$store.state.seriaA.statistics.topscorers;
            } else if(this.$route.params.league === "bundesliga") {
                return this.$store.state.bundesliga.statistics.topscorers;
            } else if(this.$route.params.league === "ligueOne") {
                return this.$store.state.ligueOne.statistics.topscorers;
            }
        }
    },
    created() {
        if(this.$route.params.league === "epl" || this.$route.params.league_id === "2790") {
            this.$store.dispatch("getEplStandings");
            this.$store.dispatch("getEplTopStats");
        } else if(this.$route.params.league === "laliga" || this.$route.params.league_id === "2833") {
            this.$store.dispatch("getlaLigaStandings");
            this.$store.dispatch("getlaLigaTopStats");
        } else if(this.$route.params.league === "seriaA" || this.$route.params.league_id === "2857") {
            this.$store.dispatch("getseriaAStandings");
            this.$store.dispatch("getseriaATopStats");
        } else if(this.$route.params.league === "bundesliga" || this.$route.params.league_id === "2755") {
            this.$store.dispatch("getBundesligaStandings");
            this.$store.dispatch("getBundesligaTopStats");
        } else if(this.$route.params.league === "ligueOne" || this.$route.params.league_id === "2664") {
            this.$store.dispatch("getligueOneStandings");
            this.$store.dispatch("getligueOneTopStats");
        }
    },
    data() {
        return {
            headers: ["Rank", "", "TeamName", "P", "W", "D", "L", "GD", "Pts"],
            t_headers: ["Rank", "Name", "Team", "Goals", "Assists"]
        }
    }
}