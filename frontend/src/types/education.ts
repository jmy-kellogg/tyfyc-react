export interface Education {
  degree: string;
  school: string;
  gradYear: string;
  id: string;
  userId: string;
}

export interface EducationCreate {
  degree: string;
  school: string;
  gradYear: string;
}

export interface EducationUpdate {
  degree?: string;
  school?: string;
  gradYear?: string;
}
