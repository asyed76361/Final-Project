<template>
  <div class="forgot-page">
    <form class="black-border-form">
      <img class="imag" src="..\assets\lock4.png" />
      <h2 class="forgot-heading">Create Your Password</h2>
      <h6 class="forgot-heading2">
        Enter your password and confirm your password to join
      </h6>
      <q-input
        v-model="store.password"
        type="password"
        label="Password"
        :dense="store.dense"
        input-class="custom-input"
      >
        <template v-slot:prepend>
          <q-icon name="password" style="color: #537895" />
        </template>
      </q-input>
      <q-input
        v-model="store.confirmPassword"
        type="password"
        label="Confirm Password"
        :dense="store.dense"
        input-class="custom-input"
      >
        <template v-slot:prepend>
          <q-icon name="password" style="color: #537895" />
        </template>
      </q-input>
      <q-btn
        label="Submit"
        type="submit"
        class="q-mt-md q-mb-md"
        style="
          background-color: #537895;
          color: white;
          width: 170px;
          margin: 20px auto;
        "
        @click="submitPassword"
      />
    </form>
  </div>
</template>

<script setup>
import { useCreatePasswordStore } from "../store/createPasswordStore";
import { useRoute } from 'vue-router';

const store = useCreatePasswordStore();
const route = useRoute();

store.email = route.query.email; 

const submitPassword = (event) => {
  store.submitPassword();
  event.preventDefault();
};
</script>

<style scoped>
.forgot-page {
  background-size: cover;
  background-position: center;
  height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
}
.imag {
  width: 290px;
  height: 220px;
  margin-top: 20px;
  margin-top: -50px;
  margin-bottom: -90px;
}
.forgot-heading {
  font-size: 25px;
  color: #537895;
  text-align: left;
}
.my-card {
  width: 100%;
}
@media (min-width: 600px) {
  .my-card {
    max-width: 400px;
    /* width: 100%; */
  }
}
@media (max-width: 599px) {
  .my-card {
    max-width: 400px;
    /* width: 100%; */
  }
}
form {
  display: flex;
  background-color: white;
  flex-direction: column;
}
.forgot-heading2 {
  font-size: small;
  margin-top: -15px;
}
.forgot-heading3 {
  font-size: small;
  margin-top: -40px;
}
.black-border-form {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(78, 73, 73); 
  padding: 20px;
  max-width: 350px;
  min-height: 500px;
}
</style>
