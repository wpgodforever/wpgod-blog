import { defineStore } from "pinia";
import {
    articleListFn,
    articleListTitleFn
} from '@/api/article/index'
export const useListStore = defineStore({
    id: 'articleList',
    state: () => {
        return {
            articleInfo: {
                pageSize: 10,
                pageNo: 1,
                tags: [],
                title:''
            },
            total: 0,
            hasMore: false,
            // 左侧文章列表
            list: [],
            // 右侧标签列表
            tagList: [],
            tagsNum: 0,
            articleLoading: false,
            seletctOptions:[],
            selectLoading:false,
        }
    },
    getters: {

    },
    actions: {
        getArticleList(index: number) {
            this.articleLoading = true
            articleListFn(this.articleInfo).then(res => {
                const { data } = res
                if (index === 0) {
                    this.list = []
                }
                const list = [...this.list, ...data.list]
                // 将置顶文章筛选出来
                const topList = list.filter(v => v.isTop === 1)
                const bottomList = list.filter(v => v.isTop !== 1)
                this.list = [...topList, ...bottomList]
                this.tagsNum = data.tagsNum
                this.tagList = ['全部', ...data.tags] || []
                this.total = data.total
                const listTotalCount = data.listTotalCount
                this.articleLoading = false
                if (listTotalCount <= this.articleInfo.pageSize * this.articleInfo.pageNo) {
                    this.hasMore = false
                } else {
                    this.hasMore = true
                }
            })
        },
        getArticleListTitle(title){
            articleListTitleFn({title}).then(res => {
                this.seletctOptions = res.data.list
                this.selectLoading = false
            })
        }
    },
})