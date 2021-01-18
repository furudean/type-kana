<script lang="ts">
  export let size = "1em";
  export let width = size;
  export let height = size;
  export let color = "currentColor";
  export let viewBox = "0 0 24 24";
  export let path: string;
</script>

<svg {width} {height} {viewBox}>
  <path d={path} fill={color} />
</svg>
