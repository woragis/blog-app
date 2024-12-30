import { useLoginModel } from "./model";

export const LoginView = ({
  auth,
  loginData,
  handleLoginChange,
  handleLoginSubmit,
}: ReturnType<typeof useLoginModel>) => {
  return (
    <main>
      <h1>Login</h1>
      <div>
        <form action="" method="post" onSubmit={handleLoginSubmit}>
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
        </form>
        {auth.status === "loading" && <p>Loading...</p>}
        {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
      </div>
    </main>
  );
};
