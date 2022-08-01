/*
 * @Author: zhaowenb
 * @Date: 2022-07-27 12:01:07
 * @LastEditTime: 2022-07-27 14:59:48
 * @LastEditors: zhaowenb
 * @Description: 
 */
angular.module('kityminderEditor')
    .service('server', ['config', '$http',  function(config, $http) {

        return {
            uploadImage: function(file) {
                var url = config.get('imageUpload');
                var fd = new FormData();
                fd.append('upload_file', file);

                return $http.post(url, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
            }
        }
    }]);