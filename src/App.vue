<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<style lang="postcss">
/* reset */
html, body, div, p, h1, h2, h3, h4, h5, ol, ul, li, dl, dt, dd, form, input, textarea, select, span, table, tr, td, img, blockquote, button {
  margin: 0;
  padding: 0;
  border: 0;
}

html, body {
  height: 100%;
  font-size: 16px;
  color: #282828;
}

*:focus, *:hover {
  outline: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
}

ul, ol, li {
  list-style: none;
}

a {
  text-decoration: none;
  cursor: pointer;
  color: inherit;
}

.clearfix::after {
  content: '';
  clear: both;
  display: block;
}
</style>
