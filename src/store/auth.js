import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";
import instance from "@/helper/http-config";
export const useAuthStore = defineStore({
  id: "auth",

  state: () => ({
    isAuthenticated: false,
    isAdmin: false,
    firstName: "",
    lastName: "",
    email: "",
    error: null,
    users: [],
    applicants: [],
    activityLogs: [],
    filter: "",
    token: "",
    filterOptions: ["", "accepted", "pending", "rejected"],
    columns: [
      { name: "id", label: "ID", align: "left", field: "id", sortable: true },
      {
        name: "userName",
        label: "Full Name",
        align: "left",
        field: "userName",
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
        name: "qualification",
        label: "Qualification",
        align: "left",
        field: "qualification",
        sortable: true,
      },
      {
        name: "phoneNumber",
        label: "Phone Number",
        align: "left",
        field: "phoneNumber",
        sortable: true,
      },
      {
        name: "status",
        label: "Status",
        align: "left",
        field: "status",
        sortable: true,
        "body-cell-name": "body-cell-status",
      },
      {
        name: "actions",
        label: "Actions",
        align: "left",
        "body-cell-name": "body-cell-actions",
      },
      {
        name: "download",
        label: "CV",
        align: "left",
        field: "download",
        "body-cell-name": "body-cell-download",
      },
    ],
  }),

  actions: {
    setFilter(newFilter) {
      console.log("Setting filter:", newFilter);
      this.filter = newFilter;
    },

    //Login Function

    async login({ email, password }) {
      try {
        const response = await instance.post("auth/login", {
          email,
          password,
        });
  
        if (response.status === 200 && response.data.success) {
          const { token, firstName, lastName, isAdmin } = response.data.data;
  
          console.log("Token from response:", token);
  
          try {
            localStorage.setItem("token", token);
            console.log(
              "Token saved to localStorage:",
              localStorage.getItem("token")
            );
          } catch (localStorageError) {
            console.error(
              "Error saving token to localStorage:",
              localStorageError
            );
            alert("Error saving token to localStorage:", localStorageError);
          }
  
          this.isAuthenticated = true;
          this.isAdmin = isAdmin;
          this.firstName = firstName;
          this.lastName = lastName;
          this.email = email;
          this.error = null;
          this.setToken(token);
  
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
          return { success: true, message: "Login successful!" };
        } else {
          console.error("Login error:", response.data.message);
          alert(`Login failed: ${response.data.message}`);
          throw new Error("Login failed");
        }
      } catch (error) {
        this.isAuthenticated = false;
        this.isAdmin = false;
        this.error = "Invalid email or password";
        console.error("Login error:", error);
        alert(`Login error: ${error.message}`);
        throw error;
      }
    },

    //Change passowrd
    async changePassword({ email, oldPassword, newPassword, confirmPassword }) {
      try {
        const token = this.token;
    
        const response = await instance.patch(
          "auth/change-password",
          {
            email,
            oldPassword,
            newPassword,
            confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        if (response.data.success) {
          alert("Password changed successfully!");
          router.push("/DashboardView");
        } else {
          const errorMessage =
            response.data.message || "Password change failed. Please try again.";
          alert(`Password change failed: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Password change error:", error);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during password change. Please try again.";
        alert(`An error occurred during password change: ${errorMessage}`);
      }
    },
    

    //Create user Function

    async createUser({ firstName, lastName, email }) {
      try {
        const token = this.token;
    
        const response = await instance.post(
          "auth/create-user",
          {
            firstName,
            lastName,
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        console.log("Request to create user:", response.request);
    
        if (response.data.success) {
          alert("User created successfully!");
        } else {
          const errorMessage =
            response.data.message || "User creation failed. Please try again.";
          alert(`User creation failed: ${errorMessage}`);
        }
      } catch (error) {
        console.error("User creation error:", error);
        const errorMessage =
          error.response?.data?.message || "An error occurred during user creation.";
        alert(`An error occurred during user creation: ${errorMessage}`);
      }
    },
    
    //Fetch application function

    async fetchApplicants(value) {
      console.log("Filter in fetchApplicants:", value);
      try {
        const token = this.token;
        const response = await instance.get("applicant/get-applicants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            status: value || "",
          },
        });
    
        if (response.data.success) {
          this.applicants = response.data.data.jobs;
        } else {
          const errorMessage =
            response.data.message || "Failed to fetch applicants. Please try again.";
          console.error(`Failed to fetch applicants: ${errorMessage}`);
          alert(`Failed to fetch applicants: ${errorMessage}`);
        }
      } catch (error) {
        console.error("Fetching applicants error:", error);
        const errorMessage =
          error.response?.data?.message || "Fetching applicants failed.";
        alert(`Fetching applicants error: ${errorMessage}`);
      }
    },
    

    //accept application function

    async acceptApplicant(email) {
      try {
        const token = this.token;
        const response = await instance.patch(
          "applicant/update-applicants",
          {
            email,
            status: "accepted",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.success) {
          console.log(`Applicant with ID ${email} accepted successfully`);
          alert(`Applicant with ID ${email} accepted successfully`);
        } else {
          console.error(
            `Failed to accept applicant with ID ${email}:`,
            response.data.message
          );
          alert(
            `Failed to accept applicant with ID ${email}: ${response.data.message}`
          );
        }
      } catch (error) {
        console.error(`Accepting applicant with ID ${email} error:`, error);
        alert(`Accepting applicant with ID ${email} error: ${error.message}`);
      }
    },
  

    //reject application

    async rejectApplicant(email) {
      try {
        const token = this.token;
        const response = await instance.patch(
          "applicant/update-applicants",
          {
            email,
            status: "rejected",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.data.success) {
          console.log(`Applicant with ID ${email} rejected successfully`);
          alert(`Applicant with ID ${email} rejected successfully`);
        } else {
          console.error(
            `Failed to reject applicant with ID ${email}:`,
            response.data.message
          );
          alert(
            `Failed to reject applicant with ID ${email}: ${response.data.message}`
          );
        }
      } catch (error) {
        console.error(`Rejecting applicant with ID ${email} error:`, error);
        alert(`Rejecting applicant with ID ${email} error: ${error.message}`);
      }
    },
  

    getStatusColor(status) {
      switch (status) {
        case "Accept":
          return "green";
        case "Pending":
          return "orange";
        case "Reject":
          return "red";
        default:
          return "grey";
      }
    },

    //Fetch users

    async fetchUsers() {
      try {
        const token = this.token;
        const response = await instance.get("user/get-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data.success) {
          const usersData = response.data.data;
          this.users = usersData.users;
        } else {
          console.error("Failed to fetch users:", response.data.message);
          alert(`Failed to fetch users: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        alert(`Error fetching users: ${error.message}`);
      }
    },

    //Fetch Activity Logs Function

    async fetchActivityLogs() {
      try {
        const token = this.token;
        const response = await instance.get("log/activity-logs", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data.success) {
          const logsData = response.data.data.users;
          this.activityLogs = logsData.map((log) => ({
            id: log.id,
            userName: log.userName,
            email: log.email,
            reqBody: log.reqBody,
            resBody: log.resBody,
            reqStatusCode: log.statusCode,
            createdAt: log.createdAt,
          }));
        } else {
          console.error(
            "Failed to fetch activity logs:",
            response.data.message
          );
          alert(`Failed to fetch activity logs: ${response.data.message}`);
        }
      } catch (error) {
        console.error("Fetching activity logs error:", error);
        alert(`Fetching activity logs error: ${error.message}`);
      }
    },

    //Logout Function

    logout() {
      localStorage.removeItem("token");
      this.isAuthenticated = false;
      this.isAdmin = false;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.applicants = [];
      this.activityLogs = [];
      this.$router.go(0);
    },

    setToken(token) {
      this.token = token;
    },

    //Download Function
    async downloadApplicant(email) {
      try {
        const token = this.token;
        const response = await instance.post(
          "applicant/download-cv",
          {
            email,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
  
        if (response.data instanceof Blob) {
          const blobUrl = URL.createObjectURL(response.data);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = `CV_${email}.pdf`;
          link.click();
          URL.revokeObjectURL(blobUrl);
  
          console.log(`Download for applicant with email ${email} successful`);
          alert(`Download for applicant with email ${email} successful`);
        } else {
          console.error(
            `Failed to download applicant with email ${email}:`,
            "Invalid response format"
          );
          alert(
            `Failed to download applicant with email ${email}: Invalid response format`
          );
        }
      } catch (error) {
        console.error(
          `Downloading applicant with email ${email} error:`,
          error
        );
        alert(`Downloading applicant with email ${email} error: ${error.message}`);
      }
    },
  },
  persist: true,
});
