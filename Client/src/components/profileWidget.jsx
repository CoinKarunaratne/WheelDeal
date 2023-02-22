import { useSelector } from "react-redux";

export default function profileWidget() {
  const user = useSelector((state) => state.user);
  const date = new Date(user.joinedDate);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <div className="basis-1/4 flex flex-col px-5 border-r-2 border-sky-900">
      <div className="rounded-lg shadow-lg shadow-black bg-[#252525] m-auto mt-[170px] text-white flex flex-col lg:w-[350px]">
        <div className="rounded-full h-[150px] w-[150px] mt-[-70px] self-center">
          <img
            className="rounded-full object-cover h-full w-full"
            src={`http://localhost:3001/assets/${user.picturePath}`}
            alt="profile-picture"
          />
        </div>
        <div className="flex flex-col gap-3 px-10 py-7">
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-slate-500">Name : </h1>
            <h1 className="font-normal">
              {user.firstName + " " + user.lastName}
            </h1>
          </div>

          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-slate-500">Location : </h1>
            <h1 className="font-normal">{user.suburb + " " + user.city}</h1>
          </div>

          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-slate-500">Profile Views : </h1>
            <h1 className="font-normal">{user.viewedProfile}</h1>
          </div>

          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-slate-500">Sales :</h1>
            <h1 className="font-normal">{user.numberOfSales}</h1>
          </div>

          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-slate-500">Joined : </h1>
            <h1 className="font-normal">{formattedDate}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
