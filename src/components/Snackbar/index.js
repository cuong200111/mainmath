export const SnackbarRegister = (data = {}) => {
    const { msg, variant } = data
    console.log(msg);
    if (variant === 'error') {
        return (
            <div className='SnackbarRegister_error' style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#0000002b"
            }}>
                <div className='SnackbarRegister_error_content' style={{ position: "relative" }}>
                    <div className='SnackbarRegister_error_content_circle'>
                        <div className='SnackbarRegister_error_content_circle_overflow'>
                            <div className='SnackbarRegister_error_content_circle_line1'>

                            </div>
                            <div className='SnackbarRegister_error_content_circle_line2'>

                            </div>
                        </div>
                    </div>
                    <span style={{ position: "absolute", bottom: "8%", fontSize: "20px", fontFamily: "sans-serif" }}>{msg}</span>
                </div>
            </div>
        )
    } else {
        return (
            <div className='SnackbarRegister' style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                backgroundColor: "#0000002b"
            }}>
                <div className='SnackbarRegister_content' style={{ position: "relative" }}>
                    <div className='SnackbarRegister_content_circle'>
                        <div className='SnackbarRegister_content_circle_overflow'>
                            <div className='SnackbarRegister_content_circle_line1'>

                            </div>
                            <div className='SnackbarRegister_content_circle_line2'>

                            </div>
                        </div>
                    </div>
                    <span style={{ position: "absolute", bottom: "8%", fontSize: "20px", fontFamily: "sans-serif" }}>{msg}</span>
                </div>
            </div>
        )
    }

}