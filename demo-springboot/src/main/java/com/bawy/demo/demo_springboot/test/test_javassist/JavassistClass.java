package com.bawy.demo.demo_springboot.test.test_javassist;

/**
 * Created by bawy on 2017/7/26.
 */
public class JavassistClass {
    private String name="default";
    public JavassistClass(){
        name="me";
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void execute(){
        System.out.println(name);
        System.out.println("execute ok");
    }
}
