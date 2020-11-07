import league from "./league"
import news from "./news"
import signup from "./signup"
import login from "./login"
import profile from "./profile"
import g_league from "./g_league"
import slide from "./slide"
import carousel from "./carousel"

export default {
    template: "#app-body",
    data() {
        return {

        }
    },
    components: {
        "slider": slide,
        "carousel": carousel,
        "app-news": news,
        "app-league": league,
        "sign-up": signup,
        "log-in": login,
        "app-rofile": profile,
        "g-league": g_league
    }
}