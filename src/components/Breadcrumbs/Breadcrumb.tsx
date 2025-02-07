import { Link, useNavigate } from "react-router-dom";
interface BreadcrumbProps {
  pageName: string;
  titleName: string;
}
const Breadcrumb = ({ pageName, titleName }: BreadcrumbProps) => {
  const navigate = useNavigate();
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
    {/* Back Button and Page Name in a Row */}
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer text-black dark:text-white hover:text-blue-600"
        onClick={() => navigate(-1)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </h2>
    </div>
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" to="/">
              {titleName} /
            </Link>
          </li>
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
