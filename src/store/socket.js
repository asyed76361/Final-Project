import { ref } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "@/path/to/auth-store";

const pinia = createPinia();

export const useSocketStore = pinia.store("socket", {
  state: () => ({
    socket: null,
    messages: ref([]),
  }),

  actions: {
    initializeSocket() {
      const authStore = useAuthStore();
      this.socket = new WebSocket("http://192.168.11.122:8080");

      this.socket.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        console.log("Received message from server:", data);
        this.messages.push(data);
      });

      if (authStore.isAuthenticated) {
        this.socket.addEventListener("open", () => {
          console.log("Socket connection opened");

          this.socket.send(JSON.stringify({ type: "identity", username: authStore.email }));
        });
      }

      this.socket.addEventListener("error", (event) => {
        console.error("Socket error:", event);
      });
      this.socket.addEventListener("close", (event) => {
        console.log("Socket connection closed:", event);
      });
    },

    sendMessage(message) {
      if (this.socket.readyState === WebSocket.OPEN) {
        const authStore = useAuthStore();
        const data = {
          type: "message",
          username: authStore.email,
          message,
        };
        this.socket.send(JSON.stringify(data));
      } else {
        console.error("Socket connection not open.");
      }
    },
  },
});

export default pinia;
