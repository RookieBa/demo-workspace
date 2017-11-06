package com.bawy.demo.demo_springboot.controller;

import com.bawy.demo.demo_springboot.domain.TestProperties;
import com.bawy.demo.demo_springboot.exception.MyException;
import com.bawy.demo.demo_springboot.service.interfaces.IUserSV;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by bawy on 2017/7/25.
 */
@Controller
public class HelloController {
    @Autowired
    private TestProperties testProperties;

    @Autowired
    private IUserSV userSV;

    @RequestMapping("/hello")
    @ResponseBody
    public String index() {
        return testProperties.getAuthor()+testProperties.getValue();
    }

    @RequestMapping("/")
    public String index(ModelMap map) {
        // 加入一个属性，用来在模板中读取
        map.addAttribute("host", "http://blog.didispace.com");
        // return模板文件的名称，对应src/main/resources/templates/index.html
        return "index";
    }

    @RequestMapping("/hello1")
    public String hello() throws Exception {
        throw new Exception("发生错误");
    }

    @RequestMapping("/json")
    public String json() throws MyException{
        throw new MyException("发生自定义异常！");
    }

    @RequestMapping("/addUser")
    public void addUser() throws Exception{
        userSV.create("abc",18);
    }

}
