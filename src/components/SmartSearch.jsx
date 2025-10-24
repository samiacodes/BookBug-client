import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiMicrophone, HiSearch } from "react-icons/hi";
import { toast } from "react-toastify";
import Button from "./Button";
import { navigationData } from "../constants/navigation";
import { AuthContext } from "../contexts/AuthContexts/AuthContext";

const SmartSearch = ({ isMobile = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [supported, setSupported] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [showHints, setShowHints] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Dynamic hints for search guidance
  const searchHints = [
    "Say a book name",
    "Say a keyword",
    "Say a category: Fiction",
    "Say a category: Mystery",
    "Say a category: Biography",
    "Say 'Go to Home'",
    "Say 'Show All Books'",
    "Say 'Add Book'"
  ];

  // Rotate hints when input is focused
  useEffect(() => {
    let interval;
    if (showHints) {
      interval = setInterval(() => {
        setCurrentHintIndex((prev) => (prev + 1) % searchHints.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [showHints, searchHints.length]);

  // Check if browser supports speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!SpeechRecognition);
  }, []);

  const handleFocus = () => {
    setShowHints(true);
  };

  const handleBlur = () => {
    // Delay hiding hints to allow for button clicks
    setTimeout(() => setShowHints(false), 200);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      navigate(`/all-books?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      // Clear transcript as well
      setTranscript("");
    }
  };

  const startListening = () => {
    if (!supported) {
      toast.error("Speech recognition is not supported in your browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("");
      // Clear search query when starting to listen
      setSearchQuery("");
      setShowHints(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcript);
      setSearchQuery(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      toast.error(`Speech recognition error: ${event.error}`);
      setIsListening(false);
      // Clear states on error
      setTranscript("");
      setSearchQuery("");
      setShowHints(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (transcript) {
        handleVoiceCommand(transcript);
        // Clear transcript after processing
        setTranscript("");
      }
      setShowHints(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error("Error starting speech recognition:", error);
      toast.error("Failed to start voice recognition");
      setIsListening(false);
      // Clear states on error
      setTranscript("");
      setSearchQuery("");
      setShowHints(false);
    }
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Navigation commands
    const navigationCommands = [
      { command: "go to home", path: "/" },
      { command: "go home", path: "/" },
      { command: "home page", path: "/" },
      { command: "all books", path: "/all-books" },
      { command: "show all books", path: "/all-books" },
      { command: "browse books", path: "/all-books" },
      { command: "add book", path: "/add-book" },
      { command: "borrowed books", path: "/borrowed-books" },
      { command: "my books", path: "/borrowed-books" },
      { command: "profile", path: "/profile" },
      { command: "my profile", path: "/profile" },
      { command: "login", path: "/login" },
      { command: "sign in", path: "/login" },
      { command: "register", path: "/register" },
      { command: "sign up", path: "/register" },
    ];

    // Check for navigation commands
    const navCommand = navigationCommands.find((nav) =>
      lowerCommand.includes(nav.command)
    );
    
    if (navCommand) {
      // Check if route requires authentication
      const route = navigationData.find((item) => item.path === navCommand.path);
      if (route && route.private && !user) {
        toast.warn("Please log in to access this page");
        return;
      }
      
      navigate(navCommand.path);
      toast.success(`Navigating to ${navCommand.command}`);
      // Clear search query after navigation
      setSearchQuery("");
      return;
    }

    // Search commands
    if (lowerCommand.includes("search for") || lowerCommand.includes("find")) {
      const searchTerms = lowerCommand
        .replace("search for", "")
        .replace("find", "")
        .trim();
      
      if (searchTerms) {
        navigate(`/all-books?search=${encodeURIComponent(searchTerms)}`);
        toast.success(`Searching for: ${searchTerms}`);
        // Clear search query after search
        setSearchQuery("");
        return;
      }
    }

    // Direct search (if command is not a navigation command)
    if (command.trim()) {
      navigate(`/all-books?search=${encodeURIComponent(command)}`);
      toast.success(`Searching for: ${command}`);
      // Clear search query after search
      setSearchQuery("");
      return;
    }

    // Help command
    if (lowerCommand.includes("help") || lowerCommand.includes("what can i say")) {
      showHelp();
      // Clear search query after help
      setSearchQuery("");
      return;
    }

    // If no command matched
    toast.info(`Command not recognized: "${command}". Say "help" for assistance.`);
    // Clear search query after unrecognized command
    setSearchQuery("");
  };

  const showHelp = () => {
    const helpMessage = `
      Available voice commands:
      - "Go to home" or "Home page"
      - "All books" or "Browse books"
      - "Add book" (requires login)
      - "Borrowed books" or "My books" (requires login)
      - "Profile" or "My profile" (requires login)
      - "Login" or "Sign in"
      - "Register" or "Sign up"
      - "Search for [term]" or "Find [term]"
      - "Help" or "What can I say"
    `;
    
    toast.info(helpMessage, { autoClose: 10000 });
  };

  if (!supported && !isMobile) {
    return (
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={searchHints[currentHintIndex]}
            className="input input-bordered w-full pl-10 pr-4 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
        </div>
        <Button type="submit" variant="primary" className="px-4">
          <HiSearch className="w-5 h-5" />
        </Button>
      </form>
    );
  }

  if (!supported && isMobile) {
    return null;
  }

  return (
    <div className={`${isMobile ? "w-full" : "flex items-center gap-2"}`}>
      {!isMobile && (
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <div className="relative flex-1 max-w-md">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={searchHints[currentHintIndex]}
              className="input input-bordered w-full pl-10 pr-10 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
              >
                ×
              </button>
            )}
          </div>
          <Button type="submit" variant="primary" className="px-4">
            <HiSearch className="w-5 h-5" />
          </Button>
        </form>
      )}
      
      {/* Unified Voice Input Button */}
      <div className="relative">
        <Button
          variant={isListening ? "accent" : "primary"}
          onClick={startListening}
          onMouseEnter={() => setShowHints(true)}
          onMouseLeave={() => setShowHints(false)}
          className="flex items-center gap-2 relative"
          title={isListening ? "Listening..." : "Voice Search"}
        >
          <HiMicrophone className={`w-5 h-5 ${isListening ? "animate-pulse" : ""}`} />
          {!isMobile && (
            <span className="hidden sm:inline">
              {isListening ? "Listening..." : "Voice"}
            </span>
          )}
        </Button>
        
        {/* Dynamic Hints Tooltip */}
        {showHints && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg p-3 min-w-max z-50 transition-all duration-200">
            <div className="text-sm text-base-content font-medium">
              {searchHints[currentHintIndex]}
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-base-100 border-l border-t border-base-300 rotate-45"></div>
          </div>
        )}
      </div>
      
      {isMobile && (
        <form onSubmit={handleSearch} className="w-full mt-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={searchHints[currentHintIndex]}
              className="input input-bordered w-full pl-10 pr-10 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-5 h-5" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
              >
                ×
              </button>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <Button type="submit" variant="primary" className="flex-1">
              Search
            </Button>
          </div>
        </form>
      )}
      
      {transcript && !isMobile && (
        <div className="hidden md:block text-sm text-base-content/70 italic bg-base-200 px-3 py-1 rounded-lg">
          "{transcript}"
        </div>
      )}
    </div>
  );
};

export default SmartSearch;