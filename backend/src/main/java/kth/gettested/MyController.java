package kth.gettested;

import kth.gettested.modules.Country;
import kth.gettested.modules.CountryService;
import kth.gettested.modules.Patient;
import kth.gettested.modules.PatientService;
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

    @Autowired
    public MyController(CountryService countryService, PatientService patientService) {
        this.countryService = countryService;
        this.patientService = patientService;
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
}
