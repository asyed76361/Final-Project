// store/forgotPassword.js
import { defineStore } from 'pinia';
import instance from "@/helper/http-config";

export const useForgotPasswordStore = defineStore({
  id: 'forgotPassword',
  actions: {
    async sendForgotPasswordLink(email) {
      await instance.patch(`auth/forget-password`, { email });
      return { success: true, message: 'Check your email for the password reset link.' };
    },
  },
});
