package kth.gettested;

import kth.gettested.modules.country.Country;
import kth.gettested.modules.country.CountryService;
import kth.gettested.modules.patient.Patient;
import kth.gettested.modules.patient.PatientService;
import kth.gettested.modules.reports.Reports;
import kth.gettested.modules.reports.ReportsService;
import kth.gettested.modules.tests.TestLookupService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyController {

    private final CountryService countryService;

    private final PatientService patientService;
    private final ReportsService reportsService;
    private final TestLookupService testLookupService;

    @Autowired
    public MyController(CountryService countryService, PatientService patientService, ReportsService reportsService, TestLookupService testLookupService) {
        this.countryService = countryService;
        this.patientService = patientService;
        this.reportsService = reportsService;
        this.testLookupService = testLookupService;
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
    @GetMapping("/statistics/test3")
    public ResponseEntity<List<Reports>> getPatientStatisticsForTest(@RequestParam(name = "query",required = false, defaultValue = "Food Intolerance (40 items)") String query) {
        ObjectId id =  testLookupService.getTestIdByName(query);
        List<Reports> reportsByTestId = reportsService.getReportsByTestId(id);
        return new ResponseEntity<>(reportsByTestId, HttpStatus.OK);
    }
    @GetMapping("/statistics/test")
    public ResponseEntity<List<Reports>> getPatientStatisticsForTest(){
        ObjectId id =  testLookupService.getTestIdByName("Food Intolerance (40 items)");
        List<Reports> reportsByTestId = reportsService.getReportsByTestId(id);
        return new ResponseEntity<>(reportsByTestId, HttpStatus.OK);
    }



    @GetMapping("/statistics/testAndGender")
    public ResponseEntity<List<Reports>> getPatientStatisticsForTestAndGender(@RequestParam(name = "query",required = false, defaultValue = "Food Intolerance (40 items)") String query,
                                                                              @RequestParam(name = "gender",required = false, defaultValue = "Male") String gender) {
        System.out.println(query +" "+gender);
        ObjectId id =  testLookupService.getTestIdByName(query);
        List<Reports> reportsByTestId = reportsService.getReportsByTestIdAndPatientGender(id,gender);
        return new ResponseEntity<>(reportsByTestId, HttpStatus.OK);
    }

    @GetMapping("/reports/getAll")
    public ResponseEntity<List<Reports>> getAllReports() {
        List<Reports> allReports = reportsService.getAllReports();
        return new ResponseEntity<>(allReports, HttpStatus.OK);
    }

    // MyController.java
    @GetMapping("/reports/byTestIdAndDateRange")
    public ResponseEntity<List<Reports>> getReportsByTestIdAndDateRange(
            @RequestParam String testName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {

        ObjectId testId = testLookupService.getTestIdByName(testName);
        List<Reports> reports = reportsService.getReportsByTestIdAndDateRange(testId, startDate, endDate);
        return reports.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(reports, HttpStatus.OK);
    }

}
