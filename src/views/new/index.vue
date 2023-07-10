<template>
  <div class="blog-box">
    <div class="blog-content">
      <div class="title">
        <div>全部博客</div>
        <div>
          共
          <span style="color: aquamarine">{{ number }}</span>
          篇
        </div>
      </div>
      <div class="card-box">
        <div
          class="card"
          v-for="item in blogList"
          @click="goDetail(item.id)"
          :key="item.id"
        >
          <div class="card-img">
            <img src="@/assets/vue.svg" />
          </div>
          <div class="card-right">
            <div class="card-title">
              {{ item.title }}
            </div>
            <div class="card-introduction">
              {{ item.introduction }}
            </div>
            <div class="card-bottom">
              <div class="user-img">
                <img src="@/assets/vue.svg" />
              </div>
              <div class="user">
                {{ item.author }}
              </div>
              <div class="time">
                {{ item.time }}
              </div>
              <div class="tags">
                <el-tag
                  class="tag"
                  v-for="i in item.tag"
                  @click.stop="clickTag(i)"
                  :key="i"
                >
                  {{ i }}
                </el-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="blogList.length"
      /> -->
    </div>
    <div class="blog-right">
      <div class="blog-classification">
        <div class="class-title">分类</div>
        <div class="class-box">
          <div
            class="class-item"
            v-for="item in classList"
            @click="clickClass(item.title)"
            :key="item.id"
          >
            <div class="class-img">
              <img src="@/assets/vue.svg" />
            </div>
            <div class="class-name">
              {{ item.title }}
            </div>
            <div class="class-num">
              {{ item.number }}
            </div>
          </div>
        </div>
      </div>
      <div class="blog-label">
        <div class="label-title">标签</div>
        <div class="container">
          <div class="tag-box">
            <span
              class="tag-item"
              v-for="item in styleTag"
              :key="item.id"
              :style="{
                fontWeight: item.weight,
                fontSize: item.size + 'px',
                color: item.color,
                height: item.size + 'px',
              }"
              @click="clickTag(item.title)"
            >
              {{ item.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const number = ref(111)
const blogList = reactive([
  {
    id: 1,
    title: '123',
    introduction:
      '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑dsad大大大大adddd啊实打实大师大师d啊实打实大师dddddddddsad撒啊实打实大师大多asdasss',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 2,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 3,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 4,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 5,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 6,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 7,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 8,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 9,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 10,
    title: '123',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
  {
    id: 11,
    title: '11',
    introduction: '只要卡住这个17毫秒，每隔17毫秒进行操作，就能确保动画丝滑',
    author: 'xie',
    imgUrl: '@/assets/vue.svg',
    time: '2000-10-1',
    tag: ['abc', 'bda', 'dada'],
  },
])
const classList = reactive([
  {
    id: 1,
    imgUrl: '',
    title: 'Java',
    number: 11,
  },
  {
    id: 2,
    imgUrl: '',
    title: 'JavaScript',
    number: 11,
  },
  {
    id: 3,
    imgUrl: '',
    title: 'Python',
    number: 11,
  },
  {
    id: 4,
    imgUrl: '',
    title: 'c++',
    number: 11,
  },
  {
    id: 5,
    imgUrl: '',
    title: 'c++',
    number: 11,
  },
  {
    id: 6,
    imgUrl: '',
    title: 'c++',
    number: 11,
  },
  {
    id: 7,
    imgUrl: '',
    title: 'c++',
    number: 11,
  },
])
const clickTag = (item: string) => {
  selectblog('', item)
}
const clickClass = (item: string) => {
  selectblog(item, '')
}
function selectblog(classType?: string, label?: string) {
  console.log(classType)
  console.log(label)
}
const router = useRouter()
const goDetail = (id: number) => {
  router.push(`/detail?id=${id}`)
}
const tagList = reactive([
  {
    id: 0,
    title: 'css',
    number: 12,
  },
  {
    id: 1,
    title: 'css',
    number: 12,
  },
  {
    id: 2,
    title: 'js',
    number: 16,
  },
  {
    id: 3,
    title: 'ts',
    number: 4,
  },
  {
    id: 4,
    title: 'java',
    number: 5,
  },
  {
    id: 5,
    title: 'c',
    number: 15,
  },
  {
    id: 6,
    title: 'py',
    number: 25,
  },
  {
    id: 7,
    title: 'c++',
    number: 5,
  },
  {
    id: 4,
    title: 'java',
    number: 5,
  },
  {
    id: 4,
    title: 'java',
    number: 5,
  },
  {
    id: 4,
    title: 'java',
    number: 5,
  },
  {
    id: 4,
    title: 'java',
    number: 5,
  },
  {
    id: 4,
    title: 'java',
    number: 5,
  },
])
const styleTag = ref([
  {
    id: 0,
    title: '',
    number: 0,
    size: 0,
    weight: 0,
    color: '',
  },
])
let weight = 0
let size = 0
onMounted(() => {
  tagList.forEach((item) => {
    console.log(item)
    if (item.number < 5) {
      size = 10
      weight = 300
    } else if (item.number < 10) {
      size = 15
      weight = 400
    } else {
      size = 20
      weight = 600
    }
    styleTag.value.push({
      id: item.id,
      title: item.title,
      number: item.number,
      size: size,
      weight: weight,
      color:
        'rgb(' +
        parseInt(Math.random() * 255 + '') +
        ',' +
        parseInt(Math.random() * 255 + '') +
        ',' +
        parseInt(Math.random() * 255 + '') +
        ')',
    })
  })
  styleTag.value.shift()
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}

.blog-box {
  background-color: pink;
  height: calc(100vh - 60px);
  display: flex;
  justify-content: center;
  overflow: hidden;

  .blog-content {
    width: 50%;
    height: 100%;
    padding: 20px;
    border: 30px;
    background-color: #fff;
    border-radius: 10px;
    overflow: scroll;

    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      font-size: 20px;
    }

    .card-box {
      padding: 5px 5px;

      .card {
        width: 100%;
        height: 150px;
        border-bottom: 2px solid bisque;
        display: flex;

        .card-img {
          padding: 5px;
          width: 150px;
          height: 100%;

          img {
            width: 100%;
          }
        }

        .card-right {
          flex: 1;
          display: flex;
          flex-direction: column;

          .card-title {
            margin: 5px;
            font-size: 20px;
            font-weight: 700;
          }

          .card-introduction {
            margin: 5px;
            font-size: 15px;
            font-weight: 500;
            flex: 1;
            line-height: 1.5;
            text-indent: 2em;
          }

          .card-bottom {
            height: 20px;
            margin: 5px;
            display: flex;

            .user-img {
              width: 20px;
              height: 100%;
              border-radius: 50%;
              overflow: hidden;
              margin-right: 10px;

              img {
                width: 100%;
              }
            }

            .user {
              color: red;
              margin-right: 20px;
            }

            .time {
              line-height: 20px;
            }

            .tags {
              flex: 1;
              display: flex;
              justify-content: flex-end;

              .tag {
                margin: 0 5px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }

    .pagination {
      padding: 10px 0;
      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  .blog-right {
    flex-direction: column;
    width: 20%;
    padding: 0 20px;

    .blog-classification {
      background-color: #fff;
      border-radius: 10px;
      height: 300px;
      margin-bottom: 20px;
      padding: 5px;

      .class-title {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }

      .class-box {
        height: 250px;
        overflow: scroll;

        .class-item {
          display: flex;
          height: 50px;
          justify-content: space-between;
          align-items: center;
          padding: 5px;
          cursor: pointer;

          .class-img {
            height: 100%;
            width: 40px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
            }
          }
        }
      }
    }

    .blog-label {
      background-color: #fff;
      border-radius: 10px;
      height: 300px;
      margin-bottom: 20px;
      padding: 5px;
      .label-title {
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .container {
        height: calc(100% - 30px);
        .tag-box {
          width: 100%;
          height: 100%;
          .tag-item {
            margin: 5px;
            cursor: pointer;
            word-wrap: break-word;
          }
        }
      }
    }
  }
}
</style>
