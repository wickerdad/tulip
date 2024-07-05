# tulip :tulip:

Tulip is a lightweight utility for making simple tooltips that respond to their position in the viewport.

In an effort to be more [accessible](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role), the tooltips utilize `aria-describedby`, stay open when the mouse moves over them, and close when the `Escape` key is pressed.

Check out the example folder to see how tulip works.

## Usage

### HTML

Include the `tulip.js` or `tulip.min.js` file in your HTML file.

```javascript
<script src="tulip.js"></script>
```

Then, set up the element you want the tooltip to display for. This element needs the `aria-describedby` attribute and the `tulip` class. Be sure that you're using a unique name for `aria-describedby`, this needs to match the `id` on the `tulip-wrap` element.

> **Note:** If you're using a non-focusable element, you'll want to add `tabindex="0"` to the parent element.

```html
<button aria-describedby="saucer-tip" class="tulip">
    <i class="ph ph-flying-saucer"></i>
</button>
```

Next, add a wrapper that will hold the tooltip text. The wrapper needs to have the `tooltip` role, the `tulip-wrap` class, and an `id` that matches the parent's `aria-describedby`.

```html
<button aria-describedby="saucer-tip" class="tulip">
    <i class="ph ph-flying-saucer"></i>
    <span role="tooltip" id="saucer-tip" class="tulip-wrap">

    </span>
</button>
```

Last, add an element for the actual tooltip text. This just needs the `tulip-text` class.

```html
<button aria-describedby="saucer-tip" class="tulip">
    <i class="ph ph-flying-saucer"></i>
    <span role="tooltip" id="saucer-tip" class="tulip-wrap">
        <span class="tulip-text">Flying saucer</span>
    </span>
</button>
```

### CSS

The styles required to set up tulip are as follows:

```css
.tulip {
  position: relative;
}

.tulip-wrap {
  display: block;
  position: absolute;
  width: 0;
  max-width: min(90vw, 25ch);
  /* max-width is the only value you should change */
  height: auto;
  transition-property: opacity visibility transform;
  visibility: hidden;
  opacity: 0;
  overflow: clip;
  z-index: 10;
}

.tulip-wrap.show {
  visibility: visible;
  opacity: 1;
  overflow: visible;
}
```

You can then style `.tulip-text` however you like:

```css
.tulip-text {
  display: block;
  position: relative;
  padding: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  line-height: 1.3em;
  color: #0d0d0d;
  border: 2px solid #e6e6e6;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0px 3px 9px -3px rgba(0, 0, 0, 0.1);
}
```

### JS

Set up `mouseenter` and `focusin` listeners for your tooltips in your main js file using the `tulip()` function.

The function takes in four arguments:
1. a reference to the element
2. delay `number`, default = `300`
3. transition `number`, default = `150`
4. distance `number` *(pixel value)*, default = `15`

```javascript
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
```

## Possible Caveats

There are a few things that could cause issues as you use tulip. These are all within the main `tulip()` function:
1. `overflowX` on the body is set to `hidden` as the tooltip is being shown. This is set back to `auto` once the tooltip is visible, but this could cause unintended scrollbar behavior, especially if you have horizontally scrolling content.
2. `max-content` is used to size `tulip-wrap`. This is [well supported](https://caniuse.com/mdn-css_properties_width_max-content), but may be something to watch for.