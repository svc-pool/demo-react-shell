import * as React from "react";
import * as ReactDOM from "react-dom";
import { createSvcDef } from "@svc-pool/core";
import Registry from "../root/Registry";

const svcDef = createSvcDef<Registry>("app", function () {
  return function AppOne() {
    return <div>Add your plugin to this demo <a href="/">here</a></div>;
  };
});

export default svcDef;
