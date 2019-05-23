
function request (obj) {
    let url = obj.url || '';
    url = 'https://www.zhengzhicheng.cn' + url;
    let method = obj.methos || 'get';
    let data = obj.data || {};
    return new Promise((resolve,reject) => {
        mpvue.request({
            url,
            method,
            data,
            success: (res) => {
                resolve(res.data);
            }
        });
    });
}

export default request;