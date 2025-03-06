<template>
  <div class="container mt-5">
    <h2 class="text-center">Transactions</h2>
    <table class="table table-bordered mt-3">
      <thead class="table-dark">
        <tr>
          <th>Customer Name</th>
          <th>Order Items</th>
          <th>Total Price</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="transaction in transactions" :key="transaction.id">
          <td>{{ transaction.customer_name }}</td>
          <td>
            <div v-for="(item, index) in transaction.order_items" :key="index">
              <p><strong>Product:</strong> {{ item.product }}</p>
              <p><strong>Quantity:</strong> {{ item.quantity }}</p>
              <p><strong>Price:</strong> ${{ item.price.toFixed(2) }}</p>
              <p><strong>Total:</strong> ${{ item.totalPrice.toFixed(2) }}</p>
              <hr />
            </div>
          </td>
          <td>{{ transaction.total_price.toFixed(2) }}</td>
          <td>{{ transaction.status }}</td>
          <td>
            <button
              class="btn"
              :class="{
                'btn-success': transaction.status === 'Ongoing',
                'btn-secondary': transaction.status === 'Completed'
              }"
              @click="toggleTransactionStatus(transaction)"
            >
              {{ transaction.status === 'Ongoing' ? 'Mark as Completed' : 'Mark as Ongoing' }}
            </button>
            <button
              class="btn btn-danger mt-2"
              @click="deleteTransaction(transaction.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default {
  data() {
    return {
      transactions: []
    };
  },
  methods: {
    // Fetch the transactions from the database
    async fetchTransactions() {
      const { data, error } = await supabase.from("transactions").select("*");
      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        this.transactions = data;
      }
    },

    // Toggle the transaction status between 'Ongoing' and 'Completed'
    async toggleTransactionStatus(transaction) {
      const newStatus = transaction.status === 'Ongoing' ? 'Completed' : 'Ongoing';

      const { error } = await supabase
        .from("transactions")
        .update({ status: newStatus })
        .eq("id", transaction.id);

      if (error) {
        console.error("Error updating transaction status:", error);
      } else {
        // Reload the transactions after updating the status
        await this.fetchTransactions();
      }
    },

    // Delete a transaction
    async deleteTransaction(transactionId) {
      const { error } = await supabase
        .from("transactions")
        .delete()
        .eq("id", transactionId);

      if (error) {
        console.error("Error deleting transaction:", error);
      } else {
        // Reload the transactions after deletion
        await this.fetchTransactions();
      }
    }
  },

  async mounted() {
    await this.fetchTransactions();
  }
};
</script>

<style scoped>
table {
  width: 100%;
}

button {
  margin-top: 5px;
}

.mt-2 {
  margin-top: 10px;
}

hr {
  margin: 5px 0;
}

p {
  margin: 5px 0;
}

strong {
  font-weight: bold;
}
</style>