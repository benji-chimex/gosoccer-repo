export default {
    template: "#profile",
    computed: {
        user() {
            return this.$store.state.user;
        },
        username() {
            return this.$route.params.user;
        },
        col() {
            return true;
        },
        ratio() {
            if(
                /\/\_fantasy/.test(window.location.pathname) === true || /\/\$fantasy/.test(window.location.pathname) === true || /\/bet\//.test(window.location.pathname) === true ||
                /\/\_\_fantasy/.test(window.location.pathname) === true) {
                return false;
            }
            else {
                return true;
            }
        },
        dist() {
            if(/\/\_fantasy/.test(window.location.pathname) === true || /\/\$fantasy/.test(window.location.pathname) === true || /\/bet\//.test(window.location.pathname) === true || /\/\_\_fantasy/.test(window.location.pathname) === true) {
                return false;
            }
            else {
                return true;
            }
        },
        display() {
            if(/\/\_fantasy/.test(window.location.pathname) === true || /\/\$fantasy/.test(window.location.pathname) === true || /\/bet\//.test(window.location.pathname) === true || /\/\_\_fantasy/.test(window.location.pathname) === true) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    created() {
        this.$store.dispatch("getUser", this.$route.params.user);
    },
    mounted() {
        this.comp();
    },
    methods: {
        comp() {
            let betting = document.querySelector("#bet");
            let fantasy = document.querySelector("#fan");
            if(/\/betting/.test(window.location.pathname) === true || /\/bet/.test(window.location.pathname) === true) {
                betting.classList.add("border");
            } else if(/\/fantasy/.test(window.location.pathname) === true || /\/\_fantasy/.test(window.location.pathname) === true || /\/\$fantasy/.test(window.location.pathname) === true) {
                fantasy.classList.add("border");
            }
        }
    }
}