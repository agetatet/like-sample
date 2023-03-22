<template>
    <div class="jsLikeButton" :class="className" @click="setLike($event)">
        <!-- いいねアイコンはcssで設定。クラス名によって表示を変更 -->
    </div>
</template>

<script>
    module.exports = {
        delimiters: ['(%', '%)'], // Vue.js のデータバインディングは二重中括弧で blade と重複するため変更
        data: function() {
            return {
                likes: [],
                className: 'unLike'
            }
        },
        created: function () {
            // 画面表示の度にお気に入りの状態を更新
            window.addEventListener('pageshow', this.init);
        },
        beforeDestroy() {
            window.removeEventListener('pageshow', this.init);
        },
        props: ['id'],
        methods: {
            init() {
                // お気に入りを取得して変数に保持
                this.likes = this.getLikes();
                this.setClassName();
            },
            getLikes() {
                let values = [];
                let localStorageValues = JSON.parse(localStorage.getItem('likes'));
                if (localStorageValues) {
                    values = localStorageValues;
                }
                return values;
            },
            isLiked() {
                let indexPosition = this.likedIndexPosition();
                // 含まれている
                if (this.likes && -1 < indexPosition) {
                    return true;
                }
                // 含まれていない
                return false;
            },
            likedIndexPosition() {
                // 配列の何番目のインデックスに含まれているか（配列中にマッチする値が含まれなければ-1を返す）
                return this.likes.indexOf(this.id);
            },
            setClassName() {
                // 既にお気に入りか
                if (this.isLiked()) {
                    this.className = 'liked';
                } else {
                    this.className = 'unLike';
                }
            },
            setLike(event) {
                if (event) {
                    event.preventDefault();
                }
                // localStorageが存在している
                if (this.likes) {
                    // 既にお気に入り
                    if (this.isLiked()) {
                        let indexPosition = this.likedIndexPosition();
                        // お気に入りから該当idを除去
                        this.likes.splice(indexPosition, 1) ;
                    } else {
                        // お気に入り追加
                        this.likes.push(this.id);
                    }

                } else {
                    // localStorageが存在していない場合
                    // お気に入り追加
                    this.likes.push(this.id);
                }

                // 新しい値をlocalStorageに設定
                localStorage.setItem('likes', JSON.stringify(this.likes));
                // 表示の更新
                this.setClassName();
            },
        }
    }
</script>

<style scoped>
.jsLikeButton {
    width: 50px;
    height: 50px;
}
.jsLikeButton.unLike {
    background-image: url('data:image/svg+xml;charset=utf8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cdefs%3E%3Cstyle%3E.f%7Bfill%3Anone%3B%7D.g%7Bfill%3A%23dedfe4%3B%7D.h%7Bclip-path%3Aurl(%23e)%3B%7D.i%7Bclip-path%3Aurl(%23d)%3B%7D%3C%2Fstyle%3E%3CclipPath%20id%3D%22d%22%3E%3Crect%20class%3D%22f%22%20width%3D%2240%22%20height%3D%2240%22%2F%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%22e%22%3E%3Crect%20class%3D%22f%22%20width%3D%2240%22%20height%3D%2240%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20id%3D%22a%22%2F%3E%3Cg%20id%3D%22b%22%3E%3Cg%20id%3D%22c%22%3E%3Cg%20class%3D%22i%22%3E%3Cg%20class%3D%22h%22%3E%3Cpath%20class%3D%22g%22%20d%3D%22M20%2C2c9.93%2C0%2C18%2C8.07%2C18%2C18s-8.07%2C18-18%2C18S2%2C29.93%2C2%2C20%2C10.07%2C2%2C20%2C2M20%2C0C8.95%2C0%2C0%2C8.95%2C0%2C20s8.95%2C20%2C20%2C20%2C20-8.95%2C20-20S31.05%2C0%2C20%2C0%22%2F%3E%3Cpath%20class%3D%22g%22%20d%3D%22M20%2C28.5s2.63-2%2C3.6-2.74c2.52-1.91%2C5.12-3.89%2C5.12-7.14%2C0-1.65-.47-3.06-1.36-4.05-.85-.96-2.04-1.48-3.36-1.48-.03%2C0-.06%2C0-.1%2C0-1.95%2C.04-3.2%2C1-3.91%2C2.16-.71-1.16-1.96-2.12-3.91-2.16-.03%2C0-.06%2C0-.1%2C0-1.31%2C0-2.5%2C.53-3.36%2C1.48-.89%2C1-1.36%2C2.4-1.36%2C4.05%2C0%2C3.24%2C2.6%2C5.22%2C5.12%2C7.14%2C.97%2C.74%2C3.6%2C2.74%2C3.6%2C2.74h0Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E');
}
.jsLikeButton.liked {
    background-image: url('data:image/svg+xml;charset=utf8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20viewBox%3D%220%200%2040%2040%22%3E%3Cdefs%3E%3Cstyle%3E.f%7Bfill%3Anone%3B%7D.g%7Bfill%3A%23fa8186%3B%7D.h%7Bclip-path%3Aurl(%23e)%3B%7D.i%7Bclip-path%3Aurl(%23d)%3B%7D%3C%2Fstyle%3E%3CclipPath%20id%3D%22d%22%3E%3Crect%20class%3D%22f%22%20width%3D%2240%22%20height%3D%2240%22%2F%3E%3C%2FclipPath%3E%3CclipPath%20id%3D%22e%22%3E%3Crect%20class%3D%22f%22%20width%3D%2240%22%20height%3D%2240%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3Cg%20id%3D%22a%22%2F%3E%3Cg%20id%3D%22b%22%3E%3Cg%20id%3D%22c%22%3E%3Cg%20class%3D%22i%22%3E%3Cg%20class%3D%22h%22%3E%3Cpath%20class%3D%22g%22%20d%3D%22M20%2C2c9.92%2C0%2C18%2C8.07%2C18%2C18s-8.08%2C18-18%2C18S2%2C29.93%2C2%2C20%2C10.07%2C2%2C20%2C2M20%2C0C8.95%2C0%2C0%2C8.95%2C0%2C20s8.95%2C20%2C20%2C20%2C20-8.95%2C20-20S31.05%2C0%2C20%2C0%22%2F%3E%3Cpath%20class%3D%22g%22%20d%3D%22M20%2C28.5s2.63-2%2C3.6-2.74c2.52-1.91%2C5.12-3.89%2C5.12-7.14%2C0-1.65-.47-3.06-1.36-4.05-.85-.96-2.04-1.48-3.36-1.48-.03%2C0-.06%2C0-.09%2C0-1.95%2C.04-3.2%2C1-3.91%2C2.16-.71-1.16-1.96-2.12-3.91-2.16-.03%2C0-.06%2C0-.1%2C0-1.31%2C0-2.5%2C.53-3.36%2C1.48-.89%2C1-1.36%2C2.4-1.36%2C4.05%2C0%2C3.24%2C2.6%2C5.22%2C5.12%2C7.14%2C.97%2C.74%2C3.6%2C2.74%2C3.6%2C2.74Z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E');
}
.jsLikeButton img {
    width: 100%;
}
</style>
