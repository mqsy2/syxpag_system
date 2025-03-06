<template>
    <div class="container mt-5">
      <h2 class="text-center">Transactions</h2>
  
      <!-- Tabs for Customer Receipts and Supply Transactions -->
      <ul class="nav nav-tabs mt-3">
        <li class="nav-item">
          <button class="nav-link" :class="{ active: activeTab === 'receipts' }" @click="activeTab = 'receipts'">
            Customer Receipts
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" :class="{ active: activeTab === 'supply' }" @click="activeTab = 'supply'">
            Supply Transactions
          </button>
        </li>
      </ul>
  
      <!-- Customer Receipts Section -->
      <div v-if="activeTab === 'receipts'" class="mt-3">
        <h4>Customer Receipts</h4>
        <p>Here will be the list of customer receipts.</p>
      </div>
  
      <!-- Supply Transactions Section -->
      <div v-if="activeTab === 'supply'" class="mt-3">
        <h4>Supply Transactions</h4>
        <p>Here will be the list of supply transactions.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: "receipts",
      };
    },
  };
  </script>
  
  <style scoped>
  .nav-link {
    cursor: pointer;
  }
  </style>