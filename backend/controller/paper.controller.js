import extraPdfText from "../utils/pdfParser.js";

export const uploadPaper = async (req, res) => {
  try {
    if(!req.file){
      return res.status(400).json({
        msg : 'No PDF file uploaded'
      });
    };

    const {text, pages} = await extraPdfText(req.file.buffer);
    
    if(!text || !text.trim()){
      return res.status(422).json({
        msg : 'could not extract from this PDF. It may be scanned document'
      });
    }

    return res.status(200).json({
      msg : "PDF uploaded and parsed successfully",
      paper : {
        name : req.file.originalname,
        pages,
        text
      }
    })
  } catch (err) {
    console.log('error in upload paper contr : ', err);
    return res.status(500).json({msg : 'Failed to process PDF'})
  }
};

