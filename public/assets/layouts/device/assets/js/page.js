loadPage = (d) => {
    d.e = ""; d.s = [];
    for (let i = 0, j = d.shells; i < j.length; i++) {
        d.e += shellFrame({
            i: i,
            f: (Math.random() + 1).toString(36).substring(7),
        });
        d.s.push(`assets/layouts/device/${j[i]}.html`);
    }
    window.parent.postMessage({
        id: window.frameElement.id,
        action: "load-shells",
        tag: "iframe",
        shell: d.e,
        src: d.s,
        scroll: d.scroll
    });
},
shellFrame = (d) => {
    return`
        <div id="shell-${d.i}">
            <div>
                <div>
                    <div class="lcd-effects-on"><div class="back-grid"></div></div>
                    <iframe id="iframe-${d.f}" frameborder="0"></iframe>
                </div>
            </div>
        </div>
        <br />`;
};