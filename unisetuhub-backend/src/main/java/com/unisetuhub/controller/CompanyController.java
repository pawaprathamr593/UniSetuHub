package com.unisetuhub.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.unisetuhub.entity.Company;
import com.unisetuhub.service.CompanyService;

@RestController
@RequestMapping("/companies")

public class CompanyController {

    private final CompanyService companyService;

    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping
    public List<Company> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(
            @PathVariable String id) {

        Company company =
                companyService.getCompanyById(id);

        if (company == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(company);
    }

    @PostMapping
    public Company addCompany(
            @RequestBody Company company) {

        return companyService.addCompany(company);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(
            @PathVariable String id,
            @RequestBody Company company) {

        Company updated =
                companyService.updateCompany(id, company);

        if (updated == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompany(
            @PathVariable String id) {

        boolean deleted =
                companyService.deleteCompany(id);

        if (!deleted) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.noContent().build();
    }
}