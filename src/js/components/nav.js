export default {
    template: "#nav-bar",
    data() {
        return {
            newsActive: true,
            m_leaguesActive: false,
            o_leaguesActive: false,
            liveActive: false
        }
    },
    created() {
        document.addEventListener("DOMContentLoaded", () => {
            let el = document.querySelectorAll(".sidenav");
            let instances = M.Sidenav.init(el);
        })
    },
    methods: {
        bet(e) {
            e.preventDefault();

            let data = {
                accessToken: sessionStorage.getItem("accessToken")
            }
            fetch("http://localhost:3030/betting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => {
                if(data === "error") {
                    alert("You are not Logged in");
                } else {
                    window.location.assign(`http://localhost:3030/_profile/${data}/betting/${e.target.id}`);
                }
            }).catch(err => console.log(err));
        },
        fantasy(e) {
            e.preventDefault();

            let data = {
                accessToken: sessionStorage.getItem("accessToken")
            }
            fetch("http://localhost:3030/fantasy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
            .then(data => {
                if(data === "error") {
                    alert("You are not logged in");
                }
                else {
                    window.location.assign(`http://localhost:3030/_profile/${data}/fantasy`);
                }
            }).catch(err => console.log(err));
        }
    }
}