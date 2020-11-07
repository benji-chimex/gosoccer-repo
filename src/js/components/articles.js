export default {
    template: "#articles",
    data() {
        return {
            
        }
    },
    computed: {
        newsletter() {
            return this.$store.state.news.articles;
        }
    },
    created() {
        this.$store.dispatch("getNews");
    }
}