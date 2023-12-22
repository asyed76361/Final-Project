<template>
  <div class="login-page">
    <q-card-actions vertical align="center">
      <form @submit.prevent="login" class="login-form">
        <img class="imag" src="../assets/lock3.png" />
        <h2 class="login-heading">Login</h2>
        <q-input
          bottom-slots
          v-model="email"
          label="Enter Email"
          label-color="#537895"
          text-color="#537895"
          :dense="dense"
          input-style="color:black"
          input-class="custom-input"
        >
          <template v-slot:prepend>
            <q-icon name="email" style="color: #537895" />
          </template>
        </q-input>
        <q-input
          bottom-slots
          label-color="#537895"
          v-model="password"
          label="Enter Password"
          :dense="dense"
          input-style="color:black"
          input-class="custom-input"
          :type="showPassword ? 'text' : 'password'"
        >
          <template v-slot:prepend>
            <q-icon name="password" style="color: #537895" />
          </template>
          <!-- Add an eye icon to toggle password visibility -->
          <template v-slot:append>
            <q-icon
              :name="showPassword ? 'visibility_off' : 'visibility'"
              style="color: #537895; cursor: pointer"
              @click="togglePasswordVisibility"
            />
          </template>
        </q-input>
        <q-btn
          label="Login"
          type="submit"
          class="q-mt-md q-mb-md"
          style="
            background-color: #537895;
            color: white;
            width: 70px;
            margin: 0 auto;
          "
        />
        <div
          class="q-mt-md q-mb-md"
          style="color: #09203f; text-decoration: underline; cursor: pointer"
          @click="goToForgotPage"
        >
          Forgot Password
        </div>
      </form>
    </q-card-actions>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const email = ref("");
const password = ref("");
const showPassword = ref(false); // New ref for password visibility
const dense = ref(true);
const router = useRouter();
const authStore = useAuthStore();

const login = async () => {
  try {
    if (!email.value || !password.value) {
      alert("Please enter both email and password.");
      return;
    }
    const response = await authStore.login({
      email: email.value,
      password: password.value,
    });
    if (response.success) {
      alert("Login successful!");
      router.push("/DashboardView");
    } else {
      alert("Invalid email or password.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("An error occurred during login.");
  }
};

const goToForgotPage = () => {
  router.push("/ForgotPage");
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
.login-page {
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form {
  min-width: 320px;
  min-height: 450px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border: 1px solid rgb(78, 73, 73);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.login-heading {
  font-size: 35px;
  margin-bottom: 20px;
  color: #537895;
  text-align: left;
}
.imag {
  width: 250px;
  height: 270px;
  margin-bottom: -110px;
  margin-top: -70px;
}
.custom-input::placeholder {
  color: white;
}
</style>
