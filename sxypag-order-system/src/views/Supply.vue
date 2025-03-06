import { supabase } from "../supabase";

<template>
  <div>
    <h2>Supply Tracking</h2>

    <!-- Input fields for adding a new product -->
    <div class="input-row">
      <input type="text" v-model="newProduct.name" placeholder="Product Name">
      <input type="number" v-model="newProduct.quantity" placeholder="Quantity">
      <input type="number" v-model="newProduct.price" placeholder="Price">
      <button @click="addProduct">Add Product</button>
    </div>

    <!-- Supply Table -->
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in supply" :key="index">
          <td>{{ product.name }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button @click="removeProduct(index)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { supabase } from "@/supabase"; // Ensure Supabase is correctly imported

export default {
  data() {
    return {
      supply: [], // Stores supply data
      newProduct: { name: "", quantity: 0, price: 0 } // Stores new product details
    };
  },
  methods: {
    async addProduct() {
      if (!this.newProduct.name || this.newProduct.quantity <= 0 || this.newProduct.price <= 0) {
        alert("Please enter valid product details.");
        return;
      }

      const { data, error } = await supabase.from("supply").insert([this.newProduct]);

      if (error) {
        console.error("Error adding product:", error);
      } else {
        this.supply.push(this.newProduct);
        this.newProduct = { name: "", quantity: 0, price: 0 }; // Clear input fields
      }
    },

    async removeProduct(index) {
      const product = this.supply[index];

      const { error } = await supabase.from("supply").delete().match({ name: product.name });

      if (error) {
        console.error("Error removing product:", error);
      } else {
        this.supply.splice(index, 1);
      }
    },

    async fetchSupply() {
      const { data, error } = await supabase.from("supply").select("*");

      if (error) {
        console.error("Error fetching supply:", error);
      } else {
        this.supply = data;
      }
    }
  },
  mounted() {
    this.fetchSupply(); // Load supply data when page loads
  }
};
</script>

<style>
.input-row {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 6px 10px;
  cursor: pointer;
}
</style>