package kth.gettested.modules.reports;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.LookupOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.ProjectionOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReportRepositoryCustomImpl implements ReportRepositoryCustom {

    private final MongoOperations mongoOperations;

    public ReportRepositoryCustomImpl(MongoOperations mongoOperations) {
        this.mongoOperations = mongoOperations;
    }

    @Override
    public List<Reports> getReportsByTestNameAndPatientGender(ObjectId testName, String gender) {
        LookupOperation lookupTest = LookupOperation.newLookup()
                .from("tests")
                .localField("test")
                .foreignField("id")
                .as("test");

        LookupOperation lookupPatient = LookupOperation.newLookup()
                .from("patients")
                .localField("patient")
                .foreignField("id")
                .as("patient");

        Aggregation aggregation = Aggregation.newAggregation(
                lookupTest,
                Aggregation.unwind("test"),
                lookupPatient,
                Aggregation.unwind("patient"),
                Aggregation.match(
                        Criteria.where("test.name").is(testName)
                                .and("patient.gender").is(gender)
                )
        );

        return mongoOperations.aggregate(aggregation, "reports", Reports.class).getMappedResults();
    }

    @Override
    public List<Reports> getReportsByTestName(String testId) {
        LookupOperation lookupTest = LookupOperation.newLookup()
                .from("tests")
                .localField("test")
                .foreignField("_id")
                .as("test");

        MatchOperation matchOperation = Aggregation.match(Criteria.where("test._id").is(testId));

        Aggregation aggregation = Aggregation.newAggregation(
                lookupTest,
                matchOperation
        );

        return mongoOperations.aggregate(aggregation, "reports", Reports.class).getMappedResults();
    }
}

