export default {
    template: "#slide",
    data() {
        return {
            slides: [
                {
                    img: "jpeg.jpg",
                    text: "Spain the Champions of the World",
                    desc: "Spain lifting the World Cup"
                },
                {
                    img: "brazil.jpg",
                    text: "Brazil the Champions of the World",
                    desc: "Brazil lifting the World Cup"
                },
                {
                    img: "final.jpg",
                    text: "Real the European Kings",
                    desc: "Madrid lifting their 13th Champions League"
                },
                {
                    img: "960.jpg",
                    text: "Liverpool the Champions of England",
                    desc: "Liverpool the Champions of England after 26 years"
                },
                {
                    img: "liverpool.jpeg",
                    text: "Liverpool the Champions of Europe",
                    desc: "Liverpool lifing their 6th Champions League"
                }
            ]
        }
    },
    created() {
        document.addEventListener("DOMContentLoaded", () => {
            let el = document.querySelector(".slider");
            let instance = M.Slider.init(el)
        })
    }
}