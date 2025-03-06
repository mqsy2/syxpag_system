<script>
import { ref, onMounted } from "vue";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://your-supabase-url.supabase.co",
  "your-anon-key"
);

export default {
  setup() {
    const supplyList = ref([]);
    const newProduct = ref({ product: "", quantity: 0, price: 0 });

    const fetchSupply = async () => {
      const { data, error } = await supabase.from("supply").select("*");
      if (error) console.error("Fetch error:", error);
      else supplyList.value = data;
    };

    const addProduct = async () => {
      const { error } = await supabase.from("supply").insert([newProduct.value]);
      if (error) console.error("Insert error:", error);
      else {
        fetchSupply();
        newProduct.value = { product: "", quantity: 0, price: 0 }; // Reset form
      }
    };

    const updateProduct = async (id, quantity, price) => {
      const { error } = await supabase
        .from("supply")
        .update({ quantity, price })
        .eq("id", id);
      if (error) console.error("Update error:", error);
      else fetchSupply();
    };

    const removeProduct = async (id) => {
      const { error } = await supabase.from("supply").delete().eq("id", id);
      if (error) console.error("Delete error:", error);
      else fetchSupply();
    };

    onMounted(fetchSupply);

    return { supplyList, newProduct, addProduct, updateProduct, removeProduct };
  },
};
</script>

<template>
  <div>
    <h2>Supply Tracking</h2>
    
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
        <tr v-for="item in supplyList" :key="item.id">
          <td>{{ item.product }}</td>
          <td><input type="number" v-model.number="item.quantity" /></td>
          <td><input type="number" v-model.number="item.price" /></td>
          <td>
            <button @click="updateProduct(item.id, item.quantity, item.price)">Update</button>
            <button @click="removeProduct(item.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h3>Add New Product</h3>
    <input type="text" v-model="newProduct.product" placeholder="Product Name" />
    <input type="number" v-model.number="newProduct.quantity" placeholder="Quantity" />
    <input type="number" v-model.number="newProduct.price" placeholder="Price" />
    <button @click="addProduct">Add Product</button>
  </div>
</template>
