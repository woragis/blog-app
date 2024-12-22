import { useRegisterModel } from "./model";

export const RegisterView = ({
  auth,
  registerData,
  handleRegisterChange,
  handleRegisterSubmit,
}: ReturnType<typeof useRegisterModel>) => {
  return (
    <div>
      <h1>Register</h1>
      <div>
        <form action="" method="post" onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={registerData.name || ""}
            onChange={handleRegisterChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email"
            value={registerData.email || ""}
            onChange={handleRegisterChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={registerData.password || ""}
            onChange={handleRegisterChange}
          />
          <button>Register</button>
        </form>
        {auth.status === "loading" && <p>Loading...</p>}
        {auth.error && <p style={{ color: "red" }}>{auth.error}</p>}
      </div>
    </div>
  );
};
