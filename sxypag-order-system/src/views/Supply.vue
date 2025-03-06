<template>
  <div>
    <h2 class="text-center mt-4">Supply Tracking</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in supplyList" :key="item.id">
          <td>
            <input v-model="item.product" class="form-control" />
          </td>
          <td>
            <input v-model.number="item.quantity" type="number" class="form-control" />
          </td>
          <td>
            <input v-model.number="item.price" type="number" step="0.01" class="form-control" />
          </td>
          <td>
            <button @click="updateSupply(item)" class="btn btn-success">Update</button>
            <button @click="deleteProduct(item.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="addProduct" class="btn btn-primary">Add Product</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";

export default {
  setup() {
    const supplyList = ref([]);

    // Fetch data from Supabase
    const fetchSupply = async () => {
      const { data, error } = await supabase.from("supply").select("*");
      if (error) console.error("Fetch error:", error);
      else supplyList.value = data;
    };

    // Add a new product
    const addProduct = async () => {
      const newProduct = { product: "", quantity: 0, price: 0 };
      const { data, error } = await supabase.from("supply").insert([newProduct]);
      if (error) console.error("Insert error:", error);
      else supplyList.value.push({ ...newProduct, id: data[0].id });
    };

    // Update supply item
    const updateSupply = async (item) => {
      const { error } = await supabase.from("supply").update({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
      }).eq("id", item.id);
      if (error) console.error("Update error:", error);
    };

    // Delete product
    const deleteProduct = async (id) => {
      const { error } = await supabase.from("supply").delete().eq("id", id);
      if (error) console.error("Delete error:", error);
      else supplyList.value = supplyList.value.filter(item => item.id !== id);
    };

    onMounted(fetchSupply);

    return { supplyList, addProduct, updateSupply, deleteProduct };
  },
};
</script>