import {PDFParse} from 'pdf-parse';

const extraPdfText = async (buffer) => {
  if(!buffer){
    throw new Error("PDF buffer is required")
  }

  const parser = new PDFParse({
    data : buffer
  });

  try {
    const result = await parser.getText();

    return {
      text : result.text,
      pages : result.total
    }
  } finally{
    await parser.destroy()
  }
};

export default extraPdfText;