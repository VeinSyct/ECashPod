let onMessage = (e) => {
    if (e.data && e.data.action && e.data.action.match(/(load-shells)/)) {
        document.querySelector(".snap-container").innerHTML = e.data.shell;
        loadSrc({ src: _uz.src = e.data.src, i: _uz.s = e.data.scroll });
        delete _uz.scrolling;
        onWindowResize({});
    }
    if (e.data && e.data.action && e.data.action.match(/(restore-shells)/)) {
        document.querySelector(".snap-container").innerHTML = _uz.restore.shells;
        _uz.s = _uz.restore.scroll;
        onWindowResize({});
        _uz.chB.style.display = "block";
        for (let k in _uz.e) if (_uz.e[k] && _uz.e[k].className) _uz.e[k].style.display = "block";
    }
},
loadSrc = (d) => {
    d.e = document.getElementById(`shell-${d.i}`).getElementsByTagName("div")[0].getElementsByTagName("div")[0].getElementsByTagName("iframe")[0];
    if (d.e && d.e.src == "") d.e.src = d.src[d.i];
},
onScrolling = (e) => {
    clearTimeout(e.target.scrollTimeout);
    e.target.scrollTimeout = setTimeout(() => {
        e.o = document.body.clientWidth > document.body.clientHeight && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        _uz.d = e.target["scroll" + (e.o ? "Left" : "Top")] / (parseInt(window.getComputedStyle(document.body)[e.o ? "width" : "height"]) - 3);
        _uz.m = parseInt(_uz.d);
        e.d = document.getElementById("shell-" + _uz.m).getElementsByTagName("iframe")[0];
        if (e.d) {
            if (_uz.d.toFixed(2).includes(".") && !_uz.scrolling) {
                _uz.scrolling = !0;
                for (let i = 0; i < _uz.q.length; i++) {
                    e.d = document
                    .getElementById("shell-" + _uz.q[i])
                    .getElementsByTagName("iframe")[0]
                    .contentWindow.postMessage({ action: "snap-scrolling" });
                }
                for (let i = 0; i < 2; i++) 
                    loadSrc({ src: _uz.src, i: _uz.d > _uz.s ? _uz.s + i : _uz.s + i - 1 });
            } else if (_uz.s != _uz.m) {
                _uz.s = _uz.m;
                _uz.q = _uz.q ? _uz.q : [];
                if (!_uz.q.includes(_uz.s)) _uz.q.push(_uz.s);
                e.d.contentWindow.postMessage({ action: "update-content" });
                delete _uz.scrolling;
            }
        }
    }, 10);
},
onWindowResize = (d) => {
    d.o = document.getElementsByTagName("iframe");
    if (d.o.length < 3) {
        document.querySelector(".snap-container").style.overflow = "hidden";
    } else document.querySelector(".snap-container").style.overflow = "auto";
    d.o = document.getElementsByTagName("iframe")[_uz.s];
    if (d.o) d.o.scrollIntoView();
},
_uz = { s: 0, buttons: [], offline: !0 };
window.parent.postMessage({ isLive: !0 }, "*");
_uz.e = document.getElementsByClassName("calc-buttons-cont");
for (let k in _uz.e) {
    if (_uz.e[k] && _uz.e[k].className && !_uz.buttons.includes(_uz.e[k].className)) {
        _uz.buttons.push(_uz.e[k].className);
        _uz.e[k].addEventListener("click", (e) => {
            _uz.chB = e.target;
            if (_uz.e[k].className.match(/(openquery|faqs)/)) {
                _uz.c = document.querySelector(".snap-container");
                if (_uz.c) {
                    _uz.restore = {
                        shells: _uz.c.innerHTML,
                        scroll: _uz.s
                    }
                    _uz.s = 0;
                    _uz.c.innerHTML = `
                        <div id="shell-0">
                            <div>
                                <div>
                                    <div class="lcd-effects-on"><div class="back-grid"></div></div>
                                    <iframe id="iframe-chat" frameborder="0" src="assets/layouts/device/${_uz.e[k].className.match(/(openquery)/) ? "chat" : "faqs"}.html"></iframe>
                                </div>
                            </div>
                        </div>
                        <br />`;
                    onWindowResize({});
                    for (let k in _uz.e) if (_uz.e[k] && _uz.e[k].className) _uz.e[k].style.display = "none";
                }
            }
            if (_uz.e[k].className.match(/(fullscreen)/)) {
                _uz.e[k].getElementsByTagName("div")[0].innerHTML = _uz.full ? "⇱" : "⇲";
                window.parent.postMessage({ action: "fullscreen", full: !(_uz.full = !_uz.full) }, "*");
            }
        });
    };
};
window.addEventListener("resize", () => {
    onWindowResize({});
});
window.addEventListener("message", onMessage);
onWindowResize({});
document.querySelector(".snap-container").addEventListener("scroll", onScrolling);
if (navigator.onLine && _uz.offline && "serviceWorker" in navigator)
    navigator.serviceWorker
        .register("index.js")
        .then((registration) => {})
        .catch((err) => {});