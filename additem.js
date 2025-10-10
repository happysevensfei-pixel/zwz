function additem(x, y, r, mass, restitution, friction, color) {
    const ball = Matter.Bodies.circle(x, y, r, {
        restitution: restitution, // 弹性系数，值越大越弹性
        friction: friction, // 摩擦力，值越小越光滑
        friction: 0.01, // 摩擦力，值越小越光滑
        frictionAir: 0, // 空气阻力，值越小越轻盈
        mass: mass, // 质量，值越大越重
        density: 0.001, // 密度，和质量成正比
        isStatic: false, // 是否静止，false表示可以移动
        isSensor: false, // 是否为传感器，false表示不检测碰撞
        label: 'Ball', // 标签，用于标识物体
        angle: 5, // 初始旋转角度
        angularVelocity: 5, // 初始角速度
        angularDamping: 0.01, // 角阻尼，值越大旋转减速越快
        collisionFilter: { // 碰撞过滤器，用于控制物体之间的碰撞
            category: 0x0001, // 类别，可以自定义
            mask: 0xFFFFFFFF, // 掩码，与类别进行按位与操作来决定是否发生碰撞
            group: 0 // 组，组相同的物体间会发生碰撞，组不同的物体间不会
        },
        inverseMass: 1 / 1, // 质量的倒数
        inverseInertia: 1 / 1, // 惯性的倒数
        render: {
            fillStyle: '#000000ff', // 填充颜色
            strokeStyle: color, // 描边颜色
            lineWidth: 5, // 描边宽度
            opacity: 1, // 透明度，1为不透明
            // sprite: {
            //     texture: 'path/to/image.png', // 使用纹理图片替代圆形
            //     xScale: 1, // 纹理图片的x轴缩放比例
            //     yScale: 1 // 纹理图片的y轴缩放比例
            // }
        }
    });
    Matter.World.add(world, ball);
}

function additem2(x, y, w, h, mass, restitution, friction, color) {

    const rectangle = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: restitution, // 弹性系数，值越大越弹性
        friction: friction, // 摩擦力，值越小越光滑
        frictionAir: 0, // 空气阻力，值越小越轻盈
        mass: mass, // 质量，值越大越重
        density: 0.001, // 密度，和质量成正比
        isStatic: false, // 是否静止，false表示可以移动
        isSensor: false, // 是否为传感器，false表示不检测碰撞
        label: 'rectangle', // 标签，用于标识物体
        angle: 0, // 初始旋转角度
        angularVelocity: 20, // 初始角速度
        angularDamping: 0.01, // 角阻尼，值越大旋转减速越快
        collisionFilter: { // 碰撞过滤器，用于控制物体之间的碰撞
            category: 0x0001, // 类别，可以自定义
            mask: 0xFFFFFFFF, // 掩码，与类别进行按位与操作来决定是否发生碰撞
            group: 0 // 组，组相同的物体间会发生碰撞，组不同的物体间不会
        },
        inverseMass: 1 / 1, // 质量的倒数
        inverseInertia: 1 / 1, // 惯性的倒数
        render: {
            fillStyle: '#000000ff', // 填充颜色
            strokeStyle: color, // 描边颜色
            lineWidth: 10, // 描边宽度
            opacity: 1, // 透明度，1为不透明

            //圆角
            radius: 10 // 圆角半径
            // sprite: {
            //     texture: 'path/to/image.png', // 使用纹理图片替代矩形
            //     xScale: 1, // 纹理图片的x轴缩放比例
            //     yScale: 1 // 纹理图片的y轴缩放比例
            // }
        }
    });

    Matter.World.add(world, rectangle);
}





function additemwall(x, y, w, h, mass, restitution, friction, color) {

    const rectangle = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: restitution, // 弹性系数，值越大越弹性
        friction: friction, // 摩擦力，值越小越光滑
        frictionAir: 0, // 空气阻力，值越小越轻盈
        mass: mass, // 质量，值越大越重
        density: 0.001, // 密度，和质量成正比
        isStatic: true, // 是否静止，false表示可以移动
        isSensor: false, // 是否为传感器，false表示不检测碰撞
        label: 'wall', // 标签，用于标识物体
        angle: 0, // 初始旋转角度
        angularVelocity: 20, // 初始角速度
        angularDamping: 0.01, // 角阻尼，值越大旋转减速越快
        collisionFilter: { // 碰撞过滤器，用于控制物体之间的碰撞
            category: 0x0001, // 类别，可以自定义
            mask: 0xFFFFFFFF, // 掩码，与类别进行按位与操作来决定是否发生碰撞
            group: 0 // 组，组相同的物体间会发生碰撞，组不同的物体间不会
        },
        inverseMass: 1 / 1, // 质量的倒数
        inverseInertia: 1 / 1, // 惯性的倒数
        render: {
            fillStyle: '#000000ff', // 填充颜色
            strokeStyle: color, // 描边颜色
            lineWidth: 10, // 描边宽度
            opacity: 1, // 透明度，1为不透明

            //圆角
            radius: 10 // 圆角半径
            // sprite: {
            //     texture: 'path/to/image.png', // 使用纹理图片替代矩形
            //     xScale: 1, // 纹理图片的x轴缩放比例
            //     yScale: 1 // 纹理图片的y轴缩放比例
            // }
        }
    });

    Matter.World.add(world, rectangle);
}

// additemwall(200, 900, 1100, 50, 10, 1, 0, 'white')
// additembelt(0.3, 10, 100, 500, 500, 100)
function additembelt(miu, beltver, x, y, w, h) {

    // 传送带函数
    var miu = miu; // 摩擦系数
    var g = 9.8; // 重力加速度
    var beltver = beltver; // 传送带速度

    // 添加传送带
    const belt = Matter.Bodies.rectangle(x, y, w, h, {
        restitution: 1, // 弹性系数，值越大越弹性
        friction: 0, // 摩擦力，值越小越光滑
        frictionAir: 0, // 空气阻力，值越小越轻盈
        mass: 100, // 质量，值越大越重
        density: 0.001, // 密度，和质量成正比
        isStatic: false, // 是否静止，false表示可以移动
        isSensor: false, // 是否为传感器，false表示不检测碰撞
        label: 'Rectangle', // 标签，用于标识物体
        angle: 0, // 初始旋转角度
        angularVelocity: 0, // 初始角速度
        angularDamping: 0.01, // 角阻尼，值越大旋转减速越快
        collisionFilter: { // 碰撞过滤器，用于控制物体之间的碰撞
            category: 0x0001, // 类别，可以自定义
            mask: 0xFFFFFFFF, // 掩码，与类别进行按位与操作来决定是否发生碰撞
            group: 0 // 组，组相同的物体间会发生碰撞，组不同的物体间不会
        },
        inverseMass: 1 / 1, // 质量的倒数
        inverseInertia: 1 / 1, // 惯性的倒数
        render: {
            fillStyle: '#FFD700', // 填充颜色
            strokeStyle: '#ecececff', // 描边颜色
            lineWidth: 6, // 描边宽度
            opacity: 1, // 透明度，1为不透明
            // sprite: {
            //     texture: 'path/to/image.png', // 使用纹理图片替代矩形
            //     xScale: 1, // 纹理图片的x轴缩放比例
            //     yScale: 1 // 纹理图片的y轴缩放比例
            // }
        }
    });

    // Matter.World.add(world, belt);






    Matter.Events.on(engine, 'beforeUpdate', function (event) {
        // 获取世界中的所有刚体（排除传送带自身）
        var bodies = Matter.Composite.allBodies(world).filter(b => b !== belt);

        // 遍历所有刚体
        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            // 检测当前刚体与传送带是否发生碰撞
            var collisions = Matter.Query.collides(body, [belt]);

            // 关键修复：添加空值保护
            if (collisions.length > 0) {
                var collision = collisions[0];

                // 正确获取碰撞双方信息
                var collidedBody = (collision.bodyA === belt) ? collision.bodyB : collision.bodyA;
                console.log('物体与传送带碰撞', collidedBody.label);

                var v = collidedBody.velocity.x;
                if (belt.angle == 0) {
                    // 优化条件判断顺序
                    if (v > beltver) {
                        collidedBody.velocity.x -= (miu * g * collidedBody.mass) / 10;
                        Matter.Body.setVelocity(collidedBody, { x: collidedBody.velocity.x, y: collidedBody.velocity.y });
                        console.log("速度修正（减速）", collidedBody.velocity.x.toFixed(2));
                    } else if (v < beltver) {
                        collidedBody.velocity.x += (miu * g * collidedBody.mass) / 10;
                        Matter.Body.setVelocity(collidedBody, { x: collidedBody.velocity.x, y: collidedBody.velocity.y });
                        console.log("速度修正（加速）", collidedBody.velocity.x.toFixed(2));
                    } else {
                        console.log("速度匹配目标值");
                    }
                }
                else {
                    if (v > beltver) {
                        collidedBody.velocity.x -= (miu * g * collidedBody.mass) / 10;
                        Matter.Body.setVelocity(collidedBody, { x: collidedBody.velocity.x * Math.cos(belt.angle * (-1)), y: -collidedBody.velocity.x * Math.sin(belt.angle * (-1)) });
                        console.log("速度修正（减速）", collidedBody.velocity.x.toFixed(2));
                    } else if (v < beltver) {
                        collidedBody.velocity.x += (miu * g * collidedBody.mass) / 10;
                        Matter.Body.setVelocity(collidedBody, { x: collidedBody.velocity.x * Math.cos(belt.angle * (-1)), y: -collidedBody.velocity.x * Math.sin(belt.angle * (-1)) });
                        console.log("速度修正（加速）", collidedBody.velocity.x.toFixed(2));
                    } else {
                        console.log("速度匹配目标值");
                    }

                }
            }
        }
    });



}



//悬挂物体
function additempendulum(x, y, r, mass, restitution, friction, color, rs) {
    // 创建悬挂点（固定点）
    const anchor = Bodies.circle(x, y, 5, {
        isStatic: true,
        render: {
            fillStyle: '#000000'
        }
    });

    // 创建悬挂的球体
    const ball = Bodies.circle(x, y + r * 2, r, {
        mass: mass,
        restitution: restitution,
        friction: friction,
        render: {
            fillStyle: color || '#ff0000'
        }
    });

    // 创建悬挂用的约束（绳子）
    const constraint = Constraint.create({
        pointA: { x: x, y: y },
        bodyB: ball,
        length: rs,
        stiffness: 0.2,
        render: {
            type: 'line',
            strokeStyle: '#ffffffff'
        }
    });

    // 将物体添加到物理世界
    World.add(engine.world, [anchor, ball, constraint]);

    return {
        anchor: anchor,
        ball: ball,
        constraint: constraint
    };
}


// 在坐标(200,100)处悬挂一个半径20，质量1，弹性0.7，摩擦0.1的红色球体
// additempendulum(500, 100, 50, 1, 0.7, 0.1, '#ffffffff', 600);
// 悬挂矩形物体
function addRectPendulum(x, y, width, height, mass, restitution, friction, color, rs) {
    // 创建悬挂点（固定点）
    const anchor = Bodies.circle(x, y, 5, {
        isStatic: true,
        render: {
            fillStyle: '#000000'
        }
    });

    // 创建悬挂的矩形物体
    const rect = Bodies.rectangle(x, y + height, width, height, {
        mass: mass,
        restitution: restitution,
        friction: friction,
        render: {
            fillStyle: '#000000ff'
            , strokeStyle: '#dbdbdbff'
        }
    });

    // 创建悬挂用的约束（绳子）
    const constraint = Constraint.create({
        pointA: { x: x, y: y },
        bodyB: rect,
        length: rs,
        stiffness: 0.2,
        render: {
            type: 'line',
            strokeStyle: '#ffffffff'
        }
    });

    // 将物体添加到物理世界
    World.add(engine.world, [anchor, rect, constraint]);

    return {
        anchor: anchor,
        rect: rect,
        constraint: constraint
    };
}
// 在坐标(300,150)处悬挂一个宽40、高60，质量2，弹性0.5，摩擦0.2的绿色矩形
// addRectPendulum(300, 150, 40, 60, 2, 0.5, 0.2, '#00ff00', 100);



/**
 * 创建弹簧连接两个物体
 * @param {object} bodyA - 第一个物体
 * @param {object} bodyB - 第二个物体
 * @param {number} stiffness - 弹簧刚度 (0-1)
 * @param {number} length - 弹簧自然长度
 * @param {string} color - 弹簧颜色
 */
function createSpring(bodyA, bodyB, stiffness = 0.5, length = 100, color = '#ffffff') {
    return Matter.Constraint.create({
        bodyA: bodyA,
        bodyB: bodyB,
        stiffness: stiffness,
        length: length,
        render: {
            type: 'spring',
            strokeStyle: color
        }
    });
}

/**
 * 创建多边形物体
 * @param {number} x - x坐标
 * @param {number} y - y坐标
 * @param {number} sides - 边数
 * @param {number} radius - 半径
 * @param {object} options - 物理属性选项
 */
function addPolygon(x, y, sides, radius, options = {}) {
    const defaults = {
        restitution: 0.7,
        friction: 0.1,
        render: {
            fillStyle: '#000000ff',
            strokeStyle: '#dbdbdbff'
        }
    };
    const polygon = Matter.Bodies.polygon(x, y, sides, radius, { ...defaults, ...options });
    Matter.World.add(world, polygon);
    return polygon;
}

/**
 * 创建堆叠物体
 * @param {number} count - 堆叠数量
 * @param {number} startX - 起始x坐标
 * @param {number} startY - 起始y坐标
 * @param {number} spacing - 间距
 * @param {function} createFn - 创建物体的函数
 */
function createStack(count, startX, startY, spacing, createFn) {
    const stack = [];
    for (let i = 0; i < count; i++) {
        stack.push(createFn(startX, startY + i * spacing));
    }
    Matter.World.add(world, stack);
    return stack;
}



/**
 * 创建复合物体（如汽车）
 * @param {number} x - x坐标
 * @param {number} y - y坐标
 * @param {number} width - 宽度
 * @param {number} height - 高度
 */
function createCar(x, y, width, height) {
    const group = Matter.Body.nextGroup(true);
    const wheelWidth = width * 0.2;
    const wheelHeight = wheelWidth;

    const body = Matter.Bodies.rectangle(x, y, width, height / 2, {
        collisionFilter: { group: group },
        chamfer: { radius: 10 },
        render: { fillStyle: '#ce9595ff', strokeStyle: '#dbdbdbff' }
    });

    const wheel1 = Matter.Bodies.circle(x - width * 0.3, y + height * 0.3, wheelWidth / 2, {
        collisionFilter: { group: group },
        render: { fillStyle: '#ffffffff', strokeStyle: '#dbdbdbff' }
    });

    const wheel2 = Matter.Bodies.circle(x + width * 0.3, y + height * 0.3, wheelWidth / 2, {
        collisionFilter: { group: group },
        render: { fillStyle: '#ffffffff', strokeStyle: '#dbdbdbff' }
    });

    const car = Matter.Body.create({
        parts: [body, wheel1, wheel2],
        frictionAir: 0.02
    });

    Matter.World.add(world, car);
    return car;
}




/**
 * 创建向心力实验装置
 * @param {number} x - 中心x坐标
 * @param {number} y - 中心y坐标
 * @param {number} radius - 旋转半径
 */
function centripetalForceDemo(x = 400, y = 300, radius = 100) {
    const center = Matter.Bodies.circle(x, y, 10, { isStatic: true });
    const ball = Matter.Bodies.circle(x + radius, y, 20, {
        velocity: { x: 0, y: 5 },
        render: { fillStyle: '#E91E63' }
    });
    const rod = Matter.Constraint.create({
        bodyA: center,
        bodyB: ball,
        length: radius,
        render: { strokeStyle: '#FFF' }
    });
    Matter.World.add(world, [center, ball, rod]);
    return { center, ball, rod };
}

/**
 * 创建跷跷板
 * @param {number} x - 支点x坐标
 * @param {number} y - 支点y坐标
 * @param {number} length - 板长度
 * @param {number} thickness - 板厚度
 */
function createSeesaw(x, y, length, thickness) {
    const plank = Matter.Bodies.rectangle(x, y, length, thickness, {
        friction: 0.1,
        render: { fillStyle: '#8D6E63' }
    });

    const pivot = Matter.Bodies.circle(x, y, 10, {
        isStatic: true,
        render: { fillStyle: '#000000' }
    });

    const constraint = Matter.Constraint.create({
        bodyA: plank,
        pointB: { x: x, y: y },
        stiffness: 1,
        render: { type: 'pin' }
    });

    Matter.World.add(world, [plank, pivot, constraint]);
    return { plank, pivot, constraint };
}




function clearAllBodies(world) {
    // 获取世界中所有的物体
    const bodies = Matter.Composite.allBodies(world);

    // 获取世界中所有的约束
    const constraints = Matter.Composite.allConstraints(world);

    // 遍历并移除所有物体
    for (let i = 0; i < bodies.length; i++) {
        Matter.Composite.remove(world, bodies[i]);
    }

    // 遍历并移除所有约束，跳过鼠标约束
    for (let i = 0; i < constraints.length; i++) {
        if (constraints[i].label !== 'mouseConstraint') {
            Matter.Composite.remove(world, constraints[i]);
        }
    }


    //添加鼠标约束
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.5,
            render: {
                visible: false
            }
        }
    });
    Matter.World.add(world, mouseConstraint);

}




