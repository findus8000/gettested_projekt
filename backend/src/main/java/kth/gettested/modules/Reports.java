package kth.gettested.modules;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "reports")
public class Reports {

    @Id
    private String id;
    private Test test;
    private List<Results> results;
    private String patient;
    private String sampleId;

    public Reports() {
    }

    public Reports(String testId, Test test, List<Results> results, String patientId, String testType, String sampleId) {

        this.test = test;
        this.results = results;
        this.sampleId = sampleId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }



    public Test getTest() {
        return test;
    }

    public void setTest(Test test) {
        this.test = test;
    }

    public List<Results> getResults() {
        return results;
    }

    public void setResults(List<Results> results) {
        this.results = results;
    }




    public String getSampleId() {
        return sampleId;
    }

    public void setSampleId(String sampleId) {
        this.sampleId = sampleId;
    }

    @Override
    public String toString() {
        return "Reports{" +
                "id='" + id + '\'' +
                ", test=" + test +
                ", results=" + results +
                ", patient='" + patient + '\'' +
                ", sampleId='" + sampleId + '\'' +
                '}';
    }
}
