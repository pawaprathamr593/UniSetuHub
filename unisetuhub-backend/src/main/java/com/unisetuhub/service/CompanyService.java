package com.unisetuhub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.Company;
import com.unisetuhub.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company getCompanyById(String id) {
        return companyRepository.findById(id)
                .orElse(null);
    }

    public Company addCompany(Company company) {
        return companyRepository.save(company);
    }

    public Company updateCompany(String id, Company updatedCompany) {

        Company existingCompany =
                companyRepository.findById(id)
                .orElse(null);

        if (existingCompany == null) {
            return null;
        }

        existingCompany.setName(updatedCompany.getName());
        existingCompany.setEmail(updatedCompany.getEmail());
        existingCompany.setPhone(updatedCompany.getPhone());
        existingCompany.setAddress(updatedCompany.getAddress());
        existingCompany.setStatus(updatedCompany.getStatus());

        return companyRepository.save(existingCompany);
    }

    public boolean deleteCompany(String id) {

        if (!companyRepository.existsById(id)) {
            return false;
        }

        companyRepository.deleteById(id);
        return true;
    }
}