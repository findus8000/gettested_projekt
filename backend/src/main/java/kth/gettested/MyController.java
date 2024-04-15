package kth.gettested;

import kth.gettested.modules.country.Country;
import kth.gettested.modules.country.CountryService;
import kth.gettested.modules.patient.Patient;
import kth.gettested.modules.patient.PatientService;
import kth.gettested.modules.reports.Reports;
import kth.gettested.modules.reports.ReportsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class MyController {

    private final CountryService countryService;

    private final PatientService patientService;
    private final ReportsService reportsService;

    @Autowired
    public MyController(CountryService countryService, PatientService patientService, ReportsService reportsService) {
        this.countryService = countryService;
        this.patientService = patientService;
        this.reportsService = reportsService;
    }

    @GetMapping("/country/getAll")
    public ResponseEntity<List<Country>> readAllCountry() {
        List<Country> entities = countryService.readAllCountry();
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }

    @GetMapping("/patient/getAll")
    public ResponseEntity<List<Patient>> getAllPatientGenders() {
        List<Patient> patientGenders = patientService.getAllPatientGenders();
        return new ResponseEntity<>(patientGenders, HttpStatus.OK);
    }

    @GetMapping("/reports/getAll")
    public ResponseEntity<List<Reports>> getAllReports() {
        List<Reports> allReports = reportsService.getAllReports();
        return new ResponseEntity<>(allReports, HttpStatus.OK);
    }
}
