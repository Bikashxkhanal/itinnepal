export interface SampleProgramData {
  slug: string;
  name: string;
  level: "BACHELOR" | "MASTER" | "DIPLOMA";
  durationMonths: number;
  category: string;
  summary: string;
}

export const SAMPLE_PROGRAMS: SampleProgramData[] = [
  {
    slug: "bsc-csit",
    name: "BSc CSIT (Computer Science & Information Technology)",
    level: "BACHELOR",
    durationMonths: 48,
    category: "Computer Science & IT",
    summary:
      "A four-year, eight-semester degree program affiliated with Tribhuvan University focusing on computing theories, software engineering, systems design, and data science.",
  },
  {
    slug: "bit",
    name: "BIT (Bachelor of Information Technology)",
    level: "BACHELOR",
    durationMonths: 48,
    category: "Information Technology",
    summary:
      "A balanced IT undergraduate program combining applied software development, web architecture, network administration, and enterprise computing systems.",
  },
  {
    slug: "bca",
    name: "BCA (Bachelor of Computer Applications)",
    level: "BACHELOR",
    durationMonths: 48,
    category: "Computer Applications",
    summary:
      "A versatile bachelor degree designed for students from Science, Management, or Humanities streams seeking careers in software development, web applications, and UI/UX.",
  },
  {
    slug: "be-computer",
    name: "BE Computer (Computer Engineering)",
    level: "BACHELOR",
    durationMonths: 48,
    category: "Engineering",
    summary:
      "A rigorous four-year engineering program regulated by the Nepal Engineering Council (NEC), combining hardware engineering, electronics, embedded systems, and software engineering.",
  },
];

export const SAMPLE_UNIVERSITIES = [
  {
    name: "Tribhuvan University (TU)",
    slug: "tu",
    type: "Public Autonomous",
    website: "https://tu.edu.np",
    country: "Nepal",
  },
  {
    name: "Kathmandu University (KU)",
    slug: "ku",
    type: "Autonomous Non-Profit",
    website: "https://ku.edu.np",
    country: "Nepal",
  },
  {
    name: "Pokhara University (PU)",
    slug: "pu",
    type: "Public Multi-Campus",
    website: "https://pu.edu.np",
    country: "Nepal",
  },
  {
    name: "Purbanchal University (PU-East)",
    slug: "pu-east",
    type: "Public Regional",
    website: "https://purbuniv.edu.np",
    country: "Nepal",
  },
];

export const SAMPLE_ENTRANCE_EXAMS = [
  {
    name: "TU IOST BSc CSIT Entrance Exam",
    slug: "tu-iost-csit-entrance",
    body: "Institute of Science and Technology (IOST), Tribhuvan University",
    website: "https://iost.tu.edu.np",
    pattern:
      "100 multiple choice questions: Physics (25), Chemistry (25), Mathematics (25), English (15), Computer (10). Time: 2 hours.",
    passMarks: 35,
    fullMarks: 100,
    feeNpr: 1850,
  },
  {
    name: "IOE Engineering Entrance Examination",
    slug: "ioe-entrance-exam",
    body: "Institute of Engineering (IOE), Tribhuvan University",
    website: "https://entrance.ioe.edu.np",
    pattern:
      "Computer-based test (CBT) covering Mathematics (50), Physics (45), Chemistry (25), English (20). Negative marking of 10%.",
    passMarks: 56,
    fullMarks: 140,
    feeNpr: 2000,
  },
  {
    name: "TU FOHSS BCA Entrance Exam",
    slug: "tu-bca-entrance",
    body: "Faculty of Humanities and Social Sciences (FOHSS), Tribhuvan University",
    website: "https://tufohss.edu.np",
    pattern: "100 MCQs covering English (40), Mathematics (50), General Knowledge (10).",
    passMarks: 40,
    fullMarks: 100,
    feeNpr: 1500,
  },
  {
    name: "Pokhara University Central Entrance Examination",
    slug: "pu-central-entrance",
    body: "Faculty of Science & Technology, Pokhara University",
    website: "https://pu.edu.np/academics/entrance",
    pattern: "100 MCQs covering Physics, Chemistry, Mathematics and English.",
    passMarks: 40,
    fullMarks: 100,
    feeNpr: 1600,
  },
];

export interface SampleCollegeSpec {
  name: string;
  slug: string;
  type: "GOVERNMENT" | "COMMUNITY" | "PRIVATE";
  universitySlug: string;
  establishedYear: number;
  description: string;
  address: string;
  districtId: string;
  provinceId: string;
  phone: string;
  email: string;
  website: string;
  programs: {
    programSlug: string;
    shift: string;
    seats: number;
    entranceSlug?: string;
    minGpa: number;
    eligibilityText: string;
    selectionMethod: "ENTRANCE" | "MERIT" | "INTERVIEW" | "MIXED";
    feeItems: {
      label: string;
      type: "ADMISSION" | "SEMESTER" | "ANNUAL" | "LAB" | "EXAM" | "OTHER";
      amountNpr: number;
      frequency: "one_time" | "per_semester" | "annual";
      notes?: string;
    }[];
    enrollment: {
      seats: number;
      enrolled: number;
      passRate: number;
      studentTeacherRatio: string;
    };
    cutoffMarks?: number;
    alumniOutcome?: {
      placedPct: number;
      medianSalaryNpr: number;
      topEmployers: string[];
    };
  }[];
  notableAlumni: {
    name: string;
    role: string;
    employer: string;
    batchYear: number;
    programSlug: string;
    testimonial: string;
  }[];
}

export const SAMPLE_COLLEGES_DATA: SampleCollegeSpec[] = [
  {
    name: "[Sample] Sagarmatha College of Science and Technology",
    slug: "sample-sagarmatha-college",
    type: "PRIVATE",
    universitySlug: "tu",
    establishedYear: 2011,
    description:
      "A pioneer IT and engineering college in Lalitpur offering Tribhuvan University affiliated BSc CSIT and BE Computer with modern IoT and AI innovation labs.",
    address: "Sanepa, Lalitpur",
    districtId: "lalitpur",
    provinceId: "bagmati",
    phone: "+977-1-5527274",
    email: "info@scst.sample.edu.np",
    website: "https://scst.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText:
          "+2 Science or equivalent with minimum grade C in Physics & Math (100 marks each) and must pass TU IOST entrance.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Admission & Registration",
            type: "ADMISSION",
            amountNpr: 35000,
            frequency: "one_time",
          },
          {
            label: "Per Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 62500,
            frequency: "per_semester",
          },
          {
            label: "Annual University & Council Charge",
            type: "ANNUAL",
            amountNpr: 7500,
            frequency: "annual",
          },
          {
            label: "Lab & Project Resource Fee",
            type: "LAB",
            amountNpr: 6000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 91.5, studentTeacherRatio: "14:1" },
        cutoffMarks: 58.0,
        alumniOutcome: {
          placedPct: 86,
          medianSalaryNpr: 48000,
          topEmployers: ["Leapfrog", "Deerhold", "Cotiviti"],
        },
      },
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        entranceSlug: "ioe-entrance-exam",
        minGpa: 2.4,
        eligibilityText:
          "+2 Science with minimum 45% or Grade C in PCM and IOE entrance passed score.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 50000, frequency: "one_time" },
          {
            label: "Per Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 85000,
            frequency: "per_semester",
          },
          {
            label: "Annual Laboratory & Workshop Charge",
            type: "ANNUAL",
            amountNpr: 15000,
            frequency: "annual",
          },
        ],
        enrollment: { seats: 48, enrolled: 46, passRate: 88.0, studentTeacherRatio: "12:1" },
        cutoffMarks: 64.0,
      },
    ],
    notableAlumni: [
      {
        name: "Aayush Shrestha",
        role: "Senior Full Stack Engineer",
        employer: "Leapfrog Technology",
        batchYear: 2021,
        programSlug: "bsc-csit",
        testimonial:
          "The rigorous lab sessions and mentoring at Sagarmatha built my software engineering fundamentals.",
      },
    ],
  },
  {
    name: "[Sample] Amrit Science Campus (ASCOL)",
    slug: "sample-ascol-kathmandu",
    type: "GOVERNMENT",
    universitySlug: "tu",
    establishedYear: 1956,
    description:
      "The historic constituent science college of Tribhuvan University located in Thamel, offering government-subsidized BSc CSIT and BCA degrees with renowned research faculty.",
    address: "Thamel, Kathmandu",
    districtId: "kathmandu",
    provinceId: "bagmati",
    phone: "+977-1-4411637",
    email: "info@ascol.sample.edu.np",
    website: "https://ascol.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 108,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText:
          "Passed +2 Science with minimum C in Math and Physics; competitive IOST entrance merit rank.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Government Admission & Campus Reg",
            type: "ADMISSION",
            amountNpr: 15000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition Fee (Subsidized)",
            type: "SEMESTER",
            amountNpr: 22000,
            frequency: "per_semester",
          },
          {
            label: "Exam & Practical Lab Fee",
            type: "EXAM",
            amountNpr: 3500,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 108, enrolled: 108, passRate: 94.0, studentTeacherRatio: "20:1" },
        cutoffMarks: 72.5,
      },
      {
        programSlug: "bca",
        shift: "Day",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText:
          "+2 passed with min D+ in all subjects, along with TU BCA entrance pass certificate.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 18000, frequency: "one_time" },
          {
            label: "Per Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 25000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 89.0, studentTeacherRatio: "18:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Pooja Sharma",
        role: "Data Scientist",
        employer: "F1Soft International",
        batchYear: 2020,
        programSlug: "bsc-csit",
        testimonial:
          "ASCOL gave me deep mathematical rigor and an incredible network of alumni across Nepal's tech space.",
      },
    ],
  },
  {
    name: "[Sample] Patan Multiple Campus",
    slug: "sample-patan-multiple-campus",
    type: "GOVERNMENT",
    universitySlug: "tu",
    establishedYear: 1954,
    description:
      "A premier constituent campus of Tribhuvan University located in Patan Dhoka, known for affordable high-quality IT education and robust student communities.",
    address: "Patan Dhoka, Lalitpur",
    districtId: "lalitpur",
    provinceId: "bagmati",
    phone: "+977-1-5526349",
    email: "pmc@sample.edu.np",
    website: "https://pmc.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 108,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance rank holder with +2 Science background.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Constituent Admission Fee",
            type: "ADMISSION",
            amountNpr: 14000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 21500,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 108, enrolled: 108, passRate: 92.5, studentTeacherRatio: "22:1" },
        cutoffMarks: 69.0,
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 70,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText: "TU FOHSS entrance score with minimum 2.0 GPA in +2.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 15000, frequency: "one_time" },
          { label: "Semester Fee", type: "SEMESTER", amountNpr: 24000, frequency: "per_semester" },
        ],
        enrollment: { seats: 70, enrolled: 70, passRate: 87.0, studentTeacherRatio: "20:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Bibek Karki",
        role: "Software Architect",
        employer: "Cotiviti Nepal",
        batchYear: 2019,
        programSlug: "bsc-csit",
        testimonial:
          "Patan Campus was an amazing launchpad for learning distributed computing and open-source software.",
      },
    ],
  },
  {
    name: "[Sample] Kathmandu Institute of Applied Technology",
    slug: "sample-kiat-kathmandu",
    type: "PRIVATE",
    universitySlug: "ku",
    establishedYear: 2014,
    description:
      "An innovative private institution affiliated with Kathmandu University featuring modern project-based curricula in BIT and Computer Engineering.",
    address: "Dhobighat, Lalitpur",
    districtId: "lalitpur",
    provinceId: "bagmati",
    phone: "+977-1-5544332",
    email: "admissions@kiat.sample.edu.np",
    website: "https://kiat.sample.edu.np",
    programs: [
      {
        programSlug: "bit",
        shift: "Day",
        seats: 40,
        minGpa: 2.2,
        eligibilityText: "KU Entrance Examination or central admission test; minimum 50% in +2.",
        selectionMethod: "MIXED",
        feeItems: [
          {
            label: "Admission & Orientation",
            type: "ADMISSION",
            amountNpr: 40000,
            frequency: "one_time",
          },
          {
            label: "Per Semester Tuition",
            type: "SEMESTER",
            amountNpr: 75000,
            frequency: "per_semester",
          },
          {
            label: "Cloud & Lab Infrastructure",
            type: "LAB",
            amountNpr: 8000,
            frequency: "annual",
          },
        ],
        enrollment: { seats: 40, enrolled: 39, passRate: 95.0, studentTeacherRatio: "10:1" },
      },
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        minGpa: 2.4,
        eligibilityText: "Kathmandu University Engineering Entrance Examination (KUEEE) score.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Admission & Registration",
            type: "ADMISSION",
            amountNpr: 60000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 95000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 93.0, studentTeacherRatio: "12:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Shreya Joshi",
        role: "DevOps Engineer",
        employer: "CloudFactory",
        batchYear: 2022,
        programSlug: "bit",
        testimonial:
          "Hands-on projects with AWS and Docker during college gave me an immediate industry advantage.",
      },
    ],
  },
  {
    name: "[Sample] Deerwalk Institute of Technology",
    slug: "sample-deerwalk-institute",
    type: "PRIVATE",
    universitySlug: "tu",
    establishedYear: 2010,
    description:
      "A reputed tech-focused college in Sifal, Kathmandu affiliated with Tribhuvan University, emphasizing continuous software internships and industry immersion.",
    address: "Sifal, Kathmandu",
    districtId: "kathmandu",
    provinceId: "bagmati",
    phone: "+977-1-4475475",
    email: "contact@dwit.sample.edu.np",
    website: "https://dwit.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Day",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance passed score and college personal interview.",
        selectionMethod: "MIXED",
        feeItems: [
          {
            label: "Admission & Setup Fee",
            type: "ADMISSION",
            amountNpr: 50000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition & Internship Coaching",
            type: "SEMESTER",
            amountNpr: 92000,
            frequency: "per_semester",
          },
          {
            label: "Annual Industry Project & Cloud Sandbox",
            type: "LAB",
            amountNpr: 12000,
            frequency: "annual",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 96.0, studentTeacherRatio: "11:1" },
        cutoffMarks: 61.0,
        alumniOutcome: {
          placedPct: 94,
          medianSalaryNpr: 52000,
          topEmployers: ["Deerhold", "Cedar Gate", "Verisk"],
        },
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText: "TU BCA entrance with +2 in Science/Management.",
        selectionMethod: "MIXED",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 40000, frequency: "one_time" },
          {
            label: "Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 78000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 92.0, studentTeacherRatio: "12:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Suman Thapa",
        role: "Lead Backend Developer",
        employer: "Deerhold",
        batchYear: 2020,
        programSlug: "bsc-csit",
        testimonial:
          "Deerwalk connected academic CS concepts directly with production software delivery from day one.",
      },
    ],
  },
  {
    name: "[Sample] Nepal College of Information Technology (NCIT)",
    slug: "sample-ncit-lalitpur",
    type: "PRIVATE",
    universitySlug: "pu",
    establishedYear: 2001,
    description:
      "One of the oldest and most established engineering and IT colleges under Pokhara University, offering BE Computer and BIT programs in Balkumari.",
    address: "Balkumari, Lalitpur",
    districtId: "lalitpur",
    provinceId: "bagmati",
    phone: "+977-1-5186354",
    email: "info@ncit.sample.edu.np",
    website: "https://ncit.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 96,
        entranceSlug: "pu-central-entrance",
        minGpa: 2.0,
        eligibilityText: "PU Entrance exam with +2 Science (Math compulsory).",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Charge", type: "ADMISSION", amountNpr: 45000, frequency: "one_time" },
          {
            label: "Per Semester Tuition",
            type: "SEMESTER",
            amountNpr: 82000,
            frequency: "per_semester",
          },
          {
            label: "Annual Exam & Council Fee",
            type: "ANNUAL",
            amountNpr: 10000,
            frequency: "annual",
          },
        ],
        enrollment: { seats: 96, enrolled: 96, passRate: 89.0, studentTeacherRatio: "15:1" },
      },
      {
        programSlug: "bit",
        shift: "Morning",
        seats: 48,
        entranceSlug: "pu-central-entrance",
        minGpa: 2.0,
        eligibilityText: "+2 pass in Science/Management with Math/Computer.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 35000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 65000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 47, passRate: 91.0, studentTeacherRatio: "16:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Rashmi Adhikari",
        role: "Embedded Systems Engineer",
        employer: "Yarsa Labs",
        batchYear: 2018,
        programSlug: "be-computer",
        testimonial:
          "NCIT provided a well-rounded foundation in both microprocessor systems and software engineering.",
      },
    ],
  },
  {
    name: "[Sample] Pokhara Engineering and IT Academy",
    slug: "sample-pokhara-engineering-academy",
    type: "COMMUNITY",
    universitySlug: "pu",
    establishedYear: 2003,
    description:
      "A prominent community-led engineering and computing institution situated near the scenic Seti river in Pokhara, dedicated to inclusive STEM education.",
    address: "Phulbari, Pokhara",
    districtId: "kaski",
    provinceId: "gandaki",
    phone: "+977-61-528530",
    email: "admission@pec.sample.edu.np",
    website: "https://pec.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        entranceSlug: "pu-central-entrance",
        minGpa: 2.0,
        eligibilityText: "Pokhara University Entrance examination pass with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Community Registration Fee",
            type: "ADMISSION",
            amountNpr: 25000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition & Lab",
            type: "SEMESTER",
            amountNpr: 54000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 86.5, studentTeacherRatio: "16:1" },
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 40,
        minGpa: 2.0,
        eligibilityText: "+2 in any stream with minimum Grade C and entrance pass.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 20000, frequency: "one_time" },
          { label: "Semester Fee", type: "SEMESTER", amountNpr: 42000, frequency: "per_semester" },
        ],
        enrollment: { seats: 40, enrolled: 38, passRate: 88.0, studentTeacherRatio: "15:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Deepak Gurung",
        role: "Frontend Team Lead",
        employer: "Pokhara Tech Hub",
        batchYear: 2021,
        programSlug: "be-computer",
        testimonial:
          "Studying engineering in Pokhara provided a balanced, collaborative and focused study atmosphere.",
      },
    ],
  },
  {
    name: "[Sample] Prime College of Computer Studies",
    slug: "sample-prime-college",
    type: "PRIVATE",
    universitySlug: "tu",
    establishedYear: 2001,
    description:
      "A leading college in Khusibu, Kathmandu known for strong student IT clubs, hackathons, and high graduate placement in software engineering.",
    address: "Khusibu, Nayabazar, Kathmandu",
    districtId: "kathmandu",
    provinceId: "bagmati",
    phone: "+977-1-4361690",
    email: "info@prime.sample.edu.np",
    website: "https://prime.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance merit score holder.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Admission & Registration",
            type: "ADMISSION",
            amountNpr: 38000,
            frequency: "one_time",
          },
          {
            label: "Per Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 68000,
            frequency: "per_semester",
          },
          {
            label: "Lab and Project Facilities",
            type: "LAB",
            amountNpr: 5000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 93.0, studentTeacherRatio: "13:1" },
        cutoffMarks: 59.0,
      },
      {
        programSlug: "bca",
        shift: "Day",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText: "TU FOHSS entrance pass with +2 transcript.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 30000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 58000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 90.0, studentTeacherRatio: "14:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Manisha Rijal",
        role: "Product Manager",
        employer: "eSewa",
        batchYear: 2021,
        programSlug: "bsc-csit",
        testimonial:
          "Prime's tech clubs and active mentorship helped me transition smoothly from code to tech product strategy.",
      },
    ],
  },
  {
    name: "[Sample] Bhaktapur Multiple Campus",
    slug: "sample-bhaktapur-multiple-campus",
    type: "COMMUNITY",
    universitySlug: "tu",
    establishedYear: 1959,
    description:
      "A respected community constituent campus in Doodhpati, Bhaktapur offering affordable BSc CSIT and BCA degrees for students in the eastern valley.",
    address: "Doodhpati, Bhaktapur",
    districtId: "bhaktapur",
    provinceId: "bagmati",
    phone: "+977-1-6610200",
    email: "info@bmc.sample.edu.np",
    website: "https://bmc.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 72,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance merit rank holders with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Admission & Enrolment",
            type: "ADMISSION",
            amountNpr: 16000,
            frequency: "one_time",
          },
          {
            label: "Semester Fee (Subsidized)",
            type: "SEMESTER",
            amountNpr: 24000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 72, enrolled: 72, passRate: 91.0, studentTeacherRatio: "19:1" },
        cutoffMarks: 65.0,
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText: "Passed +2 with D+ or C in all subjects, TU BCA entrance cleared.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 18000, frequency: "one_time" },
          { label: "Semester Fee", type: "SEMESTER", amountNpr: 26000, frequency: "per_semester" },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 88.0, studentTeacherRatio: "17:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Prabin Suwal",
        role: "Cybersecurity Analyst",
        employer: "SecurityPal",
        batchYear: 2022,
        programSlug: "bsc-csit",
        testimonial:
          "Bhaktapur Campus gave me a rock-solid computer networks foundation that launched my cybersecurity career.",
      },
    ],
  },
  {
    name: "[Sample] Chitwan Institute of Technology",
    slug: "sample-chitwan-institute",
    type: "PRIVATE",
    universitySlug: "tu",
    establishedYear: 2013,
    description:
      "A modern technical college situated in Bharatpur, serving students across Bagmati and Gandaki provinces with TU-affiliated IT degrees.",
    address: "Bharatpur-10, Chitwan",
    districtId: "chitwan",
    provinceId: "bagmati",
    phone: "+977-56-524100",
    email: "admissions@cit.sample.edu.np",
    website: "https://cit.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance rank holders.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 30000, frequency: "one_time" },
          {
            label: "Per Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 52000,
            frequency: "per_semester",
          },
          { label: "Lab Facilities Fee", type: "LAB", amountNpr: 4000, frequency: "per_semester" },
        ],
        enrollment: { seats: 48, enrolled: 47, passRate: 89.0, studentTeacherRatio: "15:1" },
        cutoffMarks: 54.0,
      },
      {
        programSlug: "bca",
        shift: "Day",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText: "TU BCA entrance with +2 in Science/Management.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 25000, frequency: "one_time" },
          {
            label: "Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 45000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 86.0, studentTeacherRatio: "16:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Anjana Adhikari",
        role: "Software Developer",
        employer: "Inficare Nepal",
        batchYear: 2021,
        programSlug: "bsc-csit",
        testimonial:
          "CIT brought quality university IT education right into Chitwan, saving me the cost of moving to Kathmandu.",
      },
    ],
  },
  {
    name: "[Sample] Biratnagar City College of IT",
    slug: "sample-biratnagar-city-college",
    type: "PRIVATE",
    universitySlug: "pu-east",
    establishedYear: 2012,
    description:
      "A prominent computing academy in Koshi Province offering Purbanchal University affiliated BIT and BCA programs with modern robotics and web labs.",
    address: "Main Road, Biratnagar",
    districtId: "morang",
    provinceId: "koshi",
    phone: "+977-21-460111",
    email: "info@bccit.sample.edu.np",
    website: "https://bccit.sample.edu.np",
    programs: [
      {
        programSlug: "bit",
        shift: "Morning",
        seats: 48,
        minGpa: 2.0,
        eligibilityText: "+2 with Mathematics/Computer Science and entrance interview.",
        selectionMethod: "MIXED",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 28000, frequency: "one_time" },
          {
            label: "Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 48000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 45, passRate: 87.0, studentTeacherRatio: "16:1" },
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 40,
        minGpa: 2.0,
        eligibilityText: "Minimum D+ in +2 in any discipline.",
        selectionMethod: "MERIT",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 22000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 42000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 40, enrolled: 40, passRate: 85.0, studentTeacherRatio: "17:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Roshan Yadav",
        role: "Mobile App Engineer",
        employer: "Khalti Digital Wallet",
        batchYear: 2020,
        programSlug: "bit",
        testimonial:
          "Biratnagar City College gave me practical Android and Flutter training that opened doors in Kathmandu fintech.",
      },
    ],
  },
  {
    name: "[Sample] Butwal Institute of Engineering and Technology",
    slug: "sample-butwal-institute",
    type: "COMMUNITY",
    universitySlug: "tu",
    establishedYear: 2008,
    description:
      "A key engineering institution in Lumbini Province situated along the Siddhartha Highway in Butwal, known for technical precision and community scholarship programs.",
    address: "Kalikanagar, Butwal",
    districtId: "rupandehi",
    provinceId: "lumbini",
    phone: "+977-71-540200",
    email: "contact@biet.sample.edu.np",
    website: "https://biet.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        entranceSlug: "ioe-entrance-exam",
        minGpa: 2.4,
        eligibilityText: "IOE Engineering entrance pass with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 35000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 60000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 90.0, studentTeacherRatio: "14:1" },
        cutoffMarks: 62.0,
      },
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance rank holders.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 28000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 48000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 91.0, studentTeacherRatio: "15:1" },
        cutoffMarks: 55.0,
      },
    ],
    notableAlumni: [
      {
        name: "Santosh Pandey",
        role: "Systems Engineer",
        employer: "Ncell Axiata",
        batchYear: 2019,
        programSlug: "be-computer",
        testimonial:
          "The engineering labs in Butwal gave us deep hardware-level understanding and systems resilience.",
      },
    ],
  },
  {
    name: "[Sample] Dharan College of Information Technology",
    slug: "sample-dharan-college",
    type: "PRIVATE",
    universitySlug: "pu-east",
    establishedYear: 2015,
    description:
      "A scenic tech college located near the foothills in Dharan, offering hands-on software development and web engineering courses.",
    address: "College Road, Dharan",
    districtId: "sunsari",
    provinceId: "koshi",
    phone: "+977-25-520330",
    email: "admissions@dcit.sample.edu.np",
    website: "https://dcit.sample.edu.np",
    programs: [
      {
        programSlug: "bit",
        shift: "Morning",
        seats: 48,
        minGpa: 2.0,
        eligibilityText: "+2 pass in Science/Management with Math.",
        selectionMethod: "MERIT",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 26000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 44000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 44, passRate: 88.0, studentTeacherRatio: "15:1" },
      },
      {
        programSlug: "bca",
        shift: "Day",
        seats: 35,
        minGpa: 2.0,
        eligibilityText: "+2 in any stream with minimum Grade C.",
        selectionMethod: "INTERVIEW",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 20000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 40000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 86.0, studentTeacherRatio: "16:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Kripa Limbu",
        role: "UI/UX Designer",
        employer: "Freelance / Global",
        batchYear: 2021,
        programSlug: "bit",
        testimonial:
          "Dharan College encouraged independent design thinking and project portfolios that won me overseas clients.",
      },
    ],
  },
  {
    name: "[Sample] Kathford International College of Engineering",
    slug: "sample-kathford-college",
    type: "PRIVATE",
    universitySlug: "tu",
    establishedYear: 2003,
    description:
      "A reputed engineering and computing college in Balkumari, Lalitpur with specialized robotic clubs, business incubators, and TU-affiliated courses.",
    address: "Balkumari, Lalitpur",
    districtId: "lalitpur",
    provinceId: "bagmati",
    phone: "+977-1-5186046",
    email: "info@kathford.sample.edu.np",
    website: "https://kathford.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        entranceSlug: "ioe-entrance-exam",
        minGpa: 2.4,
        eligibilityText: "IOE Engineering entrance pass with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 48000, frequency: "one_time" },
          {
            label: "Per Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 80000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 90.0, studentTeacherRatio: "13:1" },
        cutoffMarks: 63.5,
      },
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance merit score.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 36000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 64000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 92.0, studentTeacherRatio: "14:1" },
        cutoffMarks: 57.0,
      },
    ],
    notableAlumni: [
      {
        name: "Anil Regmi",
        role: "Tech Lead",
        employer: "Fusemachines Nepal",
        batchYear: 2018,
        programSlug: "be-computer",
        testimonial:
          "Kathford's project labs gave us early exposure to AI pipelines and cloud microservices.",
      },
    ],
  },
  {
    name: "[Sample] Himalaya College of Engineering",
    slug: "sample-himalaya-college",
    type: "PRIVATE",
    universitySlug: "tu",
    establishedYear: 2000,
    description:
      "A long-standing engineering institution in Chyasal, Lalitpur offering TU-affiliated BE Computer and BCA with strong student societies.",
    address: "Chyasal, Lalitpur",
    districtId: "lalitpur",
    provinceId: "bagmati",
    phone: "+977-1-5540555",
    email: "contact@hcoe.sample.edu.np",
    website: "https://hcoe.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        entranceSlug: "ioe-entrance-exam",
        minGpa: 2.4,
        eligibilityText: "IOE Engineering entrance pass with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Charge", type: "ADMISSION", amountNpr: 45000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 78000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 89.0, studentTeacherRatio: "14:1" },
        cutoffMarks: 62.0,
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.0,
        eligibilityText: "TU BCA entrance with +2 in Science/Management.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 32000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 56000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 88.0, studentTeacherRatio: "15:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Suman Bista",
        role: "Cloud Engineer",
        employer: "Amazon Web Services (Community)",
        batchYear: 2017,
        programSlug: "be-computer",
        testimonial:
          "The engineering discipline taught by faculty at Himalaya helped me pass my AWS solution architect credentials.",
      },
    ],
  },
  {
    name: "[Sample] St. Xavier's College (IT Wing)",
    slug: "sample-st-xaviers-college",
    type: "COMMUNITY",
    universitySlug: "tu",
    establishedYear: 1988,
    description:
      "The prestigious Jesuit institution in Maitighar, Kathmandu offering TU-affiliated BSc CSIT and BCA known for values-based education, discipline, and high academic merit.",
    address: "Maitighar, Kathmandu",
    districtId: "kathmandu",
    provinceId: "bagmati",
    phone: "+977-1-4221365",
    email: "info@sxc.sample.edu.np",
    website: "https://sxc.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Day",
        seats: 48,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.4,
        eligibilityText: "High rank in TU IOST entrance and St. Xavier's interview.",
        selectionMethod: "MIXED",
        feeItems: [
          {
            label: "Admission & Institutional Reg",
            type: "ADMISSION",
            amountNpr: 42000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition & Lab",
            type: "SEMESTER",
            amountNpr: 72000,
            frequency: "per_semester",
          },
          {
            label: "Annual Development & Library Fee",
            type: "ANNUAL",
            amountNpr: 10000,
            frequency: "annual",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 98.0, studentTeacherRatio: "12:1" },
        cutoffMarks: 68.5,
        alumniOutcome: {
          placedPct: 96,
          medianSalaryNpr: 55000,
          topEmployers: ["Deerhold", "Cotiviti", "Microsoft Nepal"],
        },
      },
      {
        programSlug: "bca",
        shift: "Morning",
        seats: 35,
        entranceSlug: "tu-bca-entrance",
        minGpa: 2.4,
        eligibilityText: "TU BCA entrance with +2 in Science/Management.",
        selectionMethod: "MIXED",
        feeItems: [
          { label: "Admission Fee", type: "ADMISSION", amountNpr: 35000, frequency: "one_time" },
          {
            label: "Semester Tuition",
            type: "SEMESTER",
            amountNpr: 65000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 35, enrolled: 35, passRate: 95.0, studentTeacherRatio: "13:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Prashant Pokharel",
        role: "Software Research Fellow",
        employer: "Carnegie Mellon (Alum)",
        batchYear: 2019,
        programSlug: "bsc-csit",
        testimonial:
          "St. Xavier's instilled analytical clarity and community consciousness in every engineering problem we tackled.",
      },
    ],
  },
  {
    name: "[Sample] Lord Buddha Education Foundation (LBEF)",
    slug: "sample-lbef-campus",
    type: "PRIVATE",
    universitySlug: "ku",
    establishedYear: 1998,
    description:
      "A veteran private IT campus in Maitidevi, Kathmandu offering international-standard undergraduate degrees in Information Technology and Software Engineering.",
    address: "Maitidevi, Kathmandu",
    districtId: "kathmandu",
    provinceId: "bagmati",
    phone: "+977-1-4411805",
    email: "admissions@lbef.sample.edu.np",
    website: "https://lbef.sample.edu.np",
    programs: [
      {
        programSlug: "bit",
        shift: "Morning",
        seats: 60,
        minGpa: 2.0,
        eligibilityText: "+2 pass in any discipline with English and Mathematics.",
        selectionMethod: "INTERVIEW",
        feeItems: [
          {
            label: "Admission & Registration",
            type: "ADMISSION",
            amountNpr: 35000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition Fee",
            type: "SEMESTER",
            amountNpr: 68000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 60, enrolled: 58, passRate: 90.0, studentTeacherRatio: "14:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Rina Maharjan",
        role: "Lead QA Automation Engineer",
        employer: "Logica Beans",
        batchYear: 2020,
        programSlug: "bit",
        testimonial:
          "Practical software quality testing modules at LBEF allowed me to secure a QA automation role immediately.",
      },
    ],
  },
  {
    name: "[Sample] Nepal Engineering College (nec)",
    slug: "sample-nec-bhaktapur",
    type: "COMMUNITY",
    universitySlug: "pu",
    establishedYear: 1994,
    description:
      "The pioneer non-profit community engineering college located in Changunarayan, Bhaktapur, offering Pokhara University affiliated BE Computer.",
    address: "Changunarayan, Bhaktapur",
    districtId: "bhaktapur",
    provinceId: "bagmati",
    phone: "+977-1-5221001",
    email: "info@nec.sample.edu.np",
    website: "https://nec.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 96,
        entranceSlug: "pu-central-entrance",
        minGpa: 2.0,
        eligibilityText: "Pokhara University Entrance examination with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Community Registration Fee",
            type: "ADMISSION",
            amountNpr: 40000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition & Lab",
            type: "SEMESTER",
            amountNpr: 76000,
            frequency: "per_semester",
          },
          {
            label: "Library & Student Welfare Fee",
            type: "ANNUAL",
            amountNpr: 8000,
            frequency: "annual",
          },
        ],
        enrollment: { seats: 96, enrolled: 96, passRate: 91.0, studentTeacherRatio: "14:1" },
      },
    ],
    notableAlumni: [
      {
        name: "Bishal Shrestha",
        role: "Network Architect",
        employer: "WorldLink Communications",
        batchYear: 2016,
        programSlug: "be-computer",
        testimonial:
          "nec's sprawling campus and well-equipped network engineering laboratories were second to none.",
      },
    ],
  },
  {
    name: "[Sample] Birendra Multiple Campus",
    slug: "sample-birendra-multiple-campus",
    type: "GOVERNMENT",
    universitySlug: "tu",
    establishedYear: 1965,
    description:
      "The central constituent campus of Tribhuvan University in Chitwan, providing highly subsidized BSc CSIT education to students of central Terai.",
    address: "Bharatpur-10, Chitwan",
    districtId: "chitwan",
    provinceId: "bagmati",
    phone: "+977-56-520253",
    email: "info@bmc.sample.edu.np",
    website: "https://bmcchitwan.sample.edu.np",
    programs: [
      {
        programSlug: "bsc-csit",
        shift: "Morning",
        seats: 72,
        entranceSlug: "tu-iost-csit-entrance",
        minGpa: 2.0,
        eligibilityText: "TU IOST entrance merit rank holders with +2 Science.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "Constituent Admission Fee",
            type: "ADMISSION",
            amountNpr: 15000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition Fee (Subsidized)",
            type: "SEMESTER",
            amountNpr: 22000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 72, enrolled: 72, passRate: 93.0, studentTeacherRatio: "20:1" },
        cutoffMarks: 66.0,
      },
    ],
    notableAlumni: [
      {
        name: "Tara Pokharel",
        role: "Full Stack Engineer",
        employer: "Grepsr Nepal",
        batchYear: 2021,
        programSlug: "bsc-csit",
        testimonial:
          "Birendra Campus allowed me to pursue a high-standard BSc CSIT without financial strain on my family.",
      },
    ],
  },
  {
    name: "[Sample] Western Regional Campus (IOE Paschimanchal)",
    slug: "sample-wrc-paschimanchal",
    type: "GOVERNMENT",
    universitySlug: "tu",
    establishedYear: 1981,
    description:
      "The premier constituent engineering campus of IOE Tribhuvan University in Lamachaur, Pokhara, offering top-tier government-funded BE Computer Engineering.",
    address: "Lamachaur, Pokhara",
    districtId: "kaski",
    provinceId: "gandaki",
    phone: "+977-61-440111",
    email: "info@wrc.sample.edu.np",
    website: "https://wrc.sample.edu.np",
    programs: [
      {
        programSlug: "be-computer",
        shift: "Day",
        seats: 48,
        entranceSlug: "ioe-entrance-exam",
        minGpa: 2.4,
        eligibilityText: "Top merit ranking in IOE Central Engineering Entrance.",
        selectionMethod: "ENTRANCE",
        feeItems: [
          {
            label: "IOE Government Regular Admission",
            type: "ADMISSION",
            amountNpr: 12000,
            frequency: "one_time",
          },
          {
            label: "Semester Tuition Fee (Subsidized)",
            type: "SEMESTER",
            amountNpr: 18000,
            frequency: "per_semester",
          },
          {
            label: "Workshop & Practical Exam Fee",
            type: "LAB",
            amountNpr: 3000,
            frequency: "per_semester",
          },
        ],
        enrollment: { seats: 48, enrolled: 48, passRate: 97.0, studentTeacherRatio: "12:1" },
        cutoffMarks: 78.0,
        alumniOutcome: {
          placedPct: 95,
          medianSalaryNpr: 58000,
          topEmployers: ["Cedar Gate", "Leapfrog", "Google (Global)"],
        },
      },
    ],
    notableAlumni: [
      {
        name: "Nabin Khadka",
        role: "Senior Systems Engineer",
        employer: "Cedar Gate Technologies",
        batchYear: 2018,
        programSlug: "be-computer",
        testimonial:
          "IOE Paschimanchal taught me engineering discipline, hardware design, and advanced algorithms.",
      },
    ],
  },
];
