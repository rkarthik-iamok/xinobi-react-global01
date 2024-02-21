import React, { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const logout = async () => await oktaAuth.signOut("/");

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
      setIdToken(null);
      setAccessToken(null);
    } else {
      setUserInfo(authState.idToken.claims);
      setIdToken(authState.idToken.idToken);
      setAccessToken(authState.accessToken.accessToken);
      // get user information from `/userinfo` endpoint
      /*oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });*/
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="drivers license" /> My User Profile (ID Token Claims){" "}
        </Header>
        <p>
          Below is the information from your ID token which was obtained during
          authentication and is now stored in local storage.
        </p>
        <p>
          This route is protected, which will ensure that this page cannot be
          accessed until you have authenticated.
        </p>
        <Table>
          <thead>
            <tr>
              <th>Claim</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(userInfo).map((claimEntry) => {
              const claimName = claimEntry[0];
              const claimValue = claimEntry[1];
              const claimId = `claim-${claimName}`;
              return (
                <tr key={claimName}>
                  <td>{claimName}</td>
                  <td id={claimId}>{claimValue.toString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div>
          <br />
          <div>
            <a target="_blank" href={"https://jwt.io?token=" + idToken}>
              ID Token
            </a>
          </div>
          {idToken}
        </div>
        <div>
          <br />
          <div>
            <a target="_blank" href={"https://jwt.io?token=" + accessToken}>
              Access Token
            </a>
          </div>
          {accessToken}
        </div>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Profile;
