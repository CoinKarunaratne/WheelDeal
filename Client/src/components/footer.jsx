export default function () {
  return (
    <section id="footer" className="h-[600px] sm:h-[400px] w-full">
      <div className="flex h-full w-full justify-center sm:justify-between">
        <div
          href="#home"
          className="text-white text-[45px] font-bold align-text-bottom self-end p-8 hidden sm:flex"
        >
          WheelDeal
        </div>
        <div className="align-text-bottom self-end flex flex-col gap-4">
          <div className="flex gap-7 p-8 lg:mr-8">
            <a href="">
              <img
                src="contact/github.png"
                alt=""
                className="w-10 hover:opacity-70"
              />
            </a>
            <a href="">
              <img
                src="contact/facebook.png"
                alt=""
                className="w-10 hover:opacity-70"
              />
            </a>
            <a href="">
              <img
                src="contact/instagram.png"
                alt=""
                className="w-10 hover:opacity-70"
              />
            </a>
            <a href="">
              <img
                src="contact/linkedin.png"
                alt=""
                className="w-10 hover:opacity-70"
              />
            </a>
          </div>

          <div className="text-slate-500 font-semibold text-center mb-5">
            Copyright 2023. All Rights Reserved
          </div>
        </div>
      </div>
    </section>
  );
}
