import React from "react";
import { useLocation } from "react-router-dom";
import { FaLink, FaCodeBranch, FaUserAlt, FaCalendarAlt } from "react-icons/fa"; // Icons
import Header from "./Header";

const PackageDetails = () => {
  const location = useLocation();
  const { packageData, packageName } = location.state || {};

  if (!packageData) {
    return (
      <div className="flex justify-center mt-10 text-red-500">
        No package data found. Please try again.
      </div>
    );
  }

  const homepage = packageData.homepage || "No homepage available";
  const repositoryUrl =
    packageData.repository?.url || "No repository URL available";

  const formattedRepoUrl = repositoryUrl.includes("No repository URL available")
    ? repositoryUrl
    : repositoryUrl.replace("git+", "");

  const maintainers = packageData.maintainers || [];

  const creationDate = packageData.time?.created
    ? new Date(packageData.time.created).toLocaleDateString()
    : "Creation date not available";

  const lastModifiedDate = packageData.time?.modified
    ? new Date(packageData.time.modified).toLocaleDateString()
    : "Last modified date not available";

  return (
    <>
      <Header />
      <div className="h-auto w-full mt-10 font-serif px-5">
        <div className="bg-white shadow-md rounded-lg p-10 max-w-4xl mx-auto">
          <h1 className="text-center text-6xl font-extrabold text-gray-800 mb-4">
            {packageName}
          </h1>
          <p className="text-center text-xl text-gray-600 mb-8">
            {packageData.description}
          </p>
          <p className="text-center text-2xl font-bold text-indigo-600 mb-6">
            <span className="text-black">Current Version :</span>{" "}
            {packageData["dist-tags"].latest}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg">
            <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-sm">
              <FaLink className="text-2xl text-blue-600 mr-4" />
              <p>
                <b>Homepage</b>:{" "}
                {packageData.homepage ? (
                  <a
                    href={homepage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-700"
                  >
                    {homepage}
                  </a>
                ) : (
                  homepage
                )}
              </p>
            </div>
            <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-sm">
              <FaCodeBranch className="text-2xl text-green-600 mr-4" />
              <p>
                <b>Repository</b>:{" "}
                {packageData.repository?.url ? (
                  <a
                    href={formattedRepoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-700"
                  >
                    {formattedRepoUrl}
                  </a>
                ) : (
                  repositoryUrl
                )}
              </p>
            </div>
            <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-sm">
              <FaUserAlt className="text-2xl text-purple-600 mr-4" />
              <p>
                <b>Maintainers</b>:{" "}
                {maintainers.length > 0
                  ? maintainers.map((maintainer, index) => (
                      <span key={index} className="block">
                        {maintainer.name}
                      </span>
                    ))
                  : "No maintainers available"}
              </p>
            </div>

            {/* Creation Date */}
            <div className="px-5 items-center bg-gray-100 rounded-lg shadow-sm">
              <span className="flex mb-8 mt-10">
                <FaCalendarAlt className="text-2xl text-red-600 mr-4" />
                <p>
                  <b>Creation Date</b>: {creationDate}
                </p>
              </span>
              <span className="flex">
                <FaCalendarAlt className="text-2xl text-yellow-600 mr-4" />
                <p>
                  <b>Last Modified Date</b>: {lastModifiedDate}
                </p>
              </span>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default PackageDetails;
