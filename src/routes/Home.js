import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

export default ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const newNweets = snapshot.docs.map((db) => ({
        ...db.data(),
        id: db.id,
      }));
      setNweets(newNweets);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nw) => (
          <Nweet
            key={nw.id}
            nweetObj={nw}
            isOwner={nw.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
