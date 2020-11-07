export default {
    template: "#fantasy",
    data() {
        return {

        }
    },
    computed: {
        
    },
    created() {
        
    },
    methods: {
        fantasy(e) {
            let username = document.querySelector("#user").innerText.slice(11);
            let teamname = document.querySelector("#team_name").value;

            let body = {
                username,
                teamname
            }
            fetch("http://localhost:3030/fantasy/teams", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }).then(res => res.json())
            .then(data => {
                window.location.assign(`http://localhost:3030/_profile/${data.username}/_fantasy/${data.teamname}`);
            })
        }
    }
}