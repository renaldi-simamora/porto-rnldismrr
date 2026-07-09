export const summary = 'A 6th-semester Computer Engineering Technology student at IPB University with strong interest in web development and IT systems. Experienced in developing and maintaining web-based applications, including frontend, backend, and database integration. Also skilled in application support, troubleshooting, and basic software testing (SIT/UAT). Able to collaborate in teams and adapt quickly in dynamic environments, with a strong willingness to learn and contribute to IT operations and development projects.'

export const workExperince = [
    {
        jobTitle: 'Internship – IT Support and Development',
        company: 'PT Global Energi Lestari',
        startDate: 'January 2026',
        endDate: 'July 2026',
        status: 'Internship',
        description: 'Maintained and monitored ERP systems and web-based applications to ensure stable performance and support business operations. Developed and enhanced web application features using Laravel, Blade Template, HTML, CSS, and JavaScript to improve functionality and user experience. Assisted in updating application features, UI components, and system content based on business requirements. Managed and validated application data using SQL to ensure data accuracy, integrity, and consistency. Provided first-level support by troubleshooting application and system issues, while documenting and following up incidents with internal teams. Collaborated with developers and cross-functional teams to improve system performance, usability, and operational efficiency.'
    },
    {
        jobTitle: 'Fullstack Web Developer',
        company: 'Dicoding Coding Camp 2026 x DBS Foundation',
        startDate: 'February 2026',
        endDate: 'July 2026',
        status: 'Program',
        description: 'Developed responsive and interactive web applications using React and JavaScript. Built backend systems and REST APIs for authentication and efficient data processing. Managed and integrated databases (MySQL, Firebase/Supabase) to ensure reliable application functionality. Collaborated in fullstack development projects to ensure seamless integration between frontend, backend, and deployment. Performed debugging, troubleshooting, and testing (SIT/UAT) to maintain application performance and reliability. Applied SDLC principles and basic cloud deployment using AWS. Actively learned and applied modern web development practices in a collaborative, project-based environment.'
    },
    {
        jobTitle: 'Student - Computer Engineering Technology',
        company: 'IPB University',
        startDate: '2023',
        endDate: 'Present',
        status: 'Student',
        description: 'Focus on Hardware-Software Integration, Embedded Systems, and IoT Development. GPA: 3.46.'
    },
]

export const projects = [
    {
        title: 'BudgetLy',
        image: '/budgetly.png',
        description: 'Financial management web application for students.',
        technologies: ['React', 'TypeScript', 'REST API', 'PostgreSQL', 'Tailwind CSS'],
        details: [
            { label: 'Keterangan', text: 'Aplikasi web finansial untuk membantu pencatatan transaksi, budgeting, dan savings management.' },
            { label: 'Teknologi', text: 'React dan TypeScript untuk antarmuka, REST API untuk integrasi data, PostgreSQL untuk penyimpanan, dan Tailwind CSS untuk styling.' },
            { label: 'Tujuan', text: 'Membantu pengguna mengelola keuangan pribadi secara lebih terstruktur dan mudah dipantau.' },
        ],
        links: [
            { text: 'Live Demo', url: 'https://budgetly-dbs.vercel.app/' },
            { text: 'QA Docs (Google Drive)', url: 'https://drive.google.com/drive/folders/1uVwjfoToxzpS-HxV9V9BbJc7acKbB6Mk' },
            { text: 'GitHub', url: '#' }
        ]
    },
    {
        title: 'BuahKita',
        image: '/buahkita.png',
        description: 'IoT-based fruit quality detection system with real-time monitoring.',
        technologies: ['ESP32', 'React', 'Node.js', 'PostgreSQL', 'Arduino IDE'],
        details: [
            { label: 'Keterangan', text: 'Sistem IoT untuk memantau kualitas buah secara real time melalui sensor dan dashboard web.' },
            { label: 'Teknologi', text: 'ESP32 membaca sensor, React menampilkan data, Node.js menjadi backend, dan Firebase dipakai untuk penyimpanan serta sinkronisasi data.' },
            { label: 'Tujuan', text: 'Memberikan gambaran kondisi buah dari data sensor agar proses pemantauan lebih cepat dan konsisten.' },
        ],
        links: [
            { text: 'Live Demo', url: 'https://buahkita.vercel.app/' },
            { text: 'GitHub', url: '#' }
        ]
    },
    {
        title: 'Semanan Care',
        image: '/semanan.png',
        description: 'Community issue monitoring system for kelurahan operations.',
        technologies: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
        details: [
            { label: 'Keterangan', text: 'Sistem pelaporan masalah lingkungan dan operasional kelurahan yang bisa digunakan warga dan admin.' },
            { label: 'Teknologi', text: 'React untuk frontend, Node.js dan Express untuk server, MySQL untuk data laporan, dan Tailwind CSS untuk tampilan.' },
            { label: 'Tujuan', text: 'Memudahkan warga melapor dan membantu pihak terkait memantau status penanganan dengan lebih rapi.' },
        ],
        links: [
            { text: 'Live Demo', url: '#' },
            { text: 'GitHub', url: '#' }
        ]
    },
    {
        title: 'TOMATGUARD',
        image: '/tomatguard.svg',
        description: 'IoT-based tomato plant monitoring system with real-time dashboard.',
        technologies: ['ESP32', 'React', 'Node.js', 'YOLOv8', 'Random Forest'],
        details: [
            { label: 'Keterangan', text: 'Dashboard web untuk memantau data lingkungan dan kondisi tanaman tomat secara real time.' },
            { label: 'Teknologi', text: 'ESP32 dan kamera digunakan untuk monitoring, backend API untuk pengolahan data, serta YOLOv8 dan Random Forest untuk analisis kondisi tanaman.' },
            { label: 'Tujuan', text: 'Membantu pemantauan pertumbuhan tanaman dan memperkirakan kondisi tanaman berdasarkan data yang dikumpulkan.' },
        ],
        links: [
            { text: 'GitHub', url: '#' }
        ]
    },
]

export const skills = [
    { image: '/html5.png', alt: 'HTML5', category: 'Frontend' },
    { image: '/css3.svg', alt: 'CSS3', category: 'Frontend' },
    { image: '/javascript.png', alt: 'JavaScript', category: 'Frontend' },
    { image: '/Typescript_logo_2020.svg.png', alt: 'TypeScript', category: 'Frontend' },
    { image: '/Tailwindpng.png', alt: 'Tailwind CSS', category: 'Frontend' },
    { image: '/react.svg', alt: 'React', category: 'Frontend' },
    { image: '/reactNative.png', alt: 'React Native', category: 'Frontend' },
    { image: '/nodejs.png', alt: 'Node.js', category: 'Backend' },
    { image: '/express.png', alt: 'Express.js', category: 'Backend' },
    { image: '/php.jpg', alt: 'PHP', category: 'Backend' },
    { image: '/c++.png', alt: 'C++', category: 'IoT' },
    { image: '/img/python.svg', alt: 'Python', category: 'Backend' },
]

export const certifications = [
    {
        title: 'JavaScript Programming Fundamentals',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Programming'
    },
    {
        title: 'Front-End Web Development for Beginners',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Frontend'
    },
    {
        title: 'Web Application Development with React',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Frontend'
    },
    {
        title: 'Beginner Back-End Development with JavaScript',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Backend'
    },
    {
        title: 'Fundamental React Web Applications',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Frontend'
    },
    {
        title: 'Fundamental Back-End Development with JavaScript',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Backend'
    },
    {
        title: 'CCNAv7: Introduction to Networks',
        issuer: 'Cisco Networking Academy',
        date: '2024',
        category: 'Networking'
    },
    {
        title: 'CCNA: Switching, Routing and Wireless Essentials',
        issuer: 'Cisco Networking Academy',
        date: '2024',
        category: 'Networking'
    },
    {
        title: 'CCNA: Enterprise Networking, Security and Automation',
        issuer: 'Cisco Networking Academy',
        date: '2024',
        category: 'Networking'
    },
    {
        title: 'Cisco CyberOps Associate',
        issuer: 'Cisco Networking Academy',
        date: '2024',
        category: 'Networking'
    },
    {
        title: 'React Web Developer Expert',
        issuer: 'Dicoding Indonesia',
        date: '2024',
        category: 'Frontend'
    },
    {
        title: 'Web Programming Fundamentals',
        issuer: 'Dicoding Indonesia',
        date: '2026',
        category: 'Programming'
    },
    {
        title: 'AWS Cloud and Generative AI Fundamentals',
        issuer: 'AWS Skill Builder',
        date: '2026',
        category: 'Cloud'
    },
    {
        title: 'Introduction to Programming Logic (Programming Logic 101)',
        issuer: 'Dicoding Indonesia',
        date: '2026',
        category: 'Programming'
    },
    {
        title: 'Introduction to Programming for Software Development',
        issuer: 'Dicoding Indonesia',
        date: '2026',
        category: 'Programming'
    }
]

export const education = [
    {
        institution: 'IPB University',
        degree: 'Teknologi Rekayasa Komputer',
        field: 'Computer Engineering Technology',
        startDate: '2023',
        endDate: '2027',
        gpa: '3.46',
        description: 'Focus on IoT, Fullstack Web Development, and Networking. Member of IoT Development Club.'
    }
]

export const achievements = [
    {
        title: 'Juara 3 Web Development Competition',
        event: 'Universitas Katolik Soegijapranata 2026',
        date: '2026',
        description: 'Recognized for excellence in web development with modern tech stack and clean design.'
    }
]