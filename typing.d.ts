
interface UserInfo {
  providerId: string | null;
  name: string;
  email: string;
  eamilVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  uid: string;
}

interface AuthProviderProps {
  defaultUser: User | null;
  children: React.ReactNode;
}

interface UserContextType {
  user: User | null;
}

interface User {
  uid : string,
  email : string | null,
  photoURL : string | null,
  phoneNumber: string | null,
  displayName: string | null,
}
