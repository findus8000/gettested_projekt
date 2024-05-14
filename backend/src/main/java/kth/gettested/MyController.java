package kth.gettested;

import kth.gettested.modules.country.Country;
import kth.gettested.modules.country.CountryPhoneCodeLookupTable;
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

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MyController {

    private final CountryService countryService;
    private final PatientService patientService;
    private final ReportsService reportsService;
    private final TestLookupService testLookupService;
    private final CountryPhoneCodeLookupTable countryPhoneCodeLookupTable;

    @Autowired
    public MyController(CountryService countryService, PatientService patientService, ReportsService reportsService, TestLookupService testLookupService, CountryPhoneCodeLookupTable countryPhoneCodeLookupTable) {
        this.countryService = countryService;
        this.patientService = patientService;
        this.reportsService = reportsService;
        this.testLookupService = testLookupService;
        this.countryPhoneCodeLookupTable = countryPhoneCodeLookupTable;
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


    @GetMapping("/statistics/testAndGender")
    public ResponseEntity<List<Reports>> getPatientStatisticsForTestAndGender(@RequestParam(name = "query",required = false, defaultValue = "Food Intolerance (40 items)") String query,
                                                                              @RequestParam(name = "gender",required = false, defaultValue = "Male") String gender) {
        ObjectId id =  testLookupService.getTestIdByName(query);
        List<Reports> reportsByTestId = reportsService.getReportsByTestIdAndPatientGender(id,gender);
        return new ResponseEntity<>(reportsByTestId, HttpStatus.OK);
    }

    @GetMapping("/reports/getAll")
    public ResponseEntity<List<Reports>> getAllReports() {
        List<Reports> allReports = reportsService.getAllReports();
        return new ResponseEntity<>(allReports, HttpStatus.OK);
    }


    @GetMapping("/reports/byTestIdAndDateRange")
    public ResponseEntity<List<Reports>> getReportsByTestIdAndDateRange(
            @RequestParam String testName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate) {

        ObjectId testId = testLookupService.getTestIdByName(testName);
        List<Reports> reports = reportsService.getReportsByTestIdAndDateRange(testId, startDate, endDate);
        return reports.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(reports, HttpStatus.OK);
    }

    SimpleDateFormat dateFormatPatientDateOfBirth = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

    @GetMapping("/reports/byTestIdAndDateRangeAndGender")
    public ResponseEntity<List<Reports>> getReportsByTestIdAndDateRangeAndGender(
            @RequestParam String testName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(name = "gender",required = false, defaultValue = "All") String gender,
            @RequestParam(name = "country",required = false, defaultValue = "Germany") String country)  {

        //Test for country code and date:
        String code = countryPhoneCodeLookupTable.getPhoneCodeByCountryName(country);

        Date start = new Date(1800 - 1900, 1 - 1, 1);
        List<Patient> patiento = patientService.getBetween(dateFormatPatientDateOfBirth.format(start), dateFormatPatientDateOfBirth.format(endDate));
        System.out.println("CountryCode:"+code+" "+patiento.size());

        ObjectId testId = testLookupService.getTestIdByName(testName);
        List<Reports> reports = reportsService.getReportsByTestIdAndDateAndGender(testId,startDate,endDate,gender);
        return reports.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/reports/byTestIdAndDateRangeAndGenderAndPhoneCode")
    public ResponseEntity<List<Reports>> getReportsByTestIdAndDateRangeAndGenderAndCountryCode(
            @RequestParam String testName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date endDate,
            @RequestParam(name = "gender",required = false, defaultValue = "All") String gender,
            @RequestParam(name = "country",required = false, defaultValue = "Sweden") String country)  {

        System.out.println(country);
        String countryCode = countryPhoneCodeLookupTable.getPhoneCodeByCountryName(country);

        System.out.println("cc: " + countryCode);

        ObjectId testId = testLookupService.getTestIdByName(testName);
        List<Reports> reports = reportsService.getReportsByTestNameDatePatientGenderAndCountryCode(testId,startDate,endDate,gender, countryCode);
        return reports.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(reports, HttpStatus.OK);
    }
}
