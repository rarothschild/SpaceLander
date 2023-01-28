<script lang="ts">
    import type { Lander } from "./game";
    export let lander: Lander;
</script>
  
<style>
    #lander {
      border: solid black 1px;
      background-color: yellow;
      position: absolute;
    }
</style>
  
<section
    style="width: {lander.width}px; height: {lander.height}px; top: {lander.top}px; left: {lander.left}px;"
    id="lander"
></section>