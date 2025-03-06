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
        <tr v-for="(item, index) in supplyItems" :key="item.id || index">
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
            <button class="btn btn-danger me-2" @click="deleteSupply(item.id, index)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Buttons -->
    <button class="btn btn-primary me-2" @click="addRow">Add Row</button>
    <button class="btn btn-success me-2" @click="saveNewSupply">Save</button>
    <button class="btn btn-warning" @click="updateSupply">Update</button>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default {
  data() {
    return {
      supplyItems: [],
    };
  },
  async mounted() {
    await this.fetchSupply();
  },
  methods: {
    async fetchSupply() {
      const { data, error } = await supabase.from("supply").select("*");
      if (error) {
        console.error("Error fetching supply data:", error);
      } else {
        this.supplyItems = data;
      }
    },
    addRow() {
      this.supplyItems.push({ product: "", quantity: 0, price: 0 });
    },
    async saveNewSupply() {
      const newItems = this.supplyItems.filter(item => !item.id && item.product.trim() !== "");

      if (newItems.length === 0) {
        alert("No new valid items to save.");
        return;
      }

      const { data, error } = await supabase
        .from("supply")
        .insert(newItems)
        .select("*"); // Ensure new IDs are returned

      if (error) {
        console.error("Error saving supply:", error);
      } else {
        alert("New items saved!");
        await this.fetchSupply(); // Refresh table
      }
    },
    async updateSupply() {
      for (const item of this.supplyItems) {
        if (item.id) {
          const { error } = await supabase
            .from("supply")
            .update({ product: item.product, quantity: item.quantity, price: item.price })
            .eq("id", item.id);

          if (error) {
            console.error("Error updating supply item:", error);
          }
        }
      }
      alert("Supply updated successfully!");
      await this.fetchSupply();
    },
    async deleteSupply(id, index) {
      if (!id) {
        // If the row has no ID, it's not in the database yet, just remove it locally
        this.supplyItems.splice(index, 1);
        return;
      }

      const { error } = await supabase.from("supply").delete().eq("id", id);
      if (error) {
        console.error("Error deleting supply item:", error);
      } else {
        this.supplyItems = this.supplyItems.filter(item => item.id !== id);
      }
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>