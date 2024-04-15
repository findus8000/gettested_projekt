package kth.gettested;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PatientController {

    private final PatientService patientService;

    @Autowired
    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/getAllPatientGenders")
    public ResponseEntity<List<Patient>> getAllPatientGenders() {
        List<Patient> patientGenders = patientService.getAllPatientGenders();
        return new ResponseEntity<>(patientGenders, HttpStatus.OK);
    }
}
