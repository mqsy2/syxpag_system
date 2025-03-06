<template>
    <div class="container mt-5">
      <h2 class="text-center">Supply Tracking</h2>
  
      <!-- Supply Table -->
      <table class="table table-bordered mt-3">
        <thead class="table-dark">
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in supplyItems" :key="index">
            <td>
              <input type="text" v-model="item.product" class="form-control" placeholder="Enter product name" />
            </td>
            <td>
              <input type="number" v-model="item.quantity" class="form-control" min="0" />
            </td>
            <td>
              <input type="number" v-model="item.price" class="form-control" min="0" step="0.01" placeholder="Enter price" />
            </td>
            <td>
              <button class="btn btn-danger me-2" @click="removeRow(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Buttons -->
      <button class="btn btn-primary me-2" @click="addRow">Add Row</button>
      <button class="btn btn-success" @click="updateSupply">Update</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        supplyItems: [{ product: "", quantity: 0, price: 0 }],
      };
    },
    methods: {
      addRow() {
        this.supplyItems.push({ product: "", quantity: 0, price: 0 });
      },
      removeRow(index) {
        this.supplyItems.splice(index, 1);
      },
      updateSupply() {
        console.log("Updated Supply:", this.supplyItems);
        alert("Supply updated successfully!");
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
  }
  </style>