import $ from 'jquery';
window.$ = $;

var $body = $('body');
var audio = document.createElement('audio');

/**
 * 浏览器调用语音合成接口
 * @param {Object} param 百度语音合成接口参数
 * 请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
 * @param {Object} options 跨域调用api参数
 *           timeout {number} 超时时间 默认不设置为60秒
 *           volume {number} audio控件音量，范围 0-1
 *           hidden {boolean} 是否隐藏audio控件
 *           autoDestory {boolean} 播放音频完毕后是否自动删除控件
 *           onInit {Function} 创建完audio控件后调用
 *           onSuccess {Function} 远程语音合成完成，并且返回音频文件后调用
 *           onError {Function}  远程语音合成完成，并且返回错误字符串后调用
 *           onTimeout {Function} 超时后调用，默认超时时间为60秒
 */
function btts(param, options) {
    console.info('audio is null btts');
    // var url = '/mark/tokepp/baidutts';
    var url = '/mark/tokepp/baiduhec';
    // var url = 'http://tsn.baidu.com/text2audio';
    var opt = options || {};
    var p = param || {}; // 如果浏览器支持，可以设置autoplay，但是不能兼容所有浏览器


    if (opt.autoplay) {
        audio.setAttribute('autoplay', 'autoplay');
    } // 隐藏控制栏

    if (!opt.hidden) {
        audio.setAttribute('controls', 'controls');
    } else {
        audio.style.display = 'none';
    } // 设置音量

    if (typeof opt.volume !== 'undefined') {
        audio.volume = opt.volume;
    } // 调用onInit回调

    isFunction(opt.onInit) && opt.onInit(audio); // 默认超时时间60秒

    var DEFAULT_TIMEOUT = 60000;
    var timeout = opt.timeout || DEFAULT_TIMEOUT; // 创建XMLHttpRequest对象

    var search = new URLSearchParams(p).toString();
    search = decodeURIComponent(search);
    var xhr = new XMLHttpRequest();
    url = url + '?' + search;
    xhr.open('GET', url); // 创建form参数

    var data = {};

    for (var p in param) {
        data[p] = param[p];
    } // 赋值预定义参数

    data.cuid = data.cuid || data.tok;
    data.ctp = 1;
    data.lan = data.lan || 'zh'; // 序列化参数列表

    var fd = [];

    for (var k in data) {
        fd.push(k + '=' + encodeURIComponent(data[k]));
    } // 用来处理blob数据

    var frd = new FileReader();
    xhr.responseType = 'blob';
    xhr.send(fd.join('&')); // 用timeout可以更兼容的处理兼容超时
    console.info('ajax');
    var timer = setTimeout(function () {
        xhr.abort();
        isFunction(opt.onTimeout) && opt.onTimeout();
    }, timeout);

    xhr.onreadystatechange = function () {
        console.info('onreadystatechange');
        if (xhr.readyState == 4) {
            console.info('onreadystatechange 4');
            clearTimeout(timer);

            if (xhr.status == 200) {
                console.info('onreadystatechange 4 200');
                /*  */
                console.info(JSON.stringify(xhr.response.type, null, 2));

                if (xhr.response.type === 'application/octet-stream') {

                    var blob = xhr.response;
                    console.log(URL.createObjectURL(blob)); // 在body元素下apppend音频控件
                    $body.append(audio);
                    audio.setAttribute('src', URL.createObjectURL(blob)); // autoDestory设置则播放完后移除audio的dom对象

                    if (opt.autoDestory) {
                        audio.onended = function () {
                            $(audio).remove();
                        };
                    }

                    isFunction(opt.onSuccess) && opt.onSuccess(audio);

                }

                if (xhr.response.type === 'application/json') {
                    console.info('application/json');
                    frd.onload = function () {
                        var text = frd.result;
                        try {
                            var res = JSON.parse(text);
                            var blob = new Blob([JSON.stringify(res.ja)], {
                                type: 'audio/mp3'
                            });
                            console.log(URL.createObjectURL(blob)); // 在body元素下apppend音频控件
                            $body.append(audio);
                            audio.setAttribute('src', URL.createObjectURL(blob)); // autoDestory设置则播放完后移除audio的dom对象

                            if (opt.autoDestory) {
                                audio.onended = function () {
                                    $(audio).remove();
                                };
                            }

                            isFunction(opt.onSuccess) && opt.onSuccess(audio);
                        } catch (error) {
                            console.warn(error);
                        }

                        isFunction(opt.onError) && opt.onError(text);
                    };

                    frd.readAsText(xhr.response);
                } else if (xhr.response.type === 'audio/mp3') {
                    console.info('audio/mp3');
                    // 在body元素下apppend音频控件
                    audio.setAttribute('src', URL.createObjectURL(xhr.response)); // autoDestory设置则播放完后移除audio的dom对象
                    $body.append(audio);
                    console.info('audio/mp3 append');

                    if (opt.autoDestory) {
                        audio.onended = function () {
                            $(audio).remove();
                        };
                    }

                    isFunction(opt.onSuccess) && opt.onSuccess(audio);
                } // 用来处理错误
                // if (xhr.response.type === 'application/json') {
                // 	frd.onload = function () {
                // 		var text = frd.result;
                // 		isFunction(opt.onError) && opt.onError(text);
                // 	};
                // 	frd.readAsText(xhr.response);
                // }
            }
        }
    }; // 判断是否是函数

    function isFunction(obj) {
        if (Object.prototype.toString.call(obj) === '[object Function]') {
            return true;
        }

        return false;
    }
} // 初始化变量

var playBtn = null; // dom加载完毕回调后注册按钮对象

ready(function () {
    playBtn = document.getElementById('playBtn');
}); // 合成按钮

function tts(contentText) {
    audio.contentText = contentText;
    console.info('audio is null tts');
    console.error(contentText);
    return new Promise(function (resolve, reject) {
        btts({
            text: contentText,
            tok: '25.f849e6bb6d2a6ba0e5981656660a8d92.315360000.1872832905.282335-16220384',
            type: 'tns',
            spd: 3,
            pit: 3,
            vol: 5,
            per: 1
            /* 
		  spd: 5
		  pit: 5
		  vol: 5
		  per: 1
		  */
        }, {
            volume: 0.3,
            autoDestory: true,
            timeout: 10000,
            hidden: false,
            onInit: function onInit(htmlAudioElement) {},
            onSuccess: function onSuccess(audio) {
                console.info('get audio Success');
                resolve(audio); // playBtn.innerText = '播放';
            },
            onError: function onError(text) {
                reject(text);
            },
            onTimeout: function onTimeout() {
                reject('timeout');
            }
        });
    }); // playBtn.innerText = '准备中';
    // 调用语音合成接口
    // 参数含义请参考 https://ai.baidu.com/docs#/TTS-API/41ac79a6
} // 暂停按钮

function pause() {
    if (audio) {
        audio.pause();
    }
} // 取消按钮

function cancel() {
    if (audio) {
        audio.pause();
        $(audio).remove();
        // audio = null; // playBtn.innerText = '准备中';
    }
} // dom加载完毕回调

function ready(callback) {
    var doc = document;

    if (doc.addEventListener) {
        doc.addEventListener(
            'DOMContentLoaded',
            function () {
                callback();
            }, false);
    } else if (doc.attachEvent) {
        doc.attachEvent('onreadystatechange', function () {
            if (doc.readyState === 'complete') {
                callback();
            }
        });
    }
}



export default {
    name: 'Tokepp',
    props: {
        content: {
            require: true
        },
        options: {
            type: Object
        }
    },
    mounted: function mounted() {
        if (this.options && this.options.count && this.options.count > 1) {
            this.iterationCount = this.options.count;
        }

        if (this.options && this.options.muted) {
            this.muted = true;
        }
    },
    data: function data() {
        return {
            muted: false,
            mutedText: '静音',
            src: '',
            iterationCount: 1,
            playBtnText: '准备中',
            audio: null
        };
    },
    computed: {
        mutedState: function mutedState() {
            return this.options.muted;
        }
    },
    methods: {
        tts: tts,
        cancel: cancel,
        pause: pause,
        // 播放按钮
        _play: function _play() {
            console.info('_play');
            var count = 1;
            // new Audio('/statics/gtzy/modules/nav/b.mp3').play();
            console.log('_play count', count);
            var _this = this;

            function onended() {
                console.info('onended');
                if (count >= _this.iterationCount) {
                    count = 1;

                    _this.$emit('playend', audio);
                } else {
                    console.log(count++);
                    console.log('canplay', count);
                    var audioPromise = audio.play();
                    if (audioPromise) {
                        audioPromise.then(function (res) {
                                console.info('audioPlay res');
                                console.info(res);
                            })
                            .catch(function (error) {
                                console.info('audioPlay error');
                                console.warn(error);
                                _this.$emit('playend', audio);
                            });
                    }
                }
            }

            function audioPlay(audio, options, onended) {

                for (var key in options) {
                    if (options.hasOwnProperty(key)) {
                        audio[key] = options[key];
                    }
                }

                audio.onended = onended;
                audio.addEventListener('loadstart', function () {
                    console.log('loadstart');
                }, false);
                audio.addEventListener('loadeddata', function () {
                    console.log('loadeddata');
                }, false);
                audio.addEventListener('loadedmetadata', function () {
                    console.log('loadedmetadata');
                }, false);
                audio.addEventListener('canplay', function () {
                    console.log('canplay');
                }, false);
                audio.addEventListener('play', function () {
                    console.log('play');
                    // 当 audio 能够播放后, 移除这个事件
                }, false);
                audio.addEventListener('playing', function () {
                    console.log('playing');
                }, false);
                audio.addEventListener('pause', function () {
                    console.log('pause');
                }, false);
                console.info('audioPlay');
                var audioPromise = audio.play();
                if (audioPromise) {
                    console.log('audioPromise');
                    audioPromise.then(function (res) {
                            console.info('audioPlay res');
                            console.info(res);
                        })
                        .catch(function (error) {
                            console.info('audioPlay error');
                            console.warn(error);
                            _this.$emit('playend', audio);
                        });
                }
            }

            (!audio || audio.contentText !== _this.content ? _this.tts(_this.content) : Promise.resolve(audio)).then(function (audio) {
                audioPlay(
                    audio, {
                        muted: _this.mutedState
                    },
                    onended
                );
            });
        },
        play: function play() {
            this._play();
        },
        playmp3: function playmp3() {
            new Audio('/statics/gtzy/modules/nav/b.mp3').play();
        },
        toggleMuted: function toggleMuted() {
            this.muted = !this.muted;
            audio.muted = this.muted;
            this.mutedText = this.muted ? '取消静音' : '静音';
        }
    },
    watch: {
        content: function content(value) {
            var _this = this;
            cancel();
            console.error('cancel content change');
            _this._play();
        }
    }
}