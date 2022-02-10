<template>
  <div class="error">
    <figure>
      <img
        src="http://localhost:8080/assets/900233-200.png"
        alt="Symbole d'erreur"
      />
    </figure>
    <h1>{{ this.error }}</h1>
  </div>
</template>
<script>
export default {
  name: "Error",
  props: ["error"],
};
</script>
<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  color: black;
}
</style>
