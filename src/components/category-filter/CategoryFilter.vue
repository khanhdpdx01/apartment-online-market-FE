<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <TransitionRoot as="template" :show="mobileFiltersOpen">
        <Dialog
          as="div"
          class="relative z-40 lg:hidden"
          @close="mobileFiltersOpen = false"
        >
          <TransitionChild
            as="template"
            enter="transition-opacity ease-linear duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div class="fixed inset-0 z-40 flex">
            <TransitionChild
              as="template"
              enter="transition ease-in-out duration-300 transform"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel
                class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
              >
                <div class="flex items-center justify-between px-4">
                  <h2 class="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    @click="mobileFiltersOpen = false"
                  >
                    <span class="sr-only">Close menu</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <!-- Filters -->
                <form class="mt-4 border-t border-gray-200">
                  <Disclosure
                    as="div"
                    v-for="section in filters"
                    :key="section.id"
                    class="border-t border-gray-200 px-4 py-6"
                    v-slot="{ open }"
                  >
                    <h3 class="-mx-2 -my-3 flow-root">
                      <DisclosureButton
                        class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
                      >
                        <span class="font-medium text-gray-900">{{
                          section.name
                        }}</span>
                        <span class="ml-6 flex items-center">
                          <PlusIcon
                            v-if="!open"
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                          <MinusIcon
                            v-else
                            class="h-5 w-5"
                            aria-hidden="true"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel class="pt-6">
                      <div class="space-y-6">
                        <div
                          v-for="(option, optionIdx) in section.options"
                          :key="option.value"
                          class="flex items-center"
                        >
                          <input
                            :id="`filter-mobile-${section.id}-${optionIdx}`"
                            :name="`${section.id}[]`"
                            :value="option.value"
                            type="checkbox"
                            :checked="option.checked"
                            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            :for="`filter-mobile-${section.id}-${optionIdx}`"
                            class="ml-3 min-w-0 flex-1 text-gray-500"
                            >{{ option.label }}</label
                          >
                        </div>
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>

      <main class="mx-auto w-full px-10 sm:px-6 lg:px-8">
        <div
          class="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6"
        >
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            Lọc sản phẩm
          </h1>
        </div>

        <section aria-labelledby="products-heading" class="pt-6 pb-24">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block">
              <Disclosure
                as="div"
                v-for="section in filters"
                :key="section.id"
                class="border-b border-gray-200 py-6"
                v-slot="{ open }"
              >
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span class="font-medium text-gray-900">{{
                      section.name
                    }}</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon
                        v-if="!open"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                      <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="space-y-4">
                    <div
                      v-for="(option, optionIdx) in section.options"
                      :key="option.value"
                      class="flex items-center"
                    >
                      <input
                        :id="`filter-${section.id}-${optionIdx}`"
                        :name="`${section.id}[]`"
                        :value="option.value"
                        type="checkbox"
                        :checked="option.checked"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        :for="`filter-${section.id}-${optionIdx}`"
                        class="ml-3 text-sm text-gray-600"
                        >{{ option.label }}</label
                      >
                    </div>
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <!-- Price fiflter -->
              <Disclosure
                as="div"
                class="border-b border-gray-200 py-6"
                v-slot="{ open }"
              >
                <h3 class="-my-3 flow-root">
                  <DisclosureButton
                    class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                  >
                    <span class="font-medium text-gray-900">Price</span>
                    <span class="ml-6 flex items-center">
                      <PlusIcon
                        v-if="!open"
                        class="h-5 w-5"
                        aria-hidden="true"
                      />
                      <MinusIcon v-else class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel class="pt-6">
                  <div class="flex items-center">
                    <input
                      type="text"
                      placeholder="Type here"
                      class="flex-1 input input-bordered w-2/5 max-w-xs"
                    />
                    <div class="inline-block justify-center mx-1">-</div>
                    <input
                      type="text"
                      placeholder="Type here"
                      class="flex-1 input input-bordered w-2/5 max-w-xs"
                    />
                  </div>
                </DisclosurePanel>
              </Disclosure>

              <div class="w-full flex justify-center mt-4">
                <button class="btn btn-primary w-1/2 m-">Áp dụng</button>
              </div>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              <!-- Replace with your content -->
              <!-- This example requires Tailwind CSS v2.0+ -->
              <div class="border-b border-gray-200">
                <div class="sm:flex sm:items-baseline">
                  <div class="mt-4 sm:mt-0 sm:ml-10">
                    <nav class="-mb-px flex space-x-8">
                      <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" -->
                      <a
                        href="#"
                        class="border-indigo-500 text-indigo-600 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                        aria-current="page"
                      >
                        Hàng mới
                      </a>

                      <a
                        href="#"
                        class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                      >
                        Giá thấp đến cao
                      </a>
                      <a
                        href="#"
                        class="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm"
                      >
                        Giá cao đến thấp
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
              <div class="h-96 rounded-lg lg:h-full">
                <div
                  class="my-5 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                >
                  <CardItem
                    v-for="x in 10"
                    :key="x"
                    @click="viewDetailProduct"
                  />
                </div>
              </div>
              <!-- /End replace -->
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/vue/20/solid";

import CardItem from "../card/CardItem.vue";

const filters = [
  {
    id: "stage",
    name: "Stage",
    options: [
      { value: "stage1", label: "Stage 1", checked: false },
      { value: "stage2", label: "Stage 2", checked: false },
      { value: "stage3", label: "Stage 3", checked: true },
      { value: "stage4", label: "Stage 4", checked: false },
      { value: "stage5", label: "Stage 5", checked: false },
      { value: "stage6", label: "Stage 6", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
      { value: "travel", label: "Travel", checked: true },
      { value: "organization", label: "Organization", checked: false },
      { value: "accessories", label: "Accessories", checked: false },
    ],
  },
];

const mobileFiltersOpen = ref(false);
</script>
