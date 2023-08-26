interface UserInfo {
  providerId: string | null;
  name: string;
  email: string;
  emailVerified: boolean;
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
  uid: string;
  email: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  providerId: string;
}

interface LogoHeader {
  serviceTitle: string;
  isHome: boolean;
}

interface LoginDialog {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatBoxStyle {
  align: string;
  bg: string;
  color: string;
  radius: string;
}

interface ChatBox {
  styles: ChatBoxStyle;
  message: string;
  characterId: number;
  timestamp: string;
}

interface MessageType {
  role: string;
  id: string;
  content: string;
  createdAt?: Date;
}

interface Message {
  messages: MessageType[];
  characterId: number;
}

interface ProfileSlideOverProps {
  open: boolean;
  setOpen: () => void;
}

interface ProfileSectionProps {
  setOpen: () => void;
}

interface ProfileHeaderProps {
  setOpen: () => void;
}

interface Profile {
  name: string;
  email: string;
  photoURL: string;
  provider: string;
}