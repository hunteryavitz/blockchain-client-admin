<script setup lang="ts">
import Readiness from "@/components/Readiness.vue";
import ValidityChart from "@/components/ValidityChart.vue";
import PlanetChart from "@/components/PlanetChart.vue";
</script>

<template>
  <header>
    <main class="wrapper">
<!--      <HelloWorld msg="Blockchain Admin Panel" />-->
      <br />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/blockchain-admin">Blockchain Admin</RouterLink>
        <RouterLink to="/service-admin">Service Admin</RouterLink>
      </nav>
      <br />
      <RouterView />

      <!--      <div>-->
<!--        <Counter class="ui-component" />-->
<!--        <ReadinessCheck class="ui-component" />-->
<!--      </div>-->
<!--      <div>-->
<!--        <RouterView />-->
<!--      </div>-->
    </main>
  </header>

<!--  <PolarChart />-->

  <main>
<!--    <img class="img-component" alt="blockchain" src="@/assets/chain.png" width="512" />-->
    <Readiness />
    <ValidityChart />
    <PlanetChart />
  </main>
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
  width: 100%;
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
