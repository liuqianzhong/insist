(function (e) {
    "use strict";
    e.extend(e.fn.select2.defaults, {
        formatNoMatches: function () {
            return "没有找到匹配项"
        },
        formatInputTooShort: function (e, t) {
            var n = t - e.length;
            return "请再输入" + n + "个字符"
        },
        formatInputTooLong: function (e, t) {
            var n = e.length - t;
            return "请删掉" + n + "个字符"
        },
        formatSelectionTooBig: function (e) {
            return "你只能选择最多" + e + "项"
        },
        formatLoadMore: function (e) {
            return "加载结果中..."
        },
        formatSearching: function () {
            return "搜索中..."
        }
    })
})(jQuery);