const modal = document.getElementById("modal");
const resultText = document.getElementById("result-text");
const restartBtn = document.getElementById("restart-btn");
let cells = document.querySelectorAll(".cell"); // セルの要素を取得
let turnText = document.querySelector("h2"); // ターン表示の要素を取得
let board = Array(9).fill(undefined); // 盤面の状態を保存する配列
let currentPlayer = 'player'; // 現在のターン（'player' または 'computer'）
let playerSymbol = '✖';
let computerSymbol = '◯';
let count = 0; // ターン数
let gameActive = true; // ゲーム状態を管理、trueで継続、falseで終了

const winPatterns = [
    [0, 1, 2], // 横
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // 縦
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // 斜め
    [2, 4, 6],
];

// 初期化、一部プレイヤーの操作
function init() {
    cells.forEach(function(cell, index)  { //cell, indexでどのセルか特定
        cell.textContent = ''; // すべてのセルをクリア
        cell.onclick = function() {
            handlePlayerMove(index)
        }; // handlePlayerMove(index)が呼び出される。
        // 初手でもカーソルに✖を表示するように設定
        cell.addEventListener("mouseover", function () {
            if (currentPlayer === 'player' && board[index] === undefined) {
                cell.textContent = playerSymbol; // プレイヤーの記号をセルに表示
            }
        });

        cell.addEventListener("mouseout", function () {
            if (currentPlayer === 'player' && board[index] === undefined) {
                cell.textContent = ''; // セルの記号をクリア
            }
        });
    });
    board.fill(undefined); // 盤面をリセット
    currentPlayer = 'player'; // プレイヤーが先攻
    count = 0; // ターンカウントをリセット
    turnText.textContent = "Your Turn"; // 初期のターン表示でindexファイルの<h2></h2>に"Your Turn"が表示される
    gameActive = true; // ゲームを再開
}

// プレイヤーの操作
function handlePlayerMove(index) {//クリックされたセルにプレイヤーの記号（✖）をセットする処理
    // 以下の3つの条件のいずれかが（||はOR演算子）当てはまる場合処理を行わない
    // !gameActiveでゲームが終了している場合
    // board[index] !== undefinedでクリックしたセルにすでに記号が入っている場合
    // currentPlayer !== 'player'現在のターンがプレイヤーでない場合
    if (!gameActive || board[index] !== undefined || currentPlayer !== 'player') return; // ゲームが進行可能かどうかをチェック

    board[index] = playerSymbol; // board配列の指定されたindex(クリックされたセル)にプレイヤーの記号をセット
    cells[index].textContent = playerSymbol; // 画面にプレイヤーがクリックしたセルにプレイヤーの記号を表示
    count++; //ゲームのターンをカウント
    checkGameStatus(); // 現在の盤面を基に勝敗判定

    if (gameActive) { // gameActiveがtrue（ゲームがまだ終了していない）場合
        currentPlayer = 'computer'; // コンピューターのターンに切り替え
        turnText.textContent = "Computer's Turn"; // indexファイルの<h2></h2>に"Computer's Turn"が表示される
        setTimeout(function(){
            console.log("Computer's turn executed");
            handleComputerMove();
        }, 1000); //1000ミリ秒後に handleComputerMove 関数が呼ばれるようにし、コンピューターの手番の遅延を実行
    }
}

// コンピューターの操作
function handleComputerMove() {
    // 以下の2つの条件のいずれかが（||はOR演算子）当てはまる場合処理を行わない（コンピューターの動きを止める）
    // !gameActiveでゲームが終了している場合
    // currentPlayer !== 'player'現在のターンがコンピューターでない場合
    if (!gameActive || currentPlayer !== 'computer') return;

    // 空いているセルからランダムに選択
    let availableCells = board.map(function(value, index) { // 現在のboard配列の各セルの状態（undifined、〇、✖）、index：セルの位置 
        if (value === undefined) { //セルが空（undefined）の場合
            return index; // そのindexを返す
        } else { // セルに記号が入っている場合
            return null; // nullを返す
        } // 空のcellのindexとnullの配列が返される
    }).filter(function(index) { //このindex配列にnullも交じっている
        return index !== null; // index配列からnullを取り除き、空いているセル（undefinedのセル）のindex配列になる
    });
    //コンピューターの駒を置く法則
    // Math.randomで0以上1未満のランダムな浮動小数を生成し、空いているセルの数をかける（indexの範囲内でランダムに選択するため）、その結果をMath.floor()で整数化する
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)]; 

    board[randomIndex] = computerSymbol; // 盤面に記録
    cells[randomIndex].textContent = computerSymbol; // セルに記号を表示
    count++;
    checkGameStatus(); // 勝敗判定

    if (gameActive) {
        currentPlayer = 'player'; // プレイヤーのターンに切り替え
        turnText.textContent = "Your Turn"; // indexファイルの<h2></h2>に"Computer's Turn"から"Your Turn"に表示変更
    }
}

// 勝敗または引き分けの判定
function checkGameStatus() {
    for (let pattern of winPatterns) { // patternにwinPatternsが格納される
        let [a, b, c] = pattern; // patternの配列をa,b,cに分割して代入　例えばpattern[0,1,2]をa=0,b=1,c=2という形にします
        // a,b,cには勝利パターンに該当するインデックスが格納されます
        if (board[a] && board[a] === board[b] && board[b] === board[c]) { // board[a],board[b],board[c]の3つのセルの状態をチェックします 3つのセルに同じ記号が入っていればtrue
            // board[a] && board[a]はどちらか記号が入っていればtrue入っていなければ（undefined）false、
            // board[a] === board[b]は同じ記号が入っていればtrue
            // board[b] === board[c]は同じ記号が入っていればtrue
            
            turnText.textContent = board[a] === playerSymbol ? "You Win!" : "Computer Wins!"; 
            // board[a]がプレイヤーの記号playerSymbolと等しいかチェックし、等しい場合はプレイヤー勝利、等しくない場合はコンピューターの勝利のテキストを表示
            
            showResult(board[a] === playerSymbol ? "X" : "O"); //
            gameActive = false; // ゲーム終了
            return;
        }
    }

    if (!board.includes(undefined)) { // board配列に空のセル（undefined）が存在するか調べる
        // 全てのセルが埋まっている場合true、空のセルがある場合false
        showResult("Draw");//
        gameActive = false; // ゲーム終了
    }
}

// 結果を表示する関数
function showResult(winner) {
  resultText.textContent = winner === "Draw"
    ? "Draw!"
    : `${winner} Wins!!!`;
  modal.classList.remove("hidden"); // hiddenクラスを取り除くことによってmodal画面が表示される
}

// リスタートボタンが押されたときの処理
restartBtn.addEventListener("click", function () {
  modal.classList.add("hidden"); // hiddenクラスを足し戻すことでモーダルを非表示
  init(); // 盤面を初期化（既存のinit関数を呼び出し）
});

// ゲーム開始時の初期化
init();