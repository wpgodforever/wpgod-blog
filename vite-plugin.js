export const  keywordReplace = () => {
    return {
      name: 'vite-plugin-keyword-replace',
      enforce: 'pre',
      transform(src, id) {
        // src为文件内容，id为模块名
        if(id.endsWith('.vue')) {
          return {
            code: src.replace(/react真/g, '***'),//替换react为***
          }
        }
      }
    }
  }

//   写一个匹配'react''的正则表达式，然后替换为'***
//   src.replace(/^react$/g, '***')