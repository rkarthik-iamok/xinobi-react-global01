import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { toRelativeUrl } from "@okta/okta-auth-js";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";
import config from "../config";

export const RequireAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState) {
      return;
    }
    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      console.log(originalUri);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};

export const RequireAuthWithRegion = ({ region }) => {
  const { oktaAuth, authState } = useOktaAuth();
  console.log(`Region: ${region}`);

  useEffect(() => {
    if (!authState) {
      return;
    }
    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(
        window.location.href,
        window.location.origin
      );
      console.log(originalUri);
      oktaAuth.setOriginalUri(originalUri);
      if (region == "us") {
        oktaAuth.signInWithRedirect({
          idp: "0oac29d3a5FoAcmnY697",
        });
      }
      if (region == "eu") {
        oktaAuth.signInWithRedirect({
          idp: "0oacgvobshxAUaYri697",
        });
      }
      oktaAuth.signInWithRedirect();

      // const additionalParams = {
      //   customParam1: "value1",
      //   customParam2: "value2",
      // };
      // oktaAuth.signInWithRedirect({
      //   additionalParams: additionalParams,
      // });
    }
  }, [oktaAuth, !!authState, authState?.isAuthenticated]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};
