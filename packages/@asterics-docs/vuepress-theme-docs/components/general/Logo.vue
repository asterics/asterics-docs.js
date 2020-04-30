<template>
  <svg
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 458.32377 450.19883"
    id="asterics-logo"
  >
    <g transform="translate(-573.69531,-758.69136)">
      <g transform="matrix(4.1999887,0,0,4.1999887,-2248.6971,-580.62625)">
        <path
          id="back"
          :fill="back"
          d="m 686.75,400.57649 c 3.625,-10.25 6,-81.625 22.75,-81.625 18.25,-2.5 39,67.375 71.625,73.5 -27.75,1.25 -60.91114,-69.6709 -70.86905,-69.56548 C 699.52953,322.95091 689,398.70149 686.75,400.57649 Z"
        />
        <path
          id="front"
          :fill="front"
          d="m 672,426.07649 c 65.5,-42.375 116.25,-118.75 66,-83.75 45.75,-38.75 25.375,32.25 -66,83.75 z"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: "Logo",
  props: {
    back: {
      type: String,
      default: "#000",
    },
    front: {
      type: String,
      default: "#0ea1d2",
    },
  },
};
</script>

<style lang="stylus" scoped></style>
