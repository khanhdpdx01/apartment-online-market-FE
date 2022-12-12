<template>
    <section>
        <form action="">
            <div class="bg-no-repeat bg-cover bg-center relative"
                style="background-image: url(https://www.cask.vn/wwwroot/resources/img/news/5-2019/rsz_h7.jpg);">
                <div class="absolute bg-gradient-to-b"></div>
                <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
                    <div class="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
                        <div class="self-start hidden lg:flex flex-col  text-white">
                            <img src="" class="mb-3">
                        </div>
                    </div>

                    <div class="flex justify-center self-center  z-10">
                        <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
                            <div class="mb-4">
                                <div :class="[showErrorRegister ? 'title error' : 'title']">
                                    <h3 class="font-semibold text-2xl text-gray-800">Sign Up</h3>
                                    <p style="color:red;" id="invalidAccount"></p>
                                </div>
                            </div>
                            <div class="space-y-5">
                                <div class="space-y-2">
                                    <label class="text-sm font-medium text-gray-700 tracking-wide">Username</label>
                                    <input
                                        class=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        type="text" @click.prevent="removePlaceHolderUsername()" placeholder="Enter username"
                                        id="username">
                                </div>
                                <div class="space-y-2">
                                    <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                       Password
                                    </label>
                                    <input
                                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        type="password" @click.prevent="removePlaceHolderPassword()"
                                        placeholder="Enter your password" id="password">
                                </div>
                                <div class="space-y-2">
                                    <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                       Confirm Password
                                    </label>
                                    <input
                                        class="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                                        type="password" @click.prevent="removePlaceHolderAgainPassword()"
                                        placeholder="Enter your password again" id="passwordAgain">
                                </div>
                                
                                <div>
                                    <button type="submit" @click.prevent="register()"
                                        class="w-full flex justify-center bg-blue-400  hover:bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                        Sign up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </section>
</template>
<style>
@import "../assets/css/tailwind-2.0.4.css";
</style>

<script>
import { logicalExpression } from '@babel/types';

export default {
    name: "Register",
    data() {
        return {
            username: '',
            password: '',
            showErrorRegister: false,
            showErrorUsername: false,
            showErrorPassword: false,
        };
    },
    methods: {
        removePlaceHolderUsername() {
            this.showErrorRegister = false;
            this.showErrorUsername = false;
            this.showErrorPassword = false;
            document.getElementById("username").placeholder = "";
            document.getElementById("invalidAccount").innerText = ''
        },

        removePlaceHolderPassword() {
            document.getElementById("password").placeholder = "";
            document.getElementById("invalidAccount").innerText = ''
        },
        removePlaceHolderAgainPassword() {
            document.getElementById("passwordAgain").placeholder = "";
        },

        register(){
            const username = document.getElementById("username");
            const password = document.getElementById("password");
            if(username.value == "" || password.value ==""){
                document.getElementById("invalidAccount").innerText = 'Please enter username and password'
            }
        }

    }

}
</script>