<template>
  <!-- component -->
  <!-- This is an example component -->
  <div class="max-w-xs mx-auto w-full">
    <div
      class="flex flex-col bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 h-full"
    >
      <div class="flex-1">
        <a href="#">
          <img
            class="rounded-t-lg p-8"
            src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp"
            alt="product image"
            v-if="product.imagesList === undefined"
          />
          <img
            class="rounded-t-lg p-8"
            :src="`${baseUrlImage}${product.imagesList[0]}`"
            alt="product image"
            v-else
          />
        </a>
      </div>
      <div class="px-5 pb-5">
        <a href="#">
          <h3
            class="text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1"
          >
            {{ product.name }}
          </h3>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <svg
            v-for="x in 5"
            :key="x"
            class="w-5 h-5 text-yellow-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            ></path>
          </svg>

          <span
            class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3"
            >5.0</span
          >
        </div>
        <div class="flex items-center justify-between">
          <span class="text-xl font-bold text-gray-900 dark:text-white">{{
            `${product.price}đ`
          }}</span>
          <a
            href="#"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click.prevent="addProductToCart"
            >Add to cart</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartService from "../../services/cart.service";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  props: ["product"],
  data() {
    return {
      baseUrlImage: window.VUE_APP_SERVICE_ENDPOINT + "images/",
    };
  },
  methods: {
    addProductToCart() {
      CartService.addProductToCart({
        productId: this.product.id,
        quantity: 1,
      }).then(() => {
        toast.success("Thêm vào giỏ hàng thành công", {
          timeout: 1500,
        });
      });
    },
  },
};
</script>
