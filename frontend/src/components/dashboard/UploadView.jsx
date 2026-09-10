
import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Loader2,
  Plus,
  Sparkles,
  AlertCircle,
  Trash2,
} from "lucide-react";

const MIN_PAPERS_FOR_PREDICTION = 3;

export default function UploadView() {
  const inputRef = useRef(null);

  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  const parsedPapers = papers.filter(
    (paper) => paper.status === "done"
  );

  const canPredict =
    parsedPapers.length >= MIN_PAPERS_FOR_PREDICTION;

  const papersNeeded = Math.max(
    MIN_PAPERS_FOR_PREDICTION - parsedPapers.length,
    0
  );

  const handleFile = (file) => {
    if (!file) return;

    setError("");

    // PDF only
    const isPdf =
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf");

    if (!isPdf) {
      setError("Only PDF files are supported.");
      return;
    }

    if (papers.some((paper) => paper.name === file.name)) {
      setError("This question paper has already been added.");
      return;
    }

    const id = `${file.name}-${Date.now()}`;

    setPapers((current) => [
      ...current,
      {
        id,
        name: file.name,
        status: "processing",
      },
    ]);

    // Temporary parsing simulation.
    // Replace this with the real upload/extraction API later.
    window.setTimeout(() => {
      setPapers((current) =>
        current.map((paper) =>
          paper.id === id
            ? { ...paper, status: "done" }
            : paper
        )
      );
    }, 900);
  };

  const handleInputChange = (event) => {
    handleFile(event.target.files?.[0]);

    // Allows the same file to be selected again later.
    event.target.value = "";
  };

  const openFilePicker = () => {
    setError("");
    inputRef.current?.click();
  };

  const removePaper = (id) => {
    setPapers((current) =>
      current.filter((paper) => paper.id !== id)
    );

    setError("");
  };

  const handlePredict = () => {
    if (!canPredict) {
      setError(
        "Minimum 3 question papers are required for prediction."
      );
      return;
    }

    // Prediction API will be connected here.
    console.log("Predict from papers:", parsedPapers);
  };

  return (
    <div className="space-y-6">

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Upload area */}
      <button
        type="button"
        onClick={openFilePicker}
        className="w-full border-2 border-dashed border-stone-300 rounded-lg p-8 sm:p-12 flex flex-col items-center justify-center text-center bg-white hover:border-teal-500 transition-colors cursor-pointer"
      >
        <UploadCloud
          className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 mb-3"
          strokeWidth={1.5}
        />

        <p className="text-stone-700 font-medium">
          Upload one question paper
        </p>

        <p className="text-xs text-stone-500 mt-1 font-mono">
          PDF files only
        </p>
      </button>

      {/* Error message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700 font-mono">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Uploaded papers */}
      {papers.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-lg divide-y divide-stone-100">

          {/* Header */}
          <div className="px-4 sm:px-5 py-3 border-b border-stone-100 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-stone-900">
                Question papers
              </p>

              <p className="text-xs text-stone-500 font-mono mt-0.5">
                {parsedPapers.length} of{" "}
                {MIN_PAPERS_FOR_PREDICTION} minimum papers ready
              </p>
            </div>

            <span className="text-xs font-mono text-stone-500 shrink-0">
              {papers.length} uploaded
            </span>
          </div>

          {/* Paper list */}
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3.5"
            >
              {/* File */}
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-4 h-4 text-stone-400 shrink-0" />

                <span className="text-sm text-stone-700 font-mono truncate">
                  {paper.name}
                </span>
              </div>

              {/* Status + Remove */}
              <div className="flex items-center gap-3 shrink-0">

                {paper.status === "done" ? (
                  <span className="flex items-center gap-1.5 text-xs font-mono text-teal-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />

                    <span className="hidden sm:inline">
                      parsed
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-mono text-amber-600">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />

                    <span className="hidden sm:inline">
                      extracting questions…
                    </span>
                  </span>
                )}

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => removePaper(paper.id)}
                  title="Remove paper"
                  className="p-1.5 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prediction controls */}
      {papers.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Status */}
            <div>
              <p className="text-sm font-semibold text-stone-900">
                {canPredict
                  ? "Ready to predict"
                  : "More papers required"}
              </p>

              <p className="text-xs text-stone-500 font-mono mt-1">
                {canPredict
                  ? `${parsedPapers.length} papers ready for prediction.`
                  : `Minimum ${MIN_PAPERS_FOR_PREDICTION} papers are needed for prediction. Add ${papersNeeded} more.`}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 shrink-0">

              {/* Add another */}
              <button
                type="button"
                onClick={openFilePicker}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border border-stone-300 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add another paper
              </button>

              {/* Predict */}
              <button
                type="button"
                onClick={handlePredict}
                disabled={!canPredict}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-teal-700 text-white text-sm font-medium hover:bg-teal-800 transition-colors disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                Predict
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

