import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CompanyContext = createContext(null);

const API_URL = "http://localhost:8080";

export function CompanyProvider({ children }) {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/companies`);

      if (!response.ok) {
        throw new Error("Failed to fetch companies.");
      }

      const data = await response.json();

      setCompanies(Array.isArray(data) ? data : []);

      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error("Fetch companies error:", err);

      setError(
        err?.message || "Unable to load companies."
      );

      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCompanyById = (companyId) => {
    return companies.find(
      (company) =>
        String(company?.id) === String(companyId)
    );
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loading,
        error,
        fetchCompanies,
        getCompanyById,
        setCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}

/*
 * Used by Companies.jsx
 */
export function useCompanies() {
  return useContext(CompanyContext);
}

/*
 * Used by Employees.jsx
 */
export function useCompany() {
  return useContext(CompanyContext);
}