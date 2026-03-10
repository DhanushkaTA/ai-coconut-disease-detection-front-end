import { useEffect, useState } from "react";
import background from "../assets/login-pic.jpg";
import Input from "../component/input";
import { useLoginMutation } from "../service/loginApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../service/authSlice";
import { socket } from "../socket/chatSocket";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./loca/LanguageSwitcher";
import { useAlert } from "../context/AlertContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { showAlert } = useAlert();

  useEffect(() => {
    socket.on("receive_message_notification", (message) => {
      console.log("🔔 New notification:", message);
      // alert(`New message from ${message.senderName}: ${message.content}`);
      showAlert(
        `New message from ${message.senderName}: ${message.content}`,
        "info",
      );
    });

    socket.on("new_alert", (alert) => {
      console.log("🔔 New alert received:", alert?.title);
      // alert("dddd");
      // alert(`🔔 New alert received`);

      showAlert(`🔔 New alert received: ${alert?.title}`, "error");

      // Example:
      // 1️⃣ Show toast
      // 2️⃣ Update alert list
      // 3️⃣ Increase notification badge
    });

    // return () => {
    //   socket.off("receive_message_notification");
    //   socket.off("new_alert");
    // };
  }, []);

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
      alert("Login successful!");
      showAlert("Login Successful", "success");

      if (res.user.role == "admin") {
        navigate("/admin/dash");
      } else {
        navigate("/user/feeds");
      }

      console.log("Login success:", res);
      dispatch(setCredentials(res.user));

      socket.connect();
    } catch (err) {
      console.error("Login failed:", err);
      showAlert(err?.data.message, "error");
    }
  };

  // useEffect(() => {
  //   socket.connect();

  //   socket.on("connect", () => {
  //     console.log("🟢 Connected to socket:", socket.id);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <>
      <LanguageSwitcher />
      <section className="h-screen bg-green-200/20 font-[Poppins] flex items-center justify-center">
        <div className="h-[85%] w-[70%] bg-[#ffffff] drop-shadow rounded-xl py-4 px-5 flex gap-3">
          <div
            className="h-full w-[50%] bg-cover bg-center rounded-xl p-5 flex flex-col justify-end"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="text-white text-[35px] font-normal mb-3">
              Grow Your,
            </div>
            <div className="text-white text-[35px] font-normal">
              Bussiness With Us.
            </div>
          </div>

          <div className="h-full w-1/2 flex items-center justify-center p-5 px-[5%]">
            <div className="h-full">
              <h1 className="text-[#3d5306] text-[35px] font-medium mb-3 ">
                <span className="text-[45px]">*</span>
                <br />
                {/* {t("welcome")} */}
                {/* Login to your account */}
                {t("loginStatus")}
              </h1>

              <h1 className="text-[12px] text-[#053931]">
                {/* Join our global network of coconut merchants. Stay updated with
                industry news, connect with buyers, nd protect your crops with
                advanced AI diagnostics. */}
                {t("loginStatement")}
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
                  {/* Login */}
                  {t("login")}
                </div>

                <div className="w-full">
                  <hr className="mb-5" />
                  <h1 className="text-[12px] text-[#71990d] text-cente flex gap-2">
                    {/* Don't have account? */}
                    {t("dnuhAcc")}
                    <span
                      className="underline cursor-pointer text-black hover:text-[#71990d]"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      {t("register")}
                      {/* Register */}
                    </span>
                  </h1>

                  {/* fogot password */}
                  <h1 className="text-[12px] text-[#71990d] text-cente flex gap-2 hover:text-[#141b03] cursor-pointer">
                    {t("forgotPass")}
                    {/* <span
                      className="underline cursor-pointer text-black hover:text-[#71990d]"
                      onClick={() => {
                        navigate("/register");
                      }}
                    >
                      {t("register")}
                    </span> */}
                  </h1>
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
