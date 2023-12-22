<template>
    <div>
      <h1>Chat Component</h1>
      <div>
        <input v-model="message" placeholder="Type a message" />
        <button @click="sendMessage">Send</button>
      </div>
      <div v-for="(msg, index) in messages" :key="index">
        <strong>{{ msg.username }}:</strong> {{ msg.message }}
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        message: "",
        messages: [],
      };
    },
    mounted() {
      this.$store.socket.initializeSocket();
    },
    methods: {
      sendMessage() {
        this.$store.socket.sendMessage(this.message);
        this.message = "";
      },
    },
    watch: {
      "$store.socket.messages": {
        handler(newMessages) {
          this.messages = newMessages;
        },
        immediate: true,
      },
    },
  };
  </script>
  