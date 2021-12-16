/**
 * 遞歸使用 call 方式this指向
 * @param componentName // 需要找的組件的名稱
 * @param eventName // 事件名稱
 * @param params // 需要傳遞的參數
 */
function broadcast(componentName, eventName, params) {
    // 循環子節點找到名稱一樣的子節點 否則 遞歸 當前子節點
    this.$children.map(child=>{
        if (componentName===child.$options.name) {
            child.$emit.apply(child,[eventName].concat(params))
        }else {
            broadcast.apply(child,[componentName,eventName].concat(params))
        }
    })
}
export default {
    methods: {
        /**
         * 派發 (向上查找) (一個)
         * @param componentName // 需要找的組件的名稱
         * @param eventName // 事件名稱
         * @param params // 需要傳遞的參數
         */
        dispatch(componentName, eventName, params) {
            let parent = this.$parent || this.$root;//$parent 找到最近的父節點 $root 根節點
            let name = parent.$options.name; // 獲取當前組件實例的name
            // 如果當前有節點 && 當前沒名稱 且 當前名稱等於需要傳進來的名稱的時候就去查找當前的節點
            // 循環出當前名稱的一樣的組件實例
            while (parent && (!name||name!==componentName)) {
                parent = parent.$parent;
                if (parent) {
                    name = parent.$options.name;
                }
            }
            // 有節點表示當前找到了name一樣的實例
            if (parent) {
                parent.$emit.apply(parent,[eventName].concat(params))
            }
        },
        /**
         * 廣播 (向下查找) (廣播多個)
         * @param componentName // 需要找的組件的名稱
         * @param eventName // 事件名稱
         * @param params // 需要傳遞的參數
         */
        broadcast(componentName, eventName, params) {
            broadcast.call(this,componentName, eventName, params)
        }
    }
}
