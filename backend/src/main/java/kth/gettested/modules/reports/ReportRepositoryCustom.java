package kth.gettested.modules.reports;
import org.bson.types.ObjectId;

import java.util.List;

public interface ReportRepositoryCustom {
    List<Reports> getReportsByTestNameAndPatientGender(ObjectId testName, String gender);
    List<Reports> getReportsByTestName(String testName);
}
