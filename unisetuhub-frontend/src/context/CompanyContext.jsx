import { createContext, useContext, useState } from "react";

const CompanyContext = createContext();

/*
 * =========================================================
 * MOCK COMPANIES
 * =========================================================
 *
 * Temporary frontend data.
 * Later this will come from Spring Boot + MySQL.
 */

const initialCompanies = [
    {
        id: "COMP001",
        name: "UniSetu Technologies",
        email: "admin@unisetutech.com",
        phone: "+91 9876543210",
        address: "Pune, Maharashtra",
        status: "ACTIVE",
        headId: "EMP001",
    },

    {
        id: "COMP002",
        name: "TechNova Solutions",
        email: "contact@technova.com",
        phone: "+91 9876543211",
        address: "Mumbai, Maharashtra",
        status: "ACTIVE",
        headId: null,
    },
];

/*
 * =========================================================
 * COMPANY PROVIDER
 * =========================================================
 */

export function CompanyProvider({ children }) {

    const [companies, setCompanies] =
        useState(initialCompanies);

    /*
     * =======================================================
     * GET COMPANY BY ID
     * =======================================================
     */

    const getCompanyById = (companyId) => {

        if (!companyId) {
            return null;
        }

        return companies.find(
            (company) => company.id === companyId
        ) || null;
    };

    /*
     * =======================================================
     * GET CURRENT USER COMPANY
     * =======================================================
     *
     * AuthContext provides companyId.
     *
     * CompanyContext provides actual company details.
     */

    const getCompanyForUser = (user) => {

        if (!user?.companyId) {
            return null;
        }

        return getCompanyById(user.companyId);
    };

    /*
     * =======================================================
     * ADD COMPANY
     * =======================================================
     */

    const addCompany = (company) => {

        const newCompany = {
            ...company,
            id: company.id || `COMP${Date.now()}`,
            status: company.status || "ACTIVE",
        };

        setCompanies((prev) => [
            ...prev,
            newCompany,
        ]);

        return newCompany;
    };

    /*
     * =======================================================
     * UPDATE COMPANY
     * =======================================================
     */

    const updateCompany = (companyId, updatedData) => {

        setCompanies((prev) =>
            prev.map((company) =>
                company.id === companyId
                    ? {
                        ...company,
                        ...updatedData,
                    }
                    : company
            )
        );
    };

    /*
     * =======================================================
     * DELETE COMPANY
     * =======================================================
     */

    const deleteCompany = (companyId) => {

        setCompanies((prev) =>
            prev.filter(
                (company) => company.id !== companyId
            )
        );
    };

    /*
     * =======================================================
     * COMPANY COUNT
     * =======================================================
     */

    const companyCount = companies.length;

    /*
     * =======================================================
     * CONTEXT VALUE
     * =======================================================
     */

    return (
        <CompanyContext.Provider
            value={{

                /*
                 * Company data
                 */

                companies,

                companyCount,

                /*
                 * Company operations
                 */

                getCompanyById,

                getCompanyForUser,

                addCompany,

                updateCompany,

                deleteCompany,

            }}
        >
            {children}
        </CompanyContext.Provider>
    );
}

/*
 * =========================================================
 * USE COMPANY HOOK
 * =========================================================
 */

export function useCompany() {

    return useContext(CompanyContext);
}