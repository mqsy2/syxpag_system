<template>
    <div class="container mt-5">
      <h2 class="text-center">Pricing Management</h2>
  
      <!-- Tabs for Price Adjuster and Customer Prices -->
      <ul class="nav nav-tabs mt-3">
        <li class="nav-item">
          <button class="nav-link" :class="{ active: activeTab === 'adjuster' }" @click="activeTab = 'adjuster'">
            Price Adjuster
          </button>
        </li>
        <li class="nav-item">
          <button class="nav-link" :class="{ active: activeTab === 'customer' }" @click="activeTab = 'customer'">
            Customer Prices
          </button>
        </li>
      </ul>
  
      <!-- Price Adjuster Section -->
      <div v-if="activeTab === 'adjuster'" class="mt-3">
        <h4>Price Adjuster</h4>
        <p>Here will be the interface to adjust product prices.</p>
      </div>
  
      <!-- Customer Prices Section -->
      <div v-if="activeTab === 'customer'" class="mt-3">
        <h4>Customer Prices</h4>
        <p>Here will be the list of customer-specific pricing.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: "adjuster",
      };
    },
  };
  </script>
  
  <style scoped>
  .nav-link {
    cursor: pointer;
  }
  </style>