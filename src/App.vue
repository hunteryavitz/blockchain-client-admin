<script setup lang="ts">
import ValidityChart from "@/components/ValidityChart.vue";
import ReadinessChart from "@/components/ReadinessChart.vue";
import LivenessChart from "@/components/LivenessChart.vue";
import NodeChart from "@/components/NodeChart.vue";
import HealthChart from "@/components/HealthChart.vue";
import ProductionChart from "@/components/ProductionChart.vue";
</script>

<template>

  <div class="nav-bar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/blockchain-admin">Blockchain Admin</RouterLink>
    <RouterLink to="/service-admin">Service Admin</RouterLink>
    <RouterView />
  </div>

<!--  <header>-->
<!--    <main class="wrapper">-->
<!--      <HelloWorld msg="Blockchain Admin Panel" />-->
<!--      <br />-->
<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--        <RouterLink to="/blockchain-admin">Blockchain Admin</RouterLink>-->
<!--        <RouterLink to="/service-admin">Service Admin</RouterLink>-->
<!--      </nav>-->
<!--      <br />-->
<!--      <RouterView />-->
<!---->
<!--      <div>-->
<!--        <Counter class="ui-component" />-->
<!--        <ReadinessCheck class="ui-component" />-->
<!--      </div>-->
<!--      <div>-->
<!--        <RouterView />-->
<!--      </div>-->
<!--    </main>-->
<!--  </header>-->
<!--    <img class="img-component" alt="blockchain" src="@/assets/chain.png" width="512" />-->
<!--  <PolarChart />-->

  <div class="hero">
    <HealthChart />
    <NodeChart />
    <LivenessChart />

    <ValidityChart />
    <ProductionChart />
    <ReadinessChart />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.hero {
  display: contents;
  background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 50%,
      rgba(0, 0, 0, 1) 100%
  );
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

.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  height: 100px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
