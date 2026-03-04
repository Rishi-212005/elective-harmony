export interface Elective {
  id: string;
  code: string;
  name: string;
  faculty: string;
  department: string;
  totalSeats: number;
  remainingSeats: number;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  semester: number;
  preferences: string[];
  allocatedElective?: string;
}

export const electives: Elective[] = [
  { id: "1", code: "CS401", name: "Machine Learning", faculty: "Dr. Priya Sharma", department: "Computer Science", totalSeats: 60, remainingSeats: 12, description: "Introduction to supervised and unsupervised learning algorithms." },
  { id: "2", code: "CS402", name: "Cyber Security", faculty: "Dr. Rajeev Kumar", department: "Computer Science", totalSeats: 50, remainingSeats: 8, description: "Fundamentals of network security and ethical hacking." },
  { id: "3", code: "EC401", name: "IoT Systems", faculty: "Dr. Anita Desai", department: "Electronics", totalSeats: 45, remainingSeats: 20, description: "Design and implementation of Internet of Things systems." },
  { id: "4", code: "CS403", name: "Cloud Computing", faculty: "Prof. Vikram Patel", department: "Computer Science", totalSeats: 55, remainingSeats: 5, description: "Cloud infrastructure, services, and deployment models." },
  { id: "5", code: "ME401", name: "Robotics", faculty: "Dr. Suresh Nair", department: "Mechanical", totalSeats: 40, remainingSeats: 15, description: "Fundamentals of robot kinematics and control systems." },
  { id: "6", code: "CS404", name: "Blockchain Technology", faculty: "Dr. Meena Iyer", department: "Computer Science", totalSeats: 50, remainingSeats: 22, description: "Distributed ledger technology and smart contracts." },
  { id: "7", code: "CS405", name: "Natural Language Processing", faculty: "Dr. Arjun Reddy", department: "Computer Science", totalSeats: 45, remainingSeats: 10, description: "Text processing, sentiment analysis, and language models." },
  { id: "8", code: "EC402", name: "VLSI Design", faculty: "Prof. Kavitha Rao", department: "Electronics", totalSeats: 35, remainingSeats: 18, description: "Very Large Scale Integration design and verification." },
];

export const students: Student[] = [
  { id: "1", name: "Aarav Mehta", rollNumber: "20CS101", department: "Computer Science", semester: 6, preferences: ["1", "2", "4"], allocatedElective: "1" },
  { id: "2", name: "Diya Patel", rollNumber: "20CS102", department: "Computer Science", semester: 6, preferences: ["2", "1", "3"], allocatedElective: "2" },
  { id: "3", name: "Rohan Singh", rollNumber: "20EC101", department: "Electronics", semester: 6, preferences: ["3", "5", "6"], allocatedElective: "3" },
  { id: "4", name: "Sneha Gupta", rollNumber: "20CS103", department: "Computer Science", semester: 6, preferences: ["4", "1", "7"], allocatedElective: "4" },
  { id: "5", name: "Karthik Nair", rollNumber: "20ME101", department: "Mechanical", semester: 6, preferences: ["5", "3", "8"], allocatedElective: "5" },
  { id: "6", name: "Priya Iyer", rollNumber: "20CS104", department: "Computer Science", semester: 6, preferences: ["1", "7", "6"], allocatedElective: "1" },
  { id: "7", name: "Amit Sharma", rollNumber: "20CS105", department: "Computer Science", semester: 6, preferences: ["7", "2", "4"], allocatedElective: "7" },
  { id: "8", name: "Nisha Desai", rollNumber: "20EC102", department: "Electronics", semester: 6, preferences: ["8", "3", "6"], allocatedElective: "8" },
  { id: "9", name: "Rahul Verma", rollNumber: "20CS106", department: "Computer Science", semester: 6, preferences: ["6", "1", "2"], allocatedElective: "6" },
  { id: "10", name: "Ananya Reddy", rollNumber: "20CS107", department: "Computer Science", semester: 6, preferences: ["2", "4", "1"] },
];

export const electivePopularity = electives.map(e => ({
  name: e.code,
  fullName: e.name,
  requests: e.totalSeats - e.remainingSeats + Math.floor(Math.random() * 20),
}));

export const seatUtilization = electives.map(e => ({
  name: e.code,
  fullName: e.name,
  filled: e.totalSeats - e.remainingSeats,
  total: e.totalSeats,
  percentage: Math.round(((e.totalSeats - e.remainingSeats) / e.totalSeats) * 100),
}));
