export default {
    template: "#article",
    data() {
        return {
    
        }
    },
    computed: {
        newsletter() {
            return this.$store.state.newsArticle;
        },
        article() {
            return this.$route.params.articleid;
        },
        standing() {
            return this.$store.state.standing;
        },
        headers() {
            return ["Rank", "", "TeamName", "P", "W", "D", "L", "GD", "Pts"]
        },
        items() {
            return ["1 / 5", "2 / 5", "3 / 5", "4 / 5", "5 / 5"]
        }
    },
    created() {
        this.$store.dispatch("getANews", this.article);
        this.$store.dispatch("getStanding", this.choice());
        document.addEventListener("DOMContentLoaded", () => {
            let el = document.querySelectorAll(".dropdown-trigger");
            let instance = M.Dropdown.init(el);
        })
    },
    methods: {
        numberOfLikes() {
            return this.likes++;
        },
        numberOfDislikes() {
            return this.dislikes++;
        },
        choice() {
            let choices = ["2790", "2833", "2755", "2857", "2664"];
            let random = Math.floor(Math.random() * choices.length);
            return choices[random];
        }
    },
    data() {
        return {
            likes: "",
            dislikes: "",
            blogName: "MyBlog.com"
        }
    }
}