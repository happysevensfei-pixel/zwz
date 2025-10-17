var ground = Matter.Bodies.rectangle(100, (window.innerHeight / 2) + 300, 10000, 20, {
    restitution: 1,
    //静止
    isStatic: true,
    render: {
        fillStyle: '#6d6d6dff',
        friction: 0, // 设置摩擦为0
        frictionAir: 0

    }
});
Matter.World.add(world, ground);






const ball = Matter.Bodies.circle(400, 200, 40, {
    restitution: 1, // 弹性系数，值越大越弹性
    friction: 0, // 摩擦力，值越小越光滑
    frictionAir: 0, // 空气阻力，值越小越轻盈
    inertia: Infinity, // 惯性
    mass: 100, // 质量，值越大越重
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
        strokeStyle: '#989898ff', // 描边颜色
        lineWidth: 6, // 描边宽度
        opacity: 1, // 透明度，1为不透明
        // sprite: {
        //     texture: 'path/to/image.png', // 使用纹理图片替代圆形
        //     xScale: 1, // 纹理图片的x轴缩放比例
        //     yScale: 1 // 纹理图片的y轴缩放比例
        // }
    }
});
// Matter.World.add(world, ball);


const balll = Matter.Bodies.circle(800, 200, 40, {
    restitution: 0.8, // 弹性系数，值越大越弹性
    friction: 0, // 摩擦力，值越小越光滑
    frictionAir: 0, // 空气阻力，值越小越轻盈
    mass: 100, // 质量，值越大越重
    //惯性
    inertia: Infinity, // 惯性
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
        strokeStyle: '#989898ff', // 描边颜色
        lineWidth: 6, // 描边宽度
        opacity: 1, // 透明度，1为不透明
        // sprite: {
        //     texture: 'path/to/image.png', // 使用纹理图片替代圆形
        //     xScale: 1, // 纹理图片的x轴缩放比例
        //     yScale: 1 // 纹理图片的y轴缩放比例
        // }
    }
});
// Matter.World.add(world, balll);



const mouse = Matter.Mouse.create(render.canvas);
// 绑定渲染器鼠标，确保事件源更新
render.mouse = mouse;
const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: {
        stiffness: 0.2,
        render: { visible: false }
    }
});
Matter.World.add(world, mouseConstraint);