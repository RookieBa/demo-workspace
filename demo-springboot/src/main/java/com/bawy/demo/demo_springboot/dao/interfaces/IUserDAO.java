package com.bawy.demo.demo_springboot.dao.interfaces;

/**
 * Created by bawy on 2017/8/3 15:14.
 */
public interface IUserDAO {

    /**
     * 新增一个用户
     * @param name
     * @param age
     */
    public void create(String name, Integer age);
}
