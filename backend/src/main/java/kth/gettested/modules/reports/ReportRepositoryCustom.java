package kth.gettested.modules.reports;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

public interface ReportRepositoryCustom {
    List<Reports> getReportsByTestNameAndPatientGender(ObjectId testName, String gender);
    List<Reports> getReportsByTestIdAndDateRange(ObjectId testId, Date startDate, Date endDate);
    List<Reports> getReportsByTestNameAndDateAndPatientGender(ObjectId testName, Date startDate, Date endDate, String gender);

}
