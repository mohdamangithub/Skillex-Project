function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

init();

function imagesHoveCode() {
  var card = document.querySelectorAll(".card");
  var cardImgDiv = document.querySelectorAll(".card-img");
  var mainImgs = document.querySelector(".main_imgs");
  // console.log(card.length);
  Array.from(card).forEach((elements) => {
    // es code se jo bada img-txt hai vo opacity ho rahi hai
    card[0].children[0].children[1].children[1].style.opacity = "1";
    elements.addEventListener("mouseenter", () => {
      // jaise kis bhi box me enter hoga sabse pahle hi fist box ka big text Opacity zero ho jayega
      card[0].children[0].children[1].children[1].style.opacity = "0";

      // es loop se jaise mouse in hota hai sabka width 21% hoga
      for (let k = 0; k < card.length; k++) {
        card[k].style.width = "21%";
      }
      // es element ka matab jisme hover hua hai vo 58% rahe
      elements.style.width = "58%";

      // jaise hi mouse enter ho small txt box ke opacity 0 hoga
      elements.children[0].children[1].children[0].style.opacity = "0";
      // jaise hi mouse enter ho big txt box ke opacity 1 hoga
      elements.children[0].children[1].children[1].style.opacity = "1";
    });

    elements.addEventListener("mouseleave", () => {
      // jaise hi Mouse Leave hota again small txt box ke opacity 1 hota hai
      elements.children[0].children[1].children[0].style.opacity = "1";

      // jaise hi Mouse Leave hota again big txt box ke opacity 0 hota hai
      elements.children[0].children[1].children[1].style.opacity = "0";

      // jaise hi kahi se bhi mouse leave hota hai to es code se pahle wale box ka opacity wapis 1 ho jata hai
      card[0].children[0].children[1].children[1].style.opacity = "1";

      // es pahle wale card ka small box ko opacity 0 ho jata hai
      card[0].children[0].children[1].children[0].style.opacity = "0";

      // then ye loop again jaise hi kahi se bhi leave hota hai sabka width 21 or first wale ka 58% kart jo ki by default status pe pahuch tha hai
      for (let k = 0; k < card.length; k++) {
        card[k].style.width = "21%";
        card[0].style.width = "58%";
      }
    });
  });
}
imagesHoveCode();

