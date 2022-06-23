import { dbService } from "fbase";
import { useState } from "react";

export default ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweets, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = () => {
    const ok = window.confirm("Are you sure you want delete this nweet?");
    if (ok) {
      // delete
      dbService.doc(`nweets/${nweetObj.id}`).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = (e) => {
    e.preventDefault();

    dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweets });
    toggleEditing();
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;

    setNewNweet(value);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit your Nweet"
              value={newNweets}
              onChange={onChange}
              required
            />
            <input type="submit" value="Update Nweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};
