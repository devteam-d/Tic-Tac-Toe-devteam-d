変数、クラスリスト

task-A index.html、style.css
container：
title：
board：
cell position-0：
cell position-1：
cell position-2：
cell position-3：
cell position-4：
cell position-5：
cell position-6：
cell position-7：
cell position-8：


task-B　main.js
cells：index.htmlの盤面のcellの要素を取得変更

turnText：index.htmlの<h2>の要素を取得変更。誰の番かを表示。勝敗や引き分けを表示

board：ゲーム盤の状態を管理するための配列。各セルに何が配置されているかを記録する

currentPlayer：現在のターンが誰か管理する。'player'か'computer'が入る

playerSymbol：このゲームはプレイヤー先攻で、先攻は✖

computerSymbol：後攻のコンピューターは〇

count：ターン数

gameActive：ゲームの状態を管理 trueなら継続、falseなら終了

winPatterns：価値条件の配列

task-C style.css

modal: モーダル要素（ゲーム終了時の結果表示用）を取得する。

resultText: 勝敗や引き分けの結果を表示するテキスト要素を取得する。

restartBtn: リスタートボタンの要素を取得する。

showResult(winner): 勝者や引き分けの結果を表示する。モーダル画面を表示し、結果テキストを更新する。

restartBtn.addEventListener("click", function () { ... }): リスタートボタンがクリックされたときに、ゲームを初期化して再開する。