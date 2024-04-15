package kth.gettested;

public class Results {
    private String name;
    private String value;


    public Results() {}

    public Results(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}

