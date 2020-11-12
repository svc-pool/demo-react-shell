import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loader from "@svc-pool/loader";
import { resolveDefs, SvcPool } from "@svc-pool/core";
import { Provider, createHooks, SvcPoolContext } from "@svc-pool/react";
import Registry from "./Registry";

const Context = React.createContext<SvcPool<Registry> | null>(null);
const [useServices, useFirstService] = createHooks(Context);

let Shell: React.FC<{ pluginPaths: string[] }> = function Shell({
  pluginPaths,
}) {
  const [state, setState] = React.useState<{
    loading: boolean;
    data?: SvcPool<Registry> | null;
    error?: Error | null;
  }>({
    loading: true,
    data: null,
    error: null,
  });

  const ver = React.useRef(0);

  React.useEffect(() => {
    (async function () {
      const current = ++ver.current;

      setState({
        loading: true,
      });

      const loader = Loader.createLoader<Registry>();
      const defs = await loader.loadSvcDefs(pluginPaths);
      const pool = await resolveDefs(...defs);

      if (current === ver.current) {
        setState({
          loading: false,
          data: pool,
        });
      }
    })();
  }, [pluginPaths]);

  let content;
  if (state.loading) {
    content = <>loading</>;
  } else if (state.error) {
    content = <>error</>;
  } else {
    content = (
      <Provider pool={state.data as SvcPool<Registry>} context={Context}>
        <div className="shell">
          <HeaderContainer />
          <AppList />
          <FooterContainer />
        </div>
      </Provider>
    );
  }

  return (
    <>
      <h3 className="h-shell">App Shell</h3>
      {content}
    </>
  );
};

export default Shell;

function AppList() {
  const apps = useServices("app").map((C, i) => <C key={i} />);

  return (
    <div className="app-list">
      {apps.length ? apps : <div>no app provided</div>}
    </div>
  );
}

function HeaderContainer() {
  const Header = useFirstService("header");

  return (
    <div className="header-container">
      {Header ? <Header /> : <div>no header</div>}
    </div>
  );
}

function FooterContainer() {
  const footers = useServices("footer");

  return (
    <div className="footer-container">
      {footers.length ? (
        footers.map((F, i) => <F key={i} />)
      ) : (
        <div>no footer</div>
      )}
    </div>
  );
}
