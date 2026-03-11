import jsPDF from "jspdf";

export const exportTranscript = (data)=>{

 const doc = new jsPDF();

 doc.text("StudentToolsNG Transcript",20,20);

 let y = 40;

 data.semesters.forEach((s)=>{

  doc.text(
   `${s.semesterName} CGPA: ${s.cgpa}`,
   20,
   y
  );

  y+=10;

 });

 doc.text(
  `Cumulative CGPA: ${data.cumulativeCGPA}`,
  20,
  y+20
 );

 doc.save("transcript.pdf");

};