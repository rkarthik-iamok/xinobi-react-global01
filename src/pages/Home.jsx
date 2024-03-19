import React from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";

function Home({ region }) {
  const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const login = async () => await oktaAuth.signInWithRedirect();
  const logout = async () => await oktaAuth.signOut("/");

  const loginToEUSpoke = async () => {
    console.log("EU Spoke has been clicked");
    window.location.href =
      "https://ciam-spoke01.karthiktc.com/home/bookmark/0oacgs4frbSQZ5zQZ697/2557";
  };

  const loginToUSSpoke = () => {
    console.log("Spoke button has been clicked");
    window.location.href =
      "https://ciam-spoke02.karthiktc.com/app/okta_org2org/exkc28xmjiQhNIE8T697/sso/saml?RelayState=http://localhost:8000/region/us/profile";
    // "https://ciam-spoke02.karthiktc.com/home/bookmark/0oac807bl27xttAw4697/2557";
    // "https://primary.karthiktc.com/app/okta_org2org/exkak0ns6bGy2vMz6697/sso/saml?RelayState=https://xinobi-iamok-global.netlify.app/region/us/profile";
    // "https://primary.karthiktc.com/home/bookmark/0oabph5jhiPoI83ib697/2557";
  };

  const signUpToUSSpoke = () => {
    console.log("Spoke Sign Up button has been clicked");
    window.location.href =
      "https://ciam-spoke02.karthiktc.com/app/bookmark/0oac807bl27xttAw4697/login?signup_page=true";
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
            <>
              <button onClick={loginToUSSpoke}>US Spoke Login</button>
              {/* <button onClick={signUpToUSSpoke}>US Spoke Signup</button> */}
            </>
          )}
          {region == "eu" && <button onClick={loginToEUSpoke}>Login</button>}
          {/* {region == "eu" && <button onClick={login}>Login</button>} */}
          {/* {region == "apac" && <button onClick={login}>Login</button>} */}
        </div>
      )}
    </div>
  );
}

export default Home;
