import {
  AlignmentType,
  Document,
  HeadingLevel,
  Paragraph,
  TextRun
} from "docx";

export class DocxService {
  public create(firstName: string | undefined, lastName: string | undefined, email: string | undefined, phone: string | undefined, address: string | undefined, university: string | undefined): Document {
    const document = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Medical Doctor's Note",
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER
            }),
            // Empty line
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            // Introduction
            new Paragraph({
              text: "This note certifies that the following individual has been evaluated by a medical doctor and is deemed eligible for any necessary medical treatment or time off work.",
              alignment: AlignmentType.LEFT
            }),
            // Empty line
            new Paragraph({
              children: [new TextRun("")]
            }),
            // Patient's information
            new Paragraph({
              text: `Patient: ${firstName || ""} ${lastName || ""}`,
              alignment: AlignmentType.LEFT,
              spacing: {
                before: 100, // Add space before this paragraph
              },
            }),
            new Paragraph({
              text: `Email: ${email || ""}`,
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              text: `Phone: ${phone || ""}`,
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              text: `Address: ${address || ""}`,
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              text: `University: ${university || ""}`,
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            // Medical advice
            new Paragraph({
              text: "The patient is advised to follow the prescribed treatment plan and to contact the medical doctor if any further assistance is required.",
              alignment: AlignmentType.LEFT
            }),
            // Signature line
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            // Date placeholder near signature
            new Paragraph({
              text: "Date: _______________________",
              alignment: AlignmentType.LEFT
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              children: [new TextRun("")]
            }),
            new Paragraph({
              text: "Signature of Medical Doctor:  _______________________",
              alignment: AlignmentType.LEFT
            })
          ]
        }
      ]
    });

    return document;
  }

}
