<template>
  <q-layout>
    <div
      class="nav-bar"
      style="
        background-color: #537895;
        height: 70px;
        display: flex;
        align-items: center;
        padding: 10px 20px 10px;
      "
    >
      <div style="margin-right: auto">
        <div style="margin-right: 10px; color: #fff">
          Welcome To Dashboard {{ authStore.firstName }} {{ authStore.lastName }}
        </div>
      </div>

      <div style="display: flex; align-items: center">
        <!-- New "Change Password" button -->
        <button
          @click="changePassword"
          style="
            background-color: #fff;
            color: #537895;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
          "
        >
          Change Password
        </button>

        <!-- "Logout" button -->
        <button
          @click="logout"
          style="
            background-color: #fff;
            color: #537895;
            border: none;
            padding: 5px 10px;
            border-radius: 5px;
            cursor: pointer;
          "
        >
          Logout
        </button>
      </div>
    </div>

    <div class="columns">
      <!-- First Column (width: 4) -->
      <q-layout-section
        class="col-4"
        style="background-color: #537895; border-right: 1px solid #fff"
      >
        <div
          style="
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          "
        >
          <router-link
            to="/DashboardView/CreateUser"
            class="rot"
            v-if="authStore.isAdmin"
          >
            Create User
          </router-link>
          <router-link
            to="/DashboardView/ApplicantsList"
            class="rot"
          >
            Applicant List
          </router-link>
          <router-link
            to="/DashboardView/ActivityLogs"
            class="rot"
            v-if="authStore.isAdmin"
          >
            Activity Log
          </router-link>
          <router-link
            to="/DashboardView/UserList"
            class="rot"
          >
            User List
          </router-link>
        </div>
      </q-layout-section>

      <!-- Second Column (width: 8) -->
      <q-layout-section class="col-8">
        <router-view></router-view>
      </q-layout-section>
    </div>
  </q-layout>
</template>

<style scoped>
.q-layout {
  max-height: 95vh;
  display: flex;
  flex-direction: column;
}

.columns {
  display: flex;
}

.col-4 {
  width: 23.33%;
  height: 93vh;
}

.rot {
  color: #fff;
  border-bottom: 1px solid #fff;
  margin-top: 5px;
  padding: 10px;
  text-decoration: none;
}

.col-8 {
  width: 76.66%;
  max-height: 90vh;
  overflow: hidden;
}

@media (max-width: 425px) {
  .rot {
    font-size: 11px;
    padding: 0;
  }
}

.nav-bar {
  width: 100%;
}
</style>

<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  localStorage.removeItem("token");
  authStore.isAuthenticated = false;
  authStore.isAdmin = false;
  authStore.firstName = "";
  authStore.lastName = "";
  authStore.applicants = [];
  authStore.activityLogs = [];
  router.push("/");
};

const changePassword = () => {
  router.push({ name: "ChangePassword" });
};
</script>
