export interface UserType {
  photo: string;
  availableTrash: {
    pill: number;
    bottle: number;
    battery: number;
  };
  point: number;
  email: string
  phone: string
  uid: string
  name: string
  rank: string
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}
