<template>
  <div class="navbar bg-base-100">
    <div class="flex">
      <router-link
        :to="{ name: 'Home' }"
        tag="a"
        class="btn btn-ghost normal-case text-xl"
        >Market</router-link
      >
    </div>
    <!-- search -->
    <SearchInput />
    <!-- menu -->
    <div class="flex gap-x-8 mx-auto">
      <router-link
        :to="{ path: '/test' }"
        tag="span"
        class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"
        >Khám phá</router-link
      >
      <router-link
        :to="{ path: '/shop' }"
        tag="span"
        class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"
        >Quản lý shop</router-link
      >
      <router-link
        :to="{ path: '/' }"
        tag="span"
        class="cursor-pointer rounded-sm py-1 px-2 text-sm font-medium hover:bg-gray-100"
        >Đơn hàng</router-link
      >
    </div>

    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="badge badge-sm indicator-item">{{
              cartItemSize
            }}</span>
          </div>
        </label>
        <div
          tabindex="0"
          class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div class="card-body">
            <span class="font-bold text-lg">{{ cartItemSize }} Items</span>
            <div class="card-actions">
              <button
                class="btn btn-primary btn-block"
                @click="viewShoppingCart"
              >
                View cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- profile management -->
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://placeimg.com/80/80/people" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import SearchInput from "./SearchInput.vue";
import CartService from "../../services/cart.service";

export default {
  components: {
    SearchInput,
  },
  data() {
    return {
      cartItemSize: 0,
    };
  },
  created() {
    this.getCartSize();
  },
  methods: {
    viewShoppingCart() {
      this.$router.push("/cart");
    },
    getCartSize() {
      CartService.getCart().then((response) => {
        this.cartItemSize = response.cartItemDtoList.length;
      });
    },
  },
};
</script>
