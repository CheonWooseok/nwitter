import Navigation from "components/Navigation";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

const AppRouter = ({ userObj, refreshUser }) => {
  return (
    <Router>
      {userObj && <Navigation userObj={userObj} />}

      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Routes>
          {userObj ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route
                path="/profile"
                element={
                  <Profile refreshUser={refreshUser} userObj={userObj} />
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Auth />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
