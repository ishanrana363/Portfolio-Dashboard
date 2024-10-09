import reacthotToast from "react-hot-toast";
let EmailRegx = /\S+@\S+\.\S+/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
class FormHelper {
    isEmpty(value) {
        return value.length === 0;
    }
    isMobile(value){
        return MobileRegx.test(value);
    }
    isEmail(value) {
        return !EmailRegx.test(value);
    }
    errorToast(msg) {
        reacthotToast.error(msg, { position: "top-center" });
    }
    successToast(msg) {
        reacthotToast.success(msg, { position: "top-center" });
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }
}
export const {isEmail, isEmpty, isMobile, errorToast, getBase64, successToast} = new FormHelper();