import { useState } from "react";
import background from "../assets/login-pic.jpg";
import Input from "../component/input";
import { useLoginMutation } from "../service/loginApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, isSuccess, data }] = useLoginMutation();

  const handleInput = (e: any, type: string): void => {
    switch (type) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login({ username, password }).unwrap();

      console.log("Login success:", res);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <section className="h-screen bg-green-200/20 font-[Poppins] flex items-center justify-center">
        <div className="h-[85%] w-[70%] bg-[#ffffff] drop-shadow rounded-xl py-4 px-5 flex gap-3">
          <div
            className="h-full w-[50%] bg-cover bg-center rounded-xl p-5 flex items-end"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="text-white text-[35px] font-normal">
              Grow Your, <br /> Bussiness With Us.
            </div>
          </div>

          <div className="h-full w-1/2 flex items-center justify-center p-5 px-[5%]">
            <div className="h-full">
              <h1 className="text-[#3d5306] text-[35px] font-medium mb-3 ">
                <span className="text-[45px]">*</span>
                <br />
                Login to your account
              </h1>

              <h1 className="text-[12px] text-[#053931]">
                Join our global network of coconut merchants. Stay updated with
                industry news, connect with buyers, nd protect your crops with
                advanced AI diagnostics.
              </h1>
              {/* ------- login form --------- */}
              <div className="mt-7 flex flex-col gap-4">
                <div>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    label="Username"
                    message="Username not found."
                    borderRequired={true}
                    callBack={handleInput}
                    required={false}
                    validate={true}
                  />
                </div>

                <div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    label="Password"
                    message="Password in correct."
                    borderRequired={true}
                    callBack={handleInput}
                    required={false}
                    validate={true}
                    passBtn={true}
                  />
                </div>

                <div
                  className="w-full h-[38px] bg-[#3d5306] rounded text-white flex items-center justify-center cursor-pointer"
                  onClick={handleLogin}
                >
                  Login
                </div>

                <div className="w-full">
                  <h1></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
