'use strict';

window.Webflow ||= [];
window.Webflow.push(() => {});

//Start of ScrollTrigger animations
document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(ScrollTrigger);
});

// Link timelines to scroll position
function createScrollTrigger(triggerElement, timeline) {
  // Trigger for the top of the page
  ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top top',
    end: 'bottom bottom',
    markers: true,
    onLeaveBack: () => {
      timeline.progress(0);
      timeline.pause();
    },
  });

  // Trigger for entering the viewport (e.g., when the element is in the center of the page)
  ScrollTrigger.create({
    trigger: triggerElement,
    start: 'top 60%',
    end: 'bottom 80%',
    markers: true,
    onEnter: () => timeline.play(),
    onLeave: () => timeline.pause(),
  });

  // Trigger for when the element is scrolled out of view from the bottom
  ScrollTrigger.create({
    trigger: triggerElement,
    start: 'bottom bottom',
    markers: true,
    onLeave: () => {
      timeline.pause();
    },
  });
}

//Social image animations
$('.social-img, .event-social-icon').hover(
  function () {
    // On mouse enter (scale up from original)
    gsap.to($(this), {
      scale: 1.3,
      duration: 0.5,
      ease: 'power1.out',
    });
  },
  function () {
    // On mouse leave (scale back to orginal size)
    gsap.to($(this), {
      scale: 1,
      duration: 0.5,
      ease: 'power1.in',
    });
  }
);

// Animate button text on hover on all pages
const btn = gsap.utils.toArray('.button-primary');
btn.forEach((item) => {
  let span = item.querySelector('.button-text'); // Corrected class selector
  let tl = gsap.timeline({ paused: true });

  tl.to(span, { duration: 0.3, yPercent: -150, ease: 'power2.in' });
  tl.set(span, { yPercent: 150 });
  tl.to(span, { duration: 0.3, yPercent: 0 });

  // Trigger text animation on hover
  item.addEventListener('mouseenter', () => tl.play(0));
  item.addEventListener('mouseleave', () => tl.reverse()); // Reverse on mouseleave
});

// Split text into words and characters for elements with the data-words-slide-from-right and data-words-slide-from-left attributes
const splitTextRight = new SplitType('[data-words-slide-from-right]', {
  types: 'words, chars',
});
const splitTextLeft = new SplitType('[data-words-slide-from-left]', {
  types: 'words, chars',
});
// Split text into words and characters for elements with the data-words-slide-up attribute
const splitText = new SplitType('[data-words-slide-up]', {
  types: 'words, chars',
});
// Split text into words and characters for elements with the data-words-slide-up attribute
const splitTextRandom = new SplitType('[data-letters-fade-in-random]', {
  types: 'words, chars',
});

window.onload = function () {
  // Animate each word sliding in from the right using ScrollTrigger
  $('[data-words-slide-from-right]').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%', // Animation starts when the top of the element hits 80% of the viewport
        end: 'top 50%', // Animation ends when the top of the element hits 50% of the viewport
        toggleActions: 'play none none reset', // Controls when the animation should play or reset
      },
    });

    // Animate words sliding from the right
    tl.from($(this).find('.word'), {
      opacity: 0,
      x: '1em', // Slide in from 1em to the right
      duration: 1.2,
      ease: 'power2.out',
      stagger: { amount: 0.6 }, // Stagger the animation for a smoother effect
    });
  });

  // Animate each word sliding in from the left using ScrollTrigger
  $('[data-words-slide-from-left]').each(function () {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%', // Animation starts when the top of the element hits 80% of the viewport
        end: 'top 50%', // Animation ends when the top of the element hits 50% of the viewport
        toggleActions: 'play none none reset', // Controls when the animation should play or reset
      },
    });

    // Animate words sliding from the left
    tl.from($(this).find('.word'), {
      opacity: 0,
      x: '-1em', // Slide in from 1em to the left
      duration: 1.2,
      ease: 'power2.out',
      stagger: { amount: 0.6 }, // Stagger the animation for a smoother effect
    });
  });
};

// Animate each word with a slide-up effect using ScrollTrigger
$('[data-words-slide-up]').each(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'top 80%', // Start the animation when the top of the element hits 80% of the viewport
      end: 'top 50%', // End the animation when the top of the element hits 50% of the viewport
      toggleActions: 'play none none reset', // Controls when to play or reset the animation
    },
  });

  // Animate the words (or characters if preferred) sliding up into view
  tl.from($(this).find('.char'), {
    opacity: 0,
    yPercent: 100, // Slide up effect
    duration: 0.5,
    ease: 'back.out(2)',
    stagger: { amount: 0.5 }, // Stagger animation for a smoother effect
  });
});

$('[data-letters-fade-in-random]').each(function () {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: 'top 80%', // Adjust this based on when you'd like the animation to start
      end: 'top 50%', // Adjust when to end the animation
      toggleActions: 'play none none reset', // Change the actions as needed
    },
  });

  // Animate the characters with a fade-in effect in random order
  tl.from($(this).find('.char'), {
    opacity: 0,
    duration: 0.07,
    ease: 'power1.out',
    stagger: { amount: 0.6, from: 'random' },
  });
});

//Slide from side animations
$(window).on('load', function () {
  $('.slide_from-right-side').each(function (index) {
    let slideFromSide = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
      },
    });
    slideFromSide.from($(this).children(), {
      x: 150, // Changed from -150 to 150 for right-side animation
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      delay: 0.4,
    });
  });


// Add a slight delay and refresh ScrollTrigger after DOM changes
setTimeout(() => {
  ScrollTrigger.refresh();
}, 1000); // You can adjust this delay if needed
});
