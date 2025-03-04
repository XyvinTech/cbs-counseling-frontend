import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getUsers } from "../../../api/userApi";
import { getReport } from "../../../api/reportApi";
import { saveAs } from "file-saver";
import SelectType from "../../../components/Student/SelectType";
import { toast } from "react-toastify";
const AddReport = () => {
  const [loading, setLoading] = useState(false);
  const [dwld, setDwld] = useState(false);
  const [students, setStudents] = useState<{ value: string; label: string }[]>(
    []
  );
  const [reportData, setReportData] = useState<{
    headers: string[];
    data: any[];
    title: string;
  } | null>(null);
  const [counselor, setCounselor] = useState<
    { value: string; label: string }[]
  >([]);
  const [formState, setFormState] = useState<{
    reportType: string;
    startDate: string;
    endDate: string;
    grNumber: string;
    counsellor: string;
    counselingType: string;
  }>({
    reportType: "",
    startDate: "",
    endDate: "",
    grNumber: "",
    counsellor: "",
    counselingType: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getUsers({ type: "student", user: "all" });

        const studentOptions = response?.data?.map((student: any) => ({
          value: student?.StudentReferencesCode,
          label: student?.name,
        }));
        setStudents([{ value: "*", label: "All" }, ...studentOptions]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const fetchCounselor = async () => {
      try {
        const response = await getUsers({ type: "counsellor", user: "all" });
        const counselorOptions = response?.data?.map((counselor: any) => ({
          value: counselor._id,
          label: counselor?.name,
        }));
        setCounselor([{ value: "*", label: "All" }, ...counselorOptions]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchStudents();
    fetchCounselor();
  }, []);

  const handleStudentChange = (selectedOptions: any) => {
    if (selectedOptions.some((option: any) => option.value === "*")) {
      setFormState((prev) => ({ ...prev, grNumber: "*" }));
    } else {
      setFormState((prev) => ({
        ...prev,
        grNumber: selectedOptions.map((option: any) => option.value),
      }));
    }
  };
  const handleCounselorChange = (selectedOptions: any) => {
    if (selectedOptions?.some((option: any) => option.value === "*")) {
      setFormState((prev) => ({ ...prev, counsellor: "*" }));
    } else {
      setFormState((prev) => ({
        ...prev,
        counsellor: selectedOptions
          ? selectedOptions.map((option: any) => option.value)
          : [],
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formState.startDate || !formState.endDate) {
      toast.error("Start Date and End Date are required.");
      return;
    }

    setLoading(true);
    const params: any = {
      ...(formState.reportType ? { reportType: formState.reportType } : {}),
      ...(formState.startDate ? { startDate: formState.startDate } : {}),
      ...(formState.endDate ? { endDate: formState.endDate } : {}),
      ...(formState.grNumber ? { grNumber: formState.grNumber } : {}),
      ...(formState.counsellor ? { counsellor: formState.counsellor } : {}),
      ...(formState.counselingType
        ? { counselingType: formState.counselingType }
        : {}),
    };

    try {
      const report = await getReport(params);
      if (report?.data) {
        setReportData(report?.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!reportData) return;

    setDwld(true);
    try {
      const csvHeaders = reportData.headers.join(",") + "\n";

      const csvRows = reportData.data
        .map((row) =>
          reportData.headers
            .map((header) => {
              const key = header.toLowerCase().replace(/\s+/g, "_");
              let value = row[key];

              if (Array.isArray(value)) {
                value = value.join(", ");
              }

              value = String(value).replace(/"/g, '""');

              return `"${value}"`;
            })
            .join(",")
        )
        .join("\n");
      const csvContent = csvHeaders + csvRows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const fileName = `${reportData?.title || "report"}.csv`; 
    saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading report:", error);
    } finally {
      setDwld(false);
      setFormState({
        reportType: "",
        startDate: "",
        endDate: "",
        grNumber: "",
        counsellor: "",
        counselingType: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Report
        </h2>
      </div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            <div className="mb-6 w-full">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Report Type
              </label>
              <select
                name="reportType"
                value={formState.reportType}
                onChange={handleChange}
                className="w-full rounded border bg-transparent py-3 px-5 outline-none transition focus:border-[#0072bc] dark:border-form-strokedark dark:bg-form-input dark:focus:border-[#0072bc]"
              >
                <option value="">Select Report Type</option>
                <option value="session">Session</option>
                <option value="case">Case</option>
                <option value="session-count">Session Count</option>
                <option value="counseling-type">Counseling Type</option>
                <option value="consolidated">Consolidated</option>
              </select>
            </div>
            {formState.reportType === "session" && (
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Counselors
                </label>
                <Select
                  options={
                    formState?.counsellor === "*"
                      ? [{ value: "*", label: "All" }]
                      : counselor
                  }
                  isMulti
                  value={
                    formState?.counsellor === "*"
                      ? [{ value: "*", label: "All" }]
                      : counselor?.filter(
                          (option) =>
                            formState?.counsellor?.includes(option.value)
                        )
                  }
                  onChange={handleCounselorChange}
                  classNamePrefix="select"
                  styles={{
                    control: (base, { isFocused }) => ({
                      ...base,
                      padding: 6,
                      borderColor: isFocused ? "#0072bc" : "#0072bc",
                      boxShadow: isFocused ? "0 0 0 1px #0072bc" : "none",
                      "&:hover": { borderColor: "#0072bc" },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#0072bc",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "white",
                      "&:hover": { backgroundColor: "#822bd4", color: "white" },
                    }),
                  }}
                />
              </div>
            )}
            {(formState.reportType === "case" ||
              formState.reportType === "session") && (
              <div className="mb-6">
                <label className="mb-2.5 block text-black dark:text-white">
                  Select Students
                </label>
                <Select
                  options={
                    formState.grNumber === "*"
                      ? [{ value: "*", label: "All" }]
                      : students
                  }
                  isMulti
                  value={
                    formState?.grNumber === "*"
                      ? [{ value: "*", label: "All" }]
                      : students?.filter(
                          (option) =>
                            formState?.grNumber?.includes(option.value)
                        )
                  }
                  onChange={handleStudentChange}
                  classNamePrefix="select"
                  styles={{
                    control: (base, { isFocused }) => ({
                      ...base,
                      padding: 6,
                      borderColor: isFocused ? "#0072bc" : "#0072bc",
                      boxShadow: isFocused ? "0 0 0 1px #0072bc" : "none",
                      "&:hover": { borderColor: "#0072bc" },
                    }),
                    multiValue: (base) => ({
                      ...base,
                      backgroundColor: "#0072bc",
                    }),
                    multiValueLabel: (base) => ({
                      ...base,
                      color: "white",
                    }),
                    multiValueRemove: (base) => ({
                      ...base,
                      color: "white",
                      "&:hover": { backgroundColor: "#822bd4", color: "white" },
                    }),
                  }}
                />
              </div>
            )}

            {formState.reportType === "counseling-type" && (
              <SelectType
                onPlanChange={(value: string) => {
                  setFormState({ ...formState, counselingType: value });
                }}
                selectedPlan={formState.counselingType}
              />
            )}
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formState.startDate}
                onChange={handleChange}
                placeholder="Enter Start Date"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formState.endDate}
                onChange={handleChange}
                placeholder="Enter End Date"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-[#0072bc] dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-[#0072bc] p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? "Loading..." : "Generate Report"}
            </button>
          </div>
        </form>
      </div>{" "}
      {reportData && (
        <>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDownload}
              className="px-6 py-2 bg-[#0072bc] text-white rounded hover:bg-opacity-90 transition"
            >
              {dwld ? "Downloading..." : "Download Report"}
            </button>
          </div>
          <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
              {formState?.reportType !== "consolidated" ? (
                <table className="w-full table-auto">
                  <>
                    <thead>
                      <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        {reportData?.headers?.map((header, index) => (
                          <th
                            key={index}
                            className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {reportData?.data && reportData.data.length > 0 ? (
                        reportData.data.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className={`border-b border-[#eee] dark:border-strokedark ${
                              rowIndex === reportData.data.length - 1
                                ? "border-none"
                                : ""
                            }`}
                          >
                            {reportData?.headers?.map((header, colIndex) => (
                              <td
                                key={colIndex}
                                className="py-5 px-4 text-black dark:text-white"
                              >
                                {row[header.toLowerCase().replace(/\s+/g, "_")]
                                  ?.length > 30
                                  ? row[
                                      header.toLowerCase().replace(/\s+/g, "_")
                                    ].slice(0, 30) + "..."
                                  : row[
                                      header.toLowerCase().replace(/\s+/g, "_")
                                    ]}
                              </td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={reportData?.headers?.length || 1}
                            className="py-5 px-4 text-center text-gray-500"
                          >
                            No data available
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </>
                </table>
              ) : (
                <>
                  <table className="w-full table-auto">
                    <>
                      <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                          {reportData?.headers?.map((header, index) => (
                            <th
                              key={index}
                              className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {reportData?.data && reportData.data.length > 0 ? (
                          reportData.data.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              className={`border-b border-[#eee] dark:border-strokedark ${
                                rowIndex === reportData.data.length - 1
                                  ? "border-none"
                                  : ""
                              }`}
                            >
                              {reportData?.headers?.map((header, colIndex) => {
                                // Special handling for "Particulars" column
                                const key =
                                  header === "Particulars"
                                    ? "particulars"
                                    : header;
                                const cellData = String(row[key] ?? "");

                                return (
                                  <td
                                    key={colIndex}
                                    className="py-5 px-4 text-black dark:text-white whitespace-pre-line"
                                  >
                                    {cellData.length > 30 ? (
                                      <span title={cellData}>
                                        {cellData.slice(0, 30) + "..."}
                                      </span>
                                    ) : (
                                      cellData
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan={reportData?.headers?.length || 1}
                              className="py-5 px-4 text-center text-gray-500"
                            >
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </>
                  </table>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddReport;
