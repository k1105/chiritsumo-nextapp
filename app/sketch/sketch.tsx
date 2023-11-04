import { useEffect, useRef } from "react";
import Matter from "matter-js";
import { drawOutline } from "../../lib/drawOutline";
import React from "react";
import { type Sketch } from "@p5-wrapper/react";
import { NextReactP5Wrapper } from "@p5-wrapper/next";
import { Image } from "p5";

export const SketchComponent = () => {
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
  const imageArrayRef = useRef<Image[]>([]);
  const imageLength = 100;

  // create an engine
  let engine: typeof Engine;

  const sketch: Sketch = (p5) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const characterSize = width > 1200 ? { w: 60, h: 60 } : { w: 40, h: 40 };

    const updateGravity = (event) => {
      const gravity = engine.world.gravity;

      gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
      gravity.y = Common.clamp(event.beta, -90, 90) / 90;

      // if (orientation === 0) {

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
      Bodies.rectangle(width / 2, height * 0.95, width, height * 0.1, {
        isStatic: true,
      })
    );
    floors.push(
      Bodies.rectangle(width + 40, height / 2, 100, height * 2, {
        isStatic: true,
      })
    );
    floors.push(
      Bodies.rectangle(-40, height / 2, 100, height * 2, {
        isStatic: true,
      })
    );

    if (width > 1200) {
      //pc用のブレークポイント
      floors.push(
        Bodies.rectangle((width / 3) * 2, height / 2, 10, height, {
          isStatic: true,
        })
      );
      floors.push(
        Bodies.rectangle(width / 3, height / 2, 10, height, {
          isStatic: true,
        })
      );
    }

    // for (let i = 0; i < 100; i++) {
    //   characters.push(
    //     Bodies.trapezoid(
    //       width / 2 + Math.random() * 100 - 50,
    //       0,
    //       characterSize.w,
    //       characterSize.h,
    //       0.2,
    //       {
    //         density: 1, //密度
    //         frictionAir: 0.1, //空気抵抗
    //         restitution: 0, //反発係数
    //         friction: 0.8, //摩擦
    //       }
    //     )
    //   );
    // }

    setInterval(() => {
      if (characters.length < imageLength) {
        const char = Bodies.trapezoid(
          width / 2 + Math.random() * 100 - 50,
          -100,
          characterSize.w,
          characterSize.h,
          0.2,
          {
            density: 1, //密度
            frictionAir: 0.1, //空気抵抗
            restitution: 0, //反発係数
            friction: 0.8, //摩擦
          }
        );
        characters.push(char);
        Composite.add(engine.world, char);
      }
    }, 100);

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

    p5.preload = () => {
      const path = "img/chiri-test.png";
      const img = p5.loadImage(path);
      imageArrayRef.current.push(img);
    };

    p5.setup = () => {
      p5.createCanvas(width, height * 0.9);
      p5.imageMode(p5.CENTER);
    };

    p5.draw = () => {
      //@ts-ignore
      p5.clear();

      p5.push();
      p5.fill(255);
      p5.pop();
      p5.push();
      p5.noFill();
      p5.stroke(255, 0, 0);
      p5.strokeWeight(1);
      for (const char of characters) {
        // drawOutline(char, p5);
        p5.push();
        p5.translate(char.position.x, char.position.y);
        p5.rotate(char.angle);
        p5.image(
          imageArrayRef.current[0],
          0,
          0,
          characterSize.w,
          characterSize.h
        );
        p5.pop();
      }
      // for (const floor of floors) {
      // drawOutline(floor, p5);
      // }
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
