import Nweet from "components/Nweet";
import { dbService } from "fbase";
import { useEffect, useState } from "react";

export default ({ userObj }) => {
  const [nweets, setNweets] = useState([]);
  const [nweet, setNweet] = useState("");

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

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setNweet(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={nweet}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
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
