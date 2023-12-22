<template>
  <div class="q-pa-md mar">
    <q-layout>
      <q-table
        title="All Applicants"
        :rows="filteredApplicants"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:top-center>
          <q-toolbar>
            <q-toolbar-title> All Applications </q-toolbar-title>
          </q-toolbar>
        </template>

        <template v-slot:top-right>
          <select
            class="filter-model"
            v-model="filter"
            @change="handleFilterChange"
          >
            <option value="" disabled selected>Status</option>
            <option
              v-for="option in filterOptions"
              :key="option"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
          <q-input v-model="search" label="Search" outlined dense />
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip
              :color="getStatusColor(props.row.status)"
              text-color="white"
              label
            >
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="green"
              label="Accept"
              dense
              @click="acceptApplicant(props.row.email)"
            />
            <q-btn
              color="red"
              label="Reject"
              dense
              @click="rejectApplicant(props.row.email)"
            />
          </q-td>
        </template>

        <template v-slot:body-cell-download="props">
          <q-td :props="props">
            <q-btn
              color="blue"
              label="Download"
              dense
              @click="downloadApplicant(props.row.email)"
            />
          </q-td>
        </template>
      </q-table>
    </q-layout>
  </div>
</template>

<script>
import { onMounted, computed, ref } from "vue";
import { useAuthStore } from "../store/auth";
import { storeToRefs } from "pinia";
export default {
  setup() {
    const {
      fetchApplicants,
      search,
      filterOptions,
      columns,
      getStatusColor,
      acceptApplicant,
      rejectApplicant,
      downloadApplicant,
    } = useAuthStore();
    const { applicants } = storeToRefs(useAuthStore());
    const filter = ref("");
    const filteredApplicants = computed(() => {
      let filteredList = applicants.value;

      // if (filter === "accepted") {
      //   filteredList = filteredList.filter(
      //     (applicant) => applicant.status === "accepted"
      //   );
      // } else if (filter === "pending") {
      //   filteredList = filteredList.filter(
      //     (applicant) => applicant.status === "pending"
      //   );
      // } else if (filter === "rejected") {
      //   filteredList = filteredList.filter(
      //     (applicant) => applicant.status === "rejected"
      //   );
      // }

      if (search) {
        const searchTerm = search.toLowerCase();
        filteredList = filteredList.filter((applicant) =>
          applicant.fullname.toLowerCase().startsWith(searchTerm)
        );
      }

      return filteredList;
    });

    const handleFilterChange = () => {
      console.log("Filter changed:", filter.value);
      fetchApplicants(filter.value);

      // setFilter(filter.value);
    };

      onMounted(() => {
        fetchApplicants("");
      });

    return {
      filter,
      search,
      filterOptions,
      columns,
      getStatusColor,
      acceptApplicant,
      rejectApplicant,
      downloadApplicant,
      filteredApplicants,
      handleFilterChange,
    };
  },
};
</script>

<style scoped>
.mar {
  overflow-y: auto;
}
.filter-model {
  height: 40px;
  margin-right: 5px;
}
</style>
