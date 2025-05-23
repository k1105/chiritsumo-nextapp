import {useRef} from "react";
import Matter from "matter-js";
import React from "react";
import {type Sketch} from "@p5-wrapper/react";
import {NextReactP5Wrapper} from "@p5-wrapper/next";
import {Image} from "p5";
import {useDispatch} from "react-redux";
import {setCount} from "../../components/ConterSlice";
import {AppDispatch} from "../../store";
import {drawOutline} from "@/lib/drawOutline";

export const SketchComponent = () => {
  const p5Ref = useRef(null);
  // module aliases
  const Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    Runner = Matter.Runner,
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Events = Matter.Events;

  const floors: (typeof Bodies)[] = [];
  const characters: (typeof Bodies)[] = [];
  const imageArrayRef = useRef<Image[]>([]);
  const imageLength = 90;
  const imagePath = useRef<string>("/img/large/chiri-1.webp");
  const dispatch: AppDispatch = useDispatch();

  // create an engine first
  let engine: typeof Engine;

  const sketch: Sketch = (p5) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const characterSize = width > 1200 ? {w: 60, h: 60} : {w: 40, h: 40};

    // create an engine first
    engine = Engine.create();

    const updateGravity = (event) => {
      const gravity = engine.world.gravity;
      if (event && event.gamma && event.beta) {
        // デバイスオリエンテーションが利用可能な場合
        gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
        gravity.y = Common.clamp(event.beta, -90, 90) / 90;
      } else {
        // PCなどデバイスオリエンテーションが利用できない場合
        gravity.x = 0;
        gravity.y = 0.5; // 下向きの重力
      }
    };

    // 初期重力を設定
    updateGravity(null);

    // デバイスオリエンテーションが利用可能な場合のみイベントリスナーを追加
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", updateGravity, {
        passive: true,
      });
    }
    // 床追加
    floors.push(
      Bodies.rectangle(width / 2, height, width, height * 0.1, {
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
        Bodies.rectangle(width, height / 2, 10, height, {
          isStatic: true,
        })
      );
      floors.push(
        Bodies.rectangle(width / 3, height / 2, 10, height, {
          isStatic: true,
        })
      );
    } else {
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
    }

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
    }, 1000);

    Composite.add(engine.world, [...floors, ...characters]);

    // add mouse control
    const mouse = Mouse.create(p5Ref.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    // マウスホイールイベントをpassiveに設定
    if (p5Ref.current) {
      p5Ref.current.addEventListener("wheel", () => {}, {passive: true});
    }

    Composite.add(engine.world, mouseConstraint);

    // Runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    Events.on(runner, "tick", (event) => {
      if (
        mouseConstraint.body &&
        mouseConstraint.body.label == "Trapezoid Body"
      ) {
        dispatch(setCount(mouseConstraint.body.id - 6));
        imagePath.current =
          "/img/large/chiri-" + String(mouseConstraint.body.id - 4) + ".webp";
      }
    });

    p5.preload = () => {
      for (let i = 0; i < imageLength; i++) {
        const path = "img/small/chiri-" + String(i + 1) + ".webp";
        const img = p5.loadImage(path);
        imageArrayRef.current.push(img);
      }
    };

    p5.setup = () => {
      p5.createCanvas(width, height * 0.98);
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
      characters.forEach((char, i) => {
        // drawOutline(char, p5);
        p5.push();
        p5.translate(char.position.x, char.position.y);
        p5.rotate(char.angle);
        p5.image(
          imageArrayRef.current[i],
          0,
          0,
          characterSize.w * 2.4,
          characterSize.h * 2.4
        );
        p5.pop();
      });
      // for (const floor of floors) {
      //   drawOutline(floor, p5);
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
