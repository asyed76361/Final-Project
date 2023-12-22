<!-- ForgotPassword.vue -->
<template>
  <div class="forgot-page">
    <form @submit.prevent="forgotPassword" class="black-border-form">
      <img class="imag" src="../assets/logo.jpg" />
      <h2 class="forgot-heading">Trouble logging in?</h2>
      <h6 class="forgot-heading2">Enter your email and we'll send you a link to get</h6>
      <h6 class="forgot-heading3">back into your account.</h6>
      <q-input
        bottom-slots
        v-model="email"
        label="Email"
        :dense="dense"
        input-class="custom-input"
      >
        <template v-slot:prepend>
          <q-icon name="email" style="color: #537895" />
        </template>
      </q-input>
      <q-btn
        label="Send Login Link"
        type="submit"
        class="q-mt-md q-mb-md"
        style="
          background-color: #537895;
          color: white;
          width: 170px;
          margin: 0 auto;
        "
      />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useForgotPasswordStore } from '../store/forgotPassword';

const email = ref('');
const dense = ref(true);
const forgotPasswordStore = useForgotPasswordStore();

const forgotPassword = async () => {
  try {
    if (!validateEmail(email.value)) {
      alert('Please enter a valid email address.');
      return;
    }

    const response = await forgotPasswordStore.sendForgotPasswordLink(email.value);

    alert(response.message);
  } catch (error) {
    alert('An error occurred. Please try again.');
    console.error('Forgot password error:', error);
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
.imag{
    width: 200px;
    height: 120px;
    margin-top: 20px;
    margin-left: 14%;
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
.forgot-heading2{
    font-size: small;
    margin-top: -15px;
}
.forgot-heading3{
    font-size: small;
    margin-top: -40px;
}
.black-border-form {
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(78, 73, 73); /* Add this line for the black border */
  padding: 20px;
  max-width: 350px;
  min-height: 500px; /* Optional: Add padding for better appearance */
}
</style>
