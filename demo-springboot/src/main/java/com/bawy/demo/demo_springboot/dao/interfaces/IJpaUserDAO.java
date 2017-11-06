package com.bawy.demo.demo_springboot.dao.interfaces;

import com.bawy.demo.demo_springboot.domain.JpaUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by bawy on 2017/8/4 9:24.
 */
@Repository
public interface IJpaUserDAO extends JpaRepository<JpaUser,Long>{

    JpaUser findByName(String name);

    JpaUser findByNameAndAge(String name, Integer age);

}
