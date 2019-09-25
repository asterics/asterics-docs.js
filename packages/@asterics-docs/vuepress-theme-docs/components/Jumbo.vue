<template>
  <div>
    <br />
    <b-jumbotron class="jumbo" text-variant="black" fluid>
      <template slot="header">
        <span class="jumbo-header">{{jumbo.title}}</span>
      </template>
      <template slot="lead">
        <span class="jumbo-body">{{jumbo.lead}}</span>
      </template>
      <p class="jumbo-footer">{{jumbo.footer}}</p>
      <b-button class="jumbo-btn" variant="primary" href="./solutions/">Discover Solutions</b-button>
      <b-button class="jumbo-btn" variant="info" href="get-started/">Get Started</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  computed: {
    jumbo() {
      return this.$page.frontmatter.jumbotron;
    }
  }
};
</script>

<style lang="stylus" scoped>
.jumbo-header {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #000;
  overflow-wrap: break-word;
  box-sizing: border-box;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 4.5rem;
  font-weight: 300;
  line-height: 1.2;
}

.jumbo-body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #000;
  overflow-wrap: break-word;
  box-sizing: border-box;
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.7;
  font-size: 1.25rem;
  font-weight: 300;
}

.jumbo-footer {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
  font-weight: 400;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 16px;
  color: #000;
  overflow-wrap: break-word;
  box-sizing: border-box;
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.7;
}
</style>