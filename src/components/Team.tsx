import React from "react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  bgColor: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Suresh",
    role: "Team Lead, web app developement",
    description:
      "Expert in algorithm visualization and frontend development. Contributing to making complex algorithms more understandable.",
    imageUrl: "/images/team/member1.png",
    bgColor: "bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200",
  },
  {
    id: 2,
    name: "Greeshma P G",
    role: "Quadratic sorting algos Vizualization",
    description:
      "Specialized in developing interactive features and ensuring smooth user experience in algorithm visualization.",
    imageUrl: "/images/team/member2.png",
    bgColor: "bg-gradient-to-r from-gray-100 to-gray-200",
  },
  {
    id: 3,
    name: "Raman Kumar",
    role: "Quasilinear sorting algos visualization",
    description:
      "Focused on implementing sorting algorithms and creating intuitive visual representations for better understanding.",
    imageUrl: "/images/team/member3.png",
    bgColor: "bg-gradient-to-r from-green-100 to-green-200",
  },
];

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="group relative w-80 overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
      <div className={`absolute inset-0 ${member.bgColor} opacity-75`}></div>

      {/* Image Container - Perfect square at the top */}
      <div className="relative w-80 h-80 overflow-hidden">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Text Content */}
      <div className="relative space-y-2 p-5">
        <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
        <p className="text-sm font-medium text-muted-foreground">
          {member.role}
        </p>
        <p className="text-sm text-muted-foreground/80 line-clamp-2">
          {member.description}
        </p>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Our Team (RGS)
        </h2>
        <p className="text-base text-muted-foreground">
          Meet the team behind the Sorting Algorithm Visualizer.
        </p>
      </div>

      <div className="grid place-items-center gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
