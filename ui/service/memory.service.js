/**
 * @Author: zhaowenb
 * @Date: 2022-07-27 12:01:07
 * @LastEditTime: 2022-08-02 12:06:26
 * @LastEditors: zhaowenb
 * @Description:  UI 状态的 LocalStorage 的存取文件，未来可能在离线编辑的时候升级
 **/
angular.module('kityminderEditor')
    .service('memory', function() {
        function isQuotaExceeded(e) {
            var quotaExceeded = false;
            if (e) {
                if (e.code) {
                    switch (e.code) {
                        case 22:
                            quotaExceeded = true;
                            break;
                        case 1014:
                            // Firefox
                            if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                                quotaExceeded = true;
                            }
                            break;
                    }
                } else if (e.number === -2147024882) {
                    // Internet Explorer 8
                    quotaExceeded = true;
                }
            }
            return quotaExceeded;
        }

        return {
            get: function(key) {
                var value = window.localStorage.getItem(key);
                return null || JSON.parse(value);
            },

            set: function(key, value) {
                try {
                    window.localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch(e) {
                    if (isQuotaExceeded(e)) {
                        return false;
                    }
                }
            },
            remove: function(key) {
                var value = window.localStorage.getItem(key);
                window.localStorage.removeItem(key);
                return value;
            },
            clear: function() {
                window.localStorage.clear();
            }
    }
});