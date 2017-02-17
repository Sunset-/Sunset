;

import Vue from 'vue';

(function () {

    var Base = window.Base = {};

    //业务钩子
    Base.hooks = {};

    //业务基础类
    Base.transformNfsFilePath = function (id) {
        return '/upload/api/1.0.0/file/acquisition/' + id;
    };
    Base.transformDicomThumbnail = function (id) {
        return '/business-service/fileRes/dcmPicture?listId=' + id;
    };
    Base.transformCateyesUrl = function (id) {
        return '/cateyes/cateyes-phone.html?studyIds=' + id;
    };


    /**
     * 业务NFS文件路径转换
     */
    Vue.filter('dicom-thumbnail', function (value) {
        return Base.transformDicomThumbnail(value);
    });


})();