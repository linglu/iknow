/*
 * 封装网络接口，可以取消请求，设置超时时间
 * */

import {DeviceEventEmitter} from 'react-native';
// import {NetInfo} from 'react-native-netinfo';

class Network {

    constructor() {
        this.xhrs = [];
        // this.isConnected = NetInfo.isConnected;
        // //监听网络状态
        // NetInfo.getConnectionInfo().done((connectionInfo) => {
        //     NetInfo.isConnected.addEventListener('connectionChange', (isConnected) => {
        //         this.isConnected = isConnected;

        //         if(!this.isConnected) {
        //             DeviceEventEmitter.emit('NetworkBroken');
        //         }
        //     })
        // });
    }

    /*自定义fetch, 有timeout和cancel功能。
     */
    fetch = (url, param) => {

        // const isConnected = this.checkNetworkState();

        return new Promise(fetchPromise.bind(this));

        function fetchPromise(resolve, reject) {

            //无网络
            // if (!isConnected){
            //     var body = '{"code":"408","desc":"网络异常，请检查网络！"}';
            //     const res = new Response(body);
            //     resolve(res);
            //     return;
            // }

            var request;
            if (Request.prototype.isPrototypeOf(url) && !param) {
                request = url;
            } else {
                request = new Request(url, param);
            }

            var xhr = new XMLHttpRequest();

            this.xhrs.push(xhr);

            if (param && param.timeout) {
                xhr.timeout = param.timeout;
            } else {
                xhr.timeout = 30000;
            }

            xhr.onload = function () {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: headers(xhr)
                }
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
                var body = 'response' in xhr ? xhr.response : xhr.responseText

                if(isJSON(body)) {
                    const bodyObj = JSON.parse(body);
                    if(bodyObj.code === '403') {

                        DeviceEventEmitter.emit('logOut',{msg:'logOut'});
                    } else if (bodyObj.code == '400' || bodyObj.code == '405' || bodyObj.code == '404'
                        || bodyObj.code == '430' || bodyObj.code == '433' || bodyObj.code == '443'
                        || bodyObj.code == '500'){
                        var body = '{"code":"500","desc":"服务器闹脾气，请稍后再试！"}';
                        const res = new Response(body);
                        resolve(res);
                        return;
                    }
                }

                resolve(new Response(body, options))
            }

            xhr.ontimeout = function () {
                remove(xhr, this);

                // if(isConnected) {
                //     var body = '{"code":"500","desc":"服务器闹脾气，请稍后再试！"}';
                //     const res = new Response(body);
                //     resolve(res);
                //     return;
                // }

                var body = '{"code":"408","desc":"网络异常，请检查网络！"}';
                const res = new Response(body);
                resolve(res);
            }.bind(this);


            xhr.onerror = function (e) {
                remove(xhr, this);

                var body = '{"code":"408","desc":"网络异常，请检查网络！"}';
                const res = new Response(body);
                resolve(res);

            }.bind(this);

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                xhr.withCredentials = true;
            }


            if ('responseType' in xhr && typeof Request.prototype.blob === 'function') {
                xhr.responseType = 'blob';
            }

            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value);
            })

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);


            //获得某个request的header
            function headers(xhr) {
                var head = new Headers();
                var pairs = xhr.getAllResponseHeaders().trim().split('\n');
                pairs.forEach(function (header) {
                    var split = header.trim().split(':');
                    var key = split.shift().trim();
                    var value = split.join(':').trim();
                    head.append(key, value);
                })
                return head;
            }

            //从队列中移除某个request
            function remove(xhr, target) {
                var i = target.xhrs.indexOf(xhr)
                if (i !== -1) {
                    target.xhrs.splice(i, 1)
                }
            };

            function isJSON(str) {
                if (typeof str == 'string') {
                    try {
                        var obj=JSON.parse(str);
                        if(typeof obj == 'object' && obj ){
                            return true;
                        }else{
                            return false;
                        }

                    } catch(e) {
                        console.log('error：'+str+'!!!'+e);
                        return false;
                    }
                }
            }

        }
    }


    uploadImage = async (url, uri, name) => {

        let formData = new FormData();
        let file = {uri: uri, type: 'multipart/form-data', name: name};

        formData.append("images", file);

        try {
            let response = await  this.fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            return response;
        }
        catch (err) {
            throw new Error('upload image error: ' + err);
        }

    }


    //根据url取消某个request
    cancelByUrl = (url) => {
        for (var i = this.xhrs.length - 1; i > -1; i--) {
            var xhr = this.xhrs[i];
            if (xhr._url === url) {
                this.xhrs.splice(i, 1);
                xhr.abort();
            }
        }
    }

    checkNetworkState = () => {
        return this.isConnected;
    }

}

const network = new Network();
export {network}
