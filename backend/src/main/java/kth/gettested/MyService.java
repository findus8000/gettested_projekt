package kth.gettested;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyService {

    private final MyDatabase repository;

    @Autowired
    public MyService(MyDatabase repository) {
        this.repository = repository;
        readFromDatabase();
    }

  /*  public void readFromDatabase() {
        // Perform a read operation
        List<Country> entities = repository.findAll();
        for (int i = 0; i < entities.size()/2 ; i++) {
            System.out.println( entities.get(i).getName());
        };
        //entities.forEach(System.out::println);
    }
   */
    public List<Country> readFromDatabase() {
        return repository.findAll();
    }
}
