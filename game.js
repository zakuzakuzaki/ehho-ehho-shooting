class BarnOwlGame {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.triviaElement = document.getElementById("trivia");

    this.owl = {
      x: 100,
      y: 250,
      width: 60,
      height: 80,
      velocityY: 0,
      onGround: true,
      animFrame: 0,
      walkCycle: 0,
    };

    this.enemies = [];
    this.projectiles = [];
    this.triviaBalls = [];
    this.gameState = "playing";
    this.generateEnemies();

    this.camera = { x: 0 };
    this.lastTime = 0;
    this.stepSound = 0;
    this.enemySpawnTimer = 0;
    this.enemySpawnInterval = 1000;
    this.triviaBallSpawnTimer = 0;
    this.triviaBallSpawnInterval = 2000;
    this.score = 0;
    this.isShowingTrivia = false;
    this.speechBubbleTimer = 0;

    this.trivia = [
      "F1カーは1秒で約50m進みますって伝えなきゃ！",
      "シロナガスクジラの心臓は小型車ほどの大きさですって伝えなきゃ！",
      "太陽の質量は太陽系全体の99.86%を占めていますって伝えなきゃ！",
      "「ありがとう」は「有り難し（ありがたし）」が語源ですって伝えなきゃ！",
      "1日は地球で24時間ですが、金星では243地球日ですって伝えなきゃ！",
      "カレーはイギリスの国民食でもありますって伝えなきゃ！",
      "水は4度で最も密度が高くなりますって伝えなきゃ！",
      "ダイヤモンドは炭素だけでできていますって伝えなきゃ！",
      "水は4度で最も密度が高くなりますって伝えなきゃ！",
      "タコには3つの心臓がありますって伝えなきゃ！",
      "チョコレートはかつて薬として使われていましたって伝えなきゃ！",
      "ダイヤモンドは炭素だけでできていますって伝えなきゃ！",
      "最初のコンピューターは部屋一つ分の大きさでしたって伝えなきゃ！",
      "日本語の『さようなら』は元々『左様ならば』の略ですって伝えなきゃ！",
      "DNAは1人の体内で合計180億kmにもなりますって伝えなきゃ！",
      "世界で最も多く話されている言語は中国語ですって伝えなきゃ！",
      "ナマケモノは1日にわずか20メートルしか移動しませんって伝えなきゃ！",
      "日本の最古の会社は578年創業の金剛組ですって伝えなきゃ！",
      "相撲は世界最古の格闘技の一つですって伝えなきゃ！",
      "オリンピックの五輪は5大陸を表していますって伝えなきゃ！",
      "光よりも速く移動するものはありませんって伝えなきゃ！",
      "シロナガスクジラの心臓は小型車ほどの大きさですって伝えなきゃ！",
      "F1カーは1秒で約50m進みますって伝えなきゃ！",
      "1秒間に世界中で約10万件のGoogle検索が行われていますって伝えなきゃ！",
      "宇宙では無音です。音は空気がないと伝わりませんって伝えなきゃ！",
      "インドには22の公用語がありますって伝えなきゃ！",
      "初のiPhoneは2007年に発売されましたって伝えなきゃ！",
      "ダイヤモンドは炭素だけでできていますって伝えなきゃ！",
      "アレクサンダー大王は30歳で世界の半分を征服しましたって伝えなきゃ！",
      "タコには3つの心臓がありますって伝えなきゃ！",
      "「ありがとう」は「有り難し（ありがたし）」が語源ですって伝えなきゃ！",
      "インドには22の公用語がありますって伝えなきゃ！",
      "日本語の『さようなら』は元々『左様ならば』の略ですって伝えなきゃ！",
      "チョコレートはかつて薬として使われていましたって伝えなきゃ！",
      "カレーはイギリスの国民食でもありますって伝えなきゃ！",
      "チョコレートはかつて薬として使われていましたって伝えなきゃ！",
      "ハチミツは腐らない唯一の自然食品ですって伝えなきゃ！",
      "オリンピックの五輪は5大陸を表していますって伝えなきゃ！",
      "DNAは1人の体内で合計180億kmにもなりますって伝えなきゃ！",
      "Googleは元々『BackRub』という名前でしたって伝えなきゃ！",
      "Googleは元々『BackRub』という名前でしたって伝えなきゃ！",
      "サッカーボールの黒と白の模様はテレビ放送のために考案されましたって伝えなきゃ！",
      "Wi-Fiの開発には天文学が関係していますって伝えなきゃ！",
      "水は4度で最も密度が高くなりますって伝えなきゃ！",
      "日本語の『さようなら』は元々『左様ならば』の略ですって伝えなきゃ！",
      "ナマケモノは1日にわずか20メートルしか移動しませんって伝えなきゃ！",
      "人間の体の60%以上は水でできていますって伝えなきゃ！",
      "ナポレオンは実際には平均身長でしたって伝えなきゃ！",
      "Wi-Fiの開発には天文学が関係していますって伝えなきゃ！",
      "日本の最古の会社は578年創業の金剛組ですって伝えなきゃ！",
      "シロナガスクジラの心臓は小型車ほどの大きさですって伝えなきゃ！",
      "インドには22の公用語がありますって伝えなきゃ！",
      "火星には地球の2倍の長さの季節がありますって伝えなきゃ！",
      "初のiPhoneは2007年に発売されましたって伝えなきゃ！",
      "土星は密度が低く、水に浮かぶかもしれませんって伝えなきゃ！",
      "最初のコンピューターは部屋一つ分の大きさでしたって伝えなきゃ！",
      "ハチミツは腐らない唯一の自然食品ですって伝えなきゃ！",
      "ゾウは決してジャンプできませんって伝えなきゃ！",
      "りんごは水分が約85%もありますって伝えなきゃ！",
      "漢字には約5万字ありますが、日常的に使うのは2000字程度ですって伝えなきゃ！",
      "光よりも速く移動するものはありませんって伝えなきゃ！",
      "りんごは水分が約85%もありますって伝えなきゃ！",
      "太陽の質量は太陽系全体の99.86%を占めていますって伝えなきゃ！",
      "カタツムリは3年眠ることができますって伝えなきゃ！",
      "サッカーボールの黒と白の模様はテレビ放送のために考案されましたって伝えなきゃ！",
      "「ありがとう」は「有り難し（ありがたし）」が語源ですって伝えなきゃ！",
      "火星には地球の2倍の長さの季節がありますって伝えなきゃ！",
      "カレーはイギリスの国民食でもありますって伝えなきゃ！",
      "バナナは実はベリーの一種ですって伝えなきゃ！",
      "ゾウは決してジャンプできませんって伝えなきゃ！",
      "ローマのコロッセオにはかつて海戦を再現するために水が満たされましたって伝えなきゃ！",
      "ナポレオンは実際には平均身長でしたって伝えなきゃ！",
      "ハチミツは腐らない唯一の自然食品ですって伝えなきゃ！",
      "世界で最も多く話されている言語は中国語ですって伝えなきゃ！",
      "世界で最も多く話されている言語は中国語ですって伝えなきゃ！",
      "1日は地球で24時間ですが、金星では243地球日ですって伝えなきゃ！",
      "ゾウは決してジャンプできませんって伝えなきゃ！",
      "バナナは実はベリーの一種ですって伝えなきゃ！",
      "火星には地球の2倍の長さの季節がありますって伝えなきゃ！",
      "アレクサンダー大王は30歳で世界の半分を征服しましたって伝えなきゃ！",
      "日本語の『さようなら』は元々『左様ならば』の略ですって伝えなきゃ！",
      "ナポレオンは実際には平均身長でしたって伝えなきゃ！",
      "1秒間に世界中で約10万件のGoogle検索が行われていますって伝えなきゃ！",
      "ピラミッドは建設時、白く輝いていた石灰岩で覆われていましたって伝えなきゃ！",
      "アレクサンダー大王は30歳で世界の半分を征服しましたって伝えなきゃ！",
      "太陽の質量は太陽系全体の99.86%を占めていますって伝えなきゃ！",
      "漢字には約5万字ありますが、日常的に使うのは2000字程度ですって伝えなきゃ！",
      "カレーはイギリスの国民食でもありますって伝えなきゃ！",
      "水は4度で最も密度が高くなりますって伝えなきゃ！",
      "ダイヤモンドは炭素だけでできていますって伝えなきゃ！",
      "マラソンの距離は元々オリンピアからアテネまでの距離に由来しますって伝えなきゃ！",
      "サッカーボールの黒と白の模様はテレビ放送のために考案されましたって伝えなきゃ！",
      "火星には地球の2倍の長さの季節がありますって伝えなきゃ！",
      "ローマのコロッセオにはかつて海戦を再現するために水が満たされましたって伝えなきゃ！",
      "「ありがとう」は「有り難し（ありがたし）」が語源ですって伝えなきゃ！",
      "1日は地球で24時間ですが、金星では243地球日ですって伝えなきゃ！",
      "サッカーボールの黒と白の模様はテレビ放送のために考案されましたって伝えなきゃ！",
      "ナマケモノは1日にわずか20メートルしか移動しませんって伝えなきゃ！",
      "ゾウは決してジャンプできませんって伝えなきゃ！",
      "ナポレオンは実際には平均身長でしたって伝えなきゃ！",
    ];

    this.currentTrivia = 0;
    this.triviaTimer = 0;

    this.keys = {};
    this.setupEventListeners();
    this.gameLoop();
  }

  generateEnemies() {
    for (let i = 0; i < 20; i++) {
      this.enemies.push({
        x: 500 + i * 300 + Math.random() * 200,
        y: 280,
        width: 40,
        height: 40,
        speed: 1 + Math.random() * 2,
        type: Math.random() > 0.5 ? "snake" : "spider",
        health: 1,
        alive: true,
      });
    }
  }

  spawnEnemy() {
    const spawnType = Math.random();
    let enemy;

    if (spawnType < 0.3) {
      // 右から来る敵 (30%)
      enemy = {
        x: this.camera.x + this.canvas.width + Math.random() * 200,
        y: 280,
        width: 40,
        height: 40,
        speedX: -(1 + Math.random() * 2),
        speedY: 0,
        type: Math.random() > 0.5 ? "snake" : "spider",
        health: 1,
        alive: true,
        direction: "right",
      };
    } else if (spawnType < 0.6) {
      // 左から来る敵 (30%)
      enemy = {
        x: this.camera.x - Math.random() * 200 - 50,
        y: 280,
        width: 40,
        height: 40,
        speedX: 1 + Math.random() * 2,
        speedY: 0,
        type: Math.random() > 0.5 ? "snake" : "spider",
        health: 1,
        alive: true,
        direction: "left",
      };
    } else if (spawnType < 0.8) {
      // 上から落ちてくる敵 (20%)
      enemy = {
        x: this.camera.x + Math.random() * this.canvas.width,
        y: -50,
        width: 40,
        height: 40,
        speedX: (Math.random() - 0.5) * 2,
        speedY: 2 + Math.random() * 2,
        type: "spider",
        health: 1,
        alive: true,
        direction: "top",
      };
      console.log("上から敵をスポーン:", enemy.x, enemy.y);
    } else {
      // 下から上がってくる敵 (20%)
      enemy = {
        x: this.camera.x + Math.random() * this.canvas.width,
        y: this.canvas.height + 50,
        width: 40,
        height: 40,
        speedX: (Math.random() - 0.5) * 1,
        speedY: -(1 + Math.random() * 2),
        type: "spider",
        health: 1,
        alive: true,
        direction: "bottom",
      };
      console.log("下から敵をスポーン:", enemy.x, enemy.y);
    }

    this.enemies.push(enemy);
  }

  spawnTriviaBall() {
    this.triviaBalls.push({
      x: this.camera.x + this.canvas.width + Math.random() * 300,
      y: 290,
      width: 30,
      height: 30,
      speedX: -2,
      bounceY: Math.random() * 2 - 1,
      alive: true,
    });
  }

  attack() {
    this.projectiles.push({
      x: this.owl.x + this.owl.width,
      y: this.owl.y + this.owl.height / 2,
      width: 15,
      height: 5,
      speed: 8,
      damage: 1,
    });
    console.log("ホーホー！");
  }

  updateProjectiles(deltaTime) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      let projectile = this.projectiles[i];
      projectile.x += projectile.speed;

      if (projectile.x > this.camera.x + this.canvas.width + 100) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  checkProjectileCollisions() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      let projectile = this.projectiles[i];

      for (let j = this.enemies.length - 1; j >= 0; j--) {
        let enemy = this.enemies[j];
        if (!enemy.alive) continue;

        if (
          projectile.x < enemy.x + enemy.width &&
          projectile.x + projectile.width > enemy.x &&
          projectile.y < enemy.y + enemy.height &&
          projectile.y + projectile.height > enemy.y
        ) {
          enemy.health -= projectile.damage;
          this.projectiles.splice(i, 1);

          if (enemy.health <= 0) {
            enemy.alive = false;
            console.log("敵を倒した！");
          }
          break;
        }
      }
    }
  }

  checkTriviaBallCollisions() {
    for (let i = this.triviaBalls.length - 1; i >= 0; i--) {
      let ball = this.triviaBalls[i];
      if (!ball.alive) continue;

      if (
        this.owl.x < ball.x + ball.width &&
        this.owl.x + this.owl.width > ball.x &&
        this.owl.y < ball.y + ball.height &&
        this.owl.y + this.owl.height > ball.y
      ) {
        ball.alive = false;
        this.triviaBalls.splice(i, 1);
        this.score++;
        this.showTrivia();
        console.log("トリビアボールを取得！スコア:", this.score);
      }
    }
  }

  checkCollisions() {
    if (this.gameState !== "playing") return;

    for (let enemy of this.enemies) {
      if (!enemy.alive) continue;

      if (
        this.owl.x < enemy.x + enemy.width &&
        this.owl.x + this.owl.width > enemy.x &&
        this.owl.y < enemy.y + enemy.height &&
        this.owl.y + this.owl.height > enemy.y
      ) {
        this.gameState = "gameOver";
        this.showGameOver();
        break;
      }
    }
  }

  showGameOver() {
    this.triviaElement.textContent = `ゲームオーバー！ 最終スコア: ${this.score} スペースキーでリスタート`;
    this.triviaElement.style.display = "block";
    this.triviaElement.style.background = "rgba(255, 0, 0, 0.9)";
    this.triviaElement.style.color = "white";
  }

  restart() {
    this.gameState = "playing";
    this.owl.x = 100;
    this.owl.y = 250;
    this.owl.velocityY = 0;
    this.camera.x = 0;
    this.enemies = [];
    this.projectiles = [];
    this.triviaBalls = [];
    this.generateEnemies();
    this.score = 0;
    this.isShowingTrivia = false;
    this.speechBubbleTimer = 0;
    this.triviaElement.style.display = "none";
    this.triviaElement.style.background = "rgba(255, 255, 255, 0.9)";
    this.triviaElement.style.color = "black";
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key] = false;
    });

    // タッチコントロール
    this.setupMobileControls();
  }

  setupMobileControls() {
    const leftBtn = document.getElementById("leftBtn");
    const rightBtn = document.getElementById("rightBtn");
    const jumpBtn = document.getElementById("jumpBtn");
    const attackBtn = document.getElementById("attackBtn");

    if (!leftBtn) return; // モバイルコントロールが存在しない場合は終了

    // 左移動
    leftBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.keys["ArrowLeft"] = true;
      leftBtn.classList.add("pressed");
    });
    leftBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.keys["ArrowLeft"] = false;
      leftBtn.classList.remove("pressed");
    });

    // 右移動
    rightBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.keys["ArrowRight"] = true;
      rightBtn.classList.add("pressed");
    });
    rightBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.keys["ArrowRight"] = false;
      rightBtn.classList.remove("pressed");
    });

    // ジャンプ
    jumpBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.keys[" "] = true;
      jumpBtn.classList.add("pressed");
    });
    jumpBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.keys[" "] = false;
      jumpBtn.classList.remove("pressed");
    });

    // 攻撃
    attackBtn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.keys["x"] = true;
      attackBtn.classList.add("pressed");
    });
    attackBtn.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.keys["x"] = false;
      attackBtn.classList.remove("pressed");
    });

    // マウスイベントも追加（デスクトップでのテスト用）
    [leftBtn, rightBtn, jumpBtn, attackBtn].forEach((btn) => {
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const key =
          btn.id === "leftBtn"
            ? "ArrowLeft"
            : btn.id === "rightBtn"
            ? "ArrowRight"
            : btn.id === "jumpBtn"
            ? " "
            : "x";
        this.keys[key] = true;
        btn.classList.add("pressed");
      });

      btn.addEventListener("mouseup", (e) => {
        e.preventDefault();
        const key =
          btn.id === "leftBtn"
            ? "ArrowLeft"
            : btn.id === "rightBtn"
            ? "ArrowRight"
            : btn.id === "jumpBtn"
            ? " "
            : "x";
        this.keys[key] = false;
        btn.classList.remove("pressed");
      });
    });
  }

  update(deltaTime) {
    if (this.gameState === "gameOver") {
      if (this.keys[" "]) {
        this.restart();
      }
      return;
    }

    const speed = 3;

    if (this.keys["ArrowRight"] || this.keys["d"]) {
      this.owl.x += speed;
      this.owl.walkCycle += deltaTime * 0.01;
      this.stepSound += deltaTime;

      if (this.stepSound > 800) {
        this.playStepSound();
        this.stepSound = 0;
      }
    }

    if (this.keys["ArrowLeft"] || this.keys["a"]) {
      this.owl.x -= speed;
      this.owl.walkCycle += deltaTime * 0.01;
    }

    if (
      (this.keys[" "] || this.keys["ArrowUp"] || this.keys["w"]) &&
      this.owl.onGround
    ) {
      this.owl.velocityY = -12;
      this.owl.onGround = false;
    }

    if (this.keys["x"] || this.keys["X"]) {
      this.attack();
    }

    this.owl.velocityY += 0.5;
    this.owl.y += this.owl.velocityY;

    if (this.owl.y > 250) {
      this.owl.y = 250;
      this.owl.velocityY = 0;
      this.owl.onGround = true;
    }

    this.camera.x = this.owl.x - 300;
    if (this.camera.x < 0) this.camera.x = 0;

    // スコアはトリビアボール取得数で計算（進行距離は使わない）

    this.updateProjectiles(deltaTime);

    for (let enemy of this.enemies) {
      if (!enemy.alive) continue;

      if (enemy.direction === "right") {
        if (enemy.type === "snake") {
          enemy.x +=
            enemy.speedX + Math.sin(Date.now() * 0.003 + enemy.x * 0.01) * 0.5;
        } else {
          enemy.x += enemy.speedX;
        }
      } else if (enemy.direction === "left") {
        if (enemy.type === "snake") {
          enemy.x +=
            enemy.speedX + Math.sin(Date.now() * 0.003 + enemy.x * 0.01) * 0.5;
        } else {
          enemy.x += enemy.speedX;
        }
      } else if (enemy.direction === "top") {
        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;

        // 地面に着いたら横移動に変更
        if (enemy.y >= 280) {
          enemy.y = 280;
          enemy.speedY = 0;
          enemy.speedX = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random());
          enemy.direction = "ground";
        }
      } else if (enemy.direction === "bottom") {
        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;

        // 地面を通り過ぎたら横移動に変更
        if (enemy.y <= 280) {
          enemy.y = 280;
          enemy.speedY = 0;
          enemy.speedX = (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random());
          enemy.direction = "ground";
        }
      } else if (enemy.direction === "ground") {
        enemy.x += enemy.speedX;
      }
    }

    this.checkCollisions();
    this.checkProjectileCollisions();

    this.enemySpawnTimer += deltaTime;
    if (this.enemySpawnTimer > this.enemySpawnInterval) {
      this.spawnEnemy();
      this.enemySpawnTimer = 0;
    }

    this.triviaBallSpawnTimer += deltaTime;
    if (this.triviaBallSpawnTimer > this.triviaBallSpawnInterval) {
      this.spawnTriviaBall();
      this.triviaBallSpawnTimer = 0;
    }

    this.enemies = this.enemies.filter(
      (enemy) =>
        enemy.alive &&
        enemy.x > this.camera.x - 200 &&
        enemy.x < this.camera.x + this.canvas.width + 200 &&
        enemy.y > -100 &&
        enemy.y < this.canvas.height + 100
    );

    // トリビアボールの更新
    for (let ball of this.triviaBalls) {
      if (!ball.alive) continue;
      ball.x += ball.speedX;
      ball.y += ball.bounceY;

      // 軽いバウンス効果
      if (ball.y > 290 || ball.y < 250) {
        ball.bounceY *= -0.7;
      }
    }

    this.triviaBalls = this.triviaBalls.filter(
      (ball) =>
        ball.alive &&
        ball.x > this.camera.x - 100 &&
        ball.x < this.camera.x + this.canvas.width + 100
    );

    this.checkTriviaBallCollisions();

    this.speechBubbleTimer += deltaTime;

    // 自動トリビア表示は削除（トリビアボール取得時のみ表示）
  }

  playStepSound() {
    console.log("えっほ！");
  }

  showTrivia() {
    this.isShowingTrivia = true;
    this.triviaElement.textContent = this.trivia[this.currentTrivia];
    this.triviaElement.style.display = "block";

    setTimeout(() => {
      this.triviaElement.style.display = "none";
      this.isShowingTrivia = false;
    }, 3000);

    this.currentTrivia = (this.currentTrivia + 1) % this.trivia.length;
  }

  drawOwl() {
    const owlX = this.owl.x - this.camera.x;
    const owlY = this.owl.y;

    this.ctx.save();
    this.ctx.translate(owlX + this.owl.width / 2, owlY + this.owl.height / 2);

    if (this.keys["ArrowRight"] || this.keys["d"]) {
      this.ctx.translate(0, Math.sin(this.owl.walkCycle * 8) * 2);
    }

    // 体（胴体）
    this.ctx.fillStyle = "#F5F5DC";
    this.ctx.beginPath();
    this.ctx.ellipse(0, 5, 18, 20, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // 頭
    this.ctx.fillStyle = "#F5F5DC";
    this.ctx.beginPath();
    this.ctx.ellipse(0, -20, 15, 18, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.drawArms();
    this.drawLegs();

    this.ctx.fillStyle = "#8B4513";
    this.ctx.beginPath();
    this.ctx.ellipse(-6, -25, 6, 8, 0, 0, Math.PI * 2);
    this.ctx.ellipse(6, -25, 6, 8, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "#000";
    this.ctx.beginPath();
    this.ctx.ellipse(-6, -25, 2, 2, 0, 0, Math.PI * 2);
    this.ctx.ellipse(6, -25, 2, 2, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = "#FF8C00";
    this.ctx.beginPath();
    this.ctx.moveTo(0, -17);
    this.ctx.lineTo(-3, -12);
    this.ctx.lineTo(3, -12);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();

    // トリビア非表示中の吹き出し表示
    if (!this.isShowingTrivia && this.speechBubbleTimer > 500) {
      // 歩行時の上下揺れを計算
      let bounceY = 0;
      if (this.keys["ArrowRight"] || this.keys["d"]) {
        bounceY = Math.sin(this.owl.walkCycle * 8) * 2;
      }
      this.drawSpeechBubble(owlX, owlY + bounceY);
      if (this.speechBubbleTimer > 2500) {
        this.speechBubbleTimer = 0;
      }
    }
  }

  drawArms() {
    const isWalking = this.keys["ArrowRight"] || this.keys["d"] || this.keys["ArrowLeft"] || this.keys["a"];
    
    if (isWalking) {
      // 歩行時の腕のアニメーション
      const armCycle = this.owl.walkCycle * 10;
      const leftArmAngle = Math.sin(armCycle + Math.PI) * 0.4;
      const rightArmAngle = Math.sin(armCycle) * 0.4;
      
      this.ctx.strokeStyle = "#F5F5DC";
      this.ctx.lineWidth = 5;
      this.ctx.lineCap = "round";
      
      // 左腕
      this.ctx.save();
      this.ctx.rotate(leftArmAngle);
      this.ctx.beginPath();
      this.ctx.moveTo(-15, 0);
      this.ctx.lineTo(-25, 15);
      this.ctx.stroke();
      this.ctx.restore();
      
      // 右腕
      this.ctx.save();
      this.ctx.rotate(rightArmAngle);
      this.ctx.beginPath();
      this.ctx.moveTo(15, 0);
      this.ctx.lineTo(25, 15);
      this.ctx.stroke();
      this.ctx.restore();
    } else {
      // 静止時の腕
      this.ctx.strokeStyle = "#F5F5DC";
      this.ctx.lineWidth = 5;
      this.ctx.lineCap = "round";
      
      // 左腕
      this.ctx.beginPath();
      this.ctx.moveTo(-15, 0);
      this.ctx.lineTo(-22, 15);
      this.ctx.stroke();
      
      // 右腕
      this.ctx.beginPath();
      this.ctx.moveTo(15, 0);
      this.ctx.lineTo(22, 15);
      this.ctx.stroke();
    }
  }

  drawLegs() {
    const isWalking = this.keys["ArrowRight"] || this.keys["d"] || this.keys["ArrowLeft"] || this.keys["a"];
    
    if (isWalking) {
      // 歩行時の足のアニメーション
      const legCycle = this.owl.walkCycle * 12;
      const leftLegAngle = Math.sin(legCycle) * 0.5;
      const rightLegAngle = Math.sin(legCycle + Math.PI) * 0.5;
      
      this.ctx.strokeStyle = "#F5F5DC";
      this.ctx.lineWidth = 12;
      this.ctx.lineCap = "round";
      
      // 左足（太ももから）
      this.ctx.save();
      this.ctx.rotate(leftLegAngle);
      this.ctx.beginPath();
      this.ctx.moveTo(-10, 20);
      this.ctx.lineTo(-10, 45);
      this.ctx.stroke();
      this.ctx.restore();
      
      // 右足（太ももから）
      this.ctx.save();
      this.ctx.rotate(rightLegAngle);
      this.ctx.beginPath();
      this.ctx.moveTo(10, 20);
      this.ctx.lineTo(10, 45);
      this.ctx.stroke();
      this.ctx.restore();
      
      // 足先
      this.ctx.fillStyle = "#F5F5DC";
      this.ctx.beginPath();
      this.ctx.ellipse(-10 + Math.sin(leftLegAngle) * 5, 45, 8, 4, 0, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.ellipse(10 + Math.sin(rightLegAngle) * 5, 45, 8, 4, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // 静止時の足
      this.ctx.strokeStyle = "#F5F5DC";
      this.ctx.lineWidth = 12;
      this.ctx.lineCap = "round";
      
      // 左足
      this.ctx.beginPath();
      this.ctx.moveTo(-10, 20);
      this.ctx.lineTo(-10, 45);
      this.ctx.stroke();
      
      // 右足
      this.ctx.beginPath();
      this.ctx.moveTo(10, 20);
      this.ctx.lineTo(10, 45);
      this.ctx.stroke();
      
      // 足先
      this.ctx.fillStyle = "#F5F5DC";
      this.ctx.beginPath();
      this.ctx.ellipse(-10, 45, 8, 4, 0, 0, Math.PI * 2);
      this.ctx.fill();
      
      this.ctx.beginPath();
      this.ctx.ellipse(10, 45, 8, 4, 0, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  drawProjectiles() {
    this.ctx.fillStyle = "#FFD700";
    for (let projectile of this.projectiles) {
      const projX = projectile.x - this.camera.x;
      if (projX > -20 && projX < this.canvas.width + 20) {
        this.ctx.beginPath();
        this.ctx.ellipse(
          projX + projectile.width / 2,
          projectile.y + projectile.height / 2,
          projectile.width / 2,
          projectile.height / 2,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();

        this.ctx.strokeStyle = "#FFA500";
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(projX, projectile.y + projectile.height / 2);
        this.ctx.lineTo(
          projX + projectile.width,
          projectile.y + projectile.height / 2
        );
        this.ctx.stroke();
      }
    }
  }


  drawEnemies() {
    for (let enemy of this.enemies) {
      if (!enemy.alive) continue;

      const enemyX = enemy.x - this.camera.x;
      if (enemyX > -50 && enemyX < this.canvas.width + 50) {
        if (enemy.type === "snake") {
          this.drawSnake(enemyX, enemy.y);
        } else {
          this.drawSpider(enemyX, enemy.y);
        }
      }
    }
  }

  drawSnake(x, y) {
    this.ctx.fillStyle = "#228B22";
    for (let i = 0; i < 3; i++) {
      this.ctx.beginPath();
      this.ctx.ellipse(
        x + i * 10,
        y + Math.sin(Date.now() * 0.01 + i) * 5,
        8,
        8,
        0,
        0,
        Math.PI * 2
      );
      this.ctx.fill();
    }

    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(x + 25, y - 2, 5, 2);
  }

  drawSpider(x, y) {
    this.ctx.fillStyle = "#8B0000";
    this.ctx.beginPath();
    this.ctx.ellipse(x + 20, y + 15, 15, 12, 0, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.strokeStyle = "#8B0000";
    this.ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const legX = Math.cos(angle) * 20;
      const legY = Math.sin(angle) * 15;
      this.ctx.beginPath();
      this.ctx.moveTo(x + 20, y + 15);
      this.ctx.lineTo(x + 20 + legX, y + 15 + legY);
      this.ctx.stroke();
    }
  }

  drawBackground() {
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#90EE90");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = "#8B4513";
    this.ctx.fillRect(0, this.canvas.height - 70, this.canvas.width, 70);

    this.ctx.fillStyle = "#90EE90";
    this.ctx.fillRect(0, this.canvas.height - 75, this.canvas.width, 10);

    // 木の描画を改善
    const treeSpacing = 150;
    const treeOffset = 200;

    // カメラの位置に基づいて木の開始位置と終了位置を計算
    const startX =
      Math.floor((this.camera.x - treeOffset) / treeSpacing) * treeSpacing +
      treeOffset;
    const endX = startX + this.canvas.width + treeSpacing * 2;

    // 木を描画
    for (let x = startX; x <= endX; x += treeSpacing) {
      const screenX = x - this.camera.x;
      if (screenX > -100 && screenX < this.canvas.width + 100) {
        this.drawTree(screenX, this.canvas.height - 150);
      }
    }
  }

  drawTree(x, y) {
    this.ctx.fillStyle = "#8B4513";
    this.ctx.fillRect(x, y + 50, 20, 50);

    this.ctx.fillStyle = "#228B22";
    this.ctx.beginPath();
    this.ctx.ellipse(x + 10, y + 25, 30, 40, 0, 0, Math.PI * 2);
    this.ctx.fill();
  }

  drawSpeechBubble(owlX, owlY) {
    this.ctx.save();

    // 吹き出しの背景
    this.ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    this.ctx.strokeStyle = "#000";
    this.ctx.lineWidth = 2;

    const bubbleX = owlX + 40;
    const bubbleY = owlY - 60;
    const bubbleWidth = 80;
    const bubbleHeight = 30;

    // 吹き出し本体
    this.ctx.beginPath();
    this.ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);
    this.ctx.fill();
    this.ctx.stroke();

    // 吹き出しの尻尾
    this.ctx.beginPath();
    this.ctx.moveTo(bubbleX + 20, bubbleY + bubbleHeight);
    this.ctx.lineTo(bubbleX + 10, bubbleY + bubbleHeight + 10);
    this.ctx.lineTo(bubbleX + 30, bubbleY + bubbleHeight);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // テキスト
    this.ctx.fillStyle = "#000";
    this.ctx.font = "14px Arial";
    this.ctx.textAlign = "center";
    this.ctx.fillText("エッホ", bubbleX + bubbleWidth / 2, bubbleY + 20);

    this.ctx.restore();
  }

  drawTriviaBalls() {
    for (let ball of this.triviaBalls) {
      if (!ball.alive) continue;

      const ballX = ball.x - this.camera.x;
      if (ballX > -50 && ballX < this.canvas.width + 50) {
        this.ctx.save();

        // ボールの影
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
        this.ctx.beginPath();
        this.ctx.ellipse(
          ballX + ball.width / 2,
          300,
          ball.width / 2 - 2,
          5,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();

        // ボール本体（グラデーション）
        const gradient = this.ctx.createRadialGradient(
          ballX + ball.width / 3,
          ball.y + ball.height / 3,
          0,
          ballX + ball.width / 2,
          ball.y + ball.height / 2,
          ball.width / 2
        );
        gradient.addColorStop(0, "#FFD700");
        gradient.addColorStop(1, "#FFA500");

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.ellipse(
          ballX + ball.width / 2,
          ball.y + ball.height / 2,
          ball.width / 2,
          ball.height / 2,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();

        // ボールの枠線
        this.ctx.strokeStyle = "#FF8C00";
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // ボールの光沢
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
        this.ctx.beginPath();
        this.ctx.ellipse(
          ballX + ball.width / 3,
          ball.y + ball.height / 3,
          4,
          6,
          0,
          0,
          Math.PI * 2
        );
        this.ctx.fill();

        this.ctx.restore();
      }
    }
  }

  drawScore() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    this.ctx.fillRect(this.canvas.width - 220, 10, 200, 40);

    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.textAlign = "left";
    this.ctx.fillText("トリビア: " + this.score, this.canvas.width - 210, 35);
    this.ctx.restore();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawBackground();
    this.drawEnemies();
    this.drawTriviaBalls();
    this.drawProjectiles();
    this.drawOwl();
    this.drawScore();
  }

  gameLoop(currentTime = 0) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.render();

    requestAnimationFrame((time) => this.gameLoop(time));
  }
}

window.addEventListener("load", () => {
  new BarnOwlGame();
});
