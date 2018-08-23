<template>
  <form class="upload-file">
    <input type="file" name="file">
    <button class="form-submit">上传</button>
  </form>
</template>

<style lang="postcss" scoped>
@import "../assets/css/section.css";

.upload-file {
  padding: 20px 70px;

  & .form-submit {
    display: inline-block;
    width: 100px;
  }
}
</style>
