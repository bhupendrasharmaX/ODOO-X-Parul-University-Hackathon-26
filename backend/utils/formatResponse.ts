export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: any[];
}

const formatResponse = (success: boolean, message: string, data: any = null, errors: any[] = []): ApiResponse => {
  return {
    success,
    message,
    data,
    errors,
  };
};

export default formatResponse;
