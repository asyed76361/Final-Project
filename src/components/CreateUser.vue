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

    <q-btn
      v-if="showChatIcon"
      class="chat-icon"
      color="primary"
      round
      icon="email"
      @click="toggleChat"
    />
    <div v-if="showChat" class="chat-interface">
      <div class="chat-messages">
        <div class="top">
          <h7>Welcome to Chat Box</h7>
        </div>
        <div
          v-for="(message, index) in chatMessages"
          :key="index"
          :class="`message ${message.type === 'sent' ? 'user' : 'support'}`"
        >
          {{ message.text }}
        </div>
      </div>
      <q-input
        v-model="messageInput"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        dense
        outlined
        class="chat-input"
        style="margin-top: 10px; border-radius: 10px"
      />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "../store/auth";
import { ref, onMounted } from "vue";
import io from 'socket.io-client';

const { createUser } = useAuthStore();
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const dense = ref(true);
const showChatIcon = ref(true);
const showChat = ref(false);
const chatMessages = ref([]);
const messageInput = ref("");
let socket = null;

const toggleChat = () => {
  showChat.value = !showChat.value;
};

const sendMessage = () => {
  if (messageInput.value.trim() !== "") {
    chatMessages.value.push({ text: messageInput.value, type: "sent" });
    socket.emit('chat message', messageInput.value);
    messageInput.value = '';
  }
};

const submitForm = () => {
  createUser({
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  });
};

onMounted(() => {
  const authStore = useAuthStore();
  const token = authStore.token;

  socket = io('http://192.168.11.122:8080', {
    transports: ['websocket'],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 3,
    timeout: 5000,
    query: { token },
  });

  socket.on('chat message', (msg) => {
    chatMessages.value.push({ text: msg, type: 'received' });
  });
});
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
.top{
  background-color: #537895;
  color: white;
}
.custom-input::placeholder {
  color: white;
}
.chat-icon {
  position: fixed;
  bottom: 20px;
  right: 40px;
}
.chat-interface {
  position: fixed;
  bottom: 70px;
  right: 20px;
  width: 300px;
  background-color: #ffffff;
  border-top-left-radius: 8px;
  overflow: hidden;
}
.chat-messages {
  background-color: #f9f9f9;
  height: 200px;
  overflow-y: auto;
  overflow-x: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 10px;
}
.chat-messages::-webkit-scrollbar {
  width: 8px;
}
.message {
  margin-bottom: 5px;
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  word-break: break-word;
}
.message.user {
  text-align: right;
  color: green;
  align-self: flex-end;
  background-color: #e1ffe1;
  color: black;
  border-bottom-right-radius: 0;
}
.message.support {
  text-align: left;
  color: grey;
  align-self: flex-start;
  background-color: #ccc;
  color: black;
  border-bottom-left-radius: 0;
}
.message.user {
  text-align: right;
  background-color: #e1ffe1;
  align-self: flex-end;
}
.message.support {
  text-align: left;
  background-color: #ccc;
  align-self: flex-start;
}
@media (max-width: 425px) {
  .chat-interface {
    max-width: 200px;
  }
  .q-card__actions{
    padding: 0;
  }
}

</style>
