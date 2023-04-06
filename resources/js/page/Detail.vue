<template>
    <div class="page bg-dots" id="pageDetail">
        <PageHeader></PageHeader>

        <div class="container">
            <div v-if="isExistItem" class="mt-5 characterDetail">
                <!-- いいねアイコン -->
                <Like :id="item.id"></Like>

                <!-- 画像 -->
                <div class="text-center">
                    <img :src="imagePath(item.image)" :alt="item.name">
                </div>
                <!-- 説明 -->
                <div class="card mt-3 p-4">
                    <h2>{{ item.name }}</h2>
                    <p v-html="item.description" class="mt-2 text-sm text-muted"></p>
                </div>
            </div>
            <!-- 該当するキャラクター無し -->
            <div v-else class="mt-5 text-center">
                <p>{{ message }}</p>
            </div>

            <a @click="pushPage()" class="backBtn">一覧に戻る</a>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {characterImagePath} from "../const";
import {messages} from "../const";
import router from "../router";
import Like from "../components/Like.vue";
import PageHeader from "../components/PageHeader.vue";

export default {
    name: "Detail",
    props: [ 'id' ],
    components: {Like, PageHeader},
    data() {
        return {
            item: {},
            message: '',
        }
    },
    beforeMount() {
        this.getItem();
    },
    computed: {
        isExistItem: function () {
            return Object.keys(this.item).length;
        }
    },
    methods: {
        getItem() {
            let items = [];
            try {
                axios.get('data/data.json')
                    .then(response => {
                        items = response.data;
                        if (!items.length) {
                            this.message = messages.canNotGet;
                            return;
                        }
                        items.forEach(item => {
                           if (String(item.id) === String(this.id)) {
                               this.item = item;
                           }
                        });
                    });
            } catch (err) {
                this.message = messages.canNotGet;
            } finally {
                items = [];
            }
        },
        imagePath(image) {
            return characterImagePath + image;
        },
        pushPage() {
            router.push({
                name: 'List',
            });
        }
    }
}
</script>

<style scoped>
#pageDetail .characterDetail img {
    max-width: 250px;
}
#pageDetail .backBtn:hover {
    cursor: pointer;
}
</style>
