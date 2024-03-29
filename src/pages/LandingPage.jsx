import {
  useParams,
  useNavigate,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import InvalidRegion from "./InvalidRegion";
import config from "../config";
import Home from "./Home";
import { RequireAuth, RequireAuthWithRegion } from "../components/RequireAuth";
import Profile from "./Profile";

function LandingPage() {
  // Navigate on Load

  const { region } = useParams();
  let supportedRegions = ["us", "eu", "apac"];

  if (!supportedRegions.includes(region)) {
    return <InvalidRegion />;
  }

  console.log(JSON.stringify(config, null, 4));

  const redirect_origin = process.env.DOMAIN;
  console.log("DOMAIN", redirect_origin);

  config.oidc.redirectUri = `${redirect_origin}/region/${region}/login/callback`;

  const oktaAuth = new OktaAuth(config.oidc);

  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || "/", window.location.href));
  };

  return (
    <>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <Routes>
          <Route path="/home" element={<Home region={region} />} />

          <Route
            path="/profile"
            element={<RequireAuthWithRegion region={region} />}
          >
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="/login/callback" element={<LoginCallback />} />
        </Routes>
      </Security>
    </>
  );
}

export default LandingPage;
