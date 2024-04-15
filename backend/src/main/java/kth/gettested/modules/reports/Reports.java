package kth.gettested.modules.reports;

import kth.gettested.modules.results.Results;
import kth.gettested.modules.tests.Test;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "reports")
public class Reports {

    @Id
    private String id;
    private String test;
    private String patient;
    @DBRef
    private List<Results> results;

    public String getId() {
        return id;
    }

    public String getPatient() {
        return patient;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public List<Results> getResults() {
        return results;
    }

    public void setResults(List<Results> results) {
        this.results = results;
    }
}
