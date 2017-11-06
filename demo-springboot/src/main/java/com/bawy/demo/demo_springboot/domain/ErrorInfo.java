package com.bawy.demo.demo_springboot.domain;

/**
 * Created by bawy on 2017/7/31 20:25.
 */
public class ErrorInfo<T> {
    public static final Integer OK = 0;
    public static final Integer ERROR = 100;

    private Integer code;
    private String message;
    private String url;
    private T data;

    public Integer getCode() {
        return code;
    }
    public String getMessage() {
        return message;
    }

    public String getUrl() {
        return url;
    }

    public T getData() {
        return data;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setData(T data) {
        this.data = data;
    }

}
