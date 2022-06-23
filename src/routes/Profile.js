import { authService } from "fbase";

export default () => {
  const onLogOutClick = () => authService.signOut();

  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};