// HTML要素を取得
const modal = document.getElementById("modal");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");

// 結果を表示する関数
function showResult(winner) {
  resultText.textContent = winner === "Draw"
    ? "Draw!"
    : `${winner} Wins!!!`;
  modal.classList.remove("hidden");
}

// リスタートボタンが押されたときの処理
restartBtn.addEventListener("click", function () {
  modal.classList.add("hidden"); // モーダルを非表示
  init(); // 盤面を初期化（既存のinit関数を呼び出し）
});

// 勝敗が決したらモーダルを表示（例: checkGameStatusから呼び出し）
function checkGameStatus() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      showResult(board[a] === playerSymbol ? "X" : "O");
      gameActive = false;
      return;
    }
  }

  if (!board.includes(undefined)) {
    showResult("Draw");
    gameActive = false;
  }
}
