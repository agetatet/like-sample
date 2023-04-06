<template>
        <div class="page bg-dots" id="pageList">
            <PageHeader></PageHeader>

            <div class="container mt-5">
                <div class="row">
                    <div v-for="item in items" :key="item.id" class="col-12 col-md-6 mb-3">
                        <div @click="pushPage(item)" class="card characterCard p-4">
                            <!-- いいねアイコン -->
                            <Like :id="item.id" @click="noPushPage($event)"></Like>

                            <div class="d-flex mt-2">
                                <!-- 画像 -->
                                <div>
                                    <img :src="imagePath(item.image)" :alt="item.name">
                                </div>

                                <!-- 説明 -->
                                <div class="ps-3">
                                    <h2>{{ item.name }}</h2>
                                    <p v-html="item.description" class="mt-2 text-sm text-muted"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import axios from 'axios';
import Like from "../components/Like.vue";
import PageHeader from "../components/PageHeader.vue";
import {characterImagePath} from "../const";
import router from "../router";

export default {
    name: "List",
    components: {Like, PageHeader},
    data() {
        return {
            items: [],
        }
    },
    beforeMount() {
        this.getItems();
    },
    methods: {
        getItems() {
            axios.get('data/data.json')
                .then(response => (this.items = response.data));
        },
        imagePath(image) {
            return characterImagePath + image;
        },
        pushPage(item) {
            router.push({
                name: 'Detail',
                params: {
                    id: item.id
                }
            });
        },
        noPushPage($event) {
            $event.stopPropagation()
        }
    }
}
</script>

<style scoped>
#pageList .characterCard {
    position: relative;
}
#pageList .characterCard img {
    max-width: 100px;
}
#pageList .characterCard::after {
    content: "";
    position: absolute;
    right: 30px;
    top: 50%;
    width: 40px;
    height: 8px;
    border-bottom: 1px solid var(--main);
    border-right: 1px solid var(--main);
    transform: skew(45deg);
    transition: all .5s;
}
#pageList .characterCard:hover::after {
    right: 20px;
}
#pageList .characterCard:hover {
    cursor: pointer;
}
</style>
