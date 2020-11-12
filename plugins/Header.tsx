import * as React from "react";
import * as ReactDOM from "react-dom";
import { createSvcDef } from "@svc-pool/core";
import Registry from "../root/Registry";

const svcDef = createSvcDef<Registry>("header", function () {
  return function Header() {
    return <h4>Sample Micro Frontend App (This header is from a plugin)</h4>;
  };
});

export default svcDef;
