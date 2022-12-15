<template>
  <div class="bg-gray-50">
    <div
      class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h2 class="sr-only">Checkout</h2>

      <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <div>
          <div>
            <h2 class="text-lg font-medium text-gray-900">
              Contact information
            </h2>

            <div class="mt-4">
              <label
                for="email-address"
                class="block text-sm font-medium text-gray-700"
                >Email address</label
              >
              <div class="mt-1">
                <input
                  v-model="data.email"
                  type="email"
                  id="email-address"
                  name="email-address"
                  autocomplete="email"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          <div class="mt-10 border-t border-gray-200 pt-10">
            <h2 class="text-lg font-medium text-gray-900">
              Shipping information
            </h2>

            <div
              class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4"
            >
              <div>
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-700"
                  >First name</label
                >
                <div class="mt-1">
                  <input
                    v-model="data.firstName"
                    type="text"
                    id="first-name"
                    name="first-name"
                    autocomplete="given-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  for="last-name"
                  class="block text-sm font-medium text-gray-700"
                  >Last name</label
                >
                <div class="mt-1">
                  <input
                    v-model="data.lastName"
                    type="text"
                    id="last-name"
                    name="last-name"
                    autocomplete="family-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  for="stage"
                  class="block text-sm font-medium text-gray-700"
                  >Stage</label
                >
                <div class="mt-1">
                  <select
                    v-model="stage"
                    id="stage"
                    name="stage"
                    autocomplete="country-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option v-for="x in rooms" :value="x.id" :key="x.id">
                      {{ x.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  for="room"
                  class="block text-sm font-medium text-gray-700"
                  >Room</label
                >
                <div class="mt-1">
                  <select
                    v-model="data.roomId"
                    id="room"
                    name="room"
                    autocomplete="country-name"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option v-for="x in filterRoom" :value="x.id" :key="x.id">
                      {{ x.number }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700"
                  >Phone</label
                >
                <div class="mt-1">
                  <input
                    v-model="data.phone"
                    type="text"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order summary -->
        <div class="mt-10 lg:mt-0">
          <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

          <div
            class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <h3 class="sr-only">Items in your cart</h3>
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="orderItem in order"
                :key="orderItem.orderId"
                class="flex py-6 px-4 sm:px-6"
              >
                <div class="flex-shrink-0">
                  <img
                    :src="`${baseUrlImage}${orderItem.product.imagesList[0]}`"
                    class="w-20 rounded-md"
                  />
                </div>

                <div class="ml-6 flex-1 flex flex-col">
                  <div class="flex">
                    <div class="min-w-0 flex-1">
                      <h4 class="text-sm">
                        <a
                          href="#"
                          class="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {{ orderItem.product.name }}
                        </a>
                      </h4>
                    </div>

                    <div class="ml-4 flex-shrink-0 flow-root">
                      <button
                        type="button"
                        class="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <TrashIcon class="h-5 w-5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div class="flex-1 pt-2 flex items-end justify-between">
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ orderItem.price }}
                    </p>

                    <div class="ml-4">
                      <label for="quantity" class="sr-only">Quantity</label>
                      <select
                        v-model="orderItem.quantity"
                        :id="`quantity-${cartItemIdx}`"
                        :name="`quantity-${cartItemIdx}`"
                        @change="updateQuantity($event, orderItem)"
                        class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option v-for="x in 10" :value="x" :key="x">
                          {{ x }}
                        </option>
                        >
                      </select>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium">Total</dt>
                <dd class="text-base font-medium text-gray-900">
                  {{ `${totalPrice}đ` }}
                </dd>
              </div>
            </dl>

            <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
              <button
                type="submit"
                @click.prevent="makePayment"
                class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { TrashIcon } from "@heroicons/vue/24/solid";
import OrderService from "../services/order.service";
import ProductService from "../services/product.service";
import StageService from "../services/stage.service";
import { useToast } from "vue-toastification";
const toast = useToast();
const paymentMethods = [{ id: "vn-pay", title: "VN Pay" }];

export default {
  components: {
    TrashIcon,
  },
  data() {
    return {
      paymentMethods,
      order: [],
      totalPrice: 0,
      baseUrlImage: process.env.VUE_APP_SERVICE_ENDPOINT + "images/",
      rooms: [],
      stage: null,
      data: {
        email: null,
        phone: null,
        roomId: null,
        firstName: null,
        lastName: null,
      },
    };
  },
  computed: {
    filterRoom() {
      return this.stage !== null
        ? this.rooms.filter((x) => x.id === this.stage)[0]?.roomDtoList
        : [];
    },
  },
  async created() {
    await Promise.all([this.getOrder(), this.getRooms()]);
    this.stage = this.rooms[0].id;
  },
  methods: {
    async makePayment() {
      if (
        this.data.email === null ||
        this.data.phone === null ||
        this.data.roomId === null
      ) {
        toast.error("Vui lòng đầy đủ thông tin", {
          timeout: 1500,
        });
        return;
      }
      const order = JSON.parse(localStorage.getItem("order"));

      await OrderService.updateOrderInfo(order.id, {
        email: this.data.email,
        phone: this.data.phone,
        roomId: this.data.roomId,
        customerName: `${this.data.firstName} ${this.data.lastName}`,
      });

      const returnUrl = "http://34.143.194.243:9000/order-history";

      OrderService.fetchVnpayUrl(order.reference, returnUrl).then((res) => {
        window.location.href = res.data;
      });
    },

    async getOrder() {
      const order = JSON.parse(localStorage.getItem("order"));
      // const order = await CartService.getCart();

      // get product in order
      const products = await Promise.all(
        order.orderItemDtoList.map((orderItem) =>
          ProductService.fetchDetailsProduct(orderItem.productId)
        )
      );

      const mergedCartItem = [];

      order.orderItemDtoList.forEach((orderItem) => {
        products.forEach((product) => {
          if (orderItem.productId === product.id) {
            mergedCartItem.push({
              ...orderItem,
              product,
            });
          }
        });
      });

      this.order = mergedCartItem;
      this.totalPrice = order.totalAmount;
    },
    async getRooms() {
      const rooms = await StageService.getStage();
      this.rooms = [...rooms];
    },
  },
};
</script>
