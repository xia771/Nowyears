// 初始化粒子效果
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff']
        },
        shape: {
            type: ['circle', 'star'],
        },
        opacity: {
            value: 0.6,
            random: true,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 5,
            random: true,
            animation: {
                enable: true,
                speed: 4,
                size_min: 0.3,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'bounce',
            bounce: false,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// 创建烟花效果
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    const colors = ['#ff0', '#ff4da6', '#00ff00', '#00ffff', '#ff00ff'];
    
    for (let i = 0; i < 8; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.setProperty('--x', `${Math.random() * 100}%`);
        firework.style.setProperty('--initialY', `${60 + Math.random() * 20}vmin`);
        firework.style.setProperty('--y', `${-30 + Math.random() * 10}vmin`);
        firework.style.animationDelay = `${Math.random() * 2}s`;
        firework.style.setProperty('--color1', colors[Math.floor(Math.random() * colors.length)]);
        firework.style.setProperty('--color2', colors[Math.floor(Math.random() * colors.length)]);
        fireworksContainer.appendChild(firework);
    }
}

// 初始化3D倾斜效果
function initTilt() {
    VanillaTilt.init(document.querySelectorAll(".time-block"), {
        max: 25,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
    });
}

// 创建3D背景效果
function init3DBackground() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bgCanvas'),
        alpha: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff6b6b,
        wireframe: true
    });
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);
    
    camera.position.z = 30;
    
    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.01;
        renderer.render(scene, camera);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// 更新倒计时
function updateCountdown() {
    const now = new Date();
    const newYear = new Date('2025-01-01T00:00:00');
    const diff = newYear - now;

    if (diff <= 0) {
        document.getElementById('countdown').style.display = 'none';
        document.getElementById('wishes').classList.remove('hidden');
        document.getElementById('wishes').classList.add('show');
        
        // 显示新年祝福时添加更多烟花
        createFireworks();
        createFireworks();
        
        // 新年到来时，创建更多烟花
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                fireworks.push(new Firework());
                createCSSFirework();
            }, i * 300);
        }
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateNumberWithAnimation('days', days);
    updateNumberWithAnimation('hours', hours);
    updateNumberWithAnimation('minutes', minutes);
    updateNumberWithAnimation('seconds', seconds);
}

// 数字变化动画
function updateNumberWithAnimation(elementId, newValue) {
    const element = document.getElementById(elementId);
    const currentValue = parseInt(element.textContent);
    newValue = String(newValue).padStart(2, '0');
    
    if (element.textContent !== newValue) {
        element.style.transform = 'translateY(-20px) rotateX(90deg)';
        element.style.opacity = '0';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'translateY(20px) rotateX(-90deg)';
            
            requestAnimationFrame(() => {
                element.style.transform = 'translateY(0) rotateX(0)';
                element.style.opacity = '1';
            });
        }, 200);
    }
}

// 创建随机漂浮的背景元素
function createFloatingElements() {
    const container = document.querySelector('.container');
    const elements = ['❄️', '🎉', '✨', '🎊', '🎇', '🎆'];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.textContent = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = `${Math.random() * 100}%`;
        element.style.animationDuration = `${Math.random() * 3 + 2}s`;
        element.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(element);
    }
}

// 初始化所有效果
function initializeEffects() {
    createFireworks();
    createFloatingElements();
    initTilt();
    init3DBackground();
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// 添加鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const content = document.querySelector('.content');
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    content.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializeEffects);

// 初始化Canvas烟花
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 烟花类
class Firework {
    constructor() {
        this.reset();
        this.effectType = Math.floor(Math.random() * 5); // 随机选择烟花效果类型
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.speed = 3 + Math.random() * 4;
        this.angle = Math.PI + Math.random() * Math.PI;
        this.friction = 0.95;
        this.gravity = 0.98;
        this.hue = Math.floor(Math.random() * 360);
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.particles = [];
        this.alive = true;
        this.trail = [];
        this.trailLength = 10;
    }

    update() {
        // 添加轨迹效果
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.trailLength) {
            this.trail.shift();
        }

        if (this.y > this.targetY) {
            this.y -= this.speed;
            // 添加摇摆效果
            this.x += Math.sin(this.y * 0.01) * 2;
        } else {
            this.explode();
            this.alive = false;
        }
    }

    explode() {
        const particleCount = 150; // 增加粒子数量
        switch(this.effectType) {
            case 0: // 圆形爆炸
                this.createCircularExplosion(particleCount);
                break;
            case 1: // 心形爆炸
                this.createHeartExplosion(particleCount);
                break;
            case 2: // 螺旋爆炸
                this.createSpiralExplosion(particleCount);
                break;
            case 3: // 双重爆炸
                this.createDoubleExplosion(particleCount);
                break;
            case 4: // 环形爆炸
                this.createRingExplosion(particleCount);
                break;
        }
    }

    createCircularExplosion(count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            this.createParticle(angle);
        }
    }

    createHeartExplosion(count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const r = Math.sin(angle) * Math.sqrt(Math.abs(Math.cos(angle))) / (Math.sin(angle) + 1.4);
            const x = r * Math.cos(angle) * 15;
            const y = -r * Math.sin(angle) * 15;
            this.createParticleWithPosition(x, y);
        }
    }

    createSpiralExplosion(count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 8 * i) / count;
            const radius = (i / count) * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            this.createParticleWithPosition(x, y);
        }
    }

    createDoubleExplosion(count) {
        this.createCircularExplosion(count / 2);
        setTimeout(() => {
            this.createCircularExplosion(count / 2);
        }, 100);
    }

    createRingExplosion(count) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            const radius = 15 + Math.random() * 5;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            this.createParticleWithPosition(x, y);
        }
    }

    createParticle(angle) {
        const particle = new Particle(
            this.x,
            this.y,
            this.hue,
            angle,
            5 + Math.random() * 5
        );
        particles.push(particle);
    }

    createParticleWithPosition(x, y) {
        const particle = new Particle(
            this.x + x,
            this.y + y,
            this.hue,
            Math.atan2(y, x),
            2 + Math.random() * 3
        );
        particles.push(particle);
    }

    draw() {
        // 绘制轨迹
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const alpha = i / this.trail.length;
            ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${alpha})`;
            if (i === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        }
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// 更新粒子类
class Particle {
    constructor(x, y, hue, angle, speed) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.brightness = Math.random() * 50 + 50;
        this.alpha = 1;
        this.decay = Math.random() * 0.01 + 0.015;
        this.speed = speed;
        this.angle = angle;
        this.friction = 0.97;
        this.gravity = 0.7;
        this.alive = true;
        this.trail = [];
        this.trailLength = 5;
    }

    update() {
        // 添加轨迹效果
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.trailLength) {
            this.trail.shift();
        }

        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;

        if (this.alpha <= 0) this.alive = false;
    }

    draw() {
        // 绘制轨迹
        ctx.beginPath();
        for (let i = 0; i < this.trail.length; i++) {
            const point = this.trail[i];
            const alpha = (i / this.trail.length) * this.alpha;
            ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${alpha})`;
            ctx.beginPath();
            ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// 烟花数组
const fireworks = [];
const particles = [];

// 动画循环
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 随机添加新烟花，增加出现频率
    if (Math.random() < 0.08) {
        fireworks.push(new Firework());
    }

    // 更新和绘制烟花
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (!fireworks[i].alive) {
            fireworks.splice(i, 1);
        }
    }

    // 更新和绘制粒子
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (!particles[i].alive) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

// CSS烟花效果
function createCSSFirework() {
    const firework = document.createElement('div');
    firework.className = 'firework';
    document.querySelector('.firework-container').appendChild(firework);

    setTimeout(() => {
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        firework.appendChild(explosion);

        // 创建火花
        for (let i = 0; i < 36; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.setProperty('--spark-color', `hsl(${Math.random() * 360}, 100%, 50%)`);
            spark.style.transform = `rotate(${i * 10}deg) translateY(-100px)`;
            explosion.appendChild(spark);
        }

        // 清理
        setTimeout(() => {
            firework.remove();
        }, 1000);
    }, 1000);
}

// 定期创建CSS烟花
setInterval(createCSSFirework, 2000);

// 初始化Canvas烟花
animate();

// 窗口大小改变时调整Canvas大小
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 点击页面时添加烟花效果
document.addEventListener('click', (e) => {
    const firework = new Firework();
    firework.x = e.clientX;
    firework.y = canvas.height;
    firework.targetY = e.clientY;
    fireworks.push(firework);
    createCSSFirework();
});
