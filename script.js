let img = document.querySelector("#poster");
let text = document.querySelector("#nameImage");
let bottom_cont = document.querySelector("#btm1");
let arrows = document.querySelectorAll("i");

let interval;
let slidingIndex = 0;
let selectedSlide = 0;

let tl = gsap.timeline();

tl.to("i", {
    x: "0%",
    opacity: 1,
    duration: .8,
    stagger: .18,
    ease: "expo.in"
})

let currentIndex = 0;

let arr = [
    {
        src: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1200/sources/r1/cms/prod/6689/1722084336689-i",
        nameSrc: "https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/1183/1722084351183-t",
        movie_name: "Ved",
    },
    {
        src: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1200/sources/r1/cms/prod/5909/1721644845909-i",
        nameSrc: "https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/2817/1721644852817-t",
        movie_name: "Bramhashtra"
    },
    {
        src: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1920/sources/r1/cms/prod/3694/1725561503694-i",
        nameSrc: "https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/7820/1725561517820-t",
        movie_name: "Kill"
    },
    {
        src: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1200/sources/r1/cms/prod/6482/1721630406482-i",
        nameSrc: "https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/6453/1721630416453-t",
        movie_name: "Cuttputlli"
    },
    {
        src: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1200/sources/r1/cms/prod/1686/1724393351686-i",
        nameSrc: "https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/5519/1724393365519-t",
        movie_name: "Commander karan saxena"
    },
    {
        src: "https://img10.hotstar.com/image/upload/f_auto,q_90,w_1200/sources/r1/cms/prod/7032/1721638037032-i",
        nameSrc: "https://img10.hotstar.com/image/upload/f_auto,h_148/sources/r1/cms/prod/9125/1721638049125-t",
        movie_name: "Baaghi3"
    }
]


function addHoverElemData() {
    let clutter = "";
    arr.forEach((obj, idx) => {
        clutter += `<img src="${obj.src}" id="${idx}">`
    })

    bottom_cont.innerHTML = clutter;

    bottom_cont.childNodes[0].style.opacity = 1;
    bottom_cont.childNodes[0].style.border = "1px solid white";
}

addHoverElemData();

bottom_cont.addEventListener("click", (pointer) => {
    if (pointer.target.tagName == "IMG") {
        blurr();
        currentIndex = pointer.target.id - 1;
        selection(pointer.target.id);
    }
})

function slider() {
    gsap.to("#img_cont img", {
        x: 0,
        opacity: 1,
        duration: .8,
        ease: "power1"
    })
    gsap.to("#text img", {
        x: 0,
        opacity: 1,
        duration: 0.4,
        ease: "expo.in"
    })
    setTimeout(() => {
        gsap.to("#img_cont img", {
            x: "100%",
            duration: 0.4,
            opacity: 0,
            ease: "power1.in"
        })
        gsap.to("#text img", {
            x: "100%",
            duration: 0.2,
            opacity: 0,
            ease: "power1.in"
        })

        gsap.to("#img_cont img,#text img", {
            x: "-100%",
            duration: .1,
            delay: .7,
            ease: "sine.in"
        })

        blurr();
        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= 6) {
                currentIndex = 0;
            }
            selection(currentIndex);
            text.src = `${arr[currentIndex].nameSrc}`
            img.src = `${arr[currentIndex].src}`
        }, 1000);
    }, 4000);
}


function callInterval() {
    interval = setInterval(slider, 5000);
}

callInterval();

function btmNavigation() {
    arrows.forEach(function (tag) {
        tag.addEventListener("click", function (elem) {
            if (elem.target.classList.contains("ri-arrow-left-s-line")) {

                let firstImage = bottom_cont.childNodes[0].getBoundingClientRect();

                if (elem.target.getBoundingClientRect().right > firstImage.left) {
                    slidingIndex > 0 ? slidingIndex-- : 0;
                    gsap.to("#btm1", {
                        x: `-${firstImage.width * slidingIndex}`
                    })
                }
                if (slidingIndex == 0) {
                    gsap.to("#left", {
                        display: "none",
                        duration: .1,
                    })
                }
                gsap.to("#right", {
                    display: "grid",
                })
            }
            else {
                //lastImage use to get the width of the images that will help for the sliding the images perfectly and stop at the last images
                let lastImage = bottom_cont.childNodes[arr.length - 1].getBoundingClientRect();
                if (elem.target.getBoundingClientRect().left < lastImage.right) {
                    slidingIndex++;
                    gsap.to("#btm1", {
                        x: `-${lastImage.width * slidingIndex}`
                    })
                }
                if (slidingIndex > -1) {
                    gsap.to("#left", {
                        display: "grid"
                    })
                }
            }
        })
    })
}

if (window.innerWidth > 600) {
    btmNavigation();
}


function selection(selectionIndex) {
    gsap.to(bottom_cont.childNodes[selectionIndex], {
        border: "1px solid white",
        opacity: 1,
    })
}

function blurr() {
    gsap.to(bottom_cont.children, {
        border: "1px solid transparent",
        opacity: .6,
    })
}

let i = document.querySelectorAll(".same");
let h3 = document.querySelectorAll("h3");
i.forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
        tag.classList = tag.classList.value.replace("line", "fill");
    })
        if (tag.classList.value != "ri-home-5-fill") {
            tag.addEventListener("mouseleave", () => {
                tag.classList = tag.classList.value.replace("fill", "line");
                console.log(tag.classList.value)
            })
        }
})
