<template>
  <article class="page-roast">
    <section class="section">
      <header class="section-header">微吐槽</header>
      <ul class="roast-list">
        <li class="roast-item">
          <div class="user">
            <div class="avatar"><img src="" alt="用户头像"></div>
            <div class="name">尼古拉斯</div>
            <div class="anonymous">匿名</div>
          </div>
          <div class="content">
            <p>叫三对空调实在太冷了，让人无法忍受，我又不是冰棍，不需要冻。</p>
            <img class="content-img" src="" alt="吐槽配图">
            <footer class="content-info clearfix">
              <div class="time">5分钟前</div>
              <a class="del">删除</a>
              <div class="like">
                25
                <span><img src="" alt="点击点赞"></span>
              </div>
            </footer>
          </div>
        </li>
        <li class="roast-item">
          <div class="user">
            <div class="avatar"><img src="" alt="用户头像"></div>
            <div class="name">尼古拉斯</div>
            <div class="anonymous">匿名</div>
          </div>
          <div class="content">
            <p>叫三对空调实在太冷了，让人无法忍受，我又不是冰棍，不需要冻。</p>
            <img class="content-img" src="" alt="吐槽配图">
            <footer class="content-info clearfix">
              <div class="time">5分钟前</div>
              <a class="del">删除</a>
              <div class="like">
                25
                <span><img src="" alt="点击点赞"></span>
              </div>
            </footer>
          </div>
        </li>
      </ul>
    </section>
  </article>
</template>

<style lang="postcss" scoped>
@import '../assets/css/section.css';

.roast-list {
  padding: 20px 40px;

  & .roast-item {
    border-bottom: 1px solid #ededed;
    padding-top: 20px;
    padding-bottom: 10px;

    &:last-child {
      border-bottom: none;
    }

    & .user {
      float: left;

      & .avatar {
        width: 80px;
        height: 80px;
        background: red;
      }

      & .name {
        text-align: center;
        margin-top: 10px;
      }

      & .anonymous {
        width: 30px;
        line-height: 18px;
        text-align: center;
        border: 1px solid var(--red);
        color: var(--red);
        border-radius: 4px;
        margin: 4px auto;
      }
    }

    & .content {
      margin-left: 100px;

      & .content-img {
        display: block;
        width: 200px;
      }

      & footer.content-info {
        color: #acacac;
        font-size: 12px;

        & .time,
        & .del {
          float: left;
          margin-right: 20px;
        }

        & .like {
          float: right;
        }
      }
    }
  }
}
</style>

