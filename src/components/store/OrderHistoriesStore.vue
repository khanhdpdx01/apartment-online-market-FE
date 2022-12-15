<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="flex flex-col">
    <div class="my-5 flex justify-center">
      <h3 class="text-3xl font-bold">Order history</h3>
    </div>
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                >
                  Order id
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                >
                  Order reference
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                >
                  Total price
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                >
                  Order status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="order in orders" :key="order.email">
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
                >
                  {{ order.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.reference }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ order.totalAmount }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{
                    order.orderStatus === "CREATED"
                      ? "PENDING"
                      : order.orderStatus
                  }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    href="#"
                    class="text-indigo-600 hover:text-indigo-900"
                    @click.prevent="viewOrderDetail(order.id)"
                    >View</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderService from "../../services/order.service";
import TokenService from "../../services/token.service";

export default {
  data() {
    return {
      orders: [],
    };
  },
  created() {
    this.getOrderHistory();
  },
  methods: {
    getOrderHistory() {
      // const order = JSON.parse(localStorage.getItem("order"));
      // this.orders.push(order);

      // const userId = TokenService.getUserId();
      const storeId = "ec942a3a-3394-4129-86c0-a4508ec2c6fd";

      OrderService.getOrderHistoriesInStore(storeId).then((res) => {
        this.orders = [...res.data];
      });
    },
    viewOrderDetail(orderId) {
      this.$router.push(`/order/${orderId}`);
    },
  },
};
</script>
