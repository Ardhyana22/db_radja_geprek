const sliderItems = document.querySelectorAll('.slider-item');

let sliderActive = 1;

if (sliderItems) {
    sliderItems.forEach((slider, index) => {
        if (index === 0) {
            slider.setAttribute("data-show","show");
        } else {
            slider.setAttribute("data-show", "hidden");
        }
    })

    setInterval(() => {
        console.log("hey");
        sliderItems.forEach((slider, index) => {
            if(sliderActive === index) {
                slider.setAttribute("data-show", "show");
            } else {
                slider.setAttribute("data-show", "hidden");
            }
        });

        if(sliderActive === sliderItems.length - 1) {
            sliderActive = 0;
        } else {
            sliderActive++;
        }

    },5000)
}