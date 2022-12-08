<template>
  <div>
    <div class="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
      <p>Loading...</p> 
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Spinner'
  }
</script>

<style>
  .lds-facebook {
    display: flex;
    margin: 0 auto;
    position: relative;
    top: 300px;
    width: 80px;
    height: 80px;
  }

  .lds-facebook p {
    padding-left: 0.6rem;
  }

  .lds-facebook div {
    display: inline-block;
    position: absolute;
    right: 50%;
    width: 16px;
    background: rgb(154, 154, 154);
    animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
  }

  .lds-facebook div:nth-child(1) {
    left: 8px;
    animation-delay: -0.24s;
  }

  .lds-facebook div:nth-child(2) {
    left: 32px;
    animation-delay: -0.12s;
  }

  .lds-facebook div:nth-child(3) {
    left: 56px;
    animation-delay: 0;
  }

  @keyframes lds-facebook {
    0% {
      top: 8px;
      height: 64px;
    }

    50%,
    100% {
      top: 24px;
      height: 32px;
    }
  }
</style>