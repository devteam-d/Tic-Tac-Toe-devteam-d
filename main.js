$(function() {
    // 定数定義
    const FIRST = 0
    const MARU  = "〇"
    const BATSU = "×"

    let now_attack = FIRST // 0：先攻、1：後攻
    let got_match  = false // 勝敗がついたか
    let move_count = 0 // 進んだ手数

    // そろうパターン
    const complete_patterns = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    // ゲーム盤のマス目クリック時に、以下の関数を実行
    $("td").click(function() {
        // 既に入力されているセル(空でないセル)をクリックした場合
        if ($(this).html() !== "") {
            alert("入力できません")
            return
        }

        // 勝敗がついた後に空のセルをタップした場合
        if (got_match) {
            alert("決着がつきました。画面をリロードしてください")
        } else {
            // セルに入力する記号
            let result_symbol = now_attack ? BATSU : MARU
            // セルに入力
            $(this).html(result_symbol)
            // 進んだ手数をカウント
            move_count++
            // 先攻後攻入れ替え
            now_attack = !now_attack
            
            // 勝敗判定
            if (check_complete()) {
                got_match = true
                alert(result_symbol + "の勝ち！")
            } else if (move_count === 9) {
                got_match = true;
                alert("引き分けです！")
            }
        }
    })
    function check_complete() { // そろったか判定
        let results = $("td").get()
        let completed = false

        // そろう８パターンがあるかチェック
        for (let cnt = 0; cnt < complete_patterns.length; cnt++) {
            
            // ８つのパターンから1つのパターンを抽出し、そのパターンのセル番号をさらに抽出
            let pattern = complete_patterns[cnt]
            
            // チェック対象の３つのセルを抽出
            let cell1 = $(results[pattern[0]]).html()
            let cell2 = $(results[pattern[1]]).html()
            let cell3 = $(results[pattern[2]]).html()

            // ３つのセルの内容が等しいか確認（undefined や　"" で全て一致することを避けるため、cell1だけ中身をチェック）
            completed = cell1 && cell1 == cell2 && cell2 == cell3 && cell3 == cell1
            // １つでもそろった行・列がある場合はチェックを終了
            if (completed) break
        }
        return completed
    }
})