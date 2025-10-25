# API Hook Usage

## Overview
The `useApi` hook provides a centralized way to make authenticated API requests without manually passing the user object to each request.

## Usage

### Import the hook
```javascript
import useApi from "../../hooks/useApi";
```

### Use in your component
```javascript
const MyComponent = () => {
  const { get, post, put, delete: del } = useApi();
  
  const fetchData = async () => {
    try {
      // GET request
      const data = await get('/api/endpoint');
      
      // POST request
      const newData = await post('/api/endpoint', { key: 'value' });
      
      // PUT request
      const updatedData = await put('/api/endpoint/123', { key: 'updatedValue' });
      
      // DELETE request
      await del('/api/endpoint/123');
    } catch (error) {
      console.error('API request failed:', error);
    }
  };
  
  return (
    // Your component JSX
  );
};
```

## Benefits
1. **Automatic token handling**: The hook automatically includes the Firebase ID token in all requests
2. **Simplified API calls**: No need to pass the user object to each request
3. **Consistent error handling**: Centralized error handling for all API requests
4. **Easy to use**: Simple interface with familiar HTTP method names
5. **Token refresh**: Automatically refreshes tokens when they expire

## Migration from `makeAuthorizedRequest`
Replace:
```javascript
import { makeAuthorizedRequest } from "../../helpers/apiHelper";
const { user } = useContext(AuthContext);
await makeAuthorizedRequest(user, 'get', '/api/endpoint');
```

With:
```javascript
import useApi from "../../hooks/useApi";
const { get } = useApi();
await get('/api/endpoint');
```

## Updated Components
The following components have been updated to use the new hook:
- AddBook.jsx
- UpdateBook.jsx
- BorrowModal.jsx
- BookForm.jsx
- CategoriesManagement.jsx
- BorrowedBooks.jsx
- BannerManagement.jsx
- BooksManagement.jsx
- UsersManagement.jsx