<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Counter from "@/components/Counter.vue";
import ReadinessCheck from "@/components/ReadinessCheck.vue";
import PlanetChart from "@/components/PlanetChart.vue";
import PolarChart from "@/components/PolarChart.vue";
import Readiness from "@/components/Readiness.vue";
</script>

<template>
<!--  <header>-->
<!--    <main class="wrapper">-->
<!--      <HelloWorld msg="Blockchain Admin Panel" />-->
<!--      <br />-->
<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--      <br />-->
<!--      <div>-->
<!--        <Counter class="ui-component" />-->
<!--        <ReadinessCheck class="ui-component" />-->
<!--      </div>-->
<!--    </main>-->
<!--  </header>-->

  <Readiness />
  <div>
    Valid: INDICATOR
  </div>

<!--  <PlanetChart />-->
<!--  <PolarChart />-->

<!--  <main>-->
<!--    <img class="img-component" alt="blockchain" src="@/assets/chain.png" width="512" />-->
<!--    <RouterView />-->
<!--  </main>-->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

main {
  padding: 2rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  background-color: black;
}

.img-component {
  display: block;
  margin: 5rem;
  border: 1px solid white;
  border-radius: 0.5rem;
}

.ui-component {
  margin-bottom: 3rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
