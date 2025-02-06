import moment from "moment-timezone";
import { subscription } from "../../types/subscription";
import { getPdf } from "../../api/subscriptionApi";

type TableOneProps = {
  brandData: subscription[];
};

const TableOne: React.FC<TableOneProps> = ({ brandData }) => {
  console.log("brandData", brandData);
  const handlePdf = async () => {
    try {
      const pdf = await getPdf();
      const pdfUrl = pdf.data.pdfUrl;
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
      } else {
        console.log("PDF URL is not available");
      }
    } catch (error) {
      console.error("Error fetching the PDF:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Subscriptions
        </h4>
        <button
          className="flex items-center rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none"
          onClick={handlePdf}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="mr-2 h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 9V3h12v6M6 18h12v-3M6 15h12v6H6v-6z"
            />
          </svg>
          Print
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              User
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Church
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Plan
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Expiry Date
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Status
            </h5>
          </div>
        </div>

        {brandData?.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.user.name}</p>
            </div>

            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {brand.user?.church?.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.plan.name}</p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">
                {moment(brand.expiryDate).format("DD-MM-YYYY")}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  brand.status === "active"
                    ? "bg-green-500 text-green-600"
                    : brand.status === "inactive"
                    ? "bg-red-500 text-red-600"
                    : brand.status === "expiring"
                    ? "bg-yellow-500 text-yellow-600"
                    : brand.status === "expired"
                    ? "bg-gray-500 text-gray-600"
                    : "bg-gray-500 text-gray-700"
                }`}
              >
                {brand.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
