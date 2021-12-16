# vue-admin-template

> 這是一個極簡的 vue admin 管理後台。它只包含了 Element UI & axios & iconfont & permission control & lint，這些搭建後台必要的東西。

[線上地址](http://panjiachen.github.io/vue-admin-template)

[國內訪問](https://panjiachen.gitee.io/vue-admin-template)

目前版本為 `v4.0+` 基於 `vue-cli` 進行構建，若你想使用舊版本，可以切換分支到[tag/3.11.0](https://github.com/PanJiaChen/vue-admin-template/tree/tag/3.11.0)，它不依賴 `vue-cli`。

## Extra

如果你想要根據用戶角色來動態生成側邊欄和 router，你可以使用該分支[permission-control](https://github.com/PanJiaChen/vue-admin-template/tree/permission-control)

## 相關項目

- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)

- [electron-vue-admin](https://github.com/PanJiaChen/electron-vue-admin)

- [vue-typescript-admin-template](https://github.com/Armour/vue-typescript-admin-template)

- [awesome-project](https://github.com/PanJiaChen/vue-element-admin/issues/2312)

寫了一個系列的教程配套文章，如何從零構建後一個完整的後台項目:

- [手摸手，帶你用 vue 擼後台 系列一(基礎篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，帶你用 vue 擼後台 系列二(登錄權限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，帶你用 vue 擼後台 系列三 (實戰篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，帶你用 vue 擼後台 系列四(vueAdmin 一個極簡的後台基礎模板,專門針對本項目的文章,算作是一篇文檔)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，帶你封裝一個 vue component](https://segmentfault.com/a/1190000009090836)

## Build Setup

```bash
# 克隆項目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 進入項目目錄
cd vue-admin-template

# 安裝依賴
npm install

# 建議不要直接使用 cnpm 安裝以來，會有各種詭異的 bug。可以通過如下操作解決 npm 下載速度慢的問題
npm install --registry=https://registry.npm.taobao.org

# 啟動服務
npm run dev
```

瀏覽器訪問 [http://localhost:9528](http://localhost:9528)

## 發佈

```bash
# 構建測試環境
npm run build:stage

# 構建生產環境
npm run build:prod
```

## 其它

```bash
# 預覽發佈環境效果
npm run preview

# 預覽發佈環境效果 + 靜態資源分析
npm run preview -- --report

# 代碼格式檢查
npm run lint

# 代碼格式檢查並自動修復
npm run lint -- --fix
```

更多信息請參考 [使用文檔](https://panjiachen.github.io/vue-element-admin-site/zh/)

## Demo

![demo](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/demo.gif)

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## License

[MIT](https://github.com/PanJiaChen/vue-admin-template/blob/master/LICENSE) license.

Copyright (c) 2017-present PanJiaChen
