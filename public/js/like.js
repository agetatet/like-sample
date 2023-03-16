$(function () {
    window.addEventListener('pageshow', () => {

        const likes = getLike();

        // いいねアイコンへクラスを設定
        setLikeClass();

        $('.jsLikeButton').on('click', function (event) {
            // a要素の遷移を停止
            event.preventDefault();

            let id = $(this).attr('id');
            setLike(id);
        });

        // localStorageからお気に入りを取得
        function getLike() {
            let values = [];
            let localStorageValues = JSON.parse(localStorage.getItem('likes'));
            if (localStorageValues) {
                values = localStorageValues;
            }
            return values;
        }

        function setLikeClass() {
            $('.jsLikeButton').each(function () {
                let id = $(this).attr('id');

                // お気に入りに関するクラスをすべて削除
                $(this).removeClass('unLike liked');
                let className = 'unLike';
                // 既にお気に入りか
                if (isLiked(id)) {
                    className = 'liked';
                }
                $(this).addClass(className);
            });
        }

        // localStorageにお気に入りを設定
        function setLike(id) {
            // localStorageが存在している
            if (likes) {
                // 既にお気に入り
                if (isLiked(id)) {
                    let indexPosition = likedIndexPosition(id);
                    // お気に入りから該当idを除去
                    likes.splice(indexPosition, 1) ;
                } else {
                    // お気に入り追加
                    likes.push(id);
                }

            } else {
                // localStorageが存在していない場合
                // お気に入り追加
                likes.push(id);
            }

            // 新しい値をlocalStorageに設定
            localStorage.setItem('likes', JSON.stringify(likes));
            // いいねアイコンへクラスを設定
            setLikeClass();
        }

        // 既にお気に入りに設定されているか
        function isLiked(id) {
            var indexPosition = likedIndexPosition(id);
            // 含まれている
            if (likes && 0 <= indexPosition) {
                return true;
            }
            // 含まれていない
            return false;
        }

        function likedIndexPosition(id) {
            // 配列の何番目のインデックスに含まれているか（配列中にマッチする値が含まれなければ-1を返す）
            return $.inArray(id, likes);
        }

    });

});
