<template>
  <main class="profile-page">
    <section class="relative block h-1000-px">
     <el-row style="margin-top:50px">
      <el-col :span="20"></el-col>
      <el-col :span="4"><el-button type="primary" @click="CreateNew()">Create New Product</el-button></el-col>
     </el-row>
     <div v-for="item,index in list_product" :key="item">
      <el-row :gutter="20" style="margin:70px 20px" v-if="index%4==0">
          <el-col :span="6">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{list_product[index].name}}</span>
              </div>
            </template>
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="22">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg" alt="Girl in a jacket" width="300" height="300">
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
            <el-row style="margin:10px;" >
              <el-col :span="12">Số lượng: {{item.quantity}}</el-col>
              <el-col :span="12"><el-button type="primary" @click="Detail(list_product[index].id)">Xem chi tiết</el-button></el-col>
            </el-row>
          </el-card>  
        </el-col>
        <el-col :span="6" v-if="index+1<list_product.length">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{list_product[index+1].name}}</span>
              </div>
            </template>
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="22">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg" alt="Girl in a jacket" width="300" height="300">
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
            <el-row style="margin:10px;" >
              <el-col :span="12">Số lượng: {{list_product[index+1].quantity}}</el-col>
              <el-col :span="12"><el-button type="primary"  @click="Detail(list_product[index+1].id)">Xem chi tiết</el-button></el-col>
            </el-row>          </el-card>  
        </el-col>
        <el-col :span="6" v-if="index+2<list_product.length">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{list_product[index+2].name}}</span>
              </div>
            </template>
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="22">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg" alt="Girl in a jacket" width="300" height="300">
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
            <el-row style="margin:10px;" >
              <el-col :span="12">Số lượng: {{list_product[index+2].quantity}}</el-col>
              <el-col :span="12"><el-button type="primary"  @click="Detail(list_product[index+2].id)">Xem chi tiết</el-button></el-col>
            </el-row>          
          </el-card>  
        </el-col>
        <el-col :span="6" v-if="index+3<list_product.length">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>{{list_product[index+3].name}}</span>
              </div>
            </template>
            <el-row>
              <el-col :span="1"></el-col>
              <el-col :span="22">
              <img src="https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg" alt="Girl in a jacket" width="300" height="300">
              </el-col>
              <el-col :span="1"></el-col>
            </el-row>
            <el-row style="margin:10px;" >
              <el-col :span="12">Số lượng: {{list_product[index+3].quantity}}</el-col>
              <el-col :span="12"><el-button type="primary"  @click="Detail(list_product[index+3].id)">Xem chi tiết</el-button></el-col>
            </el-row>
           </el-card>  
        </el-col>
      </el-row>
      </div>
    
    </section>
    <el-drawer v-model="drawer" title="Create Product" size="40%">
    <div>
      <el-row class="row">
        <el-col :span="8"> Name Product</el-col>
        <el-col :span="16"><el-input v-model="product.name" placeholder="Please input" /></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8"> Category</el-col>
        <el-col :span="16">
          <el-select v-model="product.category" class="m-2" placeholder="Select">
            <el-option
              v-for="item in list_category"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8"> Description</el-col>
        <el-col :span="16"> <el-input
          v-model="product.description"
          :rows="2"
          type="textarea"
          placeholder="Please input"
          maxlength="1000"
          show-word-limit
        /></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8"> Price</el-col>
        <el-col :span="16"><el-input-number v-model="product.price" :min="0" :max="100000000" @change="handleChange" /></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8"> Quantity</el-col>
        <el-col :span="16"><el-input-number v-model="product.quantity" :min="0" :max="100000000" @change="handleChange" /></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8">Prioty</el-col>
        <el-col :span="16"><el-input-number v-model="product.priority" :min="0" :max="100000000" @change="handleChange" /></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8">Sale Date</el-col>
          <el-col :span="16"> <el-date-picker
          v-model="product.sale_date"
          type="date"
          placeholder="Pick a day"
          :size="size"
        /></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8">Image</el-col>
        <el-col :span="16">
          <input type="file" @change="uploadFile" ref="file">
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="8">Publish</el-col>
        <el-col :span="16"><el-checkbox v-model="product.active"/></el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="18"></el-col>
        <el-col :span="4"><el-button type="primary" @click="Create()">Create</el-button></el-col>
      </el-row>
      
    </div>
  </el-drawer>

  </main>
</template>

<script>
import http from "../services/index";

export default {
  data(){
    return {
      drawer : false,
      product: {
        name: '',
        category: '',
        description: '',
        price : 1000,
        quantity:0,
        priority:0,
        sale_date:'',
        active: true,
      },
      list_product : [],
      list_category : [],
      image : null,
    }
  },
    mounted(){  
      const id = this.$store.state.auth.store.id
      http
      .get(`/products/store?storeId=${id}`)
      .then(response =>{
        this.list_product = response.data
        console.log("product")
        console.log(this.list_product)
      })   
      .catch(err=>{
        console.log(err)
      })
    },
    methods:{

      uploadFile() {
        this.image = this.$refs.file.files[0];
      },

      CreateNew(){
        http
        .get("/categories")
            .then((response) => {
                this.list_category= response.data
                console.log(this.list_category)

        });

        this.drawer = true
      },
      Create(){    
        var lst = []
        lst.push(this.image)        
        let formData = new FormData();
        formData.append('files', lst);
        formData.append('name', this.product.name);
        formData.append('description', this.product.description);
        formData.append('price', this.product.price);
        formData.append('quantity', this.product.quantity);
        formData.append('limitPrioty', this.product.priority);
        formData.append('store_id', "0b166211-f47a-49ab-b65a-e47f69690bb6");
        formData.append('category_id', this.product.category);

        http
        .post("http://34.143.194.243:9090/api/products", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }})
            .then((response) => {
                console.log("da luu")
                console.log(response.data)
        });
    },
    Detail(id){
      this.$router.push(`/shop/products/${id}`);
    }
  },  
  }
</script>

<style>
@import "../assets/css/tailwind-2.0.4.css";
@import "element-plus/dist/index.css";

.row{
  margin-top:30px
}

</style>
