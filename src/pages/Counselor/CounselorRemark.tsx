import RemarkTable from "./RemarkTable";

const CounselorRemark = () => {
  return (
    <>
      {" "}
      <div className="mb-7.5 flex flex-wrap gap-5 xl:gap-7.5 justify-between">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white ">
            Remarks
          </h2>
        </div>
      </div>
      <RemarkTable/>
    </>
  );
};

export default CounselorRemark;
