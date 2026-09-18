import extraPdfText from "../utils/pdfParser.js";
import Subject from '../model/subject.modal.js'

export const uploadPaper = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        msg: "No PDF file uploaded",
      });
    }

    const { year, subject } = req.body;

    if (!year) {
      return res.status(400).json({
        msg: "Paper year is required",
      });
    }

    if (!subject) {
      return res.status(400).json({
        msg: "Subject is required",
      });
    }

    const { text, pages } = await extraPdfText(req.file.buffer);

    if (!text || !text.trim()) {
      return res.status(422).json({
        msg: "Could not extract from this PDF. It may be a scanned document",
      });
    }

    // req.user.id comes from your JWT middleware
    const userId = req.user.id;

    // Find the subject document for this user
    let subjectDoc = await Subject.findOne({
      subject: subject.trim(),
      user: userId,
    });

    // If subject doesn't exist for this user, create it
    if (!subjectDoc) {
      subjectDoc = new Subject({
        subject: subject.trim(),
        user: userId,
        papers: [],
      });
    }

    // Prevent uploading the same year twice for the same subject
    const yearExists = subjectDoc.papers.some(
      (paper) => paper.year === Number(year)
    );

    if (yearExists) {
      return res.status(409).json({
        msg: `A paper for ${year} already exists for this subject`,
      });
    }

    // Add the new paper
    subjectDoc.papers.push({
      year: Number(year),
      name: req.file.originalname,
      text,
      pages,
    });

    await subjectDoc.save();

    return res.status(200).json({
      msg: "PDF uploaded and saved successfully",

      paper: {
        year: Number(year),
        name: req.file.originalname,
        pages,
        text,
      },
    });
  } catch (err) {
    console.log("error in upload paper contr : ", err);

    return res.status(500).json({
      msg: "Failed to process PDF",
    });
  }
};


export const getPapers = async (req, res) => {
  try {
    const userId = req.user.id;
    const subjects = await Subject.find({
      user : userId
    }).sort({subject : 1});

    return res.status(200).json({
      subjects
    });
  } catch (err) {
    console.log('error in get papers controller : ', err);
    return res.status(500).json({
      msg : 'Failed to fetch papers'
    });
  }
}