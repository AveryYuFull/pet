<template>
  <div id="app">
    <head-bar />
    <router-view/>
    <dialog-component ref='dialog' />
  </div>
</template>

<script>
import HeadBar from './components/HeadBar'
import DialogComponent from './components/DialogComponent'

export default {
  name: 'App',
  components: {
    'head-bar': HeadBar,
    'dialog-component': DialogComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
