import background from "../assets/login-pic.jpg";

const Login = () => {
  return (
    <>
      <section className="h-screen bg-green-200/20 font-[Poppins] flex items-center justify-center">
        <div className="h-[85%] w-[70%] bg-[#ffffff] drop-shadow rounded-xl py-4 px-5 flex gap-3">
          <div
            className="h-full w-[50%] bg-cover bg-center rounded-xl p-5 flex items-end"
            style={{ backgroundImage: `url(${background})` }}
          >
            <div className="text-white text-[35px] font-[400]">
              Grow Your, <br /> Bussiness With Us.
            </div>
          </div>

          <div className="h-full w-1/2 flex items-center justify-center p-5 px-[5%]">
            <div className="h-full">
              <h1 className="text-[#3d5306] text-[35px] font-[500] mb-3 ">
                <span className="text-[45px]">*</span>
                <br />
                Login to your account
              </h1>

              <h1 className="text-[12px] text-[#053931]">
                Join our global network of coconut merchants. Stay updated with
                industry news, connect with buyers, nd protect your crops with
                advanced AI diagnostics.
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
