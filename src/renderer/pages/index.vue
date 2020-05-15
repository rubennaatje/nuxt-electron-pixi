<template> </template>
<script>
import { Viewport } from "pixi-viewport";
import tweenManager from "pixi-tween";
import { SVGPixi } from "./svg-pixi";
export default {
  mounted() {
    this.startPixi();
  },
  methods: {
    startPixi() {
      var app = new PIXI.Application({
        width: 1024,
        height: 800,
        antialias: true,
        backgroundColor: 0xced6e2
      });

      var cardImg;
      var gameScene;
      var position;
      var tween;

      document.body.appendChild(app.view);

      function setup() {
        cardImg = new PIXI.Sprite(
          PIXI.loader.resources["images/Hearts_Q.png"].texture
        );
        cardImg.scale.set(0.5);

        gameScene.addChild(cardImg);

        position = { x: 0, y: 0, rotation: 0 };
        tween = new TWEEN.Tween(position)
          .to({ x: 700, y: 200, rotation: 359 }, 2000)
          .delay(1000)
          .easing(TWEEN.Easing.Elastic.InOut)
          .onUpdate(update);

        tween.start();

        app.ticker.add(dt => gameLoop(dt));
      }

      function init() {
        gameScene = new PIXI.Container();

        app.stage.addChild(gameScene);

        PIXI.loader.add("images/Hearts_Q.png").load(setup);
      }

      function gameLoop() {
        var dt = app.ticker.elapsedMS / 1000;

        var result = TWEEN.update(app.ticker.elapsedMS);
      }

      function update() {
        cardImg.position.set(position.x, position.y);
      }

      init();
    }
  }
};
</script>
