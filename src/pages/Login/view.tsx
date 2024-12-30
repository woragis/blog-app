import { useLoginModel } from "./model";
import { LoginForm } from "./styles";

export const LoginView = ({
  auth,
  loginData,
  handleLoginChange,
  handleLoginSubmit,
}: ReturnType<typeof useLoginModel>) => {
  return (
    <LoginForm onSubmit={handleLoginSubmit}>
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="Email"
        value={loginData.email}
        onChange={handleLoginChange}
      />
      <input
        type="text"
        name="password"
        id="password"
        placeholder="Password"
        value={loginData.password}
        onChange={handleLoginChange}
      />
      <button>Send</button>
      {auth.status === "loading" && <p>Loading...</p>}
      {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
    </LoginForm>
  );
};
