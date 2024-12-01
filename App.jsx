import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import LaboratoryLearning from './LaboratoryLearning';
import SpecificationTable from './SpecificationTable';
import PBOSAndRationale from './PBOSAndRationale';
import './App.css';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    co1: '',
    co2: '',
    co3: '',
    co4: '',
    co5: '',
    co6: '',
    program: '',
    category: '',
    code: '',
    title: '',
    rationale: '',
    criteria1: '',
    criteria2: '',
    criteria3: '',
    criteria4: '',
    marks1: 0,
    marks2: 0,
    marks3: 0,
    marks4: 0,
    totalCriteriaMarks: 0,
    selfLearning1: '',
    selfLearning2: '',
    selfLearning3: '',
    selfLearning4: '',
    selfLearningMarks1: 0,
    selfLearningMarks2: 0,
    selfLearningMarks3: 0,
    selfLearningMarks4: 0,
    units: Array(6).fill({ unitName: '', SLO: '' }),
    eReferences: Array(10).fill(''),
    eReferences1: Array(5).fill(''),
    industryExperts: Array(10).fill({ name: '', designation: '', institute: '' }),
    questionData: [
      { qNo: 1, bit1: '3R2', bit2: '4R2', bit3: '6R2', bit4: '6R2', bit5: '6R2', bit6: '2R2', bit7: '2R2', options: 'C: 0 O: 7' },
      { qNo: 2, bit1: '1U4', bit2: '1U4', bit3: '2U4', bit4: '4U4', bit5: '2U4', bit6: ' ', bit7: '', options: 'C: 3 O: 5' },
      { qNo: 3, bit1: '4U4', bit2: '5U4', bit3: '5U4', bit4: '5U4', bit5: '5U4', bit6: ' ', bit7: '', options: 'C: 5 O: 5' },
      { qNo: 4, bit1: '5A4', bit2: '6A4', bit3: '6A4', bit4: '6A4', bit5: '5A4', bit6: ' ', bit7: '', options: 'C: 10 O: 10' },
      { qNo: 5, bit1: '6A4', bit2: '6A4', bit3: '6A4', bit4: ' ', bit5: ' ', bit6: ' ', bit7: ' ', options: 'C: 10 O: 10' },
      { qNo: 6, bit1: '3A6', bit2: '3A6', bit3: '3A6', bit4: ' ', bit5: ' ', bit6: ' ', bit7: ' ', options: 'C: 2 O: 3' },
    ],
    columns: ["Course Outcomes", "PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PSO1", "PSO2"],
    rows: [
      ["CO1", "3", "3", "3", "-", "3", "-", "-", "3", "-"],
      ["CO2", "3", "3", "3", "3", "-", "-", "-", "3", "-"],
      ["CO3", "3", "-", "-", "-", "-", "-", "-", "3", "-"],
      ["CO4", "3", "3", "3", "3", "-", "-", "-", "3", "-"],
      ["CO5", "3", "3", "3", "3", "-", "-", "-", "3", "-"],
      ["CO6", "3", "3", "3", "-", "-", "-", "-", "3", "-"],
    ],


  });

  const [tableData, setTableData] = useState([
    { unitNo: "1", unit: "Basics of Computer Network", hours: "8", co: "C/O", levels: "R: 0, U: 0, A: 6 /R: 0, U: 0, A: 6", totalMarks: "14,6" },
    { unitNo: "2", unit: "Network Topologies and Networking Standard", hours: "12", co: "C/O", levels: "R: 0, U: 4, A: 6 /R: 0, U: 0, A: 6", totalMarks: "10,4" },
    { unitNo: "3", unit: "The Reference Model", hours: "8", co: "C/O", levels: "R: 0, U: 0, A: 6 /R: 0, U: 0, A: 6", totalMarks: "8,10" },
    { unitNo: "4", unit: "Transmission Media", hours: "10", co: "C/O", levels: "R: 0, U: 8, A: 6 /R: 0, U: 0, A: 6", totalMarks: "14,8" },
    { unitNo: "5", unit: "Network Devices", hours: "8", co: "C/O", levels: "R: 0, U: 0, A: 10 /R: 0, U: 0, A: 6", totalMarks: "14,8" },
    { unitNo: "6", unit: "IP Protocol and network applications", hours: "12", co: "C/O", levels: "R: 0, U: 8, A: 12 /R: 0, U: 0, A: 6", totalMarks: "10,4" },
    { unitNo: "7", unit: "Total", hours: "48", co: "C", levels: "R=10\tU=24\tA=36", totalMarks: "70" },
    { unitNo: "8", unit: "Total", hours: "48", co: "O", levels: "R=8\tU=12\tA=20", totalMarks: "40" },
  ]);

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [inputs, setInputs] = useState(Array(15).fill(''));
  const [inputs1, setInputs1] = useState(Array(5).fill(''));
  const [inputs2, setInputs2] = useState(Array(5).fill(''));
  const [questionData, setQuestionData] = useState([
    { qNo: 1, bit1: '3R2', bit2: '4R2', bit3: '4R2', bit4: '6R2', bit5: '6R2', bit6: '2R2', bit7: '2R2', options: 'C: 5 O: 7' },
    { qNo: 2, bit1: '1U4', bit2: '1U4', bit3: '2U4', bit4: '4U4', bit5: '4U4', bit6: '', bit7: '', options: 'C: 3 O: 5' },
    { qNo: 3, bit1: '4U4', bit2: '5U4', bit3: '5U4', bit4: '5R4', bit5: '5U4', bit6: '', bit7: '', options: 'C: 3 O: 5' },
    { qNo: 4, bit1: '5A4', bit2: '6U4', bit3: '6A4', bit4: '6U4', bit5: '5R4', bit6: '', bit7: '', options: 'C: 3 O: 5' },
    { qNo: 5, bit1: '1A6', bit2: '2A6', bit3: '1A6', bit4: '', bit5: '', bit6: '', bit7: '', options: 'C: 2 O: 3' },
    { qNo: 6, bit1: '3A6', bit2: '4A6', bit3: '3A6', bit4: '', bit5: '', bit6: '', bit7: '', options: 'C: 2 O: 3' },
  ]);
  


  
  const [showCourseDetails, setShowCourseDetails] = React.useState(false);
  const [showCourseOutcomes, setShowCourseOutcomes] = React.useState(false);
  const [showCourseLearning, setShowCourseLearning] = React.useState(false);
  const [showAssessmentScheme, setShowAssessmentScheme] = React.useState(false);
  const [showSelfStudyDetails, setShowSelfStudyDetails] = React.useState(false);
  const [showMarks, setShowMarks] = React.useState(false);
  const [showReferences, setShowReferences] = React.useState(false);
  const [showEquipments, setShowEquipments] = React.useState(false);
  const [showExpert, setExpert] = React.useState(false);
  const [showPbos, setPbos] = React.useState(false);

   const handleInputChange = (index, field, value) => {
    const updatedData = [...tableData];
    updatedData[index][field] = value; // Update the specific field
    setTableData(updatedData); // Update state with new table data
  };
  const handleInputChange2 = (index, field, value) => {
    const updatedData = [...questionData];
    updatedData[index][field] = value;
    setQuestionData(updatedData);
  };
  




  const [labContent, setLabContent] = useState({});
  const [viewLaboratory, setViewLaboratory] = useState(false);
  const [viewSpecificationTable, setViewSpecificationTable] = useState(false);
  const [viewPBOSAndRationale, setViewPBOSAndRationale] = useState(false);

  const handleChange1 = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
  };
  const handleChange2 = (index, value) => {
    const updatedInputs1 = [...inputs1];
    updatedInputs1[index] = value;
    setInputs1(updatedInputs1);
  };
  const handleChange3 = (index, value) => {
    const updatedInputs2 = [...inputs2];
    updatedInputs2[index] = value;
    setInputs2(updatedInputs2);
  };



  const handleChange = (e) => {
    const { id, value, type } = e.target;
    const val = type === 'number' ? parseFloat(value) || 0 : value;

    if (id.startsWith('unit')) {
      const index = parseInt(id.replace('unit', '').charAt(0)) - 1;
      const field = id.replace(`unit${index + 1}_`, '');
      const newUnits = [...formData.units];
      newUnits[index] = { ...newUnits[index], [field]: val };
      setFormData({ ...formData, units: newUnits });
    } else if (id.startsWith('expert')) {
      const index = parseInt(id.replace('expert', '').charAt(0)) - 1;
      const field = id.replace(`expert${index + 1}_`, '');
      const newExperts = [...formData.industryExperts];
      newExperts[index] = { ...newExperts[index], [field]: val };
      setFormData({ ...formData, industryExperts: newExperts });
    } else if (id.startsWith('reference')) {
      const index = parseInt(id.replace('reference', ''), 10) - 1;
      const newEReferences = [...formData.eReferences];
      newEReferences[index] = value;
      setFormData({ ...formData, eReferences: newEReferences });
    } else {
      setFormData({ ...formData, [id]: val });
    }
  };


  const handleLabContentChange = (content) => {
    setLabContent(content);
    setViewLaboratory(false);
  };

  const generatePDF = () => {
    const doc = new jsPDF('p', 'pt', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    let yOffset = 40;

    const headerText = "GOVERNMENT POLYTECHNIC, NAGPUR";
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    const headerTextWidth = doc.getTextWidth(headerText);
    doc.text(headerText, (pageWidth - headerTextWidth) / 2, yOffset);
    yOffset += 30;

    const subHeaderText = "COURSE CURRICULUM";
    doc.setFontSize(14);
    const subHeaderTextWidth = doc.getTextWidth(subHeaderText);
    doc.text(subHeaderText, (pageWidth - subHeaderTextWidth) / 2, yOffset);
    yOffset += 30;

    // ** Course Details in Centered Table **
    const courseDetails = [
      ['Program', formData.program],
      ['Course Category', formData.category],
      ['Course Code', formData.code],
      ['Course Title', formData.title]
    ];
    const tableWidth = pageWidth * 0.75;
    doc.autoTable({
      startY: yOffset,
      body: courseDetails,
      theme: 'grid',
      styles: { fontSize: 12, cellPadding: 5 },
      tableWidth: tableWidth,
      margin: { left: (pageWidth - tableWidth) / 2 }
    });
    yOffset = doc.lastAutoTable.finalY + 30;

    // Add R

    doc.setFontSize(14);
    doc.text("I Rationale:", 40, yOffset);
    yOffset += 30;
    doc.setFontSize(12);

    // Trim and ensure the rationale is well formatted without extra spaces
    const formattedRationale = formData.rationale.trim();

    // Define max width of text block
    const maxWidth = 500;

    // Use splitTextToSize to ensure text fits properly within page margins
    const rationaleLines = doc.splitTextToSize(formattedRationale, maxWidth);

    // Adjust spacing and make it look more aligned
    const lineHeight = 15; // You can play with this value to adjust line height

    rationaleLines.forEach((line) => {
      doc.text(line, 40, yOffset);
      yOffset += lineHeight;  // Adjust line height to control vertical spacing between lines
    });


    yOffset += 30;

doc.setFontSize(14);
doc.text("II Course Outcomes (COs):", 40, yOffset);
yOffset += 30;

doc.setFontSize(12);
const maxWidth1 = 500; // Set the maximum width for text lines
for (let i = 1; i <= 6; i++) {
  if (formData[`co${i}`]) {
    const lines = doc.splitTextToSize(`CO${i}: ${formData[`co${i}`]}`, maxWidth1);
    lines.forEach((line) => {
      doc.text(line, 40, yOffset);
      yOffset += 10; // Adjust line spacing as needed
    });
    yOffset += 30; // Space between different COs
  }
}
    yOffset += 30;

    // Add Learning Scheme
    doc.setFontSize(14);
    doc.text("III Learning Scheme:", 40, yOffset);
    yOffset += 15;
    doc.autoTable({
      startY: yOffset,
      head: [['Classroom Learning (CL)', 'Tutorial Learning (TL)', 'Self-Study (SL)', 'Laboratory Learning (LL)', 'Notional Learning Hours']],
      body: [['3', '1', '1', '2', '6']],
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 4 },
      margin: { top: 10, left: 40, right: 40 }
    });
    yOffset = doc.lastAutoTable.finalY + 30;

    // Add Assessment Scheme
    doc.setFontSize(14);
    doc.text("IV Assessment Scheme:", 40, yOffset);
    yOffset += 15;
    doc.autoTable({
      startY: yOffset,
      head: [['Formative Assessment (FA)', 'Summative Assessment (SA)', 'Theory Max', 'Practical Max', 'Theory Min', 'Practical Min']],
      body: [['30', '70', '40', '25', '10', '25']],
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 4 },
      margin: { top: 10, left: 40, right: 40 }
    });
    yOffset = doc.lastAutoTable.finalY + 30;

    // ** Add Page for Classroom Learning Content **
    doc.addPage();
    yOffset = 40;
    doc.setFontSize(14);
    doc.text("V Classroom Learning Content:", 40, yOffset);
    yOffset += 20;
    const classroomLearningData = formData.units.map((unit, index) => [
      `Unit ${index + 1}: ${unit.unitName || 'N/A'}`,
      unit.SLO || 'N/A'
    ]);
    doc.autoTable({
      startY: yOffset,
      head: [['Unit Name and Specific Learning Outcomes', 'Topics and Subtopics']],
      body: classroomLearningData,
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 4 },
      margin: { top: 10, left: 40, right: 40 }
    });
    yOffset = doc.lastAutoTable.finalY + 30;

    // ** Add Page for Laboratory Learning Content **
    // Add a new page for the laboratory content
    doc.addPage();
    yOffset = 40;

    // Create an array to hold the body of the table
    const bodyContent = [];

    // Iterate through each tab (tab1 and tab2) in labContent
    Object.keys(labContent).forEach(tab => {
      // For each tab, map the content of the editable cells into the bodyContent
      labContent[tab].forEach((content, index) => {
        // Each editable cell will be a separate row in the PDF
        bodyContent.push([`practical ${index + 1}: ${content}`]);
      });
    });

    // Generate the autoTable with the specified content
    yOffset = 40;
    doc.setFontSize(14);
    doc.text("VI Laboratory Learing Content:", 40, yOffset);
    yOffset += 20;
    doc.autoTable({
      startY: yOffset,
      head: [['Specific Learing Outcomes(SLO)']], // Header of the table
      body: bodyContent, // Use the created bodyContent for the table body
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 4 },
      margin: { top: 10, left: 40, right: 40 },
    });
    yOffset = doc.lastAutoTable.finalY + 30;

    // Update the yOffset for any subsequent content
    doc.addPage();
yOffset = 70;

doc.text("VII Self-Study Learning (SLO in Cognitive/Psychomotor Affective Domain): ", 50, yOffset);

doc.setFontSize(11);

yOffset += 50; // Adjust spacing after the title

inputs.forEach((input, i) => {
  // Split text into lines that fit within a width of 150
  const lines = doc.splitTextToSize(`${i + 1}. ${input}`, 500);
  doc.text(lines, 30, yOffset); // Render the split text at the specified position
  yOffset += 10 * lines.length + 32; // Adjust yOffset dynamically based on the number of lines
});


    doc.setFontSize(14);
    
    doc.addPage();
    doc.text("VIII Specification Table for Classroom Learning Assessment:", 40, 20);

    // Gap between title and table
    yOffset = 100;  // Adjusted gap after title

    // Specification Table
    const tableBody = tableData.map((row) => [
      row.unitNo,
      row.unit,
      row.hours,
      row.co,
      row.levels,
      row.totalMarks,
    ]);

    doc.autoTable({
      head: [["Unit No.", "Units", "Classroom Learning Hours", "C/O", "Levels from Cognition Process Dimension", "Total Marks"]],
      body: tableBody,
      startY: 60,
      theme: "grid",
    });

    // Space between the first table and next text (gap added here)
    yOffset = doc.lastAutoTable.finalY + 70; // Adding a gap between the table and text

    // Adding text for the next section
    doc.text("IX Question Paper Format for Summative Assessment (SA):", 40, yOffset);
    yOffset += 50;  // Adjusting yOffset for the next table

    // Question Paper Table
    doc.autoTable({
      startY: yOffset,
      head: [['Q. No.', 'Bit 1', 'Bit 2', 'Bit 3', 'Bit 4', 'Bit 5', 'Bit 6', 'Bit 7', 'Options']],
      body: questionData.map((row) => [
        row.qNo,
        row.bit1,
        row.bit2,
        row.bit3,
        row.bit4,
        row.bit5,
        row.bit6,
        row.bit7,
        row.options,
      ]),
      margin: { top: 10 },
      styles: { fontSize: 8, cellWidth: 'auto', overflow: 'linebreak' },
      theme: 'grid',
    });
    yOffset = doc.lastAutoTable.finalY + 60;

    // ** Add Page for Industry Experts **
   
    doc.setFontSize(14);
doc.text("X Scheme of Laboratory Formative Assessment (FA):", 40, yOffset);
yOffset += 50; // Add spacing before the table
doc.autoTable({
  startY: yOffset,
  head: [['S.N.', 'Criteria', 'Max. Marks']],
  body: [
    ['1', 'Installation and Configuration', '5'],
    ['2', 'Testing', '5'],
    ['3', 'Performance/Result', '10'],
    ['4', 'Viva Voce', '5'],
    ['', 'TOTAL', '25']
  ],
  theme: 'grid',
  styles: { fontSize: 11, cellPadding: 4 },
  margin: { top: 10, left: 40, right: 40 }
});
doc.addPage(); // Update yOffset after the table

// Add the second table: Scheme of Self-Learning Summative Assessment (SA)
doc.setFontSize(14);
yOffset = 60;
doc.setFontSize(14);
doc.text("XI Scheme of Self-Learning Summative Assessment (SA):", 14, yOffset);
yOffset += 40; // Add spacing before the table

doc.autoTable({
  startY: yOffset,
  head: [['S.N.', 'Criteria', 'Max. Marks']],
  body: [
    ['1', 'a', '5'],
    ['2', 'b', '5'],
    ['3', 'c', '10'],    ['4', 'd', '5'],
    ['', 'TOTAL', '25']
  ],
  theme: 'grid',
  styles: { fontSize: 11, cellPadding: 4 },
  margin: { top: 10, left: 14, right: 14 },
});

// Update yOffset after the first table
yOffset = doc.lastAutoTable.finalY + 100;

// Add the second table: COs-POs/PSOs Mapping Matrix
doc.setFontSize(14);
doc.text("XII COs-POs/PSOs Mapping Matrix:", 14, yOffset);
yOffset += 40; // Add spacing before the table

doc.autoTable({
  startY: yOffset,
  head: [formData.columns], // Table headers
  body: formData.rows, // Table rows
  theme: 'grid',
  styles: { fontSize: 11, cellPadding: 4 },
  margin: { top: 10, left: 14, right: 14 },
});


doc.addPage();
doc.text("XIII Textbooks References:", 40, 20);

yOffset = 40;
doc.autoTable({
  startY: yOffset,
  head: [['Sr.No', 'Reference']],
  body: formData.eReferences.map((reference, index) => [
    `${index + 1}`, reference
  ]),
  theme: 'grid',
  styles: { fontSize: 11, cellPadding: 4 },
  margin: { top: 10, left: 40, right: 40 }
});

    yOffset = doc.lastAutoTable.finalY + 160;

    doc.text("XV E-References:", 40, yOffset);
    yOffset += 60;
    doc.setFontSize(11);
    inputs2.forEach((input2, i) => {
      doc.text(`${i + 1}. ${input2}`, 30, yOffset);
      yOffset += 40;


    });


    doc.addPage();
    yOffset = 40;
    doc.setFontSize(14);
    doc.text("XV List of Major Equipment/Machineries with Specification:", 40, yOffset);
    yOffset += 25;
    doc.setFontSize(11);
    inputs1.forEach((input1, i) => {
      doc.text(`${i + 1}. ${input1}`, 30, yOffset);
      yOffset += 40;


    });
    yOffset = doc.lastAutoTable.finalY + 50;
    doc.setFontSize(14);
    doc.text(" XVI List of Industry Experts and Faculties who contributed for this curriculum:", 40, yOffset);
yOffset += 40;
    doc.autoTable({
      startY: yOffset,
      head: [['Expert Name', 'Designation', 'Institute']],
      body: formData.industryExperts.map((expert, index) => [
        expert.name,
        expert.designation,
        expert.institute
      ]),
      theme: 'grid',
      styles: { fontSize: 11, cellPadding: 4 },
      margin: { top: 10, left: 40, right: 40 }
    });
    yOffset = doc.lastAutoTable.finalY + 30;

    const pageHeight = doc.internal.pageSize.height; // Height of the page
    const marginBottom = 140; // Adjusted margin to ensure text is not too close to bottom
    const startingY = pageHeight - marginBottom - 40; // Start 40 units higher than the margin bottom

    // Define X-coordinate for left and right positions
    const leftX = 40; // For left-aligned text (adjust this as needed)
    const rightX = 340; // For right-aligned text (adjust this as needed)

    // Set font style
    doc.setFont("Times", "normal");
    doc.setFontSize(12);

    // Space between the name and designation (one line)
    const lineSpacing = 20; // Adjust this to control the line space

    // First Name and Title on the left
    doc.setFontSize(14)
    doc.text(`(${name1})`, leftX, startingY);
    doc.text("HOD & Chairman PBOS, CE", leftX, startingY + lineSpacing); // Add space between name and designation

    // Second Name and Title on the right
    doc.setFontSize(14)
    doc.text(`(${name2})`, rightX, startingY);
    doc.text("Member Secretary PBOS, CE", rightX, startingY + lineSpacing); // Add space between name and designation
    // ** Save the PDF **
    doc.save('course-details.pdf');
    const pdfOutput = doc.output('blob');
    return pdfOutput;

  };






  // Main function to generate and upload PDF
  const main = async () => {
    try {
      const pdfBlob = generatePDF();  // Generate the PDF
      await uploadToPinata(pdfBlob);  // Upload to Pinata
    } catch (error) {
      console.error('Error:', error);
    }
  };





  return (
    <div className="App">
      <div className="container">
        <h1> Government Polytechnnic, Nagpur</h1> <h4> (An Autonomous Institute of Govt. of Maharashtra)
          Near Mangalwari Bazar, Sadar, Nagpur-440001 </h4>
        <h2>Course Outline</h2>
        


        {viewLaboratory ? (
          <LaboratoryLearning onSave={handleLabContentChange} />
        ) : (
          <>
          {/* Buttons to show input sections */}
        <button onClick={() => setShowCourseDetails(!showCourseDetails)}>Toggle Course Details</button>
         {/* Course Details */}
         {showCourseDetails && (
            <>
            <h2>Enter course details : </h2>
            
            <input type="text" id="program" placeholder="Program" onChange={handleChange} />
            <input type="text" id="category" placeholder="Course Category" onChange={handleChange} />
            <input type="text" id="code" placeholder="Course Code" onChange={handleChange} />
            <input type="text" id="title" placeholder="Course Title" onChange={handleChange} />
            <input type="text" id="rationale" placeholder="Rationale" onChange={handleChange} />
                 
         </>
          )} 


        
        <button onClick={() => setShowCourseOutcomes(!showCourseOutcomes)}>Toggle Course Outcomes</button>
           


{ showCourseOutcomes && (
  <>
  
            {/* Course Input Fields */}
            <h2>Enter course outcomes : </h2>
            <input type="text" id="co1" placeholder="Course Outcome 1" onChange={handleChange} />
            <input type="text" id="co2" placeholder="Course Outcome 2" onChange={handleChange} />
            <input type="text" id="co3" placeholder="Course Outcome 3" onChange={handleChange} />
            <input type="text" id="co4" placeholder="Course Outcome 4" onChange={handleChange} />
            <input type="text" id="co5" placeholder="Course Outcome 5" onChange={handleChange} />
            <input type="text" id="co6" placeholder="Course Outcome 6" onChange={handleChange} />
  
  
   </>)}






        
        <button onClick={() => setShowCourseLearning(!showCourseLearning)}>Toggle Course Learning Scheme</button>
        
            {/* Criteria Inputs */}
            {showCourseLearning && (
              <>
               <h2>Enter course learning scheme details : </h2>
            <input type="text" id="criteria1" placeholder="Classroom learning" onChange={handleChange} />
            <input type="number" id="marks1" placeholder="marks 1" onChange={handleChange} />
            <input type="text" id="criteria2" placeholder="Tutorial Learning" onChange={handleChange} />
            <input type="number" id="marks2" placeholder="marks 2" onChange={handleChange} />

            <input type="text" id="criteria3" placeholder="laboratory learning Hours" onChange={handleChange} />
            <input type="number" id="marks3" placeholder="Marks 3" onChange={handleChange} />
            <input type="text" id="criteria3" placeholder="Self learning Hours" onChange={handleChange} />
            <input type="number" id="marks3" placeholder="Marks 3" onChange={handleChange} />

            <input type="text" id="criteria4" placeholder="Notional Learning hours " onChange={handleChange} />
            <input type="number" id="marks4" placeholder="Marks 4" onChange={handleChange} />
            <input type="text" id="criteria4" placeholder="credits " onChange={handleChange} />
            <input type="number" id="marks4" placeholder="Marks 4" onChange={handleChange} />


              </>
            )}






        <button onClick={() => setShowAssessmentScheme(!showAssessmentScheme)}>Toggle Assessment Scheme</button>
        
            {/* Self-Learning Inputs */}
            {showAssessmentScheme && (
              <>
              <h2>Enter course Assessment scheme details : </h2>

<input type="text" id="selfLearning1" placeholder="Self-Learning 1" onChange={handleChange} />
<input type="number" id="selfLearningMarks1" placeholder="Marks 1" onChange={handleChange} />
<input type="text" id="selfLearning2" placeholder="Self-Learning 2" onChange={handleChange} />
<input type="number" id="selfLearningMarks2" placeholder="Marks 2" onChange={handleChange} />
<input type="text" id="selfLearning3" placeholder="Self-Learning 3" onChange={handleChange} />
<input type="number" id="selfLearningMarks3" placeholder="Marks 3" onChange={handleChange} />
<input type="text" id="selfLearning4" placeholder="Self-Learning 4" onChange={handleChange} />
<input type="number" id="selfLearningMarks4" placeholder="Marks 4" onChange={handleChange} />
              </>

            )}








        <button onClick={() => setShowSelfStudyDetails(!showSelfStudyDetails)}>Toggle Classroom Learning Contents and Self-Study Details</button>


          {/* Unit Content Inputs */}
          {showSelfStudyDetails && ( <>
            <h2>Ennter CLassroom Learning Details :</h2>

              {formData.units.map((unit, index) => (
              <div key={index}>
              
                <input
                  type="text"
                  id={`unit${index + 1}_unitName`}
                  placeholder="Unit name and Self Learning Outcomes"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  id={`unit${index + 1}_SLO`}
                  placeholder="Unit Contents "
                  onChange={handleChange}
                />
              </div>
            ))}

          <h2>Enter Self-Study Learning Details:</h2>
            {inputs.map((input, index) => (
              <input
                key={index}
                type="text"
                value={input}
                onChange={(e) => handleChange1(index, e.target.value)}
                placeholder={`Self-Study Learning ${index + 1}`}
              />
            ))}


            </>
            ) }






        <button onClick={() => setShowReferences(!showReferences)}>Toggle References</button>

         

        { showReferences && (<>
            
            {/* E-References Inputs */}
            <h2>Enter References</h2>
            {formData.eReferences.map((reference, index) => (
    <input key={index} type="text" id={`reference${index + 1}`} placeholder="Reference" onChange={handleChange} />
  ))}
  <h2>Enter E-Referennces:</h2>
  {inputs2.map((input, index) => (
    <input
      key={index}
      type="text"
      value={input}
      onChange={(e) => handleChange3(index, e.target.value)}
      placeholder={`E-References ${index + 1}`}
    />
  ))}


</>)}

        <button onClick={() => setShowEquipments(!showEquipments)}>Toggle Equipments/Machineries</button>


        { showEquipments && ( <>
            <h2>Enter List of Major Equipments/Machineries </h2>


{ inputs1.map((input,index) => (
<input
key={index}
type="text"
value={input}
onChange={(e) => handleChange2(index, e.target.value)}
placeholder={`Major Equipments  ${index + 1}`}
/>


))}
           </>
           )}



        <button onClick={() => setExpert(!showExpert)}>Toggle Experts</button>
{ showExpert && ( <>
<h2>Enter Expert details (name,designationn and Institute)</h2>
  {/* Industry Experts Inputs */}
  {formData.industryExperts.map((expert, index) => (
              <div key={index}>
                <input type="text" id={`expert${index + 1}_name`} placeholder="Expert Name " onChange={handleChange} />
                <input type="text" id={`expert${index + 1}_designation`} placeholder="Expert Designation" onChange={handleChange} />
                <input type="text" id={`expert${index + 1}_institute`} placeholder="Expert Institute" onChange={handleChange} />
              </div>

              
            ))}

<label>
              Enter First Name (HOD & Chairman PBOS, CE):
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </label>
            <br />
            <label>
              Enter Second Name (Member Secretary PBOS, CE):
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </label>
</>
)}
        <button onClick={() => setShowMarks(!showMarks)}>Toggle Marks Input</button>
        { showMarks && ( <>


<h1>Enter MArks Specification Table data</h1>
<table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
<thead>
  <tr>
    <th>Unit No.</th>
    <th>Units</th>
    <th>Classroom Learning Hours</th>
    <th>C/O</th>
    <th>Levels from Cognition Process Dimension</th>
    <th>Total Marks</th>
  </tr>
</thead>
<tbody>
  {tableData.map((row, index) => (
    <tr key={index}>
      {Object.keys(row).map((key, idx) => (
        <td key={idx}>
          <input
            type="text"
            value={row[key] || ""} // Fallback to empty string to avoid undefined/null issues
            onChange={(e) => handleInputChange(index, key, e.target.value)} // Update state on input change
            style={{ width: "100%", border: "none" }}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>
</table>
<br></br>
<h1>Enter Question Paper Format Table</h1>
<table>
<thead>
  <tr>
    <th>Q. No.</th>
    <th>Bit 1</th>
    <th>Bit 2</th>
    <th>Bit 3</th>
    <th>Bit 4</th>
    <th>Bit 5</th>
    <th>Bit 6</th>
    <th>Bit 7</th>
    <th>Options</th>
  </tr>
</thead>
<tbody>
  {questionData.map((row, index) => (
    <tr key={index}>
      <td>{row.qNo}</td>
      {Object.keys(row)
        .filter((key) => key !== 'qNo')
        .map((key) => (
          <td key={key}>
            <input
              type="text"
              value={row[key]}
              onChange={(e) => handleInputChange2(index, key, e.target.value)}
            />
          </td>
        ))}
    </tr>
  ))}
</tbody>
</table>
</>)}
  
<button onClick={() => setViewLaboratory(true)}>Toggle Laboratory Learning Content</button>
           
          </>
        )}
        <button onClick={generatePDF}>Generate PDF</button>   
      </div>
    </div>
  );
}

export default App;
