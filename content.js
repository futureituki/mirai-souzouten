let sections = document.querySelectorAll(".vertical-area");
let scrollContainer = document.querySelector(".vertical-slider__wrap");
let images = gsap.utils.toArray(".js-img");
let heading = gsap.utils.toArray(".heading-wrap h2");
import * as THREE from './module/build/three.module.js';
console.log(THREE)
let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none"
});

let horizontalScroll = ScrollTrigger.create({
    animation: scrollTween,
    trigger: scrollContainer,
    pin: true,
    scrub: 1,
    // markers:true,
    end: () => "+=" + scrollContainer.offsetWidth,
});

function txtSplit(el){//https://sinciate.co.jp/media/2999/
    var content = el.textContent;
    var text = content.trim();
    var newHtml = "";

    text.split("").forEach(function(v) {
        newHtml += "<span>" + v + "</span>";
    });
    el.innerHTML = newHtml;
}
images.forEach((img, i) => {
    gsap.to(img,{
        scrollTrigger:{
            trigger: img,
            start:'top center',
            end:'bottom center',
            horizontal:true,
            // markers:true,
            scrub:.2,
            containerAnimation:scrollTween,
        },
        x:-150,ease:"none"
    });
});
heading.forEach((h, i) => {
    txtSplit(h);
    if(i === 0){
        gsap.from(h.querySelectorAll('span'),{
            scrollTrigger:{
                trigger: h,
                start:'top 10%',
                // markers:true,
                horizontal:true,
                containerAnimation:scrollTween,
                toggleActions:'play none none reverse'
            },
            stagger:{
                each:0.02,
            },
            y:'30%',autoAlpha:0,ease:Power4.easeIn,duration:.4,
        });
    }else{
        gsap.from(h.querySelectorAll('span'),{
            scrollTrigger:{
                trigger: h,
                start:'10% center',
                // markers:true,
                horizontal:true,
                containerAnimation:scrollTween,
                toggleActions:'play none none reverse'
            },
            stagger:{
                each:0.02,
            },
            y:'50%',autoAlpha:0,ease:Power4.easeIn,duration:.4,
        });
    }
});

// total scroll amount divided by the total distance that the sections move gives us the ratio we can apply to the pointer movement so that it fits. 
var dragRatio = scrollContainer.offsetWidth / (window.innerWidth * (sections.length - 1));
var drag = Draggable.create(".proxy", {
  trigger: scrollContainer,
  type: "x",
  onPress() {
    this.startScroll = horizontalScroll.scroll();
  },
  onDrag() {
    horizontalScroll.scroll(this.startScroll - (this.x - this.startX) * dragRatio);
  }
})[0];


