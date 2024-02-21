import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";

function Home({ region }) {
  const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const login = async () => await oktaAuth.signInWithRedirect();
  const logout = async () => await oktaAuth.signOut("/");

  const loginToUSSpoke = () => {
    console.log("Spoke button has been clicked");
    window.location.href =
      //   "https://primary.karthiktc.com/app/okta_org2org/exkak0ns6bGy2vMz6697/sso/saml?RelayState=https://xinobi-iamok-global.netlify.app/region/us/profile";
      "https://primary.karthiktc.com/home/bookmark/0oabph5jhiPoI83ib697/2557";
  };

  useEffect(() => {
    if (!authState || authState.isAuthenticated !== true) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });

      // Fetch App entitlement.
      // Set the app entitlemtn state
    }
  }, [oktaAuth, authState]);

  if (!authState) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{region.toUpperCase()} Region</h2>
      {authState.isAuthenticated && !userInfo && (
        <div>Loading User information</div>
      )}

      {authState.isAuthenticated && userInfo && (
        <div>
          <p>Welcome Back {userInfo.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}

      {authState.isAuthenticated == false && (
        <div>
          <p>Welcome to Okta Application</p>
          {region == "us" && (
            <button onClick={loginToUSSpoke}>US Spoke Login</button>
          )}
          {region != "us" && <button onClick={login}>Login</button>}
        </div>
      )}
    </div>
  );
}

export default Home;
