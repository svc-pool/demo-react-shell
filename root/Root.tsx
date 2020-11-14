import * as React from "react";
import * as ReactDOM from "react-dom";
import DefList from "./DefList";
import Shell from "./Shell";

const DefaultPlugins = ["./Header.mjs", "./AppOne.mjs", "./AppTwo.mjs"];

function Root() {
  const [pluginsPath, setState] = React.useState<string[]>(DefaultPlugins);

  return (
    <>
      <DefList onChange={setState} defaultValue={DefaultPlugins.join("\n")} />
      <Shell pluginPaths={pluginsPath} />
    </>
  );
}

const MountNode = document.getElementById("root");
ReactDOM.render(<Root />, MountNode);
