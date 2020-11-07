export default {
    template: "#carousel", 
    data() {
        return {
            slides: [
                {
                    icon: "euro_symbol",
                    _icon: "icon",
                    $icon: "material-icons",
                    header: "FANTASY",
                    content: "We offer the best way to earn through fantasy - Select a set of players all over the world and earn based on their weekly performance"
                },
                {
                    icon: "language",
                    _icon: "icon",
                    $icon: "material-icons",
                    header: "NEWS",
                    content: "We deliver latest news for all sports all over the globe"
                },
                {
                    icon: "public",
                    _icon: "icon",
                    $icon: "material-icons",
                    header: "LIVESCORES",
                    content: "We deliver livescores from the all soccer leagues around the globe"
                },
                {
                    icon: "monetization_on",
                    _icon: "icon",
                    $icon: "material-icons",
                    header: "BETTING",
                    content: "We offer nice predictions and odds with the fastest payout"
                }
            ]
        }
    },
    created() {
        document.addEventListener("DOMContentLoaded", () => {
            let el = document.querySelector(".carousel");
            let instance = M.Carousel.init(el)
        })
    },
    methods: {
        scale(e) {
            let el = e.target;
            el.classList.add("scale");
        }
    }
}