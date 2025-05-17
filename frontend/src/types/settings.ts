import { ReactElement } from "react";

export interface LoginReq {
  username: string;
  password: string;
}

export interface RegisterUserReq {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  jobTitle?: string;
  summary?: string;
  city?: string;
  state?: string;
  phone?: string;
  gitHub?: string;
  linkedIn?: string;
}

export interface FeatureFlag {
  dateCreated: string;
  description: string;
  id: string;
  isActive: boolean;
  name: string;
}

export type Tab = {
  label: string;
  value: string;
};

export type TabsList = Array<Tab>;

export interface SortableItem {
  id: string;
  component: ReactElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type SortableList = Array<SortableItem>;

export interface User {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
  username: string;
  id: string;
  hashedPassword: string;
  resume: string;
}

export interface Personal {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
}
