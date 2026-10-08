package com.enterprise.hrms.initializer;

import com.enterprise.hrms.model.*;
import com.enterprise.hrms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            // Seed Employee
            User empUser = User.builder()
                    .email("revanth.k@enterprise.com")
                    .password(passwordEncoder.encode("password"))
                    .role(Role.EMPLOYEE)
                    .build();
            userRepository.save(empUser);

            Employee emp = Employee.builder()
                    .id("EMP-1024")
                    .name("Revanth Kumar")
                    .email("revanth.k@enterprise.com")
                    .department("Engineering")
                    .designation("Senior Software Developer")
                    .joiningDate(LocalDate.of(2023, 3, 15))
                    .status("ACTIVE")
                    .manager("Sarah Jenkins")
                    .workLocation("Bengaluru HQ")
                    .phone("+91 98765 43210")
                    .gender("Male")
                    .dob(LocalDate.of(1996, 8, 24))
                    .address("Indiranagar 100ft Rd, Bengaluru, KA")
                    .emergencyContact("+91 98765 00000")
                    .employmentType("Full-time Permanent")
                    .qrToken("QR-EMP-1024-SECURE-HASH-88392")
                    .basicSalary(new BigDecimal("58000"))
                    .avatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250")
                    .user(empUser)
                    .build();
            employeeRepository.save(emp);

            // Seed Manager
            User mgrUser = User.builder()
                    .email("sarah.j@enterprise.com")
                    .password(passwordEncoder.encode("password"))
                    .role(Role.MANAGER)
                    .build();
            userRepository.save(mgrUser);

            Employee mgr = Employee.builder()
                    .id("MGR-2001")
                    .name("Sarah Jenkins")
                    .email("sarah.j@enterprise.com")
                    .department("Engineering")
                    .designation("VP of Engineering")
                    .joiningDate(LocalDate.of(2021, 6, 1))
                    .status("ACTIVE")
                    .manager("Eleanor Vance")
                    .workLocation("Bengaluru HQ")
                    .phone("+91 98765 11111")
                    .qrToken("QR-MGR-2001-SECURE-HASH-11203")
                    .basicSalary(new BigDecimal("140000"))
                    .avatar("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250")
                    .user(mgrUser)
                    .build();
            employeeRepository.save(mgr);

            System.out.println(">>> Initialized Seed Data for Digital Employee Platform");
        }
    }
}
