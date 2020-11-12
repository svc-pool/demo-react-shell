import * as React from "react";
import * as ReactDOM from "react-dom";
import { createSvcDef } from "@svc-pool/core";

interface Registry {
  tile: React.ReactNode;
}

const svcDef = createSvcDef<Registry>("tile", function () {
  return function App() {
    return <div>app</div>;
  };
});

console.log(svcDef);

export default svcDef;
