import minor from "./minor_body"
import article from "./article"
import articles from "./articles"

export default {
    template: "#news",
    data() {
        return {

        }
    },
    components: {
        "body-minor": minor,
        "news-article": article,
        "news-articles": articles
    },
    created() {
        window.addEventListener("load", (e) => {
            // this.$store.dispatch("getStandings", "2790");
            // this.$store.dispatch("getStandings", "2833");
            // this.$store.dispatch("getStandings", "2755");
            // this.$store.dispatch("getStandings", "2857");
            // this.$store.dispatch("getStandings", "2664");
        })
    }
}