import { authService, dbService } from "fbase";
import { useEffect, useState } from "react";

export default ({ userObj, refreshUser }) => {
  const onLogOutClick = () => {
    authService.signOut();
  };

  const [newDisplayName, setNewDiaplyName] = useState(userObj.displayName);

  const getMyNweet = async () => {
    const myNweets = await dbService
      .collection("nweets")
      .where("creatorId", "==", userObj.uid)
      .get();

    console.log(myNweets.docs.map((doc) => doc.data()));
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDiaplyName(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };

  useEffect(() => {
    getMyNweet();
  }, []);

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
          className="formInput"
        />
        <input type="submit" value="Update Profile" className="formBtn" />
      </form>
      <span onClick={onLogOutClick} className="formBtn cancelBtn logOut">
        Logout
      </span>
    </div>
  );
};
