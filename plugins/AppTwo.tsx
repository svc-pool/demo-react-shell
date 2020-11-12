import * as React from "react";
import * as ReactDOM from "react-dom";
import { createSvcDef } from "@svc-pool/core";
import Registry from "../root/Registry";

const svcDef = createSvcDef<Registry>("app", {
  deps: {
    header: false,
  },
  factory: function ({ header }) {
    const H = header?.[0];

    return function AppTow() {
      return <div>Current header is {H ? <H /> : null}</div>;
    };
  },
});

export default svcDef;
