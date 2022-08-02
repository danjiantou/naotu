/*
 * @Author: zhaowenb
 * @Date: 2022-07-27 12:01:07
 * @LastEditTime: 2022-08-02 12:05:19
 * @LastEditors: zhaowenb
 * @Description: 
 */
/**
 * @fileOverview
 *
 * 初始化编辑器的容器
 *
 * @author: zhaowenb

 */
define(function(require, exports, module) {

    /**
     * 最先执行的 Runtime，初始化编辑器容器
     */
    function ContainerRuntime() {
        var container;

	    if (typeof(this.selector) == 'string') {
		    container = document.querySelector(this.selector);
	    } else {
		    container = this.selector;
	    }

        if (!container) throw new Error('Invalid selector: ' + this.selector);

        // 这个类名用于给编辑器添加样式
        container.classList.add('km-editor');

        // 暴露容器给其他运行时使用
        this.container = container;
    }

    return module.exports = ContainerRuntime;
});