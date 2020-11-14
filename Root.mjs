let DefList = ({ onChange, defaultValue }) => {
    const ref = React.useRef(null);
    const handleChange = React.useCallback(function handleChange() {
        var _a, _b, _c, _d;
        try {
            let services = (_d = (_c = (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.replace(/\n\r?/g, ",")) === null || _c === void 0 ? void 0 : _c.split(",")) !== null && _d !== void 0 ? _d : [];
            services = services.filter((s) => !!s.trim());
            console.log(services);
            onChange === null || onChange === void 0 ? void 0 : onChange(services);
        }
        catch (error) {
            console.error("parse failed");
            onChange === null || onChange === void 0 ? void 0 : onChange([]);
        }
    }, [onChange]);
    return (React.createElement(React.Fragment, null,
        React.createElement("h3", { className: "h-def" }, "List of definitions"),
        React.createElement("textarea", { className: "def-list", ref: ref, defaultValue: defaultValue, onChange: handleChange })));
};

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

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

function __awaiter$1(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function isAMD() {
    const global = globalThis;
    const _require = global.requirejs || global.require;
    return (typeof _require === 'function' &&
        typeof global.define === 'function' &&
        !!global.define.amd);
}
function isES() {
    return 'noModule' in globalThis.HTMLScriptElement.prototype;
}

function _createAMDImport() {
    const _globalThis = globalThis;
    const _require = _globalThis.requirejs || _globalThis.require;
    const _import = (path) => new Promise((resolve, reject) => _require([path], resolve, reject));
    return _import;
}
function _createESImport() {
    const _import = (path) => import(path).then((m) => m.default);
    return _import;
}
function createDynamicImport() {
    if (isES()) {
        return _createESImport();
    }
    if (isAMD()) {
        return _createAMDImport();
    }
    throw 'Not in ES or AMD environment';
}
function createLoader(dynamicImport) {
    const _dynamicImport = dynamicImport || createDynamicImport();
    const loadPath = (pluginPath) => __awaiter$1(this, void 0, void 0, function* () {
        let defOrDefs = yield _dynamicImport(pluginPath);
        if (!Array.isArray(defOrDefs)) {
            defOrDefs = [defOrDefs];
        }
        return defOrDefs;
    });
    const loadPaths = (pluginPaths) => Promise.all(pluginPaths.map(loadPath)).then((defss) => defss.flat());
    function loadSvcDefs(pathOrPaths) {
        return __awaiter$1(this, void 0, void 0, function* () {
            let paths;
            if (Array.isArray(pathOrPaths)) {
                paths = [...pathOrPaths];
            }
            else {
                paths = [pathOrPaths];
            }
            return yield loadPaths(paths);
        });
    }
    return {
        loadSvcDefs,
    };
}

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

function __awaiter$2(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class BaseException extends Error {
}
class CircularDependency extends BaseException {
    constructor(name) {
        super(`cannot resolve circular dependencies: ${name}`);
    }
}
class NotRegistered extends BaseException {
    constructor(name) {
        super(`Point requested was not registered yet: ${name}`);
    }
}

function createTable(defs) {
    const r = {};
    function appendOrCreate(t, def) {
        const next = Object.assign({}, t);
        const exist = next[def.point];
        if (exist) {
            next[def.point] = [...exist, Object.assign({}, def)];
        }
        else {
            next[def.point] = [Object.assign({}, def)];
        }
        return next;
    }
    return defs.reduce((acc, cur) => appendOrCreate(acc, cur), r);
}
function createSvcPool(resolved) {
    const r = Object.assign({}, resolved);
    const getServices = (name) => {
        const svcs = r[name];
        if (svcs) {
            return [...svcs];
        }
        return [];
    };
    return { getServices };
}
function resolveDefs(...defs) {
    return __awaiter$2(this, void 0, void 0, function* () {
        const table = createTable(defs);
        const points = Object.keys(table);
        const resolved = {};
        const resolving = new Set();
        function resolveDep(dep, isRequired) {
            return __awaiter$2(this, void 0, void 0, function* () {
                const def = table[dep];
                if (!def) {
                    if (isRequired) {
                        throw new NotRegistered(dep);
                    }
                    return undefined;
                }
                return yield resolvePoint(dep); // eslint-disable-line no-use-before-define
            });
        }
        function resolveSvc(def) {
            var _a;
            return __awaiter$2(this, void 0, void 0, function* () {
                const deps = {};
                const keys = Object.keys((_a = def.deps) !== null && _a !== void 0 ? _a : {});
                for (const k of keys) {
                    deps[k] = yield resolveDep(k, def.deps[k]);
                }
                return yield def.factory(deps);
            });
        }
        function resolveSvcs(svcDefs) {
            return Promise.all(svcDefs.map(resolveSvc));
        }
        function resolvePoint(point, isRoot = false) {
            return __awaiter$2(this, void 0, void 0, function* () {
                // if there is already a service for this point maybe this is a many point
                if (resolved[point] && !isRoot) {
                    return resolved[point];
                }
                // if currently resolving the same type, we have a circular dependency
                if (resolving.has(point)) {
                    throw new CircularDependency(point);
                }
                resolving.add(point);
                const svcDefs = table[point];
                const instances = yield resolveSvcs(svcDefs);
                resolving.delete(point);
                return instances;
            });
        }
        for (const point of points) {
            resolved[point] = yield resolvePoint(point, true);
        }
        return createSvcPool(resolved);
    });
}

// @ts-ignore
const SvcPoolContext = React.createContext(null);

function Provider({ context: Context = SvcPoolContext, pool, children, }) {
    return React.createElement(Context.Provider, { value: pool }, children);
}

function createUseSvcPool(context) {
    return function useSvcPool() {
        // @ts-ignore
        return React.useContext(context);
    };
}
const useSvcPool = createUseSvcPool(SvcPoolContext);

function createHooks(context) {
    const useSvcPool$1 = context === SvcPoolContext ? useSvcPool : createUseSvcPool(context);
    function useServices(name) {
        const pool = useSvcPool$1();
        return pool.getServices(name);
    }
    function useFirstService(name) {
        var _a;
        const pool = useSvcPool$1();
        return (_a = pool.getServices(name)) === null || _a === void 0 ? void 0 : _a[0];
    }
    return [useServices, useFirstService];
}

const Context = React.createContext(null);
const [useServices, useFirstService] = createHooks(Context);
let Shell = function Shell({ pluginPaths, }) {
    const [state, setState] = React.useState({
        loading: true,
        data: null,
        error: null,
    });
    const ver = React.useRef(0);
    React.useEffect(() => {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                const current = ++ver.current;
                setState({
                    loading: true,
                });
                const loader = createLoader();
                const defs = yield loader.loadSvcDefs(pluginPaths);
                const pool = yield resolveDefs(...defs);
                if (current === ver.current) {
                    setState({
                        loading: false,
                        data: pool,
                    });
                }
            });
        })();
    }, [pluginPaths]);
    let content;
    if (state.loading) {
        content = React.createElement(React.Fragment, null, "loading");
    }
    else if (state.error) {
        content = React.createElement(React.Fragment, null, "error");
    }
    else {
        content = (React.createElement(Provider, { pool: state.data, context: Context },
            React.createElement("div", { className: "shell" },
                React.createElement(HeaderContainer, null),
                React.createElement(AppList, null),
                React.createElement(FooterContainer, null))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("h3", { className: "h-shell" }, "App Shell"),
        content));
};
function AppList() {
    const apps = useServices("app").map((C, i) => React.createElement(C, { key: i }));
    return (React.createElement("div", { className: "app-list" }, apps.length ? apps : React.createElement("div", null, "no app provided")));
}
function HeaderContainer() {
    const Header = useFirstService("header");
    return (React.createElement("div", { className: "header-container" }, Header ? React.createElement(Header, null) : React.createElement("div", null, "no header")));
}
function FooterContainer() {
    const footers = useServices("footer");
    return (React.createElement("div", { className: "footer-container" }, footers.length ? (footers.map((F, i) => React.createElement(F, { key: i }))) : (React.createElement("div", null, "no footer"))));
}

const DefaultPlugins = ["/Header.mjs", "/AppOne.mjs", "/AppTwo.mjs"];
function Root() {
    const [pluginsPath, setState] = React.useState(DefaultPlugins);
    return (React.createElement(React.Fragment, null,
        React.createElement(DefList, { onChange: setState, defaultValue: DefaultPlugins.join("\n") }),
        React.createElement(Shell, { pluginPaths: pluginsPath })));
}
const MountNode = document.getElementById("root");
ReactDOM.render(React.createElement(Root, null), MountNode);
//# sourceMappingURL=Root.mjs.map
