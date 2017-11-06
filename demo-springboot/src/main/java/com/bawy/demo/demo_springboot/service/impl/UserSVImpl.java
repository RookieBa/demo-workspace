package com.bawy.demo.demo_springboot.service.impl;

import com.bawy.demo.demo_springboot.dao.interfaces.IJpaUserDAO;
import com.bawy.demo.demo_springboot.dao.interfaces.IUserDAO;
import com.bawy.demo.demo_springboot.domain.JpaUser;
import com.bawy.demo.demo_springboot.service.interfaces.IUserSV;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by bawy on 2017/8/3 15:10.
 */
@Service
public class UserSVImpl implements IUserSV {

    @Autowired
    private IUserDAO userDAO;
    @Autowired
    private IJpaUserDAO jpaUserDAO;

    @Override
    public void create(String name, Integer age) {
        //userDAO.create(name, age);
        jpaUserDAO.save(new JpaUser(name, age));
    }

    @Override
    public JpaUser findJpaUserByName(String name) {
        return jpaUserDAO.findByName(name);
    }


}