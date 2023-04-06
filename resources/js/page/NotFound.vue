<template>
    <div class="page bg-dots" id="pageDetail">
        <PageHeader></PageHeader>

        <div class="container">
            <div class="text-center">
                <small class="text-muted">NOT FOUND</small>
                ページが見つかりませんでした
            </div>
            <a @click="pushPage()" class="backBtn">一覧に戻る</a>
        </div>
    </div>
</template>

<script>
import router from "../router";
import PageHeader from "../components/PageHeader.vue";

export default {
    name: "NotFound",
    components: {PageHeader},
    methods: {
        pushPage() {
            router.push({
                name: 'List',
            });
        }
    }
}
</script>

<style scoped>

</style>
