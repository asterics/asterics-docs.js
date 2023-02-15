<template>
  <div class="nav-item donate">
    <span class="donate__text">
      <svg
        class="donate__text__logo"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="OpenCollective"
        role="img"
        viewBox="0 0 512 512"
      >
        <path
          d="m409 255c0 30-9 59-24 83l61 62c30-40 49-91 49-145s-19-105-49-145l-61 62c15 24 24 52 24 83z"
          fill="#b8d3f4"
        ></path>
        <path
          d="m256 409c-84 0-153-69-153-154s69-154 153-154c31 0 59 9 83 25l61-62c-40-30-90-49-144-49-132 0-240 107-240 241s108 239 240 239c55 0 105-19 146-49l-61-62c-24 15-53 24-84 24z"
          fill="#3385ff"
        ></path>
      </svg>
      <a
        class="container"
        title="Support AsTeRICS Foundation on opencollective.com"
        href="https://opencollective.com/asterics-foundation"
        target="_blank"
      >
        Donate
      </a>
    </span>
    <div class="donate__logo">
      <a
        class="container"
        title="Support AsTeRICS Foundation on opencollective.com"
        href="https://opencollective.com/asterics-foundation"
        target="_blank"
      >
        <img src="https://opencollective.com/webpack/donate/button@2x.png?color=blue" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "OpenCollective",
};
</script>

<style lang="stylus" scoped>
// .container
//   display block
//   border-bottom 1px solid $borderColor
//   & > img
//     display block
//     // max-width 250px
//     width 80%
//     margin auto
//     padding 1rem

.donate
  display inline-block

  .donate__text
    display inline-block
    line-height 1.4rem

    .donate__text__logo
      vertical-align middle
      width 1.4rem
      padding-right 0.4rem
      padding-bottom 0.2rem

  .donate__logo
    display none
    padding 0
    img
      width calc(100% - 1.5rem)


@media (max-width: $MQMobile)
  .donate
    border-bottom 1px solid $borderColor
    padding-top 0 !important
    .donate__text
      display none
    .donate__logo
      display block
</style>
