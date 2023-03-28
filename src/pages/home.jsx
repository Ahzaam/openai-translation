export default function HomePage() {
  return (
    <div className=" p-4 rounded-lg   max-w-4xl mx-auto ">
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full pb-9 px-5  max-w-4xl">
        <div className="flex items-center rounded-lg border bg-white border-gray-400 pl-3 pr-1  py-1">
          <input
            type="text"
            placeholder="Type a prompt"
            className="w-full focus:outline-none"
          />
          <button className="bg-blue-600 flex items-center justify-center font-bold py-1 h-9 w-14 text-center px-4 ml-2 rounded"></button>
        </div>
      </div>
      <div className=" p-4 rounded-lg text-center my-4 flex flex-col min-h-full bg-white">
        <h2 className="font-bold mb-2 text-2xl">
          AI Social Media Caption Writing
        </h2>
        <p className="text-gray-700 mb-4">
          Our website's AI feature can help you write captivating and effective
          captions for your social media posts. Say goodbye to writer's block
          and hello to more engagement!
        </p>
      </div>
      <div
        className=" p-4 rounded-lg text-center flex flex-col min-h-full bg-white"
        style={{ minHeight: "68vh" }}
      >
        {/*  Output Display */}
      </div>
    </div>
  );
}
