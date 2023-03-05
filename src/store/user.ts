import { defineStore } from "pinia";
export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            userInfo:{
                username: '',
                auth: [],
                token: ''
            },
            
        }
    },
    actions:{

    },
    
  persist: {
    
        // 使用该插件，开启数据缓存
      enabled: true,
      strategies: [
        {
          //key的名称
          key: 'my_user',
          //这里存储默认使用的是session
          //更改默认存储，我更改为localStorage
          storage: localStorage,
          // 可以选择哪些进入local存储，这样就不用全部都进去存储了
          // 默认是全部进去存储
        //   paths: ['userInfo']
        }
      ]
    }
})