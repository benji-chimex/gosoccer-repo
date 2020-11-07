import minor_body from "./minor_body";
import l_live from "./l_live";
import l_matches from "./l_matches";
import fixture from "./fixture";
import live from "./live";

export default {
    template: "#live",
    computed: {
        
    },
    created() {
        // this.$store.dispatch("getStandings", "2790");
        // this.$store.dispatch("getStandings", "2833");
        // this.$store.dispatch("getStandings", "2755");
        // this.$store.dispatch("getStandings", "2857");
        // this.$store.dispatch("getStandings", "2664");
    },
    components: {
        "body-minor": minor_body,
        "l-live": l_live,
        "l-matches": l_matches,
        "fixture": fixture,
        "live": live
    },
    filters: {
        dateString(val) {
            return val.toString().slice(0, 19);
        }
    },
    data() {
        return {
            versus: "VS"
        }
    }
}