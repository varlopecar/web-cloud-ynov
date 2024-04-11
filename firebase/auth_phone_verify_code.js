export const authPhoneVerifyCode = async (code) => {
    window.confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        console.log(error);
        return false;
    });
}
