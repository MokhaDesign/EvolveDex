<template>
  <div id="pokeballSvgWrapper">
    <svg id="pokeballSvg" display="block"
         height="100"
         preserveAspectRatio="xMidYMid meet" viewBox="0 0 500 500" width="100"
         xmlns="http://www.w3.org/2000/svg">

      <metadata>
        Created by potrace 1.16, written by Peter Selinger 2001-2019
      </metadata>
      <defs>
        <filter id="f1" x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5"/>
        </filter>
      </defs>
      <g
          fill="rgba(250, 250, 250, 0.03)"
          stroke="none" transform="translate(0, 500) scale(0.1,-0.1)">
        <path d="M2340 4630 c-906 -69 -1667 -702 -1904 -1581 -23 -86 -44 -196 -61
-321 l-6 -48 543 0 543 0 22 86 c58 224 199 434 385 574 318 240 728 284 1084
116 50 -24 120 -63 155 -86 81 -54 212 -186 268 -269 62 -91 129 -238 153
-336 l21 -85 544 0 544 0 -6 48 c-38 279 -98 487 -204 706 -309 637 -932 1089
-1626 1180 -146 20 -326 26 -455 16z" filter="url(#f1)"/>
        <path d="M2355 3186 c-142 -34 -251 -93 -349 -192 -234 -233 -273 -605 -92
-877 88 -132 222 -235 373 -285 67 -22 96 -26 208 -26 109 -1 142 3 205 22
288 90 483 339 497 637 16 321 -180 604 -484 702 -97 31 -266 40 -358 19z" filter="url(#f1)"/>
        <path d="M375 2273 c16 -121 47 -277 70 -358 235 -814 923 -1412 1761 -1531
156 -22 440 -22 589 0 619 92 1144 424 1486 940 189 284 293 571 344 949 l6
47 -544 0 -545 0 -7 -37 c-3 -21 -18 -72 -31 -113 -178 -535 -739 -837 -1284
-689 -92 25 -235 92 -321 149 -82 56 -213 187 -269 269 -62 92 -128 238 -152
336 l-21 85 -544 0 -544 0 6 -47z" filter="url(#f1)"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "PokeballBackground",
  data() {
    return {
      window: {
        width: 0,
        height: 0
      },
      svg: null,
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
      if (document.getElementById('pokeballSvg')) {
        this.svg = document.getElementById('pokeballSvg')

        this.svg.setAttribute('width', this.window.width)
        this.svg.setAttribute('height', this.window.height)
      }
    },
  },
}
</script>

<style scoped>
svg {
  -webkit-transition: all .314s ease-in-out;
  -moz-transition: all .314s ease-in-out;
  -ms-transition: all .314s ease-in-out;
  -o-transition: all .314s ease-in-out;
  transition: all .314s ease-in-out;
}
</style>