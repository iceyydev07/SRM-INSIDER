export interface Post {
  id: string
  title: string
  description: string
  category: "Placements" | "Internships" | "Campus Life"
  content: string
  date: string
  author: string
  readTime: string
}

export const posts: Post[] = [
  {
    id: "1",
    title: "Amazon Internship Experience",
    description: "A detailed walkthrough of my 2-month summer internship at Amazon as a Software Development Engineer intern.",
    category: "Internships",
    content: `My journey at Amazon began when I received the offer letter after clearing 3 rounds of interviews. The internship was a transformative experience that shaped my understanding of large-scale software development.

**The Interview Process**
The interview process consisted of an online assessment followed by two technical interviews. The online assessment tested data structures, algorithms, and problem-solving skills. The technical interviews focused on system design and coding problems.

**The Work Experience**
During my internship, I worked on the AWS team, specifically on improving the performance of their cloud infrastructure services. My project involved optimizing database queries and implementing caching mechanisms that resulted in a 40% improvement in response times.

**Key Learnings**
- Working with distributed systems at scale
- Agile development methodologies
- Code review best practices
- Writing production-ready code with comprehensive testing

**Tips for Future Interns**
1. Start preparing early - at least 3-4 months before the interview
2. Practice LeetCode problems consistently
3. Understand Amazon's Leadership Principles
4. Be prepared to discuss your projects in detail

The internship also included various networking events, tech talks, and mentorship sessions that provided invaluable insights into the tech industry.`,
    date: "2024-03-15",
    author: "Rahul Sharma",
    readTime: "8 min read"
  },
  {
    id: "2",
    title: "Top Placements at SRM 2024",
    description: "Comprehensive analysis of the placement statistics and top recruiters at SRM University this year.",
    category: "Placements",
    content: `SRM University has once again demonstrated its commitment to student success with outstanding placement results for the 2024 batch.

**Placement Highlights**
- Highest Package: 54 LPA (Google)
- Average Package: 8.2 LPA
- Total Companies Visited: 450+
- Students Placed: 85%+

**Top Recruiters**
1. Google - 15 offers
2. Microsoft - 22 offers
3. Amazon - 35 offers
4. Goldman Sachs - 12 offers
5. Adobe - 18 offers

**Department-wise Analysis**
The Computer Science department led the placements with an average package of 12 LPA, followed by Electronics and Information Technology departments.

**Preparation Resources**
- University placement cell workshops
- Alumni mentorship programs
- Industry expert sessions
- Mock interview rounds

**Success Stories**
Several students received multiple offers, with some securing international positions in the US, Singapore, and Europe. The placement cell's focused approach on skill development and industry connections played a crucial role in these achievements.`,
    date: "2024-03-10",
    author: "Placement Cell",
    readTime: "6 min read"
  },
  {
    id: "3",
    title: "Campus Fest Highlights - Aaruush 2024",
    description: "Relive the best moments from SRM's annual technical and cultural festival Aaruush.",
    category: "Campus Life",
    content: `Aaruush 2024, SRM's flagship technical festival, was a spectacular celebration of innovation, creativity, and talent.

**Event Overview**
The four-day festival witnessed participation from over 50,000 students across 200+ colleges nationwide. With a prize pool of Rs. 50 lakhs, the competition was fierce and exciting.

**Major Events**
- Hackathon: 48-hour coding marathon with 500+ participants
- Robotics Championship: Teams showcased autonomous and manual robots
- Business Plan Competition: Startup ideas pitched to real investors
- Cultural Night: Performances by renowned artists

**Technical Workshops**
Industry experts from companies like Google, Microsoft, and startups conducted hands-on workshops on:
- Artificial Intelligence and Machine Learning
- Blockchain Development
- Cloud Computing
- Cybersecurity

**Celebrity Appearances**
The cultural nights featured performances by popular artists and bands, drawing crowds of thousands to the main stage.

**Student Testimonials**
"Aaruush gave me the platform to showcase my robotics project and connect with like-minded innovators." - A participant

The festival concluded with a grand closing ceremony recognizing outstanding achievements and contributions.`,
    date: "2024-02-28",
    author: "Student Council",
    readTime: "5 min read"
  },
  {
    id: "4",
    title: "Microsoft Interview Experience",
    description: "How I cracked the Microsoft SDE interview with preparation tips and strategies.",
    category: "Placements",
    content: `After months of preparation, I finally received the offer from Microsoft for the Software Development Engineer role. Here's my complete journey.

**Application Process**
I applied through the campus placement portal. The shortlisting was based on CGPA (minimum 7.5) and coding test scores.

**Round 1: Online Assessment**
The online test had three coding problems of varying difficulty:
- Easy: Array manipulation (15 min)
- Medium: Dynamic programming (30 min)
- Hard: Graph algorithm (45 min)

I solved all three problems within the time limit, which helped me get shortlisted for interviews.

**Round 2: Technical Interview 1**
This round focused on data structures and algorithms. Questions included:
- LRU Cache implementation
- Binary tree problems
- String manipulation

**Round 3: Technical Interview 2**
System design questions:
- Design a URL shortener
- Design a notification system

**Round 4: HR Interview**
Behavioral questions about teamwork, challenges, and career goals.

**Preparation Strategy**
- Solved 300+ LeetCode problems
- Studied "Cracking the Coding Interview"
- Practiced system design on YouTube
- Mock interviews with peers

**Final Tips**
Stay calm, think aloud, and don't hesitate to ask clarifying questions!`,
    date: "2024-03-05",
    author: "Priya Patel",
    readTime: "7 min read"
  },
  {
    id: "5",
    title: "Google Summer of Code Guide",
    description: "Complete roadmap to getting selected for GSoC and making the most of this opportunity.",
    category: "Internships",
    content: `Google Summer of Code (GSoC) is one of the most prestigious open-source programs for students. Here's how you can get selected.

**What is GSoC?**
GSoC is a global program that offers students stipends to write code for open-source projects during the summer. It's not just about coding - it's about becoming part of the open-source community.

**Eligibility**
- Must be 18+ years old
- Enrolled in an accredited institution
- Eligible to work in your country

**Timeline**
- January: Organizations announced
- March: Student applications open
- May-August: Coding period

**How to Get Selected**
1. **Start Early**: Begin contributing to open source at least 6 months before applications
2. **Choose Your Organization**: Find projects that align with your interests and skills
3. **Make Contributions**: Submit PRs, fix bugs, improve documentation
4. **Build Relationships**: Engage with the community on Slack/Discord
5. **Write a Strong Proposal**: Be specific, detailed, and realistic

**My Experience**
I was selected for GSoC with Mozilla, working on Firefox Developer Tools. The experience taught me:
- Professional code review practices
- Writing maintainable code
- Effective remote communication

**Benefits**
- Stipend: $1500-$6600 depending on location
- Mentorship from industry experts
- Global recognition
- Open source portfolio`,
    date: "2024-02-20",
    author: "Arun Kumar",
    readTime: "9 min read"
  },
  {
    id: "6",
    title: "Hostel Life Survival Guide",
    description: "Everything you need to know about living in SRM hostels - from food to friends.",
    category: "Campus Life",
    content: `Moving into the hostel is a significant milestone in every student's college journey. Here's your comprehensive guide to thriving in SRM hostels.

**Accommodation Options**
- Single occupancy (AC/Non-AC)
- Double sharing (AC/Non-AC)
- Triple sharing (Non-AC)

**What to Pack**
- Essential documents (ID proofs, admission letter)
- Bedding (mattress covers, pillows, blankets)
- Electronics (laptop, extension cords, portable charger)
- Toiletries and medicines
- Study materials

**Food Scene**
The hostel mess provides three meals daily. The food is decent with rotating menus. For variety, explore:
- Campus food court with multiple cuisines
- Nearby restaurants and cafes
- Midnight snack runs to local shops

**Making Friends**
- Attend orientation events
- Join hostel clubs and activities
- Study groups are great for bonding
- Celebrate festivals together

**Study Tips**
- Find quiet study spots (library, common rooms late night)
- Form study groups for difficult subjects
- Balance social life and academics

**Safety and Rules**
- Hostel timings: 6 AM - 10:30 PM (weekdays)
- Guest policies
- Electrical appliance restrictions

**Pro Tips**
1. Make friends with your roommate early
2. Keep your valuable secure
3. Respect quiet hours
4. Participate in hostel events`,
    date: "2024-01-15",
    author: "Hostel Committee",
    readTime: "6 min read"
  },
  {
    id: "7",
    title: "Goldman Sachs Interview Prep",
    description: "Breaking down the Goldman Sachs recruitment process and how to prepare for it.",
    category: "Placements",
    content: `Goldman Sachs is one of the most sought-after recruiters at SRM. Here's everything you need to know about their interview process.

**About the Role**
GS recruits for multiple roles:
- Technology Analyst
- Operations Analyst
- Research Analyst

**Eligibility Criteria**
- CGPA: 7.0+
- No active backlogs
- All branches eligible for tech roles

**Selection Process**

**Round 1: Online Test (HackerRank)**
- Aptitude section (Verbal, Quant, Logical)
- Technical MCQs (CS fundamentals)
- 2 Coding problems

**Round 2: Technical Interview**
- DSA problems on whiteboard
- OOPS concepts
- Database queries
- Project discussion

**Round 3: Technical + HR**
- More coding problems
- Behavioral questions using STAR method
- "Why Goldman Sachs?"

**Preparation Resources**
- InterviewBit for DSA
- PrepInsta for aptitude
- Company's official careers page
- Glassdoor interview experiences

**Compensation**
Base salary for freshers: 15-20 LPA
+ Bonuses and benefits

**Culture at GS**
Known for work-life balance initiatives, learning opportunities, and strong alumni network.`,
    date: "2024-03-01",
    author: "Career Services",
    readTime: "7 min read"
  },
  {
    id: "8",
    title: "Starting a Startup at College",
    description: "How SRM's incubation center helped me launch my startup during my final year.",
    category: "Campus Life",
    content: `The entrepreneurial bug bit me in my third year, and by final year, I had launched a full-fledged startup. Here's my story.

**The Idea**
It started with a simple problem - students struggling to find affordable study materials. We built a platform to buy, sell, and rent textbooks among students.

**SRM's Support**
The university's Technology Business Incubator (TBI) provided:
- Office space and infrastructure
- Seed funding up to Rs. 5 lakhs
- Mentorship from successful entrepreneurs
- Legal and financial guidance
- Networking opportunities

**The Journey**
1. **Ideation Phase**: Validated the problem through surveys
2. **MVP Development**: Built a basic app in 2 months
3. **Launch**: Started with SRM campus only
4. **Growth**: Expanded to 5 colleges in Chennai
5. **Funding**: Raised angel investment of Rs. 25 lakhs

**Challenges Faced**
- Balancing academics and startup
- Finding the right co-founders
- Technical hurdles
- Initial user acquisition

**Key Learnings**
- Start small, iterate fast
- Talk to your users constantly
- Build a strong team
- Don't fear failure

**Resources at SRM**
- E-Cell events and competitions
- IIC (Institution's Innovation Council)
- Alumni entrepreneur network
- Industry partnerships

**Advice for Aspiring Entrepreneurs**
Your college years are the best time to experiment. You have minimal responsibilities, access to talent, and institutional support. Take the leap!`,
    date: "2024-02-10",
    author: "Vikash Reddy",
    readTime: "8 min read"
  }
]

export const categories = ["All", "Placements", "Internships", "Campus Life"] as const
export type Category = typeof categories[number]
