const tulips = document.querySelectorAll('.tulip');
tulips.forEach((tip) => {
  // handle mouseenter
  tip.addEventListener('mouseenter', (e) => {
    tulip(e.target);
  });
  // handle focusin
  tip.addEventListener('focusin', (e) => {
    tulip(e.target, 0, 0);
  });
});