$(function() {
    // ゲーム盤のマス目クリック時に、以下の関数を実行
    $("td").click(function() {
      // マス目に入力
      $(this).html("〇")
    })
  })