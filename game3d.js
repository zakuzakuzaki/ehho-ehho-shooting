class BarnOwl3DGame {
  constructor() {
    this.canvas = document.getElementById("gameCanvas");
    this.triviaElement = document.getElementById("trivia");
    this.scoreElement = document.getElementById("score");
    this.healthElement = document.getElementById("health");

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.canvas.width / this.canvas.height,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.owl = {
      mesh: null,
      bicycle: null,
      x: 0,
      y: 0,
      z: 0,
      velocityY: 0,
      onGround: true,
      health: 100,
      speed: 0.2,
    };

    this.enemies = [];
    this.projectiles = [];
    this.gameState = "playing";
    this.score = 0;

    this.keys = {};
    this.mouse = { x: 0, y: 0, sensitivity: 0.002 };
    this.cameraAngle = { x: 0, y: 0 };

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
    this.lastTime = 0;

    this.init();
  }

  init() {
    this.setupScene();
    this.createOwl();
    this.createBicycle();
    this.generateEnemies();
    this.setupLighting();
    this.setupEventListeners();
    this.animate();
  }

  setupScene() {
    this.scene.background = new THREE.Color(0x87ceeb);
    this.scene.fog = new THREE.Fog(0x87ceeb, 10, 100);

    const groundGeometry = new THREE.PlaneGeometry(200, 200);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 });
    this.ground = new THREE.Mesh(groundGeometry, groundMaterial);
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    for (let i = 0; i < 50; i++) {
      this.createTree((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150);
    }
  }

  createTree(x, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.8, 4);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 2, z);
    trunk.castShadow = true;
    this.scene.add(trunk);

    const leavesGeometry = new THREE.SphereGeometry(3);
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.set(x, 6, z);
    leaves.castShadow = true;
    this.scene.add(leaves);
  }

  createOwl() {
    const owlGroup = new THREE.Group();

    const bodyGeometry = new THREE.SphereGeometry(1, 16, 16);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0xf5f5dc });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 1.4, 0.8);
    body.castShadow = true;
    owlGroup.add(body);

    const headGeometry = new THREE.SphereGeometry(0.8, 16, 16);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 1.5, 0);
    head.castShadow = true;
    owlGroup.add(head);

    const eyeGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const eyeMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.3, 1.7, 0.5);
    owlGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.3, 1.7, 0.5);
    owlGroup.add(rightEye);

    const pupilGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const pupilMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.3, 1.7, 0.6);
    owlGroup.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.3, 1.7, 0.6);
    owlGroup.add(rightPupil);

    const beakGeometry = new THREE.ConeGeometry(0.2, 0.4, 4);
    const beakMaterial = new THREE.MeshLambertMaterial({ color: 0xff8c00 });
    const beak = new THREE.Mesh(beakGeometry, beakMaterial);
    beak.position.set(0, 1.4, 0.7);
    beak.rotation.x = Math.PI / 2;
    owlGroup.add(beak);

    owlGroup.position.set(0, 2, 0);
    this.owl.mesh = owlGroup;
    this.scene.add(owlGroup);
  }

  createBicycle() {
    const bicycleGroup = new THREE.Group();

    const wheelGeometry = new THREE.TorusGeometry(0.8, 0.1, 8, 16);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });

    const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    frontWheel.position.set(0, 0.8, 1.5);
    frontWheel.rotation.y = Math.PI / 2;
    bicycleGroup.add(frontWheel);

    const backWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    backWheel.position.set(0, 0.8, -1.5);
    backWheel.rotation.y = Math.PI / 2;
    bicycleGroup.add(backWheel);

    const frameGeometry = new THREE.CylinderGeometry(0.05, 0.05, 3);
    const frameMaterial = new THREE.MeshLambertMaterial({ color: 0x0066cc });

    const mainFrame = new THREE.Mesh(frameGeometry, frameMaterial);
    mainFrame.position.set(0, 1.5, 0);
    mainFrame.rotation.z = Math.PI / 6;
    bicycleGroup.add(mainFrame);

    const seatGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1);
    const seatMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const seat = new THREE.Mesh(seatGeometry, seatMaterial);
    seat.position.set(0, 2.2, -0.5);
    bicycleGroup.add(seat);

    this.owl.bicycle = bicycleGroup;
    this.scene.add(bicycleGroup);
  }

  generateEnemies() {
    for (let i = 0; i < 30; i++) {
      const type = Math.random() > 0.5 ? "snake" : "spider";
      const enemy = this.createEnemy(type);
      enemy.position.set(
        (Math.random() - 0.5) * 100,
        0.5,
        Math.random() * 50 + 10
      );
      enemy.userData = {
        type: type,
        health: 1,
        alive: true,
        speed: 0.02 + Math.random() * 0.03,
        originalX: enemy.position.x,
        originalZ: enemy.position.z,
      };
      this.enemies.push(enemy);
      this.scene.add(enemy);
    }
  }

  createEnemy(type) {
    if (type === "snake") {
      return this.createSnake();
    } else {
      return this.createSpider();
    }
  }

  createSnake() {
    const snakeGroup = new THREE.Group();
    const bodyGeometry = new THREE.SphereGeometry(0.3, 8, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });

    for (let i = 0; i < 5; i++) {
      const segment = new THREE.Mesh(bodyGeometry, bodyMaterial);
      segment.position.set(0, 0, i * 0.5);
      segment.castShadow = true;
      snakeGroup.add(segment);
    }

    const headGeometry = new THREE.SphereGeometry(0.4, 8, 8);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.set(0, 0, 2.5);
    head.castShadow = true;
    snakeGroup.add(head);

    return snakeGroup;
  }

  createSpider() {
    const spiderGroup = new THREE.Group();

    const bodyGeometry = new THREE.SphereGeometry(0.5, 8, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8b0000 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    spiderGroup.add(body);

    const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1);
    const legMaterial = new THREE.MeshLambertMaterial({ color: 0x8b0000 });

    for (let i = 0; i < 8; i++) {
      const leg = new THREE.Mesh(legGeometry, legMaterial);
      const angle = (i / 4) * Math.PI;
      leg.position.set(Math.cos(angle) * 0.8, -0.3, Math.sin(angle) * 0.8);
      leg.rotation.z = angle;
      spiderGroup.add(leg);
    }

    return spiderGroup;
  }

  setupLighting() {
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    this.scene.add(directionalLight);
  }

  setupEventListeners() {
    document.addEventListener("keydown", (e) => {
      this.keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", (e) => {
      this.keys[e.key.toLowerCase()] = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (document.pointerLockElement === this.canvas) {
        this.mouse.x = e.movementX;
        this.mouse.y = e.movementY;
      }
    });

    this.canvas.addEventListener("click", () => {
      this.canvas.requestPointerLock();
    });

    // タッチコントロール
    this.setupMobileControls();
  }

  setupMobileControls() {
    const jumpBtn = document.getElementById("jumpBtn");
    const attackBtn = document.getElementById("attackBtn");
    const joystick = document.getElementById("joystick");
    const joystickKnob = document.getElementById("joystick-knob");

    if (!jumpBtn) return; // モバイルコントロールが存在しない場合は終了

    // ジョイスティック用の状態
    this.joystick = {
      active: false,
      centerX: 0,
      centerY: 0,
      knobX: 0,
      knobY: 0,
      maxDistance: 40,
    };

    // ジャンプボタン
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

    // 攻撃ボタン
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

    // ジョイスティック
    joystick.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const rect = joystick.getBoundingClientRect();
      this.joystick.centerX = rect.left + rect.width / 2;
      this.joystick.centerY = rect.top + rect.height / 2;
      this.joystick.active = true;
      this.handleJoystickMove(e);
    });

    joystick.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (this.joystick.active) {
        this.handleJoystickMove(e);
      }
    });

    joystick.addEventListener("touchend", (e) => {
      e.preventDefault();
      this.joystick.active = false;
      this.keys["w"] = false;
      this.keys["s"] = false;
      this.keys["a"] = false;
      this.keys["d"] = false;

      // ジョイスティックノブを中央に戻す
      joystickKnob.style.transform = "translate(-50%, -50%)";
    });

    // タッチによるカメラ制御
    let lastTouchX = 0;
    let lastTouchY = 0;
    let touchStarted = false;

    this.canvas.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1) {
        touchStarted = true;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      }
    });

    this.canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      if (touchStarted && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - lastTouchX;
        const deltaY = e.touches[0].clientY - lastTouchY;

        this.mouse.x = deltaX * 2;
        this.mouse.y = deltaY * 2;

        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
      }
    });

    this.canvas.addEventListener("touchend", (e) => {
      touchStarted = false;
    });

    // マウスイベントも追加（デスクトップでのテスト用）
    [jumpBtn, attackBtn].forEach((btn) => {
      btn.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const key = btn.id === "jumpBtn" ? " " : "x";
        this.keys[key] = true;
        btn.classList.add("pressed");
      });

      btn.addEventListener("mouseup", (e) => {
        e.preventDefault();
        const key = btn.id === "jumpBtn" ? " " : "x";
        this.keys[key] = false;
        btn.classList.remove("pressed");
      });
    });
  }

  handleJoystickMove(e) {
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.joystick.centerX;
    const deltaY = touch.clientY - this.joystick.centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    let knobX = deltaX;
    let knobY = deltaY;

    if (distance > this.joystick.maxDistance) {
      knobX = (deltaX / distance) * this.joystick.maxDistance;
      knobY = (deltaY / distance) * this.joystick.maxDistance;
    }

    this.joystick.knobX = knobX;
    this.joystick.knobY = knobY;

    // ジョイスティックノブを移動
    const joystickKnob = document.getElementById("joystick-knob");
    joystickKnob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

    // 移動キーの状態を更新
    const threshold = 15;
    this.keys["w"] = knobY < -threshold;
    this.keys["s"] = knobY > threshold;
    this.keys["a"] = knobX < -threshold;
    this.keys["d"] = knobX > threshold;
  }

  update(deltaTime) {
    if (this.gameState === "gameOver") {
      if (this.keys[" "]) {
        this.restart();
      }
      return;
    }

    this.updateCamera();
    this.updateOwl(deltaTime);
    this.updateEnemies(deltaTime);
    this.updateProjectiles(deltaTime);
    this.checkCollisions();
    this.updateTrivia(deltaTime);
    this.updateUI();
  }

  updateCamera() {
    if (document.pointerLockElement === this.canvas) {
      this.cameraAngle.y -= this.mouse.x * this.mouse.sensitivity;
      this.cameraAngle.x -= this.mouse.y * this.mouse.sensitivity;
      this.cameraAngle.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, this.cameraAngle.x)
      );
    }

    const distance = 10;
    this.camera.position.x =
      this.owl.x +
      Math.sin(this.cameraAngle.y) * Math.cos(this.cameraAngle.x) * distance;
    this.camera.position.y =
      this.owl.y + 5 + Math.sin(this.cameraAngle.x) * distance;
    this.camera.position.z =
      this.owl.z +
      Math.cos(this.cameraAngle.y) * Math.cos(this.cameraAngle.x) * distance;

    this.camera.lookAt(this.owl.x, this.owl.y + 2, this.owl.z);

    this.mouse.x = 0;
    this.mouse.y = 0;
  }

  updateOwl(deltaTime) {
    let moved = false;
    const speed = this.owl.speed;

    if (this.keys["w"]) {
      this.owl.z += Math.cos(this.cameraAngle.y) * speed;
      this.owl.x += Math.sin(this.cameraAngle.y) * speed;
      moved = true;
    }
    if (this.keys["s"]) {
      this.owl.z -= Math.cos(this.cameraAngle.y) * speed;
      this.owl.x -= Math.sin(this.cameraAngle.y) * speed;
      moved = true;
    }
    if (this.keys["a"]) {
      this.owl.z += Math.sin(this.cameraAngle.y) * speed;
      this.owl.x -= Math.cos(this.cameraAngle.y) * speed;
      moved = true;
    }
    if (this.keys["d"]) {
      this.owl.z -= Math.sin(this.cameraAngle.y) * speed;
      this.owl.x += Math.cos(this.cameraAngle.y) * speed;
      moved = true;
    }

    if (this.keys[" "] && this.owl.onGround) {
      this.owl.velocityY = 0.3;
      this.owl.onGround = false;
    }

    if (this.keys["x"]) {
      this.attack();
    }

    this.owl.velocityY -= 0.02;
    this.owl.y += this.owl.velocityY;

    if (this.owl.y <= 0) {
      this.owl.y = 0;
      this.owl.velocityY = 0;
      this.owl.onGround = true;
    }

    if (moved && this.owl.onGround) {
      console.log("えっほ！");
    }

    this.owl.mesh.position.set(this.owl.x, this.owl.y + 2, this.owl.z);
    this.owl.bicycle.position.set(this.owl.x, this.owl.y, this.owl.z);

    this.owl.mesh.rotation.y = this.cameraAngle.y;
    this.owl.bicycle.rotation.y = this.cameraAngle.y;
  }

  updateEnemies(deltaTime) {
    for (let enemy of this.enemies) {
      if (!enemy.userData.alive) continue;

      if (enemy.userData.type === "snake") {
        enemy.position.x =
          enemy.userData.originalX + Math.sin(Date.now() * 0.003) * 3;
        enemy.position.z += enemy.userData.speed;
      } else {
        const dx = this.owl.x - enemy.position.x;
        const dz = this.owl.z - enemy.position.z;
        const distance = Math.sqrt(dx * dx + dz * dz);

        if (distance > 0.1) {
          enemy.position.x += (dx / distance) * enemy.userData.speed;
          enemy.position.z += (dz / distance) * enemy.userData.speed;
        }
      }
    }
  }

  updateProjectiles(deltaTime) {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];
      projectile.position.x += projectile.userData.velocity.x;
      projectile.position.z += projectile.userData.velocity.z;

      if (projectile.position.length() > 100) {
        this.scene.remove(projectile);
        this.projectiles.splice(i, 1);
      }
    }
  }

  attack() {
    const projectileGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const projectileMaterial = new THREE.MeshLambertMaterial({
      color: 0xffd700,
    });
    const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial);

    projectile.position.set(this.owl.x, this.owl.y + 2, this.owl.z);
    projectile.userData = {
      velocity: {
        x: Math.sin(this.cameraAngle.y) * 0.5,
        z: Math.cos(this.cameraAngle.y) * 0.5,
      },
      damage: 1,
    };

    this.projectiles.push(projectile);
    this.scene.add(projectile);
    console.log("ホーホー！");
  }

  checkCollisions() {
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const projectile = this.projectiles[i];

      for (let enemy of this.enemies) {
        if (!enemy.userData.alive) continue;

        const distance = projectile.position.distanceTo(enemy.position);
        if (distance < 1) {
          enemy.userData.health -= projectile.userData.damage;
          this.scene.remove(projectile);
          this.projectiles.splice(i, 1);

          if (enemy.userData.health <= 0) {
            enemy.userData.alive = false;
            enemy.visible = false;
            this.score++;
            console.log("敵を倒した！");
          }
          break;
        }
      }
    }

    for (let enemy of this.enemies) {
      if (!enemy.userData.alive) continue;

      const distance = Math.sqrt(
        Math.pow(this.owl.x - enemy.position.x, 2) +
          Math.pow(this.owl.z - enemy.position.z, 2)
      );

      if (distance < 2) {
        this.owl.health -= 10;
        if (this.owl.health <= 0) {
          this.gameState = "gameOver";
          this.showGameOver();
        }
        enemy.userData.alive = false;
        enemy.visible = false;
      }
    }
  }

  updateTrivia(deltaTime) {
    this.triviaTimer += deltaTime;
    if (this.triviaTimer > 5000) {
      this.showTrivia();
      this.triviaTimer = 0;
    }
  }

  showTrivia() {
    this.triviaElement.textContent = this.trivia[this.currentTrivia];
    this.triviaElement.style.display = "block";

    setTimeout(() => {
      this.triviaElement.style.display = "none";
    }, 3000);

    this.currentTrivia = (this.currentTrivia + 1) % this.trivia.length;
  }

  showGameOver() {
    this.triviaElement.textContent = "ゲームオーバー！スペースキーでリスタート";
    this.triviaElement.style.display = "block";
    this.triviaElement.style.background = "rgba(255, 0, 0, 0.9)";
    this.triviaElement.style.color = "white";
  }

  restart() {
    this.gameState = "playing";
    this.owl.x = 0;
    this.owl.y = 0;
    this.owl.z = 0;
    this.owl.health = 100;
    this.score = 0;

    for (let enemy of this.enemies) {
      this.scene.remove(enemy);
    }
    this.enemies = [];

    for (let projectile of this.projectiles) {
      this.scene.remove(projectile);
    }
    this.projectiles = [];

    this.generateEnemies();
    this.triviaElement.style.display = "none";
    this.triviaElement.style.background = "rgba(255, 255, 255, 0.9)";
    this.triviaElement.style.color = "black";
  }

  updateUI() {
    this.scoreElement.textContent = this.score;
    this.healthElement.textContent = Math.max(0, this.owl.health);
  }

  animate(currentTime = 0) {
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    this.update(deltaTime);
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame((time) => this.animate(time));
  }
}

window.addEventListener("load", () => {
  new BarnOwl3DGame();
});
