# Frontend Interview Questions (QUIZ App)

1. Q: What frontend framework and tooling does this project use?
   A: React 18 with Create React App (react-scripts 5). State is managed via Redux Toolkit. Routing uses React Router v6. UI library is Ant Design v5. Tests use Jest + React Testing Library.

2. Q: Where is the main router configured and how are routes defined?
   A: In `src/App.js`. It uses `BrowserRouter`, `Routes`, and `Route` from React Router v6. Each route supplies an `element` prop, e.g., `<Route path="/dashboard" element={<Dashboard />} />`.

3. Q: How is protected routing handled for admin-only pages?
   A: Via `src/components/PrivateRoute.jsx`. It reads `tokenValidity` and `userInfo.role` from `state.auth` and either renders `children` or navigates to `/` (unauth) or `/dashboard` (role mismatch). It accepts a `requiredRole` prop.

4. Q: How is the app’s theme managed and integrated with Ant Design?
   A: Through `src/contexts/ThemeContext.jsx` which persists `theme` (light/dark) in localStorage and exposes `isDark`. In `App.js`, `ConfigProvider` receives `getAntdTheme(isDark)` from `src/utils/themeConfig.js` to drive AntD tokens.

5. Q: Describe the Redux store configuration.
   A: `src/store/store.js` uses `configureStore` with slices: `auth`, `question`, `profile`, `topic`, `file`, `answer`. It appends `redux-logger` middleware for action/state logs in dev.

6. Q: How are async flows (e.g., fetching topics) implemented?
   A: Via slice-specific async actions (e.g., `getAllTopics` in `src/store/slices/topic/TopicAction.js`). Components dispatch thunks using `useDispatch`, and read state via `useSelector`.

7. Q: What is the purpose of `AuthProvider` and where is it used?
   A: `src/components/AuthProvider.jsx` ensures on mount that if a refresh token exists but no valid auth token, it dispatches `refreshToken()`. It also logs out on failure. It’s designed to wrap children (can be used high in the tree).

8. Q: How does the app handle expired access tokens at the HTTP layer?
   A: `src/AxiosConfig.js` configures an Axios instance with request/response interceptors. On 401 with `TOKEN_EXPIRED`, it queues requests while a refresh is in progress (`isRefreshing` + `failedQueue`), attempts refresh via `POST user/refresh-token`, updates tokens, retries the original request, or forces logout.

9. Q: Where are token storage and logout side effects centralized for non-Axios contexts?
   A: `src/utils/authUtils.js` exposes `handleTokenExpiration()` to clear localStorage, dispatch `logOut()` via the Redux store, and redirect to `/`.

10. Q: How are environment variables used for API configuration?
    A: `src/AxiosConfig.js` uses `process.env.REACT_APP_API_URL` to set `baseURL`. In CRA, variables must be prefixed with `REACT_APP_` and defined at build time.

11. Q: Explain the conditional navbar rendering logic.
    A: In `App.js`, `hideNavbar` hides `<Navbar />` when `location.pathname` is one of `/`, `/login`, `/admin-login`, `/admin-register`. Otherwise, the navbar is shown.

12. Q: How does `Topics` page orchestrate starting an answering session?
    A: `src/pages/Topics/Topics.jsx` dispatches `getAllTopics()` if topics not loaded, and when a topic is selected it dispatches `createNewAnswer({ userId, answers: {}, topicId })` then navigates to `/answer`.

13. Q: What testing libraries and setup are used?
    A: Jest with React Testing Library (`@testing-library/react`, `@testing-library/jest-dom`, `user-event`). `src/setupTests.js` imports jest-dom. Coverage thresholds are enforced in `package.json` (80% branches/functions/lines/statements) and there are tests like `src/App.test.js`, `src/pages/Topics/Topics.test.jsx`.

14. Q: How would you test a component that uses Redux state?
    A: Wrap it with a test provider using a configured Redux store (e.g., with `@reduxjs/toolkit` store or a mock store). This project includes `src/utils/test-utils.js` which likely provides helpers for providers/rendering.

15. Q: How are role-based restrictions enforced for admin pages such as the Question Bank?
    A: Routes like `/question` and `/question/archive` are wrapped with `<PrivateRoute requiredRole="admin">` in `App.js`. Inside, `userInfo.role` must equal `admin`.

16. Q: What UI library components and theming are in use?
    A: Ant Design components (from `antd`) and icons (`@ant-design/icons`, `lucide-react` elsewhere). Theming is controlled via AntD `ConfigProvider` + custom token config from `getAntdTheme()`.

17. Q: How would you add a new page and route?
    A: Create the page under `src/pages/<Name>/<Name>.jsx`, export it, import it inside `src/App.js`, then add a `<Route path="/new" element={<New />} />`. If protected, wrap with `PrivateRoute` and pass `requiredRole` when needed.

18. Q: How do interceptors avoid multiple concurrent refresh calls?
    A: The `isRefreshing` flag prevents re-entrancy. Pending failed requests push promises into `failedQueue`. Once a token is refreshed, `processQueue` resolves pending promises with the new token and original request is retried.

19. Q: Where and how is the auth token attached to requests?
    A: In the Axios request interceptor inside `src/AxiosConfig.js`: it reads `authToken` from localStorage and sets `Authorization: Bearer <token>` on the request headers.

20. Q: How can you toggle theme at runtime from a component?
    A: Use `useTheme()` from `src/contexts/ThemeContext.jsx`, then call `toggleTheme()`. You also have booleans `isLight` and `isDark` for conditional styling.

21. Q: What is the significance of `window.location.href = '/'` in auth flows?
    A: It performs a hard redirect to the login page after logout or token expiration, ensuring app state is reset and protected routes are inaccessible without re-authentication.

22. Q: How are static assets handled?
    A: Images and assets are under `src/assets/` and referenced by components. CRA takes care of bundling. Public assets like icons and manifest are under `public/`.

23. Q: How would you mock Axios for unit tests of thunks?
    A: Use Jest to mock `axios` or the configured instance from `src/AxiosConfig.js`, then test thunk behavior (dispatch sequences, success/failure paths). Alternatively, use MSW for request-level mocks.

24. Q: What performance considerations exist with `redux-logger`?
    A: It logs every action/state change; should be limited to development environments. For production, ensure it’s excluded or conditionally added.

25. Q: How is form of navigation implemented programmatically?
    A: Using `useNavigate()` from React Router v6, e.g., in `Topics.jsx` after creating a new answer it calls `navigate('/answer')`.

26. Q: How do you prevent flicker or unauthorized access during initial auth check?
    A: Ensure `tokenValidity` is correctly initialized and that protected components are guarded via `PrivateRoute`. Optionally, show a loading state while validating/refreshing tokens in `AuthProvider`.

27. Q: How would you add toast notifications globally?
    A: The project includes `react-toastify`. Add `<ToastContainer />` at a high level (e.g., in `App.js`) and call `toast.success/error/info` in actions or components.

28. Q: What is the correct way to add a new environment variable?
    A: Prefix with `REACT_APP_` in a `.env` file (e.g., `REACT_APP_API_URL=https://...`). Rebuild the app after changes since CRA injects env vars at build time.

29. Q: How are CSS styles organized?
    A: Component/page-specific CSS sits alongside components (e.g., `src/pages/Topics/Topics.css`). Global or shared component styles exist under `src/components/*.css`. AntD theming is via tokens, not overriding CSS directly where possible.

30. Q: How would you code-split a heavy route in React Router v6?
    A: Use `React.lazy` and `Suspense` for the component, then in routes use `element={<Suspense fallback={<Spinner/>}><LazyComp/></Suspense>}` to split bundles per route.

31. Q: What is the role of `reportWebVitals.js` and `web-vitals` dependency?
    A: CRA scaffolds performance measurement via Web Vitals. You can pass a function to log or send metrics to analytics. It’s currently included but not necessarily wired up.

32. Q: How would you enforce consistent API error handling across the app?
    A: Centralize in Axios response interceptor to map backend errors to user-friendly messages, and in thunks return `rejectWithValue` to let reducers set error state for components to display.

33. Q: How can you test navigation and protected routes?
    A: Use `MemoryRouter` with initial entries, render routes with `PrivateRoute`, set appropriate Redux state for `tokenValidity`/`userInfo.role`, then assert on `Navigate` redirects or rendered children.

34. Q: How does the project ensure coverage standards in CI?
    A: `package.json` includes a `test:ci` script with `--coverage --ci` and Jest `coverageThreshold` set to 80% globally to fail builds if coverage drops below the threshold.

35. Q: Where are topic-related tests and logic located?
    A: Logic: `src/store/slices/topic/TopicSlice.js` and `TopicAction.js`. Tests: `src/store/slices/topic/TopicSlice.test.js` and `TopicAction.test.js`. UI page tests at `src/pages/Topics/Topics.test.jsx`.

36. Q: How are admin vs user experiences separated in routing?
    A: Admin pages are under routes like `/question` and `/question/archive` protected with `requiredRole="admin"`. General user routes include `/topics`, `/instructions`, `/answer`, `/profile`, etc.

37. Q: What’s the difference between hiding the Navbar vs protecting a route?
    A: Hiding the Navbar (`hideNavbar` in `App.js`) is purely UI/UX for login-like pages. Protecting routes (`PrivateRoute`) prevents access based on auth/role state.

38. Q: How would you persist Redux auth state across refreshes?
    A: Persist tokens in `localStorage` (already done). On app start, hydrate Redux state from storage or rely on `AuthProvider` to attempt refreshing tokens and set state accordingly.

39. Q: What is the preferred pattern for deriving AntD theme tokens based on dark mode?
    A: Compute theme in a pure util (`getAntdTheme(isDark)`) and pass to `ConfigProvider`. Avoid inline scattered token overrides.

40. Q: How are 401 errors other than token expiry handled?
    A: In `src/AxiosConfig.js`, non-`TOKEN_EXPIRED` 401s trigger `handleTokenExpiration()` to clear auth and redirect to login, preventing unauthorized access loops.

41. Q: How are static assets handled?
    A: Images and assets are under `src/assets/` and referenced by components. CRA takes care of bundling. Public assets like icons and manifest are under `public/`.

42. Q: How are environment variables used for API configuration?
    A: `src/AxiosConfig.js` uses `process.env.REACT_APP_API_URL` to set `baseURL`. In CRA, variables must be prefixed with `REACT_APP_` and defined at build time.

43. Q: How are tests structured and run?
    A: Tests are in `src/**/*.test.js` and `src/**/*.test.jsx`. They use Jest + React Testing Library. CI runs `npm test:ci` with coverage thresholds.

44. Q: How are performance metrics collected and reported?
    A: `reportWebVitals.js` is scaffolded by CRA to measure Web Vitals. It logs metrics to the console and can be extended to send to analytics. Currently, it’s included but not necessarily wired up.

45. Q: When should you use `React.memo`, `useMemo`, and `useCallback`? How do they differ?
    A: 
    - `React.memo(Component)`: Memoizes the rendered output of a component. Re-renders only if props change by shallow comparison. Use for pure components receiving stable props.
    - `useMemo(factory, deps)`: Memoizes an expensive computed value. Runs `factory` only when `deps` change. Use for costly computations or to keep referential equality of derived objects/arrays passed to children.
    - `useCallback(fn, deps)`: Memoizes a function reference. Use to prevent child re-renders when passing callbacks to memoized children or dependencies to effects.
    Caveats: Overuse can add complexity; measure before optimizing.

46. Q: What are common causes of unnecessary re-renders in React and how do you mitigate them?
    A: Causes include changing props references on every render (new objects/arrays/functions), global state updates that touch many components, and context value identity changes. Mitigations:
    - Stabilize references with `useMemo`/`useCallback`.
    - Split state to minimize updates; colocate state closer to usage.
    - Use `React.memo` on leaf components.
    - Provide stable context values: `const value = useMemo(() => ({a, b}), [a,b])`.

47. Q: What benefits does Redux Toolkit (RTK) provide over vanilla Redux?
    A: RTK reduces boilerplate and enforces best practices:
    - `configureStore()` with good defaults (DevTools, middleware).
    - `createSlice()` for co-located reducers + actions.
    - `createAsyncThunk()` for standardized async logic lifecycle (pending/fulfilled/rejected).
    - Immer-based immutable updates with mutable syntax.
    - Opinionated project structure and TypeScript-first APIs.

48. Q: How do you handle async flows with `createAsyncThunk` and reflect loading/error states in the UI?
    A: Define thunks per async action. In the slice's `extraReducers`, handle `pending` (set `loading=true`, clear `error`), `fulfilled` (store payload, `loading=false`), and `rejected` (set `error` from `action.error`, `loading=false`). Components select these flags to render spinners, errors, or data.

49. Q: Why and how would you normalize Redux state? What tools help with selectors?
    A: Normalization avoids nested structures that cause wide re-renders and complex updates. Store entities by ID maps and separate `ids` arrays. Use memoized selectors (`reselect`/RTK's `createSelector`) to derive data efficiently and keep selectors performant and referentially stable.

50. Q: Compare Context API vs Redux for state management.
    A: Context is great for low-frequency global values (theme, locale, auth session). It lacks built-in tooling for complex updates, devtools, and middleware. Redux excels for complex, cross-cutting state with time-travel debugging, middleware, and predictable updates. For performance, Context updates re-render all consumers in the tree; Redux can be more granular with `useSelector`.

51. Q: How do you code-split a React app and handle loading states?
    A: Use `React.lazy(() => import('./SomePage'))` and `<Suspense fallback={<Spinner/>}>` around lazy routes/components. With React Router v6, code-split at route level. Consider splitting vendor chunks and prefetching critical routes.

52. Q: What are Error Boundaries and what can/can't they catch?
    A: Error Boundaries (class components implementing `componentDidCatch`/`getDerivedStateFromError`) catch render-time errors in their child tree, lifecycle methods, and constructors. They do not catch event handler errors, async errors (setTimeout/promise), or server-side rendering errors. Use them to show fallback UI and log errors.

53. Q: How do you test Redux-connected components effectively?
    A: Render with a real store provider and optional `preloadedState`. For unit tests, test slice reducers and thunks in isolation. For component tests, use RTL with `<Provider store={store}>` and assert on UI changes after dispatches. Mock API calls for thunks.

54. Q: How can you persist and rehydrate Redux state safely?
    A: Persist minimal, non-sensitive slices (e.g., auth tokens, preferences) to `localStorage` or a library like `redux-persist`. On app start, rehydrate into preloaded state. Validate and migrate persisted state versions. Avoid persisting large or derived data; handle token refresh flows securely.
