<template>
    <div class="container mt-5">
      <h2 class="text-center">New Order</h2>
  
      <!-- Customer Name Input -->
      <div class="mb-3">
        <label for="customerName" class="form-label fw-bold">Customer Name</label>
        <input type="text" v-model="customerName" class="form-control" placeholder="Enter customer name" />
      </div>
  
      <!-- Order Table -->
      <table class="table table-bordered mt-3">
        <thead class="table-dark">
          <tr>
            <th>Quantity</th>
            <th>Product</th>
            <th>Price</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in orderItems" :key="index">
            <td>
              <input type="number" v-model="item.quantity" class="form-control" min="1" @input="updateTotal(index)" />
            </td>
            <td>
              <input type="text" v-model="item.product" class="form-control" placeholder="Product name" />
            </td>
            <td>
              <input type="number" v-model="item.price" class="form-control" min="0" step="0.01" @input="updateTotal(index)" />
            </td>
            <td>{{ item.totalPrice.toFixed(2) }}</td>
            <td>
              <button class="btn btn-danger" @click="removeRow(index)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Add Row Button -->
      <button class="btn btn-primary" @click="addRow">Add Row</button>
  
      <!-- Full Total Price -->
      <div class="mt-3">
        <h4>Total Price: ${{ fullTotal.toFixed(2) }}</h4>
      </div>
  
      <!-- Add Order Button -->
      <button class="btn btn-success mt-3" @click="submitOrder">Add Order</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customerName: "",
        orderItems: [
          { quantity: 1, product: "", price: 0, totalPrice: 0 }
        ],
      };
    },
    computed: {
      fullTotal() {
        return this.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
      },
    },
    methods: {
      addRow() {
        this.orderItems.push({ quantity: 1, product: "", price: 0, totalPrice: 0 });
      },
      removeRow(index) {
        this.orderItems.splice(index, 1);
      },
      updateTotal(index) {
        const item = this.orderItems[index];
        item.totalPrice = item.quantity * item.price;
      },
      submitOrder() {
        alert(`Order for ${this.customerName} submitted! Total: $${this.fullTotal.toFixed(2)}`);
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
  }
  </style>