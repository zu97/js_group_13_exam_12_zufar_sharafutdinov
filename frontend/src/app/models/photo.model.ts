export interface Photo {
  _id: string;
  user: {
    _id: string;
    displayName: string;
  };
  title: string;
  image: string;
}

export interface AddPhotoData {
  [key: string]: any;
  title: string;
  image: string;
}

export interface FieldError {
  message: string;
}

export interface AddError {
  errors: {
    title?: undefined | FieldError;
    image?: undefined | FieldError;
  }
}

export interface PhotoError {
  error: string;
}
