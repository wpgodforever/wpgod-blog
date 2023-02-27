import { defineStore } from "pinia";
export const useIndexStore = defineStore({
    id: 'index',
    state: () => {
        return {
            list:{
                num:1
            },
        }
    },

    actions:{

    }
})