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
            <!-- Search bar for product name -->
            <input
              type="text"
              v-model="item.product"
              class="form-control"
              placeholder="Search product..."
              @input="filterProducts(index)"
              @focus="showSuggestions(index)"
            />
            <ul v-if="item.showSuggestions && filteredProducts.length" class="suggestions-list">
              <li
                v-for="(product, idx) in filteredProducts"
                :key="product.id"
                @click="selectProduct(index, product)"
                class="suggestion-item"
              >
                {{ product.product }}
              </li>
            </ul>
          </td>
          <td>{{ item.price.toFixed(2) }}</td>
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
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default {
  data() {
    return {
      customerName: "",
      orderItems: [
        { quantity: 1, product: "", price: 0, totalPrice: 0, showSuggestions: false }
      ],
      productsInSupply: [],  // List of products in the supply table
      filteredProducts: []   // Filtered products based on input
    };
  },
  computed: {
    fullTotal() {
      return this.orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
    },
  },
  methods: {
    // Fetch products from the supply table
    async fetchSupplyProducts() {
      const { data, error } = await supabase.from("supply").select("id, product, quantity, price");
      if (error) {
        console.error("Error fetching products from supply:", error);
      } else {
        this.productsInSupply = data;
      }
    },

    // Add a new row for the order
    addRow() {
      this.orderItems.push({ quantity: 1, product: "", price: 0, totalPrice: 0, showSuggestions: false });
    },

    // Remove an order row
    removeRow(index) {
      this.orderItems.splice(index, 1);
    },

    // Update the total price for an order item
    updateTotal(index) {
      const item = this.orderItems[index];
      item.totalPrice = item.quantity * item.price;
    },

    // Filter products based on the input in the search bar
    filterProducts(index) {
      const item = this.orderItems[index];
      const searchTerm = item.product.toLowerCase();
      this.filteredProducts = this.productsInSupply.filter(product =>
        product.product.toLowerCase().includes(searchTerm)
      );
    },

    // Show product suggestions when the user clicks on the input
    showSuggestions(index) {
      this.orderItems[index].showSuggestions = true;
    },

    // Select a product from the suggestions list
    selectProduct(index, product) {
      const item = this.orderItems[index];
      item.product = product.product;
      item.price = product.price;
      item.showSuggestions = false;  // Hide suggestions once a product is selected
      this.updateTotal(index);
    },

    // Submit the order to the transactions table and update the supply quantities
    async submitOrder() {
      const orderItemsData = this.orderItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice
      }));

      // Check if the ordered quantity is available in the supply
      for (let item of this.orderItems) {
        const productInSupply = this.productsInSupply.find(product => product.product === item.product);
        if (productInSupply && productInSupply.quantity < item.quantity) {
          alert(`Not enough stock for ${item.product}. Only ${productInSupply.quantity} available.`);
          return;
        }
      }

      // Update the supply quantities after the order is placed
      for (let item of this.orderItems) {
        const productInSupply = this.productsInSupply.find(product => product.product === item.product);
        if (productInSupply) {
          const newQuantity = productInSupply.quantity - item.quantity;
          const { error } = await supabase.from("supply").update({ quantity: newQuantity }).eq("id", productInSupply.id);
          if (error) {
            console.error("Error updating supply quantity:", error);
          }
        }
      }

      // Insert the order into the transactions table (this will create a new transaction record)
      const { error } = await supabase.from("transactions").insert([
        {
          customer_name: this.customerName,
          order_items: orderItemsData,  // Store the order items as JSON
          total_price: this.fullTotal,
          status: "Ongoing"
        }
      ]);

      if (error) {
        console.error("Error submitting order:", error);
      } else {
        alert(`Order for ${this.customerName} submitted! Total: $${this.fullTotal.toFixed(2)}`);
        // Reset form
        this.customerName = "";
        this.orderItems = [{ quantity: 1, product: "", price: 0, totalPrice: 0, showSuggestions: false }];
      }
    },
  },

  // Fetch the products in supply when the component is mounted
  async mounted() {
    await this.fetchSupplyProducts();
  }
};
</script>

<style scoped>
table {
  width: 100%;
}

.suggestions-list {
  list-style-type: none;
  margin-top: 5px;
  padding-left: 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 5px;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: #f1f1f1;
}
</style>
