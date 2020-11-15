import css from "../main.css"
import template from "../template.html"
import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
import nav from "./components/nav"
import body from "./components/body"
import state from "./store/state"
import actions from "./store/actions"
import mutations from "./store/mutations"
import routes from "./routes"
import epl from "./store/modules/epl"
import laliga from "./store/modules/laliga"
import seriaA from "./store/modules/seriaa"
import bundesliga from "./store/modules/bundesliga"
import ligueOne from "./store/modules/ligueone"
import champs from "./store/modules/champs"
import europa from "./store/modules/europa"
import betting from "./store/modules/betting"
import fantasy from "./store/modules/fantasy"


Vue.use(Vuex);
Vue.use(VueRouter);

let store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        epl,
        laliga,
        seriaA,
        bundesliga,
        ligueOne,
        champs,
        europa,
        betting,
        fantasy
    }
})

let router = new VueRouter({
    mode: "history",
    routes
})

let vm = new Vue({
    el: "#app",
    store,
    router,
    components: {
        "nav-bar": nav,
        "app-body": body
    },
    mounted() {
        this.scroll();
    },
    methods: {
        scroll() {
            // console.log(window.location.pathname)
            if(window.location.pathname !== "/") {
                window.scroll({
                    top: 900,
                    left: 900,
                    behavior: "smooth"
                })
            }
        }
    },
    created() {
        document.addEventListener("DOMContentLoaded", () => {
            let el = document.querySelectorAll(".tooltipped");
            let instance = M.Tooltip.init(el);
        })
    }
})