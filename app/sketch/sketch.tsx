import { useEffect, useRef } from "react";
import p5 from "p5";
import Matter from "matter-js";
import { drawOutline } from "@/lib/drawOutline";

export const SketchComponent = () => {
  const p5Ref = useRef<HTMLDivElement>(null);
  // module aliases
  const Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    Render = Matter.Render,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint;

  const floors: Matter.Bodies[] = [];
  const characters: Matter.Bodies[] = [];

  // create an engine
  let engine: Matter.Engine;

  const width = window.innerWidth;
  const height = window.innerHeight;
  // 床追加
  floors.push(
    Bodies.rectangle(width / 2, height, width, 10, {
      isStatic: true,
    })
  );
  floors.push(
    Bodies.rectangle(width, height / 2, 10, height, {
      isStatic: true,
    })
  );
  floors.push(
    Bodies.rectangle(0, height / 2, 10, height, {
      isStatic: true,
    })
  );

  for (let i = 0; i < 100; i++) {
    characters.push(
      Bodies.trapezoid(width / 2 + Math.random() * 100 - 50, 0, 40, 40, 0.2, {
        density: 1, //密度
        frictionAir: 0.1, //空気抵抗
        restitution: 0, //反発係数
        friction: 0.8, //摩擦
      })
    );
  }

  const Sketch = (p5) => {
    p5.preload = () => {};

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      engine = Engine.create();
      Composite.add(engine.world, [...floors, ...characters]);

      // add mouse control
      const mouse = Mouse.create(p5Ref.current);
      //render.mouse = mouse;
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false,
          },
        },
      });

      Composite.add(engine.world, mouseConstraint);

      // Runner
      const runner = Runner.create();
      Runner.run(runner, engine);
    };

    p5.draw = () => {
      p5.clear();

      p5.push();
      p5.noFill();
      p5.stroke(255, 0, 0);
      p5.strokeWeight(1);
      for (const char of characters) {
        drawOutline(char, p5);
      }
      for (const floor of floors) {
        drawOutline(floor, p5);
      }
      p5.pop();

      Engine.update(engine);
      // Render.update(render);
    };
  };

  useEffect(() => {
    const mp5 = new p5(Sketch, p5Ref.current);
    return mp5.remove;
  }, []);

  return <div ref={p5Ref}></div>;
};
