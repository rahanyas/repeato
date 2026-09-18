import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import axiosInstance from '../../utils/axiosWrapper'

const MIN_PAPERS_FOR_PREDICTION = 3;

const UploadView = () => {
  const [subject, setSubject] = useState("");
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  const [pendingFile, setPendingFile] = useState(null);
  const [paperYear, setPaperYear] = useState("");

  const parsedPapers = papers.filter(
    (paper) => paper.status === "done"
  );

  const canPredict =
    parsedPapers.length >= MIN_PAPERS_FOR_PREDICTION;

  const papersNeeded = Math.max(
    MIN_PAPERS_FOR_PREDICTION - parsedPapers.length,
    0
  );

  // -----------------------------------------
  // Select PDF
  // -----------------------------------------
  const handleFile = (file) => {
    setError("");

    if (!file) return;

    // PDF only
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Only PDF files are supported.");
      return;
    }

    // Duplicate filename check
    const duplicate = papers.some(
      (paper) => paper.name === file.name
    );

    if (duplicate) {
      setError("This question paper has already been added.");
      return;
    }

    // Ask for year before uploading
    setPendingFile(file);
    setPaperYear("");
  };

  // -----------------------------------------
  // Upload PDF
  // -----------------------------------------
  const uploadPaper = async () => {
    if (!pendingFile) return;

    setError("");

    if (!subject.trim()) {
      setError("Please enter the subject name.");
      return;
    }

    if (!paperYear) {
      setError("Please enter the paper year.");
      return;
    }

    const year = Number(paperYear);

    if (
      !Number.isInteger(year) ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      setError("Please enter a valid paper year.");
      return;
    }

    const newPaperId = Date.now();

    const newPaper = {
      id: newPaperId,
      name: pendingFile.name,
      year,
      status: "processing",
      text: "",
      pages: 0,
    };

    setPapers((prev) => [...prev, newPaper]);

    const formData = new FormData();

    formData.append("paper", pendingFile);
    formData.append("year", String(year));
    formData.append("subject", subject.trim());

    setPendingFile(null);
    setPaperYear("");

    try {
      const response = await axiosInstance.post(
        "/api/papers/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const uploadedPaper = response.data.paper;

      setPapers((prev) =>
        prev.map((paper) =>
          paper.id === newPaperId
            ? {
                ...paper,
                status: "done",
                text: uploadedPaper.text,
                pages: uploadedPaper.pages,
              }
            : paper
        )
      );
    } catch (err) {
      console.log("Upload error:", err);

      const message =
        err.response?.data?.msg ||
        "Failed to upload and process the PDF.";

      setPapers((prev) =>
        prev.map((paper) =>
          paper.id === newPaperId
            ? {
                ...paper,
                status: "error",
              }
            : paper
        )
      );

      setError(message);
    }
  };

  // -----------------------------------------
  // Remove paper
  // -----------------------------------------
  const removePaper = (id) => {
    setPapers((prev) =>
      prev.filter((paper) => paper.id !== id)
    );
  };

  // -----------------------------------------
  // Predict
  // -----------------------------------------
  const handlePredict = () => {
    if (!canPredict) {
      setError(
        `Minimum ${MIN_PAPERS_FOR_PREDICTION} papers are needed for prediction.`
      );
      return;
    }

    console.log("Predict using:", parsedPapers);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Upload Question Papers
        </h1>

        <p className="text-gray-500 mt-2">
          Upload previous question papers to generate predictions.
        </p>
      </div>

      {/* Subject */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subject
        </label>

        <input
          type="text"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            setError("");
          }}
          placeholder="Enter subject name"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
        />
      </div>

      {/* Upload Area */}
      <label
        htmlFor="paper-upload"
        className="flex flex-col items-center justify-center w-full min-h-[220px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-gray-500 transition"
      >
        <Upload size={40} className="text-gray-500 mb-4" />

        <p className="text-gray-700 font-medium">
          Click to upload a question paper
        </p>

        <p className="text-sm text-gray-500 mt-2">
          PDF files only
        </p>

        <input
          id="paper-upload"
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            handleFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </label>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mt-4 p-3 rounded-lg bg-red-50 text-red-600">
          <AlertCircle size={18} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Papers needed message */}
      {papers.length > 0 && !canPredict && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50 text-yellow-700 text-sm">
          {papersNeeded === 1
            ? "1 more paper is needed for prediction."
            : `${papersNeeded} more papers are needed for prediction.`}
        </div>
      )}

      {/* Papers List */}
      {papers.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            Uploaded Papers
          </h2>

          <div className="space-y-3">
            {papers.map((paper) => (
              <div
                key={paper.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <FileText
                    size={28}
                    className="text-gray-500 shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-medium truncate">
                      {paper.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Year: {paper.year}
                    </p>

                    {paper.status === "processing" && (
                      <p className="text-sm text-yellow-600 mt-1">
                        Processing...
                      </p>
                    )}

                    {paper.status === "done" && (
                      <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                        <CheckCircle size={15} />
                        <span>
                          Parsed successfully
                          {paper.pages
                            ? ` • ${paper.pages} pages`
                            : ""}
                        </span>
                      </div>
                    )}

                    {paper.status === "error" && (
                      <p className="text-sm text-red-600 mt-1">
                        Upload failed
                      </p>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removePaper(paper.id)}
                  className="p-2 text-gray-500 hover:text-red-600 transition"
                  title="Remove paper"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Predict */}
      <div className="mt-8">
        <button
          type="button"
          onClick={handlePredict}
          disabled={!canPredict}
          className={`w-full py-3 rounded-lg font-medium transition ${
            canPredict
              ? "bg-black text-white hover:bg-gray-800"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          Predict Questions
        </button>
      </div>

      {/* Year Modal */}
      {pendingFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold">
                Paper Year
              </h2>

              <button
                type="button"
                onClick={() => {
                  setPendingFile(null);
                  setPaperYear("");
                }}
                className="text-gray-500 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Which year is this question paper from?
            </p>

            <p className="text-sm font-medium text-gray-800 mb-4 truncate">
              {pendingFile.name}
            </p>

            <input
              type="number"
              value={paperYear}
              onChange={(e) => setPaperYear(e.target.value)}
              placeholder="Enter year (e.g. 2024)"
              min="1900"
              max={new Date().getFullYear()}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
            />

            <div className="flex gap-3 mt-6">

              <button
                type="button"
                onClick={() => {
                  setPendingFile(null);
                  setPaperYear("");
                }}
                className="flex-1 py-3 rounded-lg border border-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={uploadPaper}
                disabled={!paperYear}
                className={`flex-1 py-3 rounded-lg ${
                  paperYear
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Upload
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadView;