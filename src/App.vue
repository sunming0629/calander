<template>
  <router-view/>
</template>

<style>
@import url(./assets/iconfont/iconfont.css);
</style>
<style lang="scss">
body{
  padding: 0;
  margin: 0;
  background: transparent;
}
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgba($color: #000000, $alpha: 0.1);
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
