<script lang="ts">
    import type { Platform } from "./game";
    export let platform: Platform;
</script>
  
<style>
    #lander {
      border: solid black 1px;
      background-color: aquamarine;
      position: absolute;
    }
</style>
  
<section
    style="width: {platform.width}px; height: {platform.height}px; top: {platform.top}px; left: {platform.left}px;"
    id="lander"
></section>