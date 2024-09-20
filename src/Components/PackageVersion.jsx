import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUserAlt,
  FaCodeBranch,
  FaBug,
  FaLink,
  FaFileArchive,
} from "react-icons/fa";
import Header from "./Header";

const PackageVersion = () => {
  const { packageName, version } = useParams();
  const [packageVersionData, setPackageVersionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackageVersionData = async () => {
      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${packageName}/${version}`
        );
        setPackageVersionData(response.data);
      } catch (err) {
        setError("Version not found or package does not exist");
      }
    };

    fetchPackageVersionData();
  }, [packageName, version]);

  if (error) {
    return (
      <div className="flex justify-center mt-10 text-red-500">{error}</div>
    );
  }

  if (!packageVersionData) {
    return <div className="flex justify-center mt-10">Loading...</div>;
  }

  const maintainers = packageVersionData.maintainers || [];
  const repositoryUrl =
    packageVersionData.repository?.url || "Repository not available";
  const bugsUrl = packageVersionData.bugs?.url || "Bugs page not available";
  const homepage = packageVersionData.homepage || "Homepage not available";
  const formattedRepoUrl = repositoryUrl.replace("git+", "");

  return (
    <>
      <Header />
      <div className="h-auto w-full mt-10 font-serif px-5">
        <div className="bg-white shadow-md rounded-lg p-10 max-w-4xl mx-auto">
          <h1 className="text-center text-5xl font-extrabold text-gray-800 mb-4">
            {packageName}
          </h1>
          <p className="text-center text-xl text-gray-600 mb-8">
            {packageVersionData.description}
          </p>
          <h2 className="text-center text-2xl font-bold text-indigo-600 mb-6">
            <span className="text-black">Version :</span> {version}
          </h2>
          <hr className="mt-5" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg mt-8">
            <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-sm">
              <FaLink className="text-2xl text-blue-600 mr-4" />
              <p className="break-all">
                <b>Homepage</b>:{" "}
                {homepage !== "Homepage not available" ? (
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
            <div className="flex flex-col p-5 bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <FaUserAlt className="text-2xl text-purple-600 mr-4" />
                <p className="font-bold">Maintainers:</p>
              </div>
              {maintainers.length > 0 ? (
                <ul className="ml-6">
                  {maintainers.map((maintainer, index) => (
                    <li key={index} className="pl-3 list-disc">
                      {maintainer.name} ({maintainer.email})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="pl-10">No maintainers available</p>
              )}
            </div>
            <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-sm">
              <FaCodeBranch className="text-2xl text-green-600 mr-4" />
              <p className="break-all">
                <b>Repository</b>:{" "}
                {repositoryUrl !== "Repository not available" ? (
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
            <div className="flex items-center justify-start p-5 bg-gray-100 rounded-lg shadow-sm">
              <div className="mr-4 flex-shrink-0">
                <FaBug className="text-4xl text-red-600" /> {/* Larger icon */}
              </div>
              <p className="break-all">
                <b>Bugs</b>:{" "}
                {bugsUrl !== "Bugs page not available" ? (
                  <a
                    href={bugsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-500 hover:underline hover:text-blue-700"
                  >
                    {bugsUrl}
                  </a>
                ) : (
                  bugsUrl
                )}
              </p>
            </div>
            <div className="flex items-center p-5 bg-gray-100 rounded-lg shadow-sm">
              <FaFileArchive className="text-2xl text-yellow-600 mr-4" />
              <p className="break-all">
                <b>Tarball</b>:{" "}
                <a
                  href={packageVersionData.dist?.tarball}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline hover:text-blue-700"
                >
                  {packageVersionData.dist?.tarball}
                </a>
              </p>
            </div>
          </div>
          <p className="mt-8 text-center text-lg text-gray-800">
            <b>License</b>: {packageVersionData.license}
          </p>
        </div>
      </div>
    </>
  );
};

export default PackageVersion;
