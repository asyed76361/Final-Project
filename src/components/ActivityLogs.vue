<template>
  <div class="q-pa-md mar">
    <q-table
      title="User Logs"
      :rows="activityLogs"
      :columns="columns"
      row-key="id"
    >
    
      <template v-slot:top-center>
        <q-toolbar>
          <q-toolbar-title> Uses Logs </q-toolbar-title>
        </q-toolbar>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useAuthStore } from "../store/auth";
import { onMounted } from "vue";

export default {
  setup() {
    const { activityLogs, fetchActivityLogs } = useAuthStore();

    const columns = [
      {
        name: "id",
        label: "ReqId",
        align: "left",
        field: "id",
        sortable: true,
      },
      {
        name: "firstName",
        label: "Username",
        align: "left",
        field: "firstName",
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
        name: "reqBody",
        label: "req.Body",
        align: "left",
        field: "reqBody",
        sortable: true,
      },
      {
        name: "endpoint",
        label: "endPoint",
        align: "left",
        field: "endpoint",
        sortable: true,
      },
      {
        name: "reqStatusCode",
        label: "req.StatusCode",
        align: "left",
        field: "reqStatusCode",
        sortable: true,
      },
      {
        name: "createdAt",
        label: "createdAt",
        align: "left",
        field: "createdAt",
        sortable: true,
      },
    ];
    onMounted(() => {
      fetchActivityLogs();
    });
    return {
      activityLogs,
      columns,
    };
  },
};
</script>
<style scoped>
.mar {
  overflow-y: auto;
}
</style>
