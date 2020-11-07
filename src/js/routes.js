import league from "./components/league";
import g_league from "./components/g_league";
import news from "./components/news";
import signup from "./components/signup";
import login from "./components/login";
import profile from "./components/profile";
import livescore from "./components/livescore";
import article from "./components/article";
import articles from "./components/articles"
import minor_body from "./components/minor_body";
import bet from "./components/bet";
import fantasy from "./components/fantasy";
import l_live from "./components/l_live";
import l_matches from "./components/l_matches";
import live from "./components/live";
import fixture from "./components/fixture";
import fixtures from "./components/fixtures";
import bets from "./components/bets";
import f_team from "./components/f_team";
import players from "./components/players";
import bet_slip from "./components/bet_slip";
import slip from "./components/slip";
import team from "./components/team";

export default [
    {
        path: "/",
        components: {
            "main": news
        },
        children: [
            {
                path: "articles/:articleid",
                components: {
                    "news": article
                }
            },
            {
                path: "",
                components: {
                    "news": articles,
                    "minor": minor_body
                }
            }
        ]
    },
    {
        path: "/leagues/:league",
        components: {
            "main": league
        },
        children: [
            {
                path: "",
                components: {
                    "fixture": fixtures
                }
            },
            {
                path: "fixture/:fixture_id",
                components: {
                    "fixture": fixture
                }
            }
        ]
    },
    {
        path: "/signup",
        components: {
            "main": signup
        }
    },
    {
        path: "/login",
        components: {
            "main": login
        }
    },
    {
        path: "/_leagues/:league",
        components: {
            "main": g_league
        },
        children: [
            {
                path: "",
                components: {
                    "g_fixture": fixtures
                }
            },
            {
                path: "fixture/:fixture_id",
                components: {
                    "g_fixture": fixture
                }
            }
        ]
    },
    {
        path: "/_profile/:user",
        components: {
            "main": profile
        }
    },
    {
        path: "/livescore",
        components: {
            "main": livescore
        },
        children: [
            {
                path: "",
                components: {
                    "live": l_live,
                    "matches": l_matches
                }
            },
            {
                path: "live_fixture/:fixture_id",
                components: {
                    "live": live
                }
            },
            {
                path: "fixtures/:fixture_id",
                components: {
                    "matches": fixture
                }
            }
        ]
    },
    {
        path: "/_profile/:user",
        components: {
            "main": profile,
        },
        children: [
            {
                path: "betting/:league",
                components: {
                    "btf": bet,
                }
            },
            {
                path: "bet/:fixture_id",
                components: {
                    "btf": bets
                }
            },
            {
                path: "fantasy",
                components: {
                    "btf": fantasy,
                }
            },
            {
                path: "_fantasy/:f_team",
                components: {
                    "btf": f_team
                }
            },
            {
                path: "$fantasy/:f_team/:team",
                components: {
                    "btf": players
                }
            },
            ,
            {
                path: "__fantasy/myteam/:my_team",
                components: {
                    "btf": team
                }
            },
            {
                path: "betslip",
                components: {
                    "btf": bet_slip
                }
            },
            {
                path: "slip/:amount",
                components: {
                    "btf": slip
                }
            }
            
        ]
    }
]