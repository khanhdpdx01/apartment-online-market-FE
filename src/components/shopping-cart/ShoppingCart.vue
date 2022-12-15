<template>
  <div class="bg-white">
    <div
      class="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <h1
        class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        v-if="cart.length !== 0"
      >
        Shopping Cart
      </h1>
      <form
        class="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16"
        v-if="cart.length !== 0"
      >
        <section aria-labelledby="cart-heading" class="lg:col-span-7">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>
          <div class="mb-4 flex">
            <div class="flex items-center mr-4">
              <input
                id="default-checkbox"
                type="checkbox"
                @onChange="choiceAllCartItem"
                :checked="isChoiceAllCartItem"
                class="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></label>
            </div>
            <div class="flex-1">
              <span>Sản phẩm</span>
            </div>
            <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
              <Dialog :cart="true" @delete-item="removeCart" />
            </div>
          </div>
          <ul
            role="list"
            class="border-t border-b border-gray-200 divide-y divide-gray-200"
          >
            <li
              v-for="(cartItem, cartItemIdx) in cart"
              :key="cartItem.id"
              class="flex py-6 sm:py-10"
            >
              <div class="flex items-center mr-4">
                <input
                  v-model="cartItemChoice"
                  id="default-checkbox"
                  type="checkbox"
                  :value="cartItem.productId"
                  @change="checkChoiceAllCartItem"
                  class="w-5 h-5 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  for="default-checkbox"
                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                ></label>
              </div>
              <div class="flex-shrink-0">
                <img
                  :src="`${baseUrlImage}${cartItem.product.imagesList[0]}`"
                  :alt="cartItem.product.description"
                  class="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
              </div>

              <div class="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div
                  class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0"
                >
                  <div>
                    <div class="flex justify-between">
                      <h3 class="text-sm">
                        <a
                          href="#"
                          class="font-medium text-gray-700 hover:text-gray-800"
                        >
                          {{ cartItem.product.name }}
                        </a>
                      </h3>
                    </div>
                    <div class="mt-1 flex text-sm">
                      <p class="text-gray-500">
                        <!-- {{ product.color }} -->
                      </p>
                      <p
                        v-if="product.size"
                        class="ml-4 pl-4 border-l border-gray-200 text-gray-500"
                      >
                        <!-- {{ product.size }} -->
                      </p>
                    </div>
                    <p class="mt-1 text-sm font-medium text-gray-900">
                      {{ cartItem.product.price }}
                    </p>
                  </div>

                  <div class="mt-4 sm:mt-0 sm:pr-9">
                    <label :for="`quantity-${cartItemIdx}`" class="sr-only"
                      >Quantity, {{ cartItem.product.name }}</label
                    >
                    <select
                      v-model="cartItem.quantity"
                      :id="`quantity-${cartItemIdx}`"
                      :name="`quantity-${cartItemIdx}`"
                      @change="updateQuantity($event, cartItem)"
                      class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option v-for="x in 10" :value="x" :key="x">
                        {{ x }}
                      </option>
                      >
                    </select>

                    <div class="absolute top-0 right-0">
                      <button
                        type="button"
                        class="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                      >
                        <span class="sr-only">Remove</span>
                        <Dialog
                          :cart="false"
                          @delete-item="removeCartItem(cartItem.id)"
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <p class="mt-4 flex text-sm text-gray-700 space-x-2"></p>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section
          aria-labelledby="summary-heading"
          class="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
        >
          <h2 id="summary-heading" class="text-lg font-medium text-gray-900">
            Order summary
          </h2>

          <dl class="mt-6 space-y-4">
            <div
              class="border-t border-gray-200 pt-4 flex items-center justify-between"
            >
              <dt class="text-base font-medium text-gray-900">Order total</dt>
              <dd class="text-base font-medium text-gray-900">
                {{ `${totalPrice}đ` }}
              </dd>
            </div>
          </dl>

          <div class="mt-6">
            <button
              type="submit"
              @click.prevent="createOrder"
              class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Create order
            </button>
          </div>
        </section>
      </form>

      <div class="flex justify-center" v-else>
        <span class="text-3xl font-extrabold tracking-tight text-gray-900"
          >Giỏ hàng trống vui lòng thêm sản phẩm</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "../../services/cart.service";
import ProductService from "../../services/product.service";
import OrderService from "../../services/order.service";
import Dialog from "../dialog/Dialog.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Sienna",
    inStock: true,
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in sienna.",
  },
  {
    id: 2,
    name: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    inStock: false,
    leadTime: "3–4 weeks",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 3,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35.00",
    color: "White",
    inStock: true,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
    imageAlt: "Insulated bottle with white base and black snap lid.",
  },
];

export default {
  components: {
    Dialog,
  },
  data() {
    return {
      product: products,
      cartId: null,
      cart: [],
      updateCartItemObj: {
        cartItemId: null,
        productId: null,
        quantity: 0,
      },
      totalPrice: 0,
      cartItemChoice: [],
      baseUrlImage: window.VUE_APP_SERVICE_ENDPOINT + "images/",
      isChoiceAllCartItem: false,
    };
  },
  async created() {
    await this.getCart();
    this.calculateTotalPrice();
  },
  methods: {
    async getCart() {
      const cart = await CartService.getCart();

      this.cartId = cart.id;
      // get product in cart
      const products = await Promise.all(
        cart.cartItemDtoList.map((cartItem) =>
          ProductService.fetchDetailsProduct(cartItem.productId)
        )
      );

      const mergedCartItem = [];

      cart.cartItemDtoList.forEach((cartItem) => {
        products.forEach((product) => {
          if (cartItem.productId === product.id) {
            mergedCartItem.push({
              ...cartItem,
              product,
            });
          }
        });
      });

      this.cart = mergedCartItem;
    },

    updateQuantity(event, cartItem) {
      CartService.updateQuantity({
        cartItemId: cartItem.id,
        productId: cartItem.productId,
        quantity: event.target.value,
      }).then((response) => {
        console.log(response);
      });
    },

    createOrder() {
      const orders = {
        orderLineItemList: [],
      };

      this.cart.forEach((cartItem) => {
        orders.orderLineItemList.push({
          productId: cartItem.productId,
          price: cartItem.product.price,
          quantity: cartItem.quantity,
        });
      });

      OrderService.createOrder(orders).then((res) => {
        localStorage.setItem("order", JSON.stringify(res));
        this.$router.push({ path: "/order" });
      });
    },
    calculateTotalPrice() {
      let totalPrice = 0;

      this.cart.forEach((cartItem) => {
        totalPrice += cartItem.quantity * cartItem.product.price;
      });

      this.totalPrice = totalPrice;
    },

    removeCartItem(cartItemId) {
      CartService.removeCartItem(cartItemId).then(() => {
        toast.error("Xóa sản phẩm thành công", {
          timeout: 1500,
        });
      });
    },

    removeCart() {
      CartService.removeCartItem(this.cartId).then(() => {
        toast.success("Xóa giỏ hàng thành công", {
          timeout: 1500,
        });
      });
    },

    choiceAllCartItem() {
      this.cart.forEach((cartItem) => {
        this.cartItemChoice.push(cartItem.productId);
      });

      this.isChoiceAllCartItem = true;
    },

    checkChoiceAllCartItem() {
      if (this.cartItemChoice.length === this.cart.length) {
        this.isChoiceAllCartItem = true;
      }
    },
  },
};
</script>
