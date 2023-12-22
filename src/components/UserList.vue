<template>
  <div class="q-pa-md mar">
    <q-table
      title="Users List"
      :rows="filteredUsers"
      :columns="columnsWithAction"
      row-key="id"
    >
      <template v-slot:top-center>
        <q-toolbar>
          <q-toolbar-title> Users List </q-toolbar-title>
        </q-toolbar>
      </template>

      <template v-slot:top-right>
        <q-input v-model="search" label="Search" outlined dense />
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-icon
            v-if="!props.row.isVerified"
            name="email"
            class="cursor-pointer"
            @click="sendEmail(props.row.email)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../store/auth";
import instance from "@/helper/http-config";

const authStore = useAuthStore();

const columns = [
  { name: "id", label: "ID", align: "left", field: "id", sortable: true },
  {
    name: "firstName",
    label: "First Name",
    align: "left",
    field: "firstName",
    sortable: true,
  },
  {
    name: "lastName",
    label: "Last Name",
    align: "left",
    field: "lastName",
    sortable: true,
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
    sortable: true,
  },
  {
    name: "isVerified",
    label: "Is Verified",
    align: "left",
    field: "isVerified",
    sortable: true,
  },
  {
    name: "isAdmin",
    label: "Is Admin",
    align: "left",
    field: "isAdmin",
    sortable: true,
  },
];

const search = ref("");

const columnsWithAction = computed(() => {
  return columns.concat({
    name: "action",
    label: "Action",
    align: "left",
    "body-cell-name": "body-cell-action",
  });
});

const filteredUsers = computed(() => {
  const searchTerm = search.value.toLowerCase().trim();
  return searchTerm
    ? authStore.users.filter(
        (user) =>
          user.firstName.toLowerCase().startsWith(searchTerm) ||
          user.firstName.toLowerCase().includes(` ${searchTerm}`)
      )
    : authStore.users;
});

const sendEmail = async (email) => {
  try {
    const token = authStore.token;
    const response = await instance.get(
      "auth/reminder-email",
      {
        params: {
          email,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      console.log(`Email sent to ${email} successfully`);
      alert(`Email sent to ${email} successfully`);
    } else {
      console.error(`Failed to send email to ${email}:`, response.data.message);
      alert(`Failed to send email to ${email}: ${response.data.message}`);
    }
  } catch (error) {
    console.error(`Sending email to ${email} error:`, error);
    alert(`Sending email to ${email} error: ${error.message}`);
  }
};

onMounted(() => {
  authStore.fetchUsers();
  console.log("Users:", authStore.users);
});
</script>

<style scoped>
.mar {
  overflow-y: auto;
}
</style>
