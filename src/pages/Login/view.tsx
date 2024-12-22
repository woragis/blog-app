import { ChangeEvent, FormEvent, useState } from "react";
import { useLoginModel } from "./model";
import { LoginInterface } from "../../types/auth.types";
import { login } from "../../features/auth/authSlice";
import { useAppDispatch } from "../../features/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../features/store";

export const LoginView = ({}: ReturnType<typeof useLoginModel>) => {
  const dispatch = useAppDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [loginData, setLoginData] = useState<LoginInterface>(
    {} as LoginInterface
  );
  const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLoginData(
      (prevState) =>
        (prevState = { ...prevState, [event.target.name]: event.target.value })
    );
  };
  const handleLoginSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(login(loginData));
  };
  return (
    <div>
      LoginView
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
    </div>
  );
};
