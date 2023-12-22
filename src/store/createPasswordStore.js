// createPasswordStore.js
import { defineStore } from "pinia";
import router from "../router";
import instance from "@/helper/http-config";

export const useCreatePasswordStore = defineStore({
  id: "createPassword",
  state: () => ({
    password: "",
    confirmPassword: "",
    dense: true,
    email: "",
  }),
  actions: {
    validateForm() {
      if (!this.password || !this.confirmPassword) {
        alert("Please fill in both password fields.");
        return false;
      }

      if (this.password !== this.confirmPassword) {
        alert("Password and Confirm Password do not match.");
        return false;
      }

      return true;
    },
    async submitPassword() {
      if (!this.validateForm()) {
        return;
      }

      if (!this.email) {
        console.error("Email is undefined or null.");
        return;
      }

      // Prepare form data
      const formData = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
    
      try {
        const response = await instance.patch(`auth/set-password`, formData);
        if (response.status === 200 && response.data.success) {
          alert("Password submitted successfully!");
          router.push({ name: "LoginPage" });
        } else {
          const errorMessage =
            response.data.message || "Error submitting password. Please try again.";
          console.error("Password submission error:", errorMessage);
          alert(`Error submitting password: ${errorMessage}`);
        }
      } catch (error) {
        console.error("API error:", error);
        const errorMessage =
          error.response?.data?.message || "Error submitting password. Please try again.";
        alert(`Error submitting password: ${errorMessage}`);
      }
    },
  },
});