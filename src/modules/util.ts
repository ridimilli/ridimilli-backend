const success = <T>(
    message: String,
    data: T
): { success: true; message: String; data: T } => {
    return {
        success: true,
        message: message,
        data: data,
    };
};

const fail = (message: String): { success: false; message: String } => {
    return {
        success: false,
        message: message,
    };
};

export default {
    success,
    fail,
};
