package com.bawy.demo.demo_springboot.service.interfaces;

import com.bawy.demo.demo_springboot.domain.JpaUser;

/**
 * Created by bawy on 2017/8/3 15:06.
 */
public interface IUserSV {

    /**
     * 新增一个用户
     * @param name
     * @param age
     */
   public void create(String name, Integer age);

    /**
     * 根据名称查询用户
     * @param name
     * @return
     */
   public JpaUser findJpaUserByName(String name);
}
