<template>
  <main class="profile-page">
    <section class="relative block h-500-px">
      <el-row style="margin: 50px">
        <el-col :span="4"></el-col>
        <el-col :span="16">
          <el-card class="box-card">
            <el-row>
              <el-col :span="8">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg"
                  alt="Girl in a jacket"
                  width="300"
                  height="300"
                />
              </el-col>
              <el-col :span="16" v-if="is_update == false">
                <el-row style="float: right"
                  ><el-button type="danger" @click="is_update = true"
                    >Chỉnh sửa</el-button
                  ></el-row
                >
                <el-row style="font-size: 25px; margin-top: 50px">
                  <el-col :span="10"></el-col>
                  <el-col :span="14"
                    ><b>{{ product.name }}</b></el-col
                  >
                </el-row>
                <el-row>
                  <el-col :span="8"><b>Giá</b></el-col>
                  <el-col :span="16">{{ product.price }} đ</el-col>
                </el-row>
                <el-row>
                  <el-col :span="8"><b>Số lượng</b></el-col>
                  <el-col :span="16">{{ product.quantity }}</el-col>
                </el-row>
                <el-row><b>Mô tả</b></el-row>
                <el-row>
                  <el-col :span="2"></el-col>
                  <el-col :span="20">
                    {{ product.description }}
                  </el-col>
                  <el-col :span="2"></el-col>
                </el-row>
              </el-col>
              <el-col :span="16" v-if="is_update">
                <el-row style="float: right"
                  ><el-button type="primary" @click="Update()"
                    >Lưu thay đổi</el-button
                  ></el-row
                >
                <el-row style="margin: 50px 20px 20px 20px">
                  <el-col :span="6">Name Product</el-col>
                  <el-col :span="18"
                    ><el-input v-model="product.name"></el-input
                  ></el-col>
                </el-row>
                <el-row style="margin: 20px">
                  <el-col :span="6">Price</el-col>
                  <el-col :span="18"
                    ><el-input-number v-model="product.price"></el-input-number
                  ></el-col>
                </el-row>
                <el-row style="margin: 20px">
                  <el-col :span="6">Quantity</el-col>
                  <el-col :span="18"
                    ><el-input-number
                      v-model="product.quantity"
                    ></el-input-number
                  ></el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">Description</el-col>
                  <el-col :span="18"
                    ><el-input
                      v-model="product.description"
                      type="textarea"
                    ></el-input
                  ></el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="4"></el-col>
      </el-row>
    </section>
  </main>
</template>

<script>
import http from "../services/index";

export default {
  data() {
    return {
      product: {},
      is_update: false,
    };
  },
  mounted() {
    const id = this.$route.params.id;
    http
      .get(`/products/${id}`)
      .then((response) => {
        this.product = response.data;
        console.log("detail");
        console.log(this.product);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    Update() {
      this.is_update = false;
    },
  },
};
</script>

<style>
@import "../assets/css/tailwind-2.0.4.css";
@import "element-plus/dist/index.css";

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1000px;
}
</style>
