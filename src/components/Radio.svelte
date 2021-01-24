<script lang="ts">
  export let id: string = undefined;
  export let name: string = undefined;
  export let checked: boolean = undefined;
  export let value: any;

  export let group: any = undefined;
</script>

<input type="radio" {id} {name} {value} bind:group {checked} />

<style lang="scss">
  input[type="radio"] {
    --checked-color: hsl(202, 87%, 40%);
    --checked-highlight-color: hsl(202, 87%, 52%);

    appearance: none;
    position: relative;
    display: inline-block;
    outline: none;
    margin: 0;
    vertical-align: middle;
    line-height: inherit;
    cursor: pointer;
    font-size: inherit;
    width: 1.25em;
    height: 1.25em;
    background-color: white;
    border-radius: 50%;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.25);
    transition: 125ms var(--standard-transition) background-color;
  }

  // Checked state

  input[type="radio"]:checked {
    background-color: var(--checked-color);
    box-shadow: inset 0 1px 3px var(--checked-highlight-color);
  }

  input[type="radio"]:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
    border-radius: 50%;
    transform: scale(0);
    transition: 125ms var(--standard-transition) transform;
  }

  input[type="radio"]:checked:after {
    transform: scale(40%);
  }

  // Focus state

  input[type="radio"]:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 0 0 0 3px var(--focus-color);
    border-radius: 50%;
    opacity: 0;
    transition: 125ms var(--standard-transition) opacity;
  }

  input[type="radio"]:focus:before {
    opacity: 1;
  }

  // Active state

  input[type="radio"]:checked:active {
    background-color: var(--checked-highlight-color);
    transition: 60ms var(--standard-transition) transform;
  }
</style>
