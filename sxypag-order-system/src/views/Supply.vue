import { supabase } from "@/supabase";

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
          <tr v-for="(item, index) in supplyItems" :key="item.id">
            <td>
              <input type="text" v-model="item.product" class="form-control" disabled />
            </td>
            <td>
              <input type="number" v-model="item.quantity" class="form-control" min="0" />
            </td>
            <td>
              <input type="number" v-model="item.price" class="form-control" min="0" step="0.01" />
            </td>
            <td>
              <button class="btn btn-danger me-2" @click="removeProduct(item.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Buttons -->
      <button class="btn btn-primary me-2" @click="addProduct">Add Product</button>
      <button class="btn btn-success" @click="updateSupply">Update</button>
    </div>
  </template>
  
  <script>
  import { supabase } from "../lib/supabase";
  
  export default {
    data() {
      return {
        supplyItems: [],
      };
    },
    async created() {
      await this.fetchSupply();
    },
    methods: {
      async fetchSupply() {
        const { data, error } = await supabase.from("supply").select("*");

        if (error) {
          console.error("Error fetching supply:", error);
        } else {
          console.log("Fetched supply:", data);
          this.supplyItems = data;
        }
      },
      async addProduct() {
        const newProduct = { product: "New Product", quantity: 0, price: 0 };

        const { data, error } = await supabase.from("supply").insert([newProduct]).select("*");

        if (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Check the console for errors.");
        } else {
            this.supplyItems.push(data[0]); // Ensure we get the new product from Supabase
        }
      },
      async removeProduct(id) {
        const { error } = await supabase.from("supply").delete().eq("id", id);
        if (error) {
          console.error("Error removing product:", error);
        } else {
          this.supplyItems = this.supplyItems.filter((item) => item.id !== id);
        }
      },
      async updateSupply() {
        for (let item of this.supplyItems) {
          const { error } = await supabase
            .from("supply")
            .update({ quantity: item.quantity, price: item.price })
            .eq("id", item.id);
  
          if (error) console.error("Error updating product:", error);
        }
        alert("Supply updated successfully!");
      },
    },
  };
  </script>