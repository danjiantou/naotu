/*
 * @Author: zhaowenb
 * @Date: 2022-07-27 12:01:07
 * @LastEditTime: 2022-07-28 10:23:34
 * @LastEditors: zhaowenb
 * @Description:  * 打包暴露
 */
define('expose-editor', function(require, exports, module) {
    return module.exports = kityminder.Editor = require('editor');
});