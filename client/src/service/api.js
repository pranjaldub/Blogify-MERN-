/////signup user
const baseUrl = "http://localhost:8000";
export const signupUser = async (credentials) => {
  try {
    //console.log("sending", credentials);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: credentials.name,
        username: credentials.username,
        password: credentials.password,
      }),
    };
    //debugger;
    const response = await fetch(`${baseUrl}/signup`, requestOptions);
    //console.log("incoming", response);

    const resp = await response.json();
    //console.log("resp ", resp);
    if (response.status !== 201) {
      //console.log("inside if");
      return {
        isSuccess: false,
        message: resp.msg,
      };
    }

    return {isSuccess: true, message: "signup successful"};
  } catch (err) {
    //throw err;
    //console.log(err);
    return {isSuccess: false, error: "Response failure , an error has occured"};
  }
};

export const loginUser = async (credentials) => {
  try {
    console.log("sending", credentials);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    };
    //debugger;
    const response = await fetch(`${baseUrl}/login`, requestOptions);
    //console.log("incoming", response);

    const resp = await response.json();
    //console.log("resp ", resp);
    if (response.status !== 200) {
      console.log("inside if");
      return {
        isSuccess: false,
        message: resp.msg,
      };
    }

    sessionStorage.setItem("accessToken", `Bearer ${resp.accessToken}`);
    sessionStorage.setItem("refreshToken", `Bearer ${resp.refreshToken}`);
    return {
      isSuccess: true,
      message: "login successful",
      name: resp.name,
      username: resp.username,
    };
  } catch (err) {
    //throw err;
    //console.log(err);
    return {isSuccess: false, error: "Response failure , an error has occured"};
  }
};

export const createBlog = async (blog) => {
  try {
    //console.log("sending", credentials);
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: blog.username,
        blog: blog.blog,
      }),
    };
    //debugger;
    const response = await fetch(`${baseUrl}/createBlogs`, requestOptions);
    //console.log("incoming", response);

    const resp = await response.json();
    //console.log("resp ", resp);
    if (response.status !== 200) {
      //console.log("inside if");
      return {
        isSuccess: false,
        message: resp.msg,
      };
    }

    return {isSuccess: true, message: "blog submission successful"};
  } catch (err) {
    //throw err;
    //console.log(err);
    return {isSuccess: false, error: "Response failure , an error has occured"};
  }
};

export const getBlogs = async () => {
  try {
    //console.log("sending", credentials);
    const requestOptions = {
      method: "GET",
      headers: {"Content-Type": "application/json"},
      // body: JSON.stringify({
      //   username: blog.username,
      //   blog: blog.blog,
      // }),
    };
    //debugger;
    const response = await fetch(`${baseUrl}/blogs`, requestOptions);
    //console.log("incoming", response);

    const resp = await response.json();
    console.log("resp ", resp);
    if (response.status !== 200) {
      //console.log("inside if");
      return {
        isSuccess: false,
        msg: "failed",
      };
    }

    return {isSuccess: true, message: "blog fetch successful", data: resp.data};
  } catch (err) {
    //throw err;
    //console.log(err);
    return {isSuccess: false, error: "Response failure , an error has occured"};
  }
};
