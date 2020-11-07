export default {
    template: "#fixtures",
    computed: {
        fixtures() {
            if(this.$route.params.league === "epl") {
                return this.$store.state.epl.fixtures;
            } else if(this.$route.params.league === "laliga") {
                return this.$store.state.laliga.fixtures;
            } else if(this.$route.params.league === "seriaA") {
                return this.$store.state.seriaA.fixtures;
            } else if(this.$route.params.league === "bundesliga") {
                return this.$store.state.bundesliga.fixtures;
            } else if(this.$route.params.league === "ligueOne") {
                return this.$store.state.ligueOne.fixtures;
            } else if(this.$route.params.league === "champs") {
                return this.$store.state.champs.fixtures;
            } else if(this.$route.params.league === "europa") {
                return this.$store.state.europa.fixtures;
            } 
        }
    },
    created() {
        if(this.$route.params.league === "champs") {
            this.$store.dispatch("getChampsFixtures");
        } else if(this.$route.params.league === "europa") {
            this.$store.dispatch("getEuropaFixtures");
        } else if(this.$route.params.league === "epl") {
            this.$store.dispatch("getEplFixtures");
        } else if(this.$route.params.league === "laliga") {
            this.$store.dispatch("getlaLigaFixtures");
        } else if(this.$route.params.league === "seriaA") {
            this.$store.dispatch("getseriaAFixtures");
        }  else if(this.$route.params.league === "bundesliga") {
            this.$store.dispatch("getBundesligaFixtures");
        } else if(this.$route.params.league === "ligueOne") {
            this.$store.dispatch("getligueOneFixtures");
        } 
    },
    data() {
        return {
            versus: "VS"
        }
    },
    filters: {
        dateString(val) {
            return val.toString().slice(0, 19);
        }
    },
    methods: {
        link(e) {
            e.preventDefault();
            let id = e.target.id;
            if(this.$route.params.league === "epl") {
                window.location.assign(`/leagues/2790/fixture/${id}`);
            } else if(this.$route.params.league === "laliga") {
                window.location.assign(`/leagues/2833/fixture/${id}`);
            } else if(this.$route.params.league === "seriaA") {
                window.location.assign(`/leagues/2857/fixture/${id}`);
            } else if(this.$route.params.league === "bundesliga") {
                window.location.assign(`/leagues/2755/fixture/${id}`);
            } else if(this.$route.params.league === "ligueOne") {
                window.location.assign(`/leagues/2664/fixture/${id}`);
            } else if(this.$route.params.league === "champs") {
                window.location.assign(`/_leagues/2771/fixture/${id}`);
            } else if(this.$route.params.league === "europa") {
                window.location.assign(`_/leagues/2777/fixture/${id}`);
            } 
        }
    }
}