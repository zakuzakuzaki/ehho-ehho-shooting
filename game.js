class BarnOwlGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.triviaElement = document.getElementById('trivia');
        
        this.owl = {
            x: 100,
            y: 250,
            width: 60,
            height: 80,
            velocityY: 0,
            onGround: true,
            animFrame: 0,
            walkCycle: 0
        };
        
        this.enemies = [];
        this.projectiles = [];
        this.gameState = 'playing';
        this.generateEnemies();
        
        this.camera = { x: 0 };
        this.lastTime = 0;
        this.stepSound = 0;
        
        this.trivia = [
            "メンフクロウは夜行性で、暗闇でも獲物を見つけられます！",
            "フクロウの羽根は音を立てずに飛ぶことができます！",
            "メンフクロウの顔は音を集めるパラボラアンテナの役割をします！",
            "フクロウは首を270度回すことができます！",
            "メンフクロウは農家の味方で、ネズミを退治してくれます！",
            "フクロウの目玉は球体ではなく筒状になっています！",
            "メンフクロウは世界中に住んでいる最も広く分布するフクロウです！"
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
                type: Math.random() > 0.5 ? 'snake' : 'spider',
                health: 1,
                alive: true
            });
        }
    }
    
    attack() {
        this.projectiles.push({
            x: this.owl.x + this.owl.width,
            y: this.owl.y + this.owl.height / 2,
            width: 15,
            height: 5,
            speed: 8,
            damage: 1
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
                
                if (projectile.x < enemy.x + enemy.width &&
                    projectile.x + projectile.width > enemy.x &&
                    projectile.y < enemy.y + enemy.height &&
                    projectile.y + projectile.height > enemy.y) {
                    
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
    
    checkCollisions() {
        if (this.gameState !== 'playing') return;
        
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            if (this.owl.x < enemy.x + enemy.width &&
                this.owl.x + this.owl.width > enemy.x &&
                this.owl.y < enemy.y + enemy.height &&
                this.owl.y + this.owl.height > enemy.y) {
                this.gameState = 'gameOver';
                this.showGameOver();
                break;
            }
        }
    }
    
    showGameOver() {
        this.triviaElement.textContent = 'ゲームオーバー！スペースキーでリスタート';
        this.triviaElement.style.display = 'block';
        this.triviaElement.style.background = 'rgba(255, 0, 0, 0.9)';
        this.triviaElement.style.color = 'white';
    }
    
    restart() {
        this.gameState = 'playing';
        this.owl.x = 100;
        this.owl.y = 250;
        this.owl.velocityY = 0;
        this.camera.x = 0;
        this.enemies = [];
        this.projectiles = [];
        this.generateEnemies();
        this.triviaElement.style.display = 'none';
        this.triviaElement.style.background = 'rgba(255, 255, 255, 0.9)';
        this.triviaElement.style.color = 'black';
    }
    
    setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }
    
    update(deltaTime) {
        if (this.gameState === 'gameOver') {
            if (this.keys[' ']) {
                this.restart();
            }
            return;
        }
        
        const speed = 3;
        
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.owl.x += speed;
            this.owl.walkCycle += deltaTime * 0.01;
            this.stepSound += deltaTime;
            
            if (this.stepSound > 800) {
                this.playStepSound();
                this.stepSound = 0;
            }
        }
        
        if (this.keys['ArrowLeft'] || this.keys['a']) {
            this.owl.x -= speed;
            this.owl.walkCycle += deltaTime * 0.01;
        }
        
        if ((this.keys[' '] || this.keys['ArrowUp'] || this.keys['w']) && this.owl.onGround) {
            this.owl.velocityY = -12;
            this.owl.onGround = false;
        }
        
        if (this.keys['x'] || this.keys['X']) {
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
        
        this.updateProjectiles(deltaTime);
        
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            if (enemy.type === 'snake') {
                enemy.x += Math.sin(Date.now() * 0.003 + enemy.x * 0.01) * enemy.speed;
            } else {
                enemy.x -= enemy.speed;
                if (enemy.x < this.camera.x - 100) {
                    enemy.x = this.camera.x + this.canvas.width + Math.random() * 200;
                }
            }
        }
        
        this.checkCollisions();
        this.checkProjectileCollisions();
        
        this.triviaTimer += deltaTime;
        if (this.triviaTimer > 5000) {
            this.showTrivia();
            this.triviaTimer = 0;
        }
    }
    
    playStepSound() {
        console.log("えっほ！");
    }
    
    showTrivia() {
        this.triviaElement.textContent = this.trivia[this.currentTrivia];
        this.triviaElement.style.display = 'block';
        
        setTimeout(() => {
            this.triviaElement.style.display = 'none';
        }, 3000);
        
        this.currentTrivia = (this.currentTrivia + 1) % this.trivia.length;
    }
    
    drawOwl() {
        const owlX = this.owl.x - this.camera.x;
        const owlY = this.owl.y;
        
        this.ctx.save();
        this.ctx.translate(owlX + this.owl.width/2, owlY + this.owl.height/2);
        
        if (this.keys['ArrowRight'] || this.keys['d']) {
            this.ctx.translate(0, Math.sin(this.owl.walkCycle * 8) * 2);
        }
        
        this.drawBicycle();
        
        this.ctx.fillStyle = '#F5F5DC';
        this.ctx.beginPath();
        this.ctx.ellipse(0, -20, 20, 25, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#8B4513';
        this.ctx.beginPath();
        this.ctx.ellipse(-6, -30, 6, 8, 0, 0, Math.PI * 2);
        this.ctx.ellipse(6, -30, 6, 8, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.ellipse(-6, -30, 2, 2, 0, 0, Math.PI * 2);
        this.ctx.ellipse(6, -30, 2, 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#FF8C00';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -20);
        this.ctx.lineTo(-3, -15);
        this.ctx.lineTo(3, -15);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
    
    drawBicycle() {
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 3;
        
        this.ctx.beginPath();
        this.ctx.arc(-15, 10, 12, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.arc(15, 10, 12, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.beginPath();
        this.ctx.moveTo(-15, 10);
        this.ctx.lineTo(0, -5);
        this.ctx.lineTo(15, 10);
        this.ctx.moveTo(0, -5);
        this.ctx.lineTo(0, 5);
        this.ctx.stroke();
    }
    
    drawProjectiles() {
        this.ctx.fillStyle = '#FFD700';
        for (let projectile of this.projectiles) {
            const projX = projectile.x - this.camera.x;
            if (projX > -20 && projX < this.canvas.width + 20) {
                this.ctx.beginPath();
                this.ctx.ellipse(projX + projectile.width/2, projectile.y + projectile.height/2, 
                               projectile.width/2, projectile.height/2, 0, 0, Math.PI * 2);
                this.ctx.fill();
                
                this.ctx.strokeStyle = '#FFA500';
                this.ctx.lineWidth = 2;
                this.ctx.beginPath();
                this.ctx.moveTo(projX, projectile.y + projectile.height/2);
                this.ctx.lineTo(projX + projectile.width, projectile.y + projectile.height/2);
                this.ctx.stroke();
            }
        }
    }
    
    drawEnemies() {
        for (let enemy of this.enemies) {
            if (!enemy.alive) continue;
            
            const enemyX = enemy.x - this.camera.x;
            if (enemyX > -50 && enemyX < this.canvas.width + 50) {
                if (enemy.type === 'snake') {
                    this.drawSnake(enemyX, enemy.y);
                } else {
                    this.drawSpider(enemyX, enemy.y);
                }
            }
        }
    }
    
    drawSnake(x, y) {
        this.ctx.fillStyle = '#228B22';
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.ellipse(x + i * 10, y + Math.sin(Date.now() * 0.01 + i) * 5, 8, 8, 0, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(x + 25, y - 2, 5, 2);
    }
    
    drawSpider(x, y) {
        this.ctx.fillStyle = '#8B0000';
        this.ctx.beginPath();
        this.ctx.ellipse(x + 20, y + 15, 15, 12, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.strokeStyle = '#8B0000';
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
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#90EE90');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, this.canvas.height - 70, this.canvas.width, 70);
        
        this.ctx.fillStyle = '#90EE90';
        this.ctx.fillRect(0, this.canvas.height - 75, this.canvas.width, 10);
        
        for (let i = 0; i < 10; i++) {
            const treeX = (i * 150 + 200) - this.camera.x;
            if (treeX > -50 && treeX < this.canvas.width + 50) {
                this.drawTree(treeX, this.canvas.height - 150);
            }
        }
    }
    
    drawTree(x, y) {
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(x, y + 50, 20, 50);
        
        this.ctx.fillStyle = '#228B22';
        this.ctx.beginPath();
        this.ctx.ellipse(x + 10, y + 25, 30, 40, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawEnemies();
        this.drawProjectiles();
        this.drawOwl();
    }
    
    gameLoop(currentTime = 0) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        this.update(deltaTime);
        this.render();
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}

window.addEventListener('load', () => {
    new BarnOwlGame();
});