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
            <input type="text" v-model="item.product" class="form-control" />
          </td>
          <td>
            <input type="number" v-model="item.quantity" class="form-control" min="0" />
          </td>
          <td>
            <input type="number" v-model="item.price" class="form-control" min="0" step="0.01" />
          </td>
          <td>
            <button class="btn btn-danger me-2" @click="removeItem(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Buttons -->
    <button class="btn btn-primary me-2" @click="addItem">Add Product</button>
    <button class="btn btn-success" @click="saveSupply">Save</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default {
  setup() {
    const supplyItems = ref([]);

    // Fetch data from Supabase on load
    const fetchSupply = async () => {
      const { data, error } = await supabase.from("supply").select("*");
      if (error) console.error("Error fetching supply:", error);
      else supplyItems.value = data;
    };

    const addItem = () => {
      supplyItems.value.push({ product: "", quantity: 0, price: 0 });
    };

    const removeItem = async (id) => {
      if (!id) return;
      const { error } = await supabase.from("supply").delete().eq("id", id);
      if (error) console.error("Error deleting item:", error);
      else supplyItems.value = supplyItems.value.filter(item => item.id !== id);
    };

    const saveSupply = async () => {
      for (const item of supplyItems.value) {
        if (item.id) {
          // Update existing record
          await supabase.from("supply").update(item).eq("id", item.id);
        } else {
          // Insert new record
          const { data, error } = await supabase.from("supply").insert([item]);
          if (!error && data) item.id = data[0].id;
        }
      }
      alert("Supply saved successfully!");
      fetchSupply();
    };

    onMounted(fetchSupply);

    return { supplyItems, addItem, removeItem, saveSupply };
  }
};
</script>

<style scoped>
table {
  width: 100%;
}
</style>
