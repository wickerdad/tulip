function tulip(element, delay = 300, transition = 150, distance = 15) {
  /* distance is in pixels to make position more accurate */

  // hide tooltip when element is clicked
  element.addEventListener('click', hideOnClick);

  // add keydown listener for document
  document.addEventListener('keydown', escape);

  // stop x overflow on body
  document.body.style.overflowX = 'hidden';

  let ontext = false;

  // show tooltip on delay
  let timeout = setTimeout(() => {
    // show tooltip
    wrap.classList.add('show');
    // update tooltip position
    wrap.style['transform'] = styles['transform'];
    // reset x overflow on body
    document.body.style.overflowX = 'auto';
  }, delay);

  // get wrap reference
  const wrap = element.querySelector('.tulip-wrap');

  // add listeners for wrap
  wrap.addEventListener('mouseenter', mouseovertext);
  wrap.addEventListener('mouseleave', mouseleavetext);
  // set initial wrap styles
  wrap.style.width = 'max-content';
  wrap.style.transitionDuration = `${transition}ms`;

  // get position styles
  const styles = position(element, wrap, distance);
  // loop through and apply position styles
  for (const style in styles) {
    if (style != 'transform') {
      wrap.style[style] = styles[style];
    }
  }

  // hide tooltip
  element.addEventListener('mouseleave', hide);
  element.addEventListener('blur', hide);

  function hide() {
    // check if hovering over the wrap
    if (ontext === false) {

      clearTimeout(timeout);
      timeout = null;

      // hide tooltip if it exists
      const wrap = element.querySelector('.tulip-wrap');
      wrap.classList.remove('show');
      wrap.style.transform = '';
      // wait for transition to finish
      setTimeout(() => {
        // remove event listeners
        element.removeEventListener('mouseleave', hide);
        element.removeEventListener('blur', hide);
        wrap.removeEventListener('mouseenter', mouseovertext);
        wrap.removeEventListener('mouseleave', mouseleavetext);
        document.removeEventListener('keydown', escape);
        element.removeEventListener('click', hideOnClick);
      }, transition);

    }
  }

  function mouseovertext() { ontext = true; }
  function mouseleavetext() { ontext = false; }
  function escape(e) { if (e.key === 'Escape') { hide(); } }
  function hideOnClick() { hide(); }

}


function position(tulip, wrap, distance) {
  const vh = window.innerHeight - document.documentElement.clientHeight;
  const vw = window.innerWidth - document.documentElement.clientWidth;
  const tipPos = tulip.getBoundingClientRect();
  const tipHalfWidth = tipPos.width / 2;
  const textPos = wrap.getBoundingClientRect();
  const textHalfWidth = textPos.width / 2;

  let styles = {};
  let x;
  let y;

  // x position
  if (tipPos.x + tipHalfWidth < vw - textHalfWidth && tipPos.x + tipHalfWidth > textHalfWidth) {
    x = 'middle';
  } else if (tipPos.x + tipHalfWidth > vw - textPos.width) {
    x = 'right';
  } else if (tipPos.x + tipHalfWidth < textPos.width) {
    x = 'left';
  }

  // y position
  if (tipPos.y < textPos.height + distance) {
    y = 'top';
  } else if (tipPos.y + tipPos.height > vh - textPos.height) {
    y = 'bottom';
  } else {
    y = 'middle';
  }

  // set position
  const position = `${y}-${x}`;

  // set styles
  switch (position) {
    case 'top-left':
      styles.paddingTop = `${distance}px`
      styles.left = "0";
      styles.top = `calc(100% - ${distance}px)`;
      styles.transform = `translateY(${distance}px)`;
      break;
    case 'top-middle':
      styles.paddingTop = `${distance}px`
      styles.left = "50%";
      styles.top = `calc(100% - ${distance}px)`;
      styles.translate = "-50% 0%";
      styles.transform = `translateY(${distance}px)`;
      break;
    case 'top-right':
      styles.paddingTop = `${distance}px`
      styles.right = "0";
      styles.top = `calc(100% - ${distance}px)`;
      styles.transform = `translateY(${distance}px)`;
      break;
    case 'middle-left':
    case 'bottom-left':
      styles.paddingBottom = `${distance}px`
      styles.left = "0";
      styles.bottom = `calc(100% - ${distance}px)`;
      styles.transform = `translateY(-${distance}px)`;
      break;
    case 'middle-middle':
    case 'bottom-middle':
      styles.paddingBottom = `${distance}px`
      styles.left = "50%";
      styles.bottom = `calc(100% - ${distance}px)`;
      styles.translate = "-50% 0%";
      styles.transform = `translateY(-${distance}px)`;
      break;
    case 'middle-right':
    case 'bottom-right':
      styles.paddingBottom = `${distance}px`
      styles.right = "0";
      styles.bottom = `calc(100% - ${distance}px)`;
      styles.transform = `translateY(-${distance}px)`;
      break;
  }
  return styles;
}