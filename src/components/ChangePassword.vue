<template>
    <div class="forgot-page">
      <form class="black-border-form">
        <img class="imag" src="..\assets\lock4.png" />
        <h2 class="forgot-heading">Change Your Password</h2>
        <h6 class="forgot-heading2">
          Enter your email, old password, new password, and confirm the new password to reset.
        </h6>
        <q-input
          v-model="email"
          label="Email"
          :dense="dense"
          input-class="custom-input"
        >
          <template v-slot:prepend>
            <q-icon name="email" style="color: #537895" />
          </template>
        </q-input>
        <q-input
          v-model="oldPassword"
          type="password"
          label="Old Password"
          :dense="dense"
          input-class="custom-input"
        >
          <template v-slot:prepend>
            <q-icon name="password" style="color: #537895" />
          </template>
        </q-input>
        <q-input
          v-model="password"
          type="password"
          label="New Password"
          :dense="dense"
          input-class="custom-input"
        >
          <template v-slot:prepend>
            <q-icon name="password" style="color: #537895" />
          </template>
        </q-input>
        <q-input
          v-model="confirmPassword"
          type="password"
          label="Confirm New Password"
          :dense="dense"
          input-class="custom-input"
        >
          <template v-slot:prepend>
            <q-icon name="password" style="color: #537895" />
          </template>
        </q-input>
        <q-btn
          label="Change Password"
          type="submit"
          class="q-mt-md q-mb-md"
          style="
            background-color: #537895;
            color: white;
            width: 170px;
            margin: 20px auto;
          "
          @click.prevent="submitPassword"
        />
      </form>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "../store/auth";
  
  export default {
    data() {
      return {
        email: "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
        dense: false,
      };
    },
    methods: {
      submitPassword() {
        const authStore = useAuthStore();
        authStore.changePassword({
          email: this.email,
          oldPassword: this.oldPassword,
          newPassword: this.password,
          confirmPassword: this.confirmPassword,
        });
      },
    },
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
  