import React from "react";

const ResourceView = ({ video }) => {
  const handleDownload = () => {
    const fileExtension = video?.videoUrl?.split(".").pop();
    const urlWithoutExtension = video?.videoUrl.substring(
      0,
      video?.videoUrl.lastIndexOf(".")
    );

    fetch(urlWithoutExtension)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");

        // Set the download filename with the dynamic extension
        link.download = `${video?.videoTitle}.${fileExtension}`;
        link.href = url;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  return (
    <div className="lg:py-32 md:py-20 py-10 flex justify-center items-center  bg-white lg:px-10 md:px-6 px-3">
      <div>
        <h4 className="text-2xl">
          Resource for{" "}
          <span className="font-bold"> {`"${video?.videoTitle}"`}</span> lesson
        </h4>
        <div className="mt-8 flex justify-center items-center">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceView;
