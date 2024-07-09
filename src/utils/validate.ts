export class Validate {
  //Validate email phải nhập đúng định dạng
  static email(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  //Validate password phải nhập trên 6 kí tự
  static Password = (val: string) => {
    return val.length >= 6;
  };
  //Validate RetypePassword phải nhập trên 6 kí tự
  static ConfirmPassword = (val: string) => {
    return val.length >= 6;
  };

  //Validate màn hình AddNewScreen
  static EventValidation = (data: any) => {
    //console.log(data);
    const mess: string[] = [];
    Object.keys(data).forEach(key => {
      //Cho phép trường 'description' và trường 'users' trống => còn lại phải nhập
      if (key !== 'description' && key !== 'users') {
        !data[`${key}`] && mess.push(`${key} is required!!!`);
      }
    });

    return mess;
  };
}
