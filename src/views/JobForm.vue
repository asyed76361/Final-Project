<template>
  <div class="job-page">
    <q-card-actions vertical align="center">
      <form @submit.prevent="submitForm" class="job-form">
        <img class="imag" src="..\assets\joblogo.png" />
        <h5 class="job-heading">Please Enter Your Information</h5>
        <div class="q-gutter-sm">
          <div class="input-row">
            <q-input
              bottom-slots
              v-model="formData.username"
              label="Full Name"
              label-color="#537895"
              text-color="#537895"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="person" style="color: #537895" />
              </template>
            </q-input>

            <q-input
              bottom-slots
              v-model="formData.email"
              label="Email"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="email" style="color: #537895" />
              </template>
            </q-input>
          </div>

          <div class="input-row">
            <q-input
              bottom-slots
              v-model="formData.qualification"
              label="Qualification"
              label-color="#537895"
              text-color="#537895"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="school" style="color: #537895" />
              </template>
            </q-input>

            <q-input
              bottom-slots
              v-model="formData.cnic"
              label="CNIC"
              label-color="#537895"
              text-color="#537895"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="address" style="color: #537895" />
              </template>
            </q-input>
          </div>

          <div class="input-row">
            <q-input
              bottom-slots
              v-model="formData.address"
              label="Address"
              label-color="#537895"
              text-color="#537895"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="house" style="color: #537895" />
              </template>
            </q-input>

            <q-input
              bottom-slots
              v-model="formData.phoneNumber"
              label="Phone Number"
              label-color="#537895"
              text-color="#537895"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="phone" style="color: #537895" />
              </template>
            </q-input>
          </div>

          <div class="input-row">
            <q-input
              bottom-slots
              v-model="formData.age"
              label="Age"
              label-color="#537895"
              text-color="#537895"
              :dense="dense"
              input-style="color:black"
              input-class="custom-input"
            >
              <template v-slot:prepend>
                <q-icon name="Age" style="color: #537895" />
              </template>
            </q-input>

            <q-file
              v-model="formData.cv"
              label="Upload CV"
              color="blue-grey-6"
              flat
              style="margin-top: -15px;"
            />
          </div>
        </div>
        <q-btn
          label="Submit"
          type="submit"
          class="q-mt-md q-mb-md numb"
          style="background-color: #537895; color: white; width: 70px"
        />
      </form>
    </q-card-actions>
  </div>
</template>

<script setup>
import { ref } from "vue";
import instance from "@/helper/http-config";

const formData = ref({
  username: "",
  email: "",
  qualification: "",
  cnic: "",
  address: "",
  phoneNumber: "",
  age: "",
  cv: null,
});

const dense = ref(true);

const submitForm = async () => {
  console.log({
    CV: formData.value.cv,
  });
  const formDataToSend = new FormData();
  formDataToSend.append("name", "value");
  formDataToSend.append("userName", formData.value.username);
  formDataToSend.append("email", formData.value.email);
  formDataToSend.append("cnic", formData.value.cnic);
  formDataToSend.append("address", formData.value.address);
  formDataToSend.append("qualification", formData.value.qualification);
  formDataToSend.append("age", formData.value.age);
  formDataToSend.append("phoneNumber", formData.value.phoneNumber);
  formDataToSend.append("cv", formData.value.cv);

  try {
    const response = await instance.post(
      "applicant/submit-form",
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200 && response.data.success) {
      alert("Form submitted successfully!");
    } else {
      const errorMessage =
        response.data.message || "Error submitting form. Please try again.";
      console.error("Form submission error:", errorMessage);
      alert(`Error submitting form: ${errorMessage}`);
    }
  } catch (error) {
    console.error("API error:", error);
    const errorMessage =
      error.response?.data?.message || "Error submitting form. Please try again.";
    alert(`Error submitting form: ${errorMessage}`);
  }
};


</script>


<style scoped>
.job-page {
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.job-form {
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid rgb(78, 73, 73);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.job-heading {
  font-size: small;
  margin-bottom: 5px;
  font-weight: bold;
  color: #537895;
  text-align: left;
}

.input-row {
  display: flex;
  gap: 40px;
}

.imag {
  width: 270px;
  height: 320px;
  margin-left: 21%;
  margin-bottom: -110px;
  margin-top: -35px;
}

/* Adjusted styling for small screens */
@media (max-width: 380px) {
  .imag {
    margin-left: auto;
    margin-right: auto;
  }
  .job-form {
    margin-top: 420px;
  }

  .input-row {
    flex-direction: column;
    gap: 10px;
  }
}

.numb {
  margin-left: 39%;
}

.custom-input::placeholder {
  color: white;
}
</style>
