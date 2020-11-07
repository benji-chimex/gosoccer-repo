export default {
    template: "#login",
    data() {
        return {
            username: "",
            password: ""
        }
    },
    methods: {
        login(e) {
            let formdata = {
                username: this.username,
                password: this.password
            }
            e.preventDefault();
            fetch("http://localhost:3030/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            }).then(res => res.json())
            .then(data => {
                window.sessionStorage.setItem("accessToken", data.accessToken);
                fetch("http://localhost:3030/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                    }).then(res => res.json())
                    .then(data => {
                        window.location.assign(`http://localhost:3030/_profile/${data}`);
                    }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }
}