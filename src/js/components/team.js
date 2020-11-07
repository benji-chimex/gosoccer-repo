export default {
    template: "#team",
    computed: {
        myTeam() {
            return this.$store.state.fantasy.myTeam;
        }
    },
    created() {
        // this.$store.dispatch("getMyTeam", this.$route.params.my_team);
            let body = {
                teamname: this.$route.params.my_team
            }
            fetch(`http://localhost:3030/fantasy/myteam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
            .then(data => {
                for(let info of data.players) {
                    let result = info.player_points.reduce((acc, el) => {
                        return acc + el;
                    }, 0)
                    info.player_points = result;
                }
                console.log(data)
                this.$store.commit("addMyTeam", data);
            }).catch(err => console.log(err));
    },
    methods: {

    },
    data() {
        return {

        }
    }
}