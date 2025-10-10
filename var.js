//渲染之后的事件
var bodys = [];//动态矢量
var all = [];

Matter.Events.on(render, 'afterRender', function () {
    //绘制动态矢量的物体

    for (var i = 0; i < bodys.length; i++) {
        //获取body的x方向速度
        var velocityX = bodys[i].velocity.x;
        var velocityY = bodys[i].velocity.y;
        //获取body的位置
        var positionX = bodys[i].position.x;
        var positionY = bodys[i].position.y;
        //绘制箭头

        //获取引擎渲染画板
        var canvas = render.canvas;
        //获取画板的上下文
        var context = canvas.getContext('2d');
        context.strokeStyle = 'blue';
        context.lineWidth = 4;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.miterLimit = 4;
        context.shadowBlur = 0;
        context.shadowColor = 'rgba(212, 193, 193, 0)';
        context.fillStyle = 'blue';
        context.strokeWidth = 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(positionX, positionY);
        context.lineTo(positionX + velocityX * 10, positionY);
        context.stroke();
        context.closePath();
        context.fill();
        context.restore();
        context.save();

        context.strokeStyle = 'red';
        context.lineWidth = 4;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.miterLimit = 4;
        context.shadowBlur = 0;
        context.shadowColor = 'rgba(222, 193, 193, 0)';
        context.fillStyle = 'red';
        context.strokeWidth = 2;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.beginPath();
        context.moveTo(positionX, positionY);
        context.lineTo(positionX, positionY + velocityY * 10);
        context.stroke();
        context.closePath();
        context.fill();
        context.restore();
        context.save();
    }
});

var function_key = true;
var mode = NaN;//动态矢量
/*0:动态矢量
1：无限场景
2：添加轨迹
3：设置属性
4：复制
5：删除
6：连接
7：更多*/

var content = [];
var dd = false;
var needsetbody = [];//需要设置速度的物体
var setid = [];//物体设置速度的值
mouseConstraint.mouse.element.addEventListener("mousedown", function (event) {
    if (dd) {
        // 获取鼠标点击的位置
        var mousePosition = mouseConstraint.mouse.position;

        // 查找被点击的物体
        var body = Matter.Query.point(Composite.allBodies(world), mousePosition)[0];
        if (body) {
            needsetbody.push(body);
            speedForcePanel.show();

        }




    }
    if (mode == 3) {
        // 获取鼠标点击的位置
        var mousePosition = mouseConstraint.mouse.position;

        // 查找被点击的物体
        var body = Matter.Query.point(Composite.allBodies(world), mousePosition)[0];
        //设置物体固定
        body.isStatic = true;
        mode = NaN;
    }

});

mouseConstraint.mouse.element.addEventListener("mousedown", function (event) {
    if (function_key) {
        // 获取鼠标点击的位置
        var mousePosition = mouseConstraint.mouse.position;

        // 查找被点击的物体
        var body = Matter.Query.point(Composite.allBodies(world), mousePosition)[0];
        if (body && mode == 0) {
            bodys.push(body);
            mode = NaN;

        }
        if (body && mode == 1) {
            all.push(body);
            for (let i = 0; i < all.length; i++) {
                all[i].plugin.wrap = {
                    min: { x: 0, y: 0 },
                    max: { x: window.innerWidth, y: window.innerHeight }
                };
            }
        }
        if (body && mode == 2) {
            //0-3随机数
            var random = Math.floor(Math.random() * 4);
            AddTail(body, random, true); // 为物体yu添加持久化星空尾巴效果
            mode = NaN;
        }
        if (body && mode == 4) {
            var copy = Matter.Common.clone(body);
            Matter.Body.setPosition(copy, { x: mousePosition.x, y: mousePosition.y });
            Matter.World.add(world, copy);
        }
        if (body && mode == 5) {
            Matter.World.remove(world, body);

            window.alertDialog.alert('删除成功！', '提示', 2000);

            mode = NaN;
        }
        if (body && mode == 6) {
            content.push(body);
            if (content.length == 2) {

                window.showElasticDialog((value) => {
                    console.log('Selected value:', value);
                    Matter.Composite.add(world, Matter.Constraint.create({
                        bodyA: content[0],
                        bodyB: content[1],
                        stiffness: value,
                        render: {
                            strokeStyle: 'white',
                            lineWidth: 1
                        }
                    }));
                    content = [];
                    mode = NaN;
                }, 0.7);



            }


        }
        if (body && mode == 7) {


            document.addEventListener('speedForceConfirm', (e) => {
                console.log('设置的参数：', e.detail);
                e.detail = vf
            });
            floatingWindow.hide();
            SetVelocityX(body, vf.vSpeed, vf.vSpeedTime);
            SetVelocityY(body, vf.hSpeed, vf.hSpeedTime);
            SetForceX(body, vf.vForce, vf.vForceTime);
            SetForceY(body, vf.hForce, vf.hForceTime);
            vf = NaN;
            mode = NaN;

        }
    }
});




function AddTail(body, item, persist = false) {
    // 共享的尾巴粒子数组
    var tailParticles = [];

    // 碰撞过滤设置 - 确保尾巴不会与任何物体碰撞
    var tailCollisionFilter = {
        category: 0x0002,       // 单独的分类
        mask: 0x0000,           // 掩码设为0表示不与任何物体碰撞
        group: 0                // 组0表示不参与任何碰撞组
    };

    // 基础白色静态尾巴(无碰撞)
    if (item == 0) {
        var addtail = setInterval(function () {
            var tail = Matter.Bodies.circle(
                body.position.x,
                body.position.y,
                3,  // 减小半径以减少视觉干扰
                {
                    isStatic: true,
                    isSensor: true,  // 设为传感器，不产生物理反馈
                    collisionFilter: tailCollisionFilter,
                    render: {
                        fillStyle: 'rgba(255,255,255,0.7)',
                        strokeStyle: 'rgba(255,255,255,0.9)',
                        lineWidth: 1
                    }
                }
            );

            Matter.Composite.add(world, tail);
            tailParticles.push(tail);

            // 自动清理旧粒子
            if (tailParticles.length > 30) {
                var oldest = tailParticles.shift();
                Matter.Composite.remove(world, oldest);
            }
        }, 80);  // 加快生成频率但减小粒子大小

        return {
            interval: addtail,
            particles: tailParticles
        };
    }

    // 彩虹渐变可消融尾巴(无碰撞)
    if (item == 1) {
        var rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];
        var colorIndex = 0;

        var addtail = setInterval(function () {
            var tail = Matter.Bodies.circle(
                body.position.x,
                body.position.y,
                4,
                {
                    isStatic: true,
                    isSensor: true,
                    collisionFilter: tailCollisionFilter,
                    render: {
                        fillStyle: rainbowColors[colorIndex],
                        strokeStyle: rainbowColors[colorIndex],
                        lineWidth: 1
                    },
                    friction: 0.001  // 极小的摩擦力
                }
            );

            // 微小的随机运动
            Matter.Body.setVelocity(tail, {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            });

            Matter.Composite.add(world, tail);
            tailParticles.push(tail);
            colorIndex = (colorIndex + 1) % rainbowColors.length;

            if (tailParticles.length > 25) {
                var oldest = tailParticles.shift();
                Matter.Composite.remove(world, oldest);
            }
        }, 100);

        return {
            interval: addtail,
            particles: tailParticles
        };
    }

    // 随机颜色尾巴(无碰撞)
    if (item == 2) {
        var addtail = setInterval(function () {
            var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            var tail = Matter.Bodies.circle(
                body.position.x,
                body.position.y,
                2 + Math.random() * 3,
                {
                    isStatic: true,
                    isSensor: true,
                    collisionFilter: tailCollisionFilter,
                    render: {
                        fillStyle: randomColor,
                        strokeStyle: randomColor,
                        lineWidth: 1
                    }
                }
            );

            Matter.Composite.add(world, tail);
            tailParticles.push(tail);

            if (tailParticles.length > 40) {
                var oldest = tailParticles.shift();
                Matter.Composite.remove(world, oldest);
            }
        }, 150);

        return {
            interval: addtail,
            particles: tailParticles
        };
    }

    if (item == 3) {
        var addtail = setInterval(function () {
            // 创建多个星星粒子
            for (var i = 0; i < 2; i++) {
                // 随机大小（大部分小星星，偶尔有大星星）
                var size = Math.random() > 0.9 ?
                    (1 + Math.random() * 3) :  // 10%概率生成较大星星
                    (0.5 + Math.random() * 1); // 90%概率生成小星星

                // 星空颜色（偏冷色调）
                var starColor = Math.random() > 0.7 ?
                    `rgba(255,255,255,${0.7 + Math.random() * 0.3})` : // 30%概率纯白
                    `rgba(${150 + Math.random() * 100},${180 + Math.random() * 50},255,${0.4 + Math.random() * 0.3})`; // 70%概率蓝白色

                // 随机位置偏移（模拟星空散布效果）
                var offsetX = (Math.random() - 0.5) * 15;
                var offsetY = (Math.random() - 0.5) * 15;

                var star = Matter.Bodies.circle(
                    body.position.x + offsetX,
                    body.position.y + offsetY,
                    size,
                    {
                        isStatic: persist, // 持久化则静止，否则会飘动
                        isSensor: true,
                        collisionFilter: tailCollisionFilter,
                        render: {
                            fillStyle: starColor,
                            strokeStyle: 'rgba(255,255,255,0.8)',
                            lineWidth: size > 2 ? 1 : 0 // 大星星有边框
                        },
                        friction: 0.01
                    }
                );
                // 如果不是持久化模式，添加缓慢飘动效果
                if (!persist) {
                    Matter.Body.setVelocity(star, {
                        x: (Math.random() - 0.5) * 0.2,
                        y: (Math.random() - 0.5) * 0.2
                    });

                    // 随机闪烁效果（通过改变透明度实现）
                    if (Math.random() > 0.7) {
                        star.render.opacity = 0.3;
                        setTimeout(function () {
                            star.render.opacity = 1;
                        }, 200 + Math.random() * 500);
                    }
                }
                Matter.Composite.add(world, star);
                tailParticles.push(star);
            }
            // 如果不持久化，自动清理旧粒子
            if (!persist && tailParticles.length > 60) {
                var oldest = tailParticles.shift();
                Matter.Composite.remove(world, oldest);
            }
        }, 50); // 较慢的生成频率模拟星空稀疏效果
        return {
            interval: addtail,
            particles: tailParticles
        };
    }
}

// 使用示例


document.getElementById('playBtn').addEventListener('click', function () {
    togglePause();
})




function SetVelocityX(body, velocityX, time) {
    if (velocityX != 0 && time > 0) {
        var timeadd = setInterval(function () {
            Matter.Body.setVelocity(body, { x: velocityX, y: body.velocity.y });
            time -= 100;
            console.log("设置x方向速度：" + velocityX);
            console.log("剩余时间：" + time);
            if (time <= 0) {
                clearInterval(timeadd);
            }
        }, 100);
    }
}


function SetVelocityY(body, velocityY, time) {
    if (velocityY != 0 && time > 0) {
        var timeadd = setInterval(function () {
            Matter.Body.setVelocity(body, { x: body.velocity.x, y: velocityY * (-1) });
            time -= 100;
            console.log("设置Y方向速度：" + velocityY);
            console.log("剩余时间：" + time);
            if (time <= 0) {
                clearInterval(timeadd);
            }
        }, 100);
    }
}

function SetForceX(body, forceX, time) {
    if (forceX != 0 && time > 0) {
        var timeadd = setInterval(function () {
            Matter.Body.applyForce(body, { x: 0, y: 0 }, { x: forceX, y: body.force.y });
            time -= 100;
            console.log("设置x方向力：" + forceX);
            console.log("剩余时间：" + time);
            if (time <= 0) {
                clearInterval(timeadd);
            }
        }, 100);
    }
}


function SetForceY(body, forceY, time) {
    if (forceY != 0 && time > 0) {
        var timeadd = setInterval(function () {
            Matter.Body.applyForce(body, { x: 0, y: 0 }, { x: body.force.x, y: forceY });
            time -= 100;
            console.log("设置y方向力：" + forceY);
            console.log("剩余时间：" + time);
            if (time <= 0) {
                clearInterval(timeadd);
            }
        }, 100);
    }
}