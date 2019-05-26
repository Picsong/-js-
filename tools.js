
//生成随机数x到y,写一个值代表从0到这个值
function random(min, max = 0) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return parseInt(Math.random() * (max - min + 1) + min);
}

//从本地存储拿数据，参数是键名，返回结果是一个数组。
function getStorage(key) {
    let data = localStorage[key];
    if (data) {
        return JSON.parse(data);
    }
    return [];
}

//保存到本地存储，第一个参数是键名，第二个是保存的数据。
function saveStorage(key, value) {
    if (typeof value == 'object') {
        localStorage[key] = JSON.stringify(value);
    } else {
        localStorage[key] = value;
    }
}



//ajax发送请求并拿到返回的数据,success回调函数，
//用对象来传递参数，避免了参数的顺序影响，只要对应键找到，传的值就不会错误。
function ajaxResponseText({ type = 'get', url, async = true, data, success }) {
    let xhr = new XMLHttpRequest();
    xhr.open(type, url, async);
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let text = JSON.parse(xhr.responseText);
            success(text);
        }
    }
}

//自定义轮播图
function RotationChart({ width, height, Ttime = 0.4, Itime = 2000, pics, src = '../source/image/', node = document.body, foo = 'RollingWheel' }) {
    //1轮播盒子大小，-->相应的也就是图片的宽高，以及每一次滚动的距离，2设置过度动画完成的时间 3设置时间函数间隔时间 
    //4设置多少张图片的轮播再第53~57行是图片资源路径，最后一个参数是，用户想在哪一个盒子里实现轮播默认是body.6.foo是用户想要的轮播效果，有滚动型，和呼吸型and 3d型(宽高比设置为2.13：1)。默认为滚动146行
    //使用实例
    // RotationChart({ width: '345', height: '222', pics: 4, node: document.getElementsByClassName('tow')[0] });
    // RotationChart({ width: '345', height: '222', pics: 6, node: document.getElementsByClassName('one')[0], foo: 'BreathingWheel' });
    // RotationChart({ width: '710', height: '335', pics: 5, node: document.getElementsByClassName('cen')[0], foo: 'TDWheel' });
    //第一步创建html结构
    let wrap = document.createElement('div');
    let box = document.createElement('ul');
    let btns = document.createElement('ul');
    let right = document.createElement('span');
    right.className = 'arrow_R';
    right.innerText = '>'
    let left = document.createElement('span');
    left.className = 'arrow_L';
    left.innerText = '<'
    wrap.className = 'wrap';
    box.className = 'box';
    btns.className = 'btns'
    //将ui加入到wrap盒子中
    wrap.appendChild(box);
    if (foo != "TDWheel") {
        wrap.appendChild(btns);
        wrap.appendChild(left);
        wrap.appendChild(right);
    }
    //设置每个盒子内部内容
    var str1 = '', str2 = '';
    for (let i = 0; i < pics; i++) {
        str1 += `<li data-id=${i}><img src='${src}xp0${i + 1}.jpg'></li>`;
        str2 += `<li>${i + 1}</li>`
    }
    if (foo == "RollingWheel") {
        //滚动轮播的结构和样式
        let newstr = `<li><img src='${src}xp0${pics}.jpg'></li>` + str1 + `<li><img src='${src}xp0${1}.jpg'></li>`;
        box.innerHTML = newstr;
        Object.assign(box.style, {
            width: `${(pics + 2) * width}px`,
            height: '100%',
            transform: `translateX(-${width}px)`,
            overflow: 'hidden',
        })
        for (let i = 0; i < box.children.length; i++) {
            Object.assign(box.children[i].style, {
                float: 'left',
                width: `${width}px`,
                height: '100%',
            });
            Object.assign(box.children[i].firstChild.style, {
                width: '100%',
                height: '100%',
            })
        }
        wrap.style.overflow = 'hidden';
    } else if (foo == "BreathingWheel") {
        //呼吸轮播的html解构和样式
        box.innerHTML = str1;
        Object.assign(box.style, {
            width: `${width}px`,
            height: `${height}px`,
            overflow: 'hidden',
            position: 'relative',
            zIndex: '3',
        })
        for (let i = 0; i < box.children.length; i++) {
            Object.assign(box.children[i].style, {
                position: 'absolute',
                width: '100%',
                height: '100%',
                transition: 'all .6s',
                zIndex: '1',
                opacity: '0',
            });
            Object.assign(box.children[i].firstChild.style, {
                width: '100%',
                height: '100%',
            })
        }
        box.children[0].className = 'show';
    } else {
        box.innerHTML = str1;
        Object.assign(box.style, {
            width: `${width}px`,
            height: `${height}px`,
            position: 'relative',
            transformStyle: 'preserve-3d',
            perspective: '888px',
        })
        for (let i = 0; i < box.children.length; i++) {
            Object.assign(box.children[i].style, {
                position: 'absolute',
                width: `${width / 3}px`,
                height: `${width / 4.5}px`,
                left: '50%',
                top: '50%',
                marginLeft: `-${width / 3 / 2}px`,
                marginTop: `-${width / 4.5 / 2}px`,
                borderRadius: '8px',
                transition: 'all 0.5s ease-in-out',
                overflow: 'hidden',
                fontSize: 0,
            });
            Object.assign(box.children[i].firstChild.style, {
                width: '100%',
                height: '100%',
            })
        }
    }

    btns.innerHTML = str2;
    //这里是要在哪里，哪一个div中实现轮播图。兼容处理看用户传入的是要到body里，还是一个div中
    node.appendChild(wrap);

    btns.children[0].className = 'active';
    //第二步设置样式
    //wrap
    Object.assign(wrap.style, {
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        // border: '5px dashed #312465',
    })

    //如果是3d轮播则不需要左右按钮和小圆点
    if (foo != "TDWheel") {
        //btns
        Object.assign(btns.style, {
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '20px',
            width: `${pics * 28}px`,
            height: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 4,
        })
        for (let i = 0; i < btns.children.length; i++) {
            Object.assign(btns.children[i].style, {
                width: '20px',
                height: '100%',
                borderRadius: '50%',
                fontSize: '14px',
                textAlign: 'center',
                lineHeight: '20px',
                background: 'white',
                cursor: 'pointer',
                userSelect: 'none',
                opacity: .7,

            })
        }
        //左右按钮样式
        let spans = document.querySelectorAll('span');
        for (let i = 0; i < spans.length; i++) {
            Object.assign(spans[i].style, {
                zIndex: '10',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '30px',
                height: '60px',
                background: 'rgba(0, 0, 0, .5)',
                color: 'white',
                fontSize: '40px',
                lineHeight: '60px',
                textAlign: 'center',
                cursor: 'pointer',
                userSelect: 'none',
            })

        }
    }

    //兼容处理，判断当前html有无内联样式表
    if (document.getElementsByTagName('style')[0]) {
        document.getElementsByTagName('style')[0].innerHTML += ` 
        * {padding: 0;margin: 0;list-style: none;} html,body {background: #d5f59c;} .active {background: green !important;} 
        .arrow_L {left: 0;}.arrow_R {right: 0;} .wrap:hover>span{display:block} .wrap>span{display:none} 
        .wrap .box li.show{z-index: 3 !important;opacity: 1 !important;} .wrap .btns li:hover{background: #087 !important;opacity: 1 !important}`;
    } else {
        let style = document.createElement('style');
        style.innerHTML += `* {padding: 0;margin: 0;list-style: none;} html,body {background: #d5f59c;} 
        .active {background: green !important;} .arrow_L {left: 0;}.arrow_R {right: 0;} 
        .wrap .box li.show{z-index: 3 !important;opacity: 1 !important;} .wrap .btns li:hover{background: #087 !important;opacity: 1 !important}`;
        document.head.appendChild(style);
    }

    //滚动轮播方法
    function RollingWheel() {
        //图片移动
        function addTransform(index) {
            box.style.transform = `translateX(${-index * width}px)`;
        }
        //添加过渡时间
        function addTransition() {
            box.style.transition = `${Ttime}s`;
        }
        //删除过度时间
        function removeTransition() {
            box.style.transition = "none";
        }
        //小圆点颜色变换
        function setPoint(index) {
            let len = btns.children.length;
            for (let i = 0; i < len; i++) {
                btns.children[i].classList.remove("active");
            }
            btns.children[index - 1].classList.add("active");
        }
        let timer, num = 1, flag = true;
        // timer实现基本轮播效果
        timer = setInterval(() => {
            num++;
            addTransition();
            addTransform(num);
        }, Itime)

        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState == "hidden") {
                clearInterval(timer);
            } else {
                timer = setInterval(() => {
                    num++;
                    addTransform(num);
                    addTransition();
                }, Itime)
            }
        }, false);

        //小圆点点击事件
        Array.from(btns.children).forEach((item, index) => {
            item.addEventListener('click', () => {
                num = index + 1;
                addTransition();
                addTransform(num);
                setPoint(num);
            }, false)
        })
        // 实现循环无缝连接
        box.addEventListener("transitionend", () => {
            if (num >= pics + 1) {
                num = 1;
                removeTransition();
                addTransform(num);
            } else if (num <= 0) {
                num = pics;
                removeTransition();
                addTransform(num);
            }
            setPoint(num);
            flag = true;
        }, false)

        // 鼠标进入暂停
        wrap.addEventListener("mouseenter", () => {
            clearInterval(timer);
        }, false)

        wrap.addEventListener("mouseleave", () => {
            timer = setInterval(() => {
                num++;
                addTransform(num);
                addTransition();
            }, Itime)
        }, false)

        //左右箭头点击
        left.addEventListener("click", () => {
            if (flag) {
                flag = false;
                num--;
                addTransition();
                addTransform(num);
            }
        }, false)

        right.addEventListener("click", () => {
            if (flag) {
                flag = false;
                num++;
                addTransition();
                addTransform(num);
            }
        }, false)

    }

    //淡入淡出轮播方法
    function BreathingWheel() {
        let index = 0, timer;
        let nodes = box.children;
        let btn = btns.children;
        let len = nodes.length;
        play()
        //时间函数核心运动
        function play() {
            timer = setInterval(() => {
                index++;
                index %= pics;
                run(index);
            }, Itime)
        }
        //动态添加删除类名，实现淡入淡出效果
        function run(index) {
            for (let i = 0; i < len; i++) {
                nodes[i].className = '';
                btns.children[i].className = '';
            }
            nodes[index].className = 'show';
            btns.children[index].className = 'active';

        }
        //左右按钮点击事件
        left.addEventListener("click", () => {
            index--;
            if (index < 0) {
                index = pics - 1;
            }
            run(index)
        }, false)

        right.addEventListener("click", () => {
            index++;
            index %= pics;
            run(index)
        }, false)

        // 鼠标进入暂停
        wrap.addEventListener("mouseenter", () => {
            clearInterval(timer);
        }, false)

        wrap.addEventListener("mouseleave", () => {
            play();
        }, false)
        //小圆点点击事件
        for (let i = 0; i < len; i++) {
            btn[i].onclick = function () {
                index = i;
                run(index);
            }
        }
    }

    //3d横向滚动轮播方法
    function TDWheel() {
        let timer, index = 0;
        let hlen = Math.floor(pics / 2);
        let lis = box.children;
        let lnum = 0, rnum = 0;
        //第一步先展示出轮播所需要的样子
        show();
        function show() {
            for (let i = 0; i < hlen; i++) {
                lnum = index - 0 - i - 1;
                if (lnum == -1) {
                    lnum = 4;
                } else if (lnum == -2) {
                    lnum = 3;
                }
                lis[lnum].style.transform = `translateX(${-width / 6 * (i + 1)}px) translateZ(${width / 4.5 - i * width / 9}px) rotateY(30deg)`;

                rnum = index - 0 + i + 1;
                if (rnum > pics - 1) {
                    rnum -= pics;
                }
                lis[rnum].style.transform = `translateX(${width / 6 * (i + 1)}px) translateZ(${width / 4.5 - i * width / 9}px) rotateY(-30deg)`;
            }
            lis[index].style.transform = `translateZ(${width / 3}px)`;
            for (let i = 0; i < pics; i++) {
                lis[i].firstChild.className = '';
            }
            lis[index].firstChild.className = 'showing';
        }

        //第二步自动播放
        play()
        function play() {
            timer = setInterval(() => {
                if (index == 4) {
                    index = 0;
                } else {
                    index++;
                }
                show();
            }, Itime)
        }
        //第三步点击事件
        bindEvent();
        function bindEvent() {
            box.addEventListener('click', function (e) {
                if (e.target.nodeName == 'IMG' && !e.target.getAttribute('showing')) {
                    index = e.target.parentNode.dataset.id;
                    show();
                }
            })

        }
        // 鼠标进入暂停
        wrap.addEventListener("mouseenter", () => {
            clearInterval(timer);
        }, false)

        wrap.addEventListener("mouseleave", () => {
            play();
        }, false)

    }

    switch (foo) {
        case 'RollingWheel':
            RollingWheel();
            break;
        case 'BreathingWheel':
            BreathingWheel();
            break;
        case 'TDWheel':
            TDWheel();
            break;
    }
    //RotationChart函数结尾
}