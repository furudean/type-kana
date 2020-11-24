<script lang="ts">
  export let href: string;
  export let target = "_self";
  export let rel = "noopener";
</script>

<style lang="scss">
  a,
  a:visited {
    color: var(--accent-color);
    text-decoration: none;
    &:hover {
      text-decoration: underline dotted var(--accent-color);
    }
    &:focus {
      outline: none;
      color: var(--background-color);
      background-color: var(--accent-color);
      text-decoration: underline dotted var(--background-color);
    }
  }
  a[target="_blank"] {
    &:after {
      content: "";
      display: inline-block;
      vertical-align: middle;
      width: 1em;
      height: 1em;
      background-color: var(--accent-color);
      mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath d='M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z' fill='currentColor'%3E%3C/path%3E%3C/svg%3E");
      mask-repeat: no-repeat;
      mask-position: 50% 50%;
    }
    &:focus:after {
      background-color: var(--background-color);
    }
  }
</style>

<a {href} {target} {rel} {...$$props}>
  <slot />
</a>
