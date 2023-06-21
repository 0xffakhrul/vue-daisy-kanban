<template>
  <div class="flex flex-col max-w-5xl mx-auto px-4">
    <HeaderComponent />
    <!-- <InputField /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import HeaderComponent from "./components/HeaderComponent.vue";
// import InputField from "./components/InputField.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    HeaderComponent,
    // InputField,
  },
};
</script>

<style>
</style>
