export default {
    template: "#f_team",
    computed: {
        f_team() {
            return this.$store.state.fantasy.f_team;
        },
        teams() {
            return this.$store.state.fantasy.teams;
        }
    },
    created() {
        this.$store.dispatch("getTeam", this.$route.params.f_team);
        this.$store.dispatch("getTeams", "2790");
        this.$store.dispatch("getTeams", "2664");
        this.$store.dispatch("getTeams", "2755");
        this.$store.dispatch("getTeams", "2833");
        this.$store.dispatch("getTeams", "2857");
    },
    data() {
        return {
            f_teams: {
                signings: 0,
                rating: 0,
                teamName: "Balling Niggies",
                points: 1000
            }
        }
    },
    methods: {
        team(e) {
            // e.preventDefault();
            let id = e.target.id;
            let user = this.$route.params.user;
            window.location.assign(`http://localhost:3030/_profile/${user}/fantasy/${id}`);
        },
        myteam(e) {
            e.preventDefault();
            window.location.assign(`http://localhost:3030/_profile/${this.$route.params.user}/__fantasy/myteam/${this.$route.params.f_team}`);
        }
    }
}