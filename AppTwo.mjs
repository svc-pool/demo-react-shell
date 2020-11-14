/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function createSvcDef(point, defOrFactory) {
    if (typeof defOrFactory === 'function') {
        return {
            point,
            desc: undefined,
            deps: {},
            factory: defOrFactory,
        };
    }
    const { deps, desc } = defOrFactory, other = __rest(defOrFactory
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    , ["deps", "desc"]);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let theDeps = {};
    if (Array.isArray(deps)) {
        theDeps = deps.reduce((prev, cur) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return Object.assign(Object.assign({}, prev), { [cur]: true });
        }, theDeps);
    }
    else {
        theDeps = Object.assign({}, deps);
    }
    return Object.assign(Object.assign({}, other), { point,
        desc, deps: theDeps });
}

const svcDef = createSvcDef("app", {
    deps: {
        header: false,
    },
    factory: function ({ header }) {
        const H = header === null || header === void 0 ? void 0 : header[0];
        return function AppTow() {
            return React.createElement("div", null,
                "Current header is ",
                H ? React.createElement(H, null) : null);
        };
    },
});

export default svcDef;
//# sourceMappingURL=AppTwo.mjs.map
