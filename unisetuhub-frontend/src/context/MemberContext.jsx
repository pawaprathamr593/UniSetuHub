import { createContext, useContext, useState } from "react";

const MemberContext = createContext();

/*
 * =========================================================
 * INITIAL MEMBERS
 * =========================================================
 */

const initialMembers = [
  {
    id: "EMP001",
    initials: "PP",
    name: "Pratham Pawar",
    email: "pratham@example.com",
    role: "Project Admin",
    projectId: "WEB",
  },

  {
    id: "EMP002",
    initials: "AS",
    name: "Amit Sharma",
    email: "amit@example.com",
    role: "Frontend Developer",
    projectId: "WEB",
  },

  {
    id: "EMP003",
    initials: "RK",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    role: "Backend Developer",
    projectId: "WEB",
  },

  {
    id: "EMP004",
    initials: "SK",
    name: "Sneha Kulkarni",
    email: "sneha@example.com",
    role: "UI/UX Designer",
    projectId: "WEB",
  },
];

/*
 * =========================================================
 * MEMBER PROVIDER
 * =========================================================
 */

export function MemberProvider({ children }) {
  const [members, setMembers] = useState(initialMembers);

  /*
   * =========================================================
   * ADD MEMBER
   * =========================================================
   */

  const addMember = (memberData, projectId) => {
    const nameParts = memberData.name
      .trim()
      .split(" ")
      .filter(Boolean);

    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${
            nameParts[nameParts.length - 1][0]
          }`
        : nameParts[0].slice(0, 2);

    /*
     * Generate next employee ID
     *
     * EMP001
     * EMP002
     * EMP003
     * ...
     */

    setMembers((current) => {
      const employeeNumbers = current
        .map((member) =>
          Number(member.id.replace("EMP", ""))
        )
        .filter((number) => !Number.isNaN(number));

      const highestNumber =
        employeeNumbers.length > 0
          ? Math.max(...employeeNumbers)
          : 0;

      const newMember = {
        id: `EMP${String(highestNumber + 1).padStart(
          3,
          "0"
        )}`,

        initials: initials.toUpperCase(),

        name: memberData.name.trim(),

        email: memberData.email.trim(),

        role: memberData.role,

        projectId: projectId?.toUpperCase(),
      };

      return [
        ...current,
        newMember,
      ];
    });
  };

  /*
   * =========================================================
   * REMOVE MEMBER
   * =========================================================
   */

  const removeMember = (memberId) => {
    setMembers((current) =>
      current.filter(
        (member) => member.id !== memberId
      )
    );
  };

  /*
   * =========================================================
   * UPDATE MEMBER
   * =========================================================
   */

  const updateMember = (updatedMember) => {
    setMembers((current) =>
      current.map((member) =>
        member.id === updatedMember.id
          ? {
              ...member,
              ...updatedMember,
            }
          : member
      )
    );
  };

  /*
   * =========================================================
   * GET PROJECT MEMBERS
   * =========================================================
   */

  const getProjectMembers = (projectId) => {
    const projectCode = projectId?.toUpperCase();

    return members.filter(
      (member) => member.projectId === projectCode
    );
  };

  /*
   * =========================================================
   * GET MEMBER BY ID
   * =========================================================
   */

  const getMemberById = (memberId) => {
    return members.find(
      (member) => member.id === memberId
    );
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        addMember,
        removeMember,
        updateMember,
        getProjectMembers,
        getMemberById,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

/*
 * =========================================================
 * USE MEMBERS HOOK
 * =========================================================
 */

export function useMembers() {
  return useContext(MemberContext);
}