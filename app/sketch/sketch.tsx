import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { drawOutline } from "../../lib/drawOutline";
import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";

export const SketchComponent = () => {
  const angleRef = useRef<number>(0);
  const p5Ref = useRef(null);
  // module aliases
  const Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint;

  const floors: (typeof Bodies)[] = [];
  const characters: (typeof Bodies)[] = [];

  // create an engine
  let engine: typeof Engine;

  const sketch: Sketch = (p5) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const updateGravity = (event) => {
      const gravity = engine.world.gravity;

      angleRef.current = event.alpha;
      console.log(engine.world.gravity);

      // if (orientation === 0) {
      //   gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      //   gravity.y = Common.clamp(event.beta, -90, 90) / 90;
      // } else if (orientation === 180) {
      //   gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      //   gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
      // } else if (orientation === 90) {
      //   gravity.x = Common.clamp(event.beta, -90, 90) / 90;
      //   gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
      // } else if (orientation === -90) {
      //   gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
      //   gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
      // }
    };

    window.addEventListener("deviceorientation", updateGravity);
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

    for (let i = 0; i < 5; i++) {
      characters.push(
        Bodies.trapezoid(width / 2 + Math.random() * 100 - 50, 0, 40, 40, 0.2, {
          density: 1, //密度
          frictionAir: 0.1, //空気抵抗
          restitution: 0, //反発係数
          friction: 0.8, //摩擦
        })
      );
    }

    engine = Engine.create();
    Composite.add(engine.world, [...floors, ...characters]);

    // add mouse control
    const mouse = Mouse.create(p5Ref.current);
    // render.mouse = mouse;
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

    p5.preload = () => {};

    p5.setup = () => {
      p5.createCanvas(width, height);
      console.log("hoge");
    };

    p5.draw = () => {
      //@ts-ignore
      p5.clear();

      p5.push();
      p5.fill(255);
      p5.text(angleRef.current, 100, 100);
      p5.pop();
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

  return (
    <div ref={p5Ref}>
      <NextReactP5Wrapper sketch={sketch} />
    </div>
  );
};
