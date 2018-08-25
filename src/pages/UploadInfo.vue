<template>
  <article class="page-upload-info">
    <section class="section">
      <header class="section-header">导入信息</header>
      <div class="btn-wrap">
        <a class="btn">导入成绩</a>
        <a class="btn">导入学生信息</a>
      </div>
      <dl>
        <dt class="dt">学生信息</dt>
        <dd class="dd">
          <ul>
            <li>学生成绩信息1</li>
            <li>学生成绩信息2</li>
          </ul>
        </dd>
        <dt class="dt">成绩</dt>
        <dd class="dd">
          <ul>
            <li>思想道德修养一般成绩</li>
            <li>思想道德修养一般成绩</li>
            <li>思想道德修养一般成绩</li>
            <li>思想道德修养一般成绩</li>
            <li>思想道德修养一般成绩</li>
            <li>思想道德修养一般成绩</li>
          </ul>
        </dd>
      </dl>
    </section>
  </article>
</template>

<style lang="postcss" scoped>
@import '../assets/css/section.css';

.section {
  padding-bottom: 20px;

  & .btn-wrap {
    margin: 20px 70px;
    & .btn {
      display: inline-block;
      width: 120px;
      line-height: 20px;
      border: 1px solid var(--red);
      text-align: center;
      border-radius: 10px;
      color: var(--red);
      margin-right: 30px;
    }
  }

  & dl {
    margin: 0 40px;

    & .dd {
      padding: 10px 30px;
      line-height: 24px;
    }
  }
}
</style>
