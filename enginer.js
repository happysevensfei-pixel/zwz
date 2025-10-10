const { Mouse, MouseConstraint, Vector, Events, Query, Constraint, World, Render, Composite } = Matter;
const { Engine, Runner, Bodies } = Matter;

const engine = Matter.Engine.create();
const world = engine.world;

// 设置重力
world.gravity.y = 1; // 设置y方向的重力
// 创建渲染器，将渲染画板设置为整个 body 页面
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // 禁用线框模式
        background: 'black' // 设置背景颜色为黑色
    }
});

// 确保 Matter canvas 在所有 UI 之下且铺满视口，避免遮挡底部按钮
try {
    const canvas = render && render.canvas;
    if (canvas) {
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'auto';
    }
} catch (_) { }

// 运行渲染器
Render.run(render);

// 运行引擎

// 在引擎创建后安装插件

// 暴露到全局，便于其他模块管理场景
window.__matter = { Matter, engine, world, render };
window.resetMatterWorld = function resetMatterWorld() {
    try {
        // 仅移除普通刚体与普通约束，保留鼠标约束
        const mouseConstraint = window.__matter && window.__matter.mouseConstraint;
        const bodies = Matter.Composite.allBodies(world);
        const constraints = Matter.Composite.allConstraints(world);
        bodies.forEach(b => { try { Matter.World.remove(world, b); } catch (_) { } });
        constraints.forEach(c => {
            if (mouseConstraint && (c === mouseConstraint || c === mouseConstraint.constraint)) return;
            try { Matter.World.remove(world, c); } catch (_) { }
        });
    } catch (e) {
        console.error('重置世界失败', e);
    }
};

// 确保存在鼠标拖拽约束
window.addMouseConstraint = function addMouseConstraint() {
    try {
        if (!render || !engine) return;
        // 如果已有则重设 mouse 并返回
        if (window.__matter && window.__matter.mouseConstraint) {
            const mc = window.__matter.mouseConstraint;
            const mouse = Matter.Mouse.create(render.canvas);
            render.mouse = mouse;
            mc.mouse = mouse;
            return;
        }
        const mouse = Matter.Mouse.create(render.canvas);
        render.mouse = mouse;
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });
        Matter.World.add(world, mouseConstraint);
        if (window.__matter) window.__matter.mouseConstraint = mouseConstraint;
    } catch (e) {
        console.error('添加鼠标约束失败', e);
    }
};

// 初始化后立即建立一次鼠标约束
try { window.addMouseConstraint(); } catch (_) { }
