// data/team-members.ts
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  backgroundImage: string;
  description: string;
  biography: string;
  email: string;
  phone: string;
  location: string;
  education: string[];
  barAdmissions: string[];
  professionalMemberships: string[];
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export const teamMembers: TeamMember[] = [
  {
    id: "jhon-d",
    name: "Jhon D",
    role: "Lawyer",
    image: "/team-member-1.png",
    backgroundImage: "/attorney.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quam mattis tristique id eras odio leo. Condimentum tristique etiam amet tincidunt viverra. Est amet arcu eu commodo tempus lorem. Rhoncus ultrices imperdiet et velit suspendisse mi. Sit lectus vel aliquam sit faucibus. Elit sed placerat urna feugiat sollicitudin.",
    biography:
      "Jhon D is a seasoned attorney with over 15 years of experience in criminal defense and white-collar litigation. His background spans both prosecution and defense, giving him unique insights into case strategy and courtroom tactics. Known for his meticulous preparation and persuasive advocacy, Jhon has successfully represented clients in complex federal and state matters. His approach combines rigorous legal analysis with practical problem-solving, earning him recognition among peers and clients alike. Before entering private practice, Jhon served as an Assistant District Attorney, where he prosecuted serious felony cases and developed his trial skills.",
    email: "jhon.d@cwwhite.com",
    phone: "+1 (555) 123-4567",
    location: "Houston, TX",
    education: [
      "J.D., Harvard Law School - magna cum laude",
      "B.A., University of Texas at Austin - Political Science",
    ],
    barAdmissions: [
      "Texas and New York",
      "U.S. District Courts for the Northern, Western, and Southern Districts of Texas",
      "U.S. Court of Appeals for the Fifth Circuit",
    ],
    professionalMemberships: [
      "American Bar Association",
      "Houston Bar Association",
      "National Association of Criminal Defense Lawyers",
      "Texas Criminal Defense Lawyers Association",
      "Federal Bar Association",
    ],
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "jenny-smith",
    name: "Jenny Smith",
    role: "Lawyer",
    image: "/team-member-2.png",
    backgroundImage: "/attorney.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quam mattis tristique id eras odio leo. Condimentum tristique etiam amet tincidunt viverra. Est amet arcu eu commodo tempus lorem. Rhoncus ultrices imperdiet et velit suspendisse mi. Sit lectus vel aliquam sit faucibus. Elit sed placerat urna feugiat sollicitudin.",
    biography:
      "Jenny Smith is a distinguished trial attorney specializing in white-collar criminal defense and complex civil litigation. With a sharp analytical mind and commanding courtroom presence, she has secured favorable outcomes in high-stakes cases involving fraud, embezzlement, and regulatory violations. Jenny's practice emphasizes early case assessment, strategic motion practice, and aggressive trial advocacy. Her clients value her accessibility, clear communication, and unwavering commitment to their defense. Prior to joining C.W. White, Jenny worked at a prominent national law firm where she handled multi-district litigation and represented Fortune 500 companies.",
    email: "jenny.smith@cwwhite.com",
    phone: "+1 (555) 234-5678",
    location: "Houston, TX",
    education: [
      "J.D., Yale Law School - Order of the Coif",
      "M.B.A., Stanford Graduate School of Business",
      "B.S., Duke University - Economics",
    ],
    barAdmissions: [
      "Texas, California, and Illinois",
      "U.S. District Courts for all Districts of Texas",
      "U.S. District Court for the Northern District of California",
    ],
    professionalMemberships: [
      "Federal Bar Association",
      "Houston Bar Association",
      "Women's White Collar Defense Association",
      "American Association for Justice",
      "Texas Bar Foundation, Fellow",
    ],
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "jack",
    name: "Jack",
    role: "Lawyer",
    image: "/team-member-3.png",
    backgroundImage: "/attorney.png",
    description:
      "Lorem ipsum dolor sit amet consectetur. Quam mattis tristique id eras odio leo. Condimentum tristique etiam amet tincidunt viverra. Est amet arcu eu commodo tempus lorem. Rhoncus ultrices imperdiet et velit suspendisse mi. Sit lectus vel aliquam sit faucibus. Elit sed placerat urna feugiat sollicitudin.",
    biography:
      "Jack is an accomplished attorney with a focus on criminal defense and appellate advocacy. His practice encompasses a wide range of criminal matters, from DWI defense to serious felony charges. Jack is known for his creative legal arguments and thorough understanding of constitutional law. He has successfully argued before various appellate courts, securing reversals and favorable rulings for his clients. His dedication to justice and client advocacy has earned him numerous accolades and the respect of the legal community. Jack also volunteers with innocence projects and provides pro bono representation to those in need.",
    email: "jack@cwwhite.com",
    phone: "+1 (555) 345-6789",
    location: "Houston, TX",
    education: [
      "J.D., University of Michigan Law School - cum laude",
      "B.A., Rice University - History",
    ],
    barAdmissions: [
      "Texas and Louisiana",
      "U.S. District Courts for the Southern and Eastern Districts of Texas",
      "U.S. Court of Appeals for the Fifth Circuit",
    ],
    professionalMemberships: [
      "State Bar of Texas",
      "Houston Criminal Defense Lawyers Association",
      "National Association of Criminal Defense Lawyers",
      "Texas Criminal Defense Lawyers Association",
      "Innocence Project of Texas, Volunteer Attorney",
    ],
    socialLinks: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
];

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}
