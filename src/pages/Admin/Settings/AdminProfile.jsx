import { BsFillEnvelopeFill, BsFillTelephoneFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { getUser, updateUser, upload } from "../../../api/userApi";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const VITE_APP_FILE_URL = "https://able.iswkoman.com/images/";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load profile data");
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreview(imageUrl);
      setFile(selectedFile);
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let profileImage = data?.profileImage;

      if (preview && file) {
        const response = await upload(file);
        if (response?.data) {
          profileImage = response.data;
        }
      }

      const updatedUserData = {
        ...(profileImage && { image: profileImage }),
      };

      await updateUser(data?._id, updatedUserData);
      const response = await getUser();
      setData(response.data);
      setPreview(null);
      setFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-9">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Change Profile
        </h2>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center justify-center rounded-lg bg-primary py-2 px-6 text-sm font-medium text-white hover:bg-opacity-90 disabled:bg-opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="flex justify-center items-center">
        <div className="w-full mx-4 bg-white rounded-lg shadow-xl overflow-hidden dark:bg-gray-700">
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative h-32 w-32 rounded-full bg-white p-2 shadow-lg overflow-hidden">
                <img
                  src={preview || `${VITE_APP_FILE_URL}${data?.image}`}
                  alt="profilePic"
                  className="rounded-full w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200">
                  <label
                    htmlFor="profileImage"
                    className="cursor-pointer flex items-center justify-center w-full h-full rounded-full text-transparent hover:text-white"
                  >
                    <input
                      type="file"
                      name="profileImage"
                      id="profileImage"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleChange}
                    />
                    <span className="flex flex-col items-center">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="mt-1 text-xs">Change Photo</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pt-20 pb-6 text-center">
            <h3 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
              {data?.name}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {data?.designation}
            </p>
            {data?.counsellorType?.length > 0 && (
              <div className="mt-4 mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium dark:bg-blue-200 dark:text-blue-900">
                  {data?.counsellorType?.length > 0
                    ? data.counsellorType.join(", ")
                    : "No Counselor Type"}
                </div>
              </div>
            )}

            <div className="mt-6">
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-6 justify-center">
                {data?.mobile && (
                  <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-600">
                    <BsFillTelephoneFill className="text-xl text-blue-500 dark:text-blue-300" />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">
                      {data?.mobile}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-600">
                  <BsFillEnvelopeFill className="text-xl text-blue-500 dark:text-blue-300" />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    {data?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
