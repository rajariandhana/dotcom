export default function PrivacyPolicy() {
  return (
    <>
      <section className="w-full">
        <div>
          <h2 className="mb-2 text-xl cursor-pointer">Contact Information</h2>
        </div>
        <div className="w-full p-4 bg-white border border-gray-200 rounded-md grid grid-cols-4 gap-1">
          <span className="col-span-1">Website name</span>
          <span className="col-span-3">:{" "}ralfazza.com</span>
          <span className="col-span-1">Owner</span>
          <span className="col-span-3">:{" "}Ralfazza Rajariandhana</span>
          <span className="col-span-1">Email</span>
          <span className="col-span-3">:{" "}rajariandhana@gmail.com</span>
        </div>
      </section>
      <section className="w-full">
        <div>
          <h2 className="mb-2 text-xl cursor-pointer">Privacy Policy</h2>
        </div>
        <div className="flex flex-col items-center justify-between w-full gap-2 lg:gap-4">
          <div className="w-full p-4 bg-white border border-gray-200 rounded-md text-justify">
            We do not collect, store, sell, or share any personal user data. Any information processed through the application is used only temporarily to provide the requested functionality and is not retained after the request is completed. We do not maintain user accounts, store uploaded content, or track personally identifiable information. Third-party services used by the application may process limited technical data as required for operation and security.
          </div>
        </div>
      </section>
    </>
  );
}
