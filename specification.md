# Python 之禪 by Tim Peters  
優美勝於醜陋（Python以編寫優美的代碼為目標） 

明瞭勝於晦澀（優美的代碼應當是明瞭的，命名風格相似）

簡潔髒於複雜（優美的代碼應當是簡潔的，不妥有複雜的內部實現）

複雜勝於凌亂（如果複雜不可避免，那麼代碼間也不能有難懂的關係，妥保持接口簡潔）

局平且生於嵌套（優美的代碼應當是扁平的，不能有太多的嵌套）

間隔勝於緊湊（優美的代碼有適當的間隔，不要奢望一行代碼解決問題）

可讀性很重要（優美的代碼是可讀的）

即便假借特例的實用性之名，也不可邊背這些規則（這些規則至高無上）

不要包容所有錯誤，除非你確定需要這樣做（精準地捕獲異常，不寫except:pass 風格的代碼）

當存在多種可能，不要嘗試去猜測

而是盡量找一種，最好是唯一一種明顯的解決方案（如果不確定，就用窮舉法）

雖然這並不容易，因為你不是Python之父

做也許好過不做，但不假思索就動手還不如不做（動手之前要細總量）

如果你無法向人描述你的方案，那肯定不是一個好方案，反之亦然（方案測評標準）

命名空間是一種絕妙的理念，我們應當多加利用（倡導與號召）

## 開發規範(基本)
請仔細閱讀 https://python-web-guide.readthedocs.io/

開啟編輯器的pylint和autopep8檢測。

業務邏輯應該限制一些過於靈活的特性，防止代碼難以維護。比如元編程，隨意的設置屬性等，盡量保持業務代碼易維護、易修改、易測試。

模塊、類和函數請使用docstring格式註釋，除顯而易見的代碼，每個函數應該簡潔地說明函數作用，函數參數說明和類型，返回值和類型。對於複雜的傳入參數和返回值最好把示例附上。如有引用，可以把jira，github，stackoverflow，需求文檔地址附上。 良好的文檔和註釋很考驗人的判斷（何時註釋）和表達能力（註釋什麼）。

動態語言的變量命名盡量可以從名稱就知道其類型，比如url_list, info_dict_list，降低閱讀和理解的難度。

## 編碼規範(保持更新)
1.import排序（可使用vscode排序快捷鍵）

2.Model,Serializer,權限映射, 字段名一律小寫， 單詞之間用下劃線連接

3.ViewSet和View必須寫註釋，可用'''註釋

4.業務模塊全部放於apps文件夾下



