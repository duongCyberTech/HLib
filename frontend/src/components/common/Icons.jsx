// Centralized icon exports from Material-UI
// Only import icons that are actually used in the application

import {
  // Navigation & UI Icons
  Home,
  Person,
  People,
  Settings,
  Menu,
  Close,
  ArrowBack,
  ArrowForward,
  ExpandMore,
  ExpandLess,
  MoreVert,
  Search,
  FilterList,
  // Authentication & Security Icons
  Lock,
  LockOpen,
  Visibility,
  VisibilityOff,
  ExitToApp,
  Login,
  PersonAdd,
  // Content & Document Icons
  Article,
  Description,
  Bookmark,
  BookmarkBorder,
  Favorite,
  FavoriteBorder,
  Share,
  Download,
  Upload,
  CloudUpload,
  // Communication Icons
  Chat,
  Comment,
  Email,
  Phone,
  Notifications,
  NotificationsOff,
  // Education & Learning Icons
  School,
  MenuBook,
  Quiz,
  Assignment,
  Grade,
  Class,
  // Analytics & Charts Icons
  BarChart,
  TrendingUp,
  TrendingDown,
  PieChart,
  Analytics,
  Assessment,
  // Social Media Icons
  Google,
  Facebook,
  Apple,
  Twitter,
  LinkedIn,
  // Action Icons
  Add,
  Remove,
  Edit,
  Delete,
  Save,
  Cancel,
  Check,
  Clear,
  Refresh,
  // Status & Feedback Icons
  CheckCircle,
  Error,
  Warning,
  Info,
  Help,
  HelpOutline,
  // File & Media Icons
  Image,
  VideoLibrary,
  AudioFile,
  PictureAsPdf,
  InsertDriveFile,
  Folder,
  FolderOpen,
} from '@mui/icons-material';

// Export with aliases for backward compatibility
export const HomeIcon = Home;
export const PersonIcon = Person;
export const PeopleIcon = People;
export const SettingsIcon = Settings;
export const MenuIcon = Menu;
export const CloseIcon = Close;
export const ArrowBackIcon = ArrowBack;
export const ArrowForwardIcon = ArrowForward;
export const ExpandMoreIcon = ExpandMore;
export const ExpandLessIcon = ExpandLess;
export const MoreVertIcon = MoreVert;
export const SearchIcon = Search;
export const FilterListIcon = FilterList;
export const LockIcon = Lock;
export const LockOpenIcon = LockOpen;
export const VisibilityIcon = Visibility;
export const VisibilityOffIcon = VisibilityOff;
export const ExitToAppIcon = ExitToApp;
export const LoginIcon = Login;
export const PersonAddIcon = PersonAdd;
export const ArticleIcon = Article;
export const DescriptionIcon = Description;
export const BookmarkIcon = Bookmark;
export const BookmarkBorderIcon = BookmarkBorder;
export const FavoriteIcon = Favorite;
export const FavoriteBorderIcon = FavoriteBorder;
export const ShareIcon = Share;
export const DownloadIcon = Download;
export const UploadIcon = Upload;
export const CloudUploadIcon = CloudUpload;
export const ChatIcon = Chat;
export const CommentIcon = Comment;
export const EmailIcon = Email;
export const PhoneIcon = Phone;
export const NotificationsIcon = Notifications;
export const NotificationsOffIcon = NotificationsOff;
export const SchoolIcon = School;
export const MenuBookIcon = MenuBook;
export const QuizIcon = Quiz;
export const AssignmentIcon = Assignment;
export const GradeIcon = Grade;
export const ClassIcon = Class;
export const BarChartIcon = BarChart;
export const TrendingUpIcon = TrendingUp;
export const TrendingDownIcon = TrendingDown;
export const PieChartIcon = PieChart;
export const AnalyticsIcon = Analytics;
export const AssessmentIcon = Assessment;
export const GoogleIcon = Google;
export const FacebookIcon = Facebook;
export const AppleIcon = Apple;
export const TwitterIcon = Twitter;
export const LinkedInIcon = LinkedIn;
export const AddIcon = Add;
export const RemoveIcon = Remove;
export const EditIcon = Edit;
export const DeleteIcon = Delete;
export const SaveIcon = Save;
export const CancelIcon = Cancel;
export const CheckIcon = Check;
export const ClearIcon = Clear;
export const RefreshIcon = Refresh;
export const CheckCircleIcon = CheckCircle;
export const ErrorIcon = Error;
export const WarningIcon = Warning;
export const InfoIcon = Info;
export const HelpIcon = Help;
export const HelpOutlineIcon = HelpOutline;
export const ImageIcon = Image;
export const VideoLibraryIcon = VideoLibrary;
export const AudioFileIcon = AudioFile;
export const PictureAsPdfIcon = PictureAsPdf;
export const InsertDriveFileIcon = InsertDriveFile;
export const FolderIcon = Folder;
export const FolderOpenIcon = FolderOpen;




// Utility function to get icon by name (for dynamic usage)
export const getIconByName = (iconName) => {
  const iconMap = {
    // Navigation & UI
    'home': Home,
    'person': Person,
    'people': People,
    'settings': Settings,
    'menu': Menu,
    'close': Close,
    'arrow-back': ArrowBack,
    'arrow-forward': ArrowForward,
    'expand-more': ExpandMore,
    'expand-less': ExpandLess,
    'more-vert': MoreVert,
    'search': Search,
    'filter': FilterList,
    
    // Authentication & Security
    'lock': Lock,
    'lock-open': LockOpen,
    'visibility': Visibility,
    'visibility-off': VisibilityOff,
    'logout': ExitToApp,
    'login': Login,
    'signup': PersonAdd,
    
    // Content & Document
    'article': Article,
    'document': Description,
    'bookmark': Bookmark,
    'bookmark-border': BookmarkBorder,
    'favorite': Favorite,
    'favorite-border': FavoriteBorder,
    'share': Share,
    'download': Download,
    'upload': Upload,
    'cloud-upload': CloudUpload,
    
    // Communication
    'chat': Chat,
    'comment': Comment,
    'email': Email,
    'phone': Phone,
    'notifications': Notifications,
    'notifications-off': NotificationsOff,

    // Education & Learning
    'school': School,
    'book': MenuBook,
    'quiz': Quiz,
    'assignment': Assignment,
    'grade': Grade,
    'class': Class,

    // Analytics & Charts
    'bar-chart': BarChart,
    'trending-up': TrendingUp,
    'trending-down': TrendingDown,
    'pie-chart': PieChart,
    'analytics': Analytics,
    'assessment': Assessment,
    
    // Social Media
    'google': Google,
    'facebook': Facebook,
    'apple': Apple,
    'twitter': Twitter,
    'linkedin': LinkedIn,

    // Actions
    'add': Add,
    'remove': Remove,
    'edit': Edit,
    'delete': Delete,
    'save': Save,
    'cancel': Cancel,
    'check': Check,
    'clear': Clear,
    'refresh': Refresh,

    // Status & Feedback
    'check-circle': CheckCircle,
    'error': Error,
    'warning': Warning,
    'info': Info,
    'help': Help,
    'help-outline': HelpOutline,

    // File & Media
    'image': Image,
    'video': VideoLibrary,
    'audio': AudioFile,
    'pdf': PictureAsPdf,
    'file': InsertDriveFile,
    'folder': Folder,
    'folder-open': FolderOpen,
  };
  
  return iconMap[iconName] || null;
};
