import p5 from "p5";
import Matter from "matter-js";

export const drawOutline = (body: Matter.Bodies, p5: p5) => {
  p5.beginShape();
  for (const vert of body.vertices) {
    p5.vertex(vert.x, vert.y);
  }
  p5.endShape(p5.CLOSE);
};
