<!--  -->
<template>

  <div class="container">
    <input type="radio" id="item1" name="item"><label for="item1">Item1</label>
    <div class="context hiddenDiv">
      <span>span123span css html javascript jquery angularJS nodeJS
        css html javascript jquery angularJS nodeJS css html javascript jquery angularJS nodeJS</span>
    </div>
    <input type="radio" id="item2" name="item">
    <label for="item2">Item2</label>
    <div class="context hiddenDiv">
      <span>hello world hello world hello world hello world hello world hello world hello
        world hello world hello world
        css html javascript jquery angularJS nodeJS css html javascript jquery angularJS nodeJS css html javascript
        jquery angularJS nodeJS
        css html javascript jquery angularJS nodeJS css html javascript jquery angularJS nodeJS</span>
    </div>
    <input type="radio" id="item3" name="item"><label for="item3">Item3</label>
    <div class="context hiddenDiv">
      <span>hello world hello world hello world hello world hello world hello world hello
        world hello world hello world
        hello world hello world hello world hello world hello world hello world hello world hello world hello world
        hello world hello world hello world hello world hello world hello world hello world hello world hello world
      </span>
    </div>


  </div>



</template>

<script setup lang='ts'>




</script>
<style lang='scss' scoped>
/* Static state */


.container {
  width: 80%;
  height: 400px;
  margin: 0 auto;
  margin-top: 30px;
  border: 1px solid #dddddd;
  border-radius: 1px;
}

input {
  display: none;
}

label {
  display: block;
  background-color: #F5F5F5;
  width: 99%;
  height: 40px;
  margin: 0 auto;
  border: 1px solid #dddddd;
  border-radius: 2px;
  margin-top: 5px;
  line-height: 40px;
}

.context {
  width: 99%;
  height: 0px;
  margin: 0 auto;
  border: 1px solid #dddddd;
  border-radius: 2px;
  visibility: hidden;
  transition: height 0.5s linear;
  -webkit-transition: height 0.5s linear;
  -moz-transition: height 0.5s linear;
  -ms-transition: height 0.5s linear;
}

input:checked+label+.context {
  visibility: visible;
  height: 150px;
}
</style>