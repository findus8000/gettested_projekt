package kth.gettested.modules.tests;

import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TestLookupService {

    private final TestRepository testRepository;
    private final Map<String, ObjectId> testNameToIdMap = new HashMap<>();

    @Autowired
    public TestLookupService(TestRepository testRepository) {
        this.testRepository = testRepository;
    }

    @PostConstruct
    public void init() {
        List<Test> tests = testRepository.findAll();
        tests.forEach(test -> testNameToIdMap.put(test.getName(), new ObjectId(test.getId())));
    }

    public ObjectId getTestIdByName(String testName) {
        return testNameToIdMap.get(testName);
    }
}

