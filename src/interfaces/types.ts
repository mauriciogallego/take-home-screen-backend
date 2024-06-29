import { EmailAddress } from 'mailparser';

export interface SendEmailTest {
  recipient: string;
  body: string;
}

export interface SendEmailTemplate {
  recipient: string;
  body: {
    recipient_name: string;
    orderDetails: {
      name: string;
      quantity: number;
      price: string;
    }[];
    total: string;
  };
  subject: string;
}

export interface IAccessToken {
  access_token: string;
}

export type ReqStrategy = {
  body: {
    email: string;
    password: string;
  };
};

export interface IRequestUser {
  id: string;
  email: string;
  username: string;
  active: boolean;
}

export interface ITokenPayload {
  sub: string;
  email: string;
  username: string;
  role: string;
  iat: number;
  exp: number;
  active: boolean;
}

export interface IPaginatedResult<T> {
  results: T[];
  pagination: {
    total: number | undefined;
    size: number;
    skip: number;
    take: number;
    hasMore?: boolean;
  };
}
export type IPaginationArgs<T> = T & {
  skip?: number;
  take?: number;
  includeCount?: boolean;
};

export interface IEntityService {
  findAll(params: any);
  findOne?(id: string, params: any);
  create(data: any);
  update(id: string, data: any, ...rest);
  delete?(id: string);
}

export type CreateRFQData = {
  subject: string;
  text: string;
  html: string;
  email: EmailAddress;
};

export type ProductRFQ = {
  name: string;
  unit: string;
  quantity: number;
  dimensions: string;
  expiration_date: string;
};
