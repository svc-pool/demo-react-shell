import * as React from "react";
import * as ReactDOM from "react-dom";
import { createSvcDef } from "@svc-pool/core";
import Registry from "../root/Registry";

const svcDef = createSvcDef<Registry>("app", function () {
  return function AppOne() {
    return (
      <a
        target="_blank"
        href="https://github.com/svc-pool/react-plugin-template"
      >
        Add your plugin to this demo
      </a>
    );
  };
});

export default svcDef;
