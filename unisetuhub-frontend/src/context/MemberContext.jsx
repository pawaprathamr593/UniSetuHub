import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { useAuth } from "./AuthContext";

const MemberContext = createContext();

export function MemberProvider({ children }) {
  const { users = [], fetchUsers } = useAuth();

  const [members, setMembers] = useState([]);

  /*
   * =========================================================
   * LOAD BACKEND USERS
   * =========================================================
   */

  useEffect(() => {
    if (users.length > 0) {
      setMembers(users);
    }
  }, [users]);

  /*
   * =========================================================
   * REFRESH MEMBERS
   * =========================================================
   */

  const fetchMembers = async () => {
    const data = await fetchUsers();

    if (Array.isArray(data)) {
      setMembers(data);
    }

    return data;
  };

  /*
   * =========================================================
   * GET MEMBER BY ID
   * =========================================================
   */

  const getMemberById = (memberId) => {
    return (
      members.find(
        (member) =>
          String(member?.id) === String(memberId)
      ) || null
    );
  };

  /*
   * =========================================================
   * GET MEMBERS BY COMPANY
   * =========================================================
   */

  const getCompanyMembers = (companyId) => {
    if (!companyId) {
      return [];
    }

    return members.filter(
      (member) =>
        String(
          member?.company?.id ||
          member?.companyId ||
          ""
        ) === String(companyId)
    );
  };

  /*
   * =========================================================
   * GET MEMBERS BY IDS
   * =========================================================
   */

  const getMembersByIds = (memberIds = []) => {
    return members.filter((member) =>
      memberIds.some(
        (id) =>
          String(id) === String(member?.id)
      )
    );
  };

  /*
   * =========================================================
   * FULL NAME
   * =========================================================
   */

  const getMemberFullName = (member) => {
    if (!member) {
      return "";
    }

    return (
      member.name ||
      `${member.firstName || ""} ${
        member.surname || ""
      }`.trim()
    );
  };

  /*
   * =========================================================
   * REMOVE MEMBER FROM PROJECT
   * =========================================================
   *
   * IMPORTANT:
   *
   * This should NOT delete the employee from
   * the /users table.
   *
   * It should only be handled by updating
   * the project membership.
   *
   */

  const removeMember = async (
    projectId,
    memberId
  ) => {
    /*
     * ProjectContext should handle this.
     *
     * We do NOT delete the employee.
     */

    return {
      success: true,
    };
  };

  return (
    <MemberContext.Provider
      value={{
        members,

        fetchMembers,

        getMemberById,

        getCompanyMembers,

        getMembersByIds,

        getMemberFullName,

        removeMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export function useMembers() {
  return useContext(MemberContext);
}