export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  }
}

export type Token = {
  token: string;
}