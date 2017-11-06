package com.bawy.demo.demo_springboot.dao.impl;

import com.bawy.demo.demo_springboot.dao.interfaces.IUserDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 * Created by bawy on 2017/8/3 15:15.
 */
@Repository
public class UserDAOImpl implements IUserDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //旧的实现，使用jdbcTemplate

    @Override
    public void create(String name, Integer age) {
        jdbcTemplate.update("insert into USER(NAME, AGE) values(?, ?)", name, age);
    }
}
