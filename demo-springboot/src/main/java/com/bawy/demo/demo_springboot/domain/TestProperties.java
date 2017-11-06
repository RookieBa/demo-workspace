package com.bawy.demo.demo_springboot.domain;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Created by bawy on 2017/7/25.
 */
@Component
public class TestProperties {

    @Value("${com.demo.author}")
    private String author;
    @Value("${com.bawy.demo.value}")
    private String value;

    public String getAuthor() {
        return  author;
    }

    public  String getValue() {
        return  value;
    }
}
