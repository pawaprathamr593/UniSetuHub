
package com.unisetuhub.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.unisetuhub.entity.Company;
import com.unisetuhub.entity.User;
import com.unisetuhub.repository.CompanyRepository;
import com.unisetuhub.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;

    public UserService(
            UserRepository userRepository,
            CompanyRepository companyRepository) {

        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    // Get all users
    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(String id) {

        return userRepository.findById(id)
                .orElse(null);
    }

    // Get user by email
    public User getUserByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElse(null);
    }

    // Add user
    public User addUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return null;
        }

        // Make sure company is provided
        if (user.getCompany() == null ||
                user.getCompany().getId() == null) {

            throw new RuntimeException(
                    "Company ID is required."
            );
        }

        // Find company from database
        Company company = companyRepository
                .findById(user.getCompany().getId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company not found."
                        )
                );

        // Set actual Company entity
        user.setCompany(company);

        return userRepository.save(user);
    }

    // Update user
    public User updateUser(
            String id,
            User updatedUser) {

        User existingUser =
                userRepository.findById(id)
                        .orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setFirstName(
                updatedUser.getFirstName()
        );

        existingUser.setSurname(
                updatedUser.getSurname()
        );

        existingUser.setEmail(
                updatedUser.getEmail()
        );

        existingUser.setPassword(
                updatedUser.getPassword()
        );

        existingUser.setRole(
                updatedUser.getRole()
        );

        // Update company
        if (updatedUser.getCompany() != null &&
                updatedUser.getCompany().getId() != null) {

            Company company = companyRepository
                    .findById(
                            updatedUser.getCompany().getId()
                    )
                    .orElse(null);

            if (company == null) {
                return null;
            }

            existingUser.setCompany(company);
        }

        return userRepository.save(existingUser);
    }

    // Delete user
    public boolean deleteUser(String id) {

        if (!userRepository.existsById(id)) {
            return false;
        }

        userRepository.deleteById(id);

        return true;
    }

    // Login
    public User login(
            String email,
            String password) {

        User user =
                userRepository.findByEmail(email)
                        .orElse(null);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }
}

