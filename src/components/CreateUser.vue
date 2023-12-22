<template>
  <div class="createuser-page">
    <q-card-actions vertical align="center">
      <form class="createuser-form">
        <img class="imag" src="..\assets\createlogo2.png" />
        <q-input
          bottom-slots
          label-color="#537895"
          v-model="firstName"
          label="First Name"
          :dense="dense"
          input-style="color:black"
          input-class="custom-input"
          type="text"
        >
          <template v-slot:prepend>
            <q-icon name="person" style="color: #537895" />
          </template>
        </q-input>
        <q-input
          bottom-slots
          label-color="#537895"
          v-model="lastName"
          label="Last Name"
          :dense="dense"
          input-style="color:black"
          input-class="custom-input"
          type="text"
        >
          <template v-slot:prepend>
            <q-icon name="person" style="color: #537895" />
          </template>
        </q-input>
        <q-input
          bottom-slots
          v-model="email"
          label="Email"
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
        <q-btn
          label="Create"
          type="button"
          class="q-mt-md q-mb-md"
          style="
            background-color: #537895;
            color: white;
            width: 70px;
            margin: 0 auto;
          "
          @click="submitForm"
        />
      </form>
    </q-card-actions>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { ref } from "vue";

const { createUser } = useAuthStore();
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const dense = ref(true);

const submitForm = () => {
  createUser({ firstName: firstName.value, lastName: lastName.value, email: email.value });
};
</script>

<style scoped>
.createuser-page {
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.createuser-form {
  max-width: 320px;
  max-height: 450px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border: 1px solid rgb(78, 73, 73);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.imag {
  width: 250px;
  height: 270px;
  margin-bottom: -80px;
  margin-top: -70px;
}
.custom-input::placeholder {
  color: white;
}
</style>
