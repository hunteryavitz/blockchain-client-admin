<template>
  <div>
    <h1>Health Check</h1>
    <button @click="checkReadiness">Check Readiness</button>
      <p :style="{color: messageColor}" v-if="loading">Loading...</p>
      <p :style="{color: messageColor}" v-else>{{ readinessMessage }}</p>

    <button @click="verifyBlockchain">Verify Blockchain</button>
      <p :style="{color: verifyMessageColor}" v-if="loadingVerify">Loading...</p>
      <p :style="{color: verifyMessageColor}" v-else>{{ verifyMessage }}</p>

    <button @click="getBlockchain">Get Blockchain</button>
    <p :style="{color: getMessageColor}" v-if="loadingGet">Loading...</p>
    <p :style="{color: getMessageColor}" v-else>{{ blockchainMessage }}</p>

  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'ReadinessCheck',

  setup() {
    const loading = ref(false);
    const loadingVerify = ref(false);
    const loadingGet = ref(false);
    const readinessMessage = ref('Awaiting readiness check');
    const verifyMessage = ref('Awaiting blockchain verification');
    const blockchainMessage = ref('Awaiting blockchain retrieval');

    const messageColor = ref('white');
    const verifyMessageColor = ref('white');
    const getMessageColor = ref('white');

    const checkReadiness = async () => {
      loading.value = true;
      messageColor.value = 'white';

      try {
        const response = await fetch('http://localhost:8080/api/v1/readiness');
        const isReady = await response.json(); // This is a boolean.

        if (isReady) {
          readinessMessage.value = 'System is ready.';
          messageColor.value = 'green';
        } else {
          readinessMessage.value = 'System is not ready.';
          messageColor.value = 'red';
        }
      } catch (error) {
        readinessMessage.value = 'Error occurred while fetching readiness status.';
        messageColor.value = 'red';
      } finally {
        loading.value = false;
      }
    };

    const getBlockchain = async () => {
      loadingGet.value = true;
      getMessageColor.value = 'white';

      try {
        const response = await fetch('http://localhost:8080/api/v1/blockchain/getBlockchain');
        const blockchain = await response.json(); // This is a blockchain.

        console.log(blockchain);

        if (blockchain) {
          blockchainMessage.value = blockchain;
          getMessageColor.value = 'green';
        } else {
          blockchainMessage.value = 'Blockchain not retrieved';
          getMessageColor.value = 'red';
        }
      } catch (error) {
        blockchainMessage.value = 'Error occurred while fetching blockchain';
        getMessageColor.value = 'red';
      } finally {
        loadingGet.value = false;
      }
    };

    const verifyBlockchain = async () => {
      loadingVerify.value = true;
      verifyMessageColor.value = 'white';

      try {
        const response = await fetch('http://localhost:8080/api/v1/verifyBlockchain');
        const isVerified = await response.json(); // This is a boolean.

        if (isVerified) {
          verifyMessage.value = 'Blockchain is valid';
          verifyMessageColor.value = 'green';
        } else {
          verifyMessage.value = 'Blockchain is not valid';
          verifyMessageColor.value = 'red';
        }
      } catch (error) {
        verifyMessage.value = 'Error occurred while fetching verification status';
        verifyMessageColor.value = 'red';
      } finally {
        loadingVerify.value = false;
      }
    };

    return {
      loading,
      loadingVerify,
      loadingGet,
      readinessMessage,
      checkReadiness,
      verifyBlockchain,
      verifyMessage,
      getBlockchain,
      blockchainMessage,
      messageColor,
      verifyMessageColor,
      getMessageColor,
    };
  },
};
</script>
