export interface EducationBase {
  degree: string;
  school: string;
  gradYear: string;
}

export interface Education extends EducationBase {
  id: string;
  userId: string;
}
export type EducationCreate = Partial<EducationBase>;

export type EducationUpdate = Partial<EducationBase>;

export type EducationList = Array<Education>;
