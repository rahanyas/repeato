export const subjects = ["Data Structures", "Operating Systems", "DBMS", "Computer Networks"];

export const stats = [
  { label: "Papers indexed", value: "142", icon: "FileText" },
  { label: "Questions parsed", value: "3,081", icon: "Layers" },
  { label: "Clusters found", value: "612", icon: "LayoutGrid" },
  { label: "High-confidence picks", value: "38", icon: "TrendingUp" },
];

export const yearFrequency = [
  { year: "2019", count: 4 },
  { year: "2020", count: 3 },
  { year: "2021", count: 5 },
  { year: "2022", count: 4 },
  { year: "2023", count: 6 },
  { year: "2024", count: 5 },
  { year: "2025", count: 7 },
];

export const clusters = [
  {
    id: 1,
    canonical: "Explain deadlock and the necessary conditions for its occurrence.",
    subject: "Operating Systems",
    occurrences: 7,
    lastSeen: 2025,
    marks: 10,
    variants: [
      { year: 2025, text: "Explain deadlock and the necessary conditions for its occurrence.", similarity: 1.0 },
      { year: 2023, text: "What is deadlock? Describe the four conditions required for deadlock to occur.", similarity: 0.93 },
      { year: 2021, text: "Discuss the concept of deadlock in operating systems with a suitable example.", similarity: 0.87 },
      { year: 2019, text: "Define deadlock. State Coffman's conditions.", similarity: 0.81 },
    ],
  },
  {
    id: 2,
    canonical: "Differentiate between B-Tree and B+ Tree with diagrams.",
    subject: "DBMS",
    occurrences: 5,
    lastSeen: 2024,
    marks: 8,
    variants: [
      { year: 2024, text: "Differentiate between B-Tree and B+ Tree with diagrams.", similarity: 1.0 },
      { year: 2022, text: "Compare B-Tree and B+ Tree indexing structures.", similarity: 0.89 },
      { year: 2020, text: "Explain B+ Tree structure and its advantages over B-Tree.", similarity: 0.84 },
    ],
  },
  {
    id: 3,
    canonical: "Explain the working of TCP three-way handshake.",
    subject: "Computer Networks",
    occurrences: 6,
    lastSeen: 2025,
    marks: 6,
    variants: [
      { year: 2025, text: "Explain the working of TCP three-way handshake.", similarity: 1.0 },
      { year: 2023, text: "Describe how a TCP connection is established between client and server.", similarity: 0.9 },
      { year: 2021, text: "What is the three-way handshake mechanism used by TCP?", similarity: 0.95 },
    ],
  },
];

export const predictions = [
  { id: 1, text: "Explain deadlock and the necessary conditions for its occurrence.", subject: "Operating Systems", confidence: 92, occurrences: 7, gapPattern: "Every 2 yrs" },
  { id: 2, text: "Explain the working of TCP three-way handshake.", subject: "Computer Networks", confidence: 88, occurrences: 6, gapPattern: "Annual" },
  { id: 3, text: "Differentiate between B-Tree and B+ Tree with diagrams.", subject: "DBMS", confidence: 76, occurrences: 5, gapPattern: "Every 2 yrs" },
  { id: 4, text: "Discuss normalization and explain 1NF, 2NF, 3NF with examples.", subject: "DBMS", confidence: 71, occurrences: 5, gapPattern: "Irregular" },
  { id: 5, text: "Explain the producer-consumer problem and its solution using semaphores.", subject: "Operating Systems", confidence: 64, occurrences: 4, gapPattern: "Every 3 yrs" },
];

export const uploadQueue = [
  { name: "OS_2025_endsem.pdf", status: "done" },
  { name: "DBMS_2024_midsem.pdf", status: "done" },
  { name: "CN_2025_endsem.pdf", status: "processing" },
];
