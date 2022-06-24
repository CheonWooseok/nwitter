const { authService } = require("fbase");
const { useState } = require("react");

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") setEmail(value);
    else setPassword(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Login"}
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Signin" : "Login"}
      </span>
    </>
  );
};

export default AuthForm;
