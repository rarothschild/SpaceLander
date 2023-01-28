<script lang="ts">
    import { GameController } from "./game";
    import Lander from './Lander.svelte';
	import Platform from "./Platform.svelte";

    const game = new GameController();
    let frame = game.newGame();

    function startGame() {
      frame = game.start();
    }

    function onKeyDown(e:KeyboardEvent) {
		 switch(e.key) {
			 case "ArrowUp":
                game.engineOn = true;
                break;
            case "ArrowLeft":
                game.rotateLeft = true;
                break;
            case "ArrowRight":
                game.rotateRight = true;
                break;
		 }
	}

    function onKeyUp(e:KeyboardEvent) {
        console.log(e.key)
		 switch(e.key) {
			 case "ArrowUp":
                game.engineOn = false;
                break;
            case "ArrowLeft":
                game.rotateLeft = false;
                break;
            case "ArrowRight":
                game.rotateRight = false;
                break;
		 }
	}

    setInterval(() => {
        frame = game.nextFrame();
    }, 1000 / 90);
</script>

<style>
    main {
      position: relative;
      border: solid black 1px;
      overflow: hidden;
      background-color: lightblue;
    }
    #ground {
          background-color: brown;
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
      }
      #init-screen {
      user-select: none;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      font-family: monospace;
    }
    #init-screen h2 {
      text-align: center;
    }
    #init-screen button {
      font-family: monospace;
      font-size: 16px;
      border: none;
      border-radius: none;
      background-color: ghostwhite;
      padding: 10px;
      cursor: pointer;
      outline: none;
      transition: ease-in-out 0.2s font-size;
      display: block;
      margin: 0 auto;
    }
    #init-screen button:active,
    #init-screen button:focus {
      outline: none;
      font-size: 15px;
    }
    #score {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 20px;
      z-index: 10;
      padding: 5px;
      font-family: cursive;
      background-color: white;
      user-select: none;
    }
</style>
  

<pre>{JSON.stringify(frame,null,2)}</pre>
<main class="game" style="width: {frame.width}px; height: {frame.height}px;">
    <section id="score">{frame.score}</section>

    <Lander lander={frame.lander} />
    <Platform platform={frame.platform}/>

    {#if frame.gameOver || !frame.gameStarted}
    <section id="init-screen">
        {#if frame.gameOver}
            <h2>Game Over</h2>
            <h2>Score {frame.score}</h2>
        {/if}
        <button on:click="{startGame}">Start Game</button>
    </section>
    {/if}

    <section style="height: {frame.ground.height}px;" id="ground" ></section>

</main>

<svelte:window on:keydown|preventDefault={onKeyDown} on:keyup|preventDefault={onKeyUp} />