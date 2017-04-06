;
import Vue from 'vue';

var Base = window.Base = {};

//业务钩子
Base.hooks = {};

//系统基础类
Base.transcode = function (type, value) {
    return Base.ENUM_MAP && Base.ENUM_MAP[type] && Base.ENUM_MAP[type][value] || value;
}
Base.dictionary = function (type) {
    return Base.ENUMS && Base.ENUMS[type] || [];
}

//业务基础类
Base.transformNfsFilePath = function (id) {
    return '/upload/api/1.0.0/file/acquisition/' + id;
};
Base.transformDicomThumbnail = function (id) {
    return '/business-service/fileRes/dcmPicture?listId=' + id;
};
Base.transformCateyesUrl = function (id) {
    return '/cateyes/cateyes.html?studyIds=' + id;
};
Base.openCateyes = function (id, isLocalImage, hidePatientInfo) {
    return window.open(`/cateyes/cateyes.html?studyIds=${id}&which=${isLocalImage?'local_service':'service'}&show=${hidePatientInfo?'false':'true'}`);
}
const DEFAULT_IMAGE = {
    DEFAULT: '/assets/img/icon-img.png',
    TEAM: '/assets/img/team-error.png',
    DOCTOR: '/assets/img/default.png',
    USER: '/assets/img/user-default.png'
}
Base.defaultImage = function (type) {
    return DEFAULT_IMAGE[type] || DEFAULT_IMAGE.DEFAULT;
}


/**
 * 业务DICOM缩略图路径转换
 */
Vue.filter('dicom-thumbnail', function (value) {
    return Base.transformDicomThumbnail(value);
});

/**
 * 业务NFS文件路径转换
 */
Vue.filter('upload-image', function (value) {
    return Base.transformNfsFilePath(value);
});

/**
 * 报告副标题
 */
Vue.filter('DeviceSubTitle', function (type) {
    if (type == 'CT') {
        return 'CT检查报告单';
    } else if (type == 'MR') {
        return '核磁检查报告单';
    } else {
        return '放射检查报告单';
    }
});

module.exports = Base;